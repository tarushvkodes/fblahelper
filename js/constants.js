/* ─── constants.js ───
   Pure data constants: event lists, format templates, tasks, and numeric thresholds.
   No logic or DOM access — safe to load first.
   ─── */

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
const EVENT_FORMAT_GROUPS = [
  { key: "objective", label: "Objective Focus" },
  { key: "roleplay", label: "Roleplay Focus" },
  { key: "presentation", label: "Presentation Focus" },
  { key: "production", label: "Production Focus" },
  { key: "report", label: "Report Focus" },
  { key: "parliamentary", label: "Parliamentary Focus" }
];

const FORMAT_PREP = {
  objective: {
    label: "Objective Test",
    desc: "You'll take a timed multiple-choice test. Top scores advance to final rounds at NLC.",
    rounds: ["Timed objective exam (typically 60 min)"],
    tasks: [
      "Complete a full-length timed practice exam.",
      "Review every missed question — write a one-sentence correction for each.",
      "Drill your 20 weakest topics using flashcards.",
      "Take a second practice exam and compare your score.",
      "Build a quick-reference sheet of key formulas, terms, and rules."
    ]
  },
  roleplay: {
    label: "Objective Test + Roleplay",
    desc: "You'll take an objective test, then perform an interactive roleplay scenario judged on communication, decisions, and applied business thinking.",
    rounds: ["Timed objective exam", "Interactive roleplay with judges (20 min prep + 7 min presentation)"],
    tasks: [
      "Complete a timed practice exam and review all misses.",
      "Run through a roleplay scenario and record yourself.",
      "Practice your 30-second opening structure: greet → restate problem → outline approach.",
      "Drill judge follow-up questions — answer each in under 45 seconds.",
      "Study performance indicators for this event.",
      "Time your full roleplay response to stay within the 5-minute window."
    ]
  },
  parliamentary: {
    label: "Objective Test + Parliamentary Demonstration",
    desc: "You'll take an objective exam on parliamentary procedure and may demonstrate motions, debate, and parliamentary rules under judge evaluation.",
    rounds: ["Objective exam on parliamentary knowledge", "Parliamentary demonstration round"],
    tasks: [
      "Complete a full practice exam on parliamentary procedure.",
      "Memorize the order of precedence for the 13 ranked motions.",
      "Practice making, seconding, and debating motions aloud.",
      "Study the NAP study guide for procedural edge cases.",
      "Run a mock meeting with proper opening, business, and adjournment."
    ]
  },
  presentation: {
    label: "Presentation / Interview",
    desc: "You'll deliver prepared content to judges and handle Q&A. No objective test — pure speaking performance.",
    rounds: ["Prepared presentation or interview with judges"],
    tasks: [
      "Outline your presentation with a clear intro, 3 key points, and a strong close.",
      "Practice delivering to a timer — aim for 90% of allotted time.",
      "Record yourself and review for filler words, pacing, and eye contact.",
      "Prepare for 5 likely judge questions and rehearse concise answers.",
      "Do one full dress rehearsal with professional attire."
    ]
  },
  production: {
    label: "Production / Technical Performance",
    desc: "You'll complete a technical build or performance task scored by rubric. Expect project artifacts, demos, or live technical judging.",
    rounds: ["Technical production task or project demonstration"],
    tasks: [
      "Review the event rubric and identify the highest-weighted categories.",
      "Complete a timed practice build matching competition constraints.",
      "Test your output against the rubric — score yourself honestly.",
      "Prepare your workspace and tools so nothing is missing on competition day.",
      "Practice explaining your design decisions for the Q&A portion."
    ]
  },
  report: {
    label: "Chapter / Report + Presentation",
    desc: "Your team submits written materials and presents outcomes to judges. Scoring covers planning, execution, impact, and communication.",
    rounds: ["Written report submission", "Team presentation to judges"],
    tasks: [
      "Review the rubric and ensure your report covers every required section.",
      "Rehearse the presentation with all team members and assign speaking roles.",
      "Time your presentation to fit within the allotted window.",
      "Prepare for judge Q&A — know your data, sources, and implementation details.",
      "Proofread the written report one final time for errors and formatting."
    ]
  }
};

