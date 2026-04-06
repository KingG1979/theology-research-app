#!/usr/bin/env python3
"""
Post-processing cleanup for Church Fathers text chunks.
Removes navigation artifacts, boilerplate, and low-quality chunks.
"""

import json
import re
import os

def clean_chunk_text(text):
    """Remove navigation, boilerplate, and formatting artifacts."""
    # Remove "CHURCH FATHERS:" header lines
    text = re.sub(r'CHURCH FATHERS:.*?\n', '', text)
    
    # Remove search box text
    text = re.sub(r'Search:\s*\n?\s*Submit Search\s*\n?', '', text)
    
    # Remove navigation breadcrumbs
    text = re.sub(r'Home\s+Encyclopedia\s+Summa\s+Fathers\s+Bible\s+Library\s*\n?', '', text)
    
    # Remove alphabet navigation
    text = re.sub(r'\b[A-Z]\s+[A-Z]\s+[A-Z]\s+[A-Z]\s+[A-Z]\s+[A-Z]\s+[A-Z].*?\n', '', text)
    text = re.sub(r'^A\s+B\s+C\s+D\s+E\s+F\s+G\s+H\s+I\s+J.*$', '', text, flags=re.MULTILINE)
    
    # Remove "Please help support..." text
    text = re.sub(r'Please help support.*?(?:\.\.\.|download)\.?\s*', '', text, flags=re.DOTALL|re.IGNORECASE)
    
    # Remove New Advent footer
    text = re.sub(r'About this page.*', '', text, flags=re.DOTALL)
    text = re.sub(r'Source\.?\s*Translated by.*', '', text, flags=re.DOTALL)
    text = re.sub(r'Copyright.*New Advent.*', '', text, flags=re.DOTALL)
    text = re.sub(r'CONTACT US.*', '', text, flags=re.DOTALL)
    text = re.sub(r'Kevin Knight.*', '', text, flags=re.DOTALL)
    
    # Remove "Includes the Catholic Encyclopedia" ad text
    text = re.sub(r'Includes the Catholic Encyclopedia.*?(?:\$\d+\.\d+|download)\.?\s*', '', text, flags=re.DOTALL|re.IGNORECASE)
    
    # Remove chapter/book headers that are just navigation
    text = re.sub(r'^(Book|Chapter|Letter)\s+\d+\s*$', '', text, flags=re.MULTILINE)
    
    # Clean up excessive whitespace
    text = re.sub(r'\n{3,}', '\n\n', text)
    text = re.sub(r'^\s+', '', text)
    text = re.sub(r'\s+$', '', text)
    
    return text.strip()

def is_quality_chunk(chunk):
    """Check if a chunk has meaningful theological content."""
    text = chunk['text']
    
    # Too short after cleaning
    if len(text) < 80:
        return False
    
    # Mostly navigation/boilerplate (high ratio of single characters)
    alpha_chars = sum(1 for c in text if c.isalpha())
    if alpha_chars < len(text) * 0.5:
        return False
    
    # Contains mostly navigation elements
    nav_words = ['Search', 'Submit', 'Home', 'Encyclopedia', 'Library', 'download', 'Copyright']
    nav_count = sum(1 for w in nav_words if w.lower() in text.lower())
    if nav_count >= 3:
        return False
    
    return True

def main():
    data_dir = '/home/user/workspace/church-fathers-data'
    
    for filename in ['augustine_chunks.json', 'athanasius_chunks.json']:
        filepath = os.path.join(data_dir, filename)
        print(f"\nProcessing {filename}...")
        
        with open(filepath, 'r') as f:
            chunks = json.load(f)
        
        original_count = len(chunks)
        
        # Clean text
        for chunk in chunks:
            chunk['text'] = clean_chunk_text(chunk['text'])
            chunk['char_count'] = len(chunk['text'])
        
        # Filter quality
        chunks = [c for c in chunks if is_quality_chunk(c)]
        
        # Reindex
        for i, chunk in enumerate(chunks):
            chunk['chunk_index'] = i
        
        filtered_count = len(chunks)
        print(f"  Original: {original_count} chunks")
        print(f"  After cleanup: {filtered_count} chunks")
        print(f"  Removed: {original_count - filtered_count} low-quality chunks")
        
        with open(filepath, 'w') as f:
            json.dump(chunks, f, indent=2)
    
    # Rebuild combined file
    all_chunks = []
    for filename in ['augustine_chunks.json', 'athanasius_chunks.json']:
        filepath = os.path.join(data_dir, filename)
        with open(filepath, 'r') as f:
            all_chunks.extend(json.load(f))
    
    with open(os.path.join(data_dir, 'all_chunks.json'), 'w') as f:
        json.dump(all_chunks, f, indent=2)
    
    print(f"\nTotal clean chunks: {len(all_chunks)}")
    print(f"Total characters: {sum(c['char_count'] for c in all_chunks):,}")
    
    # Show sample
    print("\n--- Sample cleaned chunk ---")
    sample = all_chunks[1]  # Skip first, show second
    print(f"Father: {sample['father_name']}")
    print(f"Work: {sample['work_title']}")
    print(f"Text: {sample['text'][:300]}...")

if __name__ == '__main__':
    main()
