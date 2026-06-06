from fastapi import FastAPI, UploadFile, File, HTTPException
from pydantic import BaseModel
import os
import fitz  # PyMuPDF
from dotenv import load_dotenv

try:
    from services.rag import chunk_and_store_text, similarity_search
except ImportError:
    pass # Will fail gracefully if not correctly set up

load_dotenv()

app = FastAPI(title="AI Resume Analyzer API")

class HealthCheck(BaseModel):
    status: str

class EmbedRequest(BaseModel):
    document_id: str
    text: str
    collection_name: str
    metadata: dict = None

class SearchRequest(BaseModel):
    query: str
    collection_name: str
    k: int = 5
    document_id: str = None

@app.get("/health", response_model=HealthCheck)
def health_check():
    return {"status": "ok"}

@app.post("/api/extract-pdf")
async def extract_pdf(file: UploadFile = File(...)):
    if not file.filename.lower().endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")
    
    try:
        contents = await file.read()
        doc = fitz.open(stream=contents, filetype="pdf")
        text = ""
        for page in doc:
            text += page.get_text()
            
        doc.close()
        
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
            collection_name=request.collection_name,
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
            collection_name=request.collection_name,
            k=request.k,
            document_id=request.document_id
        )
        return {"status": "success", "results": results}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error during search: {str(e)}")

@app.get("/")
def read_root():
    return {"message": "AI Resume Analyzer FastAPI Service is running."}
