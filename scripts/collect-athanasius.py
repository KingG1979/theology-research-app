#!/usr/bin/env python3
"""
Athanasius collector and chunker (CCEL, NPNF2-04).

Downloads the ThML (Theological Markup Language) XML of "NPNF2-04.
Athanasius: Select Works and Letters" from CCEL, keeps only Athanasius's own
text (no editorial introductions, excursuses, indexes or footnotes), splits it
into chunks, and writes JSON that matches the live `church_fathers_chunks`
table: author, work, section_ref, translator, content.

Usage:
    python scripts/collect-athanasius.py
    python scripts/collect-athanasius.py --xml path/to/npnf204.xml --sample 8

Standard library only. Needs network access to ccel.org on first run.
"""

import argparse
import json
import os
import random
import re
import sys
import urllib.request
import xml.etree.ElementTree as ET

try:
    sys.stdout.reconfigure(encoding="utf-8")
except Exception:
    pass

XML_URL = "https://ccel.org/ccel/s/schaff/npnf204.xml"
DATA_DIR = "church-fathers-data"
AUTHOR = "Athanasius"

# --- Translator credits -------------------------------------------------
# Source: Archibald Robertson's Preface and Henry Wace's Editorial Preface in
# NPNF2-04 (1891). The preface credits the "bulk of the historical and
# anti-Arian works" to Newman's Oxford Library of the Fathers translation,
# revised by Robertson. It does not give a per-work list, so this is a
# category-level credit. Everything else gets the editor-level credit.
VOLUME = "NPNF2-04 (1891)"
T_DEFAULT = "Ed. Archibald Robertson, " + VOLUME
T_NEWMAN = "John Henry Newman (Oxford Library of the Fathers), revised by Archibald Robertson, " + VOLUME
T_ANTONY = "Rev. H. Ellershaw, " + VOLUME
T_FESTAL = "Oxford Library of the Fathers translation, revised by Miss Payne Smith, " + VOLUME

NEWMAN_WORKS = (
    "defence against the arians", "defence of the nicene definition",
    "letter of eusebius", "defence of dionysius", "apology to the emperor",
    "defence of his flight", "arian history", "against the arians",
    "councils of ariminum", "synodal letter", "encyclical letter",
    "circular to bishops",
)

# Divisions that are editorial or not by Athanasius.
SKIP_TITLE = re.compile(
    r"^(introduction|index|indexes|excursus|prolegomena|preface|title page|"
    r"editorial preface|second title page|table of contents)\b",
    re.I,
)
SKIP_CONTAINS = ("historia acephala", "chronicle")


def local(tag):
    return tag.rsplit("}", 1)[-1].lower() if isinstance(tag, str) else ""


def clean(s):
    return re.sub(r"\s+", " ", s or "").strip()


def norm(s):
    return re.sub(r"[^a-z0-9]+", "", (s or "").lower())


def p_text(el):
    """Text of an element, skipping footnotes (note) and page breaks (pb)."""
    parts = [el.text or ""]
    for ch in el:
        if local(ch.tag) not in ("note", "pb"):
            parts.append(p_text(ch))
        parts.append(ch.tail or "")
    return "".join(parts)


def work_title(raw):
    t = clean(raw)
    t = t.replace(". (", " (").replace(".)", ")")
    return t.rstrip(".")


def translator_for(work, labels):
    w = work.lower()
    if labels and labels[0].lower().startswith("festal letters"):
        return T_FESTAL
    if w.startswith("festal letters"):
        return T_FESTAL
    if "life of antony" in w:
        return T_ANTONY
    if any(k in w for k in NEWMAN_WORKS):
        return T_NEWMAN
    return T_DEFAULT


def make_label(title, first_text):
    if re.match(r"^(Discourse|Letter|Chapter|Book|Part|Section|Oration)\b", title, re.I):
        return re.split(r"\.\s*--|\.\s*—", title)[0][:50].rstrip(". ")
    m = re.match(r"^\s*§\s*(\d+)", first_text or "")
    if m:
        return "§" + m.group(1)
    head = re.split(r"\.\s*--|\.\s*—", title)[0].strip()
    if head and len(head) <= 50:
        return head.rstrip(". ")
    return title[:50].rstrip(". ") or None


def is_noise(text, enclosing_titles, is_first):
    if len(text) < 20 or not re.search(r"[A-Za-z]", text):
        return True
    body = re.sub(r"^§\s*\d+\.?\s*", "", text)
    nb = norm(body)
    if nb and nb in enclosing_titles:
        return True
    if is_first and len(nb) >= 15:
        for t in enclosing_titles:
            if t and (t.startswith(nb[:40]) or nb.startswith(t[:40])):
                return True
    return False


def split_long(text, max_chars):
    if len(text) <= max_chars:
        return [text]
    sentences = re.split(r"(?<=[.!?;:])\s+", text)
    pieces, cur = [], ""
    for s in sentences:
        while len(s) > max_chars:
            cut = s.rfind(" ", 0, max_chars)
            cut = cut if cut > 0 else max_chars
            if cur:
                pieces.append(cur)
                cur = ""
            pieces.append(s[:cut])
            s = s[cut:].lstrip()
        if cur and len(cur) + 1 + len(s) > max_chars:
            pieces.append(cur)
            cur = s
        else:
            cur = (cur + " " + s).strip()
    if cur:
        pieces.append(cur)
    return pieces


