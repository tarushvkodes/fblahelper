/* ─── data.js ─── Data loading, normalization, bank merging, and deck functions. ─── */

const RESOURCE_DATA = window.RESOURCE_INTERACTIVE_DATA || { objectiveQuizzes: {}, roleplayScenarios: [], productionTests: {} };
const COMBINED_DATA = window.COMBINED_QUESTION_BANK || { banks: {} };
const AI_DATA = window.AI_QUESTION_BANK || { banks: {} };
const ROLEPLAY_REFERENCE = window.ROLEPLAY_REFERENCE || { officialRoleplayEvents: [], pdfLinks: {}, curatedScenarios: {} };
const {
  MANUAL_ANSWER_OVERRIDES = new Map(),
  MANUAL_EVENT_DECKS = {},
  MANUAL_QUESTION_OVERRIDES = new Map(),
  EVENT_FILE_RESOURCES = {},
  GENERAL_RESOURCES = [],
  PRESENTATION_GUIDE = null
} = window.MANUAL_QUIZ_DATA || {};
function normalizeQuestionRuntime(q, fallbackSource) {
  if (!q || typeof q.q !== "string" || !Array.isArray(q.options) || q.options.length !== 4) return null;
  const manualOverride = MANUAL_QUESTION_OVERRIDES.get(norm(q.q)) || null;
  const sourceQuestion = manualOverride ? { ...q, ...manualOverride } : q;
  const rawAnswer = sourceQuestion.answer;
  const parsedAnswer = typeof rawAnswer === "number"
    ? rawAnswer
    : /^[0-3]$/.test(String(rawAnswer).trim())
      ? Number(rawAnswer)
      : NaN;
  const overrideAnswer = MANUAL_ANSWER_OVERRIDES.get(norm(sourceQuestion.q));
  const answer = Number.isInteger(parsedAnswer) ? parsedAnswer : overrideAnswer;
  if (!Number.isInteger(answer) || answer < 0 || answer > 3) return null;

  const optionExplanations = Array.isArray(sourceQuestion.optionExplanations)
    ? sourceQuestion.optionExplanations.slice(0, 4).map((value) => typeof value === "string" ? value.trim() : "")
    : [];

  return {
    q: sourceQuestion.q.trim(),
    options: sourceQuestion.options.map((value) => String(value).trim()),
    answer,
    explain: typeof sourceQuestion.explain === "string" && sourceQuestion.explain.trim()
      ? sourceQuestion.explain.trim()
      : Number.isInteger(overrideAnswer) && !Number.isInteger(parsedAnswer)
        ? "Manually corrected after reviewing the historical source text in the repo."
        : "",
    optionExplanations,
    source: typeof sourceQuestion.source === "string" && sourceQuestion.source.trim() ? sourceQuestion.source.trim() : fallbackSource
  };
}

function dedupeDeck(deck) {
  const seen = new Set();
  return deck.filter((q) => {
    const key = norm(q.q);
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return Array.isArray(q.options) && q.options.length === 4;
  });
}

function inferManualDeckSource(eventName) {
  return `manual-curated:${norm(eventName).replace(/\s+/g, "-")}`;
}

function mergeBanks(...banks) {
  const merged = {};
  banks.forEach((bank) => {
    Object.entries(bank || {}).forEach(([eventName, deck]) => {
      const normalized = dedupeDeck((Array.isArray(deck) ? deck : [])
        .map((question) => normalizeQuestionRuntime(question, "official-hq"))
        .filter(Boolean));

      if (!merged[eventName]) {
        merged[eventName] = normalized;
        return;
      }

      merged[eventName] = dedupeDeck([...merged[eventName], ...normalized]);
    });
  });
  return merged;
}

