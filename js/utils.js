/* ─── utils.js ─── Shared utility functions. No DOM access, no state. ─── */

/* --- Haptic feedback (progressive enhancement, no-op on unsupported devices) --- */
function haptic(preset) {
  try { window.__haptics?.trigger(preset); } catch (_) {}
}

function scoreVerdict(pct) {
  if (pct >= SCORE_THRESHOLD_NATIONALS) return "Nationals pace";
  if (pct >= SCORE_THRESHOLD_SOLID) return "Solid";
  return "Needs work";
}

function scoreCssClass(pct) {
  if (pct >= SCORE_THRESHOLD_NATIONALS) return "answer-good";
  if (pct >= SCORE_THRESHOLD_SOLID) return "";
  return "answer-bad";
}

function scoreChartColor(pct) {
  if (pct >= SCORE_THRESHOLD_NATIONALS) return "var(--signal)";
  if (pct >= SCORE_THRESHOLD_SOLID) return "var(--ink-soft)";
  return "var(--accent)";
}

function norm(s) {
  return (s || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function cleanStudyText(text) {
  return String(text || "")
    .replace(/adapted from the official sample question set\.?/gi, "")
    .replace(/adapted from (the )?original set\.?/gi, "")
    .replace(/source document:\s*[^.]+\.?/gi, "")
    .replace(/grounded in [^.]+\.?/gi, "")
    .replace(/\s+/g, " ")
    .trim();
}

async function copyTextWithFeedback(text, successTarget, successMessage, failureMessage) {
  if (!text) return;

  try {
    await navigator.clipboard.writeText(text);
    haptic("success");
    successTarget.textContent = successMessage;
  } catch (err) {
    haptic("error");
    successTarget.textContent = failureMessage;
  }
}

function cleanRoleplayLabel(value) {
  return String(value || "")
    .replace(/^\s*PERFORMANCE INDICATORS\s*$/i, "")
    .replace(/\s+/g, " ")
    .trim();
}

function setControlVisibility(el, show) {
  if (!el) return;
  el.classList.toggle("is-hidden", !show);
}

function shuffle(arr) {
  const copy = arr.slice();
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function formatTimer(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function debounce(fn, ms) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}
