"use client";

import { useState } from "react";
import { ResumeUpload } from "@/components/ResumeUpload";
import { JobDescriptionForm } from "@/components/JobDescriptionForm";

export default function DashboardPage() {
  const [resumeText, setResumeText] = useState<string | null>(null);
  const [jobDescription, setJobDescription] = useState<string | null>(null);

  const handleRunAnalysis = () => {
    // Phase 4: trigger analysis
    alert("Analysis triggered! (To be implemented in Phase 4)");
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

      {resumeText && jobDescription && (
        <div className="mt-8 flex justify-center">
          <button 
            onClick={handleRunAnalysis}
            className="px-8 py-3 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 shadow-md"
          >
            Run ATS Analysis
          </button>
        </div>
      )}
    </div>
  );
}
