import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    // For MVP, if no session, we skip saving or use a dummy user. Let's require auth ideally, 
    // but to avoid blocking the MVP if auth isn't clicked, we can just proceed without saving to DB if no session, 
    // OR create a dummy user. Let's assume we want to save it under the session user.
    
    const body = await req.json();
    const { resume_text, jd_text } = body;

    if (!resume_text || !jd_text) {
      return NextResponse.json({ error: "Missing resume or job description text" }, { status: 400 });
    }

    const fastApiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
    
    const response = await fetch(`${fastApiUrl}/api/analyze`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ resume_text, jd_text }),
    });

    if (!response.ok) {
      const errText = await response.text();
      return NextResponse.json({ error: `FastAPI Error: ${errText}` }, { status: response.status });
    }

    const data = await response.json();
    const analysisResult = data.analysis;

    // Database Saving Logic
    if (session?.user?.id) {
      // 1. Create JD
      const jd = await db.jobDescription.create({
        data: { title: "Analyzed JD", textContent: jd_text }
      });

      // 2. Create Resume
      const resume = await db.resume.create({
        data: { userId: session.user.id, filename: "uploaded_resume.pdf", textContent: resume_text }
      });

      // 3. Save Analysis
      await db.analysis.create({
        data: {
          resumeId: resume.id,
          jobDescriptionId: jd.id,
          atsScore: analysisResult.ats_score,
          technicalScore: analysisResult.technical_score,
          aiMlScore: analysisResult.ai_ml_score,
          missingKeywords: analysisResult.missing_keywords,
          missingSkills: analysisResult.missing_skills,
          improvementSuggestions: analysisResult.improvement_suggestions,
          strengths: analysisResult.strengths,
          weaknesses: analysisResult.weaknesses,
        }
      });
      
      // 4. Log AI Usage
      await db.aiUsage.create({
        data: {
          userId: session.user.id,
          operation: "ats_analysis",
          tokensUsed: 1500, // Roughly estimated for MVP
          processingTimeMs: 2500
        }
      });
    }

    return NextResponse.json(data);
    
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
