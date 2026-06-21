"use client";

import React, { useEffect } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { AlertCircle, ArrowRightLeft } from "lucide-react";
import { useAnalysis } from "@/context/AnalysisContext";
import { useRouter } from "next/navigation";

export default function JobMatchPage() {
  const { resumeText, jdText, analysisResult } = useAnalysis();
  const router = useRouter();

  useEffect(() => {
    if (!analysisResult) {
      router.push("/dashboard/upload");
    }
  }, [analysisResult, router]);

  if (!analysisResult) {
    return <div className="p-8 text-center text-gray-400">Loading analysis...</div>;
  }

  return (
    <div className="h-full flex flex-col animate-in fade-in duration-700 pb-10">
      <div className="mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold mb-2">Job Match Comparison</h1>
          <p className="text-gray-400">Comparing your extracted resume text against the Job Description.</p>
        </div>
        <div className="px-6 py-2 rounded-full glass-panel flex items-center gap-3 border-[var(--emerald-green)]/30 shadow-[0_0_20px_-5px_rgba(16,185,129,0.2)]">
          <span className="text-gray-400 text-sm font-medium">Match Score</span>
          <span className="text-2xl font-black text-[var(--emerald-green)]">{Math.round(analysisResult.ats_score)}%</span>
        </div>
      </div>

      <div className="flex-1 grid lg:grid-cols-2 gap-6 min-h-[600px]">
        {/* Resume Panel */}
        <GlassCard className="p-0 overflow-hidden flex flex-col border-l-4 border-l-[var(--electric-blue)] h-[600px]">
          <div className="p-4 border-b border-white/10 bg-white/5 font-bold flex justify-between items-center">
            Your Resume Extracted Text
          </div>
          <div className="p-8 overflow-y-auto flex-1 font-mono text-xs bg-black/20 text-gray-300 whitespace-pre-wrap">
            {resumeText}
          </div>
        </GlassCard>

        {/* Job Description Panel */}
        <GlassCard className="p-0 overflow-hidden flex flex-col border-l-4 border-l-purple-500 relative h-[600px]">
          {/* Link Icon in middle on desktop */}
          <div className="absolute top-1/2 -left-6 -translate-y-1/2 w-12 h-12 rounded-full glass-panel bg-[var(--dark-bg)] z-10 hidden lg:flex items-center justify-center border border-white/20 shadow-xl">
            <ArrowRightLeft className="w-5 h-5 text-gray-300" />
          </div>

          <div className="p-4 border-b border-white/10 bg-white/5 font-bold flex justify-between items-center">
            Job Description
          </div>
          <div className="p-8 overflow-y-auto flex-1 font-sans text-sm text-gray-300 whitespace-pre-wrap">
            {jdText}
            
            {analysisResult.missing_skills.length > 0 && (
              <>
                <h3 className="font-bold mt-8 mb-4 text-purple-400 border-t border-white/10 pt-4">Missing Requirements Alerts</h3>
                <ul className="list-disc pl-5 space-y-2">
                  {analysisResult.missing_skills.map((skill, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-orange-500 inline" /> 
                      {skill} 
                      <span className="text-xs text-orange-500 bg-orange-500/10 px-2 py-0.5 rounded-full ml-2">Missing</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
