import json
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import PromptTemplate
from pydantic import BaseModel, Field
from typing import List
from datetime import datetime

# Define the structure we want the LLM to return
class ATSAnalysisResult(BaseModel):
    ats_score: float = Field(description="ATS Match Score between 0 and 100")
    technical_score: float = Field(description="Technical Match Score between 0 and 100")
    ai_ml_score: float = Field(description="AI/ML Match Score between 0 and 100")
    missing_keywords: List[str] = Field(description="List of keywords missing from the resume")
    missing_skills: List[str] = Field(description="List of skills missing from the resume")
    improvement_suggestions: List[str] = Field(description="Suggestions to improve the resume")
    strengths: List[str] = Field(description="Strong areas of the resume")
    weaknesses: List[str] = Field(description="Weak areas of the resume")

def analyze_resume_against_jd(resume_text: str, jd_text: str) -> dict:
    """Uses Gemini to analyze a resume against a job description."""
    
    # Initialize the LLM (make sure GEMINI_API_KEY is in your environment)
    llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash", temperature=0.2)
    
    # In newer LangChain versions, with_structured_output is preferred
    structured_llm = llm.with_structured_output(ATSAnalysisResult)
    
    current_date = datetime.now().strftime("%B %d, %Y")
    
    prompt_template = f"""
    You are an expert ATS (Applicant Tracking System) and senior technical recruiter.
    The current date is {current_date}. 
    Analyze the provided resume against the provided job description.
    
    Job Description:
    {{jd_text}}
    
    Resume:
    {{resume_text}}
    
    Provide a detailed evaluation including ATS score, technical score, AI/ML score, 
    missing keywords, missing skills, strengths, weaknesses, and improvement suggestions.
    """
    
    prompt = PromptTemplate(
        input_variables=["jd_text", "resume_text"],
        template=prompt_template,
    )
    
    chain = prompt | structured_llm
    
    # Execute the chain
    result = chain.invoke({
        "jd_text": jd_text,
        "resume_text": resume_text
    })
    
    return result.model_dump()

def rewrite_bullet_point(bullet_point: str, jd_context: str = "") -> dict:
    """Rewrites a resume bullet point in 3 different styles."""
    
    llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash", temperature=0.5)
    
    prompt_template = """
    You are an expert resume writer. Rewrite the following resume bullet point.
    
    Original Bullet Point:
    {bullet_point}
    
    Job Description Context (use to align keywords if applicable):
    {jd_context}
    
    Provide the output in JSON format with exactly these three keys:
    1. "ats_optimized": The bullet point optimized with keywords for ATS.
    2. "quantified": The bullet point rewritten to emphasize metrics and numbers (make reasonable assumptions if necessary).
    3. "recruiter_friendly": A concise, impactful version of the bullet point.
    
    Return ONLY valid JSON.
    """
    
    prompt = PromptTemplate(
        input_variables=["bullet_point", "jd_context"],
        template=prompt_template,
    )
    
    chain = prompt | llm
    result_msg = chain.invoke({"bullet_point": bullet_point, "jd_context": jd_context})
    
    # Parse the JSON response
    try:
        # Strip markdown code blocks if present
        content = result_msg.content.strip()
        if content.startswith("```json"):
            content = content[7:-3]
        return json.loads(content)
    except Exception as e:
        return {"error": f"Failed to parse LLM output: {str(e)}", "raw": result_msg.content}
