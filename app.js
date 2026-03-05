const EVENTS = [
  "Accounting",
  "Advanced Accounting",
  "Advertising",
  "Agribusiness",
  "Banking & Financial Systems",
  "Broadcast Journalism",
  "Business Communication",
  "Business Ethics",
  "Business Law",
  "Business Management",
  "Business Plan",
  "Career Portfolio",
  "Coding & Programming",
  "Community Service Project",
  "Computer Applications",
  "Computer Game & Simulation Programming",
  "Computer Problem Solving",
  "Customer Service",
  "Cybersecurity",
  "Data Analysis",
  "Data Science & AI",
  "Digital Animation",
  "Digital Video Production",
  "Economics",
  "Entrepreneurship",
  "Event Planning",
  "Financial Planning",
  "Future Business Educator",
  "Future Business Leader",
  "Graphic Design",
  "Healthcare Administration",
  "Hospitality & Event Management",
  "Human Resource Management",
  "Impromptu Speaking",
  "Insurance & Risk Management",
  "International Business",
  "Introduction to Business Communication",
  "Introduction to Business Concepts",
  "Introduction to Business Presentation",
  "Introduction to Business Procedures",
  "Introduction to FBLA",
  "Introduction to Information Technology",
  "Introduction to Marketing Concepts",
  "Introduction to Parliamentary Procedure",
  "Introduction to Programming",
  "Introduction to Public Speaking",
  "Introduction to Retail & Merchandising",
  "Introduction to Social Media Strategy",
  "Introduction to Supply Chain Management",
  "Job Interview",
  "Journalism",
  "Marketing",
  "Mobile Application Development",
  "Network Design",
  "Networking Infrastructures",
  "Organizational Leadership",
  "Parliamentary Procedure Individual",
  "Parliamentary Procedure Team",
  "Personal Finance",
  "Project Management",
  "Public Administration & Management",
  "Public Service Announcement",
  "Public Speaking",
  "Real Estate",
  "Retail Management",
  "Sales Presentation",
  "Securities & Investments",
  "Social Media Strategies",
  "Sports & Entertainment Management",
  "Supply Chain Management",
  "Technology Support & Services",
  "Visual Design",
  "Website Coding & Development"
];

const OFFICIAL_RESOURCES = [
  { type: "Objective", event: "Accounting", file: "fblaresources/objective tests/Accounting-Sample-Questions.pdf" },
  { type: "Objective", event: "Business Communication", file: "fblaresources/objective tests/Business-Communication-Sample-Questions.pdf" },
  { type: "Objective", event: "Cybersecurity", file: "fblaresources/objective tests/Cybersecurity-Sample-Questions.pdf" },
  { type: "Objective", event: "Economics", file: "fblaresources/objective tests/Economics-Sample-Questions.pdf" },
  { type: "Objective", event: "Parliamentary Procedure", file: "fblaresources/objective tests/National-Association-of-Parliamentarians-Study-Guide.pdf" },
  { type: "Production", event: "Computer Applications", file: "fblaresources/production test/Computer-Applications-Sample-Production-Test.pdf" },
  { type: "Roleplay", event: "Business Management", file: "fblaresources/sample roleplays/Business-Management---Sample-1.docx" },
  { type: "Roleplay", event: "Customer Service", file: "fblaresources/sample roleplays/Customer-Service---Sample-1.docx" },
  { type: "Roleplay", event: "Entrepreneurship", file: "fblaresources/sample roleplays/Entrepreneurship---Sample-1.docx" },
  { type: "Roleplay", event: "Hospitality & Event Management", file: "fblaresources/sample roleplays/Hospitality--Event-Management---Sample-1.docx" },
  { type: "Roleplay", event: "International Business", file: "fblaresources/sample roleplays/International-Business---Sample-1.docx" },
  { type: "Roleplay", event: "Event Planning", file: "fblaresources/sample roleplays/Introduction-to-Event-Planning---Sample-1.pdf" },
  { type: "Roleplay", event: "Marketing", file: "fblaresources/sample roleplays/Marketing---Sample-1.docx" },
  { type: "Roleplay", event: "Network Design", file: "fblaresources/sample roleplays/Network-Design---Sample-1.docx" },
  { type: "Roleplay", event: "Parliamentary Procedure", file: "fblaresources/sample roleplays/Parliamentary-Procedure---Sample-1.docx" },
  { type: "Roleplay", event: "Sports & Entertainment Management", file: "fblaresources/sample roleplays/Sports-and-Entertainment-Management---Sample-1.docx" },
  { type: "Roleplay", event: "Technology Support & Services", file: "fblaresources/sample roleplays/Technology-Support--Services---Sample-1.docx" }
];