const EVENT_SPECIFIC_TASKS = {
  "Accounting": [
    "Practice recording journal entries for common transactions (sales, purchases, adjustments).",
    "Review the full accounting cycle from source documents through closing entries.",
    "Prepare a classified balance sheet, income statement, and statement of cash flows from trial balance data.",
    "Study GAAP principles — matching, revenue recognition, conservatism, and materiality.",
    "Work through T-account problems for accounts receivable, depreciation, and inventory.",
    "Calculate and interpret key financial ratios: current ratio, debt-to-equity, ROA, and profit margin."
  ],
  "Advanced Accounting": [
    "Review consolidation entries for parent-subsidiary financial statements.",
    "Practice partnership accounting: formation, profit/loss allocation, admission, and withdrawal.",
    "Study governmental and not-for-profit accounting fund structures and modified accrual basis.",
    "Work through foreign currency translation and remeasurement problems.",
    "Review lease accounting rules — classify and journalize operating vs. finance leases.",
    "Practice preparing a statement of cash flows using both direct and indirect methods.",
    "Drill intercompany transaction eliminations and minority interest calculations."
  ],
  "Advertising": [
    "Study the major advertising media types and when each is most cost-effective.",
    "Practice analyzing target market demographics and psychographics for ad campaigns.",
    "Review digital advertising metrics: CTR, CPM, CPC, conversion rate, and ROAS.",
    "Create a sample media plan with budget allocation across channels.",
    "Study FTC advertising regulations and identify deceptive advertising examples.",
    "Review brand positioning strategies and unique selling proposition development."
  ],
  "Agribusiness": [
    "Study agricultural commodity markets, futures contracts, and price discovery.",
    "Review farm financial statements: balance sheets, income statements, and cash flow.",
    "Practice analyzing agricultural supply chains from production to consumer.",
    "Study USDA programs, crop insurance, and federal agricultural policy basics.",
    "Review agricultural marketing strategies including direct-to-consumer and cooperative models.",
    "Study land use planning, sustainable agriculture practices, and environmental regulations."
  ],
  "Banking & Financial Systems": [
    "Study types of bank accounts, loan products, and interest calculation methods (simple, compound, APR vs. APY).",
    "Practice roleplay scenarios involving customer account disputes and loan consultations.",
    "Review federal banking regulations: FDIC, Federal Reserve roles, and Truth in Lending Act.",
    "Drill financial advising scenarios — recommend products based on customer profiles.",
    "Study the electronic banking landscape: ACH, wire transfers, mobile payments, and fraud prevention.",
    "Practice your roleplay opening: greet the customer, identify needs, and propose a tailored solution."
  ],
  "Broadcast Journalism": [
    "Practice writing broadcast-style news scripts with active voice and short sentences.",
    "Study the inverted pyramid structure and adapt it for on-air delivery.",
    "Record yourself delivering a 60-second news segment and review pacing and tone.",
    "Review AP style guidelines for broadcast: numbers, abbreviations, and attribution.",
    "Practice interviewing techniques and writing follow-up questions on the fly.",
    "Study media ethics — libel, slander, FCC regulations, and source protection."
  ],
  "Business Communication": [
    "Practice writing professional emails, memos, and business letters with correct formatting.",
    "Review grammar, punctuation, and commonly confused words (affect/effect, their/there/they're).",
    "Study proofreading marks and practice editing documents for clarity and tone.",
    "Drill scenarios requiring persuasive, informational, and negative message writing.",
    "Review digital communication etiquette for professional social media and instant messaging.",
    "Practice formatting and structuring a formal business report with headings and citations."
  ],
  "Business Ethics": [
    "Study major ethical frameworks: utilitarian, deontological, virtue ethics, and stakeholder theory.",
    "Review real-world corporate ethics cases — Enron, Wells Fargo, Volkswagen emissions.",
    "Practice identifying ethical dilemmas and writing structured analyses using a decision-making model.",
    "Study corporate social responsibility (CSR) programs and their business impact.",
    "Review whistleblower protections under Sarbanes-Oxley and Dodd-Frank.",
    "Drill scenarios involving conflicts of interest, insider trading, and workplace harassment."
  ],
  "Business Law": [
    "Study contract law essentials: offer, acceptance, consideration, capacity, and legality.",
    "Review tort law — negligence elements, strict liability, and product liability cases.",
    "Practice identifying UCC Article 2 rules for sales of goods vs. common law for services.",
    "Study employment law: at-will doctrine, discrimination protections, FLSA, and OSHA.",
    "Review consumer protection laws: FTC Act, Truth in Lending, Fair Credit Reporting.",
    "Drill case-based questions: identify the legal issue, applicable rule, and likely outcome."
  ],
  "Business Management": [
    "Study the four management functions: planning, organizing, leading, and controlling.",
    "Practice roleplay scenarios involving employee conflict resolution and team motivation.",
    "Review organizational structures: functional, divisional, matrix, and flat.",
    "Study leadership theories: situational leadership, transformational, servant leadership.",
    "Drill SWOT analysis and strategic planning scenarios for business case studies.",
    "Practice your roleplay structure: diagnose the situation, propose a management action, and explain expected outcomes."
  ],
  "Business Plan": [
    "Review the rubric and ensure your written plan covers executive summary, market analysis, financials, and operations.",
    "Refine your financial projections — income statement, cash flow, and break-even analysis must be realistic.",
    "Rehearse your team presentation with each member covering a distinct plan section.",
    "Prepare a competitive analysis slide showing your venture's unique value proposition.",
    "Practice answering judge Q&A about revenue model, target market size, and scalability.",
    "Proofread the entire report for formatting consistency, grammar, and citation accuracy."
  ],
  "Career Portfolio": [
    "Organize your portfolio with clear sections: resume, cover letter, work samples, and references.",
    "Practice your portfolio presentation — walk through each section with a compelling narrative.",
    "Update your resume with quantified achievements and action verbs for every bullet point.",
    "Prepare a 30-second elevator pitch summarizing your career goals and qualifications.",
    "Review your work samples and select pieces that demonstrate a range of skills.",
    "Do a full dress rehearsal in professional attire with a timer set to the allotted time."
  ],
  "Coding & Programming": [
    "Review the event rubric — identify point values for functionality, UI, documentation, and code quality.",
    "Practice timed coding challenges focusing on algorithms, sorting, and data structures.",
    "Build a small project under competition time constraints using your chosen language.",
    "Study best practices for code commenting, naming conventions, and modular design.",
    "Test edge cases and input validation in your programs — judges look for robustness.",
    "Practice explaining your design decisions and code logic for the Q&A portion."
  ],
  "Community Service Project": [
    "Review the rubric and verify your report addresses planning, implementation, impact, and evaluation.",
    "Quantify your project's community impact — hours served, people reached, funds raised.",
    "Rehearse the team presentation with clear speaking roles and smooth transitions.",
    "Prepare supporting evidence: photos, testimonials, media coverage, and data charts.",
    "Practice answering judge questions about obstacles faced and lessons learned.",
    "Proofread the written report for errors, formatting, and proper section headings."
  ],
  "Computer Applications": [
    "Practice timed tasks in Word: mail merge, styles, headers/footers, and table of contents.",
    "Drill Excel skills: VLOOKUP, pivot tables, conditional formatting, and chart creation.",
    "Review PowerPoint design: slide masters, animations, transitions, and embedded media.",
    "Practice Access database tasks: table creation, queries, forms, and report generation.",
    "Time yourself completing multi-application integration tasks (Excel data into Word reports).",
    "Study keyboard shortcuts for Office applications to maximize speed during the timed test."
  ],
  "Computer Game & Simulation Programming": [
    "Review the event rubric — focus on gameplay, functionality, design, and documentation weights.",
    "Design a game concept document with mechanics, objectives, and target audience before coding.",
    "Practice implementing core game loops: input handling, physics/logic updates, and rendering.",
    "Test your game for bugs, edge cases, and performance issues under time constraints.",
    "Prepare a clear design document explaining your game architecture and creative choices.",
    "Practice the live demonstration — show key features and answer technical questions confidently."
  ],
  "Computer Problem Solving": [
    "Study hardware components: CPU, RAM, storage types, motherboard, and peripheral interfaces.",
    "Review troubleshooting methodology: identify, research, establish a plan, test, and document.",
    "Practice questions on operating system management: file systems, permissions, and processes.",
    "Drill networking fundamentals: IP addressing, subnetting, DNS, DHCP, and common port numbers.",
    "Study software troubleshooting: driver issues, application crashes, and compatibility problems.",
    "Review cybersecurity basics: malware types, firewalls, and safe computing practices."
  ],
  "Customer Service": [
    "Practice roleplay scenarios handling customer complaints, returns, and escalations.",
    "Study the service recovery framework: listen, empathize, apologize, resolve, and follow up.",
    "Review customer communication techniques: active listening, positive language, and de-escalation.",
    "Drill scenarios involving difficult customers — stay professional and solution-focused.",
    "Study CRM systems and how customer data informs personalized service.",
    "Practice your roleplay opening: greet warmly, identify the customer's concern, and set expectations."
  ],
  "Cybersecurity": [
    "Study common attack vectors: phishing, ransomware, SQL injection, DDoS, and social engineering.",
    "Review encryption methods: symmetric vs. asymmetric, hashing algorithms, and digital certificates.",
    "Practice analyzing network security scenarios: firewall rules, IDS/IPS, and access controls.",
    "Study compliance frameworks: NIST Cybersecurity Framework, GDPR basics, and HIPAA security rules.",
    "Drill incident response procedures: identification, containment, eradication, recovery, and lessons learned.",
    "Review authentication methods: MFA, biometrics, OAuth, and password policy best practices."
  ],
  "Data Analysis": [
    "Practice creating data visualizations: charts, graphs, and dashboards that tell a clear story.",
    "Study descriptive statistics: mean, median, mode, standard deviation, and data distributions.",
    "Prepare a sample data analysis presentation with clear problem statement, methodology, and findings.",
    "Practice interpreting datasets — identify trends, outliers, and correlations.",
    "Review spreadsheet functions for analysis: pivot tables, VLOOKUP, IF statements, and regression tools.",
    "Rehearse answering judge questions about your data sources, methodology, and conclusions."
  ],
  "Data Science & AI": [
    "Study machine learning fundamentals: supervised vs. unsupervised learning, classification, and regression.",
    "Review data preprocessing steps: cleaning, normalization, feature selection, and train/test splits.",
    "Practice questions on AI ethics: bias in algorithms, privacy concerns, and responsible AI frameworks.",
    "Study common algorithms: decision trees, k-nearest neighbors, linear regression, and neural network basics.",
    "Review real-world AI applications in business: recommendation engines, NLP, and predictive analytics.",
    "Drill data visualization and interpretation — explain model outputs to a non-technical audience."
  ],
  "Digital Animation": [
    "Study the 12 principles of animation: squash and stretch, anticipation, timing, and follow-through.",
    "Create a storyboard with clear shot composition, camera movements, and timing annotations.",
    "Practice your animation software workflow — keyframing, tweening, and rendering pipeline.",
    "Review frame rate standards (24fps film, 30fps video) and how they affect animation smoothness.",
    "Build a 15-second animation sample under timed conditions to simulate competition pressure.",
    "Prepare to explain your creative and technical choices during the Q&A evaluation."
  ],
  "Digital Video Production": [
    "Write a tight script with clear dialogue, stage directions, and shot descriptions.",
    "Study cinematography basics: rule of thirds, shot types (wide, medium, close-up), and camera movement.",
    "Practice video editing workflow: importing, cutting, transitions, color grading, and audio mixing.",
    "Review audio production: microphone placement, ambient noise reduction, and music licensing.",
    "Create a production schedule and shot list to maximize efficiency during filming.",
    "Watch your finished product critically — check pacing, audio levels, and visual continuity."
  ],
  "Economics": [
    "Study microeconomic concepts: supply and demand, elasticity, market structures, and consumer surplus.",
    "Review macroeconomic indicators: GDP, unemployment rate, inflation (CPI), and balance of trade.",
    "Practice analyzing monetary policy tools: open market operations, discount rate, and reserve requirements.",
    "Study fiscal policy: government spending, taxation, budget deficits, and national debt impacts.",
    "Drill questions on international trade: comparative advantage, tariffs, quotas, and exchange rates.",
    "Review economic systems: market, command, mixed, and traditional — compare strengths and weaknesses."
  ],
  "Entrepreneurship": [
    "Study the entrepreneurial process: opportunity recognition, feasibility analysis, and launch planning.",
    "Practice roleplay scenarios pitching a business idea and handling investor objections.",
    "Review financial fundamentals for startups: break-even analysis, funding sources, and cash flow management.",
    "Drill market analysis techniques: TAM/SAM/SOM, competitive positioning, and customer personas.",
    "Study legal structures for new businesses: sole proprietorship, LLC, S-Corp, and partnership.",
    "Practice your roleplay closing — summarize your recommendation and state next steps clearly."
  ],
  "Event Planning": [
    "Review the rubric and ensure your report covers event concept, logistics, budget, marketing, and evaluation.",
    "Document your event timeline with milestones, vendor contracts, and contingency plans.",
    "Rehearse the team presentation — each member should own a specific event planning area.",
    "Prepare a detailed budget with line items, actual vs. projected costs, and ROI analysis.",
    "Practice answering judge questions about challenges faced, decisions made, and measurable outcomes.",
    "Include supporting materials: photos, attendee feedback, sponsor acknowledgments, and media coverage."
  ],
  "Financial Planning": [
    "Study the financial planning process: goal setting, data gathering, analysis, recommendations, and monitoring.",
    "Review investment vehicles: stocks, bonds, mutual funds, ETFs, 401(k), and IRA types.",
    "Practice creating a comprehensive financial plan including budgeting, insurance, and retirement projections.",
    "Drill time value of money calculations: present value, future value, annuities, and compound interest.",
    "Study risk management: insurance types (life, health, property, liability) and coverage selection.",
    "Review tax planning basics: filing status, deductions, credits, and marginal vs. effective tax rates."
  ],
  "Future Business Educator": [
    "Prepare a lesson plan with clear objectives, activities, assessments, and FBLA integration.",
    "Practice delivering a 5-minute teaching demonstration with engaging visual aids.",
    "Study current trends in business education: project-based learning, technology integration, and CTE pathways.",
    "Prepare answers for judge questions about your teaching philosophy and classroom management approach.",
    "Review FBLA's mission, programs, and how competitive events connect to business education standards.",
    "Do a full dress rehearsal — time your presentation and practice smooth transitions between segments."
  ],
  "Future Business Leader": [
    "Study FBLA history, creed, bylaws, and organizational structure for the objective test.",
    "Prepare your leadership portfolio showcasing FBLA involvement, community service, and achievements.",
    "Practice delivering a speech about your leadership philosophy and future business goals.",
    "Review current business trends and be ready to discuss their implications during Q&A.",
    "Study parliamentary procedure basics that may appear on the objective test component.",
    "Rehearse answering judge questions about your specific leadership experiences and lessons learned."
  ],
  "Graphic Design": [
    "Review the event rubric — note how design principles, creativity, and technical skill are weighted.",
    "Study core design principles: contrast, alignment, repetition, proximity, and visual hierarchy.",
    "Practice timed design challenges in your software (Adobe Illustrator, Photoshop, or Canva).",
    "Review typography best practices: font pairing, readability, kerning, and leading.",
    "Study color theory: color wheel relationships, psychology of color, and accessible color contrast.",
    "Prepare to explain your design rationale — why you chose specific colors, fonts, and layouts."
  ],
  "Healthcare Administration": [
    "Study the U.S. healthcare system structure: providers, payers, regulators, and delivery models.",
    "Review HIPAA regulations: privacy rule, security rule, and breach notification requirements.",
    "Practice questions on healthcare finance: reimbursement models, Medicare/Medicaid, and managed care.",
    "Study medical terminology and coding basics: ICD, CPT, and revenue cycle management.",
    "Review quality improvement concepts: patient safety, accreditation (Joint Commission), and outcomes measurement.",
    "Drill ethical scenarios in healthcare: informed consent, patient rights, and end-of-life decisions."
  ],
  "Hospitality & Event Management": [
    "Study hotel operations: front desk procedures, revenue management, and guest service standards.",
    "Practice roleplay scenarios handling guest complaints, overbookings, and special requests.",
    "Review event management fundamentals: venue selection, catering, logistics, and budgeting.",
    "Drill customer service excellence techniques specific to the hospitality industry.",
    "Study food and beverage management: cost control, menu planning, and health code compliance.",
    "Practice your roleplay structure: greet the guest, assess the situation, offer a solution, and confirm satisfaction."
  ],
  "Human Resource Management": [
    "Study the recruitment and selection process: job analysis, posting, screening, interviewing, and onboarding.",
    "Practice roleplay scenarios involving employee performance reviews and disciplinary conversations.",
    "Review employment law essentials: Title VII, ADA, FMLA, FLSA, and at-will employment.",
    "Drill compensation and benefits concepts: pay structures, health insurance, retirement plans, and incentives.",
    "Study training and development methods: orientation, mentoring, e-learning, and performance metrics.",
    "Practice your roleplay: identify the HR issue, reference relevant policy, and recommend a fair resolution."
  ],
  "Impromptu Speaking": [
    "Practice the PREP framework: Point, Reason, Example, Point — for quick speech organization.",
    "Drill 5-minute impromptu speeches on random business topics daily to build confidence.",
    "Study current business news and trends so you can reference real examples in speeches.",
    "Practice smooth transitions between your introduction, main points, and conclusion.",
    "Record yourself speaking and review for filler words (um, like, so), pacing, and eye contact.",
    "Time your practice speeches — aim to use 90% of your allotted speaking time."
  ],
  "Insurance & Risk Management": [
    "Study insurance fundamentals: insurable interest, indemnity, subrogation, and risk pooling.",
    "Review the major insurance types: life, health, property, casualty, liability, and commercial.",
    "Practice analyzing risk scenarios and recommending appropriate coverage combinations.",
    "Drill key terms: premium, deductible, copay, coinsurance, exclusions, and policy limits.",
    "Study the underwriting process and how actuarial data informs risk assessment.",
    "Review emerging risks in insurance: cyber liability, climate change, and insurtech innovations."
  ],
  "International Business": [
    "Study international trade concepts: absolute and comparative advantage, balance of payments, and trade barriers.",
    "Practice roleplay scenarios involving cross-cultural business negotiations and market entry decisions.",
    "Review foreign exchange: currency conversion, exchange rate factors, and hedging strategies.",
    "Drill global marketing concepts: standardization vs. adaptation, and cultural dimensions (Hofstede).",
    "Study international organizations and agreements: WTO, NAFTA/USMCA, EU, and ASEAN.",
    "Practice your roleplay: analyze the international scenario, consider cultural factors, and present a strategic recommendation."
  ],
  "Introduction to Business Communication": [
    "Study professional email format: subject lines, greetings, body structure, and closings.",
    "Practice grammar and punctuation rules commonly tested: comma splices, subject-verb agreement, and apostrophes.",
    "Review business letter formatting: block style, modified block, and proper salutations.",
    "Drill proofreading skills — spot errors in sample business documents quickly.",
    "Study workplace communication etiquette for phone, email, and in-person interactions.",
    "Practice writing clear, concise memos with proper headings and purpose statements."
  ],
  "Introduction to Business Concepts": [
    "Study the four types of economic systems and how supply and demand set prices.",
    "Review basic business ownership structures: sole proprietorship, partnership, corporation, and LLC.",
    "Practice questions on marketing fundamentals: the 4 Ps, target market, and market segmentation.",
    "Drill management and leadership basics: planning, organizing, leading, and controlling.",
    "Study basic financial literacy: budgeting, saving, credit, and compound interest.",
    "Review entrepreneurship concepts: business plans, startups, and risk vs. reward."
  ],
  "Introduction to Business Presentation": [
    "Outline your presentation with a clear hook, three key points, and a memorable closing statement.",
    "Practice delivering your presentation to a timer — stay within the allotted time limit.",
    "Create clean, visually appealing slides with minimal text and strong visuals.",
    "Record yourself presenting and review for eye contact, posture, and vocal variety.",
    "Prepare for 3-5 likely judge questions and rehearse concise, confident answers.",
    "Do a dress rehearsal in professional attire to simulate competition conditions."
  ],
  "Introduction to Business Procedures": [
    "Study office technology skills: word processing, spreadsheets, and database fundamentals.",
    "Practice questions on filing systems: alphabetic, numeric, geographic, and subject-based.",
    "Review office procedures: scheduling, correspondence, record keeping, and telephone etiquette.",
    "Drill basic accounting and financial record-keeping for office environments.",
    "Study workplace safety, ergonomics, and professional office conduct.",
    "Practice data entry accuracy and speed — common competition skill areas."
  ],
  "Introduction to FBLA": [
    "Memorize the FBLA creed, motto, and organizational goals word for word.",
    "Study FBLA history: founding date, founders, key milestones, and organizational structure.",
    "Review FBLA bylaws, membership requirements, and officer positions at all levels.",
    "Practice questions on FBLA programs: competitive events, community service, and awards.",
    "Study the FBLA-PBL national conference structure and competitive event categories.",
    "Review how FBLA connects to Career and Technical Education (CTE) and business pathways."
  ],
  "Introduction to Information Technology": [
    "Study hardware components: CPU, RAM, storage devices, input/output devices, and motherboard.",
    "Review software concepts: operating systems, application software, and cloud computing basics.",
    "Practice questions on networking fundamentals: LAN, WAN, Wi-Fi, IP addresses, and internet protocols.",
    "Drill digital citizenship and cybersecurity basics: passwords, phishing, and safe online behavior.",
    "Study emerging technology trends: IoT, AI basics, blockchain, and virtual reality.",
    "Review number systems and data representation: binary, decimal, and file size units."
  ],
  "Introduction to Marketing Concepts": [
    "Study the marketing mix (4 Ps): product, price, place, and promotion strategies.",
    "Review market segmentation: demographic, geographic, psychographic, and behavioral.",
    "Practice questions on consumer behavior and the buying decision process.",
    "Drill promotion methods: advertising, sales promotion, public relations, and personal selling.",
    "Study basic pricing strategies: cost-plus, competitive, penetration, and skimming.",
    "Review the product life cycle: introduction, growth, maturity, and decline stages."
  ],
  "Introduction to Parliamentary Procedure": [
    "Memorize the order of precedence for the 13 ranked motions.",
    "Study the basic meeting structure: call to order, minutes, reports, old/new business, adjournment.",
    "Practice identifying which motions require a second, are debatable, and are amendable.",
    "Review voting methods: voice, rising, show of hands, ballot, and roll call.",
    "Drill scenarios involving points of order, appeals, and common procedural mistakes.",
    "Study Robert's Rules of Order basics and the role of each officer in a meeting."
  ],
  "Introduction to Programming": [
    "Study fundamental programming concepts: variables, data types, operators, and expressions.",
    "Practice writing basic control structures: if/else, for loops, while loops, and switch statements.",
    "Review function/method concepts: parameters, return values, and scope.",
    "Drill pseudocode and flowchart reading — translate logic diagrams into code.",
    "Study basic data structures: arrays, lists, and simple string manipulation.",
    "Practice debugging: identify syntax errors, logic errors, and runtime errors in sample code."
  ],
  "Introduction to Public Speaking": [
    "Practice organizing a speech with a clear introduction, body (2-3 points), and conclusion.",
    "Study delivery techniques: eye contact, gestures, vocal variety, and confident posture.",
    "Record yourself delivering a practice speech and identify areas for improvement.",
    "Prepare for judge Q&A — practice answering follow-up questions concisely and thoughtfully.",
    "Review how to use visual aids effectively without reading directly from them.",
    "Do a timed dress rehearsal in professional attire to build comfort and confidence."
  ],
  "Introduction to Retail & Merchandising": [
    "Study the retail industry: types of retailers, distribution channels, and omnichannel strategies.",
    "Review visual merchandising principles: store layout, product displays, and signage.",
    "Practice questions on customer service fundamentals in a retail setting.",
    "Drill pricing and markdown strategies: keystone pricing, loss leaders, and seasonal sales.",
    "Study inventory management basics: stock levels, turnover rate, and shrinkage prevention.",
    "Review basic retail math: markup percentage, gross margin, and sales per square foot."
  ],
  "Introduction to Social Media Strategy": [
    "Study major social media platforms and their unique audiences, features, and content formats.",
    "Practice creating a social media content calendar with posting schedules and themes.",
    "Prepare a sample social media campaign with defined goals, target audience, and KPIs.",
    "Review social media analytics: engagement rate, reach, impressions, and follower growth.",
    "Study best practices for brand voice, hashtag strategy, and community management.",
    "Rehearse your presentation — explain your strategy rationale clearly to judges."
  ],
  "Introduction to Supply Chain Management": [
    "Study the basic supply chain: suppliers, manufacturers, distributors, retailers, and consumers.",
    "Review logistics fundamentals: transportation modes, warehousing, and order fulfillment.",
    "Practice questions on inventory management: EOQ, just-in-time, and safety stock concepts.",
    "Drill procurement basics: sourcing, vendor selection, and purchase order processes.",
    "Study the impact of technology on supply chains: barcode, RFID, ERP, and e-commerce logistics.",
    "Review sustainability in supply chains: green logistics, ethical sourcing, and waste reduction."
  ],
  "Job Interview": [
    "Build a polished resume with quantified achievements, action verbs, and clean formatting.",
    "Practice answering behavioral questions using the STAR method (Situation, Task, Action, Result).",
    "Prepare a professional portfolio or reference sheet to bring to the interview.",
    "Study common interview questions: strengths/weaknesses, career goals, and why this role.",
    "Do a mock interview in full professional attire — practice handshake, eye contact, and posture.",
    "Prepare 3-5 thoughtful questions to ask the interviewer at the end of the session.",
    "Write a concise cover letter tailored to the position described in competition materials."
  ],
  "Journalism": [
    "Study AP style rules: numbers, capitalization, abbreviations, and punctuation conventions.",
    "Practice writing news stories in inverted pyramid format under timed conditions.",
    "Review journalism ethics: objectivity, fairness, source verification, and conflict of interest.",
    "Drill headline writing — make headlines accurate, engaging, and concise.",
    "Practice editing copy for grammar, style, accuracy, and libel concerns.",
    "Study page layout and design principles for print and digital publications."
  ],
  "Management Information Systems": [
    "Study database management concepts: relational models, SQL basics, normalization, and ER diagrams.",
    "Review systems development lifecycle (SDLC): planning, analysis, design, implementation, and maintenance.",
    "Practice questions on ERP systems and how they integrate business functions.",
    "Drill IT security concepts: access controls, encryption, disaster recovery, and business continuity.",
    "Study cloud computing models: IaaS, PaaS, SaaS, and public vs. private vs. hybrid clouds.",
    "Review how MIS supports decision-making: DSS, executive dashboards, and data warehousing."
  ],
  "Marketing": [
    "Study marketing strategy: segmentation, targeting, positioning, and the marketing mix (4 Ps).",
    "Practice roleplay scenarios involving product launches, brand crises, and market research findings.",
    "Review digital marketing channels: SEO, SEM, email marketing, social media, and content marketing.",
    "Drill consumer behavior concepts: buying process, influences, and customer lifetime value.",
    "Study marketing research methods: surveys, focus groups, A/B testing, and data analysis.",
    "Practice your roleplay: analyze the marketing scenario, recommend a strategy, and justify with data."
  ],
  "Mobile Application Development": [
    "Review the event rubric — note scoring for functionality, UI/UX, code quality, and documentation.",
    "Design wireframes and user flow diagrams before writing any code.",
    "Practice building a functional app prototype under timed competition constraints.",
    "Study mobile UI/UX best practices: touch targets, navigation patterns, and responsive layouts.",
    "Test your app thoroughly: edge cases, input validation, screen sizes, and error handling.",
    "Prepare to demonstrate your app and explain your architecture and design decisions to judges."
  ],
  "Network Design": [
    "Study network topologies: star, bus, ring, mesh, and hybrid — know advantages and use cases.",
    "Review the OSI model and TCP/IP stack — understand what happens at each layer.",
    "Practice designing network diagrams with proper addressing, subnetting, and VLAN configuration.",
    "Drill network hardware knowledge: routers, switches, access points, firewalls, and cabling standards.",
    "Study wireless networking: Wi-Fi standards (802.11ac/ax), security protocols (WPA3), and channel planning.",
    "Review network security fundamentals: firewalls, DMZ, VPN, and intrusion detection systems."
  ],
  "Networking Infrastructures": [
    "Study the OSI model in depth — know protocols, devices, and functions at each layer.",
    "Review IP addressing: IPv4, IPv6, subnetting, CIDR notation, and NAT.",
    "Practice configuring network services: DHCP, DNS, HTTP/HTTPS, FTP, and SMTP.",
    "Drill network troubleshooting tools and commands: ping, traceroute, ipconfig/ifconfig, and nslookup.",
    "Study network security: firewalls, ACLs, VPNs, IDS/IPS, and secure protocols (SSH, TLS).",
    "Review cloud networking and virtualization concepts: virtual switches, SDN, and load balancing."
  ],
  "Organizational Leadership": [
    "Study leadership styles: transformational, transactional, servant, and situational leadership.",
    "Review organizational behavior concepts: motivation theories (Maslow, Herzberg), team dynamics, and culture.",
    "Practice questions on change management: Kotter's 8-step model and overcoming resistance.",
    "Drill communication skills for leaders: active listening, feedback delivery, and conflict resolution.",
    "Study strategic planning: vision/mission, SWOT analysis, goal setting, and KPI tracking.",
    "Review diversity, equity, and inclusion (DEI) strategies and their impact on organizational performance."
  ],
  "Parliamentary Procedure Individual": [
    "Memorize the order of precedence for all 13 ranked motions and their properties.",
    "Study each motion's requirements: seconding, debatability, amendability, and vote threshold.",
    "Practice handling points of order, appeals, and parliamentary inquiries as both chair and member.",
    "Drill scenarios involving amendments to amendments, referral to committee, and previous question.",
    "Review the officer duties: president, vice president, secretary, and treasurer roles.",
    "Take a timed practice exam and review every missed question with the Robert's Rules reference."
  ],
  "Parliamentary Procedure Team": [
    "Assign team roles (chair, secretary, members) and rehearse a full mock meeting end-to-end.",
    "Memorize the order of precedence and practice making and processing all 13 ranked motions.",
    "Practice smooth role transitions and proper parliamentary language during debate.",
    "Drill complex scenarios: subsidiary motions stacking, tabling, and reconsidering motions.",
    "Time your demonstration to ensure you showcase maximum content within the allotted window.",
    "Study the scoring rubric — focus on correct procedure, teamwork, and professional delivery."
  ],
  "Personal Finance": [
    "Study budgeting methods: 50/30/20 rule, zero-based budgeting, and envelope system.",
    "Review credit concepts: credit scores, credit reports, interest rates, and responsible card use.",
    "Practice calculating loan payments: principal, interest, amortization, and APR comparison.",
    "Drill tax fundamentals: W-2 vs. 1099, standard vs. itemized deductions, and tax brackets.",
    "Study investment basics: stocks, bonds, mutual funds, compound interest, and risk tolerance.",
    "Review consumer protection: identity theft prevention, fraud detection, and rights under FCRA."
  ],
  "Project Management": [
    "Study the project lifecycle: initiation, planning, execution, monitoring, and closing.",
    "Review project management methodologies: waterfall, agile, scrum, and kanban fundamentals.",
    "Practice creating project schedules: WBS, Gantt charts, critical path method, and milestones.",
    "Drill risk management: identify, assess, mitigate, and monitor project risks.",
    "Study stakeholder management, communication plans, and change control processes.",
    "Review project budgeting: cost estimation, earned value analysis, and variance reporting."
  ],
  "Public Administration & Management": [
    "Study the structure of U.S. government: federal, state, and local roles and responsibilities.",
    "Review public policy development: agenda setting, formulation, adoption, implementation, and evaluation.",
    "Practice questions on public sector budgeting: appropriations, revenue sources, and fiscal accountability.",
    "Drill concepts in public management: bureaucracy, civil service, and government ethics.",
    "Study intergovernmental relations and federalism principles.",
    "Review current public administration challenges: digital government, transparency, and citizen engagement."
  ],
  "Public Service Announcement": [
    "Define a clear, focused message — your PSA should address one specific issue with a call to action.",
    "Study PSA structure: hook the audience in 5 seconds, deliver the message, and close with impact.",
    "Script your PSA with concise, compelling language appropriate for your target audience.",
    "Practice production techniques: audio clarity, visual composition, pacing, and timing constraints.",
    "Review the rubric to understand how content, delivery, production quality, and impact are scored.",
    "Do a test screening with peers and gather feedback before your final submission."
  ],
  "Public Speaking": [
    "Write and outline your speech with a strong hook, clear thesis, supporting points, and powerful close.",
    "Practice delivery: vary your pace, volume, and tone for emphasis and audience engagement.",
    "Record a full rehearsal and review for filler words, awkward pauses, and body language.",
    "Prepare for the Q&A — anticipate 5 tough judge questions and rehearse clear, brief answers.",
    "Study persuasive speaking techniques: rhetorical appeals (ethos, pathos, logos) and storytelling.",
    "Do a dress rehearsal in professional attire with a live audience for realistic feedback."
  ],
  "Real Estate": [
    "Study types of property ownership: fee simple, leasehold, joint tenancy, and tenancy in common.",
    "Review the real estate transaction process: listing, offer, contract, inspection, closing, and title transfer.",
    "Practice mortgage calculations: monthly payments, interest over life of loan, points, and amortization.",
    "Drill property valuation methods: sales comparison, cost approach, and income capitalization.",
    "Study real estate law: zoning, eminent domain, easements, liens, and fair housing regulations.",
    "Review real estate investment concepts: ROI, cap rate, cash flow analysis, and 1031 exchanges."
  ],
  "Retail Management": [
    "Study store operations: staffing, scheduling, customer flow, and loss prevention strategies.",
    "Review merchandising strategies: product assortment, planograms, and seasonal inventory planning.",
    "Practice retail math: markup, markdown, gross margin, inventory turnover, and break-even analysis.",
    "Drill customer relationship management: loyalty programs, feedback systems, and omnichannel integration.",
    "Study supply chain and distribution for retail: vendor relations, receiving, and stock replenishment.",
    "Review retail technology: POS systems, e-commerce platforms, and data-driven merchandising decisions."
  ],
  "Sales Presentation": [
    "Research your product or service thoroughly — know features, benefits, and competitive advantages.",
    "Structure your pitch: attention-grabbing opener, problem statement, solution, proof points, and close.",
    "Practice handling objections: price concerns, competitor comparisons, and timing hesitations.",
    "Study sales techniques: consultative selling, SPIN selling, and the assumptive close.",
    "Rehearse your presentation with a timer — pace yourself to allow time for Q&A.",
    "Prepare professional visual aids that support your pitch without overwhelming the audience."
  ],
  "Securities & Investments": [
    "Study investment types: stocks (common/preferred), bonds, mutual funds, ETFs, and derivatives.",
    "Review market fundamentals: stock exchanges, indices (Dow, S&P 500, NASDAQ), and market orders.",
    "Practice analyzing financial statements to evaluate a company's investment potential.",
    "Drill risk and return concepts: diversification, beta, asset allocation, and portfolio theory.",
    "Study securities regulation: SEC role, insider trading laws, and the Sarbanes-Oxley Act.",
    "Review retirement investment vehicles: 401(k), IRA, Roth IRA, and annuities."
  ],
  "Social Media Strategies": [
    "Develop a comprehensive social media strategy with platform selection, content pillars, and KPIs.",
    "Study analytics tools and metrics: engagement rate, reach, impressions, CTR, and conversion tracking.",
    "Practice creating a content calendar with varied post types: educational, promotional, and interactive.",
    "Review paid social advertising: targeting options, ad formats, budgeting, and A/B testing.",
    "Prepare your presentation with clear visuals showing campaign results and data-driven insights.",
    "Study crisis communication on social media: response protocols, tone management, and reputation recovery."
  ],
  "Sports & Entertainment Management": [
    "Study venue management operations: booking, staffing, crowd management, and facility maintenance.",
    "Practice roleplay scenarios involving sponsorship negotiations, event logistics, and crisis management.",
    "Review marketing strategies specific to sports and entertainment: promotions, licensing, and merchandising.",
    "Drill financial concepts: ticket pricing, revenue streams, salary caps, and broadcast rights.",
    "Study event operations: scheduling, vendor coordination, security planning, and attendee experience.",
    "Practice your roleplay: analyze the situation, consider all stakeholders, and propose a professional solution."
  ],
  "Supply Chain Management": [
    "Study the end-to-end supply chain: procurement, manufacturing, logistics, distribution, and returns.",
    "Review inventory management models: EOQ, JIT, ABC analysis, and safety stock calculations.",
    "Practice questions on logistics: transportation modes, warehousing strategies, and last-mile delivery.",
    "Drill procurement processes: supplier evaluation, RFP/RFQ, contract negotiation, and vendor management.",
    "Study supply chain technology: ERP systems, RFID, blockchain for traceability, and demand forecasting.",
    "Review global supply chain challenges: disruption risk, lead time variability, and sustainability."
  ],
  "Technology Support & Services": [
    "Study common troubleshooting scenarios: hardware failures, software errors, and connectivity issues.",
    "Practice roleplay scenarios providing technical support to non-technical users.",
    "Review help desk best practices: ticketing systems, SLAs, escalation procedures, and knowledge bases.",
    "Drill customer communication skills: explain technical concepts in plain language.",
    "Study IT service management frameworks: ITIL basics, incident vs. problem management.",
    "Practice your roleplay: greet the user, diagnose the issue with questions, and walk them through a solution."
  ],
  "Visual Design": [
    "Review the event rubric — identify how creativity, technical execution, and design principles are scored.",
    "Study visual design principles: balance, contrast, alignment, hierarchy, and white space.",
    "Practice timed design projects in your chosen software to simulate competition conditions.",
    "Review typography fundamentals: font classification, pairing, readability, and typographic hierarchy.",
    "Study color systems (RGB, CMYK, Pantone) and how to create accessible, harmonious palettes.",
    "Prepare to articulate your design process and justify creative decisions during Q&A."
  ],
  "Website Coding & Development": [
    "Review the event rubric — note scoring weights for functionality, code quality, design, and documentation.",
    "Practice building responsive web pages with semantic HTML5, CSS3 (flexbox/grid), and JavaScript.",
    "Study web accessibility standards: WCAG guidelines, alt text, ARIA labels, and keyboard navigation.",
    "Build a timed practice project matching competition requirements to test your speed and accuracy.",
    "Test your site across browsers and screen sizes — validate HTML/CSS and fix any errors.",
    "Prepare to walk judges through your code structure, design choices, and any frameworks used."
  ],
  "Website Design": [
    "Study UX/UI design principles: user-centered design, information architecture, and navigation patterns.",
    "Create wireframes and mockups before building to plan your site layout and user flow.",
    "Review responsive design techniques: fluid grids, flexible images, and mobile-first approach.",
    "Practice building a polished website under timed conditions matching competition constraints.",
    "Study web accessibility: color contrast, alt text, heading structure, and screen reader compatibility.",
    "Test your site's usability with peers and iterate based on feedback before competition."
  ]
};

