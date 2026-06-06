import os
from langchain_google_genai import GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.vectorstores.pgvector import PGVector
from dotenv import load_dotenv

load_dotenv()

# We expect GEMINI_API_KEY and DATABASE_URL in the environment
embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
llm = ChatGoogleGenerativeAI(model="gemini-1.5-flash") # or preferred model

CONNECTION_STRING = os.getenv("DATABASE_URL")

def get_vector_store(collection_name: str):
    """Initializes and returns a PGVector store for a specific collection."""
    if not CONNECTION_STRING:
        raise ValueError("DATABASE_URL is not set.")
    
    return PGVector(
        collection_name=collection_name,
        connection_string=CONNECTION_STRING,
        embedding_function=embeddings,
    )

def chunk_and_store_text(text: str, document_id: str, collection_name: str, metadata: dict = None):
    """Splits text into chunks and stores them in pgvector."""
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200,
        length_function=len,
    )
    
    chunks = text_splitter.split_text(text)
    
    # Add metadata to track which document these chunks belong to
    metadatas = [{"document_id": document_id, **(metadata or {})} for _ in chunks]
    
    vectorstore = get_vector_store(collection_name)
    vectorstore.add_texts(texts=chunks, metadatas=metadatas)
    
    return len(chunks)

def similarity_search(query: str, collection_name: str, k: int = 5, document_id: str = None):
    """Performs similarity search in the vector store."""
    vectorstore = get_vector_store(collection_name)
    
    # Filter by document_id if provided (useful for querying against a specific resume or JD)
    filter_dict = {"document_id": document_id} if document_id else None
    
    results = vectorstore.similarity_search(query, k=k, filter=filter_dict)
    return [doc.page_content for doc in results]
