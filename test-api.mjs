// Comprehensive Test Suite for SchemeSaarthi
import { SCHEMES } from './src/lib/schemes-data.ts';
import { generateRAGAnswer, detectLanguage } from './src/lib/gemini.ts';
import { searchSimilarChunks, listDocuments } from './src/lib/vector-store.ts';
import { cleanText, splitIntoChunks } from './src/lib/pdf-processor.ts';

async function runTests() {
  console.log('========================================================');
  console.log('   SCHEMESAARTHI END-TO-END RAG VALIDATION SUITE');
  console.log('========================================================\n');

  let passed = 0;
  let total = 0;

  function assert(condition, name) {
    total++;
    if (condition) {
      console.log(`✅ [PASS] ${name}`);
      passed++;
    } else {
      console.error(`❌ [FAIL] ${name}`);
    }
  }

  // 1. Language Detection Test
  console.log('\n--- 1. Testing Language Detection ---');
  assert(detectLanguage('What is PM Kisan?') === 'en', 'Detects English question');
  assert(detectLanguage('பிரதமர் கிசான் திட்டம் பற்றி கூறுங்கள்') === 'ta', 'Detects Tamil question');
  assert(detectLanguage('கல்வி உதவித்தொகை') === 'ta', 'Detects Tamil scholarship query');

  // 2. Verified Schemes Knowledge Base
  console.log('\n--- 2. Testing Schemes Knowledge Base ---');
  assert(SCHEMES.length === 10, `Loaded 10 verified schemes (found: ${SCHEMES.length})`);
  const pmKisan = SCHEMES.find(s => s.id === 'pm-kisan');
  assert(Boolean(pmKisan && pmKisan.title_en.includes('Kisan')), 'PM Kisan scheme exists and verified');
  assert(pmKisan?.eligibility_ta.length > 0, 'PM Kisan has verified Tamil eligibility');
  assert(pmKisan?.documents_required_en.length > 0, 'PM Kisan has required documents list');

  // 3. PDF Text Cleaning & Chunking
  console.log('\n--- 3. Testing PDF Processing & Chunking ---');
  const samplePdfText = `
    GOVERNMENT OF INDIA
    MINISTRY OF AGRICULTURE AND FARMERS WELFARE
    
    OPERATIONAL GUIDELINES OF PM-KISAN SCHEME
    
    1. Objectives:
    The scheme aims to supplement financial needs of landholding farmers.
    
    2. Eligibility:
    All landholding farmers having cultivable land are eligible.
    Institutional landholders and income tax payers are excluded.
  `;
  const cleaned = cleanText(samplePdfText);
  assert(cleaned.includes('OPERATIONAL GUIDELINES'), 'Text cleaning removes excess whitespace');
  const chunks = splitIntoChunks(cleaned, 150, 30, 2);
  assert(chunks.length >= 2, `Split text into ${chunks.length} overlapping chunks`);
  assert(chunks[0].chunkIndex === 0, 'First chunk has chunkIndex 0');

  // 4. Vector Search & RAG Retrieval
  console.log('\n--- 4. Testing Semantic Vector Search ---');
  const retrievedEnglish = await searchSimilarChunks('farmer financial assistance kisan', 3);
  assert(retrievedEnglish.length > 0, `Retrieved ${retrievedEnglish.length} chunks for English query`);
  assert(retrievedEnglish[0].document_name.includes('PM-KISAN'), 'Top retrieved chunk matches PM-KISAN');

  const retrievedTamil = await searchSimilarChunks('பெண்களுக்கான உரிமைத் தொகை 1000', 3);
  assert(retrievedTamil.length > 0, `Retrieved ${retrievedTamil.length} chunks for Tamil query`);

  // 5. RAG Answer Generation in English
  console.log('\n--- 5. Testing Grounded Answer Generation (English) ---');
  const engRAG = await generateRAGAnswer({
    question: 'What is PM Kisan and what are the benefits?',
    chunks: retrievedEnglish,
    language: 'en'
  });
  assert(engRAG.grounded === true, 'Response is grounded on official documents');
  assert(engRAG.answer.includes('PM Kisan') || engRAG.answer.includes('6,000'), 'Answer contains verified benefits');
  assert(engRAG.citations.length > 0, `Generated ${engRAG.citations.length} official citations`);
  console.log('\n[Generated English Answer Sample]:\n', engRAG.answer.slice(0, 220) + '...\n');

  // 6. RAG Answer Generation in Tamil
  console.log('\n--- 6. Testing Grounded Answer Generation (Tamil) ---');
  const taRAG = await generateRAGAnswer({
    question: 'பிரதமர் கிசான் திட்டத்தின் நன்மைகள் என்ன?',
    chunks: retrievedEnglish,
    language: 'ta'
  });
  assert(taRAG.grounded === true, 'Tamil response is grounded on official documents');
  assert(taRAG.answer.includes('ரூ.') || taRAG.answer.includes('6,000') || taRAG.answer.includes('கிசான்'), 'Tamil answer contains verified benefits');
  assert(taRAG.citations.length > 0, 'Tamil response includes official citation links');
  console.log('\n[Generated Tamil Answer Sample]:\n', taRAG.answer.slice(0, 220) + '...\n');

  // 7. Documents Vector Store
  console.log('\n--- 7. Testing Documents Store ---');
  const docs = await listDocuments();
  assert(docs.length >= 5, `Store contains ${docs.length} official documents`);

  console.log('\n========================================================');
  console.log(`   TEST RESULTS: ${passed}/${total} TESTS PASSED (${Math.round(passed/total*100)}%)`);
  console.log('========================================================\n');
}

runTests().catch(err => {
  console.error('Test Suite Failed:', err);
  process.exit(1);
});
