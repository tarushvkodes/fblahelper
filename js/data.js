/* ─── data.js ─── Data loading, normalization, bank merging, and deck functions. ─── */

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

  /* 5. Full FBLA Mega Folder — supplemental files not already in FBLA Time */
  const megaFolderFiles = {
    "Advertising": [
      "Advertising Competencies _ Task List.docx"
    ],
    "Client Service": [
      "PBL Client Service Case FINAL EDIT.docx",
      "PBL Client Service Case PRELIMINARY EDIT.docx"
    ],
    "Database Design _ Applications": [
      "Database Design _ Applications Study Guide 2007-10.docx",
      "Testfrenzy Rehost/Arizona FBLA Test.doc",
      "Testfrenzy Rehost/Database Practice Test.doc",
      "Testfrenzy Rehost/Database Practice Test.docx",
      "Testfrenzy Rehost/Database Test with Visuals.doc",
      "Testfrenzy Rehost/Lesson 1-7 Database Quizzes.doc"
    ],
    "Entrepreneurship": [
      "Entrepreneurship Study Guide 2010-13.docx"
    ],
    "Hospitality Management": [
      "Hospitality Management Tasks _ Competencies List.docx"
    ],
    "Introduction to Business": [
      "Introduction to Business Study Guide 2007-10.docx",
      "Introduction to Business Study Guide 2010-13.docx"
    ],
    "Introduction to Information Technology": [
      "Introduction to Information Technology Study Guide 2007-10.docx",
      "Introduction to Information Technology Study Guide 2010-13.docx",
      "Introduction to Information Technology Study Guide 2013-16.docx",
      "Introduction to Information Technology Tasks _ Competencies List.docx",
      "Technology Concepts Study Guide 2007-10.docx",
      "Technology Concepts Study Guide 2010-13.docx"
    ],
    "Networking Concepts": [
      "Networking Concepts Tasks _ Competencies List.docx"
    ],
    "Organizational Leadership": [
      "Organizational Leadership Competency _ Task List.docx"
    ],
    "Parliamentary Procedure": [
      "Parliamentary Procedure Study Guide 2007-10.docx"
    ],
    "Sports _ Entertainment Management": [
      "Sports _ Entertainment Management Tasks _ Competencies List.docx"
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

    /* Full FBLA Mega Folder supplemental files */
    if (folder && megaFolderFiles[folder]) {
      megaFolderFiles[folder].forEach(filename => {
        const basename = filename.split("/").pop();
        docs.push({
          label: labelFromFile(basename),
          path: `Full FBLA Mega Folder/${folder}/${filename}`,
          category: classifyFile(basename)
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

  /* Customer Service → Client Service folder (Full FBLA Mega Folder) */
  if (megaFolderFiles["Client Service"]) {
    const existing = map["Customer Service"] || [];
    megaFolderFiles["Client Service"].forEach(filename => {
      existing.push({
        label: labelFromFile(filename),
        path: `Full FBLA Mega Folder/Client Service/${filename}`,
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
  return EVENT_FILE_RESOURCES[eventName] || [];
}
