import fs from "node:fs";
import vm from "node:vm";
import path from "node:path";

const root = process.cwd();
const resourcePath = path.join(root, "resource_data.js");
const appPath = path.join(root, "app.js");
const outPath = path.join(root, "ai_generated_bank.js");

const STOP_WORDS = new Set([
  "the", "a", "an", "is", "are", "of", "to", "for", "in", "on", "with", "which", "what", "does",
  "best", "following", "and", "or", "by", "from", "this", "that", "these", "those", "it", "as",
  "be", "at", "into", "about", "most", "primary", "main", "would", "should", "can", "not", "used"
]);

function norm(s) {
  return String(s || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function parseResourceData() {
  const raw = fs.readFileSync(resourcePath, "utf8");
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(raw, sandbox);
  return sandbox.window.RESOURCE_INTERACTIVE_DATA || { objectiveQuizzes: {} };
}

function parseEvents() {
  const src = fs.readFileSync(appPath, "utf8");
  const start = src.indexOf("const EVENTS = [");
  if (start < 0) return [];
  const from = src.indexOf("[", start);
  let i = from;
  let depth = 0;
  let end = -1;
  while (i < src.length) {
    const ch = src[i];
    if (ch === "[") depth += 1;
    if (ch === "]") {
      depth -= 1;
      if (depth === 0) {
        end = i;
        break;
      }
    }
    i += 1;
  }
  if (end < 0) return [];
  const arrLiteral = src.slice(from, end + 1);
  return vm.runInNewContext(arrLiteral);
}

function hashString(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i += 1) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function rngFactory(seedString) {
  let x = hashString(seedString) || 123456789;
  return function rng() {
    x ^= x << 13;
    x ^= x >>> 17;
    x ^= x << 5;
    return (x >>> 0) / 4294967296;
  };
}

function sampleOne(arr, rng) {
  return arr[Math.floor(rng() * arr.length)];
}

function pickUnique(pool, count, rng, banned = new Set()) {
  const out = [];
  const used = new Set(banned);
  let guard = 0;
  while (out.length < count && guard < pool.length * 10) {
    const candidate = sampleOne(pool, rng);
    const key = norm(candidate);
    guard += 1;
    if (!key || used.has(key)) continue;
    used.add(key);
    out.push(candidate);
  }
  return out;
}

function focusTerms(questionText) {
  return norm(questionText)
    .split(" ")
    .filter((w) => w.length > 3 && !STOP_WORDS.has(w))
    .slice(0, 5);
}

function sentenceCase(s) {
  const t = String(s || "").trim();
  if (!t) return t;
  return t.charAt(0).toUpperCase() + t.slice(1);
}

function buildPrompt(eventName, seedQuestion, variant, terms) {
  const clean = String(seedQuestion).replace(/\?+\s*$/, "").trim();
  const termText = terms.length ? terms.join(", ") : "core event concepts";
  const templates = [
    `In ${eventName}, which option best answers this concept: ${clean}?`,
    `${eventName} check: choose the strongest answer for ${clean}.`,
    `Competition scenario for ${eventName}: identify the best response to ${clean}.`,
    `For an ${eventName} objective test, which answer is most accurate about ${clean}?`,
    `Applied ${eventName} knowledge: which option correctly addresses ${clean}?`,
    `${eventName} competency focus (${termText}): which choice is correct?`,
    `Exam-style ${eventName} item: select the best answer to ${clean}.`,
    `You are preparing for ${eventName}. Which option best fits ${clean}?`
  ];
  return templates[variant % templates.length];
}

function chooseSeedDeck(objectiveQuizzes, eventName, globalDeck) {
  const keys = Object.keys(objectiveQuizzes);
  const ev = norm(eventName);
  let best = null;
  let bestScore = -1;

  for (const key of keys) {
    const nk = norm(key);
    let score = 0;
    if (nk.includes(ev) || ev.includes(nk)) score += 4;
    const evWords = new Set(ev.split(" "));
    for (const w of nk.split(" ")) {
      if (w.length > 2 && evWords.has(w)) score += 1;
    }
    if (score > bestScore) {
      bestScore = score;
      best = key;
    }
  }

  if (best && objectiveQuizzes[best]?.length) return objectiveQuizzes[best];
  return globalDeck;
}

function buildQuestion(seed, eventName, globalDistractors, variantIndex, rng) {
  const terms = focusTerms(seed.q);
  const prompt = buildPrompt(eventName, seed.q, variantIndex, terms);

  const correct = seed.options[seed.answer];

  const localWrong = seed.options.filter((_, idx) => idx !== seed.answer);
  const wrongPool = [...localWrong, ...globalDistractors].filter((opt) => norm(opt) !== norm(correct));
  const chosenWrong = pickUnique(wrongPool, 3, rng, new Set([norm(correct)]));

  while (chosenWrong.length < 3) {
    chosenWrong.push(`Not the best match for ${eventName} in this context.`);
  }

  const options = [correct, ...chosenWrong];

  // Deterministic shuffle
  for (let i = options.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    const tmp = options[i];
    options[i] = options[j];
    options[j] = tmp;
  }

  const answer = options.findIndex((o) => norm(o) === norm(correct));
  const termText = terms.length ? terms.join(", ") : "the tested concept";

  const explain = `${sentenceCase(correct)} is correct because it most directly satisfies the stem requirement around ${termText}.`;

  const optionExplanations = options.map((opt, idx) => {
    if (idx === answer) {
      return `Correct. This option directly addresses ${termText} and matches the exact requirement in the question.`;
    }
    const overlap = focusTerms(opt).filter((w) => terms.includes(w));
    if (overlap.length) {
      return `Not best here. It may seem plausible because it overlaps on ${overlap.join(", ")}, but it does not fully answer the stem.`;
    }
    return `Not correct for this item. It points to a different idea than ${termText}.`;
  });

  return {
    q: prompt,
    options,
    answer,
    explain,
    optionExplanations,
    source: "generated-ai"
  };
}

function main() {
  const resource = parseResourceData();
  const events = parseEvents();
  const objectiveQuizzes = resource.objectiveQuizzes || {};

  const globalDeck = Object.values(objectiveQuizzes)
    .flat()
    .filter((q) => q && q.q && Array.isArray(q.options) && q.options.length === 4 && Number.isInteger(q.answer));

  const globalDistractors = globalDeck
    .flatMap((q) => q.options)
    .filter(Boolean);

  const banks = {};

  for (const eventName of events) {
    const seedDeckRaw = chooseSeedDeck(objectiveQuizzes, eventName, globalDeck);
    const seedDeck = seedDeckRaw.filter((q) => q && q.q && Array.isArray(q.options) && q.options.length === 4 && Number.isInteger(q.answer));

    const rng = rngFactory(`event:${eventName}`);
    const out = [];

    if (!seedDeck.length) {
      banks[eventName] = [];
      continue;
    }

    for (let i = 0; i < 100; i += 1) {
      const seed = seedDeck[Math.floor(rng() * seedDeck.length)];
      out.push(buildQuestion(seed, eventName, globalDistractors, i, rng));
    }

    banks[eventName] = out;
  }

  const payload = {
    banks,
    meta: {
      generatedAt: new Date().toISOString(),
      perEventTarget: 100,
      generator: "local-rule-generator-v1",
      events: Object.keys(banks).length,
      questions: Object.values(banks).reduce((sum, deck) => sum + deck.length, 0)
    }
  };

  fs.writeFileSync(outPath, `window.AI_GENERATED_BANK = ${JSON.stringify(payload, null, 2)};\n`, "utf8");
  console.log(payload.meta);
  console.log(`wrote ${outPath}`);
}

main();