const QUIZZES = {
  "Accounting": [
    {
      q: "A working paper used to summarize general ledger information needed to prepare financial statements is called a:",
      options: ["ledger account form", "source document", "worksheet", "journal"],
      answer: 2,
      explain: "From Accounting sample questions in the combined transcript."
    },
    {
      q: "Information for the worksheet is gathered from the:",
      options: ["balance sheet", "income statement", "general ledger accounts", "journal"],
      answer: 2,
      explain: "General ledger accounts are the direct source."
    },
    {
      q: "Which account type is Income Summary?",
      options: ["Liability", "Revenue", "Equity", "Asset"],
      answer: 2,
      explain: "In these materials, Income Summary is treated in equity-closing flow."
    },
    {
      q: "To check equality of ledger accounts after posting, you prepare a:",
      options: ["trial balance", "proved journal", "income statement", "balance sheet"],
      answer: 0,
      explain: "Trial balance checks debit-credit equality."
    },
    {
      q: "A business owned by two or more people is a:",
      options: ["charter corporation", "sole proprietorship", "corporation", "partnership"],
      answer: 3,
      explain: "Partnership is the correct ownership form."
    }
  ],
  "Business Communication": [
    {
      q: "In the sentence 'Congratulations! We are proud of you.', the bold word type is:",
      options: ["interjection", "verb", "conjunction", "noun"],
      answer: 0,
      explain: "Congratulations! functions as an interjection."
    },
    {
      q: "One purpose of communication is to:",
      options: ["persuade", "the message", "interpret", "the receiver"],
      answer: 0,
      explain: "Purpose includes persuasion."
    },
    {
      q: "A common proofreading error is:",
      options: ["long words", "word or letter omission/addition", "capitalization", "numbers"],
      answer: 1,
      explain: "Omissions/additions are highly common."
    },
    {
      q: "One element of writing style is:",
      options: ["voice", "speech", "capitalization", "diction"],
      answer: 0,
      explain: "Voice is a central writing-style element."
    },
    {
      q: "Necessary information in business messages typically includes:",
      options: ["who, what, where, when, why", "which, when, why, what, who", "word, when, who, why, what", "what, word, when, which, why"],
      answer: 0,
      explain: "Classic 5Ws structure."
    }
  ],
  "Cybersecurity": [
    {
      q: "The attack where an aggressor poses as a legitimate DNS server is:",
      options: ["Web spoofing", "man in the middle", "DNS spoofing", "ARP poisoning"],
      answer: 2,
      explain: "DNS spoofing is the named attack."
    },
    {
      q: "Encoding a file so only intended recipients can read it is:",
      options: ["encryption", "password", "algorithm", "key"],
      answer: 0,
      explain: "Encryption is the process."
    },
    {
      q: "Passing reserved IP addresses through a public network often requires:",
      options: ["authentication", "tunneling", "VPN", "cipher"],
      answer: 1,
      explain: "Question wording in source expects tunneling."
    },
    {
      q: "For logging to be effective, admins must:",
      options: ["use circular logging", "configure SNMP traps", "shutdown when full", "review logs regularly"],
      answer: 3,
      explain: "Review cadence is key for security."
    },
    {
      q: "HTTPS stands for:",
      options: ["Hypertext Transfer Protocol Software", "Hypertext Transfer Protocol Shell", "Hypertext Transfer Protocol System", "Hypertext Transfer Protocol Secure"],
      answer: 3,
      explain: "Secure is the correct expansion."
    }
  ],
  "Economics": [
    {
      q: "Fiscal policy tools include:",
      options: ["taxes only", "spending only", "money supply growth", "taxes and government spending"],
      answer: 3,
      explain: "Fiscal policy controls taxes and spending."
    },
    {
      q: "A government subsidy to producers usually:",
      options: ["increases demand", "increases supply", "reduces demand", "reduces supply"],
      answer: 1,
      explain: "Subsidies reduce producer costs and expand supply."
    },
    {
      q: "Basic rationale for international trade is:",
      options: ["comparative advantage", "absolute advantage", "increasing opportunity costs", "law of demand"],
      answer: 0,
      explain: "Comparative advantage drives gains from trade."
    },
    {
      q: "In pure competition, firms maximize profit when:",
      options: ["AFC=AVC", "ATC=AVC", "MC=MR", "AFC=ATC"],
      answer: 2,
      explain: "MC equals MR is standard profit-max condition."
    },
    {
      q: "A firm in pure competition is a:",
      options: ["price maker", "mutually interdependent", "price chooser", "price taker"],
      answer: 3,
      explain: "Competitive firms accept market price."
    }
  ],
  "Computer Applications (Production)": [
    {
      q: "How much total time is allotted for the 2017 Computer Applications production test?",
      options: ["60 minutes", "90 minutes", "120 minutes", "150 minutes"],
      answer: 2,
      explain: "The production test instructions specify two hours."
    },
    {
      q: "Job 5 in the sample production test is:",
      options: ["Chart", "Presentation", "Database with report and queries", "Word flyer"],
      answer: 2,
      explain: "Job table lists Job 5 as Database with report and queries."
    },
    {
      q: "For Job 1, what should be added in Column G?",
      options: ["Tax", "Bonus", "Variance", "Category"],
      answer: 1,
      explain: "Instructions specify BONUS in all caps."
    },
    {
      q: "Spreadsheet sales values should be formatted as:",
      options: ["General numbers", "Percent", "Currency with two decimals", "Date"],
      answer: 2,
      explain: "Explicit instruction in Job 1."
    },
    {
      q: "The chart for Job 2 should be:",
      options: ["Pie chart", "2D line chart", "Clustered column chart with 3D effects", "Scatter plot"],
      answer: 2,
      explain: "Chart instructions call for clustered column with 3D effects."
    }
  ]
};

