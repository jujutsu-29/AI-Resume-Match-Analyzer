"use client";

import React, { useState, useEffect } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { CircularProgress } from "@/components/ui/circular-progress";
import { RadarChart } from "@/components/ui/radar-chart";
import { Check, X, AlertCircle, TrendingUp, ChevronRight } from "lucide-react";
import { useAnalysis } from "@/context/AnalysisContext";
import { useRouter } from "next/navigation";

export default function AnalysisResultPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const { analysisResult } = useAnalysis();
  const router = useRouter();

  useEffect(() => {
    if (!analysisResult) {
      router.push("/dashboard/upload");
    }
  }, [analysisResult, router]);

  if (!analysisResult) {
    return <div className="p-8 text-center text-gray-400">Loading analysis...</div>;
  }

  // Construct Radar Chart Data
  const radarData = [
    { subject: "Overall", A: analysisResult.ats_score },
    { subject: "Technical", A: analysisResult.technical_score },
    { subject: "AI/ML", A: analysisResult.ai_ml_score },
  ];

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-8 pb-10 animate-in fade-in duration-700">
      
      {/* Hero Header */}
      <GlassCard className="p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10 border-[var(--electric-blue)]/40 shadow-[0_0_50px_-15px_rgba(79,70,229,0.3)]">
        <div className="absolute -right-20 -top-40 w-96 h-96 bg-[var(--electric-blue)]/20 rounded-full filter blur-[100px]"></div>
        
        <div className="relative z-10 flex-1">
          {analysisResult.ats_score >= 80 && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--emerald-green)]/10 text-[var(--emerald-green)] text-xs font-bold uppercase tracking-wider mb-6">
              <TrendingUp className="w-4 h-4" /> Top Candidate Match
            </div>
          )}
          <h1 className="text-4xl md:text-5xl font-black mb-4">Resume Analysis</h1>
          <p className="text-xl text-gray-400 mb-8">Your resume has been processed against the job description. Review the detailed findings below.</p>
          
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => router.push("/dashboard/job-match")}
              className="px-6 py-3 rounded-xl bg-gradient-primary font-bold shadow-lg hover:shadow-[0_0_20px_-5px_rgba(79,70,229,0.5)] transition-all text-sm"
            >
              Enhance Resume with AI
            </button>
            <button 
              onClick={() => window.print()}
              className="px-6 py-3 rounded-xl glass-panel font-bold text-sm hover:bg-white/10 transition-colors"
            >
              Download PDF Report
            </button>
          </div>
        </div>

        <div className="relative z-10">
          <CircularProgress 
            value={Math.round(analysisResult.ats_score)} 
            size={200} 
            strokeWidth={12} 
            color={analysisResult.ats_score >= 80 ? "var(--emerald-green)" : analysisResult.ats_score >= 50 ? "var(--electric-blue)" : "orange"} 
            label="ATS Score" 
          />
        </div>
      </GlassCard>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {["overview", "skills", "keywords"].map((tab) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 rounded-full text-sm font-bold capitalize whitespace-nowrap transition-all ${
              activeTab === tab ? "bg-white text-black shadow-lg shadow-white/10" : "glass-panel text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Left/Main Content Column */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          
          {activeTab === "overview" && (
             <>
               <div className="grid sm:grid-cols-2 gap-6">
                  <GlassCard className="p-6 border-t-4 border-t-[var(--emerald-green)]">
                    <h4 className="font-bold flex items-center gap-2 mb-4 text-[var(--emerald-green)]">
                      <Check className="w-5 h-5" /> Key Strengths
                    </h4>
                    <ul className="list-disc pl-5 text-sm text-gray-300 space-y-2">
                      {analysisResult.strengths.map((str, i) => (
                        <li key={i}>{str}</li>
                      ))}
                      {analysisResult.strengths.length === 0 && <li>No particular strengths identified.</li>}
                    </ul>
                  </GlassCard>
                  <GlassCard className="p-6 border-t-4 border-t-orange-500">
                    <h4 className="font-bold flex items-center gap-2 mb-4 text-orange-500">
                      <AlertCircle className="w-5 h-5" /> Weaknesses
                    </h4>
                    <ul className="list-disc pl-5 text-sm text-gray-300 space-y-2">
                      {analysisResult.weaknesses.map((weak, i) => (
                        <li key={i}>{weak}</li>
                      ))}
                      {analysisResult.weaknesses.length === 0 && <li>No major weaknesses identified.</li>}
                    </ul>
                  </GlassCard>
               </div>
             </>
          )}

          {activeTab === "skills" && (
            <>
              <GlassCard className="p-8 border-t-4 border-t-[var(--electric-blue)]">
                <h3 className="text-2xl font-bold mb-6">Match Radar</h3>
                <RadarChart data={radarData} dataKey="A" nameKey="subject" />
              </GlassCard>
              <GlassCard className="p-6">
                  <h4 className="font-bold flex items-center gap-2 mb-4 text-orange-500">
                    <X className="w-5 h-5" /> Missing Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {analysisResult.missing_skills.map((skill, i) => (
                      <span key={i} className="px-3 py-1 rounded-md bg-orange-500/10 text-orange-500 text-sm font-medium border border-orange-500/20">
                        {skill}
                      </span>
                    ))}
                    {analysisResult.missing_skills.length === 0 && <span className="text-gray-400">All required skills matched!</span>}
                  </div>
              </GlassCard>
            </>
          )}

          {activeTab === "keywords" && (
            <GlassCard className="p-6">
                <h4 className="font-bold flex items-center gap-2 mb-4 text-orange-500">
                  <AlertCircle className="w-5 h-5" /> Missing Keywords
                </h4>
                <div className="flex flex-wrap gap-2">
                  {analysisResult.missing_keywords.map((kw, i) => (
                    <span key={i} className="px-3 py-1 rounded-md bg-gray-500/10 text-gray-300 text-sm font-medium border border-gray-500/20">
                      {kw}
                    </span>
                  ))}
                  {analysisResult.missing_keywords.length === 0 && <span className="text-gray-400">All keywords matched!</span>}
                </div>
            </GlassCard>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="flex flex-col gap-6">
          <GlassCard className="p-6 bg-gradient-to-b from-[var(--electric-blue)]/10 to-transparent">
            <h4 className="font-bold mb-4">Improvement Suggestions</h4>
            <div className="flex flex-col gap-4">
              {analysisResult.improvement_suggestions.map((fix, idx) => (
                <div key={idx} className="flex gap-3 items-start group cursor-pointer">
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-[var(--electric-blue)] transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                  <p className="text-sm text-gray-300 group-hover:text-white transition-colors">{fix}</p>
                </div>
              ))}
              {analysisResult.improvement_suggestions.length === 0 && (
                <p className="text-gray-400 text-sm">Your resume is already highly optimized.</p>
              )}
            </div>
          </GlassCard>
          
          <GlassCard className="p-6">
            <h4 className="font-bold mb-4">Recruiter Readiness</h4>
            <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden mb-2">
              <div 
                className="h-full rounded-full transition-all duration-1000" 
                style={{ 
                  width: `${analysisResult.ats_score}%`,
                  backgroundColor: analysisResult.ats_score >= 80 ? "var(--emerald-green)" : analysisResult.ats_score >= 50 ? "var(--electric-blue)" : "orange"
                }}
              ></div>
            </div>
            <p className="text-xs text-gray-400 text-right">{Math.round(analysisResult.ats_score)}% Ready</p>
          </GlassCard>
        </div>
        
      </div>
    </div>
  );
}
