import json
import re
from pathlib import Path

root = Path(r"c:/Users/tarus/OneDrive/Documents/GitHub/fblahelper")
md_path = root / "fbla time ALL_TRANSCRIPTS_COMBINED.md"
resource_js = root / "resource_data.js"
out_js = root / "combined_question_bank.js"

text = md_path.read_text(encoding='utf-8', errors='ignore')

# Load existing official HQ parsed questions from resource_data.js
official = {}
raw = resource_js.read_text(encoding='utf-8', errors='ignore')
json_blob = raw.split('=', 1)[1].strip().rstrip(';')
obj = json.loads(json_blob)
for event, deck in obj.get('objectiveQuizzes', {}).items():
    official[event] = [
        {
            'q': q.get('q', '').strip(),
            'options': q.get('options', []),
            'answer': q.get('answer', None),
            'source': 'official-hq'
        }
        for q in deck if q.get('q') and len(q.get('options', [])) == 4
    ]

lines = text.splitlines()

heading_event = None
sample_banks = {}

# Parse sample questions by heading context
for i, line in enumerate(lines):
    h = line.strip()
    if h.startswith('# '):
        heading_event = re.sub(r'^#\s+', '', h).strip()
        continue
    if 'SAMPLE QUESTIONS' in h.upper():
        ev = h.upper().replace('SAMPLE QUESTIONS', '').strip(' -:_')
        event = ev.title().replace('&', '&').replace('Fbla', 'FBLA')
        qlist = []
        j = i + 1
        while j < len(lines):
            cur = lines[j].rstrip()
            if cur.startswith('# ') or ('SAMPLE QUESTIONS' in cur.upper() and j > i + 2):
                break
            m = re.match(r'^\s*(\d{1,3})[\)\.]\s+(.+)$', cur)
            if m:
                qtxt = m.group(2).strip()
                opts = []
                k = j + 1
                while k < len(lines):
                    o = lines[k].rstrip()
                    om = re.match(r'^\s*([A-Da-d])[\)\.]\s+(.+)$', o)
                    if om:
                        opts.append(om.group(2).strip())
                        k += 1
                        continue
                    if opts and len(opts) < 4 and o.strip() and not re.match(r'^\s*\d+[\)\.]\s+', o):
                        opts[-1] = (opts[-1] + ' ' + o.strip())
                        k += 1
                        continue
                    break
                if len(opts) == 4:
                    qlist.append({'num': int(m.group(1)), 'q': qtxt, 'options': opts, 'answer': None, 'source': 'fbla-time'})
                    j = k
                    continue
            j += 1
        if qlist:
            sample_banks.setdefault(event, []).extend(qlist)

# Parse answer key blocks and map answers by event name
answers_by_event = {}
for i, line in enumerate(lines):
    if 'Answer Key' in line:
        m = re.search(r'([A-Za-z0-9&\-\s]+)\s+Answer Key', line, flags=re.IGNORECASE)
        if not m:
            continue
        event = re.sub(r'\s+', ' ', m.group(1)).strip().title().replace('Fbla', 'FBLA')
        amap = {}
        j = i + 1
        while j < len(lines):
            cur = lines[j].strip()
            if not cur:
                j += 1
                continue
            if cur.startswith('# ') or 'Answer Key' in cur:
                break
            for num, letter in re.findall(r'(\d{1,3})\s*[:\)\.-]?\s*([A-Da-d])\b', cur):
                amap[int(num)] = 'ABCD'.index(letter.upper())
            j += 1
        if amap:
            answers_by_event[event] = amap

# Attach answer keys when likely event name matches

def norm(s):
    return re.sub(r'[^a-z0-9]+', ' ', s.lower()).strip()

for event, qs in sample_banks.items():
    n = norm(event)
    best_key = None
    best_score = 0
    for key_event, amap in answers_by_event.items():
        k = norm(key_event)
        score = 0
        if n in k or k in n:
            score += 2
        overlap = len(set(n.split()) & set(k.split()))
        score += overlap
        if score > best_score:
            best_score = score
            best_key = key_event
    if best_key and best_score >= 2:
        amap = answers_by_event[best_key]
        for q in qs:
            if q['num'] in amap:
                q['answer'] = amap[q['num']]

# Merge official + supplemental
merged = {}
for event, deck in official.items():
    merged[event] = deck.copy()

for event, deck in sample_banks.items():
    # map old names to current names roughly
    target = None
    n = norm(event)
    candidates = list(merged.keys())
    if candidates:
        best = (0, None)
        for c in candidates:
            cn = norm(c)
            sc = len(set(n.split()) & set(cn.split()))
            if n in cn or cn in n:
                sc += 3
            if sc > best[0]:
                best = (sc, c)
        if best[0] >= 2:
            target = best[1]
    if not target:
        target = event
    merged.setdefault(target, [])
    for q in deck:
        merged[target].append({
            'q': q['q'],
            'options': q['options'],
            'answer': q['answer'],
            'source': q['source']
        })

# de-duplicate questions per event
for event, deck in merged.items():
    seen = set()
    out = []
    for q in deck:
        key = norm(q['q'])
        if key in seen:
            continue
        seen.add(key)
        out.append(q)
    merged[event] = out

payload = {
    'banks': merged,
    'stats': {
        'events': len(merged),
        'questions': sum(len(v) for v in merged.values()),
        'answerable': sum(sum(1 for q in v if isinstance(q.get('answer'), int)) for v in merged.values())
    }
}

out_js.write_text('window.COMBINED_QUESTION_BANK = ' + json.dumps(payload, ensure_ascii=True, indent=2) + ';\n', encoding='utf-8')
print(payload['stats'])
print(f'wrote {out_js}')
