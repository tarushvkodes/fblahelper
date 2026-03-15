from __future__ import annotations

import json
import re
import subprocess
import sys
from collections import defaultdict
from pathlib import Path
from typing import Iterable
from xml.etree import ElementTree as ET
from zipfile import ZipFile


ROOT = Path(__file__).resolve().parent
FBLA_RESOURCES = ROOT / "fblaresources"
OBJECTIVE_DIR = FBLA_RESOURCES / "objective tests"
ROLEPLAY_DIR = FBLA_RESOURCES / "sample roleplays"
PRODUCTION_DIR = FBLA_RESOURCES / "production test"
OUTPUT_PATH = ROOT / "resource_data.js"

PDFTOTEXT_CANDIDATES = [
    Path(r"C:\Users\tarus\AppData\Local\Programs\MiKTeX\miktex\bin\x64\pdftotext.exe"),
    Path("pdftotext.exe"),
    Path("pdftotext"),
]

EVENT_ALIASES = {
    "banking and financial systems": "Banking & Financial Systems",
    "banking financial systems": "Banking & Financial Systems",
    "sports and entertainment management": "Sports & Entertainment Management",
    "sports entertainment management": "Sports & Entertainment Management",
    "insurance and risk management": "Insurance & Risk Management",
    "insurance risk management": "Insurance & Risk Management",
    "public administration management": "Public Administration & Management",
    "hospitality event management": "Hospitality & Event Management",
    "computer applications production": "Computer Applications",
    "data science ai": "Data Science & AI",
    "introduction to fbla": "Introduction to FBLA",
    "intro to fbla": "Introduction to FBLA",
    "intro to business communication": "Introduction to Business Communication",
    "intro to business concepts": "Introduction to Business Concepts",
    "intro to business procedures": "Introduction to Business Procedures",
    "intro to information technology": "Introduction to Information Technology",
    "intro to marketing concepts": "Introduction to Marketing Concepts",
    "intro to parli pro": "Introduction to Parliamentary Procedure",
    "introduction to event planning": "Event Planning",
    "intro to retail merchandising": "Introduction to Retail & Merchandising",
    "intro to supply chain management": "Introduction to Supply Chain Management",
    "technology support services": "Technology Support & Services",
    "human resource management": "Human Resource Management",
}

ROLEPLAY_HEADINGS = {
    "participant instructions": "instructions",
    "competitor instructions": "instructions",
    "performance indicators": "indicators",
    "role play situation": "roleplay",
    "background": "background",
    "background information": "background",
    "situation": "situation",
    "scenario": "scenario",
    "tasks": "tasks",
    "things to consider": "consider",
    "objectives of role play": "objectives",
    "objectives of roleplay": "objectives",
    "objectives": "objectives",
}

OBJECTIVE_SECTION_HEADINGS = [
    "Business Environment",
    "Management Types",
    "Business Finance",
    "Strategic Management",
    "Networks & Telecommunications",
    "Government Regulations",
    "Financial Needs and Goals",
    "Price Planning",
    "Marketing",
    "Higher-Order Application",
    "Reading Comprehension",
    "Verbal & Nonverbal Communication",
    "Spelling",
    "Contracts and Sales",
    "Consumer Protection",
    "Computer Law",
    "Global Trade",
    "Product/Service Management",
    "History of Journalism",
    "Leadership Skills",
    "Applied Ethics Scenarios",
    "Networks",
    "Security Protocols and Threat Mitigation",
    "Privacy and Ethics",
    "Law & Ethics",
    "Security & Ethics",
    "Professionalism and Ethics",
    "Business Operations",
    "Communication Skills",
    "Technology Concepts",
    "Decision Making/Management",
    "Career Development",
    "Product Portfolio Management",
    "Federal Reserve, Payments & Operations",
    "Careers & Professional Development",
    "Decision Making",
    "VI. Taxes & Government Regulations",
]

HEADING_CONNECTORS = {"&", "/", "and", "of", "the", "to", "for", "in", "on", "with"}


