import { GoogleGenerativeAI } from '@google/generative-ai';
import { SCHEMES, Scheme } from './schemes-data';

const apiKey = process.env.GEMINI_API_KEY || '';

export const isGeminiConfigured = (): boolean => {
  return Boolean(apiKey && apiKey.trim().length > 10);
};

const getGenAI = () => {
  if (!isGeminiConfigured()) return null;
  return new GoogleGenerativeAI(apiKey);
};

/**
 * Detect language of the query (Tamil or English)
 */
export function detectLanguage(text: string): 'en' | 'ta' {
  // Tamil Unicode block is U+0B80 to U+0BFF
  const tamilRegex = /[\u0B80-\u0BFF]/;
  return tamilRegex.test(text) ? 'ta' : 'en';
}

/**
 * Generate embedding using Gemini text-embedding-004 (768 dimensions)
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  const genAI = getGenAI();
  if (!genAI) {
    // Generate deterministic 768-dim pseudo vector for testing if key not yet provided
    return generateDeterministicVector(text, 768);
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'text-embedding-004' });
    const result = await model.embedContent(text);
    return result.embedding.values;
  } catch (error) {
    console.warn('Gemini embedding API call failed, falling back to local vector representation:', error);
    return generateDeterministicVector(text, 768);
  }
}

/**
 * Deterministic pseudo-embedding for local fallback vector search
 */
function generateDeterministicVector(text: string, dimensions: number): number[] {
  const vector: number[] = new Array(dimensions).fill(0);
  const normalized = text.toLowerCase().trim();
  for (let i = 0; i < normalized.length; i++) {
    const charCode = normalized.charCodeAt(i);
    const index = (charCode * (i + 1)) % dimensions;
    vector[index] = (vector[index] + 1) / 2;
  }
  // Normalize vector to unit length
  const magnitude = Math.sqrt(vector.reduce((sum, val) => sum + val * val, 0)) || 1;
  return vector.map(v => v / magnitude);
}

export interface GroundedChunk {
  content: string;
  document_name: string;
  department?: string;
  source_url?: string;
  page_number?: number;
  similarity?: number;
}

/**
 * Generate bilingual RAG answer grounded strictly on retrieved official documents
 */
export async function generateRAGAnswer({
  question,
  chunks,
  language,
}: {
  question: string;
  chunks: GroundedChunk[];
  language?: 'en' | 'ta';
}): Promise<{
  answer: string;
  citations: Array<{ documentName: string; page?: number; url?: string }>;
  grounded: boolean;
}> {
  const targetLanguage = language || detectLanguage(question);
  const genAI = getGenAI();

  const citations = chunks.map(chunk => ({
    documentName: chunk.document_name,
    page: chunk.page_number,
    url: chunk.source_url,
  }));

  const contextText = chunks.length > 0
    ? chunks
        .map(
          (c, idx) =>
            `[Source ${idx + 1}: ${c.document_name} | Page: ${c.page_number || 'N/A'} | Link: ${c.source_url || 'N/A'}]\n${c.content}`
        )
        .join('\n\n---\n\n')
    : 'No matching official documents found.';

  if (!genAI) {
    // High-quality deterministic RAG synthesis from verified local knowledge base
    return generateFallbackAnswer(question, chunks, targetLanguage);
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const systemPrompt = `
You are SchemeSaarthi (திட்டம்சாரதி), an authoritative, highly professional AI assistant dedicated to helping Indian citizens understand official Government Schemes.

CRITICAL GROUNDING RULES:
1. Ground your response STRICTLY on the provided Official Document Context below.
2. NEVER hallucinate, extrapolate, or invent eligibility rules, age criteria, income limits, or financial amounts.
3. If the answer is NOT present or verified in the context, explicitly inform the user that the verified document does not contain this specific detail.
4. Structure your response clearly using Markdown:
   - **Scheme Name / திட்டத்தின் பெயர்**
   - **Eligibility Criteria / தகுதி வரம்புகள்** (use bullet points)
   - **Benefits & Assistance / நன்மைகள்** (clear numbers and amounts)
   - **Required Documents Checklist / தேவையான ஆவணங்கள்** (checkbox-style bullet points)
   - **How to Apply / விண்ணப்பிக்கும் முறை** (numbered step-by-step)
   - **Official Source Reference / அதிகாரப்பூர்வ ஆதாரம்** (document title and official portal link)
5. Target Language: Respond in ${targetLanguage === 'ta' ? 'clear, natural, respectful Tamil (தமிழ்)' : 'clear, simple, professional English'}.
6. Keep language accessible to common citizens and students.

Official Document Context:
${contextText}
`;

    const result = await model.generateContent([
      { text: systemPrompt },
      { text: `User Question: ${question}` }
    ]);

    const answer = result.response.text();
    return {
      answer,
      citations,
      grounded: chunks.length > 0
    };
  } catch (error) {
    console.warn('Gemini chat generation API error, using verified synthesis fallback:', error);
    return generateFallbackAnswer(question, chunks, targetLanguage);
  }
}

