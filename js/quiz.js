/* ─── quiz.js ─── Quiz engine: start, render, score, submit, AI tutoring prompts. ─── */

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

function stopQuizTimer() {
  if (state.quiz.timerId) {
    clearInterval(state.quiz.timerId);
    state.quiz.timerId = null;
  }
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