const FLASHCARD_DECKS = {
  "Universal Competition Moves": [
    { front: "Objective test strategy in first 5 minutes", back: "Skim the full test, mark fast wins, and set time checkpoints before solving deeply." },
    { front: "Best way to use competencies", back: "Convert each competency into a question you can answer out loud and one mini example." },
    { front: "When to guess in objective events", back: "After eliminating options and when the time budget for the question is exhausted." },
    { front: "Role play opening line", back: "State role, objective, and one sentence showing empathy or business focus in under 20 seconds." },
    { front: "Production test quality loop", back: "Complete core tasks first, then run a final 3-pass proof: formatting, numbers, naming." }
  ],
  "Accounting": [
    { front: "Worksheet purpose", back: "Summarizes ledger info for statement preparation and adjustment visibility." },
    { front: "Trial balance use", back: "Checks equal debits/credits after posting." },
    { front: "Income Summary closes into", back: "Owner equity/capital in closing process." },
    { front: "Vertical analysis", back: "Express each line as a percentage base (often total assets or net sales)." }
  ],
  "Business Communication": [
    { front: "5Ws in messages", back: "Who, what, where, when, why for complete and concise communication." },
    { front: "Proofreading hotspot", back: "Word and letter omissions/additions are common misses." },
    { front: "Writing style element", back: "Voice reflects tone and authorial stance." }
  ],
  "Cybersecurity": [
    { front: "DNS spoofing", back: "Attack where DNS responses are forged to redirect users." },
    { front: "CIA triad", back: "Confidentiality, Integrity, Availability." },
    { front: "HTTPS", back: "Hypertext Transfer Protocol Secure." }
  ]
};

const ROLEPLAY_SCENARIOS = [
  {
    name: "Hospitality Payroll Outsourcing Pitch",
    event: "Hospitality & Event Management",
    prompt: "Convince franchise owners to outsource payroll while addressing employee trust, health care compliance, and wage-garnishment complexity.",
    indicators: [
      "Explain outsourcing advantages clearly",
      "Present a convincing, businesslike recommendation",
      "Show confidence and content command",
      "Give practical implementation rationale"
    ],
    judgeQuestions: [
      "How will you resolve employee payroll issues quickly?",
      "What management benefits will we see in month one?",
      "How do you stay compliant with changing health care rules?",
      "What cost savings can we realistically expect in year one?"
    ]
  },
  {
    name: "Client Service Recovery Call",
    event: "Customer Service",
    prompt: "Handle an upset customer and recover trust without promising what operations cannot deliver.",
    indicators: [
      "Lead with empathy and ownership",
      "Clarify facts before proposing a solution",
      "Offer options and follow-up commitments",
      "Close with confidence and confirmation"
    ],
    judgeQuestions: [
      "Why should I believe this will not happen again?",
      "What exact step will you take right now?",
      "How will you compensate for the disruption?"
    ]
  },
  {
    name: "Network Design Stakeholder Brief",
    event: "Network Design",
    prompt: "Present a practical network upgrade plan with security, cost, and implementation tradeoffs.",
    indicators: [
      "Translate technical risk for non-technical stakeholders",
      "Prioritize uptime and security controls",
      "Show phased rollout thinking",
      "Defend your budget assumptions"
    ],
    judgeQuestions: [
      "How does this design reduce security risk?",
      "What happens if budget is cut by 20%?",
      "What is your backup plan during migration?"
    ]
  }
];

