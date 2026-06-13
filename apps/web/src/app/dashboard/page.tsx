"use client";

import { useState } from "react";
import { ResumeUpload } from "@/components/ResumeUpload";
import { JobDescriptionForm } from "@/components/JobDescriptionForm";
import { BulletRewriter } from "@/components/BulletRewriter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  const [resumeText, setResumeText] = useState<string | null>(null);
  const [jobDescription, setJobDescription] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleRunAnalysis = async () => {
    if (!resumeText || !jobDescription) return;
    
    setIsAnalyzing(true);
    setError(null);
    
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resume_text: resumeText, jd_text: jobDescription })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Analysis failed");
      }
      
      const data = await response.json();
      setAnalysisResult(data.analysis);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="container mx-auto p-8 max-w-5xl">
      <h1 className="text-3xl font-bold mb-8">AI Resume Match Analyzer</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <ResumeUpload onUploadSuccess={(text) => setResumeText(text)} />
          {resumeText && (
            <div className="mt-4 p-4 bg-green-50 text-green-700 rounded-md">
              <p className="font-semibold">✓ Resume extracted successfully</p>
              <p className="text-sm truncate mt-1">{resumeText.substring(0, 100)}...</p>
            </div>
          )}
        </div>
        
        <div>
          <JobDescriptionForm onSubmit={(text) => setJobDescription(text)} />
          {jobDescription && (
            <div className="mt-4 p-4 bg-green-50 text-green-700 rounded-md">
              <p className="font-semibold">✓ Job Description saved</p>
              <p className="text-sm truncate mt-1">{jobDescription.substring(0, 100)}...</p>
            </div>
          )}
        </div>
      </div>

      {resumeText && jobDescription && !analysisResult && (
        <div className="mt-8 flex flex-col items-center">
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button 
            onClick={handleRunAnalysis}
            disabled={isAnalyzing}
            className="px-8 py-3 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 shadow-md disabled:bg-blue-400"
          >
            {isAnalyzing ? "Analyzing..." : "Run ATS Analysis"}
          </button>
        </div>
      )}

      {analysisResult && (
        <div className="mt-12 space-y-8">
          <h2 className="text-2xl font-bold border-b pb-2">Analysis Results</h2>
          
          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardHeader><CardTitle>ATS Score</CardTitle></CardHeader>
              <CardContent><p className="text-4xl font-bold text-blue-600">{analysisResult.ats_score}%</p></CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Technical Match</CardTitle></CardHeader>
              <CardContent><p className="text-4xl font-bold text-indigo-600">{analysisResult.technical_score}%</p></CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>AI/ML Match</CardTitle></CardHeader>
              <CardContent><p className="text-4xl font-bold text-purple-600">{analysisResult.ai_ml_score}%</p></CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader><CardTitle>Missing Keywords</CardTitle></CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-1 text-red-600">
                  {analysisResult.missing_keywords.map((kw: string, i: number) => <li key={i}>{kw}</li>)}
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Missing Skills</CardTitle></CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-1 text-orange-600">
                  {analysisResult.missing_skills.map((skill: string, i: number) => <li key={i}>{skill}</li>)}
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Strengths</CardTitle></CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-1 text-green-700">
                  {analysisResult.strengths.map((str: string, i: number) => <li key={i}>{str}</li>)}
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Improvement Suggestions</CardTitle></CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-1 text-blue-700">
                  {analysisResult.improvement_suggestions.map((sug: string, i: number) => <li key={i}>{sug}</li>)}
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <BulletRewriter jdContext={jobDescription || ""} />
        </div>
      )}
    </div>
  );
}