const OFFICIAL_BANKS = mergeBanks(RESOURCE_DATA.objectiveQuizzes, COMBINED_DATA.banks);
const AI_BANKS = mergeBanks(AI_DATA.banks);
const MANUAL_BANKS = Object.fromEntries(
  Object.entries(MANUAL_EVENT_DECKS).map(([eventName, deck]) => [
    eventName,
    dedupeDeck((Array.isArray(deck) ? deck : [])
      .map((question) => normalizeQuestionRuntime(question, inferManualDeckSource(eventName)))
      .filter(Boolean))
  ])
);
const OFFICIAL_DECK_BLOCKLIST = new Set([
  "Future Business Educator",
  "Introduction to Business Presentation"
]);

function inferFormat(eventName) {
  if (ROLEPLAY_EVENTS.has(eventName)) return "roleplay";
  if (PARLIAMENTARY_EVENTS.has(eventName)) return "parliamentary";
  if (PRESENTATION_EVENTS.has(eventName)) return "presentation";
  if (PRODUCTION_EVENTS.has(eventName)) return "production";
  if (REPORT_EVENTS.has(eventName)) return "report";
  return "objective";
}

function hasOfficialRoleplay(eventName) {
  return ROLEPLAY_EVENTS.has(eventName);
}

function findBestKey(keys, eventName) {
  const e = norm(eventName);
  let best = null;
  let bestScore = -1;
  keys.forEach((k) => {
    const nk = norm(k);
    let score = 0;
    if (nk.includes(e) || e.includes(nk)) score += 4;
    const eWords = new Set(e.split(" "));
    const kWords = nk.split(" ");
    kWords.forEach((w) => {
      if (eWords.has(w) && w.length > 2) score += 1;
    });
    if (score > bestScore) {
      bestScore = score;
      best = k;
    }
  });
  return bestScore >= 2 ? best : null;
}

function getMatchedDeck(bank, eventName) {
  const keys = Object.keys(bank || {});
  const key = findBestKey(keys, eventName);
  return key ? bank[key] : [];
}

function getOfficialDeck(eventName) {
  if (OFFICIAL_DECK_BLOCKLIST.has(eventName)) return [];
  return getMatchedDeck(OFFICIAL_BANKS, eventName);
}

function getAIDeck(eventName) {
  const manualDeck = MANUAL_BANKS[eventName] || [];
  const aiDeck = getMatchedDeck(AI_BANKS, eventName);
  return [...manualDeck, ...aiDeck];
}

function getQuizBankMode() {
  return quizUi.bankMode?.value || "hq";
}

function getDeckForMode(eventName, mode) {
  const hqDeck = dedupeDeck(getOfficialDeck(eventName));
  const aiDeck = dedupeDeck(getAIDeck(eventName));

  // AI bank (from generated_by_checklist) has verified answer indices.
  // HQ bank may have corrupt indices for the same questions.
  // Build a correction map keyed by normalized question text.
  const aiMap = new Map();
  aiDeck.forEach((q) => aiMap.set(norm(q.q), q));

  const correctedHq = hqDeck.map((q) => {
    const aiVersion = aiMap.get(norm(q.q));
    if (aiVersion) {
      return { ...q, answer: aiVersion.answer, options: aiVersion.options, optionExplanations: aiVersion.optionExplanations.length ? aiVersion.optionExplanations : q.optionExplanations };
    }
    return q;
  });

  if (mode !== "hq-ai") return correctedHq;

  // In combined mode, put corrected HQ first, then add AI-only questions
  return dedupeDeck([...correctedHq, ...aiDeck]);
}

function shuffleOptions(q) {
  if (!q || !Array.isArray(q.options) || q.options.length !== 4) return q;
  const indices = [0, 1, 2, 3];
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  const newOptions = indices.map((i) => q.options[i]);
  const newAnswer = indices.indexOf(q.answer);
  const newOptExp = Array.isArray(q.optionExplanations) && q.optionExplanations.length === 4
    ? indices.map((i) => q.optionExplanations[i])
    : q.optionExplanations;
  return { ...q, options: newOptions, answer: newAnswer, optionExplanations: newOptExp };
}

function isOfficialQuestionSource(source) {
  const value = String(source || "").toLowerCase().trim();
  if (!value) return true;
  if (value === "official-hq") return true;
  return !/generated|bespoke|pregenerated|\bai\b/.test(value);
}

