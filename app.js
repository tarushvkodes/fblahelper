// FBLA Study Hub - Main Application Logic

// ==========================================
// STATE MANAGEMENT
// ==========================================

const state = {
  currentPage: 'home',
  currentEvent: null,
  currentQuizCategory: null,
  quizState: null,
  flashcardState: null,
  timerState: null,
  studyProgress: JSON.parse(localStorage.getItem('fbla-study-progress') || '{}'),
  checkedItems: JSON.parse(localStorage.getItem('fbla-checked-items') || '{}')
};

// ==========================================
// NAVIGATION
// ==========================================

function navigateTo(page, data) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  
  // Update nav links
  document.querySelectorAll('.nav-link').forEach(l => {
    l.classList.remove('active');
    if (l.dataset.page === page) l.classList.add('active');
  });

  // Show target page
  const targetPage = document.getElementById(`page-${page}`);
  if (targetPage) {
    targetPage.classList.add('active');
    state.currentPage = page;
  }

  // Page-specific initialization
  switch (page) {
    case 'events':
      renderEventFilters();
      renderEvents();
      break;
    case 'event-detail':
      renderEventDetail(data);
      break;
    case 'quiz':
      renderQuizCategories();
      break;
    case 'flashcards':
      renderFlashcardCategories();
      break;
    case 'roleplay':
      renderRolePlayList();
      break;
    case 'study':
      renderStudyPlanner();
      break;
  }

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==========================================
// MOBILE MENU
// ==========================================

function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  menu.classList.toggle('open');
}

function closeMobileMenu() {
  document.getElementById('mobileMenu').classList.remove('open');
}

// ==========================================
// EVENTS PAGE
// ==========================================

function renderEventFilters() {
  const bar = document.getElementById('filterBar');
  if (!bar) return;
  bar.innerHTML = EVENT_CATEGORIES.map(cat =>
    `<button class="filter-chip ${cat === 'All' ? 'active' : ''}" onclick="filterByCategory('${cat}', this)">${cat}</button>`
  ).join('');
}

function filterByCategory(category, el) {
  document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
  if (el) el.classList.add('active');
  renderEvents(category === 'All' ? null : category);
}