def normalize_key(value: str) -> str:
    return re.sub(r"[^a-z0-9]+", " ", value.lower()).strip()


def clean_whitespace(value: str) -> str:
    return re.sub(r"\s+", " ", value).strip()


def find_pdftotext() -> str:
    for candidate in PDFTOTEXT_CANDIDATES:
        if candidate.exists():
            return str(candidate)
        if len(candidate.parts) == 1:
            return str(candidate)
    raise FileNotFoundError("Could not find pdftotext. Install it or update PDFTOTEXT_CANDIDATES.")


PDFTOTEXT = find_pdftotext()


def pdf_to_text(path: Path) -> str:
    result = subprocess.run(
        [PDFTOTEXT, "-layout", str(path), "-"],
        check=True,
        capture_output=True,
        text=True,
        encoding="utf-8",
        errors="ignore",
    )
    return result.stdout


def docx_to_paragraphs(path: Path) -> list[str]:
    with ZipFile(path) as archive:
        xml = archive.read("word/document.xml")
    root = ET.fromstring(xml)
    ns = {"w": "http://schemas.openxmlformats.org/wordprocessingml/2006/main"}
    paragraphs: list[str] = []
    for node in root.findall(".//w:p", ns):
        pieces = [part.text for part in node.findall(".//w:t", ns) if part.text]
        text = clean_whitespace("".join(pieces))
        if text:
            paragraphs.append(text)
    return paragraphs


def pdf_to_paragraphs(path: Path) -> list[str]:
    raw = pdf_to_text(path).replace("\f", "\n")
    paragraphs: list[str] = []
    current: list[str] = []
    for line in raw.splitlines():
        text = clean_whitespace(line)
        if not text:
            if current:
                paragraphs.append(" ".join(current).strip())
                current = []
            continue
        current.append(text)
    if current:
        paragraphs.append(" ".join(current).strip())
    return paragraphs


def clean_parser_noise(text: str) -> str:
    cleaned = text.replace("\f", "\n")
    cleaned = cleaned.replace("’", "'").replace("“", '"').replace("”", '"').replace("—", "-")
    lines = []
    for raw in cleaned.splitlines():
        line = clean_whitespace(raw)
        if not line:
            lines.append("")
            continue
        if re.fullmatch(r"page \d+", line.lower()):
            continue
        if line.lower().startswith("disclaimer:"):
            continue
        if "www.fbla.org" in line.lower():
            continue
        lines.append(line)
    return "\n".join(lines)


def strip_objective_heading_suffix(text: str) -> str:
    cleaned = clean_whitespace(text)
    for heading in OBJECTIVE_SECTION_HEADINGS:
        if " " in heading or "&" in heading or "/" in heading or "." in heading:
            cleaned = re.sub(rf"\s+{re.escape(heading)}$", "", cleaned, flags=re.I)
            continue
        suffix_match = re.search(rf"^(.*)\s+({re.escape(heading)})$", cleaned, flags=re.I)
        if not suffix_match:
            continue
        prefix = clean_whitespace(suffix_match.group(1))
        prefix_words = prefix.split()
        if (
            prefix
            and len(prefix_words) <= 4
            and not re.search(r"[,;:]", prefix)
            and prefix_words[-1].lower() not in HEADING_CONNECTORS
        ):
            cleaned = prefix
    return clean_whitespace(cleaned)


def looks_like_heading_line(text: str) -> bool:
    candidate = clean_whitespace(text)
    if not candidate or len(candidate) > 80:
        return False
    if candidate.endswith((".", "?", "!", ":")):
        return False
    bare = re.sub(r"^[IVXLC]+\.\s*", "", candidate)
    bare = re.sub(r"^[0-9]+\.\s*", "", bare)
    words = bare.split()
    if not words:
        return False

    titled = 0
    for word in words:
      if word.lower() in HEADING_CONNECTORS:
          continue
      if re.fullmatch(r"[A-Z0-9/&-]+", word):
          titled += 1
          continue
      if word[:1].isupper():
          titled += 1
          continue
      return False

    return titled >= 1


