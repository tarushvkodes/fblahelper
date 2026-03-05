// Complete FBLA Events data for all 74 competitive events
const EVENTS = [
  {
    id: 1, name: "Accounting", type: "objective", category: "Finance",
    description: "Tests knowledge of accounting principles, financial statements, and bookkeeping procedures.",
    format: "Objective test", duration: 60,
    tips: ["Master journal entries and T-accounts", "Practice closing entries", "Understand financial statement analysis", "Study GAAP principles"],
    quizKey: "Accounting I",
    rolePlay: false
  },
  {
    id: 2, name: "Advanced Accounting", type: "objective", category: "Finance",
    description: "Tests advanced accounting concepts including partnerships, corporations, and cost accounting.",
    format: "Objective test", duration: 60,
    tips: ["Study partnership accounting", "Understand corporate bonds and stock", "Master cost accounting methods", "Review managerial accounting concepts"],
    quizKey: "Accounting II",
    rolePlay: false
  },
  {
    id: 3, name: "Advertising", type: "objective", category: "Marketing",
    description: "Tests knowledge of advertising principles, media planning, and campaign strategies.",
    format: "Objective test", duration: 60,
    tips: ["Study advertising media types", "Understand target audience analysis", "Learn campaign planning and budgeting", "Review digital advertising trends"],
    quizKey: null,
    rolePlay: false
  },
  {
    id: 4, name: "Agribusiness", type: "objective", category: "Business",
    description: "Tests knowledge of agricultural business practices, management, and economics.",
    format: "Objective test", duration: 60,
    tips: ["Study agricultural economics", "Understand commodity markets", "Learn farm management principles", "Review agribusiness marketing"],
    quizKey: "Agribusiness",
    rolePlay: false
  },
  {
    id: 5, name: "Banking & Financial Systems", type: "objective", category: "Finance",
    description: "Tests knowledge of banking operations, financial services, and monetary systems.",
    format: "Objective test", duration: 60,
    tips: ["Study types of financial institutions", "Understand interest rate calculations", "Learn about financial regulations", "Review electronic banking systems"],
    quizKey: "Banking",
    rolePlay: false
  },
  {
    id: 6, name: "Broadcast Journalism", type: "presentation", category: "Communication",
    description: "Produce a quality broadcast news segment demonstrating journalism and production skills.",
    format: "Video production and presentation", duration: 0,
    tips: ["Practice news writing and delivery", "Master video editing techniques", "Study broadcast journalism ethics", "Prepare a strong lead story"],
    quizKey: null,
    rolePlay: false
  },
  {
    id: 7, name: "Business Communication", type: "objective", category: "Communication",
    description: "Tests knowledge of business communication principles, writing, and professional etiquette.",
    format: "Objective test", duration: 60,
    tips: ["Study business letter formats", "Practice professional email writing", "Understand communication models", "Review proofreading marks"],
    quizKey: "Business Communication",
    rolePlay: false
  },
  {
    id: 8, name: "Business Ethics", type: "presentation", category: "Business",
    description: "Analyze and present on ethical situations in business environments.",
    format: "Case study presentation", duration: 7,
    tips: ["Study ethical frameworks", "Practice case analysis", "Understand stakeholder theory", "Review corporate responsibility"],
    quizKey: null,
    rolePlay: true,
    rolePlayInfo: {
      prepTime: 10, presentTime: 7,
      scenario: "You will receive a business ethics case study. Analyze the ethical dilemma, identify stakeholders, and recommend an ethical course of action.",
      rubricPoints: ["Analysis of ethical issues", "Identification of stakeholders", "Proposed solution quality", "Professional presentation", "Response to questions"]
    }
  },
  {
    id: 9, name: "Business Law", type: "objective", category: "Business",
    description: "Tests knowledge of business law including contracts, torts, and commercial law.",
    format: "Objective test", duration: 60,
    tips: ["Study contract law elements", "Understand tort liability", "Learn employment law basics", "Review UCC provisions"],
    quizKey: "Business Law",
    rolePlay: false
  },
  {
    id: 10, name: "Business Management", type: "presentation", category: "Business",
    description: "Demonstrate understanding of management concepts through case study analysis.",
    format: "Case study and presentation", duration: 7,
    tips: ["Study management theories", "Understand organizational structures", "Practice SWOT analysis", "Review leadership styles"],
    quizKey: "Management Decision Making",
    rolePlay: true,
    rolePlayInfo: {
      prepTime: 10, presentTime: 7,
      scenario: "Analyze a management case study involving organizational challenges. Present your analysis and recommend solutions.",
      rubricPoints: ["Problem identification", "Analysis depth", "Solution feasibility", "Presentation skills", "Q&A responses"]
    }
  },
  {
    id: 11, name: "Business Plan", type: "presentation", category: "Business",
    description: "Develop and present a comprehensive business plan for a new or existing business.",
    format: "Written plan and oral presentation", duration: 7,
    tips: ["Include executive summary, market analysis, financials", "Practice elevator pitch", "Prepare financial projections", "Research your target market thoroughly"],
    quizKey: null,
    rolePlay: false
  },
  {
    id: 12, name: "Career Portfolio", type: "presentation", category: "Career Development",
    description: "Create a professional portfolio showcasing career readiness and professional development.",
    format: "Portfolio presentation", duration: 0,
    tips: ["Include resume, cover letter, work samples", "Organize professionally", "Practice discussing your portfolio", "Include leadership and community involvement"],
    quizKey: null,
    rolePlay: false
  },
  {
    id: 13, name: "Coding & Programming", type: "production", category: "Technology",
    description: "Demonstrate programming skills by solving coding challenges.",
    format: "Programming test", duration: 120,
    tips: ["Practice algorithmic thinking", "Study data structures", "Master a language like Java or Python", "Practice timed coding challenges"],
    quizKey: "Computer Problem Solving",
    rolePlay: false
  },
  {
    id: 14, name: "Community Service Project", type: "presentation", category: "Community",
    description: "Plan, execute, and present a community service project.",
    format: "Report and presentation", duration: 7,
    tips: ["Document project thoroughly", "Include photos and evidence", "Show measurable impact", "Connect to FBLA goals"],
    quizKey: null,
    rolePlay: false
  },
  {
    id: 15, name: "Computer Applications", type: "production", category: "Technology",
    description: "Tests proficiency in word processing, spreadsheets, databases, and presentations.",
    format: "Computer-based production test", duration: 60,
    tips: ["Practice Microsoft Office shortcuts", "Master mail merge", "Study advanced Excel functions", "Practice formatting documents"],
    quizKey: "Computer Applications",
    rolePlay: false
  },
  {
    id: 16, name: "Computer Game & Simulation Programming", type: "production", category: "Technology",
    description: "Design and develop an interactive computer game or simulation.",
    format: "Project and presentation", duration: 7,
    tips: ["Plan game mechanics carefully", "Focus on user experience", "Document your development process", "Test thoroughly before presenting"],
    quizKey: null,
    rolePlay: false
  },
  {
    id: 17, name: "Computer Problem Solving", type: "objective", category: "Technology",
    description: "Tests knowledge of computer hardware, software, and troubleshooting.",
    format: "Objective test", duration: 60,
    tips: ["Study hardware components", "Understand operating systems", "Learn troubleshooting methodology", "Review networking basics"],
    quizKey: "Computer Problem Solving",
    rolePlay: false
  },
  {
    id: 18, name: "Customer Service", type: "roleplay", category: "Business",
    description: "Demonstrate customer service skills through role-play scenarios.",
    format: "Role play", duration: 7,
    tips: ["Practice active listening", "Learn conflict resolution techniques", "Study customer service best practices", "Stay calm and professional"],
    quizKey: null,
    rolePlay: true,
    rolePlayInfo: {
      prepTime: 10, presentTime: 7,
      scenario: "You are a customer service representative handling a challenging customer situation. Demonstrate professionalism, problem-solving, and communication skills.",
      rubricPoints: ["Problem identification", "Communication skills", "Solution effectiveness", "Professionalism", "Customer satisfaction approach"]
    }
  },
  {
    id: 19, name: "Cybersecurity", type: "objective", category: "Technology",
    description: "Tests knowledge of cybersecurity principles, threats, and protective measures.",
    format: "Objective test", duration: 60,
    tips: ["Study common cyber threats", "Understand encryption methods", "Learn network security protocols", "Review security frameworks"],
    quizKey: "Cyber Security",
    rolePlay: false
  },
  {
    id: 20, name: "Data Analysis", type: "production", category: "Technology",
    description: "Demonstrate data analysis skills using spreadsheets and statistical tools.",
    format: "Production test", duration: 60,
    tips: ["Master pivot tables and charts", "Understand statistical measures", "Practice data visualization", "Learn data cleaning techniques"],
    quizKey: "Database Design",
    rolePlay: false
  },
  {
    id: 21, name: "Data Science & AI", type: "presentation", category: "Technology",
    description: "Demonstrate understanding of data science and artificial intelligence concepts.",
    format: "Project and presentation", duration: 7,
    tips: ["Study machine learning basics", "Understand data preprocessing", "Learn about AI ethics", "Practice explaining technical concepts"],
    quizKey: null,
    rolePlay: false
  },
  {
    id: 22, name: "Digital Animation", type: "production", category: "Design",
    description: "Create digital animations demonstrating creativity and technical skill.",
    format: "Animation project", duration: 0,
    tips: ["Plan storyboard carefully", "Focus on smooth transitions", "Use consistent art style", "Add appropriate audio"],
    quizKey: null,
    rolePlay: false
  },
  {
    id: 23, name: "Digital Video Production", type: "production", category: "Communication",
    description: "Produce a professional-quality digital video on a given topic.",
    format: "Video production", duration: 0,
    tips: ["Plan with storyboards", "Use proper lighting and audio", "Edit for pacing and story", "Follow copyright guidelines"],
    quizKey: null,
    rolePlay: false
  },
  {
    id: 24, name: "Economics", type: "objective", category: "Finance",
    description: "Tests knowledge of micro and macroeconomic principles and concepts.",
    format: "Objective test", duration: 60,
    tips: ["Study supply and demand curves", "Understand GDP and economic indicators", "Learn monetary and fiscal policy", "Review market structures"],
    quizKey: "Economics",
    rolePlay: false
  },
  {
    id: 25, name: "Entrepreneurship", type: "presentation", category: "Business",
    description: "Develop an innovative business concept and present a comprehensive plan.",
    format: "Case study and presentation", duration: 7,
    tips: ["Research market opportunity", "Develop unique value proposition", "Prepare financial projections", "Practice your pitch"],
    quizKey: "Entrepreneurship",
    rolePlay: true,
    rolePlayInfo: {
      prepTime: 10, presentTime: 7,
      scenario: "Present your entrepreneurial concept including market analysis, competitive advantage, marketing strategy, and financial projections.",
      rubricPoints: ["Business concept viability", "Market analysis", "Financial planning", "Presentation delivery", "Response to questions"]
    }
  },
  {
    id: 26, name: "Event Planning", type: "presentation", category: "Business",
    description: "Plan and present a comprehensive event management plan.",
    format: "Report and presentation", duration: 7,
    tips: ["Create detailed timeline", "Plan budget carefully", "Consider logistics and contingencies", "Show marketing strategy"],
    quizKey: null,
    rolePlay: false
  },
  {
    id: 27, name: "Financial Planning", type: "objective", category: "Finance",
    description: "Tests knowledge of personal and business financial planning principles.",
    format: "Objective test", duration: 60,
    tips: ["Study investment strategies", "Understand retirement planning", "Learn tax planning basics", "Review insurance concepts"],
    quizKey: null,
    rolePlay: false
  },
  {
    id: 28, name: "Future Business Educator", type: "presentation", category: "Career Development",
    description: "Demonstrate knowledge and passion for business education as a career.",
    format: "Presentation and interview", duration: 7,
    tips: ["Research education career paths", "Prepare lesson plan samples", "Show passion for teaching", "Discuss educational philosophy"],
    quizKey: null,
    rolePlay: false
  },
  {
    id: 29, name: "Future Business Leader", type: "presentation", category: "Career Development",
    description: "Demonstrate leadership skills and business knowledge through presentation and interview.",
    format: "Presentation and interview", duration: 7,
    tips: ["Highlight leadership experiences", "Show community involvement", "Demonstrate business knowledge", "Practice professional interview skills"],
    quizKey: "Future Business Leader",
    rolePlay: false
  },
  {
    id: 30, name: "Graphic Design", type: "production", category: "Design",
    description: "Create professional graphic design solutions for business applications.",
    format: "Design project", duration: 0,
    tips: ["Follow design principles", "Use consistent typography", "Understand color theory", "Create for the target audience"],
    quizKey: null,
    rolePlay: false
  },
  {
    id: 31, name: "Healthcare Administration", type: "objective", category: "Business",
    description: "Tests knowledge of healthcare systems, administration, and management.",
    format: "Objective test", duration: 60,
    tips: ["Study healthcare systems", "Understand HIPAA regulations", "Learn healthcare finance basics", "Review medical terminology"],
    quizKey: "Healthcare Administration",
    rolePlay: false
  },
  {
    id: 32, name: "Hospitality & Event Management", type: "presentation", category: "Business",
    description: "Demonstrate knowledge of hospitality industry principles and event management.",
    format: "Case study and presentation", duration: 7,
    tips: ["Study hospitality industry trends", "Understand event planning", "Learn customer service excellence", "Review hotel/restaurant management"],
    quizKey: "Hospitality Management",
    rolePlay: true,
    rolePlayInfo: {
      prepTime: 10, presentTime: 7,
      scenario: "You will analyze a hospitality management case study. Present your analysis and recommendations for improving operations.",
      rubricPoints: ["Industry knowledge", "Problem analysis", "Solution creativity", "Professional presentation", "Q&A responses"]
    }
  },
  {
    id: 33, name: "Human Resource Management", type: "presentation", category: "Business",
    description: "Demonstrate understanding of HR management concepts and practices.",
    format: "Case study and presentation", duration: 7,
    tips: ["Study employment law", "Understand recruitment processes", "Learn compensation and benefits", "Review employee relations"],
    quizKey: null,
    rolePlay: true,
    rolePlayInfo: {
      prepTime: 10, presentTime: 7,
      scenario: "Analyze an HR management case involving employee issues, policy development, or organizational change.",
      rubricPoints: ["HR knowledge", "Legal compliance", "Solution practicality", "Communication skills", "Professional demeanor"]
    }
  },
  {
    id: 34, name: "Impromptu Speaking", type: "speaking", category: "Communication",
    description: "Deliver an impromptu speech on a business-related topic with minimal preparation.",
    format: "Speech", duration: 4,
    tips: ["Practice the PREP method (Point, Reason, Example, Point)", "Stay calm and think before speaking", "Use confident body language", "Practice with random topics daily"],
    quizKey: null,
    rolePlay: false
  },
  {
    id: 35, name: "Insurance & Risk Management", type: "objective", category: "Finance",
    description: "Tests knowledge of insurance principles, risk management, and industry practices.",
    format: "Objective test", duration: 60,
    tips: ["Study types of insurance", "Understand risk assessment", "Learn underwriting basics", "Review claims processes"],
    quizKey: "Insurance",
    rolePlay: false
  },
  {
    id: 36, name: "International Business", type: "objective", category: "Business",
    description: "Tests knowledge of international business concepts, trade, and global economics.",
    format: "Objective test", duration: 60,
    tips: ["Study international trade theories", "Understand exchange rates", "Learn about trade agreements", "Review cultural business practices"],
    quizKey: "Global Business",
    rolePlay: false
  },
  {
    id: 37, name: "Introduction to Business Communication", type: "objective", category: "Communication",
    description: "Tests introductory knowledge of business communication for newer FBLA members.",
    format: "Objective test", duration: 60,
    tips: ["Study basic business writing", "Understand communication process", "Learn professional etiquette", "Practice grammar and punctuation"],
    quizKey: "Introduction to Business Communication",
    rolePlay: false
  },
  {
    id: 38, name: "Introduction to Business Concepts", type: "objective", category: "Business",
    description: "Tests introductory business knowledge for newer FBLA members.",
    format: "Objective test", duration: 60,
    tips: ["Study basic business terms", "Understand economic systems", "Learn business organization types", "Review basic marketing concepts"],
    quizKey: "Introduction to Business",
    rolePlay: false
  },
  {
    id: 39, name: "Introduction to Business Presentation", type: "presentation", category: "Communication",
    description: "Create and deliver a business presentation on an assigned topic.",
    format: "Presentation", duration: 5,
    tips: ["Use clear slide design", "Practice timing your delivery", "Include data and evidence", "Maintain eye contact"],
    quizKey: null,
    rolePlay: false
  },
  {
    id: 40, name: "Introduction to Business Procedures", type: "objective", category: "Business",
    description: "Tests knowledge of basic business procedures and office management.",
    format: "Objective test", duration: 60,
    tips: ["Study office procedures", "Understand filing systems", "Learn business document types", "Review workplace safety"],
    quizKey: "Introduction to Business Procedures",
    rolePlay: false
  },
  {
    id: 41, name: "Introduction to FBLA", type: "objective", category: "FBLA Knowledge",
    description: "Tests knowledge of FBLA history, bylaws, and organizational structure.",
    format: "Objective test", duration: 60,
    tips: ["Study FBLA history and mission", "Know the FBLA creed and pledge", "Understand organizational structure", "Review bylaws and competitive events"],
    quizKey: "Introduction to FBLA",
    rolePlay: false
  },
  {
    id: 42, name: "Introduction to Information Technology", type: "objective", category: "Technology",
    description: "Tests introductory IT knowledge for newer FBLA members.",
    format: "Objective test", duration: 60,
    tips: ["Study computer basics", "Understand internet technologies", "Learn basic programming concepts", "Review digital literacy"],
    quizKey: "Introduction to Information Technology",
    rolePlay: false
  },
  {
    id: 43, name: "Introduction to Marketing Concepts", type: "objective", category: "Marketing",
    description: "Tests introductory marketing knowledge for newer FBLA members.",
    format: "Objective test", duration: 60,
    tips: ["Study the 4 P's of marketing", "Understand market research basics", "Learn consumer behavior", "Review marketing strategies"],
    quizKey: "Marketing",
    rolePlay: false
  },
  {
    id: 44, name: "Introduction to Parliamentary Procedure", type: "objective", category: "FBLA Knowledge",
    description: "Tests knowledge of parliamentary procedure basics.",
    format: "Objective test", duration: 60,
    tips: ["Study Robert's Rules of Order", "Know motion types and precedence", "Understand voting procedures", "Practice parliamentary terminology"],
    quizKey: "Introduction to Parliamentary Procedure",
    rolePlay: false
  },
  {
    id: 45, name: "Introduction to Programming", type: "production", category: "Technology",
    description: "Tests introductory programming skills and computational thinking.",
    format: "Computer-based test", duration: 60,
    tips: ["Study basic programming concepts", "Practice simple algorithms", "Understand variables and data types", "Learn control structures"],
    quizKey: null,
    rolePlay: false
  },
  {
    id: 46, name: "Introduction to Public Speaking", type: "speaking", category: "Communication",
    description: "Deliver a prepared speech on a business-related topic.",
    format: "Prepared speech", duration: 4,
    tips: ["Write a clear speech with intro, body, conclusion", "Practice delivery and timing", "Use appropriate gestures", "Make eye contact with audience"],
    quizKey: null,
    rolePlay: false
  },
  {
    id: 47, name: "Introduction to Retail & Merchandising", type: "objective", category: "Marketing",
    description: "Tests introductory knowledge of retail operations and merchandising.",
    format: "Objective test", duration: 60,
    tips: ["Study retail operations", "Understand visual merchandising", "Learn inventory management", "Review customer service principles"],
    quizKey: null,
    rolePlay: false
  },
  {
    id: 48, name: "Introduction to Social Media Strategy", type: "objective", category: "Marketing",
    description: "Tests knowledge of social media platforms, strategies, and best practices.",
    format: "Objective test", duration: 60,
    tips: ["Study major social media platforms", "Understand content strategy", "Learn analytics basics", "Review social media marketing"],
    quizKey: null,
    rolePlay: false
  },
  {
    id: 49, name: "Introduction to Supply Chain Management", type: "objective", category: "Business",
    description: "Tests introductory knowledge of supply chain concepts and logistics.",
    format: "Objective test", duration: 60,
    tips: ["Study supply chain basics", "Understand logistics and distribution", "Learn inventory management", "Review procurement processes"],
    quizKey: null,
    rolePlay: false
  },
  {
    id: 50, name: "Job Interview", type: "roleplay", category: "Career Development",
    description: "Demonstrate professional interview skills in a simulated job interview.",
    format: "Mock interview", duration: 7,
    tips: ["Research the company beforehand", "Prepare STAR method responses", "Dress professionally", "Prepare thoughtful questions"],
    quizKey: null,
    rolePlay: true,
    rolePlayInfo: {
      prepTime: 0, presentTime: 7,
      scenario: "You are interviewing for a professional position. Demonstrate your qualifications, communication skills, and professionalism.",
      rubricPoints: ["First impression", "Communication skills", "Response quality", "Knowledge of position", "Professionalism"]
    }
  },
  {
    id: 51, name: "Journalism", type: "production", category: "Communication",
    description: "Demonstrate journalism skills through writing and reporting.",
    format: "Written test and production", duration: 60,
    tips: ["Study AP style guidelines", "Practice news writing", "Understand journalism ethics", "Learn headline writing"],
    quizKey: null,
    rolePlay: false
  },
  {
    id: 52, name: "Marketing", type: "presentation", category: "Marketing",
    description: "Demonstrate marketing knowledge through case analysis and presentation.",
    format: "Case study and presentation", duration: 7,
    tips: ["Study marketing mix", "Understand market segmentation", "Learn digital marketing strategies", "Practice analyzing marketing cases"],
    quizKey: "Marketing",
    rolePlay: true,
    rolePlayInfo: {
      prepTime: 10, presentTime: 7,
      scenario: "Analyze a marketing case study and present a comprehensive marketing strategy including market analysis, target audience, and promotional plan.",
      rubricPoints: ["Market analysis", "Strategy development", "Creativity", "Presentation quality", "Q&A responses"]
    }
  },
  {
    id: 53, name: "Mobile Application Development", type: "production", category: "Technology",
    description: "Design and develop a functional mobile application.",
    format: "App project and presentation", duration: 7,
    tips: ["Focus on user experience", "Follow platform design guidelines", "Test on multiple devices", "Document your code"],
    quizKey: null,
    rolePlay: false
  },
  {
    id: 54, name: "Network Design", type: "objective", category: "Technology",
    description: "Tests knowledge of network design, architecture, and protocols.",
    format: "Objective test", duration: 60,
    tips: ["Study network topologies", "Understand TCP/IP model", "Learn subnetting", "Review network security"],
    quizKey: "Network Design",
    rolePlay: false
  },
  {
    id: 55, name: "Networking Infrastructures", type: "objective", category: "Technology",
    description: "Tests knowledge of networking infrastructure, hardware, and troubleshooting.",
    format: "Objective test", duration: 60,
    tips: ["Study network hardware", "Understand routing and switching", "Learn network troubleshooting", "Review wireless networking"],
    quizKey: "Networking Concepts",
    rolePlay: false
  },
  {
    id: 56, name: "Organizational Leadership", type: "presentation", category: "Business",
    description: "Demonstrate leadership skills in an organizational context.",
    format: "Case study and presentation", duration: 7,
    tips: ["Study leadership theories", "Understand team dynamics", "Practice decision-making frameworks", "Show conflict resolution skills"],
    quizKey: null,
    rolePlay: true,
    rolePlayInfo: {
      prepTime: 10, presentTime: 7,
      scenario: "Address an organizational leadership challenge involving team management, strategic planning, or organizational change.",
      rubricPoints: ["Leadership knowledge", "Problem analysis", "Strategy development", "Communication", "Professional presence"]
    }
  },
  {
    id: 57, name: "Parliamentary Procedure Individual", type: "objective", category: "FBLA Knowledge",
    description: "Tests individual knowledge of parliamentary procedure.",
    format: "Objective test", duration: 60,
    tips: ["Study Robert's Rules of Order", "Know all motion types", "Understand debate procedures", "Practice with mock meetings"],
    quizKey: "Parliamentary Procedure",
    rolePlay: false
  },
  {
    id: 58, name: "Parliamentary Procedure Team", type: "team", category: "FBLA Knowledge",
    description: "Demonstrate parliamentary procedure skills as a team in a mock meeting.",
    format: "Team demonstration and test", duration: 0,
    tips: ["Assign clear officer roles", "Practice motions in order", "Use proper parliamentary language", "Coordinate team timing"],
    quizKey: "Parliamentary Procedure",
    rolePlay: false
  },
  {
    id: 59, name: "Personal Finance", type: "objective", category: "Finance",
    description: "Tests knowledge of personal financial management and planning.",
    format: "Objective test", duration: 60,
    tips: ["Study budgeting principles", "Understand credit and debt", "Learn about investing basics", "Review tax preparation"],
    quizKey: null,
    rolePlay: false
  },
  {
    id: 60, name: "Project Management", type: "presentation", category: "Business",
    description: "Demonstrate project management knowledge and skills.",
    format: "Case study and presentation", duration: 7,
    tips: ["Study project management lifecycle", "Understand Gantt charts and WBS", "Learn stakeholder management", "Practice risk assessment"],
    quizKey: null,
    rolePlay: false
  },
  {
    id: 61, name: "Public Administration & Management", type: "objective", category: "Business",
    description: "Tests knowledge of public sector administration and management.",
    format: "Objective test", duration: 60,
    tips: ["Study public administration theories", "Understand government structures", "Learn public policy basics", "Review public finance"],
    quizKey: null,
    rolePlay: false
  },
  {
    id: 62, name: "Public Service Announcement", type: "production", category: "Communication",
    description: "Create a public service announcement on a relevant business or social topic.",
    format: "Video/audio production", duration: 0,
    tips: ["Choose an impactful topic", "Keep the message clear and concise", "Use compelling visuals or audio", "Include a call to action"],
    quizKey: null,
    rolePlay: false
  },
  {
    id: 63, name: "Public Speaking", type: "speaking", category: "Communication",
    description: "Deliver a prepared speech on a business-related topic.",
    format: "Prepared speech", duration: 5,
    tips: ["Structure: intro, 3 main points, conclusion", "Practice voice modulation", "Use stories and examples", "Time your speech precisely"],
    quizKey: null,
    rolePlay: false
  },
  {
    id: 64, name: "Real Estate", type: "objective", category: "Finance",
    description: "Tests knowledge of real estate principles, transactions, and law.",
    format: "Objective test", duration: 60,
    tips: ["Study real estate terminology", "Understand property types", "Learn about mortgages and financing", "Review real estate law"],
    quizKey: null,
    rolePlay: false
  },
  {
    id: 65, name: "Retail Management", type: "objective", category: "Marketing",
    description: "Tests knowledge of retail management principles and operations.",
    format: "Objective test", duration: 60,
    tips: ["Study retail operations management", "Understand inventory control", "Learn visual merchandising", "Review customer relationship management"],
    quizKey: null,
    rolePlay: false
  },
  {
    id: 66, name: "Sales Presentation", type: "roleplay", category: "Marketing",
    description: "Deliver a persuasive sales presentation for a product or service.",
    format: "Role play sales presentation", duration: 7,
    tips: ["Know your product thoroughly", "Understand buyer psychology", "Practice handling objections", "Close with confidence"],
    quizKey: null,
    rolePlay: true,
    rolePlayInfo: {
      prepTime: 10, presentTime: 7,
      scenario: "You are presenting a product or service to a potential buyer. Demonstrate product knowledge, persuasion skills, and professional selling techniques.",
      rubricPoints: ["Product knowledge", "Persuasion techniques", "Objection handling", "Closing skills", "Professional demeanor"]
    }
  },
  {
    id: 67, name: "Securities & Investments", type: "objective", category: "Finance",
    description: "Tests knowledge of securities markets, investment strategies, and financial instruments.",
    format: "Objective test", duration: 60,
    tips: ["Study types of securities", "Understand market analysis", "Learn portfolio management", "Review SEC regulations"],
    quizKey: "Securities",
    rolePlay: false
  },
  {
    id: 68, name: "Social Media Strategies", type: "presentation", category: "Marketing",
    description: "Develop and present social media marketing strategies.",
    format: "Project and presentation", duration: 7,
    tips: ["Study platform-specific strategies", "Understand analytics and KPIs", "Create content calendars", "Learn about paid vs organic reach"],
    quizKey: null,
    rolePlay: false
  },
  {
    id: 69, name: "Sports & Entertainment Management", type: "presentation", category: "Business",
    description: "Demonstrate knowledge of sports and entertainment business management.",
    format: "Case study and presentation", duration: 7,
    tips: ["Study sports marketing", "Understand venue management", "Learn about licensing and sponsorship", "Review entertainment law basics"],
    quizKey: "Sports",
    rolePlay: true,
    rolePlayInfo: {
      prepTime: 10, presentTime: 7,
      scenario: "Analyze a sports/entertainment management case study involving marketing, event management, or business operations.",
      rubricPoints: ["Industry knowledge", "Marketing strategy", "Financial analysis", "Presentation quality", "Q&A responses"]
    }
  },
  {
    id: 70, name: "Supply Chain Management", type: "objective", category: "Business",
    description: "Tests knowledge of supply chain management, logistics, and operations.",
    format: "Objective test", duration: 60,
    tips: ["Study supply chain models", "Understand logistics optimization", "Learn about procurement", "Review inventory management"],
    quizKey: null,
    rolePlay: false
  },
  {
    id: 71, name: "Technology Support & Services", type: "objective", category: "Technology",
    description: "Tests knowledge of IT support, help desk procedures, and technical troubleshooting.",
    format: "Objective test", duration: 60,
    tips: ["Study ITIL fundamentals", "Understand help desk procedures", "Learn troubleshooting methodology", "Review customer support skills"],
    quizKey: null,
    rolePlay: false
  },
  {
    id: 72, name: "Visual Design", type: "production", category: "Design",
    description: "Create visual design solutions demonstrating design principles and creativity.",
    format: "Design project", duration: 0,
    tips: ["Follow design principles (balance, contrast, emphasis)", "Use consistent branding", "Create clear visual hierarchy", "Consider user experience"],
    quizKey: null,
    rolePlay: false
  },
  {
    id: 73, name: "Website Coding & Development", type: "production", category: "Technology",
    description: "Design and develop a functional website demonstrating coding skills.",
    format: "Website project and presentation", duration: 7,
    tips: ["Write clean, semantic HTML", "Use responsive CSS", "Add interactive JavaScript", "Follow accessibility guidelines"],
    quizKey: null,
    rolePlay: false
  },
  {
    id: 74, name: "Website Design", type: "production", category: "Design",
    description: "Design and build a professional website for a given business scenario.",
    format: "Website project and presentation", duration: 7,
    tips: ["Focus on UX/UI design", "Ensure responsive design", "Use consistent branding", "Optimize for performance"],
    quizKey: null,
    rolePlay: false
  }
];

const EVENT_CATEGORIES = ["All", "Finance", "Business", "Technology", "Communication", "Marketing", "Design", "Career Development", "FBLA Knowledge", "Community"];

const EVENT_TYPES = {
  objective: { label: "Objective Test", icon: "📝", color: "#3b82f6" },
  presentation: { label: "Presentation", icon: "🎤", color: "#8b5cf6" },
  production: { label: "Production", icon: "💻", color: "#10b981" },
  roleplay: { label: "Role Play", icon: "🎭", color: "#f59e0b" },
  speaking: { label: "Speaking", icon: "🗣️", color: "#ef4444" },
  team: { label: "Team Event", icon: "👥", color: "#06b6d4" }
};
