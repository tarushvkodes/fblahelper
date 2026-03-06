window.ROLEPLAY_REFERENCE = {
  officialRoleplayEvents: [
    "Business Management",
    "Customer Service",
    "Entrepreneurship",
    "Healthcare Administration",
    "Hospitality & Event Management",
    "Human Resource Management",
    "Insurance & Risk Management",
    "International Business",
    "Marketing",
    "Organizational Leadership",
    "Project Management",
    "Public Administration & Management",
    "Real Estate",
    "Retail Management",
    "Sports & Entertainment Management",
    "Supply Chain Management"
  ],
  pdfLinks: {
    "Business Management": [
      { label: "Sample Roleplay", path: "fblaresources/sample roleplays/Business-Management---Sample-1.docx" }
    ],
    "Customer Service": [
      { label: "Sample Roleplay", path: "fblaresources/sample roleplays/Customer-Service---Sample-1.docx" }
    ],
    "Entrepreneurship": [
      { label: "Sample Roleplay", path: "fblaresources/sample roleplays/Entrepreneurship---Sample-1.docx" },
      { label: "Competencies PDF", path: "FBLA Time/FBLA Time/Entrepreneurship/Entrepreneurship Tasks _ Competencies List.pdf" }
    ],
    "Healthcare Administration": [
      { label: "Study Guide DOCX", path: "FBLA Time/FBLA Time/Healthcare Administration/2016 SLC Healthcare Administration.docx" },
      { label: "Competencies PDF", path: "FBLA Time/FBLA Time/Healthcare Administration/Health Care Administration Tasks _ Competencies List.pdf" }
    ],
    "Hospitality & Event Management": [
      { label: "Sample Roleplay", path: "fblaresources/sample roleplays/Hospitality--Event-Management---Sample-1.docx" }
    ],
    "Human Resource Management": [],
    "Insurance & Risk Management": [
      { label: "Study Guide PDF", path: "FBLA Time/FBLA Time/Insurance _ Risk Management/Insurance _ Risk Management Study Guide 2013-16.pdf" },
      { label: "Competencies PDF", path: "FBLA Time/FBLA Time/Insurance _ Risk Management/Insurance _ Risk Management Tasks _ Competencies List.pdf" }
    ],
    "International Business": [
      { label: "Sample Roleplay", path: "fblaresources/sample roleplays/International-Business---Sample-1.docx" }
    ],
    "Marketing": [
      { label: "Sample Roleplay", path: "fblaresources/sample roleplays/Marketing---Sample-1.docx" }
    ],
    "Organizational Leadership": [
      { label: "Competencies PDF", path: "FBLA Time/FBLA Time/Organizational Leadership/Organizational Leadership Competency _ Task List.pdf" }
    ],
    "Project Management": [],
    "Public Administration & Management": [],
    "Real Estate": [],
    "Retail Management": [],
    "Sports & Entertainment Management": [
      { label: "Sample Roleplay", path: "fblaresources/sample roleplays/Sports-and-Entertainment-Management---Sample-1.docx" }
    ],
    "Supply Chain Management": []
  },
  curatedScenarios: {
    "Business Management": [
      {
        name: "Scaling A Service Firm",
        prompt: "You are advising the owners of a fast-growing service business that is missing delivery targets, burning out supervisors, and making inconsistent staffing decisions. Present a management plan that fixes workload balance, clarifies decision rights, and adds measurable operating controls without damaging service quality.",
        sourceNote: "Grounded in the Business Management roleplay set in fblaresources and the repo's official event-format guide.",
        indicators: [
          "Define the operational bottleneck and why it is hurting service quality.",
          "Recommend a staffing, supervision, and KPI structure that management can execute this quarter.",
          "Explain tradeoffs, implementation timing, and how leaders will monitor results."
        ],
        judgeQuestions: [
          "What would you change first in the reporting structure?",
          "How do you prevent overhiring while still reducing missed deadlines?",
          "What metric tells us in 30 days that your plan is working?"
        ]
      }
    ],
    "Customer Service": [
      {
        name: "Escalated Billing And Delivery Call",
        prompt: "A long-time customer is frustrated after a delayed delivery, a confusing fee, and two unhelpful prior contacts. You are the customer-service lead handling the recovery conversation. Resolve the issue, protect the relationship, and set a clear follow-up plan without promising anything outside policy.",
        sourceNote: "Grounded in customer-service case transcripts in fbla time ALL_TRANSCRIPTS_COMBINED.md and the Customer Service sample roleplays under fblaresources.",
        indicators: [
          "De-escalate the interaction while confirming the exact customer problem.",
          "Offer a policy-sound resolution with timeline, ownership, and follow-up.",
          "Show how you protect trust and prevent a repeat failure."
        ],
        judgeQuestions: [
          "What do you say first to calm the customer down?",
          "What if policy does not allow the exact refund the customer wants?",
          "How will you document and hand off the follow-up?"
        ]
      }
    ],
    "Entrepreneurship": [
      {
        name: "Early-Stage Growth Decision",
        prompt: "A small venture has strong weekend demand but uneven weekday cash flow. The founder wants to expand quickly into a second revenue stream, but operations and marketing are not yet disciplined. Recommend a growth plan that protects cash, validates demand, and defines how the business should test the expansion before committing fully.",
        sourceNote: "Grounded in the Entrepreneurship event documents in fblaresources and FBLA Time competency material.",
        indicators: [
          "Explain the demand, cost, and execution risks of expanding too fast.",
          "Recommend a staged validation plan with budget and checkpoints.",
          "Show how the entrepreneur should market, measure, and adjust the test."
        ],
        judgeQuestions: [
          "Why not launch the full expansion immediately?",
          "What numbers would make you continue, pause, or stop the test?",
          "How do you protect the original business while testing the new idea?"
        ]
      }
    ],
    "Healthcare Administration": [
      {
        name: "Clinic Flow And Compliance Reset",
        prompt: "A multi-provider clinic is losing patient confidence because wait times are rising, prior authorizations are backlogged, and front-desk staff are handling protected information inconsistently. Present an administrative improvement plan that addresses scheduling flow, patient communication, privacy safeguards, and staff accountability.",
        sourceNote: "Grounded in the Healthcare Administration study guide and competencies in FBLA Time plus the official sample questions in fblaresources.",
        indicators: [
          "Diagnose the operational and compliance risks in the clinic workflow.",
          "Recommend process changes for scheduling, authorizations, and privacy handling.",
          "Explain what staff training, auditing, and patient-facing communication should look like."
        ],
        judgeQuestions: [
          "What problem do you fix first and why?",
          "How will your plan reduce both wait times and privacy risk?",
          "What evidence would show the new process is actually working?"
        ]
      }
    ],
    "Hospitality & Event Management": [
      {
        name: "Marco's Revenue Recovery",
        prompt: "You are the restaurant management team for Marco's, a hotel restaurant facing lower lunch and dinner traffic after price increases, weak survey results, and stronger nearby competition. Present a recovery plan that improves reputation, targets conference and tourism demand, and raises sales without ignoring guest complaints.",
        sourceNote: "Grounded in the Marco's hotel restaurant case in fbla time ALL_TRANSCRIPTS_COMBINED.md and the Hospitality sample roleplays in fblaresources.",
        indicators: [
          "Explain the sales decline using competition, pricing, service, and image factors.",
          "Recommend marketing and service changes for weekday conference traffic and weekend tourism.",
          "Show how management will measure profitability, guest satisfaction, and repeat business."
        ],
        judgeQuestions: [
          "Which guest complaint should we tackle first?",
          "How do you market differently to conference guests versus weekend visitors?",
          "What menu or service changes improve value without destroying margin?"
        ]
      }
    ],
    "Human Resource Management": [
      {
        name: "Turnover And Training Intervention",
        prompt: "A regional employer is losing new hires within the first 90 days, supervisor coaching is inconsistent, and employee complaints suggest unclear expectations and uneven discipline. Present an HR action plan that improves hiring fit, onboarding, manager accountability, and retention while reducing legal risk.",
        sourceNote: "Grounded in Human Resource Management competency sections extracted in fbla time ALL_TRANSCRIPTS_COMBINED.md and the official event PDF in fblaresources.",
        indicators: [
          "Identify the HR process failures causing turnover and morale problems.",
          "Recommend changes to recruiting, onboarding, coaching, and performance feedback.",
          "Explain how HR will monitor compliance, fairness, and retention outcomes."
        ],
        judgeQuestions: [
          "How do you know this is an onboarding problem and not only a pay problem?",
          "What should supervisors be required to do in the first 30 days of employment?",
          "How will you reduce inconsistent discipline across teams?"
        ]
      }
    ],
    "Insurance & Risk Management": [
      {
        name: "Loss-Control And Renewal Strategy",
        prompt: "A mid-size company has rising claims, weak safety documentation, and a looming policy renewal with likely premium increases. You are presenting a risk-management plan that reduces claim frequency, improves loss control, and helps leadership decide what risks to retain, transfer, or reduce.",
        sourceNote: "Grounded in the Insurance & Risk Management study guide and competencies in FBLA Time plus the official event PDF in fblaresources.",
        indicators: [
          "Classify the company's major loss exposures and explain the biggest risk drivers.",
          "Recommend practical loss-control, training, and insurance actions before renewal.",
          "Explain how leadership should measure claim frequency, severity, and financial impact."
        ],
        judgeQuestions: [
          "Which risk should we try to reduce operationally instead of only insuring?",
          "How do you justify your recommendation to spend money on prevention now?",
          "What should leadership review monthly after your plan is launched?"
        ]
      }
    ],
    "International Business": [
      {
        name: "Cross-Border Client Intake",
        prompt: "You are a client-service specialist for an international marketing services company working with offices in England, Italy, Spain, and China. Present the script and process you will use to establish credibility, collect required information, respect cultural and time-zone constraints, and protect client data during the first round of calls.",
        sourceNote: "Grounded in the international client-service case in fbla time ALL_TRANSCRIPTS_COMBINED.md and the International Business sample roleplays in fblaresources.",
        indicators: [
          "Structure the first-contact conversation clearly and professionally.",
          "Explain how you will handle culture, time zones, and incomplete preparation from remote offices.",
          "Show how information will be requested, secured, and tracked across offices."
        ],
        judgeQuestions: [
          "How do you establish credibility on the first call?",
          "What do you do if one office has not prepared the requested marketing plan?",
          "How will you protect the data you collect from each country office?"
        ]
      }
    ],
    "Marketing": [
      {
        name: "Loyal Customer Recovery Plan",
        prompt: "You are the management team for a national office-supply store that nearly lost a major corporate client after poor in-store service, understaffing, and weak recognition of a loyal account. Present the recovery strategy you will use to regain the client's trust, improve customer service, and prevent the failure from repeating.",
        sourceNote: "Grounded in the Bank of the Plains marketing case in fbla time ALL_TRANSCRIPTS_COMBINED.md and the Marketing sample roleplays in fblaresources.",
        indicators: [
          "Diagnose the customer-experience breakdown and its root causes.",
          "Recommend a marketing and service-recovery plan for the major account.",
          "Explain the employee training, scheduling, and loyalty tactics needed to keep the client."
        ],
        judgeQuestions: [
          "What incentive should we offer without making the recovery feel like a bribe?",
          "How will you make loyal customers visible at checkout?",
          "What staffing change matters most before the next major promotion?"
        ]
      }
    ],
    "Organizational Leadership": [
      {
        name: "Change Leadership Under Pressure",
        prompt: "A department is resisting a major workflow change because employees do not trust the rollout, managers are sending mixed messages, and conflict is increasing across teams. Present a leadership strategy that addresses communication, motivation, coaching, and decision-making so the organization can move through change without breaking trust.",
        sourceNote: "Grounded in the Organizational Leadership competency task list in FBLA Time and the official event PDF in fblaresources.",
        indicators: [
          "Apply leadership concepts to diagnose resistance, ambiguity, and conflict.",
          "Recommend communication, coaching, and decision practices leaders should use immediately.",
          "Explain how ethical leadership and feedback will rebuild trust during the transition."
        ],
        judgeQuestions: [
          "What kind of leader behavior is making the resistance worse?",
          "How would you handle a high performer who openly resists the change?",
          "What tells you the team is moving from compliance to real buy-in?"
        ]
      }
    ],
    "Project Management": [
      {
        name: "Delayed Rollout Recovery",
        prompt: "A client-facing implementation project is behind schedule, vendor deliverables are slipping, and internal stakeholders keep adding scope. Present a recovery plan that resets scope, communication, risk controls, and milestone ownership while preserving the client relationship.",
        sourceNote: "Grounded in the Project Management event PDF in fblaresources and the repo's official event-format guide.",
        indicators: [
          "Diagnose schedule risk, scope creep, and stakeholder-management failures.",
          "Recommend a realistic recovery plan with milestones, owners, and escalation rules.",
          "Explain how you will communicate tradeoffs to the client and internal sponsors."
        ],
        judgeQuestions: [
          "What scope should be frozen immediately?",
          "How do you explain the reset without losing client confidence?",
          "What risk review cadence would you use from this point forward?"
        ]
      }
    ],
    "Public Administration & Management": [
      {
        name: "Service Backlog In A Public Office",
        prompt: "A city department is facing permit backlogs, citizen complaints, inconsistent counter service, and pressure from elected officials to improve responsiveness without a major budget increase. Present a public-administration plan that improves workflow, transparency, service metrics, and staff accountability.",
        sourceNote: "Grounded in the Public Administration & Management event PDF in fblaresources and the official event-format guide.",
        indicators: [
          "Identify the service, policy, and communication failures driving the backlog.",
          "Recommend process, staffing, and citizen-communication improvements that are realistic in a public setting.",
          "Explain what metrics leadership should publish and review."
        ],
        judgeQuestions: [
          "How do you improve service without promising faster approval than policy allows?",
          "What should residents see first if we want to rebuild trust quickly?",
          "How will you balance fairness, transparency, and speed?"
        ]
      }
    ],
    "Real Estate": [
      {
        name: "USA Realty Capacity Plan",
        prompt: "You are advising USA Realty, a high-service agency serving diplomatic and State Department clients, as demand outgrows the current owner-only staffing model. Present an expansion plan that decides how many agents to retain full-time, how to preserve service quality for international clients, and how to phase the rollout responsibly.",
        sourceNote: "Grounded in the USA Realty real-estate case in fbla time ALL_TRANSCRIPTS_COMBINED.md and the Real Estate event PDF in fblaresources.",
        indicators: [
          "Explain the staffing and service challenge created by rising demand.",
          "Recommend hiring, training, and utilization rules for full-time agents.",
          "Show how the agency should protect brand reputation, client relationships, and decision quality."
        ],
        judgeQuestions: [
          "How many agents would you add first and why?",
          "What makes this clientele different from a standard residential pipeline?",
          "What downside should the owners watch most closely during expansion?"
        ]
      }
    ],
    "Retail Management": [
      {
        name: "Store Experience And Loyalty Rebuild",
        prompt: "A retail location has long checkout lines, inconsistent associate behavior, weak complaint handling, and no reliable loyalty follow-through. Present a management plan that improves floor execution, service standards, returns handling, and repeat-customer retention without overcomplicating operations.",
        sourceNote: "Grounded in the Retail Management event PDF in fblaresources and the repo's retail study materials.",
        indicators: [
          "Diagnose why the store experience is inconsistent across shifts.",
          "Recommend specific service, staffing, and policy changes for the sales floor and checkout.",
          "Explain how loyalty, follow-up, and performance measurement should be handled."
        ],
        judgeQuestions: [
          "What process change would customers notice immediately?",
          "How should managers coach associates who are creating inconsistent service?",
          "What would your loyalty program reward and why?"
        ]
      }
    ],
    "Sports & Entertainment Management": [
      {
        name: "Midweek Attendance Recovery",
        prompt: "A venue has strong marquee events but weak midweek attendance, sponsor pressure for better activation, and uneven concession revenue. Present a sports-and-entertainment strategy that improves attendance, partner value, and guest experience while protecting the brand.",
        sourceNote: "Grounded in the Sports & Entertainment Management sample roleplays in fblaresources and the official event PDF.",
        indicators: [
          "Explain the attendance and revenue problem using target-market logic.",
          "Recommend promotion, sponsorship, and guest-experience strategies that fit the venue.",
          "Show how success will be measured beyond ticket sales alone."
        ],
        judgeQuestions: [
          "How do you avoid discounting away the brand?",
          "What should we promise sponsors that is actually measurable?",
          "How would you get more repeat attendance on low-demand nights?"
        ]
      }
    ],
    "Supply Chain Management": [
      {
        name: "Supplier Delay And Fulfillment Pressure",
        prompt: "A distributor is experiencing late inbound shipments, warehouse congestion, and declining on-time delivery to priority customers. Present a supply-chain response that addresses sourcing, safety stock, scheduling, and customer communication while limiting cost escalation.",
        sourceNote: "Grounded in the supply-chain competency material referenced in fbla time ALL_TRANSCRIPTS_COMBINED.md and the available supply-chain support PDF in fblaresources.",
        indicators: [
          "Explain the supply, inventory, and fulfillment risks driving service failure.",
          "Recommend sourcing, scheduling, and buffer strategies with clear tradeoffs.",
          "Show how leadership should prioritize customers and communicate service changes."
        ],
        judgeQuestions: [
          "Where would you add buffer first: inventory, lead time, or transportation?",
          "How do you protect key accounts without ignoring smaller customers?",
          "What metric would tell us the warehouse is actually recovering?"
        ]
      }
    ]
  }
};