def clean_option_text(raw: str) -> str:
    lines = [clean_whitespace(line) for line in str(raw).splitlines() if clean_whitespace(line)]
    while len(lines) > 1 and looks_like_heading_line(lines[-1]):
        lines.pop()
    return strip_objective_heading_suffix(" ".join(lines))


def canonical_event_name(raw: str) -> str:
    value = raw.replace("&", " and ")
    value = re.sub(r"^\s*fbla\b", "", value, flags=re.I)
    value = re.sub(r"\bsample\b", "", value, flags=re.I)
    value = re.sub(r"\bquestions?\b", "", value, flags=re.I)
    value = re.sub(r"\brole\s*play\b", "", value, flags=re.I)
    value = re.sub(r"\bproduction\s*test\b", "", value, flags=re.I)
    value = re.sub(r"\btest\b", "", value, flags=re.I)
    value = value.replace("---", " ").replace("--", " ").replace("-", " ").replace("_", " ")
    value = clean_whitespace(value)
    value = re.sub(r"\(\d+\)$", "", value).strip()
    value = re.sub(r"\b\d+\b$", "", value).strip()
    key = normalize_key(value)
    if key in EVENT_ALIASES:
        return EVENT_ALIASES[key]
    words = []
    for part in value.split():
        if part.upper() in {"FBLA", "AI"}:
            words.append(part.upper())
        else:
            words.append(part.capitalize())
    return " ".join(words)


def parse_answer_key(text: str) -> dict[int, int]:
    match = re.search(r"answer key(.*)$", text, flags=re.I | re.S)
    answers: dict[int, int] = {}
    if match:
        for number, letter in re.findall(r"(\d+)[\.\)]\s*([A-D])\b", match.group(1), flags=re.I):
            answers[int(number)] = ord(letter.upper()) - 65
    if answers:
        return answers

    for number, letter in re.findall(r"(?mi)^\s*(\d+)[\.\)]\s*([A-D])\s*$", text):
        answers[int(number)] = ord(letter.upper()) - 65
    return answers


def parse_options(block: str) -> tuple[str, list[str]]:
    option_matches = list(
        re.finditer(r"(?mis)^\s*([A-Da-d])[\.\)]\s+(.*?)(?=^\s*[A-Da-d][\.\)]\s+|\Z)", block)
    )
    if len(option_matches) != 4:
        return "", []
    prompt = clean_whitespace(block[: option_matches[0].start()])
    options = [clean_option_text(match.group(2)) for match in option_matches]
    return prompt, options


def build_option_explanations(options: list[str], answer_index: int) -> list[str]:
    explanations = []
    for index, option in enumerate(options):
        if index == answer_index:
            explanations.append(f"Correct. {option} matches the official FBLA HQ answer key.")
        else:
            explanations.append(f"Not correct. {option} is not the keyed answer in the FBLA HQ sample set.")
    return explanations


def parse_objective_pdf(path: Path) -> tuple[str, list[dict]]:
    text = clean_parser_noise(pdf_to_text(path))
    answers = parse_answer_key(text)
    question_zone_match = re.search(r"^\s*1[\.\)]\s+", text, flags=re.M)
    answer_zone_match = re.search(r"^\s*answer key\b", text, flags=re.I | re.M)
    if not question_zone_match:
        raise ValueError(f"Could not locate first question in {path.name}")
    question_zone = text[question_zone_match.start() : answer_zone_match.start() if answer_zone_match else len(text)]

    questions: list[dict] = []
    for number_text, block in re.findall(r"(?ms)^\s*(\d+)[\.\)]\s+(.*?)(?=^\s*\d+[\.\)]\s+|\Z)", question_zone):
        number = int(number_text)
        prompt, options = parse_options(block)
        answer = answers.get(number)
        if not prompt or len(options) != 4 or answer is None:
            continue
        questions.append(
            {
                "q": prompt,
                "options": options,
                "answer": answer,
                "explain": f"Official FBLA HQ sample question. The answer key marks {chr(65 + answer)} as correct.",
                "optionExplanations": build_option_explanations(options, answer),
                "source": f"official-hq-pdf:{path.as_posix()}",
            }
        )

    event_name = canonical_event_name(path.stem)
    return event_name, questions


