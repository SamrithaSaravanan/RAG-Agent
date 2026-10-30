import { PDFParse } from 'pdf-parse';

export interface ProcessedChunk {
  chunkIndex: number;
  pageNumber: number;
  content: string;
}

export interface PDFExtractionResult {
  text: string;
  totalPages: number;
  info: any;
  chunks: ProcessedChunk[];
}

/**
 * Clean and normalize extracted text
 */
export function cleanText(rawText: string): string {
  return rawText
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/\t/g, ' ')
    .replace(/[ \u00A0]+/g, ' ') // Replace multiple spaces and non-breaking spaces
    .replace(/\n{3,}/g, '\n\n') // Collapse excessive newlines
    .trim();
}

/**
 * Split text into semantic overlapping chunks
 */
export function splitIntoChunks(
  text: string,
  chunkSize: number = 700,
  chunkOverlap: number = 100,
  totalPages: number = 1
): ProcessedChunk[] {
  const cleaned = cleanText(text);
  if (!cleaned) return [];

  const chunks: ProcessedChunk[] = [];
  const paragraphs = cleaned.split('\n\n');
  let currentChunk = '';
  let chunkIdx = 0;

  for (const para of paragraphs) {
    const trimmedPara = para.trim();
    if (!trimmedPara) continue;

    if (currentChunk.length + trimmedPara.length + 2 <= chunkSize) {
      currentChunk += (currentChunk ? '\n\n' : '') + trimmedPara;
    } else {
      if (currentChunk) {
        // Estimate page number proportionally
        const approxProgress = Math.min(1, (chunks.length * chunkSize) / Math.max(1, cleaned.length));
        const estimatedPage = Math.max(1, Math.ceil(approxProgress * totalPages));

        chunks.push({
          chunkIndex: chunkIdx++,
          pageNumber: estimatedPage,
          content: currentChunk.trim(),
        });

        // Retain overlap from end of current chunk
        const overlapStart = Math.max(0, currentChunk.length - chunkOverlap);
        const overlapText = currentChunk.slice(overlapStart);
        currentChunk = overlapText + '\n\n' + trimmedPara;
      } else {
        // Individual paragraph is larger than chunkSize, slice it
        let start = 0;
        while (start < trimmedPara.length) {
          const end = Math.min(start + chunkSize, trimmedPara.length);
          const slice = trimmedPara.slice(start, end);
          chunks.push({
            chunkIndex: chunkIdx++,
            pageNumber: Math.max(1, Math.ceil(((chunks.length * chunkSize) / Math.max(1, cleaned.length)) * totalPages)),
            content: slice.trim(),
          });
          start += chunkSize - chunkOverlap;
        }
        currentChunk = '';
      }
    }
  }

  if (currentChunk.trim().length > 0) {
    chunks.push({
      chunkIndex: chunkIdx++,
      pageNumber: totalPages,
      content: currentChunk.trim(),
    });
  }

  return chunks;
}

/**
 * Extract text and partition into chunks from PDF buffer
 */
export async function processPDFBuffer(buffer: Buffer): Promise<PDFExtractionResult> {
  try {
    const parser = new PDFParse({ data: buffer });
    const textData = await parser.getText();
    const text = textData?.text || '';
    const totalPages = textData?.total || 1;
    await parser.destroy();

    const chunks = splitIntoChunks(text, 700, 100, totalPages);

    return {
      text,
      totalPages,
      info: {},
      chunks,
    };
  } catch (error) {
    console.warn('PDFParse failed, falling back to raw buffer text extraction:', error);
    // Fallback extraction
    const rawString = buffer.toString('utf-8', 0, Math.min(buffer.length, 50000));
    const cleaned = cleanText(rawString.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F]/g, ' '));
    const chunks = splitIntoChunks(cleaned, 700, 100, 1);

    return {
      text: cleaned,
      totalPages: 1,
      info: {},
      chunks,
    };
  }
}
