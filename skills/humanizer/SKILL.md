---
name: humanizer
description: Rewrite text so it sounds naturally human instead of obviously AI-generated. Use when editing drafts, essays, emails, docs, marketing copy, social posts, or chat responses that feel too polished, generic, hedged, promotional, or chatbot-like, and when Codex should preserve meaning while removing common AI writing tells.
---

# Humanizer

Rewrite text to remove AI tells without flattening the author's intent. Favor specific, grounded, natural language over polished filler.

## Quick start

Ask for the text if the user has not provided it yet. If the user gives a goal or audience, preserve that.

Use this skill when the writing has symptoms like:
- generic praise or inflated significance
- vague attributions like "experts say"
- stacked buzzwords, filler, or hedging
- overly tidy rhythm, rule-of-three phrasing, or headline-like bullets
- chatbot residue such as "I hope this helps" or servile framing

Read [ai-writing-patterns.md](./references/ai-writing-patterns.md) only when you need the full pattern catalog or want concrete examples while editing.

## Editing rules

- Preserve the core meaning, factual claims, and intended level of formality.
- Do not invent examples, citations, names, or emotions just to make text feel human.
- Remove unsupported claims instead of replacing them with made-up specifics.
- Prefer plain verbs like `is`, `are`, and `has` when they are the clearest choice.
- Replace broad claims with concrete detail when the detail already exists in the source text.
- Vary sentence length and rhythm, but do not add chaos where the context requires precision.
- Keep academic, legal, policy, or professional drafts appropriately restrained. Human does not mean casual.

## Workflow

### 1. Diagnose

Scan the text once before editing. Note the few strongest AI tells rather than trying to label every sentence.

Focus on:
- inflated importance or promotional tone
- vague authority claims
- filler phrases and hedging
- repetitive structure or synonym cycling
- formatting habits such as em dashes, bold labels, title case headings, or emoji
- chatbot artifacts and generic conclusions

### 2. Rewrite

Rewrite for clarity first, then voice.

Common moves:
- cut opening flattery and closing "let me know" filler
- swap abstract nouns for concrete statements
- collapse stacked modifiers and remove unnecessary transitions
- turn list-shaped prose into normal sentences when possible
- keep repetition when repeating the clearest noun sounds more natural than forced synonyms

### 3. Add a pulse

If the context allows personality, add a small amount of genuine voice:
- a direct opinion
- a cleaner, less symmetrical rhythm
- mild uncertainty when uncertainty is real
- first person only when it fits the source and audience

If the context is formal or factual, skip personality and aim for "written by a careful person" rather than "written by a character."

### 4. Audit again

After the first rewrite, run a brief self-check:

1. Ask internally: `What still makes this sound obviously AI generated?`
2. List the remaining tells in a few short bullets.
3. Revise once more to remove those tells.

## Output format

Default to this structure unless the user asks for something simpler:

1. Draft rewrite
2. Remaining AI tells
3. Final rewrite

If the user only wants the cleaned text, return just the final rewrite.

## Guardrails

- Say when the original text is too vague to humanize cleanly without introducing new facts.
- Flag likely fabricated citations or placeholder examples instead of polishing them.
- Keep quotes, dates, and technical terminology accurate.
- Do not over-correct into slang, jokes, or personal confession unless the user clearly wants that tone.

## Source

Base this skill on the `blader/humanizer` workflow and Wikipedia's "Signs of AI writing" guidance as summarized in [ai-writing-patterns.md](./references/ai-writing-patterns.md).