def clean_roleplay_paragraphs(paragraphs: Iterable[str]) -> list[str]:
    cleaned: list[str] = []
    for paragraph in paragraphs:
        text = clean_whitespace(paragraph)
        if not text:
            continue
        lowered = text.lower()
        if lowered.startswith("disclaimer:"):
            continue
        if "www.fbla.org" in lowered:
            continue
        if re.fullmatch(r"page \d+", lowered):
            continue
        cleaned.append(text)
    return cleaned


def sectionize_roleplay(paragraphs: list[str]) -> dict[str, list[str]]:
    sections: dict[str, list[str]] = defaultdict(list)
    current = "preface"
    for paragraph in paragraphs:
        heading_key = normalize_key(paragraph.rstrip(":"))
        if heading_key in ROLEPLAY_HEADINGS:
            current = ROLEPLAY_HEADINGS[heading_key]
            continue
        sections[current].append(paragraph)
    return sections


def to_indicator_list(values: Iterable[str]) -> list[str]:
    indicators: list[str] = []
    for value in values:
        parts = re.split(r"\s*[•\u2022]\s*|\s{2,}", value)
        expanded = [value] if len(parts) == 1 else parts
        for part in expanded:
            text = clean_whitespace(re.sub(r"^[0-9]+\.\s*", "", part))
            text = clean_whitespace(re.sub(r"^[A-Za-z][\.\)]\s*", "", text))
            if not text:
                continue
            if normalize_key(text) in ROLEPLAY_HEADINGS:
                continue
            indicators.append(text.rstrip(".") + ".")
    deduped: list[str] = []
    seen = set()
    for item in indicators:
        key = normalize_key(item)
        if key and key not in seen:
            seen.add(key)
            deduped.append(item)
    return deduped


def indicator_to_question(indicator: str) -> str:
    text = indicator.rstrip(".")
    lowered = text[:1].lower() + text[1:] if text else text
    starters = ("explain ", "discuss ", "define ", "identify ", "demonstrate ", "provide ", "recommend ", "analyze ", "list ", "describe ", "state ", "follow ", "apply ", "make ")
    if lowered.lower().startswith(starters):
        return f"How would you {lowered}?"
    return f"How would you address {lowered}?"


def parse_roleplay_file(path: Path) -> dict | None:
    if path.suffix.lower() == ".docx":
        paragraphs = clean_roleplay_paragraphs(docx_to_paragraphs(path))
    else:
        paragraphs = clean_roleplay_paragraphs(pdf_to_paragraphs(path))
    if not paragraphs:
        return None

    sections = sectionize_roleplay(paragraphs)
    event_name = canonical_event_name(path.stem)
    sample_number_match = re.search(r"sample[- ]+(\d+)", path.stem, flags=re.I)
    sample_number = sample_number_match.group(1) if sample_number_match else ""

    prompt_parts = []
    for label, key in [
        ("Background", "background"),
        ("Situation", "situation"),
        ("Scenario", "scenario"),
        ("Tasks", "tasks"),
        ("Things To Consider", "consider"),
        ("Objectives", "objectives"),
    ]:
        values = sections.get(key, [])
        if values:
            prompt_parts.append(f"{label}: {' '.join(values)}")

    if not prompt_parts and sections.get("roleplay"):
        prompt_parts.append(" ".join(sections["roleplay"]))
    elif sections.get("roleplay"):
        prompt_parts.insert(0, " ".join(sections["roleplay"]))

    prompt = "\n\n".join(part.strip() for part in prompt_parts if part.strip())
    if not prompt:
        prompt = " ".join(paragraphs[2:8]).strip()
    if not prompt:
        return None

    indicators = to_indicator_list(sections.get("indicators", []))
    if not indicators:
        indicators = to_indicator_list(sections.get("objectives", []))
    if not indicators and sections.get("tasks"):
        indicators = to_indicator_list(sections["tasks"])
    if not indicators:
        indicators = [
            "Diagnose the problem clearly.",
            "Present a realistic recommendation.",
            "Respond professionally to judge questions.",
        ]

    judge_questions = []
    for indicator in indicators[:3]:
        candidate = indicator_to_question(indicator)
        if candidate not in judge_questions:
            judge_questions.append(candidate)
    while len(judge_questions) < 3:
        fallback = [
            "What would you do first?",
            "How would you justify your recommendation to the judges?",
            "What result should the business expect if your plan is followed?",
        ][len(judge_questions)]
        judge_questions.append(fallback)

    name = f"{event_name} Sample Roleplay {sample_number}".strip()
    return {
        "name": name,
        "event": event_name,
        "prompt": prompt,
        "indicators": indicators,
        "judgeQuestions": judge_questions,
        "source": path.relative_to(FBLA_RESOURCES).as_posix(),
    }