function canonicalRoleplayEvent(rawEvent, sourcePath) {
  const sourceName = String(sourcePath || "")
    .split(/[\\/]/)
    .pop()
    .replace(/\.[^.]+$/, "")
    .replace(/---Sample-\d+$/i, "")
    .replace(/--/g, " & ")
    .replace(/-/g, " ")
    .trim();
  const rawName = String(rawEvent || "")
    .replace(/& Sample\s*\d+/i, "")
    .replace(/Sample Roleplay/i, "")
    .replace(/\d+$/g, "")
    .trim();

  const exact = {
    "Banking and Financial Systems": "Banking & Financial Systems",
    "Sports and Entertainment Management": "Sports & Entertainment Management",
    "Insurance and Risk Management": "Insurance & Risk Management"
  };

  const sourceCandidate = exact[sourceName] || sourceName;
  const rawCandidate = exact[rawName] || rawName;

  return findBestKey(Array.from(ROLEPLAY_EVENTS), sourceCandidate) || findBestKey(Array.from(ROLEPLAY_EVENTS), rawCandidate);
}

function resolveRoleplaySourcePath(sourcePath) {
  if (!sourcePath) return "";
  if (/^(fblaresources|FBLA Time)\//.test(sourcePath)) return sourcePath;
  return `fblaresources/${sourcePath}`;
}

function normalizeRoleplayScenarioRuntime(scenario) {
  const eventName = canonicalRoleplayEvent(scenario?.event, scenario?.source);
  if (!eventName) return null;

  const prompt = String(scenario?.prompt || "").trim();
  if (!prompt) return null;
  if (/^Disclaimer:\s/i.test(prompt) || /^COMPETITOR INSTRUCTIONS$/i.test(prompt)) return null;

  return {
    name: String(scenario?.name || `${eventName} Sample Roleplay`).trim(),
    event: eventName,
    prompt,
    sourceNote: scenario?.source ? `Source document: ${scenario.source}` : "",
    indicators: (Array.isArray(scenario?.indicators) ? scenario.indicators : [])
      .map(cleanRoleplayLabel)
      .filter(Boolean),
    judgeQuestions: (Array.isArray(scenario?.judgeQuestions) ? scenario.judgeQuestions : [])
      .map((value) => String(value || "").trim())
      .filter(Boolean),
    sourcePath: resolveRoleplaySourcePath(scenario?.source)
  };
}

function dedupeRoleplayScenarios(deck) {
  const seen = new Set();
  return deck.filter((scenario) => {
    const key = norm(`${scenario.event} ${scenario.name} ${scenario.prompt}`);
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function getRoleplayDocs(eventName) {
  return (ROLEPLAY_REFERENCE.pdfLinks?.[eventName] || []).map((doc) => ({
    label: doc.label,
    path: doc.path
  }));
}

function getRoleplayDeck(eventName) {
  if (!hasOfficialRoleplay(eventName)) return [];

  const extracted = (RESOURCE_DATA.roleplayScenarios || [])
    .map(normalizeRoleplayScenarioRuntime)
    .filter((scenario) => scenario?.event === eventName);
  const curated = (ROLEPLAY_REFERENCE.curatedScenarios?.[eventName] || []).map((scenario) => ({
    ...scenario,
    event: eventName,
    sourcePath: "",
    sourceNote: scenario.sourceNote || ""
  }));

  return dedupeRoleplayScenarios([...curated, ...extracted]);
}

function getProductionTasks(eventName) {
  const keys = Object.keys(RESOURCE_DATA.productionTests || {});
  const key = findBestKey(keys, eventName);
  return key ? RESOURCE_DATA.productionTests[key] : null;
}

function getResourcesForEvent(eventName) {
  const eventDocs = EVENT_FILE_RESOURCES[eventName] || [];
  const extras = [...GENERAL_RESOURCES];
  if (PRESENTATION_EVENTS.has(eventName)) extras.push(PRESENTATION_GUIDE);
  return [...eventDocs, ...extras];
}
