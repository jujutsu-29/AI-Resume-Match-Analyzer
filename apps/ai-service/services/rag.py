import os
from langchain_google_genai import GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import SupabaseVectorStore
from supabase.client import Client, create_client
from dotenv import load_dotenv

load_dotenv()

# We expect GEMINI_API_KEY, SUPABASE_URL, and SUPABASE_SERVICE_KEY in the environment
embeddings = GoogleGenerativeAIEmbeddings(model="models/gemini-embedding-001")
llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash") # or preferred model

supabase_url = os.getenv("SUPABASE_URL")
supabase_key = os.getenv("SUPABASE_SERVICE_KEY")

def get_supabase_client() -> Client:
    if not supabase_url or not supabase_key:
        raise ValueError("Supabase credentials not found in environment")
    return create_client(supabase_url, supabase_key)

def chunk_and_store_text(text: str, document_id: str, metadata: dict = None):
    """Splits text into chunks and stores them in Supabase pgvector."""
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200,
        length_function=len,
    )
    
    chunks = text_splitter.split_text(text)
    
    # Add metadata to track which document these chunks belong to
    metadatas = [{"document_id": document_id, **(metadata or {})} for _ in chunks]
    
    supabase = get_supabase_client()
    
    # Using SupabaseVectorStore to add texts
    vector_store = SupabaseVectorStore(
        client=supabase,
        embedding=embeddings,
        table_name="resume_embeddings",
        query_name="match_resume_embeddings",
    )
    
    vector_store.add_texts(texts=chunks, metadatas=metadatas)
    
    return len(chunks)

def similarity_search(query: str, k: int = 5, document_id: str = None):
    """Performs similarity search in the Supabase vector store."""
    supabase = get_supabase_client()
    
    vector_store = SupabaseVectorStore(
        client=supabase,
        embedding=embeddings,
        table_name="resume_embeddings",
        query_name="match_resume_embeddings",
    )
    
    # Filter by document_id if provided
    filter_dict = {"document_id": document_id} if document_id else {}
    
    results = vector_store.similarity_search(query, k=k, filter=filter_dict)
    return [doc.page_content for doc in results]