def summarize_job_block(job_number: str, title: str, block: str) -> list[str]:
    tasks = [f"Job {job_number}: {clean_whitespace(title)}"]
    for match in re.finditer(r"(?mi)^\s*print to \.pdf\s+[0-9A-Z-]+:\s*(.+)$", block):
        tasks.append(f"Job {job_number}: {clean_whitespace(match.group(1))}")
    if len(tasks) == 1:
        sentences = re.split(r"(?<=[.!?])\s+", clean_whitespace(block))
        for sentence in sentences[:2]:
            if sentence:
                tasks.append(f"Job {job_number}: {sentence}")
    return tasks


def parse_production_pdf(path: Path) -> tuple[str, dict]:
    text = clean_parser_noise(pdf_to_text(path))
    event_name = canonical_event_name(path.stem)
    blocks = re.findall(r"(?mis)^\s*job\s+(\d+)\s*:\s*(.*?)(?=^\s*job\s+\d+\s*:|\Z)", text)
    tasks: list[str] = []
    for number, block in blocks:
        first_line, _, remainder = block.partition("\n")
        title = first_line.strip()
        tasks.extend(summarize_job_block(number, title, remainder))
    tasks = [task for index, task in enumerate(tasks) if task and task not in tasks[:index]]
    return event_name, {"tasks": tasks, "source": path.relative_to(FBLA_RESOURCES).as_posix()}


def build_resource_data() -> dict:
    objective_quizzes: dict[str, list[dict]] = {}
    roleplay_scenarios: list[dict] = []
    production_tests: dict[str, dict] = {}

    for path in sorted(OBJECTIVE_DIR.glob("*.pdf")):
        event_name, questions = parse_objective_pdf(path)
        objective_quizzes[event_name] = questions

    for path in sorted(ROLEPLAY_DIR.glob("*")):
        if path.suffix.lower() not in {".docx", ".pdf"}:
            continue
        scenario = parse_roleplay_file(path)
        if scenario:
            roleplay_scenarios.append(scenario)

    for path in sorted(PRODUCTION_DIR.glob("*.pdf")):
        event_name, payload = parse_production_pdf(path)
        production_tests[event_name] = payload

    return {
        "objectiveQuizzes": objective_quizzes,
        "roleplayScenarios": roleplay_scenarios,
        "productionTests": production_tests,
    }


def write_resource_data(payload: dict) -> None:
    OUTPUT_PATH.write_text(f"window.RESOURCE_INTERACTIVE_DATA = {json.dumps(payload, indent=2)};\n", encoding="utf-8")


def main() -> int:
    payload = build_resource_data()
    write_resource_data(payload)

    objective_total = sum(len(deck) for deck in payload["objectiveQuizzes"].values())
    print(f"objective-events={len(payload['objectiveQuizzes'])}")
    print(f"objective-questions={objective_total}")
    print(f"roleplay-scenarios={len(payload['roleplayScenarios'])}")
    print(f"production-tests={len(payload['productionTests'])}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
