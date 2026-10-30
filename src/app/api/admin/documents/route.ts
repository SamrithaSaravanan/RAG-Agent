import { NextRequest, NextResponse } from 'next/server';
import { listDocuments, deleteDocument, ingestDocument } from '@/lib/vector-store';
import { processPDFBuffer } from '@/lib/pdf-processor';

// Check if request is authenticated
function isAuthenticated(req: NextRequest): boolean {
  const token = req.cookies.get('admin_token')?.value;
  return token === 'saarthi_admin_authenticated';
}

export async function GET(req: NextRequest) {
  try {
    const documents = await listDocuments();
    return NextResponse.json({ documents });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to retrieve documents.', details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    if (!isAuthenticated(req)) {
      return NextResponse.json(
        { error: 'Unauthorized. Admin credentials required.' },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const name = formData.get('name') as string || file?.name || 'Untitled Document';
    const department = formData.get('department') as string || 'Government of India';
    const sourceUrl = formData.get('sourceUrl') as string || 'https://www.india.gov.in/';

    if (!file) {
      return NextResponse.json(
        { error: 'PDF file is required.' },
        { status: 400 }
      );
    }

    if (!file.name.toLowerCase().endsWith('.pdf')) {
      return NextResponse.json(
        { error: 'Only PDF format documents are supported.' },
        { status: 400 }
      );
    }

    // Convert file to Node buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 1. Extract text and generate chunks
    const extractionResult = await processPDFBuffer(buffer);

    if (!extractionResult.chunks || extractionResult.chunks.length === 0) {
      return NextResponse.json(
        { error: 'Could not extract valid text content from the PDF.' },
        { status: 422 }
      );
    }

    // 2. Generate embeddings and store in pgvector / vector store
    const { documentId, totalChunks } = await ingestDocument({
      name,
      department,
      sourceUrl,
      chunks: extractionResult.chunks,
      fileSize: file.size,
    });

    return NextResponse.json({
      success: true,
      documentId,
      name,
      totalPages: extractionResult.totalPages,
      totalChunks,
      message: `Successfully processed and indexed ${totalChunks} chunks into RAG knowledge base.`,
    });
  } catch (error: any) {
    console.error('Document Ingestion Error:', error);
    return NextResponse.json(
      { error: 'PDF ingestion failed.', details: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    if (!isAuthenticated(req)) {
      return NextResponse.json(
        { error: 'Unauthorized. Admin credentials required.' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Document ID is required.' },
        { status: 400 }
      );
    }

    const deleted = await deleteDocument(id);
    return NextResponse.json({ success: deleted });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to delete document.', details: error.message },
      { status: 500 }
    );
  }
}