const ROLEPLAY_STEPS = [
  "Opening: define role and success objective in one sentence.",
  "Diagnosis: ask clarifying questions before pitching solutions.",
  "Framework: present a 3-point recommendation (risk, action, impact).",
  "Evidence: tie recommendations to cost, compliance, or customer outcomes.",
  "Close: confirm next actions, owner, and timeline."
];

const PREP_CHECKLIST = [
  "Review event competencies and convert each into one practice prompt.",
  "Run one timed objective set and analyze misses by category.",
  "Rehearse one role play with strict timing and peer feedback.",
  "Complete one production-style task under exam constraints.",
  "Score yourself using rubric sliders and target weakest criterion.",
  "Build a one-page pre-competition quick sheet (formulas, terms, structures)."
];

const MEMORY_TIPS = [
  "Use spaced repetition: same deck today, tomorrow, and in 3 days.",
  "Speak answers before flipping cards to strengthen retrieval.",
  "Group mistakes by concept rather than by event title.",
  "Interleave: alternate objective questions with roleplay drills.",
  "End each study block with a 2-minute recap from memory only."
];

const TIME_STRATEGY = [
  "Objective events: reserve 10% of time for flagged questions.",
  "Role play prep: 40% analysis, 40% structure, 20% rehearsal.",
  "Production tests: complete required output skeletons first.",
  "For presentations, rehearse a 30-second strong close.",
  "Never enter final minute with unanswered easy questions."
];

const RUBRIC = [
  { key: "content", label: "Content Accuracy", max: 10, value: 7 },
  { key: "structure", label: "Structure & Clarity", max: 10, value: 7 },
  { key: "delivery", label: "Delivery Confidence", max: 10, value: 7 },
  { key: "professionalism", label: "Professionalism", max: 10, value: 7 },
  { key: "time", label: "Time Management", max: 10, value: 7 }
];

const state = {
  flash: { deck: "Universal Competition Moves", index: 0, flipped: false },
  quiz: { deck: null, index: 0, score: 0, locked: false },
  roleplaySeconds: 20 * 60,
  roleplayPreset: 20 * 60,
  compSeconds: 60 * 60
};

const tabButtons = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".panel");

function inferFormat(eventName) {
  const lower = eventName.toLowerCase();
  if (lower.includes("interview") || lower.includes("speaking") || lower.includes("presentation") || lower.includes("announcement")) return "presentation";
  if (lower.includes("applications") || lower.includes("coding") || lower.includes("design") || lower.includes("development") || lower.includes("animation") || lower.includes("visual")) return "production";
  if (lower.includes("service") || lower.includes("management") || lower.includes("hospitality") || lower.includes("entrepreneurship") || lower.includes("international") || lower.includes("sales") || lower.includes("parliamentary")) return "roleplay";
  return "objective";
}

function hasQuiz(eventName) {
  return Object.keys(QUIZZES).some((k) => eventName.toLowerCase().includes(k.toLowerCase()) || k.toLowerCase().includes(eventName.toLowerCase()));
}

function hasOfficialResource(eventName) {
  return OFFICIAL_RESOURCES.some((res) => eventName.toLowerCase().includes(res.event.toLowerCase()) || res.event.toLowerCase().includes(eventName.toLowerCase()));
}

function getResourceCountForEvent(eventName) {
  return OFFICIAL_RESOURCES.filter((res) => eventName.toLowerCase().includes(res.event.toLowerCase()) || res.event.toLowerCase().includes(eventName.toLowerCase())).length;
}