/**
 * Fallback answer synthesizer from verified database
 */
function generateFallbackAnswer(
  question: string,
  chunks: GroundedChunk[],
  language: 'en' | 'ta'
): {
  answer: string;
  citations: Array<{ documentName: string; page?: number; url?: string }>;
  grounded: boolean;
} {
  const queryLower = question.toLowerCase();

  // Find most matching scheme in verified dataset
  let matchedScheme: Scheme | undefined = SCHEMES.find(s =>
    queryLower.includes(s.id) ||
    queryLower.includes(s.title_en.toLowerCase()) ||
    queryLower.includes(s.title_ta.toLowerCase()) ||
    s.slug.split('-').some(word => word.length > 3 && queryLower.includes(word))
  );

  // Keyword heuristic search
  if (!matchedScheme) {
    if (queryLower.includes('kisan') || queryLower.includes('farmer') || queryLower.includes('விவசாயி') || queryLower.includes('கிசான்')) {
      matchedScheme = SCHEMES.find(s => s.id === 'pm-kisan');
    } else if (queryLower.includes('scholarship') || queryLower.includes('கல்வி') || queryLower.includes('உதவித்தொகை') || queryLower.includes('student')) {
      matchedScheme = queryLower.includes('ex-servicemen') || queryLower.includes('ராணுவ')
        ? SCHEMES.find(s => s.id === 'pm-scholarship')
        : (queryLower.includes('girl') || queryLower.includes('பெண்') || queryLower.includes('pudhumai') || queryLower.includes('புதுமை'))
        ? SCHEMES.find(s => s.id === 'pudhumai-penn')
        : SCHEMES.find(s => s.id === 'nsp-scholarships');
    } else if (queryLower.includes('health') || queryLower.includes('மருத்துவ') || queryLower.includes('ayushman') || queryLower.includes('ஆயுஷ்மான்') || queryLower.includes('hospital')) {
      matchedScheme = SCHEMES.find(s => s.id === 'ayushman-bharat');
    } else if (queryLower.includes('house') || queryLower.includes('வீடு') || queryLower.includes('awas') || queryLower.includes('ஆவாஸ்')) {
      matchedScheme = SCHEMES.find(s => s.id === 'pm-awas');
    } else if (queryLower.includes('magalir') || queryLower.includes('உரிமை') || queryLower.includes('1000') || queryLower.includes('kalaignar')) {
      matchedScheme = SCHEMES.find(s => s.id === 'magalir-urimai');
    } else if (queryLower.includes('sukanya') || queryLower.includes('செல்வமகள்') || queryLower.includes('girl child') || queryLower.includes('daughter')) {
      matchedScheme = SCHEMES.find(s => s.id === 'sukanya-samriddhi');
    } else if (queryLower.includes('mudra') || queryLower.includes('business loan') || queryLower.includes('தொழில் கடன்') || queryLower.includes('முத்ரா')) {
      matchedScheme = SCHEMES.find(s => s.id === 'pm-mudra');
    } else if (queryLower.includes('pension') || queryLower.includes('ஓய்வூதியம்') || queryLower.includes('elderly') || queryLower.includes('widow')) {
      matchedScheme = SCHEMES.find(s => s.id === 'nsap-pension');
    }
  }

  if (matchedScheme) {
    const isTa = language === 'ta';
    const title = isTa ? matchedScheme.title_ta : matchedScheme.title_en;
    const dept = isTa ? matchedScheme.department_ta : matchedScheme.department_en;
    const desc = isTa ? matchedScheme.short_description_ta : matchedScheme.short_description_en;
    const elig = isTa ? matchedScheme.eligibility_ta : matchedScheme.eligibility_en;
    const benefits = isTa ? matchedScheme.benefits_ta : matchedScheme.benefits_en;
    const docs = isTa ? matchedScheme.documents_required_ta : matchedScheme.documents_required_en;
    const steps = isTa ? matchedScheme.application_steps_ta : matchedScheme.application_steps_en;

    const answer = isTa
      ? `### 🏛️ ${title}\n*${dept}*\n\n${desc}\n\n#### 🎯 தகுதி வரம்புகள்:\n${elig.map(e => `* ${e}`).join('\n')}\n\n#### 💰 நன்மைகள் மற்றும் நிதியுதவி:\n${benefits.map(b => `* ${b}`).join('\n')}\n\n#### 📑 தேவையான ஆவணங்கள்:\n${docs.map(d => `* [ ] ${d}`).join('\n')}\n\n#### 📝 விண்ணப்பிக்கும் முறை:\n${steps.map((s, i) => `${i + 1}. ${s}`).join('\n')}\n\n#### 🔗 அதிகாரப்பூர்வ வலைதளம்:\n[${matchedScheme.official_url}](${matchedScheme.official_url})\n\n*(சரிபார்க்கப்பட்ட ஆவணம்: ${matchedScheme.source_doc_name})*`
      : `### 🏛️ ${title}\n*${dept}*\n\n${desc}\n\n#### 🎯 Eligibility Criteria:\n${elig.map(e => `* ${e}`).join('\n')}\n\n#### 💰 Benefits & Financial Assistance:\n${benefits.map(b => `* ${b}`).join('\n')}\n\n#### 📑 Required Documents Checklist:\n${docs.map(d => `* [ ] ${d}`).join('\n')}\n\n#### 📝 How to Apply (Step-by-Step):\n${steps.map((s, i) => `${i + 1}. ${s}`).join('\n')}\n\n#### 🔗 Official Portal Link:\n[${matchedScheme.official_url}](${matchedScheme.official_url})\n\n*(Official Source: ${matchedScheme.source_doc_name})*`;

    return {
      answer,
      citations: [
        {
          documentName: matchedScheme.source_doc_name,
          page: 1,
          url: matchedScheme.official_url,
        },
      ],
      grounded: true,
    };
  }

  // If no scheme matched
  const notFoundMessage = language === 'ta'
    ? `மன்னிக்கவும், உங்கள் கேள்விக்கான சரிபார்க்கப்பட்ட அரசு ஆவணத் தகவல் எங்கள் அறிவுத் தளத்தில் கிடைக்கவில்லை.\n\nஅதிகாரப்பூர்வ அரசு வழிகாட்டுதல்களுக்கு [National Government Services Portal](https://services.india.gov.in/) அல்லது [myScheme Portal](https://www.myscheme.gov.in/) தளங்களைப் பார்வையிடலாம்.`
    : `I could not locate verified official government document records for your specific question in the database.\n\nPlease refer directly to the official government portals: [myScheme Portal](https://www.myscheme.gov.in/) or [India Services Portal](https://services.india.gov.in/).`;

  return {
    answer: notFoundMessage,
    citations: [],
    grounded: false,
  };
}
