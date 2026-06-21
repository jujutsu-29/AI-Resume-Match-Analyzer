"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export interface ATSAnalysisResult {
  ats_score: number;
  technical_score: number;
  ai_ml_score: number;
  missing_keywords: string[];
  missing_skills: string[];
  improvement_suggestions: string[];
  strengths: string[];
  weaknesses: string[];
}

interface AnalysisContextType {
  resumeText: string;
  setResumeText: (text: string) => void;
  jdText: string;
  setJdText: (text: string) => void;
  analysisResult: ATSAnalysisResult | null;
  setAnalysisResult: (result: ATSAnalysisResult | null) => void;
  clearAnalysis: () => void;
}

const AnalysisContext = createContext<AnalysisContextType | undefined>(undefined);

export function AnalysisProvider({ children }: { children: ReactNode }) {
  const [resumeText, setResumeText] = useState("");
  const [jdText, setJdText] = useState("");
  const [analysisResult, setAnalysisResult] = useState<ATSAnalysisResult | null>(null);

  const clearAnalysis = () => {
    setResumeText("");
    setJdText("");
    setAnalysisResult(null);
  };

  return (
    <AnalysisContext.Provider
      value={{
        resumeText,
        setResumeText,
        jdText,
        setJdText,
        analysisResult,
        setAnalysisResult,
        clearAnalysis,
      }}
    >
      {children}
    </AnalysisContext.Provider>
  );
}

export function useAnalysis() {
  const context = useContext(AnalysisContext);
  if (context === undefined) {
    throw new Error("useAnalysis must be used within an AnalysisProvider");
  }
  return context;
}
