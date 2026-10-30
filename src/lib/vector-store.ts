import { getSupabaseAdmin, isSupabaseConfigured } from './supabase';
import { generateEmbedding, GroundedChunk } from './gemini';
import { SCHEMES } from './schemes-data';

export interface DocumentRecord {
  id: string;
  name: string;
  department: string;
  source_url: string;
  file_path?: string;
  file_size?: number;
  status: 'pending' | 'processing' | 'indexed' | 'failed';
  total_chunks: number;
  created_at: string;
}

// In-memory document store for local testing/fallback
const localDocumentsStore: DocumentRecord[] = [
  {
    id: "doc-pm-kisan",
    name: "PM-KISAN Operational Guidelines.pdf",
    department: "Ministry of Agriculture & Farmers Welfare",
    source_url: "https://pmkisan.gov.in/",
    status: "indexed",
    total_chunks: 12,
    created_at: new Date().toISOString(),
  },
  {
    id: "doc-pmss",
    name: "PM Scholarship Scheme Guidelines.pdf",
    department: "Kendriya Sainik Board, Ministry of Defence",
    source_url: "https://ksb.gov.in/pm-scholarship-scheme.htm",
    status: "indexed",
    total_chunks: 18,
    created_at: new Date().toISOString(),
  },
  {
    id: "doc-pmjay",
    name: "Ayushman Bharat PM-JAY Beneficiary Handbook.pdf",
    department: "National Health Authority",
    source_url: "https://pmjay.gov.in/",
    status: "indexed",
    total_chunks: 24,
    created_at: new Date().toISOString(),
  },
  {
    id: "doc-kmut",
    name: "Kalaignar Magalir Urimai Thittam Gazette.pdf",
    department: "Special Programme Implementation Dept, TN Govt",
    source_url: "https://kmut.tn.gov.in/",
    status: "indexed",
    total_chunks: 16,
    created_at: new Date().toISOString(),
  },
  {
    id: "doc-pudhumai-penn",
    name: "Pudhumai Penn Scheme Official Manual.pdf",
    department: "Social Welfare & Women Empowerment Dept, TN Govt",
    source_url: "https://penkalvi.tn.gov.in/",
    status: "indexed",
    total_chunks: 14,
    created_at: new Date().toISOString(),
  }
];

/**
 * Retrieve similar document chunks using pgvector or local grounded knowledge base
 */
export async function searchSimilarChunks(query: string, limit: number = 5): Promise<GroundedChunk[]> {
  const queryEmbedding = await generateEmbedding(query);
  const supabase = getSupabaseAdmin();

  if (supabase && isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase.rpc('match_document_chunks', {
        query_embedding: queryEmbedding,
        match_threshold: 0.35,
        match_count: limit,
      });

      if (!error && data && data.length > 0) {
        return data.map((item: any) => ({
          content: item.content,
          document_name: item.document_name,
          department: item.department,
          source_url: item.source_url,
          page_number: item.page_number,
          similarity: item.similarity,
        }));
      }
    } catch (err) {
      console.warn('Supabase match_document_chunks RPC call failed, using verified grounded knowledge fallback:', err);
    }
  }

  // Grounded search across verified official schemes
  return searchSchemesKnowledgeBase(query, limit);
}

/**
 * Grounded fallback search across verified scheme directory
 */