function renderEvents(categoryFilter) {
  const grid = document.getElementById('eventsGrid');
  const search = (document.getElementById('eventSearch')?.value || '').toLowerCase();
  
  const filtered = EVENTS.filter(e => {
    const matchesCategory = !categoryFilter || e.category === categoryFilter;
    const matchesSearch = !search || e.name.toLowerCase().includes(search) || e.category.toLowerCase().includes(search);
    return matchesCategory && matchesSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column: 1/-1">
        <div class="empty-state-icon">🔍</div>
        <h3>No events found</h3>
        <p>Try a different search term or category filter.</p>
      </div>`;
    return;
  }

  grid.innerHTML = filtered.map(e => {
    const typeInfo = EVENT_TYPES[e.type] || EVENT_TYPES.objective;
    const hasQuiz = e.quizKey && QUIZ_DATA[e.quizKey];
    const indicators = [];
    if (hasQuiz) indicators.push(`<span class="event-indicator quiz">📝 ${QUIZ_DATA[e.quizKey].length} questions</span>`);
    if (e.rolePlay) indicators.push(`<span class="event-indicator roleplay">🎭 Role Play</span>`);
    
    return `
      <div class="glass-card event-card" onclick="navigateTo('event-detail', ${e.id})">
        <span class="event-type-badge">${typeInfo.icon} ${typeInfo.label}</span>
        <h4>${e.name}</h4>
        <div class="event-category">${e.category}</div>
        ${indicators.length ? `<div class="event-indicators">${indicators.join('')}</div>` : ''}
      </div>`;
  }).join('');
}

function filterEvents() {
  const activeFilter = document.querySelector('.filter-chip.active');
  const category = activeFilter?.textContent === 'All' ? null : activeFilter?.textContent;
  renderEvents(category);
}

// ==========================================
// EVENT DETAIL PAGE
// ==========================================

function renderEventDetail(eventId) {
  const event = EVENTS.find(e => e.id === eventId);
  if (!event) return;
  state.currentEvent = event;

  const typeInfo = EVENT_TYPES[event.type] || EVENT_TYPES.objective;
  const hasQuiz = event.quizKey && QUIZ_DATA[event.quizKey];
  const quizCount = hasQuiz ? QUIZ_DATA[event.quizKey].length : 0;

  const container = document.getElementById('eventDetailContent');
  
  // Build tabs
  const tabs = ['Overview'];
  if (hasQuiz) tabs.push('Quiz');
  if (hasQuiz) tabs.push('Flashcards');
  if (event.rolePlay) tabs.push('Role Play');
  tabs.push('Study Tips');
  tabs.push('Prep Checklist');

  container.innerHTML = `
    <div class="event-detail-header">
      <div class="event-detail-info">
        <span class="event-type-badge" style="margin-bottom: 8px; display: inline-flex;">${typeInfo.icon} ${typeInfo.label}</span>
        <h2>${event.name}</h2>
        <p>${event.description}</p>
        <div class="event-meta">
          <span class="event-meta-item">📂 ${event.category}</span>
          ${event.duration ? `<span class="event-meta-item">⏱️ ${event.duration} min</span>` : ''}
          ${hasQuiz ? `<span class="event-meta-item">📝 ${quizCount} questions</span>` : ''}
          ${event.rolePlay ? `<span class="event-meta-item">🎭 Role Play</span>` : ''}
        </div>
      </div>
      <div class="event-detail-actions">
        ${hasQuiz ? `<button class="btn btn-primary" onclick="startQuizForEvent(${event.id})">Start Quiz</button>` : ''}
        ${hasQuiz ? `<button class="btn btn-secondary" onclick="startFlashcardsForEvent(${event.id})">Flashcards</button>` : ''}
      </div>
    </div>

    <div class="event-detail-tabs">
      ${tabs.map((tab, i) => `<button class="event-tab ${i === 0 ? 'active' : ''}" onclick="switchEventTab('${tab.toLowerCase().replace(/\s/g, '-')}', this)">${tab}</button>`).join('')}
    </div>

    <div class="event-tab-content active" id="etab-overview">
      ${renderEventOverview(event)}
    </div>

    ${hasQuiz ? `<div class="event-tab-content" id="etab-quiz">
      ${renderEventQuizTab(event)}
    </div>` : ''}

    ${hasQuiz ? `<div class="event-tab-content" id="etab-flashcards">
      <div class="text-center mb-lg">
        <p class="text-secondary mb-md">Review ${quizCount} flashcards for ${event.name}</p>
        <button class="btn btn-primary" onclick="startFlashcardsForEvent(${event.id})">Start Flashcards</button>
      </div>
    </div>` : ''}

    ${event.rolePlay ? `<div class="event-tab-content" id="etab-role-play">
      ${renderRolePlayTab(event)}
    </div>` : ''}

    <div class="event-tab-content" id="etab-study-tips">
      ${renderStudyTipsTab(event)}
    </div>

    <div class="event-tab-content" id="etab-prep-checklist">
      ${renderPrepChecklistTab(event)}
    </div>
  `;
}

function switchEventTab(tabId, btn) {
  // Update tab buttons
  btn.closest('.event-detail-tabs').querySelectorAll('.event-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  
  // Show correct content
  document.querySelectorAll('.event-tab-content').forEach(c => c.classList.remove('active'));
  const target = document.getElementById(`etab-${tabId}`);
  if (target) target.classList.add('active');
}

function renderEventOverview(event) {
  const typeInfo = EVENT_TYPES[event.type] || EVENT_TYPES.objective;
  return `
    <div class="study-grid">
      <div class="glass-card-flat study-card">
        <h4>📋 Event Format</h4>
        <p>${event.format}</p>
        <ul>
          <li>Type: ${typeInfo.label}</li>
          <li>Category: ${event.category}</li>
          ${event.duration ? `<li>Duration: ${event.duration} minutes</li>` : ''}
          ${event.rolePlay ? `<li>Includes role play component</li>` : ''}
        </ul>
      </div>
      <div class="glass-card-flat study-card">
        <h4>🎯 Key Competencies</h4>
        <p>Core skills tested in this event:</p>
        <ul>
          ${getCompetencies(event).map(c => `<li>${c}</li>`).join('')}
        </ul>
      </div>
      <div class="glass-card-flat study-card">
        <h4>📊 Available Resources</h4>
        <p>Study materials for this event:</p>
        <ul>
          ${event.quizKey && QUIZ_DATA[event.quizKey] ? `<li>Practice Quiz (${QUIZ_DATA[event.quizKey].length} questions)</li>` : ''}
          ${event.quizKey && QUIZ_DATA[event.quizKey] ? `<li>Flashcard deck</li>` : ''}
          ${event.rolePlay ? `<li>Role play scenarios</li>` : ''}
          <li>Study tips & strategies</li>
          <li>Prep checklist</li>
          ${event.duration ? `<li>Competition timer</li>` : ''}
        </ul>
      </div>
    </div>`;
}

function renderEventQuizTab(event) {
  if (!event.quizKey || !QUIZ_DATA[event.quizKey]) return '';
  const questions = QUIZ_DATA[event.quizKey];
  return `
    <div class="text-center">
      <p class="text-secondary mb-lg">Test your knowledge with ${questions.length} questions</p>
      <div class="flex justify-center gap-md" style="flex-wrap:wrap">
        <button class="btn btn-primary" onclick="startQuizForEvent(${event.id})">Full Quiz (${questions.length} Q)</button>
        <button class="btn btn-secondary" onclick="startQuizForEvent(${event.id}, 10)">Quick 10</button>
        <button class="btn btn-secondary" onclick="startQuizForEvent(${event.id}, 25)">Practice 25</button>
      </div>
    </div>`;
}

function renderRolePlayTab(event) {
  if (!event.rolePlay || !event.rolePlayInfo) return '';
  const rp = event.rolePlayInfo;
  return `
    <div class="glass-card-flat roleplay-scenario mb-lg">
      <h3>🎭 Practice Scenario</h3>
      <p>${rp.scenario}</p>
      <div class="event-meta mt-md">
        ${rp.prepTime ? `<span class="event-meta-item">📋 ${rp.prepTime} min prep</span>` : ''}
        <span class="event-meta-item">🎤 ${rp.presentTime} min presentation</span>
      </div>
    </div>
    <h3 style="font-family: var(--font-display); margin-bottom: 16px;">Rubric Criteria</h3>
    <div class="rubric-grid mb-lg">
      ${rp.rubricPoints.map((p, i) => `
        <div class="rubric-item">
          <h4>${i + 1}. ${p}</h4>
          <p>Evaluated by judges during your presentation</p>
        </div>`).join('')}
    </div>
    <div class="text-center">
      <button class="btn btn-primary" onclick="showTimer('roleplay')">Practice with Timer →</button>
    </div>`;
}

function renderStudyTipsTab(event) {
  return `
    <div class="tips-list">
      ${event.tips.map((tip, i) => `
        <div class="glass-card-flat tip-item">
          <div class="tip-number">${i + 1}</div>
          <div class="tip-text">${tip}</div>
        </div>`).join('')}
    </div>
    <div class="glass-card-flat mt-lg" style="padding: 24px">
      <h4 style="font-family: var(--font-display); margin-bottom: 12px;">📖 General Study Strategies</h4>
      <div class="tips-list">
        <div class="tip-item" style="padding:8px 0"><div class="tip-text">Review past competition questions and identify recurring topics</div></div>
        <div class="tip-item" style="padding:8px 0"><div class="tip-text">Form study groups with teammates to quiz each other</div></div>
        <div class="tip-item" style="padding:8px 0"><div class="tip-text">Use spaced repetition — review material at increasing intervals</div></div>
        <div class="tip-item" style="padding:8px 0"><div class="tip-text">Practice under timed conditions to build speed and confidence</div></div>
        <div class="tip-item" style="padding:8px 0"><div class="tip-text">Focus on understanding concepts, not just memorizing answers</div></div>
      </div>
    </div>`;
}

function renderPrepChecklistTab(event) {
  const items = getPrepChecklist(event);
  const checklistId = `event-${event.id}`;
  return `
    <div class="prep-checklist">
      ${items.map((item, i) => {
        const key = `${checklistId}-${i}`;
        const checked = state.checkedItems[key];
        return `
          <div class="prep-item ${checked ? 'checked' : ''}" onclick="toggleCheckItem('${key}', this)">
            <div class="prep-checkbox">${checked ? '✓' : ''}</div>
            <div class="prep-item-text">${item}</div>
          </div>`;
      }).join('')}
    </div>`;
}

function toggleCheckItem(key, el) {
  state.checkedItems[key] = !state.checkedItems[key];
  localStorage.setItem('fbla-checked-items', JSON.stringify(state.checkedItems));
  el.classList.toggle('checked');
  const cb = el.querySelector('.prep-checkbox');
  cb.textContent = state.checkedItems[key] ? '✓' : '';
}

function getCompetencies(event) {
  const competencyMap = {
    'Finance': ['Financial analysis', 'Mathematical reasoning', 'Regulatory knowledge', 'Economic principles', 'Data interpretation'],
    'Business': ['Strategic thinking', 'Problem solving', 'Decision making', 'Management principles', 'Business ethics'],
    'Technology': ['Technical proficiency', 'Problem solving', 'Systems thinking', 'Digital literacy', 'Troubleshooting'],
    'Communication': ['Written communication', 'Verbal presentation', 'Professional etiquette', 'Active listening', 'Persuasion'],
    'Marketing': ['Market analysis', 'Consumer behavior', 'Strategic planning', 'Creative thinking', 'Data-driven decisions'],
    'Design': ['Visual design principles', 'Creative problem solving', 'User experience', 'Technical execution', 'Attention to detail'],
    'Career Development': ['Professional development', 'Leadership skills', 'Goal setting', 'Self-presentation', 'Industry knowledge'],
    'FBLA Knowledge': ['Organizational knowledge', 'Parliamentary procedure', 'Leadership principles', 'FBLA history', 'Civic engagement'],
    'Community': ['Community engagement', 'Project management', 'Documentation', 'Impact measurement', 'Collaboration']
  };
  return competencyMap[event.category] || competencyMap['Business'];
}

function getPrepChecklist(event) {
  const base = [
    'Review event guidelines and rules from the FBLA website',
    'Check your competition schedule and room assignments',
    'Prepare required materials and documents',
    'Get a good night\'s sleep before competition day',
    'Dress in professional business attire',
    'Arrive 15 minutes early to your event room',
    'Bring valid student ID and FBLA membership card'
  ];

  const typeSpecific = {
    objective: [
      'Review all study guide topics thoroughly',
      'Take at least 3 full-length practice tests',
      'Bring approved calculator if allowed',
      'Bring #2 pencils and erasers',
      'Practice time management — pace yourself'
    ],
    presentation: [
      'Prepare and rehearse your presentation multiple times',
      'Create professional visual aids or slides',
      'Time your presentation to stay within limits',
      'Prepare for Q&A from judges',
      'Bring backup copies of your presentation materials'
    ],
    roleplay: [
      'Practice with multiple role play scenarios',
      'Review the rubric criteria thoroughly',
      'Practice organizing thoughts during prep time',
      'Work on maintaining professional composure',
      'Practice speaking clearly and confidently'
    ],
    production: [
      'Practice with the specific software being used',
      'Review keyboard shortcuts and efficiency techniques',
      'Practice production tasks under timed conditions',
      'Familiarize yourself with common task requirements',
      'Ensure you know how to save and submit files properly'
    ],
    speaking: [
      'Practice your speech with a timer multiple times',
      'Record yourself and review for improvements',
      'Work on vocal variety and pacing',
      'Practice confident body language and eye contact',
      'Prepare a strong opening and memorable closing'
    ],
    team: [
      'Coordinate with team members on roles and responsibilities',
      'Practice the full event together at least 3 times',
      'Establish communication signals between team members',
      'Review rules for team events specifically',
      'Ensure all team members have required materials'
    ]
  };

  return [...base, ...(typeSpecific[event.type] || typeSpecific.objective)];
}

// ==========================================
// QUIZ SYSTEM
// ==========================================

function renderQuizCategories() {
  const grid = document.getElementById('quizCategoryList');
  const search = (document.getElementById('quizSearch')?.value || '').toLowerCase();

  const categories = Object.keys(QUIZ_DATA).filter(cat =>
    !search || cat.toLowerCase().includes(search)
  ).sort();

  grid.innerHTML = categories.map(cat => `
    <div class="glass-card event-card" onclick="startQuiz('${cat}')">
      <span class="event-type-badge">📝 ${QUIZ_DATA[cat].length} questions</span>
      <h4>${cat}</h4>
      <div class="event-category">Practice Quiz</div>
    </div>
  `).join('');

  // Show category list, hide quiz area
  grid.classList.remove('hidden');
  document.getElementById('quizArea').classList.add('hidden');
}

function filterQuizCategories() {
  renderQuizCategories();
}

function startQuiz(category, count) {
  const allQuestions = QUIZ_DATA[category];
  if (!allQuestions || allQuestions.length === 0) return;

  // Shuffle and limit
  const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
  const questions = count ? shuffled.slice(0, count) : shuffled;

  state.quizState = {
    category,
    questions,
    currentIndex: 0,
    score: 0,
    answered: false,
    selectedAnswer: null,
    answers: []
  };

  document.getElementById('quizCategoryList').classList.add('hidden');
  document.getElementById('quizArea').classList.remove('hidden');
  renderQuizQuestion();
}

function startQuizForEvent(eventId, count) {
  const event = EVENTS.find(e => e.id === eventId);
  if (!event || !event.quizKey || !QUIZ_DATA[event.quizKey]) return;
  navigateTo('quiz');
  setTimeout(() => startQuiz(event.quizKey, count), 100);
}

function renderQuizQuestion() {
  const qs = state.quizState;
  if (!qs) return;

  const area = document.getElementById('quizArea');
  const q = qs.questions[qs.currentIndex];
  const progress = ((qs.currentIndex) / qs.questions.length) * 100;
  const answerKeys = Object.keys(q.answers);

  area.innerHTML = `
    <div class="quiz-container">
      <button class="section-back" onclick="exitQuiz()">← Back to Categories</button>
      
      <div class="quiz-progress">
        <div class="quiz-progress-bar">
          <div class="quiz-progress-fill" style="width: ${progress}%"></div>
        </div>
        <span class="quiz-progress-text">${qs.currentIndex + 1} / ${qs.questions.length}</span>
      </div>

      <div class="quiz-question">
        <h3>${sanitize(q.question)}</h3>
        <div class="quiz-answers">
          ${answerKeys.map(key => `
            <button class="quiz-answer" onclick="selectQuizAnswer('${key}', this)" data-key="${key}">
              <span class="quiz-answer-letter">${key}</span>
              <span>${sanitize(q.answers[key])}</span>
            </button>
          `).join('')}
        </div>
      </div>

      <div class="quiz-actions">
        <span class="text-secondary">Score: ${qs.score}/${qs.currentIndex}</span>
        <button class="btn btn-primary" id="quizNextBtn" onclick="nextQuizQuestion()" style="display:none">
          ${qs.currentIndex < qs.questions.length - 1 ? 'Next Question →' : 'See Results'}
        </button>
      </div>
    </div>`;
}

function selectQuizAnswer(key, el) {
  const qs = state.quizState;
  if (!qs || qs.answered) return;
  
  qs.answered = true;
  qs.selectedAnswer = key;
  
  // For our data, we'll consider A as correct (first answer) since we don't have explicit correct markers
  // In a real app, this would come from the data
  const correctKey = qs.questions[qs.currentIndex].correct || 'A';
  const isCorrect = key === correctKey;
  
  if (isCorrect) qs.score++;
  qs.answers.push({ question: qs.currentIndex, selected: key, correct: correctKey, isCorrect });

  // Update UI
  el.classList.add(isCorrect ? 'correct' : 'incorrect');
  
  // Show correct answer if wrong
  if (!isCorrect) {
    document.querySelector(`.quiz-answer[data-key="${correctKey}"]`)?.classList.add('correct');
  }

  // Disable all buttons
  document.querySelectorAll('.quiz-answer').forEach(b => b.style.pointerEvents = 'none');
  
  // Show next button
  document.getElementById('quizNextBtn').style.display = 'inline-flex';
}

function nextQuizQuestion() {
  const qs = state.quizState;
  if (!qs) return;
  
  qs.currentIndex++;
  qs.answered = false;
  qs.selectedAnswer = null;

  if (qs.currentIndex >= qs.questions.length) {
    renderQuizResults();
  } else {
    renderQuizQuestion();
  }
}

function renderQuizResults() {
  const qs = state.quizState;
  const area = document.getElementById('quizArea');
  const pct = Math.round((qs.score / qs.questions.length) * 100);
  
  let message = '';
  if (pct >= 90) message = 'Outstanding! You\'re competition ready! 🏆';
  else if (pct >= 75) message = 'Great job! Keep practicing to perfect your score! 🌟';
  else if (pct >= 60) message = 'Good effort! Review the topics you missed. 💪';
  else message = 'Keep studying! Practice makes perfect. 📚';

  // Save progress
  state.studyProgress[qs.category] = {
    lastScore: pct,
    lastDate: new Date().toISOString(),
    attempts: (state.studyProgress[qs.category]?.attempts || 0) + 1
  };
  localStorage.setItem('fbla-study-progress', JSON.stringify(state.studyProgress));

  area.innerHTML = `
    <div class="quiz-container">
      <div class="glass-card-flat quiz-score">
        <h2>Quiz Complete!</h2>
        <div class="score-number">${pct}%</div>
        <p>${qs.score} out of ${qs.questions.length} correct</p>
        <p style="margin-bottom: 24px">${message}</p>
        <div class="flex justify-center gap-md" style="flex-wrap:wrap">
          <button class="btn btn-primary" onclick="startQuiz('${qs.category}')">Retry Quiz</button>
          <button class="btn btn-secondary" onclick="startQuiz('${qs.category}', 10)">Quick 10</button>
          <button class="btn btn-ghost" onclick="exitQuiz()">Back to Categories</button>
        </div>
      </div>
    </div>`;
}

function exitQuiz() {
  state.quizState = null;
  if (state.currentPage === 'quiz') {
    renderQuizCategories();
  } else {
    navigateTo('quiz');
  }
}

// ==========================================
// FLASHCARD SYSTEM
// ==========================================

function renderFlashcardCategories() {
  const grid = document.getElementById('flashcardCategoryList');
  const search = (document.getElementById('flashcardSearch')?.value || '').toLowerCase();

  const categories = Object.keys(QUIZ_DATA).filter(cat =>
    !search || cat.toLowerCase().includes(search)
  ).sort();

  grid.innerHTML = categories.map(cat => `
    <div class="glass-card event-card" onclick="startFlashcards('${cat}')">
      <span class="event-type-badge">🃏 ${QUIZ_DATA[cat].length} cards</span>
      <h4>${cat}</h4>
      <div class="event-category">Flashcard Deck</div>
    </div>
  `).join('');

  grid.classList.remove('hidden');
  document.getElementById('flashcardArea').classList.add('hidden');
}

function filterFlashcardCategories() {
  renderFlashcardCategories();
}

function startFlashcards(category) {
  const cards = QUIZ_DATA[category];
  if (!cards || cards.length === 0) return;

  state.flashcardState = {
    category,
    cards: [...cards].sort(() => Math.random() - 0.5),
    currentIndex: 0,
    flipped: false
  };

  document.getElementById('flashcardCategoryList').classList.add('hidden');
  document.getElementById('flashcardArea').classList.remove('hidden');
  renderFlashcard();
}

function startFlashcardsForEvent(eventId) {
  const event = EVENTS.find(e => e.id === eventId);
  if (!event || !event.quizKey || !QUIZ_DATA[event.quizKey]) return;
  navigateTo('flashcards');
  setTimeout(() => startFlashcards(event.quizKey), 100);
}

function renderFlashcard() {
  const fs = state.flashcardState;
  if (!fs) return;

  const area = document.getElementById('flashcardArea');
  const card = fs.cards[fs.currentIndex];
  const correctKey = card.correct || 'A';

  area.innerHTML = `
    <div class="flashcard-container">
      <button class="section-back" onclick="exitFlashcards()">← Back to Categories</button>
      
      <div class="flashcard ${fs.flipped ? 'flipped' : ''}" onclick="flipFlashcard()">
        <div class="flashcard-inner">
          <div class="flashcard-front">
            <div class="flashcard-label">Question</div>
            <div class="flashcard-text">${sanitize(card.question)}</div>
            <div class="flashcard-hint">Tap to reveal answer</div>
          </div>
          <div class="flashcard-back">
            <div class="flashcard-label">Answer</div>
            <div class="flashcard-text">${correctKey}) ${sanitize(card.answers[correctKey] || 'N/A')}</div>
            <div class="flashcard-hint">Tap to see question</div>
          </div>
        </div>
      </div>

      <div class="flashcard-nav">
        <button class="flashcard-nav-btn" onclick="prevFlashcard()" ${fs.currentIndex === 0 ? 'disabled style="opacity:0.3"' : ''}>←</button>
        <span class="flashcard-counter">${fs.currentIndex + 1} / ${fs.cards.length}</span>
        <button class="flashcard-nav-btn" onclick="nextFlashcard()" ${fs.currentIndex === fs.cards.length - 1 ? 'disabled style="opacity:0.3"' : ''}>→</button>
      </div>

      <div class="text-center mt-lg">
        <button class="btn btn-ghost btn-sm" onclick="shuffleFlashcards()">🔀 Shuffle</button>
      </div>
    </div>`;
}

function flipFlashcard() {
  const fs = state.flashcardState;
  if (!fs) return;
  fs.flipped = !fs.flipped;
  document.querySelector('.flashcard')?.classList.toggle('flipped');
}

function nextFlashcard() {
  const fs = state.flashcardState;
  if (!fs || fs.currentIndex >= fs.cards.length - 1) return;
  fs.currentIndex++;
  fs.flipped = false;
  renderFlashcard();
}

function prevFlashcard() {
  const fs = state.flashcardState;
  if (!fs || fs.currentIndex <= 0) return;
  fs.currentIndex--;
  fs.flipped = false;
  renderFlashcard();
}

function shuffleFlashcards() {
  const fs = state.flashcardState;
  if (!fs) return;
  fs.cards.sort(() => Math.random() - 0.5);
  fs.currentIndex = 0;
  fs.flipped = false;
  renderFlashcard();
}

function exitFlashcards() {
  state.flashcardState = null;
  renderFlashcardCategories();
}

// ==========================================
// ROLE PLAY SYSTEM
// ==========================================

function renderRolePlayList() {
  const list = document.getElementById('roleplayList');
  const detail = document.getElementById('roleplayDetail');
  
  const rpEvents = EVENTS.filter(e => e.rolePlay);

  list.innerHTML = `
    <div class="events-grid">
      ${rpEvents.map(e => `
        <div class="glass-card event-card" onclick="showRolePlayDetail(${e.id})">
          <span class="event-type-badge">🎭 Role Play</span>
          <h4>${e.name}</h4>
          <div class="event-category">${e.category}</div>
          ${e.rolePlayInfo ? `<div class="event-indicators">
            ${e.rolePlayInfo.prepTime ? `<span class="event-indicator">${e.rolePlayInfo.prepTime}min prep</span>` : ''}
            <span class="event-indicator">${e.rolePlayInfo.presentTime}min present</span>
          </div>` : ''}
        </div>
      `).join('')}
    </div>

    <div class="glass-card-flat mt-xl" style="padding:32px">
      <h3 style="font-family:var(--font-display);margin-bottom:16px">🎯 General Role Play Tips</h3>
      <div class="tips-list">
        <div class="tip-item" style="padding:8px 0"><div class="tip-number">1</div><div class="tip-text"><strong>Read the prompt carefully.</strong> Underline key words and identify all parts of the problem you need to address.</div></div>
        <div class="tip-item" style="padding:8px 0"><div class="tip-number">2</div><div class="tip-text"><strong>Organize during prep time.</strong> Create a brief outline with 3-4 main points. Don't write a full script.</div></div>
        <div class="tip-item" style="padding:8px 0"><div class="tip-number">3</div><div class="tip-text"><strong>Address the judge as the character.</strong> Treat them as the person described in the scenario (e.g., "Mr. Thompson, I understand your concern...").</div></div>
        <div class="tip-item" style="padding:8px 0"><div class="tip-number">4</div><div class="tip-text"><strong>Be professional and confident.</strong> Maintain eye contact, use a clear voice, and demonstrate composure.</div></div>
        <div class="tip-item" style="padding:8px 0"><div class="tip-number">5</div><div class="tip-text"><strong>Provide specific solutions.</strong> Don't be vague — offer concrete action steps and explain your reasoning.</div></div>
        <div class="tip-item" style="padding:8px 0"><div class="tip-number">6</div><div class="tip-text"><strong>Watch your time.</strong> Aim to use at least 5 of your 7 minutes. End with a strong summary.</div></div>
      </div>
    </div>`;

  list.classList.remove('hidden');
  detail.classList.add('hidden');
}

function showRolePlayDetail(eventId) {
  const event = EVENTS.find(e => e.id === eventId);
  if (!event || !event.rolePlayInfo) return;

  const list = document.getElementById('roleplayList');
  const detail = document.getElementById('roleplayDetail');
  const rp = event.rolePlayInfo;

  list.classList.add('hidden');
  detail.classList.remove('hidden');

  detail.innerHTML = `
    <button class="section-back" onclick="renderRolePlayList()">← Back to Role Play Events</button>
    
    <h2 style="font-family:var(--font-display);font-size:2rem;margin-bottom:8px">${event.name}</h2>
    <p class="text-secondary mb-xl">${event.description}</p>

    <div class="glass-card-flat roleplay-scenario mb-lg">
      <h3>📋 Practice Scenario</h3>
      <p class="mt-md">${rp.scenario}</p>
      <div class="event-meta mt-md">
        ${rp.prepTime ? `<span class="event-meta-item">📋 ${rp.prepTime} min preparation time</span>` : ''}
        <span class="event-meta-item">🎤 ${rp.presentTime} min presentation/interaction</span>
      </div>
    </div>

    <h3 style="font-family:var(--font-display);margin-bottom:16px">📊 Evaluation Rubric</h3>
    <table class="rubric-table mb-xl">
      <thead>
        <tr>
          <th>Criteria</th>
          <th>What Judges Look For</th>
          <th>Weight</th>
        </tr>
      </thead>
      <tbody>
        ${rp.rubricPoints.map((point, i) => `
          <tr>
            <td><strong>${point}</strong></td>
            <td>${getRubricDescription(point)}</td>
            <td>${Math.round(100 / rp.rubricPoints.length)}%</td>
          </tr>`).join('')}
      </tbody>
    </table>

    <h3 style="font-family:var(--font-display);margin-bottom:16px">🎯 Event-Specific Strategies</h3>
    <div class="tips-list mb-xl">
      ${getEventStrategies(event).map((tip, i) => `
        <div class="glass-card-flat tip-item">
          <div class="tip-number">${i + 1}</div>
          <div class="tip-text">${tip}</div>
        </div>`).join('')}
    </div>

    <div class="text-center">
      <button class="btn btn-primary btn-lg" onclick="showTimer('roleplay')">⏱️ Practice with Role Play Timer</button>
    </div>`;
}

function getRubricDescription(point) {
  const descriptions = {
    'Problem identification': 'Clearly identifies the core problem and its implications',
    'Analysis depth': 'Provides thorough analysis with supporting reasoning',
    'Solution feasibility': 'Proposes realistic, implementable solutions',
    'Presentation skills': 'Clear communication, professional delivery, eye contact',
    'Q&A responses': 'Answers judge questions thoughtfully and completely',
    'Communication skills': 'Articulate, professional, uses appropriate terminology',
    'Solution effectiveness': 'Addresses all aspects of the problem with practical solutions',
    'Professionalism': 'Professional demeanor, attire, and composure throughout',
    'Customer satisfaction approach': 'Shows genuine concern for the customer\'s needs',
    'Business concept viability': 'Presents a realistic, well-researched business idea',
    'Market analysis': 'Demonstrates understanding of target market and competition',
    'Financial planning': 'Includes realistic financial projections and funding strategy',
    'Presentation delivery': 'Engaging, confident, well-paced presentation',
    'Response to questions': 'Handles questions with poise and detailed answers',
    'Industry knowledge': 'Shows deep understanding of the relevant industry',
    'Problem analysis': 'Systematically breaks down and analyzes the problem',
    'Solution creativity': 'Offers innovative and creative solutions',
    'Professional presentation': 'Well-organized, polished presentation',
    'HR knowledge': 'Demonstrates understanding of HR best practices',
    'Legal compliance': 'Shows awareness of relevant employment laws',
    'Solution practicality': 'Proposes solutions that can be implemented',
    'Professional demeanor': 'Maintains composure and professionalism',
    'Leadership knowledge': 'Shows understanding of leadership theories and practices',
    'Strategy development': 'Creates comprehensive and actionable strategies',
    'Communication': 'Clear, persuasive, and professional communication',
    'Professional presence': 'Commands respect through confident presentation',
    'First impression': 'Strong initial impact through appearance and greeting',
    'Knowledge of position': 'Demonstrates understanding of the role and company',
    'Product knowledge': 'Thoroughly understands the product or service',
    'Persuasion techniques': 'Uses effective selling and persuasion methods',
    'Objection handling': 'Addresses concerns smoothly and convincingly',
    'Closing skills': 'Effectively asks for the sale or commitment',
    'Marketing strategy': 'Develops comprehensive marketing approach',
    'Creativity': 'Shows original thinking and innovative ideas',
    'Presentation quality': 'High-quality, professional presentation materials',
    'Financial analysis': 'Sound financial reasoning and analysis'
  };
  return descriptions[point] || 'Evaluated based on quality and completeness';
}

function getEventStrategies(event) {
  return [
    `Research ${event.name} industry trends and current events before competition`,
    `Practice with a partner playing the judge role — have them ask tough follow-up questions`,
    `Create a "framework" you can apply to any ${event.name} scenario (e.g., Problem → Analysis → Solution → Implementation)`,
    `Time yourself during practice sessions to ensure you use the full ${event.rolePlayInfo.presentTime} minutes`,
    `Study real-world ${event.category} case studies for inspiration and examples`,
    `Prepare 2-3 strong talking points that work for most ${event.name} scenarios`
  ];
}

// ==========================================
// TIMER SYSTEM
// ==========================================

let timerInterval = null;

function showTimer(type) {
  navigateTo('timer');
  
  // Clear any existing timer
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }

  const area = document.getElementById('timerArea');
  area.classList.remove('hidden');

  const configs = {
    roleplay: {
      title: 'Role Play Timer',
      phases: [
        { name: 'Preparation Time', duration: 600, color: 'blue' },
        { name: 'Presentation Time', duration: 420, color: 'green' }
      ]
    },
    test: {
      title: 'Objective Test Timer',
      phases: [{ name: 'Test Time', duration: 3600, color: 'blue' }]
    },
    speech: {
      title: 'Speech Timer',
      phases: [{ name: 'Speech Time', duration: 300, color: 'green' }]
    },
    custom: {
      title: 'Custom Timer',
      phases: [{ name: 'Custom Time', duration: 600, color: 'blue' }]
    }
  };

  const config = configs[type] || configs.custom;
  
  state.timerState = {
    type,
    config,
    currentPhase: 0,
    timeRemaining: config.phases[0].duration,
    totalTime: config.phases[0].duration,
    running: false,
    finished: false
  };

  renderTimer();
}

function renderTimer() {
  const ts = state.timerState;
  if (!ts) return;

  const area = document.getElementById('timerArea');
  const phase = ts.config.phases[ts.currentPhase];
  const circumference = 2 * Math.PI * 120;
  const progress = ts.timeRemaining / ts.totalTime;
  const offset = circumference * (1 - progress);
  
  const mins = Math.floor(ts.timeRemaining / 60);
  const secs = ts.timeRemaining % 60;
  const timeStr = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  
  const pctRemaining = (ts.timeRemaining / ts.totalTime) * 100;
  let ringClass = '';
  let timeClass = '';
  if (pctRemaining <= 10) { ringClass = 'danger'; timeClass = 'danger'; }
  else if (pctRemaining <= 25) { ringClass = 'warning'; timeClass = 'warning'; }

  area.innerHTML = `
    <div class="timer-container">
      <h3 style="font-family:var(--font-display);text-align:center;margin-bottom:8px">${ts.config.title}</h3>
      <p class="text-center text-secondary mb-lg">${phase.name}${ts.config.phases.length > 1 ? ` (Phase ${ts.currentPhase + 1}/${ts.config.phases.length})` : ''}</p>
      
      <div class="comp-timer-ring">
        <svg viewBox="0 0 260 260">
          <circle class="ring-bg" cx="130" cy="130" r="120" />
          <circle class="ring-progress ${ringClass}" cx="130" cy="130" r="120" 
            stroke-dasharray="${circumference}" 
            stroke-dashoffset="${offset}" />
        </svg>
        <div class="comp-timer-ring-text">
          <div class="time ${timeClass}">${timeStr}</div>
          <div class="label">${ts.finished ? 'Time\'s Up!' : (ts.running ? 'Running' : 'Paused')}</div>
        </div>
      </div>

      <div class="timer-controls">
        ${!ts.finished ? `
          <button class="btn ${ts.running ? 'btn-secondary' : 'btn-primary'}" onclick="toggleTimer()">
            ${ts.running ? '⏸ Pause' : '▶ Start'}
          </button>
          <button class="btn btn-secondary" onclick="resetTimer()">↺ Reset</button>
        ` : `
          ${ts.currentPhase < ts.config.phases.length - 1 ? 
            `<button class="btn btn-primary" onclick="nextTimerPhase()">Next Phase →</button>` :
            `<button class="btn btn-primary" onclick="resetTimer()">↺ Start Over</button>`
          }
        `}
      </div>

      ${ts.type === 'custom' ? `
        <div class="timer-presets">
          <button class="timer-preset" onclick="setCustomTime(300)">5 min</button>
          <button class="timer-preset" onclick="setCustomTime(600)">10 min</button>
          <button class="timer-preset" onclick="setCustomTime(900)">15 min</button>
          <button class="timer-preset" onclick="setCustomTime(1200)">20 min</button>
          <button class="timer-preset" onclick="setCustomTime(1800)">30 min</button>
          <button class="timer-preset" onclick="setCustomTime(3600)">60 min</button>
        </div>` : ''}
    </div>`;
}

function toggleTimer() {
  const ts = state.timerState;
  if (!ts) return;

  if (ts.running) {
    clearInterval(timerInterval);
    timerInterval = null;
    ts.running = false;
  } else {
    ts.running = true;
    timerInterval = setInterval(() => {
      ts.timeRemaining--;
      if (ts.timeRemaining <= 0) {
        ts.timeRemaining = 0;
        ts.running = false;
        ts.finished = true;
        clearInterval(timerInterval);
        timerInterval = null;
        // Play a subtle alert
        try { 
          const ctx = new (window.AudioContext || window.webkitAudioContext)();
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.frequency.value = 800;
          gain.gain.value = 0.3;
          osc.start();
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
          osc.stop(ctx.currentTime + 0.5);
        } catch(e) {}
      }
      renderTimer();
    }, 1000);
  }
  renderTimer();
}

function resetTimer() {
  const ts = state.timerState;
  if (!ts) return;
  
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  
  ts.currentPhase = 0;
  ts.timeRemaining = ts.config.phases[0].duration;
  ts.totalTime = ts.config.phases[0].duration;
  ts.running = false;
  ts.finished = false;
  renderTimer();
}

function nextTimerPhase() {
  const ts = state.timerState;
  if (!ts) return;
  
  ts.currentPhase++;
  if (ts.currentPhase < ts.config.phases.length) {
    ts.timeRemaining = ts.config.phases[ts.currentPhase].duration;
    ts.totalTime = ts.config.phases[ts.currentPhase].duration;
    ts.running = false;
    ts.finished = false;
    renderTimer();
  }
}

function setCustomTime(seconds) {
  const ts = state.timerState;
  if (!ts) return;
  
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  
  ts.config.phases[0].duration = seconds;
  ts.timeRemaining = seconds;
  ts.totalTime = seconds;
  ts.running = false;
  ts.finished = false;
  renderTimer();
}

// ==========================================
// PREP SYSTEM
// ==========================================

function showPrep(type) {
  const area = document.getElementById('prepArea');
  area.classList.remove('hidden');
  
  const prepContent = {
    general: {
      title: '📋 General Competition Checklist',
      description: 'Universal preparation items every FBLA competitor needs.',
      items: [
        'Register for your event(s) before the deadline',
        'Review the official FBLA competitive event guidelines',
        'Confirm your competition schedule, times, and room locations',
        'Prepare professional business attire (suit, dress shoes, etc.)',
        'Pack your FBLA membership card and valid student ID',
        'Bring necessary supplies (pencils, calculator, laptop, etc.)',
        'Review the judging rubric for your specific event',
        'Get plenty of rest the night before competition',
        'Eat a nutritious breakfast on competition day',
        'Arrive at least 15 minutes early to your event',
        'Silence your phone and all electronic devices',
        'Bring water and a snack for between events',
        'Know the location of your next event before leaving the current one',
        'Thank the judges after your event is complete',
        'Support your chapter members in their events'
      ]
    },
    objective: {
      title: '📝 Objective Test Preparation',
      description: 'Strategies and rubric information for objective test events.',
      rubric: [
        { criteria: 'Knowledge', desc: 'Understanding of subject matter and key concepts', weight: '100%' }
      ],
      items: [
        'Study the official competency list for your event',
        'Take multiple full-length practice tests under timed conditions',
        'Review questions you got wrong and understand why',
        'Focus on areas where you consistently score lower',
        'Study current industry trends and recent developments',
        'Use flashcards for key terms and definitions',
        'Practice with a study group to fill knowledge gaps',
        'Time yourself — you need to average about 1 minute per question',
        'Read questions carefully — watch for "NOT" and "EXCEPT"',
        'If unsure, eliminate obviously wrong answers first',
        'Don\'t change your answer unless you\'re certain — first instinct is usually right',
        'Review your answers if time permits'
      ]
    },
    presentation: {
      title: '🎤 Presentation Event Preparation',
      description: 'Rubric criteria and strategies for presentation events.',
      rubric: [
        { criteria: 'Content', desc: 'Depth, accuracy, and relevance of information', weight: '30%' },
        { criteria: 'Organization', desc: 'Logical flow, clear structure, transitions', weight: '20%' },
        { criteria: 'Delivery', desc: 'Eye contact, voice, gestures, confidence', weight: '25%' },
        { criteria: 'Visual Aids', desc: 'Quality, relevance, and professionalism of materials', weight: '15%' },
        { criteria: 'Q&A', desc: 'Ability to answer judge questions thoroughly', weight: '10%' }
      ],
      items: [
        'Create a clear outline: Introduction → Main Points → Conclusion',
        'Practice your presentation at least 5 times before competition',
        'Time yourself to ensure you stay within the time limit',
        'Prepare professional visual aids (slides, handouts, etc.)',
        'Practice in front of others and get feedback',
        'Prepare for potential judge questions',
        'Use the STAR method for examples (Situation, Task, Action, Result)',
        'Make eye contact with all judges, not just one',
        'Speak clearly and at a measured pace',
        'End with a strong conclusion and call to action'
      ]
    },
    roleplay: {
      title: '🎭 Role Play Event Preparation',
      description: 'Rubric criteria and strategies for role play events.',
      rubric: [
        { criteria: 'Understanding', desc: 'Demonstrates clear understanding of the situation', weight: '20%' },
        { criteria: 'Problem Solving', desc: 'Identifies problems and proposes effective solutions', weight: '25%' },
        { criteria: 'Communication', desc: 'Professional, clear, and persuasive communication', weight: '25%' },
        { criteria: 'Professionalism', desc: 'Professional demeanor, composure, and appearance', weight: '15%' },
        { criteria: 'Q&A', desc: 'Responds to judge questions effectively', weight: '15%' }
      ],
      items: [
        'Practice reading and analyzing case studies quickly (within 10 minutes)',
        'Develop a consistent framework: Problem → Analysis → Solution → Implementation',
        'Practice speaking for the full 7 minutes without running out of content',
        'Learn to address the judge as the character in the scenario',
        'Prepare examples and data points you can use in any scenario',
        'Practice handling unexpected follow-up questions',
        'Work on your professional introduction and closing',
        'Study common business scenarios and best practices',
        'Practice with a partner playing the judge role',
        'Record yourself and review for areas of improvement'
      ]
    },
    production: {
      title: '💻 Production Test Preparation',
      description: 'Tips and strategies for computer-based production events.',
      rubric: [
        { criteria: 'Accuracy', desc: 'Correctness of completed tasks', weight: '40%' },
        { criteria: 'Formatting', desc: 'Proper formatting and layout', weight: '25%' },
        { criteria: 'Completeness', desc: 'All required tasks are completed', weight: '25%' },
        { criteria: 'Efficiency', desc: 'Work completed within time limit', weight: '10%' }
      ],
      items: [
        'Master keyboard shortcuts for the software being used',
        'Practice production tasks under strict time limits',
        'Learn all formatting rules (margins, fonts, spacing, etc.)',
        'Practice common tasks: mail merge, formulas, formatting',
        'Know how to save files in required formats',
        'Familiarize yourself with the competition computer setup',
        'Practice proofreading your work quickly',
        'Learn to prioritize — complete high-value tasks first',
        'Have a system for organizing your work files',
        'Practice with sample tests from previous years'
      ]
    },
    speaking: {
      title: '🗣️ Speaking Event Preparation',
      description: 'Rubric criteria and strategies for public speaking events.',
      rubric: [
        { criteria: 'Content', desc: 'Quality, depth, and relevance of speech content', weight: '25%' },
        { criteria: 'Organization', desc: 'Clear introduction, body, and conclusion', weight: '20%' },
        { criteria: 'Delivery', desc: 'Voice quality, eye contact, gestures', weight: '30%' },
        { criteria: 'Effectiveness', desc: 'Overall impact and persuasiveness', weight: '15%' },
        { criteria: 'Time Management', desc: 'Appropriate use of allotted time', weight: '10%' }
      ],
      items: [
        'Write your speech with a clear thesis and 3 supporting points',
        'Practice until you can deliver without reading from notes',
        'Time your speech — aim for the middle of the time range',
        'Record yourself and listen for filler words (um, uh, like)',
        'Practice vocal variety — change pace, volume, and tone',
        'Use the power of the pause — don\'t rush through key points',
        'Practice confident body language and natural gestures',
        'Make eye contact with different areas of the audience',
        'Start with a strong hook and end with a memorable closing',
        'Practice in front of different audiences for feedback'
      ]
    }
  };

  const content = prepContent[type];
  if (!content) return;

  const checklistId = `prep-${type}`;

  area.innerHTML = `
    <div class="glass-card-flat" style="padding:32px">
      <h3 style="font-family:var(--font-display);font-size:1.5rem;margin-bottom:8px">${content.title}</h3>
      <p class="text-secondary mb-lg">${content.description}</p>

      ${content.rubric ? `
        <h4 style="font-family:var(--font-display);margin-bottom:12px">📊 Evaluation Rubric</h4>
        <table class="rubric-table mb-xl">
          <thead>
            <tr><th>Criteria</th><th>Description</th><th>Weight</th></tr>
          </thead>
          <tbody>
            ${content.rubric.map(r => `
              <tr><td><strong>${r.criteria}</strong></td><td>${r.desc}</td><td>${r.weight}</td></tr>
            `).join('')}
          </tbody>
        </table>
      ` : ''}

      <h4 style="font-family:var(--font-display);margin-bottom:12px">✅ Preparation Checklist</h4>
      <div class="prep-checklist">
        ${content.items.map((item, i) => {
          const key = `${checklistId}-${i}`;
          const checked = state.checkedItems[key];
          return `
            <div class="prep-item ${checked ? 'checked' : ''}" onclick="toggleCheckItem('${key}', this)">
              <div class="prep-checkbox">${checked ? '✓' : ''}</div>
              <div class="prep-item-text">${item}</div>
            </div>`;
        }).join('')}
      </div>
    </div>`;

  // Scroll to prep area
  area.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ==========================================
// STUDY PLANNER
// ==========================================

function renderStudyPlanner() {
  const container = document.getElementById('studyContent');
  const progress = state.studyProgress;
  const entries = Object.entries(progress).sort((a, b) => new Date(b[1].lastDate) - new Date(a[1].lastDate));

  container.innerHTML = `
    <div class="stats-grid mb-xl">
      <div class="glass-card-flat stat-card">
        <div class="stat-number blue">${entries.length}</div>
        <div class="stat-label">Categories Practiced</div>
      </div>
      <div class="glass-card-flat stat-card">
        <div class="stat-number purple">${entries.reduce((s, [, v]) => s + v.attempts, 0)}</div>
        <div class="stat-label">Total Attempts</div>
      </div>
      <div class="glass-card-flat stat-card">
        <div class="stat-number green">${entries.length > 0 ? Math.round(entries.reduce((s, [, v]) => s + v.lastScore, 0) / entries.length) : 0}%</div>
        <div class="stat-label">Average Score</div>
      </div>
      <div class="glass-card-flat stat-card">
        <div class="stat-number orange">${Object.keys(QUIZ_DATA).length - entries.length}</div>
        <div class="stat-label">Categories Remaining</div>
      </div>
    </div>

    ${entries.length > 0 ? `
      <h3 style="font-family:var(--font-display);margin-bottom:16px">📊 Your Progress</h3>
      <div class="events-grid mb-xl">
        ${entries.map(([cat, data]) => `
          <div class="glass-card event-card" onclick="startQuiz('${cat}')">
            <h4>${cat}</h4>
            <div class="event-category">Last score: ${data.lastScore}% · ${data.attempts} attempt${data.attempts !== 1 ? 's' : ''}</div>
            <div class="event-indicators">
              <span class="event-indicator ${data.lastScore >= 75 ? '' : 'roleplay'}">${data.lastScore >= 75 ? '✓ Good' : '↻ Review'}</span>
            </div>
          </div>
        `).join('')}
      </div>
    ` : ''}

    <h3 style="font-family:var(--font-display);margin-bottom:16px">📚 Not Yet Practiced</h3>
    <div class="events-grid">
      ${Object.keys(QUIZ_DATA).filter(cat => !progress[cat]).sort().map(cat => `
        <div class="glass-card event-card" onclick="startQuiz('${cat}')">
          <span class="event-type-badge">📝 ${QUIZ_DATA[cat].length} questions</span>
          <h4>${cat}</h4>
          <div class="event-category">Not yet attempted</div>
        </div>
      `).join('')}
    </div>`;
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

function sanitize(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// ==========================================
// INITIALIZATION
// ==========================================

// Navbar scroll effect
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 10) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Close mobile menu on outside click
document.addEventListener('click', (e) => {
  const menu = document.getElementById('mobileMenu');
  const hamburger = document.getElementById('hamburger');
  if (menu.classList.contains('open') && !menu.contains(e.target) && !hamburger.contains(e.target)) {
    closeMobileMenu();
  }
});

// Keyboard navigation for flashcards
document.addEventListener('keydown', (e) => {
  if (state.flashcardState) {
    if (e.key === 'ArrowRight') nextFlashcard();
    else if (e.key === 'ArrowLeft') prevFlashcard();
    else if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); flipFlashcard(); }
  }
});

console.log('FBLA Study Hub loaded successfully!');
console.log(`${EVENTS.length} events · ${Object.keys(QUIZ_DATA).length} quiz categories · ${Object.values(QUIZ_DATA).reduce((s, q) => s + q.length, 0)} questions`);
