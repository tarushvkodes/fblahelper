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
  "Introduction to Social Media Strategy", "Introduction to Supply Chain Management", "Job Interview", "Journalism", "Marketing",
  "Mobile Application Development", "Network Design", "Networking Infrastructures", "Organizational Leadership",
  "Parliamentary Procedure Individual", "Parliamentary Procedure Team", "Personal Finance", "Project Management",
  "Public Administration & Management", "Public Service Announcement", "Public Speaking", "Real Estate", "Retail Management",
  "Sales Presentation", "Securities & Investments", "Social Media Strategies", "Sports & Entertainment Management",
  "Supply Chain Management", "Technology Support & Services", "Visual Design", "Website Coding & Development"
];

const RESOURCE_DATA = window.RESOURCE_INTERACTIVE_DATA || { objectiveQuizzes: {}, roleplayScenarios: [], productionTests: {} };
const COMBINED = window.COMBINED_QUESTION_BANK || { banks: {}, stats: {} };

const MEMORY_TACTICS = [
  "Split misses by concept, not by test date.",
  "Do 2 timed sets before 1 untimed review pass.",
  "Explain one answer out loud after every 5 questions.",
  "In roleplay, state your recommendation by minute 2.",
  "End each session with a 90-second memory dump."
];

const BASE_PREP = [
  "Run one timed objective set and review every miss.",
  "Practice one roleplay and score your own structure.",
  "Do one production-style workflow under constraints.",
  "Refine your 30-second opening and closing.",
  "Build your final-day quick review sheet."
];

