# SchemeSaarthi (திட்டம்சாரதி) – AI-Powered Government Scheme Assistant

SchemeSaarthi is a production-grade, bilingual (Tamil & English) Retrieval-Augmented Generation (RAG) web application built to help Indian citizens and students navigate, verify, and understand government welfare schemes strictly from official gazettes and notifications.

---

## 🌟 Key Features

1. **100% Grounded AI RAG Architecture**:
   - Every answer is retrieved from official government documents (gazette notifications, operational guidelines, ministry handbooks).
   - Zero hallucination policy: If verified information is not in the official records, the assistant explicitly states so.
2. **True Bilingual Support (English & தமிழ்)**:
   - Complete UI and AI chatbot support in both English and Tamil.
   - Switch languages with a single click at any time.
3. **Structured Citizen Checklists**:
   - Clear eligibility breakdowns.
   - Financial assistance & benefit amounts.
   - Interactive document checklists with checkboxes for citizens to prepare before applying.
   - Numbered step-by-step application procedures with verified links to official portals.
4. **Official Source Citations**:
   - Every factual AI response includes source document names, page references, and clickable official portal links.
5. **Protected Admin Ingestion Portal**:
   - Password-protected administrative console (`/admin`).
   - Drag-and-drop PDF upload for new government scheme gazettes.
   - Automatic text extraction, semantic chunking, and 768-dimensional Gemini vector embedding generation into Supabase pgvector.

---

## 🛠️ Technology Stack

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS, Lucide Icons.
- **Backend**: Next.js Serverless API routes (`/api/chat`, `/api/schemes`, `/api/admin/*`).
- **AI / Embeddings**:
  - Google Gemini API (`gemini-1.5-flash`).
  - Google Gemini Embeddings (`text-embedding-004`, 768 dimensions).
- **Vector Database**: Supabase PostgreSQL with `pgvector` extension and HNSW indexing.
- **PDF Extraction**: `pdf-parse` for in-memory buffer processing.
- **Deployment**: Vercel ready (Serverless Edge & Node.js runtime).

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- Node.js 18+ (tested on Node 22)
- npm or pnpm

### 2. Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Populate the variables:
```env
# Google Gemini API Key (Get from https://aistudio.google.com/)
GEMINI_API_KEY=your_gemini_api_key

# Supabase Configuration (Get from Supabase Project Settings > API)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Administrator Password
ADMIN_PASSWORD=schemesaarthi2026
```

> **Note**: Even before setting external API keys, SchemeSaarthi operates seamlessly with an embedded verified knowledge base of 10 national and state schemes so you can test all UI pages, filters, search, and chatbot responses immediately!

### 3. Supabase Database Setup
1. In your Supabase project dashboard, navigate to the **SQL Editor**.
2. Open `supabase_schema.sql` located in this repository.
3. Run the query to:
   - Enable `pgvector`.
   - Create `documents`, `document_chunks`, and `schemes` tables.
   - Create the vector cosine similarity search RPC function `match_document_chunks`.
   - Set up Row-Level Security (RLS) policies.

### 4. Running Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
scheme-saarthi/
├── src/
│   ├── app/
│   │   ├── admin/page.tsx         # Protected PDF Ingestion & Document Manager
│   │   ├── api/
│   │   │   ├── admin/
│   │   │   │   ├── documents/route.ts # PDF upload, chunking, vector indexing, deletion
│   │   │   │   └── login/route.ts     # Admin authentication
│   │   │   ├── chat/route.ts          # RAG pipeline: vector search + Gemini generation
│   │   │   └── schemes/               # Scheme directory and details API
│   │   ├── chat/page.tsx          # Interactive bilingual AI Chatbot
│   │   ├── schemes/
│   │   │   ├── [id]/page.tsx      # Comprehensive Scheme Details & Interactive Checklist
│   │   │   └── page.tsx           # Searchable Scheme Directory with Category Filters
│   │   ├── globals.css            # Tailwind styling
│   │   ├── layout.tsx             # Root layout with LanguageProvider, Navbar, Footer
│   │   └── page.tsx               # Modern Responsive Homepage
│   ├── components/
│   │   ├── Footer.tsx             # Official portal links & citizen disclaimer
│   │   └── Navbar.tsx             # Responsive header with Tamil/English toggle
│   ├── context/
│   │   └── LanguageContext.tsx    # Global English/Tamil language state
│   └── lib/
│       ├── gemini.ts              # Gemini embeddings & grounded generation
│       ├── pdf-processor.ts       # PDF buffer extraction & semantic chunking
│       ├── schemes-data.ts        # Verified initial scheme knowledge base
│       ├── supabase.ts            # Supabase client & admin connection
│       ├── translations.ts        # Comprehensive bilingual UI dictionary
│       └── vector-store.ts        # pgvector similarity search & ingestion pipeline
├── supabase_schema.sql            # Complete Supabase pgvector schema & functions
├── .env.example                   # Environment configuration template
├── package.json
└── README.md
```

---

## ☁️ Deploying to Vercel

1. Push this project to your GitHub repository:
   ```bash
   git add .
   git commit -m "Complete SchemeSaarthi bilingual RAG application"
   git push origin main
   ```
2. Go to [Vercel](https://vercel.com/) and click **Add New Project**.
3. Import your GitHub repository.
4. Set the **Root Directory** to `scheme-saarthi`.
5. Under **Environment Variables**, add:
   - `GEMINI_API_KEY`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `ADMIN_PASSWORD`
6. Click **Deploy**. Vercel will build and deploy the application.

---

## ⚖️ Official Verification & Disclaimer
SchemeSaarthi provides guidance grounded strictly in official government notifications. Always refer to official government portals ([india.gov.in](https://www.india.gov.in/), [myscheme.gov.in](https://www.myscheme.gov.in/), [scholarships.gov.in](https://scholarships.gov.in/), [pmkisan.gov.in](https://pmkisan.gov.in/), [tn.gov.in](https://www.tn.gov.in/)) for final submissions.
