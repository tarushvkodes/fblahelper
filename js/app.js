/* ─── app.js ─── Main entry: state, DOM caches, UI binding, event navigation, and init. ─── */

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
