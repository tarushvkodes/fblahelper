const EVENTS = [
  "Accounting", "Advanced Accounting", "Advertising", "Agribusiness", "Banking & Financial Systems", "Broadcast Journalism",
  "Business Communication", "Business Ethics", "Business Law", "Business Management", "Business Plan", "Career Portfolio",
  "Coding & Programming", "Community Service Project", "Computer Applications", "Computer Game & Simulation Programming",
  "Computer Problem Solving", "Customer Service", "Cybersecurity", "Data Analysis", "Data Science & AI", "Digital Animation",
  "Digital Video Production", "Economics", "Entrepreneurship", "Event Planning", "Financial Planning", "Future Business Educator",
  "Future Business Leader", "Graphic Design", "Healthcare Administration", "Hospitality & Event Management", "Human Resource Management",
  "Impromptu Speaking", "Insurance & Risk Management", "International Business", "Introduction to Business Communication",
  "Introduction to Business Concepts", "Introduction to Business Presentation", "Introduction to Business Procedures", "Introduction to FBLA",
  "Introduction to Information Technology", "Introduction to Marketing Concepts", "Introduction to Parliamentary Procedure",
  "Introduction to Programming", "Introduction to Public Speaking", "Introduction to Retail & Merchandising",
  "Introduction to Social Media Strategy", "Introduction to Supply Chain Management", "Job Interview", "Journalism",
  "Management Information Systems", "Marketing", "Mobile Application Development", "Network Design", "Networking Infrastructures", "Organizational Leadership",
  "Parliamentary Procedure Individual", "Parliamentary Procedure Team", "Personal Finance", "Project Management",
  "Public Administration & Management", "Public Service Announcement", "Public Speaking", "Real Estate", "Retail Management",
  "Sales Presentation", "Securities & Investments", "Social Media Strategies", "Sports & Entertainment Management",
  "Supply Chain Management", "Technology Support & Services", "Visual Design", "Website Coding & Development", "Website Design"
];

/* --- Haptic feedback (progressive enhancement, no-op on unsupported devices) --- */
function haptic(preset) {
  try { window.__haptics?.trigger(preset); } catch (_) {}
}

const RESOURCE_DATA = window.RESOURCE_INTERACTIVE_DATA || { objectiveQuizzes: {}, roleplayScenarios: [], productionTests: {} };
const COMBINED_DATA = window.COMBINED_QUESTION_BANK || { banks: {} };
const AI_DATA = window.AI_QUESTION_BANK || { banks: {} };
const ROLEPLAY_REFERENCE = window.ROLEPLAY_REFERENCE || { officialRoleplayEvents: [], pdfLinks: {}, curatedScenarios: {} };

const ROLEPLAY_EVENTS = new Set(ROLEPLAY_REFERENCE.officialRoleplayEvents || []);
const PARLIAMENTARY_EVENTS = new Set([
  "Introduction to Parliamentary Procedure",
  "Parliamentary Procedure Individual",
  "Parliamentary Procedure Team"
]);
const PRESENTATION_EVENTS = new Set([
  "Career Portfolio",
  "Data Analysis",
  "Future Business Educator",
  "Impromptu Speaking",
  "Introduction to Business Presentation",
  "Introduction to Public Speaking",
  "Introduction to Social Media Strategy",
  "Job Interview",
  "Public Service Announcement",
  "Public Speaking",
  "Sales Presentation",
  "Social Media Strategies"
]);
const PRODUCTION_EVENTS = new Set([
  "Coding & Programming",
  "Computer Game & Simulation Programming",
  "Digital Animation",
  "Digital Video Production",
  "Graphic Design",
  "Mobile Application Development",
  "Visual Design",
  "Website Coding & Development"
]);
const REPORT_EVENTS = new Set([
  "Business Plan",
  "Community Service Project",
  "Event Planning"
]);

const MEMORY_TACTICS = [
  "Sort your misses by concept, not by test date.",
  "Do 2 timed sets before 1 untimed review.",
  "After every 5 questions, explain one answer aloud.",
  "In roleplay, deliver your recommendation by the 2-minute mark.",
  "Close each session with a 90-second brain dump."
];

const BASE_PREP = [
  "Complete one timed practice exam and review every miss.",
  "Run one roleplay scenario and self-score your structure.",
  "Do one production-style drill under time constraints.",
  "Refine your 30-second opening and closing statements.",
  "Build your final-day quick-reference sheet."
];

const state = {
  currentEvent: null,
  quiz: {
    deck: [],
    index: 0,
    answers: {},
    bankMode: "hq",
    running: false,
    timerId: null,
    secondsLeft: 0,
    submitted: false
  },
  flash: {
    deck: [],
    index: 0,
    flipped: false
  }
};

const eventListEl = document.getElementById("eventList");
const eventSearchEl = document.getElementById("eventSearch");

const wsTabs = document.querySelectorAll(".ws-tab");
const wsPanels = document.querySelectorAll(".ws-panel");
const quizUi = {
  bankMode: document.getElementById("quizBankMode"),
  count: document.getElementById("quizCount"),
  progress: document.getElementById("quizProgress"),
  timer: document.getElementById("quizTimer"),
  scoreLive: document.getElementById("quizScoreLive"),
  card: document.getElementById("quizCard"),
  results: document.getElementById("examResults"),
  aiHelp: document.getElementById("quizAiHelp"),
  aiHelpNote: document.getElementById("quizAiHelpNote"),
  aiPrompt: document.getElementById("quizAiPrompt")
};
const roleplayUi = {
  select: document.getElementById("scenarioSelect"),
  prompt: document.getElementById("scenarioPrompt"),
  judgeQuestion: document.getElementById("judgeQuestion"),
  indicators: document.getElementById("roleplayIndicators"),
  score: document.getElementById("roleplayScore"),
  docs: document.getElementById("roleplayDocLinks"),
  docsHint: document.getElementById("roleplayDocHint"),
  aiPrompt: document.getElementById("roleplayAiPrompt"),
  response: document.getElementById("roleplayResponse")
};
const FBLA_SECONDS_PER_QUESTION = 30;

