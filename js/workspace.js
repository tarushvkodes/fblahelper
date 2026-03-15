/* ─── workspace.js ─── Flashcards, prep, stats, history, streak, missed questions, resources. ─── */

function buildFlashcards(eventName) {
  const sourceDeck = state.flash.mode === "missed"
    ? loadMissedQuestions(eventName)
    : state.flash.mode === "spaced"
      ? getSpacedReviewDeck(eventName)
      : getDeckForMode(eventName, getQuizBankMode());
  const base = sourceDeck.slice(0, FLASHCARD_DECK_LIMIT).map(shuffleOptions);
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
  document.getElementById("flashDeckTitle").textContent = `${eventName} — ${state.flash.mode === "missed" ? "Missed" : state.flash.mode === "spaced" ? "Spaced Review" : "Flashcards"}`;
  document.getElementById("flashOfficialBtn")?.classList.toggle("active-confidence", state.flash.mode === "quiz");
  document.getElementById("flashMissedBtn")?.classList.toggle("active-confidence", state.flash.mode === "missed");
  document.getElementById("flashSpacedBtn")?.classList.toggle("active-confidence", state.flash.mode === "spaced");
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
const APP_PREFS_KEY = "fbla-app-prefs";
const BOOKMARKS_KEY = "fbla-bookmarks";
const QUESTION_REPORTS_KEY = "fbla-question-reports";
const CONFIDENCE_LOG_KEY = "fbla-confidence-log";
const SPACED_REVIEW_KEY = "fbla-spaced-review";

function loadAppPrefs() {
  return readStorage(APP_PREFS_KEY, {});
}

function saveAppPrefs(prefs) {
  writeStorage(APP_PREFS_KEY, { ...loadAppPrefs(), ...prefs });
}

function loadBookmarks() {
  return readStorage(BOOKMARKS_KEY, {});
}

function isQuestionBookmarked(eventName, question) {
  return Boolean(loadBookmarks()[questionStorageId(eventName, question)]);
}

function toggleBookmarkedQuestion(eventName, question) {
  const bookmarks = loadBookmarks();
  const id = questionStorageId(eventName, question);
  if (bookmarks[id]) delete bookmarks[id];
  else {
    bookmarks[id] = {
      event: eventName,
      q: question.q,
      savedAt: Date.now(),
      source: question.source || ""
    };
  }
  writeStorage(BOOKMARKS_KEY, bookmarks);
}

function loadQuestionReports() {
  return readStorage(QUESTION_REPORTS_KEY, []);
}

function reportQuestionIssue(eventName, question, reportType) {
  const reports = loadQuestionReports();
  reports.push({
    id: questionStorageId(eventName, question),
    event: eventName,
    q: question.q,
    type: reportType,
    source: question.source || "",
    timestamp: Date.now()
  });
  writeStorage(QUESTION_REPORTS_KEY, reports.slice(-250));
}

function loadConfidenceLog() {
  return readStorage(CONFIDENCE_LOG_KEY, {});
}

function saveQuestionConfidence(eventName, question, confidence) {
  const log = loadConfidenceLog();
  log[questionStorageId(eventName, question)] = {
    event: eventName,
    q: question.q,
    confidence,
    timestamp: Date.now()
  };
  writeStorage(CONFIDENCE_LOG_KEY, log);
}

function getSavedQuestionConfidence(eventName, question) {
  return loadConfidenceLog()[questionStorageId(eventName, question)]?.confidence || "";
}

function loadSpacedReview() {
  return readStorage(SPACED_REVIEW_KEY, {});
}

function scheduleSpacedReviewItem(eventName, question, confidence, wasCorrect) {
  const queue = loadSpacedReview();
  const id = questionStorageId(eventName, question);
  const existing = queue[id] || { intervalDays: 1, streak: 0 };
  const hard = !wasCorrect || confidence === "guess" || confidence === "unsure";
  const nextInterval = hard ? 1 : Math.min((existing.intervalDays || 1) * 2, 21);
  queue[id] = {
    event: eventName,
    q: question.q,
    options: question.options,
    answer: question.answer,
    explain: question.explain || "",
    optionExplanations: question.optionExplanations || [],
    source: question.source || "",
    confidence: confidence || "",
    streak: hard ? 0 : (existing.streak || 0) + 1,
    intervalDays: nextInterval,
    dueAt: Date.now() + nextInterval * 86400000,
    updatedAt: Date.now()
  };
  writeStorage(SPACED_REVIEW_KEY, queue);
}

function getSpacedReviewDeck(eventName) {
  const now = Date.now();
  return Object.values(loadSpacedReview())
    .filter((item) => item.event === eventName && (!item.dueAt || item.dueAt <= now));
}

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

  renderMasterySnapshots();
  renderReportQueue();
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
  renderStudyQueue(state.currentEvent);
  renderSavedStudy(state.currentEvent);
  renderQuestionOfDay(state.currentEvent);
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

function getQuestionOfDay(eventName) {
  const deck = getDeckForMode(eventName, "hq-ai");
  if (!deck.length) return null;
  const today = todayStr().replace(/-/g, "");
  const seed = Number(today.slice(-4)) + eventName.length;
  return deck[seed % deck.length];
}

function renderQuestionOfDay(eventName) {
  const promptEl = document.getElementById("questionOfDayPrompt");
  const metaEl = document.getElementById("questionOfDayMeta");
  if (!promptEl || !metaEl || !eventName) return;
  const question = getQuestionOfDay(eventName);
  if (!question) {
    promptEl.textContent = "No question available for this event yet.";
    metaEl.textContent = "";
    return;
  }
  promptEl.textContent = question.q;
  metaEl.textContent = `${todayStr()} · ${question.source || "study bank"}`;
}

function adaptiveDeckForEvent(eventName) {
  const missed = loadMissedQuestions(eventName);
  const spaced = getSpacedReviewDeck(eventName);
  const bookmarks = Object.values(loadBookmarks()).filter((item) => item.event === eventName)
    .map((item) => getDeckForMode(eventName, "hq-ai").find((q) => norm(q.q) === norm(item.q)))
    .filter(Boolean);
  const confidenceEntries = Object.values(loadConfidenceLog())
    .filter((item) => item.event === eventName && item.confidence !== "sure")
    .map((item) => getDeckForMode(eventName, "hq-ai").find((q) => norm(q.q) === norm(item.q)))
    .filter(Boolean);
  return dedupeDeck([...spaced, ...missed, ...confidenceEntries, ...bookmarks]);
}

function renderStudyQueue(eventName) {
  const el = document.getElementById("studyQueueStats");
  if (!el || !eventName) return;
  const adaptive = adaptiveDeckForEvent(eventName);
  const spaced = getSpacedReviewDeck(eventName);
  const missed = loadMissedQuestions(eventName);
  el.innerHTML = [
    { label: "Adaptive drill", value: `${adaptive.length} queued` },
    { label: "Spaced review", value: `${spaced.length} due now` },
    { label: "Missed bank", value: `${missed.length} saved` }
  ].map((item) => `<div class="stacked-stat"><strong>${item.label}</strong><span>${item.value}</span></div>`).join("");
}

function renderSavedStudy(eventName) {
  const el = document.getElementById("savedStudyStats");
  if (!el || !eventName) return;
  const bookmarks = Object.values(loadBookmarks()).filter((item) => item.event === eventName);
  const reports = loadQuestionReports().filter((item) => item.event === eventName);
  const confidence = Object.values(loadConfidenceLog()).filter((item) => item.event === eventName && item.confidence !== "sure");
  el.innerHTML = [
    { label: "Bookmarks", value: `${bookmarks.length} saved` },
    { label: "Reported items", value: `${reports.length} flagged` },
    { label: "Low-confidence", value: `${confidence.length} to revisit` }
  ].map((item) => `<div class="stacked-stat"><strong>${item.label}</strong><span>${item.value}</span></div>`).join("");
}

function exportEventSummary(eventName) {
  const history = loadHistory().filter((item) => item.event === eventName);
  const summary = {
    event: eventName,
    generatedAt: new Date().toISOString(),
    history,
    missedQuestions: loadMissedQuestions(eventName),
    bookmarks: Object.values(loadBookmarks()).filter((item) => item.event === eventName),
    reports: loadQuestionReports().filter((item) => item.event === eventName),
    spacedReviewDue: getSpacedReviewDeck(eventName)
  };
  downloadTextFile(`fbla-${norm(eventName).replace(/\s+/g, "-")}-summary.json`, JSON.stringify(summary, null, 2), "application/json");
}

function renderMasterySnapshots() {
  const el = document.getElementById("eventMasteryGrid");
  if (!el) return;
  const history = loadHistory();
  const grouped = {};
  history.forEach((entry) => {
    if (!grouped[entry.event]) grouped[entry.event] = [];
    grouped[entry.event].push(entry.score);
  });
  const rows = Object.entries(grouped)
    .map(([event, scores]) => ({ event, avg: Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length) }))
    .sort((a, b) => b.avg - a.avg)
    .slice(0, 6);
  el.innerHTML = rows.length
    ? rows.map((item) => `<div class="stacked-stat"><strong>${item.event}</strong><span>${item.avg}%</span></div>`).join("")
    : "<p class='module-note'>Take a few exams to build mastery snapshots.</p>";
}

function renderReportQueue() {
  const el = document.getElementById("reportQueueList");
  if (!el) return;
  const reports = loadQuestionReports().slice(-6).reverse();
  el.innerHTML = reports.length
    ? reports.map((item) => `<div class="stacked-stat"><strong>${item.event}</strong><span>${item.type}</span></div>`).join("")
    : "<p class='module-note'>No locally reported questions yet.</p>";
}

/* ─── Resource Document Links ─── */

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
    "format-guide": "Format & Event Guides",
    "general": "FBLA-Wide Study Guides",
    "resource": "Other Resources"
  };
  const categoryOrder = ["sample-test", "study-guide", "competencies", "past-test", "roleplay", "production", "reference", "format-guide", "general", "resource"];

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
