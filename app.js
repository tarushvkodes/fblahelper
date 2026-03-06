
/* --- Haptic feedback (progressive enhancement, no-op on unsupported devices) --- */
function haptic(preset) {
  try { window.__haptics?.trigger(preset); } catch (_) {}
}

const RESOURCE_DATA = window.RESOURCE_INTERACTIVE_DATA || { objectiveQuizzes: {}, roleplayScenarios: [], productionTests: {} };
const COMBINED_DATA = window.COMBINED_QUESTION_BANK || { banks: {} };
const AI_DATA = window.AI_QUESTION_BANK || { banks: {} };
const ROLEPLAY_REFERENCE = window.ROLEPLAY_REFERENCE || { officialRoleplayEvents: [], pdfLinks: {}, curatedScenarios: {} };

/* ─── Static Resource File Map ─── */

const EVENT_FILE_RESOURCES = (function buildResourceMap() {
  /* ── Pattern tables ──
     Each source directory has predictable naming conventions.
     We map from the EVENTS list to the actual filenames on disk. */

  /* 1. fblaresources/objective tests/ — Sample question PDFs */
  const objTestMap = {
    "Accounting": "Accounting-Sample-Questions.pdf",
    "Advanced Accounting": "Advanced-Accounting-Sample-Questions.pdf",
    "Advertising": "Advertising-Sample-Questions.pdf",
    "Agribusiness": "Agribusiness-Sample-Questions.pdf",
    "Banking & Financial Systems": "Banking--Financial-Systems-Sample-Questions.pdf",
    "Business Communication": "Business-Communication-Sample-Questions.pdf",
    "Business Ethics": "Business-Ethics-Sample-Questions.pdf",
    "Business Law": "Business-Law-Sample-Questions.pdf",
    "Business Management": "Business-Management-Sample-Questions.pdf",
    "Computer Problem Solving": "Computer-Problem-Solving-Sample-Questions.pdf",
    "Customer Service": "Customer-Service-Sample-Questions.pdf",
    "Cybersecurity": "Cybersecurity-Sample-Questions.pdf",
    "Data Science & AI": "Data-Science--AI-Sample-Questions.pdf",
    "Economics": "Economics-Sample-Questions.pdf",
    "Entrepreneurship": "Entrepreneurship-Sample-Questions.pdf",
    "Future Business Leader": "Future-Business-Leader-Sample-Questions.pdf",
    "Healthcare Administration": "Healthcare-Administration-Sample-Questions.pdf",
    "Hospitality & Event Management": "Hospitality--Event-Management-Sample-Questions.pdf",
    "Human Resource Management": "Human-Resource-Management-Sample-Questions.pdf",
    "Insurance & Risk Management": "Insurance--Risk-Management-Sample-Questions.pdf",
    "International Business": "International-Business-Sample-Questions.pdf",
    "Introduction to Business Communication": "Intro-to-Business-Communication-Sample-Questions.pdf",
    "Introduction to Business Concepts": "Intro-to-Business-Concepts-Sample-Questions.pdf",
    "Introduction to Business Procedures": "Intro-to-Business-Procedures-Sample-Questions.pdf",
    "Introduction to FBLA": "Intro-to-FBLA-Sample-Questions.pdf",
    "Introduction to Information Technology": "Intro-to-Information-Technology-Sample-Questions.pdf",
    "Introduction to Marketing Concepts": "Intro-to-Marketing-Concepts-Sample-Questions.pdf",
    "Introduction to Parliamentary Procedure": "Intro-to-Parli-Pro-Sample-Questions.pdf",
    "Introduction to Retail & Merchandising": "Intro-to-Retail--Merchandising-Sample-Questions.pdf",
    "Introduction to Supply Chain Management": "Intro-to-Supply-Chain-Management-Sample-Questions.pdf",
    "Journalism": "Journalism-Sample-Questions.pdf",
    "Management Information Systems": "Management-Information-Systems-Sample-Questions.pdf",
    "Marketing": "Marketing-Sample-Questions.pdf",
    "Network Design": "Network-Design-Sample-Questions.pdf",
    "Networking Infrastructures": "Networking-Infrastructures-Sample-Questions.pdf",
    "Organizational Leadership": "Organizational-Leadership-Sample-Questions.pdf",
    "Parliamentary Procedure Individual": "Parliamentary-Procedure-Sample-Questions.pdf",
    "Parliamentary Procedure Team": "Parliamentary-Procedure-Sample-Questions.pdf",
    "Personal Finance": "Personal-Finance-Sample-Questions.pdf",
    "Project Management": "Project-Management-Sample-Questions.pdf",
    "Public Administration & Management": "Public-Administration--Management-Sample-Questions.pdf",
    "Real Estate": "Real-Estate-Sample-Questions.pdf",
    "Retail Management": "Retail-Management-Sample-Questions.pdf",
    "Securities & Investments": "Securities--Investments-Sample-Questions.pdf",
    "Sports & Entertainment Management": "Sports--Entertainment-Management-Sample-Questions.pdf",
    "Technology Support & Services": "Technology-Support--Services-Sample-Questions.pdf"
  };

  /* 2. fblaresources/production test/ */
  const prodTestMap = {
    "Computer Applications": "Computer-Applications-Sample-Production-Test.pdf"
  };

  /* 3. fblaresources/sample roleplays/ — Each event has numbered sample DOCX/PDF files */
  const roleplaySampleMap = {
    "Banking & Financial Systems": { prefix: "Banking-and-Financial-Systems---Sample-", ext: ".docx", nums: [1,2,3,4,5,6,8] },
    "Business Management": { prefix: "Business-Management---Sample-", ext: ".docx", nums: [1,2,3,4,5,6,7,8,9,10] },
    "Customer Service": { prefix: "Customer-Service---Sample-", ext: ".docx", nums: [1,2,3,4,5,6,7,8,9,10,11,12] },
    "Entrepreneurship": { prefix: "Entrepreneurship---Sample-", ext: ".docx", nums: [1,2,3,4,5,6,7] },
    "Hospitality & Event Management": { prefix: "Hospitality--Event-Management---Sample-", ext: ".docx", nums: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15] },
    "Impromptu Speaking": { prefix: "Impromptu-Speaking---Sample-", ext: ".docx", nums: [1,2,3,4,5,6,7,8,9,10,11] },
    "International Business": { prefix: "International-Business---Sample-", ext: ".docx", nums: [1,2,3,4,5,6,7,8] },
    "Event Planning": { prefix: "Introduction-to-Event-Planning---Sample-", ext: ".pdf", nums: [1,2,3,4,5,6] },
    "Management Information Systems": { prefix: "Management-Information-Systems---Sample-", ext: ".docx", nums: [1,2,3,4,5,6,7] },
    "Marketing": { prefix: "Marketing---Sample-", ext: ".docx", nums: [1,2,3,4,5,6,7,8] },
    "Network Design": { prefix: "Network-Design---Sample-", ext: ".docx", nums: [1,2,3,4,5,6,7,8] },
    "Parliamentary Procedure Individual": { prefix: "Parliamentary-Procedure---Sample-", ext: ".docx", nums: [1,2,3,4,5,6,7,8] },
    "Parliamentary Procedure Team": { prefix: "Parliamentary-Procedure---Sample-", ext: ".docx", nums: [1,2,3,4,5,6,7,8] },
    "Sports & Entertainment Management": { prefix: "Sports-and-Entertainment-Management---Sample-", ext: ".docx", nums: [1,2,3,4,5,6,7] },
    "Technology Support & Services": { prefix: "Technology-Support--Services---Sample-", ext: ".docx", nums: [1,2,3,4,5,6,7,8] }
  };

  /* 4. FBLA Time/FBLA Time/<folder>/ — Study guides, competencies, past tests */
  const fblaTimeFolderMap = {
    "Accounting": "Accounting I",
    "Advanced Accounting": "Accounting II",
    "Advertising": "Advertising",
    "Agribusiness": "Agribusiness",
    "Banking & Financial Systems": "Banking _ Financial Systems",
    "Business Communication": "Business Communication",
    "Business Law": "Business Law",
    "Computer Applications": "Computer Applications",
    "Computer Problem Solving": "Computer Problem Solving",
    "Cybersecurity": "Cyber Security",
    "Economics": "Economics",
    "Entrepreneurship": "Entrepreneurship",
    "Future Business Leader": "Future Business Leader",
    "Graphic Design": "Graphic Design",
    "Healthcare Administration": "Healthcare Administration",
    "Hospitality & Event Management": "Hospitality Management",
    "Impromptu Speaking": "Impromptu Speaking",
    "Insurance & Risk Management": "Insurance _ Risk Management",
    "Introduction to Business Communication": "Introduction to Business Communication",
    "Introduction to Business Concepts": "Introduction to Business",
    "Introduction to Business Procedures": "Introduction to Business Procedures",
    "Introduction to FBLA": "Introduction to FBLA",
    "Introduction to Information Technology": "Introduction to Information Technology",
    "Introduction to Parliamentary Procedure": "Introduction to Parliamentary Procedure",
    "Journalism": "Journalism",
    "Management Information Systems": "Management Information Systems",
    "Marketing": "Marketing",
    "Network Design": "Network Design",
    "Networking Infrastructures": "Networking Concepts",
    "Organizational Leadership": "Organizational Leadership",
    "Parliamentary Procedure Individual": "Parliamentary Procedure",
    "Parliamentary Procedure Team": "Parliamentary Procedure",
    "Personal Finance": "Personal Finance",
    "Securities & Investments": "Securities _ Investments",
    "Sports & Entertainment Management": "Sports _ Entertainment Management"
  };

  /* Detailed file lists per FBLA Time folder (the actual filenames on disk).
     Keyed by folder name → array of filenames. */
  const fblaTimeFiles = {
    "Accounting I": [
      "2016 SLC Accounting I.docx",
      "Accounting I Study Guide 2007-10.pdf",
      "Accounting I Study Guide 2010-13.pdf",
      "Accounting I Study Guide 2013-16.pdf",
      "Accounting I Tasks and Competencies List.pdf"
    ],
    "Accounting II": [
      "2016 SLC Accounting II.docx",
      "Accounting II Study Guide 2007-10.pdf",
      "Accounting II Study Guide 2010-13.pdf",
      "Accounting II Study Guide 2013-16.pdf",
      "Accounting II Tasks and Competencies List.pdf"
    ],
    "Advertising": [
      "Advertising Competencies _ Task List.pdf",
      "ADVERTISING, District Test.docx"
    ],
    "Agribusiness": [
      "2016 SLC Agribusiness.docx",
      "Agribusiness Study Guide 2013-16.pdf",
      "Agribusiness Tasks and Competencies List.pdf"
    ],
    "Banking _ Financial Systems": [
      "2016 SLC Banking _ Financial Systems.docx",
      "Banking _ Financial Systems Study Guide 2007-10.pdf",
      "Banking _ Financial Systems Study Guide 2010-13.pdf",
      "Banking _ Financial Systems Study Guide 2013-16.pdf",
      "Banking _ Financial Systems Tasks _ Competencies List.pdf",
      "Banking _ Financial Systems.docx"
    ],
    "Business Calculations": [
      "2016 SLC Business Calculations.docx",
      "Business Calculations Study Guide 2007-10.pdf",
      "Business Calculations Study Guide 2010-13.pdf",
      "Business Calculations Study Guide 2013-16.pdf",
      "Business Calculations Tasks _ Competencies List.pdf"
    ],
    "Business Communication": [
      "2016 SLC Business Communication.docx",
      "Business Communication Study Guide 2007-10.pdf",
      "Business Communication Study Guide 2010-13.pdf",
      "Business Communication Study Guide 2013-16.pdf",
      "Business Communication Tasks _ Competencies List.pdf"
    ],
    "Business Law": [
      "2016 SLC Business Law.docx",
      "Business Law Study Guide 2007-10.pdf",
      "Business Law Study Guide 2010-13.pdf",
      "Business Law Study Guide 2013-16.pdf",
      "Business Law Tasks _ Competencies List.pdf"
    ],
    "Client Service": [
      "2011 NLC CLIENT SERVICE Final.docx",
      "2011 NLC CLIENT SERVICE Preliminary.docx",
      "2011 SLC FBLA Client Service 1.docx",
      "2011 SLC FBLA Client Service 2.docx",
      "2011 SLC FBLA Client Service EXTRA 1.docx",
      "2011 SLC FBLA Client Service EXTRA 2.docx",
      "2012 SLC Client Service.docx",
      "2012 SLC Final Client Service.docx",
      "2015 RLC Client Service Case A Judges.docx",
      "2015 RLC Client Service Case B Judges.docx",
      "2015 SLC Client Service Final Case Judges.docx",
      "2015 SLC Client Service Prelim Case Judges.docx",
      "2016 FBLA Client Service_1.docx",
      "2016 FBLA Client Service_2.docx",
      "Client Service Case FINAL EDIT.docx",
      "Client Service Case PRELIMINARY EDIT.docx",
      "Client Service Case Study - 2009 RLC.docx",
      "Client Service_2008 RLC.docx",
      "FBLA Client Service Case FINAL.docx",
      "FBLA Client Service Final National.docx",
      "FBLA Client Service Prel Case FINAL.docx",
      "FBLA Client Service PRel National.docx",
      "Katrina_s Guide.pdf"
    ],
    "Computer Applications": [
      "2016 SLC Computer Applications.docx",
      "2017 SLC Computer Applications Production Test.pdf",
      "Computer Applications Study Guide 2007-10.pdf",
      "Computer Applications Study Guide 2010-13.pdf",
      "Computer Applications Study Guide 2013-16.pdf",
      "Computer Applications Tasks _ Competencies List.pdf"
    ],
    "Computer Problem Solving": [
      "2016 SLC Computer Problem Solving.docx",
      "Computer Problem Solving Study Guide 2007-10.pdf",
      "Computer Problem Solving Study Guide 2010-13.pdf",
      "Computer Problem Solving Study Guide 2013-16.pdf",
      "Computer Problem Solving Tasks _ Competencies List.pdf"
    ],
    "Cyber Security": [
      "2016 SLC Cyber Security.docx",
      "Cyber Security Study Guide 2007-10.pdf",
      "Cyber Security Study Guide 2010-13.pdf",
      "Cyber Security Study Guide 2013-16.pdf",
      "Cyber Security Tasks _ Competencies List.pdf"
    ],
    "Database Design _ Applications": [
      "2016 SLC Database Design _ Applications.docx",
      "2017 SLC Database Design _ Applications Production Test.pdf",
      "Database Design _ Applications Study Guide 2007-10.pdf",
      "Database Design _ Applications Study Guide 2010-13.pdf",
      "Database Design _ Applications Study Guide 2013-16.pdf",
      "Database Design _ Applications Tasks _ Competencies List.pdf"
    ],
    "Economics": [
      "2016 SLC Economics.docx",
      "Economics Study Guide 2007-10.pdf",
      "Economics Study Guide 2010-13.pdf",
      "Economics Study Guide 2013-16.pdf",
      "Economics Tasks _ Competencies List.pdf"
    ],
    "Entrepreneurship": [
      "2016 PBL Entrepreneurship.docx",
      "2016 SLC Entrepreneurship.docx",
      "Entrepreneurship Study Guide 2007-10.pdf",
      "Entrepreneurship Study Guide 2010-13.pdf",
      "Entrepreneurship Study Guide 2013-16.pdf",
      "Entrepreneurship Tasks _ Competencies List.pdf"
    ],
    "Future Business Leader": [
      "2016 SLC Future Business Leader.docx",
      "Future Business Leader Study Guide 2007-10.pdf",
      "Future Business Leader Study Guide 2010-13.pdf",
      "Future Business Leader Study Guide 2013-16.pdf"
    ],
    "Global Business": [
      "2016 FBLA Global Business Case.docx",
      "2016 SLC Global Business.docx",
      "Global Business Study Guide 2007-10.pdf",
      "Global Business Study Guide 2010-13.pdf",
      "Global Business Study Guide 2013-16.pdf",
      "Global Business Tasks _ Competencies List.pdf"
    ],
    "Graphic Design": [
      "Digital Sales Kit - Hyatt Menus.pdf",
      "Menus - Classic Center.pdf",
      "Nick GoPlay Branding Deck.pdf"
    ],
    "Healthcare Administration": [
      "2016 SLC Healthcare Administration.docx",
      "Health Care Administration Study Guide 2010-13.pdf",
      "Health Care Administration Study Guide 2013-16.pdf",
      "Health Care Administration Tasks _ Competencies List.pdf"
    ],
    "Help Desk": [
      "Help Desk Study Guide 2007-10.pdf",
      "Help Desk Study Guide 2010-13.pdf",
      "Help Desk Study Guide 2013-16.pdf",
      "Help Desk Tasks _ Competencies List.pdf"
    ],
    "Hospitality Management": [
      "2016 FBLA Hospitality Management Case.docx",
      "2016 SLC Hospitality Management.docx",
      "Hospitality Management Study Guide 2010-13.pdf",
      "Hospitality Management Study Guide 2013-16.pdf",
      "Hospitality Management Tasks _ Competencies List.pdf"
    ],
    "Impromptu Speaking": [
      "2016 FBLA Impromptu Speaking Topics, v.docx",
      "2016 PBL Impromptu Speaking Topics, v.docx"
    ],
    "Insurance _ Risk Management": [
      "2016 SLC Insurance _ Management.docx",
      "Insurance _ Risk Management Study Guide 2013-16.pdf",
      "Insurance _ Risk Management Tasks _ Competencies List.pdf"
    ],
    "Introduction to Business Communication": [
      "2016 SLC Intro to Business Communication.docx",
      "Introduction to Business Communication Study Guide 2007-10.pdf",
      "Introduction to Business Communication Study Guide 2010-13.pdf",
      "Introduction to Business Communication Study Guide 2013-16.pdf",
      "Introduction to Business Communication Tasks _ Competencies Task List.pdf"
    ],
    "Introduction to Business": [
      "2016 SLC Intro to Business.docx",
      "Introduction to Business Study Guide 2007-10.pdf",
      "Introduction to Business Study Guide 2010-13.pdf",
      "Introduction to Business Study Guide 2013-16.pdf",
      "Introduction to Business Tasks _ Competencies List.pdf"
    ],
    "Introduction to Business Procedures": [
      "2016 SLC Intro to Business Procedures.docx",
      "Business Procedures Study Guide 2007-10.pdf",
      "Business Procedures Study Guide 2010-13.pdf",
      "Business Procedures Study Guide 2013-16.pdf",
      "Business Procedures Tasks _ Competencies List.pdf"
    ],
    "Introduction to FBLA": [
      "2016 SLC FBLA Principles _ Procedures.docx",
      "FBLA Principles _ Procedures Study Guide 2007-10.pdf",
      "FBLA Principles _ Procedures Study Guide 2010-13.pdf",
      "FBLA Principles _ Procedures Study Guide 2013-16.pdf"
    ],
    "Introduction to Financial Math": [
      "2016 SLC Intro to Financial Math.docx",
      "Business Math Study Guide 2007-10.pdf",
      "Business Math Study Guide 2010-13.pdf",
      "Business Math Study Guide 2013-16.pdf",
      "Business Math Tasks _ Competencies List.pdf"
    ],
    "Introduction to Information Technology": [
      "2016 SLC Intro to Information Technology.docx",
      "Introduction to Information Technology Study Guide 2007-10.pdf",
      "Introduction to Information Technology Study Guide 2010-13.pdf",
      "Introduction to Information Technology Study Guide 2013-16.pdf",
      "Introduction to Information Technology Tasks _ Competencies List.pdf",
      "Technology Concepts Study Guide 2007-10.pdf",
      "Technology Concepts Study Guide 2010-13.pdf"
    ],
    "Introduction to Parliamentary Procedure": [
      "2016 SLC Intro to Parliamentary Procedure.docx",
      "Introduction to Parliamentary Procedure Study Guide 2007-10.pdf",
      "Introduction to Parliamentary Procedure Study Guide 2010-13.pdf",
      "Introduction to Parliamentary Procedure Study Guide 2013-16.pdf"
    ],
    "Journalism": [
      "Journalism Competency _ Task List.pdf",
      "JOURNALISM, District Test.docx"
    ],
    "Management Decision Making": [
      "2016 FBLA Management Decision Making Case.docx",
      "2016 SLC Management Decision Making.docx",
      "Management Decision Making Study Guide 2007-10.pdf",
      "Management Decision Making Study Guide 2010-13.pdf",
      "Management Decision Making Study Guide 2013-16.pdf",
      "Management Decision Making Tasks _ Competencies List.pdf"
    ],
    "Management Information Systems": [
      "2016 FBLA Management Information Systems Case.docx",
      "2016 SLC Management Information Systems.docx",
      "Management Information Systems Study Guide 2007-10.pdf",
      "Management Information Systems Study Guide 2010-13.pdf",
      "Management Information Systems Study Guide 2013-16.pdf",
      "Management Information Systems Tasks _ Competencies List.pdf"
    ],
    "Marketing": [
      "2016 FBLA Marketing Case.docx",
      "2016 SLC Marketing.docx",
      "Marketing Study Guide 2007-10.pdf",
      "Marketing Study Guide 2010-13.pdf",
      "Marketing Study Guide 2013-16.pdf",
      "Marketing Tasks _ Competencies List.pdf"
    ],
    "Network Design": [
      "2016 FBLA Network Design Case.docx",
      "2016 SLC  Network Design.docx",
      "Network Design Study Guide 2007-10.pdf",
      "Network Design Study Guide 2010-13.pdf",
      "Network Design Study Guide 2013-16.pdf",
      "Network Design Tasks _ Competencies List.pdf"
    ],
    "Networking Concepts": [
      "2016 SLC Networking Concepts.docx",
      "Networking Concepts Study Guide 2007-10.pdf",
      "Networking Concepts Study Guide 2010-13.pdf",
      "Networking Concepts Study Guide 2013-16.pdf",
      "Networking Concepts Tasks _ Competencies List.pdf"
    ],
    "Organizational Leadership": [
      "Organizational Leadership Competency _ Task List.pdf",
      "ORGANIZATIONAL LEADERSHIP, District Test.docx"
    ],
    "Parliamentary Procedure": [
      "2016 FBLA Parliamentary Procedure Case.docx",
      "Bylaws Study Guide.pdf",
      "Parliamentary Procedure - 2016 SLC.docx",
      "Parliamentary Procedure Study Guide 2007-10.pdf",
      "Parliamentary Procedure Study Guide 2010-13.pdf",
      "Parliamentary Procedure Study Guide 2013-16.pdf"
    ],
    "Personal Finance": [
      "Personal Finance Study Guide 2007-10.pdf",
      "Personal Finance Study Guide 2010-13.pdf",
      "Personal Finance Study Guide 2013-16.pdf",
      "Personal Finance Tasks _ Competencies List.pdf"
    ],
    "Publication Design": [
      "Desktop Publishing Study Guide 2007-10.pdf",
      "Desktop Publishing Study Guide 2010-13.pdf",
      "Desktop Publishing Study Guide 2013-16.pdf",
      "Desktop Publishing Tasks _ Competencies List.pdf"
    ],
    "Securities _ Investments": [
      "2016 SLC Securities _ Investments.docx",
      "Securities _ Investments Tasks _ Competencies List.pdf"
    ],
    "Sports _ Entertainment Management": [
      "2016 FBLA Sports and Entertainment Management Case.docx",
      "2016 SLC Sports _ Entertainment Management.docx",
      "Sports _ Entertainment Management Study Guide 2010-13.pdf",
      "Sports _ Entertainment Management Study Guide 2013-16.pdf",
      "Sports _ Entertainment Management Tasks _ Competencies List.pdf"
    ],
    "Spreadsheet Applications": [
      "2016 SLC Spreadsheet Applications.docx",
      "2017 SLC Spreadsheet Applications Production Test.pdf",
      "Spreadsheet Applications Study Guide 2007-10.pdf",
      "Spreadsheet Applications Study Guide 2010-13.pdf",
      "Spreadsheet Applications Study Guide 2013-16.pdf",
      "Spreadsheet Applications Tasks _ Competencies List.pdf"
    ],
    "Word Processing": [
      "2016 SLC Word Processing.docx",
      "2017 SLC Word Processing Production Test.pdf",
      "Word Processing Study Guide 2007-10.pdf",
      "Word Processing Study Guide 2010-13.pdf",
      "Word Processing Study Guide 2013-16.pdf",
      "Word Processing Tasks _ Competencies List.pdf"
    ]
  };

  /* NAP guide — only relevant to Parliamentary Procedure events */
  const napResource = { label: "NAP Study Guide", path: "fblaresources/objective tests/National-Association-of-Parliamentarians-Study-Guide.pdf", category: "study-guide" };
  const parliEvents = ["Parliamentary Procedure Individual", "Parliamentary Procedure Team", "Introduction to Parliamentary Procedure"];

  /* Classify a filename into a readable category label */
  function classifyFile(filename) {
    const fl = filename.toLowerCase();
    if (/study guide/i.test(fl)) return "study-guide";
    if (/task|competenc/i.test(fl)) return "competencies";
    if (/production test/i.test(fl)) return "production";
    if (/sample.*question|sample-question/i.test(fl)) return "sample-test";
    if (/case|roleplay|sample/i.test(fl)) return "roleplay";
    if (/district test/i.test(fl)) return "sample-test";
    if (/slc|nlc|rlc/i.test(fl)) return "past-test";
    return "resource";
  }

  function labelFromFile(filename) {
    return filename
      .replace(/\.(pdf|docx?)$/i, "")
      .replace(/[_]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  /* Build the map */
  const map = {};
  EVENTS.forEach(event => {
    const docs = [];

    /* Objective test PDF */
    if (objTestMap[event]) {
      docs.push({
        label: "Sample Questions PDF",
        path: `fblaresources/objective tests/${objTestMap[event]}`,
        category: "sample-test"
      });
    }

    /* Production test PDF */
    if (prodTestMap[event]) {
      docs.push({
        label: "Sample Production Test",
        path: `fblaresources/production test/${prodTestMap[event]}`,
        category: "production"
      });
    }

    /* Roleplay sample DOCX files */
    const rpSpec = roleplaySampleMap[event];
    if (rpSpec) {
      rpSpec.nums.forEach(n => {
        docs.push({
          label: `Roleplay Sample ${n}`,
          path: `fblaresources/sample roleplays/${rpSpec.prefix}${n}${rpSpec.ext}`,
          category: "roleplay"
        });
      });
    }

    /* FBLA Time archive files */
    const folder = fblaTimeFolderMap[event];
    if (folder && fblaTimeFiles[folder]) {
      fblaTimeFiles[folder].forEach(filename => {
        docs.push({
          label: labelFromFile(filename),
          path: `FBLA Time/FBLA Time/${folder}/${filename}`,
          category: classifyFile(filename)
        });
      });
    }

    map[event] = docs;
  });

  /* Special mappings for events whose FBLA Time folder doesn't match via the main map */
  /* Customer Service → Client Service folder */
  if (fblaTimeFiles["Client Service"]) {
    const existing = map["Customer Service"] || [];
    fblaTimeFiles["Client Service"].forEach(filename => {
      existing.push({
        label: labelFromFile(filename),
        path: `FBLA Time/FBLA Time/Client Service/${filename}`,
        category: classifyFile(filename)
      });
    });
    map["Customer Service"] = existing;
  }

  /* Attach NAP guide to parliamentary events only */
  parliEvents.forEach(pe => {
    if (map[pe]) map[pe].push(napResource);
  });

  return map;
})();


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
    submitted: false,
    flagged: new Set()
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


function scoreVerdict(pct) {
  if (pct >= SCORE_THRESHOLD_NATIONALS) return "Nationals pace";
  if (pct >= SCORE_THRESHOLD_SOLID) return "Solid";
  return "Needs work";
}

function scoreCssClass(pct) {
  if (pct >= SCORE_THRESHOLD_NATIONALS) return "answer-good";
  if (pct >= SCORE_THRESHOLD_SOLID) return "";
  return "answer-bad";
}

function scoreChartColor(pct) {
  if (pct >= SCORE_THRESHOLD_NATIONALS) return "var(--signal)";
  if (pct >= SCORE_THRESHOLD_SOLID) return "var(--ink-soft)";
  return "var(--accent)";
}

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
  wsTabs.forEach((t) => {
    const isActive = t.dataset.wsTab === tabName;
    t.classList.toggle("active", isActive);
    t.setAttribute("aria-selected", String(isActive));
  });
  wsPanels.forEach((p) => p.classList.toggle("active", p.id === tabName));
}

