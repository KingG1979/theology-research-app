-- ============================================================
-- Church Fathers RAG: Supabase Migration
-- Run this in your Supabase SQL Editor after creating the project
-- ============================================================

-- Enable the vector extension for semantic search
CREATE EXTENSION IF NOT EXISTS vector;

-- Main table for Church Fathers text chunks
CREATE TABLE IF NOT EXISTS church_fathers_chunks (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  father_name text NOT NULL,
  work_title text NOT NULL,
  era text NOT NULL CHECK (era IN ('Ante-Nicene', 'Nicene', 'Post-Nicene')),
  chapter integer,
  chunk_index integer NOT NULL,
  content text NOT NULL,
  embedding vector(1536),  -- OpenAI text-embedding-3-small dimensions
  created_at timestamptz DEFAULT now()
);

-- Index for fast vector similarity search
CREATE INDEX IF NOT EXISTS idx_fathers_embedding 
  ON church_fathers_chunks 
  USING ivfflat (embedding vector_cosine_ops) 
  WITH (lists = 100);

-- Indexes for filtering
CREATE INDEX IF NOT EXISTS idx_fathers_name ON church_fathers_chunks (father_name);
CREATE INDEX IF NOT EXISTS idx_fathers_era ON church_fathers_chunks (era);
CREATE INDEX IF NOT EXISTS idx_fathers_work ON church_fathers_chunks (work_title);

-- Search function: finds the most similar chunks to a query embedding
CREATE OR REPLACE FUNCTION search_fathers(
  query_embedding vector(1536),
  match_count int DEFAULT 10,
  filter_father text DEFAULT NULL,
  filter_era text DEFAULT NULL
)
RETURNS TABLE (
  id bigint,
  father_name text,
  work_title text,
  era text,
  chapter integer,
  content text,
  similarity float
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    c.id,
    c.father_name,
    c.work_title,
    c.era,
    c.chapter,
    c.content,
    1 - (c.embedding <=> query_embedding) AS similarity
  FROM church_fathers_chunks c
  WHERE
    (filter_father IS NULL OR c.father_name = filter_father)
    AND (filter_era IS NULL OR c.era = filter_era)
  ORDER BY c.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;

-- Row Level Security (allow anonymous read access)
ALTER TABLE church_fathers_chunks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous read access"
  ON church_fathers_chunks
  FOR SELECT
  TO anon
  USING (true);

-- Helper: Get all unique fathers
CREATE OR REPLACE FUNCTION get_fathers_list()
RETURNS TABLE (
  father_name text,
  era text,
  work_count bigint,
  chunk_count bigint
)
LANGUAGE sql
AS $$
  SELECT 
    c.father_name,
    c.era,
    COUNT(DISTINCT c.work_title) AS work_count,
    COUNT(*) AS chunk_count
  FROM church_fathers_chunks c
  GROUP BY c.father_name, c.era
  ORDER BY c.father_name;
$$;

-- Helper: Get all works for a father
CREATE OR REPLACE FUNCTION get_father_works(p_father_name text)
RETURNS TABLE (
  work_title text,
  chunk_count bigint
)
LANGUAGE sql
AS $$
  SELECT 
    c.work_title,
    COUNT(*) AS chunk_count
  FROM church_fathers_chunks c
  WHERE c.father_name = p_father_name
  GROUP BY c.work_title
  ORDER BY c.work_title;
$$;
