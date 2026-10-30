-- =========================================================================
-- SchemeSaarthi - AI-Powered Government Scheme Assistant
-- Supabase PostgreSQL Schema with pgvector for Document RAG
-- =========================================================================

-- 1. Enable pgvector extension for semantic similarity search
CREATE EXTENSION IF NOT EXISTS vector;

-- 2. Documents table: stores uploaded official government PDF files and metadata
CREATE TABLE IF NOT EXISTS documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  department TEXT,
  source_url TEXT,
  file_path TEXT,
  file_size BIGINT DEFAULT 0,
  status TEXT DEFAULT 'indexed' CHECK (status IN ('pending', 'processing', 'indexed', 'failed')),
  total_chunks INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Document Chunks table: stores partitioned text segments with 768-dim Gemini embeddings
CREATE TABLE IF NOT EXISTS document_chunks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id UUID REFERENCES documents(id) ON DELETE CASCADE,
  chunk_index INT NOT NULL,
  page_number INT DEFAULT 1,
  content TEXT NOT NULL,
  embedding vector(768), -- Google Gemini text-embedding-004 produces 768-dimensional vectors
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Vector index for fast cosine distance nearest neighbor search
CREATE INDEX IF NOT EXISTS idx_document_chunks_embedding
  ON document_chunks
  USING hnsw (embedding vector_cosine_ops);

CREATE INDEX IF NOT EXISTS idx_document_chunks_document_id
  ON document_chunks (document_id);

-- 5. Government Schemes Table: verified directory of central and state welfare schemes
CREATE TABLE IF NOT EXISTS schemes (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL,
  title_en TEXT NOT NULL,
  title_ta TEXT NOT NULL,
  short_description_en TEXT NOT NULL,
  short_description_ta TEXT NOT NULL,
  department_en TEXT,
  department_ta TEXT,
  objectives_en TEXT[] DEFAULT '{}',
  objectives_ta TEXT[] DEFAULT '{}',
  eligibility_en TEXT[] DEFAULT '{}',
  eligibility_ta TEXT[] DEFAULT '{}',
  benefits_en TEXT[] DEFAULT '{}',
  benefits_ta TEXT[] DEFAULT '{}',
  documents_required_en TEXT[] DEFAULT '{}',
  documents_required_ta TEXT[] DEFAULT '{}',
  application_steps_en TEXT[] DEFAULT '{}',
  application_steps_ta TEXT[] DEFAULT '{}',
  important_notes_en TEXT[] DEFAULT '{}',
  important_notes_ta TEXT[] DEFAULT '{}',
  official_url TEXT NOT NULL,
  source_doc_name TEXT NOT NULL,
  is_verified BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Vector Similarity Search Function (RPC)
-- Call this from Next.js serverless functions to retrieve top matching document chunks
CREATE OR REPLACE FUNCTION match_document_chunks (
  query_embedding vector(768),
  match_threshold float DEFAULT 0.5,
  match_count int DEFAULT 5
)
RETURNS TABLE (
  id UUID,
  document_id UUID,
  document_name TEXT,
  department TEXT,
  source_url TEXT,
  chunk_index INT,
  page_number INT,
  content TEXT,
  similarity float
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    dc.id,
    dc.document_id,
    d.name AS document_name,
    d.department,
    d.source_url,
    dc.chunk_index,
    dc.page_number,
    dc.content,
    1 - (dc.embedding <=> query_embedding) AS similarity
  FROM document_chunks dc
  JOIN documents d ON d.id = dc.document_id
  WHERE 1 - (dc.embedding <=> query_embedding) > match_threshold
  ORDER BY dc.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;

-- 7. Row Level Security (RLS) Policies
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_chunks ENABLE ROW LEVEL SECURITY;
ALTER TABLE schemes ENABLE ROW LEVEL SECURITY;

-- Public can read verified schemes and indexed document chunks
CREATE POLICY "Public read documents" ON documents
  FOR SELECT USING (true);

CREATE POLICY "Public read document_chunks" ON document_chunks
  FOR SELECT USING (true);

CREATE POLICY "Public read schemes" ON schemes
  FOR SELECT USING (true);

-- Admin / service role has full access
CREATE POLICY "Service role full access documents" ON documents
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access document_chunks" ON document_chunks
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access schemes" ON schemes
  FOR ALL USING (auth.role() = 'service_role');

-- 8. Storage Bucket for Official PDFs
-- Create a public or authenticated bucket named 'scheme-documents'
-- INSERT INTO storage.buckets (id, name, public) VALUES ('scheme-documents', 'scheme-documents', true)
-- ON CONFLICT (id) DO NOTHING;