function openEvent(eventName, tabName = "overview") {
  haptic("nudge");
  state.currentEvent = eventName;

  /* Always close the event panel */
  if (window.__closeRail) {
    window.__closeRail();
  }

  /* Update nav button label */
  const navLabel = document.getElementById("eventNavLabel");
  if (navLabel) navLabel.textContent = eventName;

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
  renderOverviewProgress();
  renderResources(eventName);

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

function initQuizSession(deck) {
  state.quiz.deck = deck;
  state.quiz.index = 0;
  state.quiz.answers = {};
  state.quiz.submitted = false;
  state.quiz.running = true;
  state.quiz.flagged = new Set();
  state.quiz.secondsLeft = deck.length * FBLA_SECONDS_PER_QUESTION;

  stopQuizTimer();
  state.quiz.timerId = setInterval(() => {
    state.quiz.secondsLeft -= 1;
    quizUi.timer.textContent = formatTimer(Math.max(0, state.quiz.secondsLeft));
    quizUi.timer.classList.toggle("urgent", state.quiz.secondsLeft <= 30);
    if (state.quiz.secondsLeft <= 0) submitExam();
  }, 1000);

  quizUi.results.innerHTML = "<p>Submit your exam to see detailed explanations for every question.</p>";
  updateQuizAiHelp(null, null);
  updateProgressBar();
  renderQuestion();
  setWorkspaceTab("quiz");
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
  const deck = shuffle(base).slice(0, Math.min(count, base.length)).map(shuffleOptions);
  initQuizSession(deck);
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
  const idx = Math.max(0, Math.min(state.quiz.index, deck.length - 1));
  state.quiz.index = idx;
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
    <div class="quiz-card-head">
      <h3>Q${idx + 1}. ${item.q}</h3>
      <button class="flag-btn${state.quiz.flagged?.has(idx) ? ' flagged' : ''}" data-flag="${idx}" title="${state.quiz.flagged?.has(idx) ? 'Unflag' : 'Flag for review'}" aria-label="Flag question">⚑</button>
    </div>
    <div>${optionsHtml}</div>
  `;

  quizUi.card.querySelector("[data-flag]")?.addEventListener("click", (e) => {
    e.stopPropagation();
    haptic();
    toggleFlag(idx);
  });

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
  const answeredCount = Object.keys(state.quiz.answers).length;
  const label = document.getElementById("quizScoreLabel");

  if (state.quiz.submitted) {
    let correct = 0;
    Object.keys(state.quiz.answers).forEach((k) => {
      const i = Number(k);
      const q = deck[i];
      if (Number.isInteger(q?.answer) && q.answer === state.quiz.answers[i]) correct += 1;
    });
    quizUi.scoreLive.textContent = `${correct} / ${deck.length}`;
    if (label) label.textContent = "Score";
  } else {
    quizUi.scoreLive.textContent = `${answeredCount} / ${deck.length}`;
    if (label) label.textContent = "Answered";
  }
}

function changeQuestion(delta) {
  const deck = state.quiz.deck;
  if (!deck.length) return;
  const next = state.quiz.index + delta;
  if (next < 0 || next >= deck.length) return;
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

    const flagged = state.quiz.flagged?.has(i) ? '<span class="review-flag">⚑ Flagged</span>' : '';

    reviewRows.push(`
      <article class="exam-review-item">
        <strong>Q${i + 1}. ${q.q}${flagged}</strong>
        <p class="${isCorrect ? "answer-good" : "answer-bad"}">${isCorrect ? "Correct" : "Incorrect"}</p>
        <p><strong>Your answer:</strong> ${toAnswerLabel(q, picked)}</p>
        <p><strong>Right answer:</strong> ${toAnswerLabel(q, q.answer)}</p>
        <p><strong>Why:</strong> ${toExplanation(q)}</p>
        ${optionFeedback ? `<ul class="option-review-list">${optionFeedback}</ul>` : ""}
      </article>
    `);
  });

  const pct = total ? Math.round((correct / total) * 100) : 0;
  const verdict = scoreVerdict(pct);
  const recoveryAdvice = pct >= SCORE_THRESHOLD_NATIONALS
    ? "Strong result. Try Official + AI mode for broader coverage, or run another set to lock in consistency."
    : pct >= SCORE_THRESHOLD_SOLID
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

  // Save exam history
  saveHistory({
    event: state.currentEvent,
    score: pct,
    correct,
    total,
    bankMode: state.quiz.bankMode,
    timestamp: Date.now()
  });

  // Collect and save missed questions
  const missedQs = [];
  deck.forEach((q, i) => {
    if (Number.isInteger(q.answer) && state.quiz.answers[i] !== q.answer) {
      missedQs.push({ q: q.q, options: q.options, answer: q.answer, explain: q.explain || "", optionExplanations: q.optionExplanations || [], source: q.source || "" });
    }
  });
  if (missedQs.length) addMissedQuestions(state.currentEvent, missedQs);

  // Update streak and stats
  bumpStreak();
  renderStats();
  renderOverviewProgress();

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

    const band = score >= SCORE_THRESHOLD_NATIONALS ? "Final-round ready" : score >= SCORE_THRESHOLD_SOLID ? "Strong base" : "Needs structure";
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
  const base = getDeckForMode(eventName, getQuizBankMode()).slice(0, FLASHCARD_DECK_LIMIT).map(shuffleOptions);
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
  document.getElementById("memoryTactics").innerHTML = STRATEGY_TIPS.slice(0, 5).map((m) => `<li>${m}</li>`).join("");
}

function renderFlashcard() {
  haptic();
  const card = state.flash.deck[state.flash.index];
  const label = state.flash.flipped ? "Answer" : "Prompt";
  const text = state.flash.flipped ? card.back : card.front;
  document.getElementById("flashCard").innerHTML = `<div><p class="eyebrow">${label}</p><p>${text}</p></div>`;
}

function renderPrep(eventName) {
  const format = inferFormat(eventName);
  const formatInfo = FORMAT_PREP[format] || FORMAT_PREP.objective;

  /* ── Competition Format Briefing ── */
  document.getElementById("prepFormatTitle").textContent = `Competition Format: ${formatInfo.label}`;
  document.getElementById("prepFormatBadge").textContent = formatInfo.label;
  document.getElementById("prepFormatDesc").textContent = formatInfo.desc;
  document.getElementById("prepRoundBreakdown").innerHTML = formatInfo.rounds
    .map((r, i) => `<div class="prep-round"><span class="prep-round-num">${i + 1}</span><span>${r}</span></div>`)
    .join("");

  /* ── Format-aware checklist ── */
  const tasks = EVENT_SPECIFIC_TASKS[eventName] || formatInfo.tasks;
  const prepEl = document.getElementById("prepChecklist");
  prepEl.innerHTML = tasks.map((task, i) => {
    const key = `prep2-${eventName}-${format}-${i}`;
    const checked = localStorage.getItem(key) === "1";
    return `<label class="check-item${checked ? " checked" : ""}">
      <input type="checkbox" data-prep2-key="${key}" ${checked ? "checked" : ""}>
      <span>${task}</span>
    </label>`;
  }).join("");

  function updateProgress() {
    const total = tasks.length;
    const done = document.querySelectorAll("[data-prep2-key]:checked").length;
    const pct = total ? Math.round((done / total) * 100) : 0;
    document.getElementById("prepProgressLabel").textContent = `${pct}%`;
    const ring = document.getElementById("prepRingFill");
    if (ring) ring.setAttribute("stroke-dasharray", `${pct} ${100 - pct}`);
  }

  document.querySelectorAll("[data-prep2-key]").forEach(cb => {
    cb.addEventListener("change", () => {
      localStorage.setItem(cb.dataset.prep2Key, cb.checked ? "1" : "0");
      cb.closest(".check-item").classList.toggle("checked", cb.checked);
      updateProgress();
    });
  });

  updateProgress();

  /* ── Reset button ── */
  document.getElementById("resetPrepBtn").onclick = () => {
    tasks.forEach((_, i) => localStorage.removeItem(`prep2-${eventName}-${format}-${i}`));
    renderPrep(eventName);
  };

  /* ── Study Strategy Tip ── */
  function showTip() {
    document.getElementById("prepTip").textContent = STRATEGY_TIPS[Math.floor(Math.random() * STRATEGY_TIPS.length)];
  }
  showTip();
  document.getElementById("newPrepTipBtn").onclick = showTip;

  /* ── Production Prep (conditionally visible) ── */
  const prod = getProductionTasks(eventName);
  const prodCard = document.getElementById("prepProductionCard");
  if (prod?.tasks?.length) {
    prodCard.style.display = "";
    document.getElementById("productionChecklist").innerHTML = prod.tasks.map((task, i) => {
      const key = `prod-${eventName}-prod-${i}`;
      const checked = localStorage.getItem(key) === "1";
      return `<label class="check-item${checked ? " checked" : ""}">
        <input type="checkbox" data-prod-key="${key}" ${checked ? "checked" : ""}>
        <span>${task}</span>
      </label>`;
    }).join("");

    document.querySelectorAll("[data-prod-key]").forEach(cb => {
      cb.addEventListener("change", () => {
        localStorage.setItem(cb.dataset.prodKey, cb.checked ? "1" : "0");
        cb.closest(".check-item").classList.toggle("checked", cb.checked);
      });
    });
  } else {
    prodCard.style.display = "none";
  }
}

/* ─── Study History & Streak ─── */

const HISTORY_KEY = "fbla-exam-history";
const STREAK_KEY = "fbla-streak";

function loadHistory() {
  try { return JSON.parse(localStorage.getItem(HISTORY_KEY)) || []; }
  catch { return []; }
}

function saveHistory(entry) {
  const history = loadHistory();
  history.push(entry);
  if (history.length > HISTORY_LIMIT) history.splice(0, history.length - HISTORY_LIMIT);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

function clearAllHistory() {
  if (!confirm("Clear all exam history and stats? This cannot be undone.")) return;
  localStorage.removeItem(HISTORY_KEY);
  renderStats();
  renderOverviewProgress();
  updateStreakDisplay();
}

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function loadStreak() {
  try { return JSON.parse(localStorage.getItem(STREAK_KEY)) || { lastDate: null, count: 0 }; }
  catch { return { lastDate: null, count: 0 }; }
}

function bumpStreak() {
  const streak = loadStreak();
  const today = todayStr();
  if (streak.lastDate === today) return;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yStr = yesterday.toISOString().slice(0, 10);
  if (streak.lastDate === yStr) {
    streak.count += 1;
  } else {
    streak.count = 1;
  }
  streak.lastDate = today;
  localStorage.setItem(STREAK_KEY, JSON.stringify(streak));
  updateStreakDisplay();
}

function updateStreakDisplay() {
  const streak = loadStreak();
  const today = todayStr();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yStr = yesterday.toISOString().slice(0, 10);
  const active = streak.lastDate === today || streak.lastDate === yStr;
  const count = active ? streak.count : 0;
  const el = document.getElementById("streakCount");
  if (el) el.textContent = count;
  const badge = document.getElementById("streakBadge");
  if (badge) badge.classList.toggle("active", count > 0);
  const statEl = document.getElementById("statStudyStreak");
  if (statEl) statEl.textContent = count;
}

/* ─── Missed Questions Bank ─── */

function missedKey(eventName) {
  return `fbla-missed-${norm(eventName)}`;
}

function loadMissedQuestions(eventName) {
  try { return JSON.parse(localStorage.getItem(missedKey(eventName))) || []; }
  catch { return []; }
}

function saveMissedQuestions(eventName, questions) {
  const seen = new Set();
  const deduped = questions.filter(q => {
    const key = norm(q.q);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  if (deduped.length > MISSED_QUESTIONS_LIMIT) deduped.splice(0, deduped.length - MISSED_QUESTIONS_LIMIT);
  localStorage.setItem(missedKey(eventName), JSON.stringify(deduped));
}

function addMissedQuestions(eventName, newMisses) {
  const existing = loadMissedQuestions(eventName);
  saveMissedQuestions(eventName, [...existing, ...newMisses]);
}

function clearMissedQuestions(eventName) {
  localStorage.removeItem(missedKey(eventName));
  renderOverviewProgress();
}

function startMissedQuestionsDrill() {
  if (!state.currentEvent) return;
  const missed = loadMissedQuestions(state.currentEvent);
  if (!missed.length) return;
  haptic("success");
  initQuizSession(shuffle(missed).map(shuffleOptions));
}

/* ─── Question Flagging ─── */

function toggleFlag(idx) {
  if (!state.quiz.flagged) state.quiz.flagged = new Set();
  if (state.quiz.flagged.has(idx)) state.quiz.flagged.delete(idx);
  else state.quiz.flagged.add(idx);
  renderQuestion();
}

/* ─── Roleplay Competition Timer ─── */

const rpTimer = {
  phase: "prep",
  secondsLeft: 0,
  totalPrep: 600,
  totalPresent: 600,
  intervalId: null,
  running: false
};

function startRpTimer() {
  if (rpTimer.running) {
    clearInterval(rpTimer.intervalId);
    rpTimer.intervalId = null;
    rpTimer.running = false;
    document.getElementById("rpTimerStartBtn").textContent = "Resume";
    return;
  }
  if (rpTimer.phase === "done") resetRpTimer();
  rpTimer.running = true;
  document.getElementById("rpTimerStartBtn").textContent = "Pause";
  rpTimer.intervalId = setInterval(() => {
    rpTimer.secondsLeft -= 1;
    if (rpTimer.secondsLeft <= 0) {
      if (rpTimer.phase === "prep") {
        rpTimer.phase = "present";
        rpTimer.secondsLeft = rpTimer.totalPresent;
        haptic("success");
      } else {
        rpTimer.phase = "done";
        rpTimer.secondsLeft = 0;
        clearInterval(rpTimer.intervalId);
        rpTimer.intervalId = null;
        rpTimer.running = false;
        document.getElementById("rpTimerStartBtn").textContent = "Restart";
        haptic("success");
      }
    }
    renderRpTimer();
  }, 1000);
  renderRpTimer();
}

function resetRpTimer() {
  clearInterval(rpTimer.intervalId);
  rpTimer.intervalId = null;
  rpTimer.running = false;
  rpTimer.phase = "prep";
  const prepMin = Number(document.getElementById("rpPrepTime")?.value || 10);
  const presentMin = Number(document.getElementById("rpPresentTime")?.value || 10);
  rpTimer.totalPrep = prepMin * 60;
  rpTimer.totalPresent = presentMin * 60;
  rpTimer.secondsLeft = rpTimer.totalPrep;
  document.getElementById("rpTimerStartBtn").textContent = "Start Timer";
  renderRpTimer();
}

function renderRpTimer() {
  const phaseEl = document.getElementById("rpTimerPhase");
  const clockEl = document.getElementById("rpTimerClock");
  if (!phaseEl || !clockEl) return;
  const labels = { prep: "Prep Time", present: "Presentation", done: "Complete" };
  phaseEl.textContent = labels[rpTimer.phase] || "";
  phaseEl.className = `rp-timer-phase ${rpTimer.phase}`;
  clockEl.textContent = formatTimer(Math.max(0, rpTimer.secondsLeft));
  clockEl.classList.toggle("urgent", rpTimer.running && rpTimer.secondsLeft <= 30);
}

/* ─── Stats Dashboard ─── */

function renderStats() {
  const history = loadHistory();
  const totalExams = history.length;
  const avgScore = totalExams ? Math.round(history.reduce((s, h) => s + h.score, 0) / totalExams) : 0;
  const bestScore = totalExams ? Math.max(...history.map(h => h.score)) : 0;

  document.getElementById("statTotalExams").textContent = totalExams;
  document.getElementById("statAvgScore").textContent = totalExams ? `${avgScore}%` : "\u2014";
  document.getElementById("statBestScore").textContent = totalExams ? `${bestScore}%` : "\u2014";
  updateStreakDisplay();

  // Score chart - show current event if selected, otherwise all
  const scopeEl = document.getElementById("statsChartScope");
  const chartSource = state.currentEvent
    ? history.filter(h => h.event === state.currentEvent)
    : history;
  if (scopeEl) scopeEl.textContent = state.currentEvent ? state.currentEvent : "All events";

  const chartData = chartSource.slice(-SCORE_CHART_LIMIT);
  const chartEl = document.getElementById("scoreChart");
  const chartEmpty = document.getElementById("scoreChartEmpty");
  if (chartData.length) {
    chartEmpty.style.display = "none";
    chartEl.innerHTML = chartData.map(h => {
      const color = scoreChartColor(h.score);
      return `<div class="chart-col">
        <div class="chart-bar" style="height:${Math.max(h.score, 4)}%;background:${color}" title="${h.event}: ${h.score}%"></div>
        <span class="chart-label">${h.score}</span>
      </div>`;
    }).join("");
  } else {
    chartEmpty.style.display = "";
    chartEl.innerHTML = "";
  }

  // Weakest areas
  const eventScores = {};
  history.forEach(h => {
    if (!eventScores[h.event]) eventScores[h.event] = [];
    eventScores[h.event].push(h.score);
  });
  const weakest = Object.entries(eventScores)
    .map(([event, scores]) => ({
      event,
      avg: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
      count: scores.length
    }))
    .sort((a, b) => a.avg - b.avg)
    .slice(0, WEAKEST_AREAS_LIMIT);
  const weakEl = document.getElementById("weakestAreas");
  const weakEmpty = document.getElementById("weakestEmpty");
  if (weakest.length) {
    weakEmpty.style.display = "none";
    weakEl.innerHTML = weakest.map(w => `
      <div class="weak-item">
        <span class="weak-event">${w.event}</span>
        <span class="weak-score">${w.avg}% avg (${w.count} exam${w.count > 1 ? "s" : ""})</span>
      </div>
    `).join("");
  } else {
    weakEmpty.style.display = "";
    weakEl.innerHTML = "";
  }

  // Recent exams
  const recent = history.slice(-RECENT_EXAMS_LIMIT).reverse();
  const recentEl = document.getElementById("recentExams");
  if (recent.length) {
    recentEl.innerHTML = `<div class="recent-list">${recent.map(h => {
      const date = new Date(h.timestamp);
      const dateStr = date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
      const verdict = scoreVerdict(h.score);
      const cls = scoreCssClass(h.score);
      return `
        <div class="recent-item">
          <div class="recent-info">
            <strong>${h.event}</strong>
            <span class="recent-date">${dateStr}</span>
          </div>
          <div class="recent-score ${cls}">
            ${h.correct}/${h.total} (${h.score}%)
            <span class="recent-verdict">${verdict}</span>
          </div>
        </div>`;
    }).join("")}</div>`;
  } else {
    recentEl.innerHTML = "<p class='module-note'>No exams taken yet.</p>";
  }
}

function renderOverviewProgress() {
  const el = document.getElementById("overviewQuickStats");
  if (!el || !state.currentEvent) return;
  const history = loadHistory().filter(h => h.event === state.currentEvent);
  const missed = loadMissedQuestions(state.currentEvent);
  if (!history.length) {
    el.innerHTML = "<p class='module-note'>Complete an exam to start tracking your progress.</p>";
  } else {
    const avg = Math.round(history.reduce((s, h) => s + h.score, 0) / history.length);
    const best = Math.max(...history.map(h => h.score));
    const last = history[history.length - 1].score;
    el.innerHTML = `
      <div class="overview-stat-row">
        <div><span class="overview-stat-num">${history.length}</span><p>Exams</p></div>
        <div><span class="overview-stat-num">${avg}%</span><p>Avg.</p></div>
        <div><span class="overview-stat-num">${best}%</span><p>Best</p></div>
        <div><span class="overview-stat-num">${last}%</span><p>Last</p></div>
      </div>
    `;
  }
  const missCountEl = document.getElementById("overviewMissCount");
  if (missCountEl) {
    missCountEl.textContent = missed.length
      ? `${missed.length} missed question${missed.length > 1 ? "s" : ""} saved for review.`
      : "Take an exam to start collecting missed questions.";
  }
  const reviewBtn = document.getElementById("reviewMissesBtn");
  if (reviewBtn) reviewBtn.disabled = !missed.length;
}

function exportHistory() {
  const history = loadHistory();
  if (!history.length) return;
  try {
    const blob = new Blob([JSON.stringify(history, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `fbla-study-stats-${todayStr()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (_) { /* export failure is non-critical */ }
}

/* ─── Resource Document Links ─── */

function getResourcesForEvent(eventName) {
  return EVENT_FILE_RESOURCES[eventName] || [];
}

function renderResources(eventName) {
  const listEl = document.getElementById("resourcesList");
  const hintEl = document.getElementById("resourcesHint");
  const cardEl = document.getElementById("overviewResourcesCard");
  if (!listEl || !hintEl) return;

  const resources = getResourcesForEvent(eventName);

  if (!resources.length) {
    hintEl.textContent = `No documents available for ${eventName} yet.`;
    hintEl.style.display = "";
    listEl.innerHTML = "";
    return;
  }

  hintEl.style.display = "none";

  /* Group by category for clean display */
  const categoryLabels = {
    "sample-test": "Sample Questions",
    "study-guide": "Study Guides",
    "competencies": "Competencies & Tasks",
    "past-test": "Past Tests",
    "roleplay": "Roleplay Samples",
    "production": "Production Tests",
    "reference": "Reference Materials",
    "resource": "Other Resources"
  };
  const categoryOrder = ["sample-test", "study-guide", "competencies", "past-test", "roleplay", "production", "reference", "resource"];

  const groups = {};
  resources.forEach(r => {
    const cat = r.category || "resource";
    if (!groups[cat]) groups[cat] = [];
    groups[cat].push(r);
  });

  const html = categoryOrder
    .filter(cat => groups[cat]?.length)
    .map(cat => {
      const items = groups[cat];
      const links = items.map(r => {
        const ext = (r.path.match(/\.(pdf|docx?)$/i) || ["", ""])[1].toUpperCase();
        const badge = ext ? `<span class="res-ext">${ext}</span>` : "";
        return `<a class="res-link" href="${encodeURI(r.path)}" target="_blank" rel="noreferrer">${r.label}${badge}</a>`;
      }).join("");
      return `<div class="res-group">
        <p class="res-group-title">${categoryLabels[cat] || cat}</p>
        <div class="res-group-links">${links}</div>
      </div>`;
    }).join("");

  listEl.innerHTML = html;
}

/* ─── UI Binding: Event Rail ─── */

function bindEventRail() {
  const railToggle = document.getElementById("railToggle");
  const eventRailEl = document.getElementById("eventRail");
  const railOverlay = document.getElementById("railOverlay");
  const railCloseBtn = document.getElementById("railClose");

  function closeRail() {
    if (!eventRailEl) return;
    eventRailEl.classList.add("collapsed");
    railOverlay?.classList.remove("active");
    document.body.style.overflow = "";
  }

  function openRail() {
    if (!eventRailEl) return;
    eventRailEl.classList.remove("collapsed");
    railOverlay?.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  if (railToggle && eventRailEl) {
    eventRailEl.classList.add("collapsed");
    railToggle.addEventListener("click", () => {
      haptic();
      if (eventRailEl.classList.contains("collapsed")) openRail();
      else closeRail();
    });
  }

  if (railOverlay) railOverlay.addEventListener("click", closeRail);
  if (railCloseBtn) railCloseBtn.addEventListener("click", () => { haptic(); closeRail(); });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && eventRailEl && !eventRailEl.classList.contains("collapsed")) closeRail();
  });

  window.__closeRail = closeRail;
}