def chunk_paragraphs(paras, max_chars, min_chars):
    chunks, buf, size = [], [], 0
    for p in paras:
        for piece in split_long(p, max_chars):
            if buf and size + 2 + len(piece) > max_chars:
                chunks.append("\n\n".join(buf))
                buf, size = [], 0
            buf.append(piece)
            size += len(piece) + 2
    if buf:
        chunks.append("\n\n".join(buf))
    if len(chunks) > 1 and len(chunks[-1]) < min_chars and len(chunks[-2]) + len(chunks[-1]) + 2 <= int(max_chars * 1.5):
        last = chunks.pop()
        chunks[-1] += "\n\n" + last
    return chunks


def process(div, work, labels, titles, out):
    title = clean(div.get("title"))
    level = int(local(div.tag)[3])
    # The "contains" rule only applies below the work level: the div1 for the
    # letters is titled "...with Two Ancient Chronicles of His Life" but holds
    # the Festal and Personal Letters we want.
    if SKIP_TITLE.match(title) or (level >= 2 and any(s in title.lower() for s in SKIP_CONTAINS)):
        return
    kids = list(div)
    first_p = next((c for c in kids if local(c.tag) == "p"), None)
    first_text = clean(p_text(first_p)) if first_p is not None else ""

    new_labels = list(labels)
    if level == 3 and work.lower().startswith("letters of athanasius"):
        # Festal Letters / Personal Letters become their own "work".
        work = work_title(title)
        new_labels = []
    elif level >= 3:
        lab = make_label(title, first_text)
        if lab:
            new_labels.append(lab)

    new_titles = titles | {norm(title)}
    paras = []

    def flush():
        if paras:
            out.append((work, translator_for(work, new_labels), " > ".join(new_labels), list(paras)))
            paras.clear()

    seen_first_p = False
    for child in kids:
        t = local(child.tag)
        if t == "p":
            text = clean(p_text(child))
            first = not seen_first_p
            seen_first_p = True
            if not is_noise(text, new_titles, first):
                paras.append(text)
        elif re.fullmatch(r"div[1-6]", t):
            flush()
            process(child, work, new_labels, new_titles, out)
    flush()


def download(url, dest):
    os.makedirs(os.path.dirname(dest) or ".", exist_ok=True)
    print(f"Downloading {url} ...")
    req = urllib.request.Request(url, headers={"User-Agent": "ccc-study-collector/1.0"})
    with urllib.request.urlopen(req, timeout=120) as r, open(dest, "wb") as f:
        while True:
            block = r.read(1 << 20)
            if not block:
                break
            f.write(block)
    print(f"Saved {os.path.getsize(dest) / 1e6:.1f} MB to {dest}")


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--xml", default=os.path.join(DATA_DIR, "npnf204.xml"))
    ap.add_argument("--out", default=os.path.join(DATA_DIR, "athanasius_chunks.json"))
    ap.add_argument("--max-chars", type=int, default=1400)
    ap.add_argument("--min-chars", type=int, default=300)
    ap.add_argument("--sample", type=int, default=0, help="print N random chunks for a visual check")
    args = ap.parse_args()

    if not os.path.exists(args.xml):
        download(XML_URL, args.xml)

    root = ET.parse(args.xml).getroot()
    out = []
    for div1 in root.iter():
        if local(div1.tag) != "div1":
            continue
        title = clean(div1.get("title"))
        if SKIP_TITLE.match(title):
            continue
        process(div1, work_title(title), [], frozenset(), out)

    rows = []
    for work, translator, section_ref, paras in out:
        for i, content in enumerate(chunk_paragraphs(paras, args.max_chars, args.min_chars)):
            rows.append({
                "author": AUTHOR,
                "work": work,
                "section_ref": section_ref or f"part {i + 1}",
                "translator": translator,
                "content": content,
            })

    os.makedirs(os.path.dirname(args.out) or ".", exist_ok=True)
    with open(args.out, "w", encoding="utf-8") as f:
        json.dump(rows, f, ensure_ascii=False, indent=1)

    per_work = {}
    for r in rows:
        w = per_work.setdefault(r["work"], [0, 0])
        w[0] += 1
        w[1] += len(r["content"])
    print(f"\n{'Work':<62}{'chunks':>8}{'chars':>11}")
    for w, (n, c) in per_work.items():
        print(f"{w[:60]:<62}{n:>8}{c:>11}")
    total = sum(len(r["content"]) for r in rows)
    print(f"\nTotal: {len(rows)} chunks, {total:,} characters")
    print(f"Estimated embedding cost: about ${total / 4 / 1e6 * 0.02:.2f} (text-embedding-3-small, ~4 chars per token)")
    print(f"Wrote {args.out}")

    if args.sample:
        for r in random.sample(rows, min(args.sample, len(rows))):
            print("\n---", r["work"], "|", r["section_ref"], "|", r["translator"][:40])
            print(r["content"][:400])


if __name__ == "__main__":
    main()
