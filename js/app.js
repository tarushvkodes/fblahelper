/* FBLA Helper — Main Application */

// ============ UTILITIES ============
// Fisher-Yates shuffle for uniform randomization
function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Reusable AudioContext for timer alerts
let _audioCtx = null;
function getAudioContext() {
  if (!_audioCtx) {
    _audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return _audioCtx;
}

// ============ APP STATE ============
const App = {
  currentView: 'home',
  currentEvent: null,
  currentTool: null,
  searchQuery: '',
  categoryFilter: 'All',
  quizState: null,
  flashcardState: null,
  timerState: null,
};

// ============ STUDY GUIDES PER EVENT ============
const STUDY_GUIDES = {};
EVENTS.forEach(ev => {
  const guides = [];
  if (ev.type === 'objective') {
    guides.push(
      { title: 'Key Concepts', items: getKeyConceptsForEvent(ev) },
      { title: 'Study Strategies', items: getStudyStrategiesForEvent(ev) },
      { title: 'Common Mistakes to Avoid', items: getCommonMistakesForEvent(ev) },
      { title: 'Test-Taking Tips', items: getTestTipsForEvent(ev) },
    );
  } else if (ev.type === 'presentation' || ev.type === 'roleplay' || ev.type === 'speaking') {
    guides.push(
      { title: 'Preparation Guide', items: getPrepGuideForEvent(ev) },
      { title: 'Presentation Tips', items: getPresentationTipsForEvent(ev) },
      { title: 'Common Mistakes to Avoid', items: getCommonMistakesForEvent(ev) },
      { title: 'Scoring Criteria Focus', items: getScoringFocusForEvent(ev) },
    );
  } else {
    guides.push(
      { title: 'Project Guidelines', items: getProjectGuideForEvent(ev) },
      { title: 'Quality Standards', items: getQualityStandardsForEvent(ev) },
      { title: 'Common Mistakes to Avoid', items: getCommonMistakesForEvent(ev) },
      { title: 'Judging Criteria', items: getJudgingCriteriaForEvent(ev) },
    );
  }
  STUDY_GUIDES[ev.id] = guides;
});

// ============ ROLE PLAY SCENARIOS ============
const ROLE_PLAY_SCENARIOS = {
  'customer-service': [
    { title: 'Handling a Product Return', scenario: 'A customer purchased a laptop two weeks ago and wants to return it because it does not meet their needs. The customer is frustrated because they were told the return policy was 30 days, but the store policy states 14 days for electronics. Handle this situation professionally.', tips: ['Empathize with the customer\'s frustration', 'Clearly explain the store policy', 'Offer alternative solutions (exchange, store credit)', 'Remain calm and professional', 'Thank the customer for their patience'] },
    { title: 'Dealing with a Billing Error', scenario: 'A long-time customer calls to report that they were charged twice for a subscription service. They are upset and threatening to cancel their account. You need to resolve the billing issue and retain the customer.', tips: ['Apologize sincerely for the inconvenience', 'Verify the billing discrepancy quickly', 'Explain the resolution process clearly', 'Offer compensation for the error', 'Confirm the customer is satisfied before ending'] },
    { title: 'Upselling a Premium Service', scenario: 'A customer is purchasing a basic phone plan. You notice they use a lot of data and could benefit from a premium plan. Present the premium option without being pushy.', tips: ['Listen to the customer\'s current needs', 'Highlight specific benefits relevant to them', 'Compare costs vs. overage fees', 'Let the customer decide without pressure', 'Respect their choice either way'] },
  ],
  'business-ethics': [
    { title: 'Whistleblower Dilemma', scenario: 'You discover that your company\'s best-selling product has a safety flaw that management has chosen to ignore because a recall would be extremely expensive. As an employee, what do you do?', tips: ['Consider all stakeholders affected', 'Reference relevant laws and regulations', 'Discuss internal reporting channels first', 'Weigh personal risk vs. public safety', 'Present a clear ethical framework for your decision'] },
    { title: 'Conflict of Interest', scenario: 'Your company is selecting a vendor for a major contract. Your cousin owns one of the bidding companies and has asked you to put in a good word. How do you handle this situation?', tips: ['Disclose the relationship immediately', 'Recuse yourself from the decision if appropriate', 'Follow company conflict of interest policies', 'Maintain fairness in the evaluation process', 'Document your disclosure'] },
  ],
  'business-plan': [
    { title: 'Tech Startup Pitch', scenario: 'You are presenting a business plan for a mobile app that connects local farmers directly with consumers. Present your market analysis, revenue model, and growth strategy to potential investors.', tips: ['Start with a compelling problem statement', 'Show market size with data', 'Explain your unique value proposition', 'Present realistic financial projections', 'Address potential risks and mitigation strategies'] },
  ],
  'entrepreneurship': [
    { title: 'Investor Pitch', scenario: 'You have developed a sustainable packaging solution for e-commerce businesses. You have 7 minutes to convince a panel of investors to fund your startup with $500,000 in seed funding.', tips: ['Lead with the environmental problem you\'re solving', 'Demonstrate product-market fit with data', 'Show your competitive advantage', 'Present a clear use of funds', 'Include customer testimonials or pilot results'] },
  ],
  'event-planning': [
    { title: 'Corporate Conference', scenario: 'Your company is hosting a regional business conference for 200 attendees. Present your event plan including venue, schedule, budget, marketing strategy, and contingency plans.', tips: ['Detail the event timeline thoroughly', 'Present a realistic budget breakdown', 'Address logistics (catering, A/V, parking)', 'Include marketing and promotion strategies', 'Have backup plans for common issues'] },
  ],
  'human-resource-management': [
    { title: 'Employee Conflict Resolution', scenario: 'Two team members have an ongoing conflict that is affecting team productivity. As the HR manager, conduct a mediation meeting to resolve the issue.', tips: ['Listen to both sides equally', 'Identify the root cause of the conflict', 'Focus on behaviors, not personalities', 'Develop an action plan together', 'Schedule follow-up meetings'] },
  ],
  'impromptu-speaking': [
    { title: 'Business Leadership Topic', scenario: 'You have 60 seconds to prepare a 4-minute speech. Topic: "Why emotional intelligence is the most important leadership skill in modern business."', tips: ['Use the PREP method: Point, Reason, Example, Point', 'Start with a strong opening statement', 'Include a real-world example or story', 'Connect back to business context', 'End with a memorable conclusion'] },
    { title: 'Technology Impact', scenario: 'You have 60 seconds to prepare a 4-minute speech. Topic: "How artificial intelligence will transform small businesses in the next decade."', tips: ['Structure around 2-3 key points', 'Use specific examples of AI applications', 'Address both opportunities and challenges', 'Consider the audience perspective', 'Speak with confidence and eye contact'] },
  ],
  'job-interview': [
    { title: 'Marketing Position Interview', scenario: 'You are interviewing for a Marketing Coordinator position at a mid-size tech company. The interviewer will ask about your experience, skills, and how you would handle specific marketing challenges.', tips: ['Research the company beforehand', 'Use the STAR method for behavioral questions', 'Have specific examples ready', 'Ask thoughtful questions about the role', 'Follow up with a thank-you note'] },
  ],
  'intro-business-presentation': [
    { title: 'School Store Proposal', scenario: 'Present a proposal to your school administration for creating a student-run school store. Include product selection, staffing plan, financial projections, and how it aligns with business education.', tips: ['Know your audience (administrators)', 'Use data to support your proposal', 'Address potential concerns proactively', 'Show educational benefits clearly', 'Be confident and professional'] },
  ],
  'intro-public-speaking': [
    { title: 'FBLA Chapter Promotion', scenario: 'Prepare and deliver a 4-minute speech about the benefits of joining FBLA. Your audience is a group of freshmen who are considering extracurricular activities.', tips: ['Make it relatable to freshmen', 'Share personal experiences', 'Highlight specific benefits and opportunities', 'Use engaging storytelling techniques', 'End with a clear call to action'] },
  ],
  'organizational-leadership': [
    { title: 'Chapter Growth Strategy', scenario: 'As the FBLA chapter president, present your plan to increase membership by 50% and improve competitive performance. Address recruitment, training, fundraising, and community engagement.', tips: ['Start with current chapter assessment', 'Set specific, measurable goals', 'Detail action steps with timelines', 'Address resource requirements', 'Include success metrics'] },
  ],
  'parliamentary-procedure-team': [
    { title: 'Chapter Meeting Simulation', scenario: 'Conduct a mock FBLA chapter meeting using proper parliamentary procedure. The agenda includes approving minutes, committee reports, old business (fundraiser results), new business (state competition registration), and announcements.', tips: ['Follow proper order of business', 'Use correct motions and seconds', 'Handle amendments properly', 'Maintain order as chair', 'Record minutes accurately'] },
  ],
  'public-speaking': [
    { title: 'Business Ethics in the Digital Age', scenario: 'Prepare and deliver a 5-minute speech on "The Ethical Responsibilities of Businesses in the Age of Social Media." Address data privacy, misinformation, and corporate accountability.', tips: ['Open with a compelling hook', 'Use current real-world examples', 'Present multiple perspectives', 'Structure with clear transitions', 'Conclude with a call to action'] },
  ],
  'sales-presentation': [
    { title: 'SaaS Product Demo', scenario: 'You are selling a project management SaaS tool to a mid-size construction company. The company currently uses spreadsheets and email to manage projects. Demonstrate the value of your product in a 7-minute presentation.', tips: ['Identify the customer\'s pain points first', 'Demo features that solve specific problems', 'Use ROI calculations to show value', 'Handle objections professionally', 'Close with a clear next step'] },
  ],
};

// ============ RUBRIC DATA ============
const RUBRICS = {
  'objective': {
    title: 'Objective Test Rubric',
    sections: [
      { criteria: 'Multiple Choice Questions', points: '100', desc: 'Demonstrate knowledge of subject matter through correct answers' },
    ],
    tips: ['Study the official FBLA competency list', 'Review past competition tests', 'Focus on vocabulary and definitions', 'Practice with timed conditions', 'Review wrong answers to understand concepts'],
  },
  'presentation': {
    title: 'Presentation Event Rubric',
    sections: [
      { criteria: 'Content', points: '30', desc: 'Relevance, accuracy, and depth of information presented' },
      { criteria: 'Organization', points: '20', desc: 'Logical flow, clear structure, effective transitions' },
      { criteria: 'Delivery', points: '25', desc: 'Poise, voice quality, eye contact, enthusiasm' },
      { criteria: 'Visual Aids', points: '15', desc: 'Quality and effectiveness of supporting materials' },
      { criteria: 'Response to Questions', points: '10', desc: 'Ability to answer judge\'s questions accurately' },
    ],
    tips: ['Practice your presentation multiple times', 'Time yourself to stay within limits', 'Prepare for potential judge questions', 'Use professional visual aids', 'Dress in appropriate business attire'],
  },
  'roleplay': {
    title: 'Role Play Event Rubric',
    sections: [
      { criteria: 'Problem Solving', points: '25', desc: 'Ability to analyze and solve the presented problem' },
      { criteria: 'Communication', points: '25', desc: 'Clear, professional verbal and nonverbal communication' },
      { criteria: 'Professionalism', points: '20', desc: 'Business etiquette, poise, and professional demeanor' },
      { criteria: 'Critical Thinking', points: '20', desc: 'Creative solutions and analytical reasoning' },
      { criteria: 'Time Management', points: '10', desc: 'Effective use of allotted preparation and presentation time' },
    ],
    tips: ['Read the case study carefully during prep time', 'Structure your response with a clear introduction', 'Address all aspects of the scenario', 'Maintain professional composure throughout', 'Practice with various scenario types'],
  },
  'production': {
    title: 'Production Event Rubric',
    sections: [
      { criteria: 'Technical Quality', points: '30', desc: 'Proficiency in required software/tools and technical execution' },
      { criteria: 'Design/Creativity', points: '25', desc: 'Originality, aesthetic appeal, and creative problem solving' },
      { criteria: 'Content/Functionality', points: '25', desc: 'Completeness, accuracy, and effectiveness of the product' },
      { criteria: 'Documentation', points: '10', desc: 'Proper documentation of process and technical specifications' },
      { criteria: 'Presentation', points: '10', desc: 'Ability to explain and demonstrate the finished product' },
    ],
    tips: ['Start early and plan your project thoroughly', 'Follow all event guidelines and specifications', 'Test your product extensively before submission', 'Prepare documentation that showcases your process', 'Practice your presentation/demonstration'],
  },
  'speaking': {
    title: 'Speaking Event Rubric',
    sections: [
      { criteria: 'Content', points: '30', desc: 'Topic relevance, depth of knowledge, supporting evidence' },
      { criteria: 'Organization', points: '20', desc: 'Clear introduction, body, and conclusion with transitions' },
      { criteria: 'Vocal Delivery', points: '20', desc: 'Volume, pace, tone, articulation, and fluency' },
      { criteria: 'Physical Presence', points: '15', desc: 'Posture, gestures, eye contact, and movement' },
      { criteria: 'Overall Effectiveness', points: '15', desc: 'Impact on audience, persuasiveness, memorability' },
    ],
    tips: ['Know your topic thoroughly', 'Practice in front of others for feedback', 'Record yourself and review', 'Focus on natural gestures and movement', 'Prepare a strong opening and closing'],
  },
  'performance': {
    title: 'Performance Event Rubric',
    sections: [
      { criteria: 'Knowledge of Procedures', points: '30', desc: 'Understanding and correct application of procedures' },
      { criteria: 'Team Coordination', points: '25', desc: 'Effective teamwork and role execution' },
      { criteria: 'Participation', points: '20', desc: 'Active and appropriate participation by all members' },
      { criteria: 'Professionalism', points: '15', desc: 'Business-appropriate conduct and demeanor' },
      { criteria: 'Completeness', points: '10', desc: 'Coverage of all required elements' },
    ],
    tips: ['Assign roles clearly within your team', 'Practice as a team regularly', 'Know the procedures inside and out', 'Support each other during the performance', 'Debrief after practice sessions'],
  },
};

// ============ CONTENT GENERATORS ============
function getKeyConceptsForEvent(ev) {
  const conceptMap = {
    'Finance': ['Financial statements analysis', 'Time value of money', 'Risk and return concepts', 'Financial ratios and metrics', 'Regulatory frameworks', 'Market fundamentals'],
    'Business': ['Management principles', 'Organizational structures', 'Strategic planning', 'SWOT analysis', 'Business operations', 'Decision-making frameworks'],
    'Technology': ['System architecture', 'Programming fundamentals', 'Network protocols', 'Security principles', 'Data management', 'Emerging technologies'],
    'Marketing': ['Marketing mix (4Ps)', 'Consumer behavior', 'Market segmentation', 'Digital marketing strategies', 'Brand management', 'Marketing research methods'],
    'Communication': ['Business writing principles', 'Professional communication', 'Presentation skills', 'Active listening', 'Media literacy', 'Digital communication'],
    'Design': ['Design principles (CRAP)', 'Color theory', 'Typography', 'Layout and composition', 'User experience (UX)', 'Visual hierarchy'],
    'Leadership': ['Leadership styles', 'Team building', 'Conflict resolution', 'Goal setting', 'Parliamentary procedure', 'Ethical leadership'],
    'Career Development': ['Resume building', 'Interview skills', 'Professional networking', 'Career planning', 'Workplace etiquette', 'Personal branding'],
    'Entrepreneurship': ['Business model canvas', 'Market validation', 'Financial projections', 'Competitive analysis', 'Startup funding', 'Value proposition'],
  };
  return conceptMap[ev.category] || conceptMap['Business'];
}

function getStudyStrategiesForEvent(ev) {
  return [
    `Review FBLA official competencies for ${ev.name}`,
    'Create flashcards for key terminology and definitions',
    'Take practice tests under timed conditions',
    'Study with a partner to quiz each other',
    'Focus on weak areas identified in practice tests',
    'Review current events related to the subject area',
  ];
}

function getCommonMistakesForEvent(ev) {
  const mistakes = {
    'objective': ['Not reading questions carefully', 'Second-guessing correct answers', 'Poor time management on tests', 'Neglecting to study official FBLA materials', 'Focusing too narrow — study broadly'],
    'presentation': ['Exceeding time limits', 'Reading directly from notes or slides', 'Not preparing for judge questions', 'Lacking specific examples or data', 'Unprofessional appearance or behavior'],
    'roleplay': ['Not addressing all parts of the scenario', 'Being too informal in the role play', 'Forgetting to summarize key points', 'Not managing preparation time effectively', 'Failing to maintain character consistency'],
    'production': ['Missing submission deadlines', 'Ignoring event guidelines', 'Insufficient testing/review', 'Poor documentation', 'Overcomplicating the design'],
    'speaking': ['Exceeding time limits', 'Lack of eye contact', 'Monotone delivery', 'Weak opening or closing', 'Insufficient practice'],
    'performance': ['Inadequate team rehearsal', 'Unclear role assignments', 'Breaking character during performance', 'Not following proper procedures', 'Lack of coordination between members'],
  };
  return mistakes[ev.type] || mistakes['objective'];
}

function getTestTipsForEvent(ev) {
  return [
    'Arrive early and get settled before the test begins',
    'Read each question completely before selecting an answer',
    'Eliminate obviously wrong answers first',
    'Manage your time — don\'t spend too long on one question',
    'Review flagged questions if time permits',
    'Trust your preparation and first instincts',
  ];
}

function getPrepGuideForEvent(ev) {
  return [
    `Research current trends in ${ev.category.toLowerCase()}`,
    'Prepare a structured outline for your presentation',
    'Practice with a timer to ensure you stay within limits',
    'Prepare professional visual aids or supporting materials',
    'Anticipate and prepare for judge questions',
    'Review FBLA event guidelines and rating sheets',
  ];
}

function getPresentationTipsForEvent(ev) {
  return [
    'Start with a compelling hook to engage judges',
    'Maintain eye contact throughout your presentation',
    'Use gestures naturally to emphasize key points',
    'Speak clearly and at a moderate pace',
    'Use transitions between sections',
    'End with a strong, memorable conclusion',
  ];
}

function getScoringFocusForEvent(ev) {
  return [
    'Content accuracy and relevance (highest weight)',
    'Professional delivery and communication skills',
    'Organization and logical flow',
    'Ability to answer judge questions effectively',
    'Overall presentation quality and impact',
    'Adherence to time limits and event guidelines',
  ];
}

function getProjectGuideForEvent(ev) {
  return [
    'Read event guidelines thoroughly before starting',
    'Plan your project timeline with milestones',
    'Document your process from start to finish',
    'Seek feedback during development',
    `Study award-winning ${ev.name} projects for inspiration`,
    'Allow time for testing and revision',
  ];
}

function getQualityStandardsForEvent(ev) {
  return [
    'Professional-grade output quality',
    'Attention to detail in every element',
    'Originality and creative problem solving',
    'Adherence to industry standards and best practices',
    'Clean, organized documentation',
    'Functionality testing and quality assurance',
  ];
}

function getJudgingCriteriaForEvent(ev) {
  return [
    'Technical skill and proficiency',
    'Creative and original approach',
    'Completeness and attention to detail',
    'Professional documentation',
    'Effective presentation and explanation',
    'Overall quality and impact',
  ];
}

// ============ NAVIGATION ============
function navigate(view, data) {
  // Hide all views
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  // Show target view
  const target = document.getElementById(`view-${view}`);
  if (target) {
    target.classList.add('active');
  }
  // Update nav
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  const navLink = document.querySelector(`.nav-link[data-view="${view}"]`);
  if (navLink) navLink.classList.add('active');

  App.currentView = view;
  App.currentTool = null;
  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (view === 'events') renderEvents();
  if (view === 'event-detail' && data) openEventDetail(data);
  if (view === 'timer') renderTimer();
}

function openEventDetail(eventId) {
  const event = EVENTS.find(e => e.id === eventId);
  if (!event) return;
  App.currentEvent = event;
  renderEventDetail(event);
  document.getElementById('view-event-detail').classList.add('active');
  document.querySelectorAll('.view').forEach(v => {
    if (v.id !== 'view-event-detail') v.classList.remove('active');
  });
  App.currentView = 'event-detail';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function openTool(tool) {
  App.currentTool = tool;
  const event = App.currentEvent;
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.getElementById('view-tool').classList.add('active');
  App.currentView = 'tool';

  if (tool === 'quiz') renderQuiz(event);
  else if (tool === 'flashcards') renderFlashcards(event);
  else if (tool === 'study') renderStudyGuide(event);
  else if (tool === 'roleplay') renderRolePlay(event);
  else if (tool === 'rubric') renderRubric(event);
  else if (tool === 'prep') renderPrepChecklist(event);
  else if (tool === 'notes') renderNotes(event);
  else if (tool === 'timer') renderToolTimer(event);

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============ RENDER: HOME ============
function renderHome() {
  // Home view is static HTML, but update stats
  const quizCount = Object.values(QUIZ_DATA).reduce((a, b) => a + b.length, 0);
  const el = document.getElementById('home-quiz-count');
  if (el) el.textContent = quizCount;
  const evEl = document.getElementById('home-event-count');
  if (evEl) evEl.textContent = EVENTS.length;
}

// ============ RENDER: EVENTS ============
function renderEvents() {
  const container = document.getElementById('events-list');
  const filtered = App.categoryFilter === 'All'
    ? EVENTS
    : EVENTS.filter(e => e.category === App.categoryFilter);

  const query = App.searchQuery.toLowerCase();
  const results = query
    ? filtered.filter(e =>
        e.name.toLowerCase().includes(query) ||
        e.desc.toLowerCase().includes(query) ||
        e.category.toLowerCase().includes(query))
    : filtered;

  if (results.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">\u{1F50D}</div>
        <h3>No events found</h3>
        <p class="text-secondary">Try adjusting your search or filter criteria.</p>
      </div>`;
    return;
  }

  container.innerHTML = results.map(ev => {
    const typeInfo = EVENT_TYPES[ev.type] || {};
    const hasQuiz = ev.quizKey && QUIZ_DATA[ev.quizKey];
    return `
      <div class="event-card glass" onclick="openEventDetail('${ev.id}')">
        <div class="event-card-header">
          <span class="event-type-badge" style="background: ${typeInfo.color}15; color: ${typeInfo.color}">
            ${typeInfo.icon || ''} ${typeInfo.label || ev.type}
          </span>
          <span class="text-sm text-secondary">${ev.category}</span>
        </div>
        <h4>${ev.name}</h4>
        <p>${ev.desc}</p>
        <div class="event-card-actions">
          ${hasQuiz ? '<span class="event-tag has-quiz">\u{1F4DD} Quiz Available</span>' : ''}
          ${ev.hasRolePlay ? '<span class="event-tag has-roleplay">\u{1F3AD} Role Play</span>' : ''}
          <span class="event-tag">\u{1F4D6} Study Guide</span>
        </div>
      </div>`;
  }).join('');
}

// ============ RENDER: EVENT DETAIL ============
function renderEventDetail(ev) {
  const container = document.getElementById('event-detail-content');
  const typeInfo = EVENT_TYPES[ev.type] || {};
  const hasQuiz = ev.quizKey && QUIZ_DATA[ev.quizKey];
  const hasRP = ev.hasRolePlay || ROLE_PLAY_SCENARIOS[ev.id];

  container.innerHTML = `
    <button class="back-btn" onclick="navigate('events')">\u2190 All Events</button>
    <div class="event-detail">
      <div class="event-detail-header glass-static">
        <span class="event-type-badge" style="background: ${typeInfo.color}15; color: ${typeInfo.color}; margin-bottom: 12px; display: inline-flex;">
          ${typeInfo.icon || ''} ${typeInfo.label || ev.type} \u2022 ${ev.category}
        </span>
        <h2>${ev.name}</h2>
        <p>${ev.desc}</p>
      </div>
      <div class="event-detail-tools stagger">
        <div class="tool-card glass" onclick="openTool('study')">
          <div class="tool-icon" style="background: rgba(0, 122, 255, 0.1); color: var(--blue);">\u{1F4D6}</div>
          <h4>Study Guide</h4>
          <p>Key concepts and study strategies</p>
        </div>
        ${hasQuiz ? `
        <div class="tool-card glass" onclick="openTool('quiz')">
          <div class="tool-icon" style="background: rgba(52, 199, 89, 0.1); color: var(--green);">\u{1F4DD}</div>
          <h4>Practice Quiz</h4>
          <p>${QUIZ_DATA[ev.quizKey].length} questions from past competitions</p>
        </div>` : ''}
        ${hasQuiz ? `
        <div class="tool-card glass" onclick="openTool('flashcards')">
          <div class="tool-icon" style="background: rgba(255, 149, 0, 0.1); color: var(--orange);">\u{1F5C2}</div>
          <h4>Flashcards</h4>
          <p>Review key questions and answers</p>
        </div>` : ''}
        ${hasRP ? `
        <div class="tool-card glass" onclick="openTool('roleplay')">
          <div class="tool-icon" style="background: rgba(255, 59, 48, 0.1); color: var(--red);">\u{1F3AD}</div>
          <h4>Role Play Practice</h4>
          <p>Practice with realistic scenarios</p>
        </div>` : ''}
        <div class="tool-card glass" onclick="openTool('rubric')">
          <div class="tool-icon" style="background: rgba(175, 82, 222, 0.1); color: var(--purple);">\u{1F4CB}</div>
          <h4>Rubric & Scoring</h4>
          <p>Understand how you'll be evaluated</p>
        </div>
        <div class="tool-card glass" onclick="openTool('prep')">
          <div class="tool-icon" style="background: rgba(255, 45, 85, 0.1); color: var(--pink);">\u2705</div>
          <h4>Prep Checklist</h4>
          <p>Track your competition preparation</p>
        </div>
        <div class="tool-card glass" onclick="openTool('timer')">
          <div class="tool-icon" style="background: rgba(90, 200, 250, 0.1); color: var(--teal);">\u23F1</div>
          <h4>Practice Timer</h4>
          <p>Timed practice sessions</p>
        </div>
        <div class="tool-card glass" onclick="openTool('notes')">
          <div class="tool-icon" style="background: rgba(88, 86, 214, 0.1); color: var(--indigo);">\u{1F4DD}</div>
          <h4>My Notes</h4>
          <p>Personal study notes</p>
        </div>
      </div>
    </div>`;
}

// ============ RENDER: QUIZ ============
function renderQuiz(ev) {
  const container = document.getElementById('tool-content');
  const questions = ev.quizKey && QUIZ_DATA[ev.quizKey];

  if (!questions || questions.length === 0) {
    container.innerHTML = `
      <button class="back-btn" onclick="openEventDetail('${ev.id}')">\u2190 Back to ${ev.name}</button>
      <div class="empty-state">
        <div class="empty-state-icon">\u{1F4DD}</div>
        <h3>No quiz available</h3>
        <p class="text-secondary">Quiz questions are not yet available for this event.</p>
      </div>`;
    return;
  }

  // Shuffle and pick 10 questions
  const shuffled = shuffleArray(questions).slice(0, 10);
  App.quizState = {
    questions: shuffled,
    current: 0,
    answers: [],
    score: 0,
    answered: false,
  };

  renderQuizQuestion();
}

function renderQuizQuestion() {
  const container = document.getElementById('tool-content');
  const { questions, current, answers, answered } = App.quizState;
  const ev = App.currentEvent;

  if (current >= questions.length) {
    renderQuizResults();
    return;
  }

  const q = questions[current];
  const progress = ((current) / questions.length) * 100;

  container.innerHTML = `
    <button class="back-btn" onclick="openEventDetail('${ev.id}')">\u2190 Back to ${ev.name}</button>
    <div class="quiz-container">
      <div class="quiz-progress">
        <div class="quiz-progress-bar">
          <div class="quiz-progress-fill" style="width: ${progress}%"></div>
        </div>
        <span class="quiz-progress-text">${current + 1} / ${questions.length}</span>
      </div>
      <div class="quiz-question-card glass-static">
        <h3>${q.q}</h3>
        <div class="quiz-options">
          ${q.o.map((opt, i) => `
            <button class="quiz-option ${answers[current] === i ? (i === q.a ? 'correct' : 'incorrect') : (answered && i === q.a ? 'correct' : '')}" 
                    onclick="selectQuizAnswer(${i})" ${answered ? 'disabled' : ''}>
              <span class="quiz-option-letter">${String.fromCharCode(65 + i)}</span>
              <span>${opt}</span>
            </button>`).join('')}
        </div>
      </div>
      <div class="quiz-actions">
        ${answered ? `<button class="btn btn-primary" onclick="nextQuizQuestion()">
          ${current + 1 < questions.length ? 'Next Question \u2192' : 'See Results'}
        </button>` : '<div></div>'}
        <span class="text-sm text-secondary">${ev.name} Practice Quiz</span>
      </div>
    </div>`;
}

function selectQuizAnswer(index) {
  if (App.quizState.answered) return;
  App.quizState.answered = true;
  App.quizState.answers[App.quizState.current] = index;
  if (index === App.quizState.questions[App.quizState.current].a) {
    App.quizState.score++;
  }
  renderQuizQuestion();
}

function nextQuizQuestion() {
  App.quizState.current++;
  App.quizState.answered = false;
  renderQuizQuestion();
}

function renderQuizResults() {
  const container = document.getElementById('tool-content');
  const { questions, score } = App.quizState;
  const ev = App.currentEvent;
  const pct = Math.round((score / questions.length) * 100);
  const color = pct >= 80 ? 'var(--green)' : pct >= 60 ? 'var(--orange)' : 'var(--red)';
  const message = pct >= 80 ? 'Excellent work! \u{1F389}' : pct >= 60 ? 'Good effort! Keep practicing. \u{1F4AA}' : 'Keep studying. You\'ll improve! \u{1F4DA}';

  container.innerHTML = `
    <button class="back-btn" onclick="openEventDetail('${ev.id}')">\u2190 Back to ${ev.name}</button>
    <div class="quiz-container">
      <div class="quiz-score-card glass-static">
        <h3>Quiz Complete!</h3>
        <div class="quiz-score-circle" style="border-color: ${color}">
          <span class="score-pct" style="color: ${color}">${pct}%</span>
          <span class="score-label">${score}/${questions.length}</span>
        </div>
        <p style="font-size: 1.1rem; margin-bottom: 24px;">${message}</p>
        <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
          <button class="btn btn-primary" onclick="openTool('quiz')">Try Again</button>
          <button class="btn btn-secondary" onclick="openEventDetail('${ev.id}')">Back to Event</button>
        </div>
      </div>
    </div>`;
}

// ============ RENDER: FLASHCARDS ============
function renderFlashcards(ev) {
  const container = document.getElementById('tool-content');
  const questions = ev.quizKey && QUIZ_DATA[ev.quizKey];

  if (!questions || questions.length === 0) {
    container.innerHTML = `
      <button class="back-btn" onclick="openEventDetail('${ev.id}')">\u2190 Back to ${ev.name}</button>
      <div class="empty-state">
        <div class="empty-state-icon">\u{1F5C2}</div>
        <h3>No flashcards available</h3>
        <p class="text-secondary">Flashcards are not yet available for this event.</p>
      </div>`;
    return;
  }

  const shuffled = shuffleArray(questions);
  App.flashcardState = { cards: shuffled, current: 0, flipped: false };
  renderFlashcard();
}

function renderFlashcard() {
  const container = document.getElementById('tool-content');
  const { cards, current, flipped } = App.flashcardState;
  const ev = App.currentEvent;
  const card = cards[current];

  container.innerHTML = `
    <button class="back-btn" onclick="openEventDetail('${ev.id}')">\u2190 Back to ${ev.name}</button>
    <div class="flashcard-container">
      <h3 style="font-family: var(--font-display); margin-bottom: 24px;">${ev.name} Flashcards</h3>
      <div class="flashcard ${flipped ? 'flipped' : ''}" onclick="flipFlashcard()">
        <div class="flashcard-inner glass-static">
          <div class="flashcard-front glass-static">
            <span class="flashcard-label">Question</span>
            <span class="flashcard-text">${card.q}</span>
          </div>
          <div class="flashcard-back glass-static">
            <span class="flashcard-label">Answer</span>
            <span class="flashcard-text">${card.o[card.a]}</span>
          </div>
        </div>
      </div>
      <div class="flashcard-nav">
        <button class="btn btn-secondary btn-sm" onclick="prevFlashcard()" ${current === 0 ? 'disabled style="opacity:0.5"' : ''}>\u2190 Previous</button>
        <span class="flashcard-counter">${current + 1} / ${cards.length}</span>
        <button class="btn btn-secondary btn-sm" onclick="nextFlashcard()" ${current === cards.length - 1 ? 'disabled style="opacity:0.5"' : ''}>Next \u2192</button>
      </div>
      <p class="text-sm text-secondary mt-lg">Click the card to flip it</p>
    </div>`;
}

function flipFlashcard() {
  App.flashcardState.flipped = !App.flashcardState.flipped;
  const card = document.querySelector('.flashcard');
  if (card) card.classList.toggle('flipped');
}

function prevFlashcard() {
  if (App.flashcardState.current > 0) {
    App.flashcardState.current--;
    App.flashcardState.flipped = false;
    renderFlashcard();
  }
}

function nextFlashcard() {
  if (App.flashcardState.current < App.flashcardState.cards.length - 1) {
    App.flashcardState.current++;
    App.flashcardState.flipped = false;
    renderFlashcard();
  }
}

// ============ RENDER: STUDY GUIDE ============
function renderStudyGuide(ev) {
  const container = document.getElementById('tool-content');
  const guides = STUDY_GUIDES[ev.id] || [];

  container.innerHTML = `
    <button class="back-btn" onclick="openEventDetail('${ev.id}')">\u2190 Back to ${ev.name}</button>
    <div class="study-container">
      <h2 style="font-family: var(--font-display); font-size: 1.8rem; font-weight: 700; margin-bottom: 8px;">${ev.name}</h2>
      <p class="text-secondary mb-lg">Comprehensive study guide and preparation resources</p>
      ${guides.map(section => `
        <div class="study-section glass-static">
          <h3>\u{1F4DA} ${section.title}</h3>
          <ul>
            ${section.items.map(item => `<li>${item}</li>`).join('')}
          </ul>
        </div>`).join('')}
    </div>`;
}

// ============ RENDER: ROLE PLAY ============
function renderRolePlay(ev) {
  const container = document.getElementById('tool-content');
  const scenarios = ROLE_PLAY_SCENARIOS[ev.id] || [];

  if (scenarios.length === 0) {
    // Generate generic role play tips based on event type
    container.innerHTML = `
      <button class="back-btn" onclick="openEventDetail('${ev.id}')">\u2190 Back to ${ev.name}</button>
      <div class="roleplay-container">
        <h2 style="font-family: var(--font-display); font-size: 1.8rem; font-weight: 700; margin-bottom: 8px;">${ev.name} \u2014 Role Play Practice</h2>
        <p class="text-secondary mb-lg">Preparation tips and strategies for your ${ev.type} event</p>
        <div class="roleplay-scenario glass-static">
          <h3>General Preparation Tips</h3>
          <div class="roleplay-tips">
            <h4>Key Strategies for ${ev.name}</h4>
            <ul>
              <li>Research current industry trends related to ${ev.name.toLowerCase()}</li>
              <li>Practice your professional introduction and handshake</li>
              <li>Prepare a structured approach to answering scenario questions</li>
              <li>Time yourself during practice sessions</li>
              <li>Record yourself to review body language and delivery</li>
              <li>Dress professionally and arrive early</li>
              <li>Stay calm and take a moment to think before responding</li>
              <li>Use specific examples and data when possible</li>
            </ul>
          </div>
        </div>
      </div>`;
    return;
  }

  container.innerHTML = `
    <button class="back-btn" onclick="openEventDetail('${ev.id}')">\u2190 Back to ${ev.name}</button>
    <div class="roleplay-container">
      <h2 style="font-family: var(--font-display); font-size: 1.8rem; font-weight: 700; margin-bottom: 8px;">${ev.name} \u2014 Role Play Practice</h2>
      <p class="text-secondary mb-lg">Practice with realistic competition scenarios</p>
      ${scenarios.map((s, i) => `
        <div class="roleplay-scenario glass-static">
          <h3>Scenario ${i + 1}: ${s.title}</h3>
          <div class="scenario-text">${s.scenario}</div>
          <div class="roleplay-tips">
            <h4>Tips for Success</h4>
            <ul>
              ${s.tips.map(t => `<li>${t}</li>`).join('')}
            </ul>
          </div>
        </div>`).join('')}
      <div class="text-center mt-xl">
        <button class="btn btn-primary" onclick="openTool('timer')">Start Practice Timer</button>
      </div>
    </div>`;
}

// ============ RENDER: RUBRIC ============
function renderRubric(ev) {
  const container = document.getElementById('tool-content');
  const rubric = RUBRICS[ev.type] || RUBRICS['objective'];

  container.innerHTML = `
    <button class="back-btn" onclick="openEventDetail('${ev.id}')">\u2190 Back to ${ev.name}</button>
    <div class="rubric-container">
      <h2 style="font-family: var(--font-display); font-size: 1.8rem; font-weight: 700; margin-bottom: 8px;">${ev.name}</h2>
      <p class="text-secondary mb-lg">${rubric.title} \u2014 Understanding how you'll be scored</p>
      <div class="glass-static" style="padding: var(--space-xl); margin-bottom: var(--space-xl); overflow-x: auto;">
        <table class="rubric-table">
          <thead>
            <tr>
              <th>Criteria</th>
              <th>Points</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            ${rubric.sections.map(s => `
              <tr>
                <td><strong>${s.criteria}</strong></td>
                <td class="rubric-points">${s.points}</td>
                <td>${s.desc}</td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>
      <div class="study-section glass-static">
        <h3>\u{1F4A1} Tips for Maximizing Your Score</h3>
        <ul>
          ${rubric.tips.map(t => `<li>${t}</li>`).join('')}
        </ul>
      </div>
    </div>`;
}

// ============ RENDER: PREP CHECKLIST ============
function renderPrepChecklist(ev) {
  const container = document.getElementById('tool-content');
  const storageKey = `fbla-prep-${ev.id}`;
  const saved = JSON.parse(localStorage.getItem(storageKey) || '{}');

  const generalItems = [
    'Read official FBLA event guidelines',
    'Review scoring rubric and rating sheets',
    'Study key concepts and terminology',
    'Take at least 3 practice quizzes',
    'Practice under timed conditions',
    'Review current events in the subject area',
    'Get feedback from advisor or peers',
    'Prepare professional attire',
    'Plan travel and logistics for competition',
    'Get a good night\'s sleep before competition',
  ];

  const typeItems = {
    'objective': ['Create study flashcards', 'Review all practice test answers', 'Study official competencies list'],
    'presentation': ['Prepare visual aids/slides', 'Practice presentation 5+ times', 'Prepare for judge questions'],
    'roleplay': ['Practice with different scenarios', 'Work on professional handshake', 'Practice thinking on your feet'],
    'production': ['Complete project ahead of deadline', 'Test product thoroughly', 'Prepare project documentation'],
    'speaking': ['Write and memorize speech outline', 'Practice vocal variety and pacing', 'Record and review yourself'],
    'performance': ['Coordinate with team members', 'Practice as a full team 5+ times', 'Assign and review all roles'],
  };

  const items = [...generalItems, ...(typeItems[ev.type] || [])];

  container.innerHTML = `
    <button class="back-btn" onclick="openEventDetail('${ev.id}')">\u2190 Back to ${ev.name}</button>
    <div class="study-container">
      <h2 style="font-family: var(--font-display); font-size: 1.8rem; font-weight: 700; margin-bottom: 8px;">${ev.name}</h2>
      <p class="text-secondary mb-lg">Track your competition preparation progress</p>
      <div class="glass-static" style="padding: var(--space-xl);">
        <div class="flex-between mb-lg">
          <h3 style="font-family: var(--font-display);">\u2705 Preparation Checklist</h3>
          <span class="text-sm text-secondary" id="prep-progress">0/${items.length} complete</span>
        </div>
        <ul class="checklist" id="prep-checklist">
          ${items.map((item, i) => `
            <li>
              <div class="checklist-check ${saved[i] ? 'checked' : ''}" onclick="togglePrepItem('${ev.id}', ${i}, ${items.length})" id="prep-check-${i}">
                ${saved[i] ? '\u2713' : ''}
              </div>
              <span style="${saved[i] ? 'text-decoration: line-through; opacity: 0.6;' : ''}" id="prep-text-${i}">${item}</span>
            </li>`).join('')}
        </ul>
      </div>
    </div>`;

  updatePrepProgress(ev.id, items.length);
}

function togglePrepItem(eventId, index, total) {
  const storageKey = `fbla-prep-${eventId}`;
  const saved = JSON.parse(localStorage.getItem(storageKey) || '{}');
  saved[index] = !saved[index];
  localStorage.setItem(storageKey, JSON.stringify(saved));

  const check = document.getElementById(`prep-check-${index}`);
  const text = document.getElementById(`prep-text-${index}`);
  if (check) {
    check.classList.toggle('checked');
    check.innerHTML = saved[index] ? '\u2713' : '';
  }
  if (text) {
    text.style.textDecoration = saved[index] ? 'line-through' : 'none';
    text.style.opacity = saved[index] ? '0.6' : '1';
  }
  updatePrepProgress(eventId, total);
}

function updatePrepProgress(eventId, total) {
  const storageKey = `fbla-prep-${eventId}`;
  const saved = JSON.parse(localStorage.getItem(storageKey) || '{}');
  const done = Object.values(saved).filter(Boolean).length;
  const el = document.getElementById('prep-progress');
  if (el) el.textContent = `${done}/${total} complete`;
}

// ============ RENDER: NOTES ============
function renderNotes(ev) {
  const container = document.getElementById('tool-content');
  const storageKey = `fbla-notes-${ev.id}`;
  const saved = localStorage.getItem(storageKey) || '';

  container.innerHTML = `
    <button class="back-btn" onclick="openEventDetail('${ev.id}')">\u2190 Back to ${ev.name}</button>
    <div class="study-container">
      <h2 style="font-family: var(--font-display); font-size: 1.8rem; font-weight: 700; margin-bottom: 8px;">${ev.name} \u2014 My Notes</h2>
      <p class="text-secondary mb-lg">Personal study notes (saved automatically in your browser)</p>
      <div class="glass-static" style="padding: var(--space-xl);">
        <textarea class="notes-textarea" id="notes-area" placeholder="Start typing your study notes for ${ev.name}..." 
                  oninput="saveNotes('${ev.id}')">${saved}</textarea>
        <p class="text-sm text-secondary mt-md">\u{1F4BE} Notes are saved automatically to your browser</p>
      </div>
    </div>`;
}

function saveNotes(eventId) {
  const textarea = document.getElementById('notes-area');
  if (textarea) {
    localStorage.setItem(`fbla-notes-${eventId}`, textarea.value);
  }
}

// ============ RENDER: TOOL TIMER ============
function renderToolTimer(ev) {
  App.timerState = {
    seconds: 420, // 7 min default
    running: false,
    interval: null,
    initial: 420,
  };
  renderTimerUI(ev);
}

function renderTimerUI(ev) {
  const container = document.getElementById('tool-content');
  const presets = [
    { label: '1 min', secs: 60 },
    { label: '4 min', secs: 240 },
    { label: '5 min', secs: 300 },
    { label: '7 min', secs: 420 },
    { label: '10 min', secs: 600 },
    { label: '15 min', secs: 900 },
    { label: '30 min', secs: 1800 },
    { label: '60 min', secs: 3600 },
  ];

  const backTarget = ev ? `openEventDetail('${ev.id}')` : `navigate('home')`;
  const backLabel = ev ? `Back to ${ev.name}` : 'Back to Home';

  container.innerHTML = `
    <button class="back-btn" onclick="${backTarget}">\u2190 ${backLabel}</button>
    <div class="timer-container">
      <div class="timer-display glass-static">
        <div class="timer-label">${ev ? ev.name + ' \u2014 ' : ''}Practice Timer</div>
        <div class="timer-time" id="timer-display">${formatTime(App.timerState.seconds)}</div>
        <div class="timer-controls">
          <button class="btn btn-primary" id="timer-start-btn" onclick="toggleTimer()">\u25B6 Start</button>
          <button class="btn btn-secondary" onclick="resetTimer()">Reset</button>
        </div>
        <div class="timer-presets">
          ${presets.map(p => `
            <button class="timer-preset ${App.timerState.initial === p.secs ? 'active' : ''}" 
                    onclick="setTimerPreset(${p.secs})">${p.label}</button>`).join('')}
        </div>
      </div>
    </div>`;
}

// ============ RENDER: STANDALONE TIMER ============
function renderTimer() {
  App.timerState = App.timerState || {
    seconds: 420,
    running: false,
    interval: null,
    initial: 420,
  };

  const container = document.getElementById('timer-content');
  const presets = [
    { label: '1 min', secs: 60 },
    { label: '4 min', secs: 240 },
    { label: '5 min', secs: 300 },
    { label: '7 min', secs: 420 },
    { label: '10 min', secs: 600 },
    { label: '15 min', secs: 900 },
    { label: '30 min', secs: 1800 },
    { label: '60 min', secs: 3600 },
  ];

  container.innerHTML = `
    <div class="timer-container">
      <div class="timer-display glass-static">
        <div class="timer-label">Competition Timer</div>
        <div class="timer-time" id="main-timer-display">${formatTime(App.timerState.seconds)}</div>
        <div class="timer-controls">
          <button class="btn btn-primary" id="main-timer-start-btn" onclick="toggleMainTimer()">\u25B6 Start</button>
          <button class="btn btn-secondary" onclick="resetMainTimer()">Reset</button>
        </div>
        <div class="timer-presets">
          ${presets.map(p => `
            <button class="timer-preset ${App.timerState.initial === p.secs ? 'active' : ''}" 
                    onclick="setMainTimerPreset(${p.secs})">${p.label}</button>`).join('')}
        </div>
      </div>
      <div class="glass-static mt-xl" style="padding: var(--space-xl);">
        <h3 style="font-family: var(--font-display); margin-bottom: 12px;">\u{1F4CB} Common FBLA Time Limits</h3>
        <table class="rubric-table">
          <thead><tr><th>Event Type</th><th>Prep Time</th><th>Presentation</th></tr></thead>
          <tbody>
            <tr><td>Objective Tests</td><td>\u2014</td><td>60 minutes</td></tr>
            <tr><td>Role Play Events</td><td>10 minutes</td><td>5 minutes</td></tr>
            <tr><td>Presentation Events</td><td>Varies</td><td>5\u20137 minutes</td></tr>
            <tr><td>Speaking Events</td><td>60 sec (impromptu)</td><td>4\u20135 minutes</td></tr>
            <tr><td>Performance Events</td><td>Varies</td><td>Varies</td></tr>
          </tbody>
        </table>
      </div>
    </div>`;
}

// Timer logic
function formatTime(secs) {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

function toggleTimer() {
  if (App.timerState.running) {
    clearInterval(App.timerState.interval);
    App.timerState.running = false;
    const btn = document.getElementById('timer-start-btn');
    if (btn) btn.innerHTML = '\u25B6 Start';
  } else {
    App.timerState.running = true;
    const btn = document.getElementById('timer-start-btn');
    if (btn) btn.innerHTML = '\u23F8 Pause';
    App.timerState.interval = setInterval(() => {
      if (App.timerState.seconds > 0) {
        App.timerState.seconds--;
        updateTimerDisplay('timer-display');
      } else {
        clearInterval(App.timerState.interval);
        App.timerState.running = false;
        const btn2 = document.getElementById('timer-start-btn');
        if (btn2) btn2.innerHTML = '\u25B6 Start';
        playTimerAlert();
      }
    }, 1000);
  }
}

function resetTimer() {
  clearInterval(App.timerState.interval);
  App.timerState.running = false;
  App.timerState.seconds = App.timerState.initial;
  updateTimerDisplay('timer-display');
  const btn = document.getElementById('timer-start-btn');
  if (btn) btn.innerHTML = '\u25B6 Start';
}

function setTimerPreset(secs) {
  clearInterval(App.timerState.interval);
  App.timerState.running = false;
  App.timerState.seconds = secs;
  App.timerState.initial = secs;
  if (App.currentTool === 'timer') {
    renderTimerUI(App.currentEvent);
  }
}

function toggleMainTimer() {
  if (App.timerState.running) {
    clearInterval(App.timerState.interval);
    App.timerState.running = false;
    const btn = document.getElementById('main-timer-start-btn');
    if (btn) btn.innerHTML = '\u25B6 Start';
  } else {
    App.timerState.running = true;
    const btn = document.getElementById('main-timer-start-btn');
    if (btn) btn.innerHTML = '\u23F8 Pause';
    App.timerState.interval = setInterval(() => {
      if (App.timerState.seconds > 0) {
        App.timerState.seconds--;
        updateTimerDisplay('main-timer-display');
      } else {
        clearInterval(App.timerState.interval);
        App.timerState.running = false;
        const btn2 = document.getElementById('main-timer-start-btn');
        if (btn2) btn2.innerHTML = '\u25B6 Start';
        playTimerAlert();
      }
    }, 1000);
  }
}

function resetMainTimer() {
  clearInterval(App.timerState.interval);
  App.timerState.running = false;
  App.timerState.seconds = App.timerState.initial;
  updateTimerDisplay('main-timer-display');
  const btn = document.getElementById('main-timer-start-btn');
  if (btn) btn.innerHTML = '\u25B6 Start';
}

function setMainTimerPreset(secs) {
  clearInterval(App.timerState.interval);
  App.timerState.running = false;
  App.timerState.seconds = secs;
  App.timerState.initial = secs;
  renderTimer();
}

function updateTimerDisplay(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = formatTime(App.timerState.seconds);
  // Add warning/danger classes
  el.classList.remove('warning', 'danger');
  if (App.timerState.seconds <= 30 && App.timerState.seconds > 10) {
    el.classList.add('warning');
  } else if (App.timerState.seconds <= 10) {
    el.classList.add('danger');
  }
}

function playTimerAlert() {
  // Simple audio beep using reusable Web Audio API context
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = 800;
    gain.gain.value = 0.3;
    osc.start();
    setTimeout(() => { osc.stop(); }, 500);
  } catch (e) {
    // Fallback: no sound
  }
}

// ============ SEARCH ============
function handleSearch(query) {
  App.searchQuery = query;
  const resultsContainer = document.getElementById('search-results');

  if (!query || query.length < 2) {
    resultsContainer.classList.remove('visible');
    if (App.currentView === 'events') renderEvents();
    return;
  }

  const q = query.toLowerCase();
  const matches = EVENTS.filter(e =>
    e.name.toLowerCase().includes(q) ||
    e.desc.toLowerCase().includes(q) ||
    e.category.toLowerCase().includes(q) ||
    e.type.toLowerCase().includes(q)
  ).slice(0, 8);

  if (matches.length === 0) {
    resultsContainer.classList.remove('visible');
    return;
  }

  resultsContainer.innerHTML = matches.map(e => `
    <div class="search-result-item" onclick="openEventDetail('${e.id}'); document.getElementById('search-results').classList.remove('visible'); document.getElementById('search-input').value = '';">
      <div class="search-result-name">${e.name}</div>
      <div class="search-result-meta">${e.category} \u2022 ${(EVENT_TYPES[e.type] || {}).label || e.type}</div>
    </div>`).join('');
  resultsContainer.classList.add('visible');

  if (App.currentView === 'events') renderEvents();
}

function setCategory(category) {
  App.categoryFilter = category;
  document.querySelectorAll('.filter-pill').forEach(p => {
    p.classList.toggle('active', p.dataset.category === category);
  });
  renderEvents();
}

// ============ MOBILE NAV ============
function toggleMobileNav() {
  document.getElementById('nav-links').classList.toggle('open');
}

// ============ INIT ============
document.addEventListener('DOMContentLoaded', () => {
  renderHome();

  // Close search results when clicking outside
  document.addEventListener('click', (e) => {
    const searchArea = document.querySelector('.nav-search');
    if (searchArea && !searchArea.contains(e.target)) {
      document.getElementById('search-results').classList.remove('visible');
    }
  });

  // Close mobile nav on link click
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      document.getElementById('nav-links').classList.remove('open');
    });
  });
});