const state = {
  currentEvent: null,
  quiz: {
    deck: [],
    index: 0,
    answers: {},
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
const FBLA_SECONDS_PER_QUESTION = 60;

function norm(s) {
  return (s || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function inferFormat(eventName) {
  const lower = eventName.toLowerCase();
  if (lower.includes("interview") || lower.includes("speaking") || lower.includes("presentation") || lower.includes("announcement")) return "presentation";
  if (lower.includes("applications") || lower.includes("coding") || lower.includes("design") || lower.includes("development") || lower.includes("animation") || lower.includes("visual")) return "production";
  if (lower.includes("service") || lower.includes("management") || lower.includes("hospitality") || lower.includes("entrepreneurship") || lower.includes("international") || lower.includes("sales") || lower.includes("parliamentary")) return "roleplay";
  return "objective";
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
  const keys = Object.keys(RESOURCE_DATA.objectiveQuizzes || {});
  const key = findBestKey(keys, eventName);
  return key ? RESOURCE_DATA.objectiveQuizzes[key] : [];
}

function getCombinedDeck(eventName) {
  const keys = Object.keys(COMBINED.banks || {});
  const key = findBestKey(keys, eventName);
  return key ? COMBINED.banks[key] : [];
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

function getUnifiedDeck(eventName) {
  const official = getOfficialDeck(eventName).map((q) => ({ ...q, source: "official-hq" }));
  const historical = getCombinedDeck(eventName).map((q) => ({ ...q, source: q.source || "historical" }));
  return dedupeDeck([...official, ...historical]);
}

function getRoleplayDeck(eventName) {
  const ev = norm(eventName);
  const scenarios = (RESOURCE_DATA.roleplayScenarios || []).filter((s) => {
    const n = norm(s.event || s.name || "");
    return n.includes(ev) || ev.includes(n);
  });

  if (scenarios.length) return scenarios;

  return [
    {
      name: `${eventName} Scenario`,
      event: eventName,
      prompt: `You are competing in ${eventName}. Deliver a focused recommendation, defend it, and close with measurable next steps.`,
      indicators: [
        "State objective and constraints clearly",
        "Give a structured recommendation",
        "Respond to judge questions with evidence"
      ],
      judgeQuestions: [
        "What is your first step?",
        "How do you measure success?",
        "What is your contingency plan?"
      ]
    }
  ];
}

function getProductionTasks(eventName) {
  const keys = Object.keys(RESOURCE_DATA.productionTests || {});
  const key = findBestKey(keys, eventName);
  return key ? RESOURCE_DATA.productionTests[key] : null;
}

function setStats() {
  const questions = EVENTS.reduce((sum, eventName) => sum + getUnifiedDeck(eventName).length, 0);
  document.getElementById("statEvents").textContent = EVENTS.length;
  document.getElementById("statQuestions").textContent = questions;
  document.getElementById("statRoleplays").textContent = (RESOURCE_DATA.roleplayScenarios || []).length;
}

function renderEventList() {
  const q = eventSearchEl.value.trim().toLowerCase();
  const filtered = EVENTS.filter((event) => !q || event.toLowerCase().includes(q));
  const groups = [
    { key: "objective", label: "Objective Focus" },
    { key: "roleplay", label: "Roleplay Focus" },
    { key: "presentation", label: "Presentation Focus" },
    { key: "production", label: "Production Focus" }
  ];

  const html = groups.map((group) => {
    const events = filtered.filter((eventName) => inferFormat(eventName) === group.key).sort((a, b) => a.localeCompare(b));
    if (!events.length) return "";

    const cards = events.map((event) => {
      const total = getUnifiedDeck(event).length;
      const roleplays = getRoleplayDeck(event).length;
      const active = state.currentEvent === event ? "active" : "";
      return `
        <button class="event-item ${active}" data-event="${event}">
          <h4>${event}</h4>
          <div class="event-meta">
            <span class="badge">${total} questions</span>
            <span class="badge">${roleplays} roleplay</span>
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
}

function setWorkspaceTab(tabName) {
  wsTabs.forEach((t) => t.classList.toggle("active", t.dataset.wsTab === tabName));
  wsPanels.forEach((p) => p.classList.toggle("active", p.id === tabName));
}

function openEvent(eventName, tabName = "overview") {
  state.currentEvent = eventName;
  renderEventList();

  const format = inferFormat(eventName);
  document.getElementById("eventFormatLabel").textContent = `${format} event workspace`;
  document.getElementById("activeEventTitle").textContent = eventName;

  const combinedCount = getUnifiedDeck(eventName).length;
  const roleplayCount = getRoleplayDeck(eventName).length;

  document.getElementById("activeEventMeta").textContent = `${combinedCount} practice questions and ${roleplayCount} roleplay variants.`;
  document.getElementById("overviewRoleplayCount").textContent = `${roleplayCount} roleplay variants available.`;
  document.getElementById("overviewRoleplayHint").textContent = `Use scenario variants to practice different judge angles for ${eventName}.`;

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

  const countValue = document.getElementById("quizCount").value;

  const base = getUnifiedDeck(state.currentEvent);
  if (!base.length) {
    document.getElementById("quizCard").innerHTML = "<p>No question bank available for this event yet.</p>";
    return;
  }

  const count = countValue === "max" ? base.length : Number(countValue);

  state.quiz.deck = shuffle(base).slice(0, Math.min(count, base.length));
  state.quiz.index = 0;
  state.quiz.answers = {};
  state.quiz.submitted = false;
  state.quiz.running = true;
  state.quiz.secondsLeft = state.quiz.deck.length * FBLA_SECONDS_PER_QUESTION;

  stopQuizTimer();
  state.quiz.timerId = setInterval(() => {
    state.quiz.secondsLeft -= 1;
    document.getElementById("quizTimer").textContent = formatTimer(Math.max(0, state.quiz.secondsLeft));
    if (state.quiz.secondsLeft <= 0) {
      submitExam();
    }
  }, 1000);

  document.getElementById("examResults").innerHTML = "";
  document.getElementById("examResults").innerHTML = "<p>Submit exam to see full right/wrong explanations for every question and option.</p>";
  renderQuestion();
  setWorkspaceTab("quiz");
}

function renderQuestion() {
  const deck = state.quiz.deck;
  if (!deck.length) return;
  const idx = state.quiz.index;
  const item = deck[idx];
  const chosen = state.quiz.answers[idx];

  document.getElementById("quizProgress").textContent = `Question ${idx + 1} of ${deck.length}`;
  document.getElementById("quizTimer").textContent = formatTimer(Math.max(0, state.quiz.secondsLeft));

  const optionsHtml = item.options.map((opt, oIdx) => {
    let cls = "option";
    if (chosen === oIdx) cls += " selected";
    if (state.quiz.submitted && Number.isInteger(item.answer)) {
      if (oIdx === item.answer) cls += " correct";
      else if (chosen === oIdx) cls += " wrong";
    }
    return `<button class="${cls}" data-opt="${oIdx}">${String.fromCharCode(65 + oIdx)}. ${opt}</button>`;
  }).join("");

  document.getElementById("quizCard").innerHTML = `
    <p class="eyebrow">${item.source || "question-bank"}</p>
    <h3>Q${idx + 1}. ${item.q}</h3>
    <div>${optionsHtml}</div>
  `;

  document.querySelectorAll("[data-opt]").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (state.quiz.submitted) return;
      state.quiz.answers[idx] = Number(btn.dataset.opt);
      renderQuestion();
      updateLiveScore();
    });
  });

  updateLiveScore();
}

function updateLiveScore() {
  const deck = state.quiz.deck;
  const answeredIdx = Object.keys(state.quiz.answers).map((k) => Number(k));
  let correct = 0;
  answeredIdx.forEach((i) => {
    const q = deck[i];
    if (Number.isInteger(q?.answer) && q.answer === state.quiz.answers[i]) correct += 1;
  });
  document.getElementById("quizScoreLive").textContent = `${correct} / ${answeredIdx.length}`;
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
  state.quiz.submitted = true;
  stopQuizTimer();

  const deck = state.quiz.deck;
  let total = 0;
  let correct = 0;
  const reviewRows = [];

  const genericExplainPattern = /adapted from the official sample question set\.?/i;

  const questionFocus = (text) => {
    return (text || "this concept").replace(/\s+/g, " ").trim();
  };

  const toAnswerLabel = (q, idx) => {
    if (!Number.isInteger(idx) || !q?.options?.[idx]) return "No answer selected";
    return `${String.fromCharCode(65 + idx)}. ${q.options[idx]}`;
  };

  const optionReason = (q, idx) => {
    const optionLabel = toAnswerLabel(q, idx);
    if (!Number.isInteger(q?.answer)) {
      return `${optionLabel}: Review this choice against the key term in the prompt.`;
    }
    if (idx === q.answer) {
      return `${optionLabel}: Correct because it directly answers what the prompt asks about ${questionFocus(q.q)}.`;
    }
    return `${optionLabel}: Not correct here because it does not best match the exact concept tested in this prompt.`;
  };

  const toExplanation = (q) => {
    if (q?.explain && !genericExplainPattern.test(q.explain)) return q.explain;
    if (Number.isInteger(q?.answer) && q?.options?.[q.answer]) {
      return `The key is matching the prompt to the most direct concept. Here, ${toAnswerLabel(q, q.answer)} is the only option that fits cleanly.`;
    }
    return "Review this concept and compare your choice with official guidance.";
  };

  deck.forEach((q, i) => {
    if (!Number.isInteger(q.answer)) return;
    total += 1;
    const picked = state.quiz.answers[i];
    const isCorrect = picked === q.answer;
    if (isCorrect) correct += 1;

    const optionFeedback = q.options
      .map((_, idx) => `<li>${optionReason(q, idx)}</li>`)
      .join("");

    reviewRows.push(`
      <article class="exam-review-item">
        <strong>Q${i + 1}. ${q.q}</strong>
        <p class="${isCorrect ? "answer-good" : "answer-bad"}">${isCorrect ? "Correct" : "Incorrect"}</p>
        <p><strong>Your answer:</strong> ${toAnswerLabel(q, picked)}</p>
        <p><strong>Right answer:</strong> ${toAnswerLabel(q, q.answer)}</p>
        <p><strong>Why:</strong> ${toExplanation(q)}</p>
        <ul class="option-review-list">${optionFeedback}</ul>
      </article>
    `);
  });

  const pct = total ? Math.round((correct / total) * 100) : 0;
  const verdict = pct >= 85 ? "Nationals pace" : pct >= 70 ? "Solid" : "Needs reinforcement";

  document.getElementById("examResults").innerHTML = `
    <h3>Exam Result</h3>
    <p><strong>${correct}/${total}</strong> (${pct}%) - ${verdict}</p>
    <p class="eyebrow">Question Review</p>
    <div class="exam-review">${reviewRows.join("")}</div>
  `;

  renderQuestion();
}

function renderRoleplay(eventName) {
  const scenarios = getRoleplayDeck(eventName);
  const select = document.getElementById("scenarioSelect");
  select.innerHTML = scenarios.map((s, i) => `<option value="${i}">${s.name}</option>`).join("");

  const apply = (idx) => {
    const s = scenarios[idx] || scenarios[0];
    document.getElementById("scenarioPrompt").innerHTML = `<p><strong>${s.event}</strong></p><p>${s.prompt}</p>`;
    document.getElementById("judgeQuestion").textContent = s.judgeQuestions[0] || "What is your first step?";
    document.getElementById("roleplayIndicators").innerHTML = (s.indicators || []).map((i) => `<li>${i}</li>`).join("");
    document.getElementById("roleplayScore").textContent = "";
  };

  apply(0);

  select.onchange = () => apply(Number(select.value));
  document.getElementById("newJudgeQuestionBtn").onclick = () => {
    const s = scenarios[Number(select.value)] || scenarios[0];
    const q = s.judgeQuestions[Math.floor(Math.random() * s.judgeQuestions.length)] || "What is your first step?";
    document.getElementById("judgeQuestion").textContent = q;
  };

  document.getElementById("gradeRoleplayBtn").onclick = () => {
    const s = scenarios[Number(select.value)] || scenarios[0];
    const text = document.getElementById("roleplayResponse").value.trim();
    if (!text) {
      document.getElementById("roleplayScore").textContent = "Write your draft first.";
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
    document.getElementById("roleplayScore").textContent = `Draft Score: ${score}/100 - ${band}. Indicator coverage: ${indicatorHits}/${(s.indicators || []).length}.`;
  };

  document.getElementById("clearRoleplayBtn").onclick = () => {
    document.getElementById("roleplayResponse").value = "";
    document.getElementById("roleplayScore").textContent = "";
  };
}

function buildFlashcards(eventName) {
  const base = getUnifiedDeck(eventName).slice(0, 18);
  const generated = base.map((q) => {
    const back = Number.isInteger(q.answer)
      ? `${String.fromCharCode(65 + q.answer)}. ${q.options[q.answer]}`
      : "Review this concept and explain your choice out loud.";
    return { front: q.q, back };
  });

  state.flash.deck = generated.length ? generated : [
    { front: `${eventName} opening move`, back: "Define the objective, constraint, and stakeholder impact first." }
  ];
  state.flash.index = 0;
  state.flash.flipped = false;
  document.getElementById("flashDeckTitle").textContent = `${eventName} Flashcards`;
  renderFlashcard();
  document.getElementById("memoryTactics").innerHTML = MEMORY_TACTICS.map((m) => `<li>${m}</li>`).join("");
}

function renderFlashcard() {
  const card = state.flash.deck[state.flash.index];
  const label = state.flash.flipped ? "Answer" : "Prompt";
  const text = state.flash.flipped ? card.back : card.front;
  document.getElementById("flashCard").innerHTML = `<div><p class="eyebrow">${label}</p><p>${text}</p></div>`;
}

function renderPrep(eventName) {
  const prep = BASE_PREP.map((p) => ({ label: p, key: `${eventName}-${p}` }));
  document.getElementById("prepChecklist").innerHTML = prep.map((item) => `
    <label class="check-item">
      <input type="checkbox" data-prep-key="${item.key}">
      <span>${item.label}</span>
    </label>
  `).join("");

  const prod = getProductionTasks(eventName);
  const prodItems = prod?.tasks?.length ? prod.tasks : ["No production workflow mapped for this event. Use objective + roleplay prep modules."];
  document.getElementById("productionChecklist").innerHTML = prodItems.map((task, i) => `
    <label class="check-item">
      <input type="checkbox" data-prod-key="${eventName}-prod-${i}">
      <span>${task}</span>
    </label>
  `).join("");
}

function bindUi() {
  eventSearchEl.addEventListener("input", renderEventList);

  wsTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      if (!state.currentEvent && tab.dataset.wsTab !== "overview") return;
      setWorkspaceTab(tab.dataset.wsTab);
    });
  });

  document.getElementById("openOverviewBtn").onclick = () => setWorkspaceTab("overview");
  document.getElementById("openQuizBtn").onclick = () => setWorkspaceTab("quiz");
  document.getElementById("openRoleplayBtn").onclick = () => setWorkspaceTab("roleplay");

  document.getElementById("startExamBtn").onclick = startExam;
  document.getElementById("prevQuestionBtn").onclick = () => changeQuestion(-1);
  document.getElementById("nextQuestionBtn").onclick = () => changeQuestion(1);
  document.getElementById("submitExamBtn").onclick = submitExam;

  const launchWith = (countValue) => {
    if (!state.currentEvent) return;
    document.getElementById("quizCount").value = countValue;
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
}

function init() {
  setStats();
  bindUi();
  renderEventList();

  // Open first event to avoid dead-end interface.
  openEvent(EVENTS[0], "overview");
}

init();
