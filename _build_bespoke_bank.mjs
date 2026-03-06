import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const root = process.cwd();
const resourcePath = path.join(root, "resource_data.js");
const combinedPath = path.join(root, "combined_question_bank.js");
const appPath = path.join(root, "app.js");
const outPath = path.join(root, "bespoke_question_bank.js");

const STOP = new Set([
  "the", "a", "an", "is", "are", "of", "to", "for", "in", "on", "with", "which", "what", "does",
  "best", "following", "and", "or", "by", "from", "this", "that", "these", "those", "it", "as",
  "be", "at", "into", "about", "most", "primary", "main", "would", "should", "can", "not", "used"
]);

function norm(s) {
  return String(s || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function parseAssignedWindowObject(filePath, property) {
  const raw = fs.readFileSync(filePath, "utf8");
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(raw, sandbox);
  return sandbox.window[property] || {};
}

function parseEvents() {
  const src = fs.readFileSync(appPath, "utf8");
  const marker = "const EVENTS = [";
  const start = src.indexOf(marker);
  if (start < 0) return [];
  const first = src.indexOf("[", start);
  let depth = 0;
  let end = -1;
  for (let i = first; i < src.length; i += 1) {
    if (src[i] === "[") depth += 1;
    if (src[i] === "]") {
      depth -= 1;
      if (depth === 0) {
        end = i;
        break;
      }
    }
  }
  if (end < 0) return [];
  const literal = src.slice(first, end + 1);
  return vm.runInNewContext(literal);
}

function hash(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i += 1) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function rngFactory(seedText) {
  let x = hash(seedText) || 1;
  return () => {
    x ^= x << 13;
    x ^= x >>> 17;
    x ^= x << 5;
    return (x >>> 0) / 4294967296;
  };
}

function findBestKey(keys, eventName) {
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
  return bestScore >= 2 ? best : null;
}

function focusTerms(text) {
  return norm(text)
    .split(" ")
    .filter((w) => w.length > 3 && !STOP.has(w))
    .slice(0, 5);
}

function enrichQuestion(q, source = "official-hq") {
  const terms = focusTerms(q.q);
  const termText = terms.length ? terms.join(", ") : "the concept in the prompt";
  const right = q.options[q.answer] || "the correct choice";
  const explain = `${right} is correct because it most directly addresses ${termText}.`;

  const optionExplanations = q.options.map((opt, idx) => {
    const optTerms = focusTerms(opt);
    const overlap = optTerms.filter((t) => terms.includes(t));
    if (idx === q.answer) {
      return `Correct. This choice directly matches ${termText} in the stem.`;
    }
    if (overlap.length) {
      return `Not best here. It overlaps on ${overlap.join(", ")}, but misses the exact requirement in the question.`;
    }
    return `Not correct for this item because it points to a different concept than ${termText}.`;
  });

  return {
    q: String(q.q || "").trim(),
    options: q.options.slice(0, 4),
    answer: q.answer,
    explain,
    optionExplanations,
    source
  };
}

function makeGenerated(seed, eventName, variantIndex, distractorPool, rng) {
  const terms = focusTerms(seed.q);
  const stem = String(seed.q || "").replace(/\?+\s*$/, "").trim();
  const templates = [
    `In ${eventName}, which option best answers this concept: ${stem}?`,
    `${eventName} exam check: select the strongest answer for ${stem}.`,
    `Competition scenario for ${eventName}: what is the best response to ${stem}?`,
    `Objective test prompt for ${eventName}: which choice is most accurate about ${stem}?`,
    `Applied ${eventName} practice: identify the best answer to ${stem}.`,
    `${eventName} competency review: choose the option that best addresses ${stem}.`
  ];
  const q = templates[variantIndex % templates.length];

  const correct = seed.options[seed.answer];
  const wrongBase = seed.options.filter((_, i) => i !== seed.answer);
  const wrongPool = [...wrongBase, ...distractorPool].filter((o) => norm(o) !== norm(correct));

  const wrong = [];
  const used = new Set([norm(correct)]);
  let guard = 0;
  while (wrong.length < 3 && guard < 4000) {
    const c = wrongPool[Math.floor(rng() * wrongPool.length)];
    const key = norm(c);
    guard += 1;
    if (!key || used.has(key)) continue;
    used.add(key);
    wrong.push(c);
  }
  while (wrong.length < 3) {
    wrong.push(`Not the strongest answer for ${eventName} in this context.`);
  }

  const options = [correct, ...wrong];
  for (let i = options.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    const t = options[i];
    options[i] = options[j];
    options[j] = t;
  }
  const answer = options.findIndex((o) => norm(o) === norm(correct));

  return enrichQuestion({ q, options, answer }, "generated-bespoke");
}

function dedupeByPrompt(deck) {
  const seen = new Set();
  return deck.filter((q) => {
    const k = norm(q.q);
    if (!k || seen.has(k)) return false;
    seen.add(k);
    return Array.isArray(q.options) && q.options.length === 4 && Number.isInteger(q.answer);
  });
}

function main() {
  const resource = parseAssignedWindowObject(resourcePath, "RESOURCE_INTERACTIVE_DATA");
  const combined = parseAssignedWindowObject(combinedPath, "COMBINED_QUESTION_BANK");
  const events = parseEvents();

  const officialBanks = resource.objectiveQuizzes || {};
  const combinedBanks = combined.banks || {};

  const allOptions = Object.values(officialBanks)
    .flat()
    .flatMap((q) => q.options || [])
    .filter(Boolean);

  const banks = {};

  for (const eventName of events) {
    const officialKey = findBestKey(Object.keys(officialBanks), eventName);
    const combinedKey = findBestKey(Object.keys(combinedBanks), eventName);

    const officialSeed = officialKey ? officialBanks[officialKey] : [];
    const combinedSeed = combinedKey ? combinedBanks[combinedKey] : [];

    const official = dedupeByPrompt(
      officialSeed
        .filter((q) => q && q.q && Array.isArray(q.options) && q.options.length === 4 && Number.isInteger(q.answer))
        .map((q) => enrichQuestion(q, "official-hq"))
    );

    const seedPool = dedupeByPrompt([
      ...official,
      ...combinedSeed.filter((q) => q && q.q && Array.isArray(q.options) && q.options.length === 4 && Number.isInteger(q.answer)).map((q) => enrichQuestion(q, q.source || "historical"))
    ]);

    const rng = rngFactory(`bespoke:${eventName}`);
    const out = official.slice(0, 100);

    if (!seedPool.length) {
      banks[eventName] = out;
      continue;
    }

    let i = 0;
    while (out.length < 100) {
      const seed = seedPool[Math.floor(rng() * seedPool.length)];
      const g = makeGenerated(seed, eventName, i, allOptions, rng);
      out.push(g);
      i += 1;
    }

    banks[eventName] = dedupeByPrompt(out).slice(0, 100);

    while (banks[eventName].length < 100) {
      const seed = seedPool[Math.floor(rng() * seedPool.length)];
      banks[eventName].push(makeGenerated(seed, eventName, banks[eventName].length + 1000, allOptions, rng));
      banks[eventName] = dedupeByPrompt(banks[eventName]).slice(0, 100);
    }
  }

  const payload = {
    banks,
    meta: {
      generatedAt: new Date().toISOString(),
      generator: "local-bespoke-builder-v1",
      targetPerEvent: 100,
      events: Object.keys(banks).length,
      questions: Object.values(banks).reduce((sum, d) => sum + d.length, 0)
    }
  };

  fs.writeFileSync(outPath, `window.BESPOKE_QUESTION_BANK = ${JSON.stringify(payload, null, 2)};\n`, "utf8");
  console.log(payload.meta);
  console.log(`wrote ${outPath}`);
}

main();