function norm(s) {
  return (s || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function normalizeQuestionRuntime(q, fallbackSource) {
  if (!q || typeof q.q !== "string" || !Array.isArray(q.options) || q.options.length !== 4) return null;
  const answer = Number(q.answer);
  if (!Number.isInteger(answer) || answer < 0 || answer > 3) return null;

  const optionExplanations = Array.isArray(q.optionExplanations)
    ? q.optionExplanations.slice(0, 4).map((value) => typeof value === "string" ? value.trim() : "")
    : [];

  return {
    q: q.q.trim(),
    options: q.options.map((value) => String(value).trim()),
    answer,
    explain: typeof q.explain === "string" ? q.explain.trim() : "",
    optionExplanations,
    source: typeof q.source === "string" && q.source.trim() ? q.source.trim() : fallbackSource
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

const OFFICIAL_BANKS = mergeBanks(COMBINED_DATA.banks, RESOURCE_DATA.objectiveQuizzes);
const AI_BANKS = mergeBanks(AI_DATA.banks);

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

function getOfficialDeck(eventName) {
  const keys = Object.keys(OFFICIAL_BANKS || {});
  const key = findBestKey(keys, eventName);
  return key ? OFFICIAL_BANKS[key] : [];
}

function getAIDeck(eventName) {
  const keys = Object.keys(AI_BANKS || {});
  const key = findBestKey(keys, eventName);
  return key ? AI_BANKS[key] : [];
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

function buildQuizAiPrompt(eventName, question, chosenIndex) {
  const options = (question?.options || []).map((option, index) => `${String.fromCharCode(65 + index)}. ${option}`).join("\n");
  const keyedAnswer = Number.isInteger(question?.answer)
    ? `${String.fromCharCode(65 + question.answer)}. ${question.options[question.answer]}`
    : "No keyed answer available.";
  const selectedAnswer = Number.isInteger(chosenIndex) && question?.options?.[chosenIndex]
    ? `${String.fromCharCode(65 + chosenIndex)}. ${question.options[chosenIndex]}`
    : "I did not select an answer.";

  return [
    `You are tutoring an FBLA competitor on an official ${eventName} multiple-choice question from the official bank.`,
    "",
    "Do not give a shallow answer. Teach the concept behind the question clearly and concretely.",
    "",
    "Question:",
    question?.q || "",
    "",
    "Answer choices:",
    options,
    "",
    `Official keyed answer: ${keyedAnswer}`,
    `My selected answer: ${selectedAnswer}`,
    "",
    "Please respond in this format:",
    "1. Why the official answer is correct",
    "2. Why each incorrect option is wrong or less correct",
    "3. The underlying business/accounting/economics/management concept being tested",
    "4. The clue words or logic pattern that should have pointed me to the answer",
    "5. A short memory trick or rule so I do not miss a similar question again",
    "6. One new practice question of the same concept with answer and explanation"
  ].join("\n");
}

function cleanStudyText(text) {
  return String(text || "")
    .replace(/adapted from the official sample question set\.?/gi, "")
    .replace(/adapted from (the )?original set\.?/gi, "")
    .replace(/source document:\s*[^.]+\.?/gi, "")
    .replace(/grounded in [^.]+\.?/gi, "")
    .replace(/\s+/g, " ")
    .trim();
}

function updateQuizAiHelp(question, questionIndex) {
  if (!state.quiz.submitted || !question || !isOfficialQuestionSource(question.source)) {
    setControlVisibility(quizUi.aiHelp, false);
    quizUi.aiHelpNote.textContent = "After submitting, review any official question to generate a tutoring prompt for ChatGPT, Gemini, or Claude.";
    quizUi.aiPrompt.value = "";
    return;
  }

  const chosenIndex = state.quiz.answers[questionIndex];
  quizUi.aiPrompt.value = buildQuizAiPrompt(state.currentEvent, question, chosenIndex);
  quizUi.aiHelpNote.textContent = "This is an official bank question. Paste the prompt below into ChatGPT, Gemini, or Claude for a deeper explanation.";
  setControlVisibility(quizUi.aiHelp, true);
}

function resetRoleplayPanel(eventName, message) {
  roleplayUi.select.innerHTML = "";
  roleplayUi.prompt.innerHTML = `<p><strong>${eventName}</strong></p><p>${message}</p>`;
  roleplayUi.judgeQuestion.textContent = "";
  roleplayUi.indicators.innerHTML = "";
  roleplayUi.docs.innerHTML = "";
  roleplayUi.docsHint.textContent = "";
  roleplayUi.aiPrompt.value = "No AI grading prompt is needed because this event does not include a roleplay round.";
  roleplayUi.score.textContent = "";

  const voiceSelect = document.getElementById("voiceScenarioSelect");
  const voiceOutput = document.getElementById("voicePromptOutput");
  if (voiceSelect) voiceSelect.innerHTML = "";
  if (voiceOutput) voiceOutput.value = "Voice practice is not available — this event does not include a roleplay round.";
}

async function copyTextWithFeedback(text, successTarget, successMessage, failureMessage) {
  if (!text) return;

  try {
    await navigator.clipboard.writeText(text);
    haptic("success");
    successTarget.textContent = successMessage;
  } catch (err) {
    haptic("error");
    successTarget.textContent = failureMessage;
  }
}

function cleanRoleplayLabel(value) {
  return String(value || "")
    .replace(/^\s*PERFORMANCE INDICATORS\s*$/i, "")
    .replace(/\s+/g, " ")
    .trim();
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

function buildVoicePracticePrompt(eventName, scenario) {
  const indicators = (scenario?.indicators || []).map((item) => `- ${item}`).join("\n") || "- Demonstrate strong business judgment and professionalism.";
  const judgeQs = (scenario?.judgeQuestions || []).map((q) => `- ${q}`).join("\n") || "- Ask probing follow-up questions about the competitor's plan.";

  return [
    `You are an FBLA (Future Business Leaders of America) judge conducting a live interactive roleplay session for the "${eventName}" event. This is a voice conversation, so speak naturally and conversationally — do not use markdown, bullet points, or any text formatting.`,
    "",
    "SESSION RULES:",
    "1. You will play the role of a businessperson or stakeholder described in the scenario below. Stay in character throughout the roleplay portion.",
    "2. Begin by greeting the competitor and reading them the scenario prompt (paraphrased naturally, as a judge would read it aloud).",
    "3. After presenting the scenario, give the competitor 10 minutes to respond. Let them speak. Do not interrupt unless they ask you a question or pause for more than 15 seconds.",
    "4. During the roleplay, ask 2 to 3 follow-up questions that test whether the competitor can defend their recommendations, think on their feet, and demonstrate real understanding. Draw from the judge questions listed below, but adapt naturally to what they actually say.",
    "5. After the roleplay ends (either the competitor finishes or 10 minutes pass), break character and switch to debrief mode.",
    "",
    "DEBRIEF (after the roleplay):",
    "- Give an estimated score out of 100.",
    "- State what they did well, specifically.",
    "- State what they need to improve, with concrete suggestions.",
    "- Evaluate them against each performance indicator listed below.",
    "- Suggest a stronger opening statement and closing statement they could have used.",
    "- List 2 to 3 judge questions they should prepare for next time.",
    "- End by asking if they want to run the scenario again or try a different angle.",
    "",
    "SCENARIO:",
    scenario?.prompt || "The competitor is advising a business on a challenge related to " + eventName + ". Present a realistic scenario and let them respond.",
    "",
    "PERFORMANCE INDICATORS (what a strong response should cover):",
    indicators,
    "",
    "SUGGESTED JUDGE QUESTIONS (use 2-3 during the session, adapted to the conversation):",
    judgeQs,
    "",
    "IMPORTANT VOICE-MODE NOTES:",
    "- Keep your judge dialogue concise and realistic. Real FBLA judges do not give long speeches.",
    "- If the competitor gives a vague answer, press them for specifics.",
    "- Be encouraging but honest. Mirror the tone of a real competition judge: professional, neutral, slightly formal.",
    "- During the debrief, be direct and constructive. Competitors want actionable feedback, not generic praise.",
    "",
    "Begin now by greeting the competitor and reading the scenario."
  ].join("\n");
}

function buildRoleplayAIPrompt(eventName, scenario, responseText) {
  const indicators = (scenario?.indicators || []).map((item) => `- ${item}`).join("\n") || "- No performance indicators listed for this scenario.";
  const responseBlock = responseText && responseText.trim()
    ? responseText.trim()
    : "[PASTE THE COMPETITOR RESPONSE HERE]";

  return [
    `You are grading an FBLA ${eventName} interactive roleplay response.`,
    "",
    "Score the response on a 100-point scale.",
    "Weight the evaluation across:",
    "- Problem diagnosis and event accuracy",
    "- Quality of recommendation and business judgment",
    "- Organization, clarity, and timing discipline",
    "- Judge interaction readiness and defense of the plan",
    "- Professionalism, specificity, and actionability",
    "",
    "Scenario:",
    scenario?.prompt || "No scenario prompt available.",
    "",
    "Performance indicators:",
    indicators,
    "",
    "Return your evaluation in this format:",
    "1. Overall score out of 100",
    "2. One-sentence verdict",
    "3. Top strengths",
    "4. Top weaknesses or missing content",
    "5. Event-specific corrections",
    "6. Three judge questions the competitor should be ready for",
    "7. A sharper 30-second opening and 20-second close",
    "",
    "Competitor response:",
    responseBlock
  ].join("\n");
}

function setControlVisibility(el, show) {
  if (!el) return;
  el.classList.toggle("is-hidden", !show);
}

function updateQuizAvailability() {
  if (!state.currentEvent) return;

  const mode = getQuizBankMode();
  state.quiz.bankMode = mode;
  const hqAvailable = getDeckForMode(state.currentEvent, "hq").length;
  const hqAiAvailable = getDeckForMode(state.currentEvent, "hq-ai").length;
  const available = getDeckForMode(state.currentEvent, mode).length;

  const modeSelect = document.getElementById("quizBankMode");
  const hqOption = modeSelect.querySelector('option[value="hq"]');
  const hqAiOption = modeSelect.querySelector('option[value="hq-ai"]');
  if (hqOption) hqOption.textContent = `Official (${hqAvailable})`;
  if (hqAiOption) hqAiOption.textContent = `Official + AI (${hqAiAvailable})`;

  const btn20 = document.getElementById("launchTwentyBtn");
  const btn50 = document.getElementById("launchFiftyBtn");
  const btn100 = document.getElementById("launchHundredBtn");
  const btnMax = document.getElementById("launchMaxBtn");

  setControlVisibility(btn20, available >= 20);
  setControlVisibility(btn50, available >= 50);
  setControlVisibility(btn100, available >= 100);
  btnMax.textContent = `Max (${available})`;

  const countSelect = document.getElementById("quizCount");
  const opt20 = countSelect.querySelector('option[value="20"]');
  const opt50 = countSelect.querySelector('option[value="50"]');
  const opt100 = countSelect.querySelector('option[value="100"]');
  const optMax = countSelect.querySelector('option[value="max"]');

  opt20.disabled = available < 20;
  opt50.disabled = available < 50;
  opt100.disabled = available < 100;
  optMax.textContent = `Max available (${available})`;

  if ((countSelect.value === "20" && available < 20) || (countSelect.value === "50" && available < 50) || (countSelect.value === "100" && available < 100)) {
    countSelect.value = "max";
  }

  btn20.classList.remove("official-target");
  btn50.classList.remove("official-target");
  btn100.classList.remove("official-target");
  btnMax.classList.remove("official-target");

  const officialLength = 100;
  if (available >= officialLength) btn100.classList.add("official-target");
  else btnMax.classList.add("official-target");

  document.getElementById("officialFormatNote").textContent = mode === "hq"
    ? `Official bank active — ${hqAvailable} questions.`
    : `Official + AI bank active — ${hqAiAvailable} questions.`;
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

function setStats() {
  const mode = getQuizBankMode();
  const questions = EVENTS.reduce((sum, eventName) => sum + getDeckForMode(eventName, mode).length, 0);
  const roleplays = EVENTS.reduce((sum, eventName) => sum + getRoleplayDeck(eventName).length, 0);
  document.getElementById("statEvents").textContent = EVENTS.length;
  document.getElementById("statQuestions").textContent = questions;
  document.getElementById("statRoleplays").textContent = roleplays;
}

function renderEventList() {
  const q = eventSearchEl.value.trim().toLowerCase();
  const mode = getQuizBankMode();
  const filtered = EVENTS.filter((event) => !q || event.toLowerCase().includes(q));
  const groups = [
    { key: "objective", label: "Objective Focus" },
    { key: "roleplay", label: "Roleplay Focus" },
    { key: "presentation", label: "Presentation Focus" },
    { key: "production", label: "Production Focus" },
    { key: "report", label: "Report Focus" },
    { key: "parliamentary", label: "Parliamentary Focus" }
  ];

  const html = groups.map((group) => {
    const events = filtered.filter((eventName) => inferFormat(eventName) === group.key).sort((a, b) => a.localeCompare(b));
    if (!events.length) return "";

    const cards = events.map((event) => {
      const total = getDeckForMode(event, mode).length;
      const roleplays = hasOfficialRoleplay(event) ? getRoleplayDeck(event).length : 0;
      const active = state.currentEvent === event ? "active" : "";
      return `
        <button class="event-item ${active}" data-event="${event}">
          <h4>${event}</h4>
          <div class="event-meta">
            <span class="badge">${total} questions</span>
            ${roleplays ? `<span class="badge">${roleplays} roleplay</span>` : ""}
          </div>
        </button>
      `;
    }).join("");

    return `<section class="event-group"><p class="event-group-title">${group.label}</p>${cards}</section>`;
  }).join("");

  eventListEl.innerHTML = html || "<p>No events found.</p>";

  eventListEl.querySelectorAll("[data-event]").forEach((btn) => {
    btn.addEventListener("click", () => openEvent(btn.dataset.event));
  });

  /* Collapsible groups on mobile — expand the group containing the active event */
  eventListEl.querySelectorAll(".event-group").forEach((group) => {
    const hasActive = group.querySelector(".event-item.active");
    if (hasActive) group.classList.add("expanded");

    const title = group.querySelector(".event-group-title");
    if (title) {
      title.addEventListener("click", () => {
        haptic();
        group.classList.toggle("expanded");
      });
    }
  });
}

function setWorkspaceTab(tabName) {
  haptic("nudge");
  wsTabs.forEach((t) => t.classList.toggle("active", t.dataset.wsTab === tabName));
  wsPanels.forEach((p) => p.classList.toggle("active", p.id === tabName));
}

function openEvent(eventName, tabName = "overview") {
  haptic("nudge");
  state.currentEvent = eventName;

  /* Auto-close bottom sheet on mobile */
  if (window.__closeRail && window.matchMedia("(max-width: 900px)").matches) {
    window.__closeRail();
  }

  renderEventList();

  const format = inferFormat(eventName);
  document.getElementById("eventFormatLabel").textContent = `${format} event`;
  document.getElementById("activeEventTitle").textContent = eventName;

  const combinedCount = getDeckForMode(eventName, getQuizBankMode()).length;
  const roleplayEnabled = hasOfficialRoleplay(eventName);
  const roleplayCount = roleplayEnabled ? getRoleplayDeck(eventName).length : 0;
  const roleplayTabBtn = document.querySelector('.ws-tab[data-ws-tab="roleplay"]');
  const roleplayOpenBtn = document.getElementById("openRoleplayBtn");

  setControlVisibility(roleplayTabBtn, roleplayEnabled);
  setControlVisibility(roleplayOpenBtn, roleplayEnabled);

  if (!roleplayEnabled && tabName === "roleplay") {
    tabName = "overview";
  }

  document.getElementById("activeEventMeta").textContent = roleplayEnabled
    ? `${combinedCount} questions · ${roleplayCount} roleplay scenarios · flashcards & prep tools.`
    : `${combinedCount} questions · flashcards & prep tools. No roleplay round for this event.`;
  document.getElementById("overviewRoleplayCount").textContent = roleplayEnabled
    ? `${roleplayCount} scenarios available.`
    : "No roleplay round for this event.";
  document.getElementById("overviewRoleplayHint").textContent = roleplayEnabled
    ? `Practice different judge angles and performance indicators.`
    : `The official format guide does not list a roleplay round for ${eventName}.`;
  updateQuizAvailability();

  buildFlashcards(eventName);
  renderRoleplay(eventName);
  renderPrep(eventName);

  setWorkspaceTab(tabName);
  document.getElementById("workspace").scrollIntoView({ behavior: "smooth", block: "start" });
}

function shuffle(arr) {
  const copy = arr.slice();
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function stopQuizTimer() {
  if (state.quiz.timerId) {
    clearInterval(state.quiz.timerId);
    state.quiz.timerId = null;
  }
}

function formatTimer(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function startExam() {
  if (!state.currentEvent) return;
  haptic("success");

  const countValue = quizUi.count.value;
  const mode = getQuizBankMode();

  const base = getDeckForMode(state.currentEvent, mode);
  if (!base.length) {
    quizUi.card.innerHTML = "<p>No questions available for this event yet.</p>";
    return;
  }

  const count = countValue === "max" ? base.length : Number(countValue);

  state.quiz.deck = shuffle(base).slice(0, Math.min(count, base.length)).map(shuffleOptions);
  state.quiz.index = 0;
  state.quiz.answers = {};
  state.quiz.submitted = false;
  state.quiz.running = true;
  state.quiz.secondsLeft = state.quiz.deck.length * FBLA_SECONDS_PER_QUESTION;

  stopQuizTimer();
  state.quiz.timerId = setInterval(() => {
    state.quiz.secondsLeft -= 1;
    quizUi.timer.textContent = formatTimer(Math.max(0, state.quiz.secondsLeft));
    const urgent = state.quiz.secondsLeft <= 30;
    quizUi.timer.classList.toggle("urgent", urgent);
    if (state.quiz.secondsLeft <= 0) {
      submitExam();
    }
  }, 1000);

  quizUi.results.innerHTML = "<p>Submit your exam to see detailed explanations for every question.</p>";
  updateQuizAiHelp(null, null);
  updateProgressBar();
  renderQuestion();
  setWorkspaceTab("quiz");
}

function updateProgressBar() {
  const bar = document.getElementById("quizProgressBar");
  if (!bar) return;
  const deck = state.quiz.deck;
  if (!deck.length) { bar.style.width = "0%"; return; }
  const answered = Object.keys(state.quiz.answers).length;
  bar.style.width = `${Math.round((answered / deck.length) * 100)}%`;
}

function renderQuestion() {
  const deck = state.quiz.deck;
  if (!deck.length) return;
  const idx = state.quiz.index;
  const item = deck[idx];
  const chosen = state.quiz.answers[idx];

  quizUi.progress.textContent = `Question ${idx + 1} of ${deck.length}`;
  quizUi.timer.textContent = formatTimer(Math.max(0, state.quiz.secondsLeft));

  const optionsHtml = item.options.map((opt, oIdx) => {
    let cls = "option";
    if (chosen === oIdx) cls += " selected";
    if (state.quiz.submitted && Number.isInteger(item.answer)) {
      if (oIdx === item.answer) cls += " correct";
      else if (chosen === oIdx) cls += " wrong";
    }
    return `<button class="${cls}" data-opt="${oIdx}">${String.fromCharCode(65 + oIdx)}. ${opt}</button>`;
  }).join("");

  quizUi.card.innerHTML = `
    <h3>Q${idx + 1}. ${item.q}</h3>
    <div>${optionsHtml}</div>
  `;

  document.querySelectorAll("[data-opt]").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (state.quiz.submitted) return;
      haptic();
      state.quiz.answers[idx] = Number(btn.dataset.opt);
      renderQuestion();
      updateLiveScore();
      updateProgressBar();
    });
  });

  updateLiveScore();
  updateQuizAiHelp(item, idx);
}

function updateLiveScore() {
  const deck = state.quiz.deck;
  const answeredIdx = Object.keys(state.quiz.answers).map((k) => Number(k));
  let correct = 0;
  answeredIdx.forEach((i) => {
    const q = deck[i];
    if (Number.isInteger(q?.answer) && q.answer === state.quiz.answers[i]) correct += 1;
  });
  quizUi.scoreLive.textContent = `${correct} / ${answeredIdx.length}`;
}

function changeQuestion(delta) {
  if (!state.quiz.deck.length) return;
  const next = state.quiz.index + delta;
  if (next < 0 || next >= state.quiz.deck.length) return;
  state.quiz.index = next;
  renderQuestion();
}

function submitExam() {
  if (!state.quiz.deck.length || state.quiz.submitted) return;
  haptic("success");
  state.quiz.submitted = true;
  stopQuizTimer();

  const deck = state.quiz.deck;
  let total = 0;
  let correct = 0;
  const reviewRows = [];

  const toAnswerLabel = (q, idx) => {
    if (!Number.isInteger(idx) || !q?.options?.[idx]) return "No answer selected";
    return `${String.fromCharCode(65 + idx)}. ${q.options[idx]}`;
  };

  const optionReason = (q, idx) => {
    if (Array.isArray(q?.optionExplanations) && typeof q.optionExplanations[idx] === "string" && q.optionExplanations[idx].trim()) {
      return `${toAnswerLabel(q, idx)}: ${q.optionExplanations[idx]}`;
    }

    if (idx === q.answer) return `${toAnswerLabel(q, idx)}: This is the correct answer.`;
    return `${toAnswerLabel(q, idx)}: Ask AI for detailed feedback.`;
  };

  const toExplanation = (q) => {
    if (q?.explain && q.explain.trim()) return q.explain.trim();
    if (Number.isInteger(q?.answer) && isOfficialQuestionSource(q.source)) return "Ask AI for detailed feedback.";
    return "No feedback available for this item.";
  };

  const missedTopics = [];

  deck.forEach((q, i) => {
    if (!Number.isInteger(q.answer)) return;
    total += 1;
    const picked = state.quiz.answers[i];
    const isCorrect = picked === q.answer;
    if (isCorrect) correct += 1;
    else missedTopics.push(q.q);

    const hasDetailedOptionFeedback = Array.isArray(q?.optionExplanations)
      && q.optionExplanations.some((value) => {
        const text = cleanStudyText(value);
        return text && !/ask ai for detailed feedback\.?/i.test(text);
      });
    const optionFeedback = hasDetailedOptionFeedback
      ? q.options.map((_, idx) => `<li>${optionReason(q, idx)}</li>`).join("")
      : "";

    reviewRows.push(`
      <article class="exam-review-item">
        <strong>Q${i + 1}. ${q.q}</strong>
        <p class="${isCorrect ? "answer-good" : "answer-bad"}">${isCorrect ? "Correct" : "Incorrect"}</p>
        <p><strong>Your answer:</strong> ${toAnswerLabel(q, picked)}</p>
        <p><strong>Right answer:</strong> ${toAnswerLabel(q, q.answer)}</p>
        <p><strong>Why:</strong> ${toExplanation(q)}</p>
        ${optionFeedback ? `<ul class="option-review-list">${optionFeedback}</ul>` : ""}
      </article>
    `);
  });

  const pct = total ? Math.round((correct / total) * 100) : 0;
  const verdict = pct >= 85 ? "Nationals pace" : pct >= 70 ? "Solid" : "Needs work";
  const recoveryAdvice = pct >= 85
    ? "Strong result. Try Official + AI mode for broader coverage, or run another set to lock in consistency."
    : pct >= 70
      ? "Review every miss, flip through flashcards, then rerun a shorter timed set."
      : "Slow down. Review missed items, restate the correct answer aloud, and use Flashcards and Prep before your next exam.";
  const missPreview = missedTopics.length
    ? `<p><strong>Missed prompts to revisit:</strong> ${missedTopics.slice(0, 3).join(" | ")}${missedTopics.length > 3 ? " ..." : ""}</p>`
    : "";

  quizUi.results.innerHTML = `
    <h3>Results</h3>
    <p><strong>${correct}/${total}</strong> (${pct}%) — ${verdict}</p>
    <p><strong>Next steps:</strong> ${recoveryAdvice}</p>
    <p class="module-note">Review any official question above to generate a tutoring prompt you can paste into ChatGPT, Gemini, or Claude.</p>
    ${missPreview}
    <p class="eyebrow">Question Review</p>
    <div class="exam-review">${reviewRows.join("")}</div>
  `;

  renderQuestion();
}

function renderRoleplay(eventName) {
  const scenarios = getRoleplayDeck(eventName);
  if (!hasOfficialRoleplay(eventName) || !scenarios.length) {
    resetRoleplayPanel(eventName, "This event does not include a roleplay round.");
    return;
  }

  roleplayUi.select.innerHTML = scenarios.map((s, i) => `<option value="${i}">${s.name}</option>`).join("");

  const updateAiPrompt = (scenario) => {
    roleplayUi.aiPrompt.value = buildRoleplayAIPrompt(eventName, scenario, roleplayUi.response.value);
  };

  const apply = (idx) => {
    const s = scenarios[idx] || scenarios[0];
    roleplayUi.prompt.innerHTML = `<p><strong>${s.event}</strong></p><p>${s.prompt}</p>`;
    roleplayUi.judgeQuestion.textContent = s.judgeQuestions[0] || "What is your first step?";
    roleplayUi.indicators.innerHTML = (s.indicators || []).map((item) => `<li>${item}</li>`).join("");
    roleplayUi.docs.innerHTML = getRoleplayDocs(eventName)
      .map((doc) => `<a class="doc-link" href="${encodeURI(doc.path)}" target="_blank" rel="noreferrer">${doc.label}</a>`)
      .join("");
    roleplayUi.docsHint.textContent = roleplayUi.docs.innerHTML
      ? "Open the event PDF before practicing so your response stays anchored to the repo's official materials."
      : "";
    roleplayUi.score.textContent = "";
    updateAiPrompt(s);
  };

  apply(0);

  roleplayUi.select.onchange = () => apply(Number(roleplayUi.select.value));
  document.getElementById("newJudgeQuestionBtn").onclick = () => {
    const s = scenarios[Number(roleplayUi.select.value)] || scenarios[0];
    const q = s.judgeQuestions[Math.floor(Math.random() * s.judgeQuestions.length)] || "What is your first step?";
    roleplayUi.judgeQuestion.textContent = q;
  };

  document.getElementById("gradeRoleplayBtn").onclick = () => {
    const s = scenarios[Number(roleplayUi.select.value)] || scenarios[0];
    const text = roleplayUi.response.value.trim();
    if (!text) {
      roleplayUi.score.textContent = "Write your response first.";
      return;
    }

    const low = text.toLowerCase();
    const words = text.split(/\s+/).filter(Boolean).length;
    const indicatorHits = (s.indicators || []).filter((ind) => {
      const t = ind.toLowerCase().split(/[^a-z0-9]+/).filter((w) => w.length > 5);
      return t.some((w) => low.includes(w));
    }).length;

    let score = 0;
    score += Math.min(30, Math.floor(words / 4));
    score += Math.min(40, indicatorHits * 7);
    if (/recommend|proposal|plan|action/i.test(low)) score += 10;
    if (/timeline|next step|follow up|follow-up|measure|kpi|result/i.test(low)) score += 10;
    if (/risk|impact|cost|customer|compliance|retention|efficiency/i.test(low)) score += 10;
    score = Math.min(100, score);

    const band = score >= 85 ? "Final-round ready" : score >= 70 ? "Strong base" : "Needs structure";
    roleplayUi.score.textContent = `Score: ${score}/100 — ${band}. Indicator coverage: ${indicatorHits}/${(s.indicators || []).length}.`;
    updateAiPrompt(s);
  };

  document.getElementById("clearRoleplayBtn").onclick = () => {
    roleplayUi.response.value = "";
    roleplayUi.score.textContent = "";
    updateAiPrompt(scenarios[Number(roleplayUi.select.value)] || scenarios[0]);
  };

  roleplayUi.response.oninput = () => updateAiPrompt(scenarios[Number(roleplayUi.select.value)] || scenarios[0]);
  document.getElementById("copyRoleplayPromptBtn").onclick = async () => {
    await copyTextWithFeedback(
      roleplayUi.aiPrompt.value,
      roleplayUi.score,
      "AI grading prompt copied to clipboard.",
      "Copy failed. Select the AI prompt text and copy it manually."
    );
  };

  renderVoicePractice(eventName, scenarios);
}

function renderVoicePractice(eventName, scenarios) {
  const voiceSelect = document.getElementById("voiceScenarioSelect");
  const voiceOutput = document.getElementById("voicePromptOutput");
  const voiceStatus = document.getElementById("voicePromptStatus");

  if (!scenarios.length) {
    voiceSelect.innerHTML = "";
    voiceOutput.value = "No roleplay scenarios available for this event.";
    return;
  }

  voiceSelect.innerHTML = scenarios.map((s, i) => `<option value="${i}">${s.name}</option>`).join("");

  const applyVoice = (idx) => {
    const s = scenarios[idx] || scenarios[0];
    voiceOutput.value = buildVoicePracticePrompt(eventName, s);
    voiceStatus.textContent = "";
  };

  applyVoice(0);

  voiceSelect.onchange = () => applyVoice(Number(voiceSelect.value));

  document.getElementById("regenerateVoicePromptBtn").onclick = () => {
    const randomIdx = Math.floor(Math.random() * scenarios.length);
    voiceSelect.value = String(randomIdx);
    applyVoice(randomIdx);
    voiceStatus.textContent = `Switched to: ${scenarios[randomIdx].name}`;
  };

  document.getElementById("copyVoicePromptBtn").onclick = async () => {
    await copyTextWithFeedback(
      voiceOutput.value,
      voiceStatus,
      "Voice prompt copied! Paste it into your voice AI app to start practicing.",
      "Copy failed. Select the prompt text and copy manually."
    );
  };
}

function buildFlashcards(eventName) {
  const base = getDeckForMode(eventName, getQuizBankMode()).slice(0, 18).map(shuffleOptions);
  const generated = base.map((q) => {
    const answerLine = Number.isInteger(q.answer)
      ? q.options[q.answer]
      : "No answer available.";
    const cleanedExplain = q.explain && q.explain.trim()
      ? cleanStudyText(q.explain)
      : "";
    const back = cleanedExplain ? `${answerLine}\n\n${cleanedExplain}` : answerLine;
    return { front: q.q, back };
  });

  state.flash.deck = generated.length ? generated : [
    { front: `${eventName} opening move`, back: "Define the objective, constraint, and stakeholder impact first." }
  ];
  state.flash.index = 0;
  state.flash.flipped = false;
  document.getElementById("flashDeckTitle").textContent = `${eventName} — Flashcards`;
  renderFlashcard();
  document.getElementById("memoryTactics").innerHTML = MEMORY_TACTICS.map((m) => `<li>${m}</li>`).join("");
}

function renderFlashcard() {
  haptic();
  const card = state.flash.deck[state.flash.index];
  const label = state.flash.flipped ? "Answer" : "Prompt";
  const text = state.flash.flipped ? card.back : card.front;
  document.getElementById("flashCard").innerHTML = `<div><p class="eyebrow">${label}</p><p>${text}</p></div>`;
}

function renderPrep(eventName) {
  const prep = BASE_PREP.map((p) => ({ label: p, key: `${eventName}-${p}` }));
  document.getElementById("prepChecklist").innerHTML = prep.map((item) => {
    const checked = localStorage.getItem(`prep-${item.key}`) === "1";
    return `
    <label class="check-item${checked ? ' checked' : ''}">
      <input type="checkbox" data-prep-key="${item.key}" ${checked ? 'checked' : ''}>
      <span>${item.label}</span>
    </label>
  `;
  }).join("");

  document.querySelectorAll('[data-prep-key]').forEach(cb => {
    cb.addEventListener('change', () => {
      const key = `prep-${cb.dataset.prepKey}`;
      localStorage.setItem(key, cb.checked ? '1' : '0');
      cb.closest('.check-item').classList.toggle('checked', cb.checked);
    });
  });

  const prod = getProductionTasks(eventName);
  const prodItems = prod?.tasks?.length ? prod.tasks : ["No production workflow mapped for this event. Use objective + roleplay prep modules."];
  document.getElementById("productionChecklist").innerHTML = prodItems.map((task, i) => {
    const key = `${eventName}-prod-${i}`;
    const checked = localStorage.getItem(`prod-${key}`) === "1";
    return `
    <label class="check-item${checked ? ' checked' : ''}">
      <input type="checkbox" data-prod-key="${key}" ${checked ? 'checked' : ''}>
      <span>${task}</span>
    </label>
  `;
  }).join("");

  document.querySelectorAll('[data-prod-key]').forEach(cb => {
    cb.addEventListener('change', () => {
      const key = `prod-${cb.dataset.prodKey}`;
      localStorage.setItem(key, cb.checked ? '1' : '0');
      cb.closest('.check-item').classList.toggle('checked', cb.checked);
    });
  });
}

function bindUi() {
  eventSearchEl.addEventListener("input", renderEventList);

  /* Mobile rail toggle (bottom sheet) */
  const railToggle = document.getElementById("railToggle");
  const eventRailEl = document.getElementById("eventRail");
  const railOverlay = document.getElementById("railOverlay");
  const isMobileRail = () => window.matchMedia("(max-width: 900px)").matches;

  function closeRail() {
    if (!eventRailEl) return;
    eventRailEl.classList.add("collapsed");
    railToggle?.classList.remove("open");
    railOverlay?.classList.remove("active");
    document.body.style.overflow = "";
  }

  function openRail() {
    if (!eventRailEl) return;
    eventRailEl.classList.remove("collapsed");
    railToggle?.classList.add("open");
    if (isMobileRail()) {
      railOverlay?.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  }

  if (railToggle && eventRailEl) {
    eventRailEl.classList.add("collapsed");
    railToggle.addEventListener("click", () => {
      haptic();
      if (eventRailEl.classList.contains("collapsed")) openRail();
      else closeRail();
    });
  }

  if (railOverlay) {
    railOverlay.addEventListener("click", closeRail);
  }

  /* Expose closeRail globally for openEvent auto-close */
  window.__closeRail = closeRail;

  wsTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      if (!state.currentEvent && tab.dataset.wsTab !== "overview") return;
      setWorkspaceTab(tab.dataset.wsTab);
    });
  });

  document.getElementById("openOverviewBtn").onclick = () => setWorkspaceTab("overview");
  document.getElementById("openQuizBtn").onclick = () => setWorkspaceTab("quiz");
  document.getElementById("openRoleplayBtn").onclick = () => {
    if (!hasOfficialRoleplay(state.currentEvent)) return;
    setWorkspaceTab("roleplay");
  };

  document.querySelectorAll(".rp-subtab").forEach((tab) => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".rp-subtab").forEach((t) => t.classList.toggle("active", t === tab));
      document.querySelectorAll(".rp-subpanel").forEach((p) => p.classList.toggle("active", p.id === tab.dataset.rpTab));
    });
  });
  document.getElementById("copyQuizAiPromptBtn").onclick = async () => {
    await copyTextWithFeedback(
      quizUi.aiPrompt.value,
      quizUi.aiHelpNote,
      "AI help prompt copied to clipboard.",
      "Copy failed. Select the AI help prompt text and copy it manually."
    );
  };

  document.getElementById("startExamBtn").onclick = startExam;
  quizUi.bankMode.onchange = () => {
    const currentTab = document.querySelector(".ws-tab.active")?.dataset.wsTab || "overview";
    updateQuizAvailability();
    setStats();
    if (state.currentEvent) openEvent(state.currentEvent, currentTab);
  };
  quizUi.count.onchange = () => updateQuizAvailability();
  document.getElementById("prevQuestionBtn").onclick = () => changeQuestion(-1);
  document.getElementById("nextQuestionBtn").onclick = () => changeQuestion(1);
  document.getElementById("submitExamBtn").onclick = submitExam;

  const launchWith = (countValue) => {
    if (!state.currentEvent) return;
    const candidate = quizUi.count.querySelector(`option[value="${countValue}"]`);
    if (!candidate || candidate.disabled) return;
    quizUi.count.value = countValue;
    startExam();
  };

  document.getElementById("launchTwentyBtn").onclick = () => launchWith("20");
  document.getElementById("launchFiftyBtn").onclick = () => launchWith("50");
  document.getElementById("launchHundredBtn").onclick = () => launchWith("100");
  document.getElementById("launchMaxBtn").onclick = () => launchWith("max");

  const flip = () => {
    if (!state.flash.deck.length) return;
    state.flash.flipped = !state.flash.flipped;
    renderFlashcard();
  };

  document.getElementById("flipCardBtn").onclick = flip;
  document.getElementById("flashCard").onclick = flip;
  document.getElementById("nextCardBtn").onclick = () => {
    if (!state.flash.deck.length) return;
    state.flash.index = (state.flash.index + 1) % state.flash.deck.length;
    state.flash.flipped = false;
    renderFlashcard();
  };

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    const activeTag = document.activeElement?.tagName;
    if (activeTag === "INPUT" || activeTag === "TEXTAREA" || activeTag === "SELECT") return;

    const activeTab = document.querySelector(".ws-tab.active")?.dataset.wsTab;

    if (activeTab === "quiz" && state.quiz.deck.length) {
      if (e.key === "ArrowLeft") { e.preventDefault(); changeQuestion(-1); }
      if (e.key === "ArrowRight") { e.preventDefault(); changeQuestion(1); }
      if (!state.quiz.submitted) {
        const optMap = { a: 0, b: 1, c: 2, d: 3 };
        const optIdx = optMap[e.key.toLowerCase()];
        if (optIdx !== undefined) {
          e.preventDefault();
          state.quiz.answers[state.quiz.index] = optIdx;
          renderQuestion();
          updateLiveScore();
          updateProgressBar();
        }
      }
    }

    if (activeTab === "flashcards") {
      if (e.key === " " || e.key === "Enter") { e.preventDefault(); flip(); }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        if (!state.flash.deck.length) return;
        state.flash.index = (state.flash.index + 1) % state.flash.deck.length;
        state.flash.flipped = false;
        renderFlashcard();
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        if (!state.flash.deck.length) return;
        state.flash.index = (state.flash.index - 1 + state.flash.deck.length) % state.flash.deck.length;
        state.flash.flipped = false;
        renderFlashcard();
      }
    }
  });
}

function init() {
  setStats();
  bindUi();
  renderEventList();

  // Open first event to avoid dead-end interface.
  openEvent(EVENTS[0], "overview");
}

init();
