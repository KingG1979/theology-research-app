#!/usr/bin/env python3
"""
Church Fathers Text Collection and Chunking Pipeline
Collects texts from newadvent.org, cleans HTML, chunks into paragraphs,
and outputs structured JSON ready for embedding and Supabase ingestion.
"""

import json
import os
import re
import time
import urllib.request
from html.parser import HTMLParser
from concurrent.futures import ThreadPoolExecutor, as_completed

# -------------------------------------------------------------------
# HTML → plain-text converter
# -------------------------------------------------------------------

class HTMLTextExtractor(HTMLParser):
    """Extracts meaningful text from Church Fathers HTML pages."""
    
    def __init__(self):
        super().__init__()
        self.result = []
        self.skip = False
        self.skip_tags = {'script', 'style', 'nav', 'header', 'footer', 'noscript'}
        self.block_tags = {'p', 'div', 'br', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 
                           'li', 'blockquote', 'tr'}
        self.current_tag = None
        self.in_content = False
        self.depth = 0
    
    def handle_starttag(self, tag, attrs):
        self.current_tag = tag
        if tag in self.skip_tags:
            self.skip = True
            self.depth += 1
        if tag in self.block_tags:
            self.result.append('\n')
    
    def handle_endtag(self, tag):
        if tag in self.skip_tags:
            self.depth -= 1
            if self.depth <= 0:
                self.skip = False
                self.depth = 0
        if tag in self.block_tags:
            self.result.append('\n')
    
    def handle_data(self, data):
        if not self.skip:
            self.result.append(data)
    
    def get_text(self):
        return ''.join(self.result)


def html_to_text(html_content):
    """Convert HTML to clean plain text."""
    extractor = HTMLTextExtractor()
    extractor.feed(html_content)
    text = extractor.get_text()
    
    # Clean up
    # Remove "Please help support..." ad sections
    text = re.sub(r'Please help support the mission of New Advent.*?(?=\n\n)', '', text, flags=re.DOTALL)
    
    # Remove "About this page" footer section
    text = re.sub(r'About this page.*', '', text, flags=re.DOTALL)
    
    # Remove navigation/menu text patterns
    text = re.sub(r'Home\s*>\s*Fathers\s*of\s*the\s*Church\s*>', '', text)
    text = re.sub(r'ENCYCLOPEDIAFATHER.*?ENCYCLOPEDIAFATHER\s*', '', text, flags=re.DOTALL)
    
    # Normalize whitespace
    text = re.sub(r'\n{3,}', '\n\n', text)
    text = re.sub(r'[ \t]+', ' ', text)
    text = text.strip()
    
    return text


# -------------------------------------------------------------------
# Text chunking
# -------------------------------------------------------------------

def chunk_text(text, father_name, work_title, era, chapter_num=None, 
               min_chunk_size=200, max_chunk_size=1500, overlap=100):
    """
    Split text into paragraph-sized chunks suitable for embedding.
    
    Strategy:
    - Split on double newlines (paragraph boundaries)
    - Merge very short paragraphs together
    - Split very long paragraphs at sentence boundaries
    - Add overlap between chunks for context continuity
    """
    # Split on paragraph boundaries
    paragraphs = [p.strip() for p in text.split('\n\n') if p.strip()]
    
    chunks = []
    current_chunk = ""
    
    for para in paragraphs:
        # Skip very short content (likely navigation or formatting artifacts)
        if len(para) < 30 and not any(c.isalpha() for c in para):
            continue
            
        # If adding this paragraph would exceed max size, save current and start new
        if current_chunk and len(current_chunk) + len(para) + 2 > max_chunk_size:
            if len(current_chunk) >= min_chunk_size:
                chunks.append(current_chunk.strip())
            current_chunk = para
        else:
            if current_chunk:
                current_chunk += "\n\n" + para
            else:
                current_chunk = para
    
    # Don't forget the last chunk
    if current_chunk and len(current_chunk) >= min_chunk_size:
        chunks.append(current_chunk.strip())
    elif current_chunk and chunks:
        # Append small remainder to last chunk
        chunks[-1] += "\n\n" + current_chunk.strip()
    elif current_chunk:
        chunks.append(current_chunk.strip())
    
    # Handle very long chunks by splitting at sentence boundaries
    final_chunks = []
    for chunk in chunks:
        if len(chunk) > max_chunk_size * 1.5:
            sentences = re.split(r'(?<=[.!?])\s+', chunk)
            sub_chunk = ""
            for sentence in sentences:
                if len(sub_chunk) + len(sentence) + 1 > max_chunk_size:
                    if sub_chunk:
                        final_chunks.append(sub_chunk.strip())
                    sub_chunk = sentence
                else:
                    sub_chunk = (sub_chunk + " " + sentence).strip()
            if sub_chunk:
                final_chunks.append(sub_chunk.strip())
        else:
            final_chunks.append(chunk)
    
    # Build structured chunk records
    records = []
    for i, chunk_text in enumerate(final_chunks):
        if len(chunk_text.strip()) < 50:  # Skip tiny fragments
            continue
        record = {
            "father_name": father_name,
            "work_title": work_title,
            "era": era,
            "chapter": chapter_num,
            "chunk_index": i,
            "text": chunk_text.strip(),
            "char_count": len(chunk_text.strip())
        }
        records.append(record)
    
    return records


