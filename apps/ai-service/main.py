from fastapi import FastAPI, UploadFile, File, HTTPException
from pydantic import BaseModel
import os
from pypdf import PdfReader
import io
from dotenv import load_dotenv

from services.rag import chunk_and_store_text, similarity_search

try:
    from services.ats import analyze_resume_against_jd, rewrite_bullet_point
except ImportError:
    pass

from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

frontend_url = os.getenv("FRONTEND_URL", "https://ai-resume-match-analyzer-web.vercel.app")
app = FastAPI(title="AI Resume Analyzer API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000", 
        "http://127.0.0.1:3000", 
        frontend_url
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class HealthCheck(BaseModel):
    status: str

class EmbedRequest(BaseModel):
    document_id: str
    text: str
    metadata: dict = None

class SearchRequest(BaseModel):
    query: str
    k: int = 5
    document_id: str = None

class AnalysisRequest(BaseModel):
    resume_text: str
    jd_text: str

class RewriteRequest(BaseModel):
    bullet_point: str
    jd_context: str = ""

class ChatRequest(BaseModel):
    query: str
    document_id: str
    chat_history: list = []

@app.get("/health", response_model=HealthCheck)
def health_check():
    return {"status": "ok"}

@app.post("/api/extract-pdf")
async def extract_pdf(file: UploadFile = File(...)):
    if not file.filename.lower().endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")
    
    try:
        contents = await file.read()
        reader = PdfReader(io.BytesIO(contents))
        text = ""
        for page in reader.pages:
            text += page.extract_text() or ""
        
        text = " ".join(text.split())
        
        return {"filename": file.filename, "text": text}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error extracting PDF: {str(e)}")

@app.post("/api/embed")
async def embed_document(request: EmbedRequest):
    try:
        num_chunks = chunk_and_store_text(
            text=request.text, 
            document_id=request.document_id,
            metadata=request.metadata
        )
        return {"status": "success", "chunks_embedded": num_chunks}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error embedding document: {str(e)}")

@app.post("/api/search")
async def search_documents(request: SearchRequest):
    try:
        results = similarity_search(
            query=request.query,
            k=request.k,
            document_id=request.document_id
        )
        return {"status": "success", "results": results}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error during search: {str(e)}")

@app.post("/api/analyze")
async def analyze_resume(request: AnalysisRequest):
    try:
        result = analyze_resume_against_jd(request.resume_text, request.jd_text)
        return {"status": "success", "analysis": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error analyzing resume: {str(e)}")

@app.post("/api/rewrite-bullet")
async def rewrite_bullet(request: RewriteRequest):
    try:
        result = rewrite_bullet_point(request.bullet_point, request.jd_context)
        return {"status": "success", "rewrites": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error rewriting bullet: {str(e)}")

from services.chat import get_chat_response

@app.post("/api/chat")
async def chat_with_resume(request: ChatRequest):
    try:
        response = get_chat_response(
            query=request.query, 
            document_id=request.document_id, 
            chat_history=request.chat_history
        )
        return {"status": "success", "response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error during chat: {str(e)}")

@app.get("/")
def read_root():
    return {"message": "AI Resume Analyzer FastAPI Service is running."}