const STRATEGY_TIPS = [
  "Sort your misses by concept, not by test date — patterns reveal weak spots faster.",
  "Do 2 timed sets before 1 untimed review — pressure builds recall speed.",
  "After every 5 questions, explain one answer aloud as if teaching someone.",
  "In roleplay, deliver your recommendation by the 2-minute mark so judges can ask follow-ups.",
  "Close each session with a 90-second brain dump of everything you remember.",
  "Study in 25-minute blocks with 5-minute breaks (Pomodoro) — consistency beats cramming.",
  "When you miss a question, don't just read the answer — rewrite the question in your own words.",
  "Practice with distractions occasionally — competition rooms aren't quiet.",
  "For roleplay events, structure every answer as: situation → action → result.",
  "Read the competency list for your event — it's the blueprint for what FBLA tests.",
  "On test day, answer easy questions first to build confidence and bank time.",
  "For presentation events, pause 2 seconds after key points — it adds authority.",
  "Review your strongest areas briefly to maintain them, then spend 70% of time on weaknesses.",
  "Use the explain-it-to-a-5-year-old test: if you can't simplify it, you don't know it well enough."
];

const FBLA_SECONDS_PER_QUESTION = 30;
const FLASHCARD_DECK_LIMIT = 18;
const HISTORY_LIMIT = 200;
const MISSED_QUESTIONS_LIMIT = 150;
const SCORE_CHART_LIMIT = 20;
const WEAKEST_AREAS_LIMIT = 5;
const RECENT_EXAMS_LIMIT = 10;
const SCORE_THRESHOLD_NATIONALS = 85;
const SCORE_THRESHOLD_SOLID = 70;
const DEBOUNCE_MS = 200;