function searchSchemesKnowledgeBase(query: string, limit: number = 4): GroundedChunk[] {
  const q = query.toLowerCase();
  const chunks: GroundedChunk[] = [];

  for (const s of SCHEMES) {
    const isRelevant =
      q.includes(s.id) ||
      q.includes(s.title_en.toLowerCase()) ||
      q.includes(s.title_ta.toLowerCase()) ||
      s.short_description_en.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q) ||
      s.eligibility_en.some(e => e.toLowerCase().includes(q)) ||
      s.benefits_en.some(b => b.toLowerCase().includes(q)) ||
      s.documents_required_en.some(d => d.toLowerCase().includes(q));

    if (isRelevant || chunks.length < limit) {
      chunks.push({
        content: `Scheme: ${s.title_en} (${s.title_ta})\nDepartment: ${s.department_en}\nOverview: ${s.short_description_en}\nEligibility: ${s.eligibility_en.join('; ')}\nBenefits: ${s.benefits_en.join('; ')}\nRequired Documents: ${s.documents_required_en.join(', ')}\nApplication Procedure: ${s.application_steps_en.join('; ')}`,
        document_name: s.source_doc_name,
        department: s.department_en,
        source_url: s.official_url,
        page_number: 1,
        similarity: isRelevant ? 0.92 : 0.65,
      });
    }

    if (chunks.length >= limit) break;
  }

  return chunks;
}

/**
 * Save new uploaded PDF document and generate vector embeddings for all chunks
 */
export async function ingestDocument({
  name,
  department,
  sourceUrl,
  chunks,
  fileSize = 0,
}: {
  name: string;
  department: string;
  sourceUrl: string;
  chunks: Array<{ chunkIndex: number; pageNumber: number; content: string }>;
  fileSize?: number;
}): Promise<{ documentId: string; totalChunks: number }> {
  const supabase = getSupabaseAdmin();

  if (supabase && isSupabaseConfigured()) {
    // 1. Insert document record
    const { data: docData, error: docError } = await supabase
      .from('documents')
      .insert({
        name,
        department,
        source_url: sourceUrl,
        file_size: fileSize,
        status: 'processing',
        total_chunks: chunks.length,
      })
      .select('id')
      .single();

    if (docError) {
      throw new Error(`Failed to create document record: ${docError.message}`);
    }

    const documentId = docData.id;

    // 2. Compute embeddings and insert chunks in batches
    const batchSize = 10;
    for (let i = 0; i < chunks.length; i += batchSize) {
      const batch = chunks.slice(i, i + batchSize);
      const chunkRecords = await Promise.all(
        batch.map(async chunk => {
          const embedding = await generateEmbedding(chunk.content);
          return {
            document_id: documentId,
            chunk_index: chunk.chunkIndex,
            page_number: chunk.pageNumber,
            content: chunk.content,
            embedding,
            metadata: {
              source_url: sourceUrl,
              document_name: name,
            },
          };
        })
      );

      const { error: chunkError } = await supabase.from('document_chunks').insert(chunkRecords);
      if (chunkError) {
        console.error('Error inserting chunk batch:', chunkError);
      }
    }

    // 3. Mark document status as indexed
    await supabase.from('documents').update({ status: 'indexed' }).eq('id', documentId);

    return { documentId, totalChunks: chunks.length };
  }

  // Local fallback storage
  const newId = `doc-${Date.now()}`;
  localDocumentsStore.unshift({
    id: newId,
    name,
    department: department || 'Government Department',
    source_url: sourceUrl || 'https://www.india.gov.in/',
    status: 'indexed',
    total_chunks: chunks.length,
    file_size: fileSize,
    created_at: new Date().toISOString(),
  });

  return { documentId: newId, totalChunks: chunks.length };
}

/**
 * List all documents
 */
export async function listDocuments(): Promise<DocumentRecord[]> {
  const supabase = getSupabaseAdmin();
  if (supabase && isSupabaseConfigured()) {
    const { data, error } = await supabase
      .from('documents')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      return data;
    }
  }

  return localDocumentsStore;
}

/**
 * Delete a document and its chunks
 */
export async function deleteDocument(id: string): Promise<boolean> {
  const supabase = getSupabaseAdmin();
  if (supabase && isSupabaseConfigured()) {
    const { error } = await supabase.from('documents').delete().eq('id', id);
    return !error;
  }

  const index = localDocumentsStore.findIndex(d => d.id === id);
  if (index !== -1) {
    localDocumentsStore.splice(index, 1);
    return true;
  }
  return false;
}
