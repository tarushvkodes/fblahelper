const fs = require("fs");
const path = require("path");
const vm = require("vm");
const { execFileSync } = require("child_process");

const ROOT = process.cwd();

function loadWindowAssignment(filePath, key) {
  const sandbox = { window: {}, console };
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(filePath, "utf8"), sandbox, { filename: filePath });
  return sandbox.window[key];
}

function loadRuntime() {
  const sandbox = {
    window: {},
    console,
    localStorage: { getItem() { return null; }, setItem() {}, removeItem() {} }
  };
  vm.createContext(sandbox);
  for (const file of ["combined_question_bank.js", "ai_question_bank.js", "resource_data.js", "roleplay_reference.js"]) {
    vm.runInContext(fs.readFileSync(path.join(ROOT, file), "utf8"), sandbox, { filename: file });
  }
  sandbox.ROLEPLAY_REFERENCE = sandbox.window.ROLEPLAY_REFERENCE;
  for (const file of ["js/constants.js", "js/utils.js", "js/data.js"]) {
    vm.runInContext(fs.readFileSync(path.join(ROOT, file), "utf8"), sandbox, { filename: file });
  }
  return {
    EVENTS: vm.runInContext("EVENTS", sandbox),
    getDeckForMode: vm.runInContext("getDeckForMode", sandbox),
    inferFormat: vm.runInContext("inferFormat", sandbox)
  };
}

function freshOfficialParse() {
  const script = [
    "import json",
    "from build_resource_data import build_resource_data",
    "print(json.dumps(build_resource_data()))"
  ].join(";");
  const stdout = execFileSync("python", ["-c", script], {
    cwd: ROOT,
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024
  });
  return JSON.parse(stdout);
}

function norm(value) {
  return String(value || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function questionSignature(question) {
  return JSON.stringify({
    q: question.q,
    options: question.options,
    answer: question.answer
  });
}

function compareOfficialData(committed, fresh) {
  const failures = [];
  const committedKeys = Object.keys(committed.objectiveQuizzes || {}).sort();
  const freshKeys = Object.keys(fresh.objectiveQuizzes || {}).sort();

  if (JSON.stringify(committedKeys) !== JSON.stringify(freshKeys)) {
    failures.push(`Official objective event keys differ. committed=${committedKeys.length}, fresh=${freshKeys.length}`);
  }

  for (const eventName of freshKeys) {
    const committedDeck = committed.objectiveQuizzes[eventName] || [];
    const freshDeck = fresh.objectiveQuizzes[eventName] || [];
    if (committedDeck.length !== freshDeck.length) {
      failures.push(`${eventName}: committed deck has ${committedDeck.length} questions, fresh parse has ${freshDeck.length}`);
      continue;
    }
    for (let index = 0; index < freshDeck.length; index += 1) {
      if (questionSignature(committedDeck[index]) !== questionSignature(freshDeck[index])) {
        failures.push(`${eventName}: question ${index + 1} differs from fresh FBLA HQ parse`);
        break;
      }
    }
  }

  return failures;
}

function validateDeckShape(deck, label) {
  const failures = [];
  const seen = new Set();
  deck.forEach((question, index) => {
    const prefix = `${label} Q${index + 1}`;
    if (!question || typeof question.q !== "string" || !question.q.trim()) {
      failures.push(`${prefix}: missing prompt`);
      return;
    }
    if (!Array.isArray(question.options) || question.options.length !== 4) {
      failures.push(`${prefix}: expected 4 options`);
    }
    if (!Number.isInteger(question.answer) || question.answer < 0 || question.answer > 3) {
      failures.push(`${prefix}: invalid answer index ${question.answer}`);
    }
    const key = norm(question.q);
    if (seen.has(key)) {
      failures.push(`${prefix}: duplicate prompt in deck`);
    }
    seen.add(key);
    if (/^disclaimer:/i.test(question.q) || /^competitor instructions$/i.test(question.q)) {
      failures.push(`${prefix}: boilerplate prompt leaked into quiz deck`);
    }
  });
  return failures;
}

function validateRuntimeEvents(runtime) {
  const failures = [];
  const summaries = [];

  for (const eventName of runtime.EVENTS) {
    const deck = runtime.getDeckForMode(eventName, "hq-ai");
    failures.push(...validateDeckShape(deck, eventName));
    summaries.push({
      event: eventName,
      format: runtime.inferFormat(eventName),
      questions: deck.length
    });
  }

  return { failures, summaries };
}

function main() {
  const committed = loadWindowAssignment(path.join(ROOT, "resource_data.js"), "RESOURCE_INTERACTIVE_DATA");
  const fresh = freshOfficialParse();
  const runtime = loadRuntime();

  const officialFailures = compareOfficialData(committed, fresh);
  const { failures: runtimeFailures, summaries } = validateRuntimeEvents(runtime);
  const failures = [...officialFailures, ...runtimeFailures];

  console.log(`Validated official objective data for ${Object.keys(fresh.objectiveQuizzes || {}).length} events.`);
  console.log(`Validated runtime quiz decks for ${summaries.length} site events.`);

  const lowCoverage = summaries.filter((item) => item.questions < 15);
  if (lowCoverage.length) {
    console.log(`Events with fewer than 15 available questions: ${lowCoverage.map((item) => `${item.event} (${item.questions})`).join(", ")}`);
  } else {
    console.log("Every event has at least 15 available questions.");
  }

  if (failures.length) {
    console.error("Quiz validation failed:");
    failures.forEach((failure) => console.error(`- ${failure}`));
    process.exit(1);
  }

  console.log("Quiz validation passed with no answer-key or deck-shape mismatches detected.");
}

main();