function renderEventGrid() {
  const container = document.getElementById("eventGrid");
  const search = document.getElementById("eventSearch").value.trim().toLowerCase();
  const filter = document.getElementById("eventFilter").value;

  const cards = EVENTS
    .map((name) => {
      const format = inferFormat(name);
      const quiz = hasQuiz(name);
      const resourceCount = getResourceCountForEvent(name);
      const matchesSearch = !search || name.toLowerCase().includes(search);
      const matchesFilter = filter === "all" || filter === format;
      if (!matchesSearch || !matchesFilter) return "";

      const prepPath = {
        objective: "Objective drill + flashcards + timed quiz",
        roleplay: "Case framework + judge Q simulator + timer",
        presentation: "Outline + delivery rubric + rehearsal timer",
        production: "Task decomposition + production timer + quality pass"
      }[format];

      return `
        <article class="event-card">
          <h4>${name}</h4>
          <div class="meta">
            <span class="badge">${format}</span>
            <span class="badge ${quiz ? "ok" : "warn"}">${quiz ? "quiz ready" : "template quiz"}</span>
            <span class="badge ${resourceCount ? "ok" : "warn"}">${resourceCount} official file${resourceCount === 1 ? "" : "s"}</span>
          </div>
          <p><strong>Prep Path:</strong> ${prepPath}</p>
          <p><strong>Action:</strong> ${quiz ? "Start targeted quiz in Practice Quiz Lab." : "Use flashcards + rubric checklist to build event-specific mastery."}</p>
        </article>
      `;
    })
    .join("");

  container.innerHTML = cards || "<p>No events matched this filter.</p>";
}

function renderFlashcards() {
  const deckSelect = document.getElementById("deckSelect");
  deckSelect.innerHTML = Object.keys(FLASHCARD_DECKS)
    .map((name) => `<option value="${name}" ${name === state.flash.deck ? "selected" : ""}>${name}</option>`)
    .join("");

  const card = FLASHCARD_DECKS[state.flash.deck][state.flash.index];
  const face = state.flash.flipped ? card.back : card.front;
  const label = state.flash.flipped ? "Back" : "Front";
  document.getElementById("flashcard").innerHTML = `<div><p><strong>${label}</strong></p><p>${face}</p></div>`;

  document.getElementById("memoryTips").innerHTML = MEMORY_TIPS.map((tip) => `<li>${tip}</li>`).join("");
}

function renderRoleplay() {
  const scenarioSelect = document.getElementById("scenarioSelect");
  scenarioSelect.innerHTML = ROLEPLAY_SCENARIOS
    .map((s, i) => `<option value="${i}">${s.name} (${s.event})</option>`)
    .join("");

  applyScenario(0);
  document.getElementById("roleplaySteps").innerHTML = ROLEPLAY_STEPS.map((s) => `<li>${s}</li>`).join("");
}

function applyScenario(index) {
  const scenario = ROLEPLAY_SCENARIOS[index];
  document.getElementById("scenarioCard").innerHTML = `
    <p><strong>Event:</strong> ${scenario.event}</p>
    <p><strong>Prompt:</strong> ${scenario.prompt}</p>
    <p><strong>Goal:</strong> Deliver a recommendation that is specific, measurable, and judge-friendly.</p>
  `;
  document.getElementById("performanceIndicators").innerHTML = scenario.indicators.map((i) => `<li>${i}</li>`).join("");
  document.getElementById("judgeQuestion").textContent = scenario.judgeQuestions[0];
}

function newJudgeQuestion() {
  const idx = Number(document.getElementById("scenarioSelect").value);
  const scenario = ROLEPLAY_SCENARIOS[idx];
  const q = scenario.judgeQuestions[Math.floor(Math.random() * scenario.judgeQuestions.length)];
  document.getElementById("judgeQuestion").textContent = q;
}

