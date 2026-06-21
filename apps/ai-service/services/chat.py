import os
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.messages import SystemMessage, HumanMessage, AIMessage

from services.rag import similarity_search

llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash")

def get_chat_response(query: str, document_id: str, chat_history: list) -> str:
    # 1. Retrieve context chunks from Supabase
    try:
        retrieved_chunks = similarity_search(query=query, k=5, document_id=document_id)
        context = "\n\n---\n\n".join(retrieved_chunks)
    except Exception as e:
        print(f"Error retrieving from Supabase: {e}")
        context = "No context could be retrieved from the resume."

    # 2. Build the System Prompt
    system_prompt = f"""You are an expert career coach and AI resume assistant.
The user is asking you a question about their resume.
Use the following chunks retrieved from their resume to answer the question.
If the answer is not contained in the context, just say that you don't know based on the provided resume context.
Do not make up facts about the user's career.

Context from User's Resume:
{context}
"""

    # 3. Format history
    messages = [SystemMessage(content=system_prompt)]
    
    for msg in chat_history:
        role = msg.get("role", "user")
        content = msg.get("content", "")
        if role == "user":
            messages.append(HumanMessage(content=content))
        elif role == "assistant":
            messages.append(AIMessage(content=content))
            
    # 4. Add current query
    messages.append(HumanMessage(content=query))
    
    # 5. Get AI Response
    response = llm.invoke(messages)
    return response.content
