# AI Resume Match Analyzer

An AI-powered application designed to evaluate resumes against job descriptions using RAG (Retrieval-Augmented Generation) and LLMs.

## Tech Stack
- **Frontend**: Next.js 15, React Query, TailwindCSS, Shadcn UI
- **Backend API**: Next.js API Routes + NextAuth
- **AI Microservice**: Python FastAPI, LangChain, Gemini API
- **Database**: Supabase PostgreSQL, Prisma ORM, pgvector
- **Infrastructure**: Turborepo, Docker

## Monorepo Structure
- `apps/web`: The Next.js frontend and main API gateway.
- `apps/ai-service`: The Python FastAPI service that handles PDF extraction (PyMuPDF), Embeddings, and AI Analysis.
- `packages/shared`: Shared database models (Prisma) and types.

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="your-supabase-connection-string"
   GEMINI_API_KEY="your-gemini-api-key"
   NEXTAUTH_SECRET="your-nextauth-secret"
   ```

3. **Database Setup**
   Ensure your Supabase instance has the `vector` extension enabled.
   ```bash
   npm run db:generate --workspace=@ai-resume-analyzer/shared
   npm run db:push --workspace=@ai-resume-analyzer/shared
   ```

4. **Run Locally**
   Start the Turborepo development server:
   ```bash
   npm run dev
   ```
   This will start both the Next.js app (localhost:3000) and the FastAPI service (localhost:8000).

## Features
- Resume PDF Upload & Parsing
- Skill Extraction (Languages, Frameworks, Cloud, etc.)
- ATS & Technical Match Scoring
- Missing Keyword Detection
- AI Resume Improvement Suggestions
- Interactive Bullet Rewriter