# -------------------------------------------------------------------
# Fetching
# -------------------------------------------------------------------

def fetch_page(url, max_retries=3):
    """Fetch a page with retries and rate limiting."""
    for attempt in range(max_retries):
        try:
            req = urllib.request.Request(url, headers={
                'User-Agent': 'TheologyResearchApp/1.0 (academic research tool)'
            })
            with urllib.request.urlopen(req, timeout=30) as response:
                return response.read().decode('utf-8', errors='replace')
        except Exception as e:
            if attempt < max_retries - 1:
                wait = (attempt + 1) * 2
                print(f"  Retry {attempt+1} for {url}: {e}")
                time.sleep(wait)
            else:
                print(f"  FAILED after {max_retries} attempts: {url}: {e}")
                return None
    return None


def fetch_work(work_info, father_name, era):
    """Fetch all chapters of a work and return chunks."""
    title = work_info['title']
    base_url = work_info['base_url']
    num_chapters = work_info['chapters']
    
    all_chunks = []
    
    if num_chapters == 0:
        # Single page work
        url = base_url + ".htm"
        print(f"  Fetching {title}...")
        html = fetch_page(url)
        if html:
            text = html_to_text(html)
            if len(text) > 100:
                chunks = chunk_text(text, father_name, title, era)
                all_chunks.extend(chunks)
                print(f"    → {len(chunks)} chunks from {title}")
            else:
                print(f"    → Skipped (too short): {title}")
        time.sleep(0.5)  # Rate limiting
    else:
        # Multi-chapter work
        for ch in range(1, num_chapters + 1):
            ch_str = f"{ch:02d}" if ch < 100 else f"{ch:03d}"
            url = f"{base_url}{ch_str}.htm"
            print(f"  Fetching {title}, Chapter {ch}/{num_chapters}...")
            html = fetch_page(url)
            if html:
                text = html_to_text(html)
                if len(text) > 100:
                    chunks = chunk_text(text, father_name, title, era, chapter_num=ch)
                    all_chunks.extend(chunks)
                    print(f"    → {len(chunks)} chunks")
                else:
                    print(f"    → Skipped (too short)")
            time.sleep(0.3)  # Rate limiting between chapters
    
    return all_chunks


# -------------------------------------------------------------------
# Main pipeline
# -------------------------------------------------------------------

def main():
    # Load URL catalog
    with open('/home/user/workspace/church-fathers-urls.json', 'r') as f:
        catalog = json.load(f)
    
    output_dir = '/home/user/workspace/church-fathers-data'
    os.makedirs(output_dir, exist_ok=True)
    
    all_chunks = []
    stats = {}
    
    for father_key, father_info in catalog.items():
        father_name = father_key.replace('_', ' ').title()
        # Fix casing
        if father_name == 'Augustine':
            father_name = 'St. Augustine'
        elif father_name == 'Athanasius':
            father_name = 'St. Athanasius'
        
        era = father_info['era']
        dates = father_info['dates']
        works = father_info['works']
        
        print(f"\n{'='*60}")
        print(f"Processing {father_name} ({era}, {dates})")
        print(f"Works to process: {len(works)}")
        print(f"{'='*60}\n")
        
        father_chunks = []
        
        for work in works:
            work_chunks = fetch_work(work, father_name, era)
            father_chunks.extend(work_chunks)
        
        # Save per-father data
        father_file = os.path.join(output_dir, f"{father_key}_chunks.json")
        with open(father_file, 'w') as f:
            json.dump(father_chunks, f, indent=2)
        
        stats[father_name] = {
            'works_processed': len(works),
            'total_chunks': len(father_chunks),
            'total_chars': sum(c['char_count'] for c in father_chunks),
            'era': era,
            'dates': dates
        }
        
        all_chunks.extend(father_chunks)
        print(f"\n{father_name}: {len(father_chunks)} chunks, {stats[father_name]['total_chars']:,} characters")
    
    # Save combined data
    combined_file = os.path.join(output_dir, 'all_chunks.json')
    with open(combined_file, 'w') as f:
        json.dump(all_chunks, f, indent=2)
    
    # Save stats
    stats_file = os.path.join(output_dir, 'stats.json')
    stats['total'] = {
        'total_chunks': len(all_chunks),
        'total_chars': sum(c['char_count'] for c in all_chunks)
    }
    with open(stats_file, 'w') as f:
        json.dump(stats, f, indent=2)
    
    print(f"\n{'='*60}")
    print(f"COLLECTION COMPLETE")
    print(f"{'='*60}")
    print(f"Total chunks: {len(all_chunks)}")
    print(f"Total characters: {stats['total']['total_chars']:,}")
    print(f"Output: {output_dir}/")
    for father, s in stats.items():
        if father != 'total':
            print(f"  {father}: {s['total_chunks']} chunks, {s['total_chars']:,} chars")


if __name__ == '__main__':
    main()