function formatTime(sec) {
  const minutes = Math.floor(sec / 60).toString().padStart(2, "0");
  const seconds = Math.floor(sec % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function makeTimer(getSeconds, setSeconds, elId) {
  let intervalId = null;

  const tick = () => {
    const current = getSeconds();
    if (current <= 0) {
      clearInterval(intervalId);
      intervalId = null;
      document.getElementById(elId).textContent = "00:00";
      return;
    }
    setSeconds(current - 1);
    document.getElementById(elId).textContent = formatTime(getSeconds());
  };

  return {
    start: () => {
      if (intervalId) return;
      intervalId = setInterval(tick, 1000);
    },
    pause: () => {
      clearInterval(intervalId);
      intervalId = null;
    },
    refresh: () => {
      document.getElementById(elId).textContent = formatTime(getSeconds());
    }
  };
}

let roleplayTimer;
let compTimer;

function setupTimers() {
  roleplayTimer = makeTimer(() => state.roleplaySeconds, (v) => { state.roleplaySeconds = v; }, "roleplayClock");
  compTimer = makeTimer(() => state.compSeconds, (v) => { state.compSeconds = v; }, "compClock");

  document.querySelectorAll("[data-roleplay-preset]").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.roleplayPreset = Number(btn.dataset.roleplayPreset) * 60;
      state.roleplaySeconds = state.roleplayPreset;
      roleplayTimer.refresh();
    });
  });

  document.getElementById("roleplayStart").addEventListener("click", () => roleplayTimer.start());
  document.getElementById("roleplayPause").addEventListener("click", () => roleplayTimer.pause());
  document.getElementById("roleplayReset").addEventListener("click", () => {
    roleplayTimer.pause();
    state.roleplaySeconds = state.roleplayPreset;
    roleplayTimer.refresh();
  });

  document.getElementById("compSet").addEventListener("click", () => {
    const mins = Math.max(1, Math.min(240, Number(document.getElementById("compMinutes").value || 60)));
    state.compSeconds = mins * 60;
    compTimer.pause();
    compTimer.refresh();
  });
  document.getElementById("compStart").addEventListener("click", () => compTimer.start());
  document.getElementById("compPause").addEventListener("click", () => compTimer.pause());

  document.getElementById("timeStrategy").innerHTML = TIME_STRATEGY.map((tip) => `<li>${tip}</li>`).join("");
  roleplayTimer.refresh();
  compTimer.refresh();
}

function renderQuizSelect() {
  const select = document.getElementById("quizSelect");
  select.innerHTML = Object.keys(QUIZZES).map((key) => `<option value="${key}">${key}</option>`).join("");
}

function renderQuizQuestion() {
  const box = document.getElementById("quizBox");
  const deck = QUIZZES[state.quiz.deck] || [];

  if (!deck.length) {
    box.innerHTML = "<p>Select a quiz deck and start.</p>";
    return;
  }

  if (state.quiz.index >= deck.length) {
    box.innerHTML = `
      <h4>Quiz Complete</h4>
      <p>Score: <strong>${state.quiz.score}/${deck.length}</strong></p>
      <p>Review and retake to improve speed and accuracy.</p>
    `;
    return;
  }

  const item = deck[state.quiz.index];
  box.innerHTML = `
    <p><strong>Q${state.quiz.index + 1} of ${deck.length}</strong></p>
    <p>${item.q}</p>
    <div id="quizOptions"></div>
    <p id="quizFeedback"></p>
  `;

  const optionsEl = document.getElementById("quizOptions");
  item.options.forEach((opt, idx) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = `${String.fromCharCode(65 + idx)}. ${opt}`;
    btn.addEventListener("click", () => gradeAnswer(idx));
    optionsEl.appendChild(btn);
  });
}

function gradeAnswer(selected) {
  if (state.quiz.locked) return;
  state.quiz.locked = true;

  const item = QUIZZES[state.quiz.deck][state.quiz.index];
  const buttons = document.querySelectorAll("#quizOptions .option-btn");
  buttons.forEach((btn, idx) => {
    if (idx === item.answer) btn.classList.add("correct");
    if (idx === selected && idx !== item.answer) btn.classList.add("wrong");
  });

  const correct = selected === item.answer;
  if (correct) state.quiz.score += 1;

  document.getElementById("quizFeedback").innerHTML = `${correct ? "Correct." : "Not quite."} ${item.explain}`;
  setTimeout(() => {
    state.quiz.index += 1;
    state.quiz.locked = false;
    renderQuizQuestion();
  }, 900);
}

function renderRubric() {
  const rows = document.getElementById("rubricRows");
  rows.innerHTML = RUBRIC
    .map((r) => `
      <div class="rubric-row">
        <label for="rubric-${r.key}">${r.label} (${r.max} max)</label>
        <input id="rubric-${r.key}" type="range" min="0" max="${r.max}" value="${r.value}">
      </div>
    `)
    .join("");

  document.getElementById("prepChecklist").innerHTML = PREP_CHECKLIST.map((task) => `<li>${task}</li>`).join("");
}

