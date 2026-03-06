/* ─── roleplay.js ─── Roleplay system, voice practice, and competition timer. ─── */

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