/* ─── UI Binding: Workspace Tabs ─── */

function bindWorkspaceTabs() {
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
}

/* ─── UI Binding: Quiz Controls ─── */

function bindQuizControls() {
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
}

/* ─── UI Binding: Flashcards ─── */

function bindFlashcardControls() {
  const flip = () => {
    if (!state.flash.deck.length) return;
    state.flash.flipped = !state.flash.flipped;
    renderFlashcard();
  };

  const advanceCard = (delta) => {
    if (!state.flash.deck.length) return;
    state.flash.index = (state.flash.index + delta + state.flash.deck.length) % state.flash.deck.length;
    state.flash.flipped = false;
    renderFlashcard();
  };

  document.getElementById("flipCardBtn").onclick = flip;
  document.getElementById("flashCard").onclick = flip;
  document.getElementById("nextCardBtn").onclick = () => advanceCard(1);

  return { flip, advanceCard };
}

/* ─── UI Binding: Miscellaneous ─── */

function bindMiscControls() {
  document.getElementById("reviewMissesBtn").onclick = startMissedQuestionsDrill;
  document.getElementById("clearMissesBtn").onclick = () => {
    if (!state.currentEvent) return;
    clearMissedQuestions(state.currentEvent);
  };
  document.getElementById("rpTimerStartBtn").onclick = startRpTimer;
  document.getElementById("rpTimerResetBtn").onclick = resetRpTimer;
  document.getElementById("rpPrepTime").onchange = resetRpTimer;
  document.getElementById("rpPresentTime").onchange = resetRpTimer;
  document.getElementById("clearHistoryBtn").onclick = clearAllHistory;
  document.getElementById("exportHistoryBtn").onclick = exportHistory;
}

/* ─── UI Binding: Keyboard Shortcuts ─── */

function bindKeyboardShortcuts(flashcardControls) {
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
      if (e.key === " " || e.key === "Enter") { e.preventDefault(); flashcardControls.flip(); }
      if (e.key === "ArrowRight") { e.preventDefault(); flashcardControls.advanceCard(1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); flashcardControls.advanceCard(-1); }
    }
  });
}

/* ─── UI Binding: Debounced Event Search ─── */

function debounce(fn, ms) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}

function bindUi() {
  eventSearchEl.addEventListener("input", debounce(renderEventList, DEBOUNCE_MS));
  bindEventRail();
  bindWorkspaceTabs();
  bindQuizControls();
  const flashcardControls = bindFlashcardControls();
  bindMiscControls();
  bindKeyboardShortcuts(flashcardControls);
}

function init() {
  setStats();
  bindUi();
  renderEventList();
  updateStreakDisplay();
  resetRpTimer();

  // Open first event to avoid dead-end interface.
  openEvent(EVENTS[0], "overview");
  renderStats();
}

init();