function scoreRubric() {
  let total = 0;
  let max = 0;
  RUBRIC.forEach((r) => {
    const val = Number(document.getElementById(`rubric-${r.key}`).value);
    total += val;
    max += r.max;
  });
  const pct = Math.round((total / max) * 100);
  const verdict = pct >= 85 ? "Nationals ready" : pct >= 70 ? "Strong, keep sharpening" : "Needs deliberate reps";
  document.getElementById("rubricTotal").textContent = `Rubric Score: ${total}/${max} (${pct}%) - ${verdict}`;
}

function renderResources() {
  const grid = document.getElementById("resourceGrid");
  grid.innerHTML = OFFICIAL_RESOURCES
    .map((res) => {
      const encoded = encodeURI(res.file);
      const utility = {
        Objective: "Use this file to run 25-question speed sets and accuracy audits.",
        Roleplay: "Extract scenario, issue, and recommendation triad before timed rehearsal.",
        Production: "Break tasks into checkpoints and rehearse file naming + export flow."
      }[res.type];

      return `
        <article class="resource-card">
          <h4>${res.event}</h4>
          <div class="meta">
            <span class="badge">${res.type}</span>
            <span class="badge ok">official sample</span>
          </div>
          <p><strong>File:</strong> ${res.file.split("/").pop()}</p>
          <p>${utility}</p>
          <a href="${encoded}" target="_blank" rel="noreferrer">Open Resource</a>
        </article>
      `;
    })
    .join("");
}

function setTopStats() {
  const quizCount = Object.values(QUIZZES).reduce((sum, deck) => sum + deck.length, 0);
  document.getElementById("eventCount").textContent = EVENTS.length;
  document.getElementById("resourceCount").textContent = OFFICIAL_RESOURCES.length;
  document.getElementById("quizCount").textContent = quizCount;
}

function setupTabs() {
  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabButtons.forEach((b) => b.classList.remove("active"));
      panels.forEach((p) => p.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById(btn.dataset.tab).classList.add("active");
    });
  });
}

function bindGlobalActions() {
  document.getElementById("eventSearch").addEventListener("input", renderEventGrid);
  document.getElementById("eventFilter").addEventListener("change", renderEventGrid);

  document.getElementById("deckSelect").addEventListener("change", (e) => {
    state.flash.deck = e.target.value;
    state.flash.index = 0;
    state.flash.flipped = false;
    renderFlashcards();
  });

  const flip = () => {
    state.flash.flipped = !state.flash.flipped;
    renderFlashcards();
  };

  document.getElementById("flipCardBtn").addEventListener("click", flip);
  document.getElementById("flashcard").addEventListener("click", flip);

  document.getElementById("nextCardBtn").addEventListener("click", () => {
    state.flash.index = (state.flash.index + 1) % FLASHCARD_DECKS[state.flash.deck].length;
    state.flash.flipped = false;
    renderFlashcards();
  });

  document.getElementById("scenarioSelect").addEventListener("change", (e) => applyScenario(Number(e.target.value)));
  document.getElementById("newJudgeQuestionBtn").addEventListener("click", newJudgeQuestion);

  document.getElementById("startQuizBtn").addEventListener("click", () => {
    state.quiz.deck = document.getElementById("quizSelect").value;
    state.quiz.index = 0;
    state.quiz.score = 0;
    state.quiz.locked = false;
    renderQuizQuestion();
  });

  document.getElementById("scoreRubricBtn").addEventListener("click", scoreRubric);

  document.getElementById("quickFocusBtn").addEventListener("click", () => {
    document.querySelector('[data-tab="timers"]').click();
    state.compSeconds = 45 * 60;
    document.getElementById("compMinutes").value = "45";
    compTimer.pause();
    compTimer.refresh();
  });

  document.getElementById("quickRoleplayBtn").addEventListener("click", () => {
    document.querySelector('[data-tab="roleplay"]').click();
    state.roleplayPreset = 20 * 60;
    state.roleplaySeconds = state.roleplayPreset;
    roleplayTimer.pause();
    roleplayTimer.refresh();
  });
}

function init() {
  setupTabs();
  setTopStats();
  renderEventGrid();
  renderFlashcards();
  renderRoleplay();
  setupTimers();
  renderQuizSelect();
  renderRubric();
  renderResources();
  bindGlobalActions();
}

init();
