"use client";

import React, { useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { CircularProgress } from "@/components/ui/circular-progress";
import { RadarChart } from "@/components/ui/radar-chart";
import { Check, X, AlertCircle, TrendingUp, ChevronRight } from "lucide-react";

export default function AnalysisResultPage() {
  const [activeTab, setActiveTab] = useState("skills");

  const skillsData = [
    { subject: "React", A: 95, fullMark: 100 },
    { subject: "Node.js", A: 85, fullMark: 100 },
    { subject: "TypeScript", A: 90, fullMark: 100 },
    { subject: "AWS", A: 60, fullMark: 100 },
    { subject: "GraphQL", A: 40, fullMark: 100 },
    { subject: "System Design", A: 75, fullMark: 100 },
  ];

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-8 pb-10 animate-in fade-in duration-700">
      
      {/* Hero Header */}
      <GlassCard className="p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10 border-[var(--electric-blue)]/40 shadow-[0_0_50px_-15px_rgba(79,70,229,0.3)]">
        <div className="absolute -right-20 -top-40 w-96 h-96 bg-[var(--electric-blue)]/20 rounded-full filter blur-[100px]"></div>
        
        <div className="relative z-10 flex-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--emerald-green)]/10 text-[var(--emerald-green)] text-xs font-bold uppercase tracking-wider mb-6">
            <TrendingUp className="w-4 h-4" /> Top 5% Candidate
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4">Senior Frontend Engineer</h1>
          <p className="text-xl text-gray-400 mb-8">Your resume is highly optimized for this role, but there is room for improvement in backend technologies.</p>
          
          <div className="flex flex-wrap gap-4">
            <button className="px-6 py-3 rounded-xl bg-gradient-primary font-bold shadow-lg hover:shadow-[0_0_20px_-5px_rgba(79,70,229,0.5)] transition-all text-sm">
              Enhance Resume with AI
            </button>
            <button className="px-6 py-3 rounded-xl glass-panel font-bold text-sm hover:bg-white/10 transition-colors">
              Download PDF Report
            </button>
          </div>
        </div>

        <div className="relative z-10">
          <CircularProgress value={88} size={200} strokeWidth={12} color="var(--electric-blue)" label="ATS Score" />
        </div>
      </GlassCard>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {["overview", "skills", "keywords", "experience", "recommendations"].map((tab) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 rounded-full text-sm font-bold capitalize whitespace-nowrap transition-all ${
              activeTab === tab ? "bg-white text-black shadow-lg shadow-white/10" : "glass-panel text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            {tab} Analysis
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Left/Main Content Column */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          {activeTab === "skills" && (
            <>
              <GlassCard className="p-8 border-t-4 border-t-[var(--electric-blue)]">
                <h3 className="text-2xl font-bold mb-6">Skill Alignment Radar</h3>
                <RadarChart data={skillsData} dataKey="A" nameKey="subject" />
              </GlassCard>
              
              <div className="grid sm:grid-cols-2 gap-6">
                <GlassCard className="p-6">
                  <h4 className="font-bold flex items-center gap-2 mb-4 text-[var(--emerald-green)]">
                    <Check className="w-5 h-5" /> Matched Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {["React", "TypeScript", "Node.js", "Tailwind CSS", "Redux", "Jest"].map(skill => (
                      <span key={skill} className="px-3 py-1 rounded-md bg-[var(--emerald-green)]/10 text-[var(--emerald-green)] text-sm font-medium border border-[var(--emerald-green)]/20">
                        {skill}
                      </span>
                    ))}
                  </div>
                </GlassCard>
                <GlassCard className="p-6">
                  <h4 className="font-bold flex items-center gap-2 mb-4 text-orange-500">
                    <X className="w-5 h-5" /> Missing Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {["GraphQL", "AWS", "CI/CD", "Docker", "Microservices"].map(skill => (
                      <span key={skill} className="px-3 py-1 rounded-md bg-orange-500/10 text-orange-500 text-sm font-medium border border-orange-500/20">
                        {skill}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              </div>
            </>
          )}

          {activeTab !== "skills" && (
            <GlassCard className="p-12 flex flex-col items-center justify-center text-center h-full min-h-[400px]">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6">
                <AlertCircle className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold mb-2 capitalize">{activeTab} Details</h3>
              <p className="text-gray-400">Content for the {activeTab} tab will populate here based on the full resume parse.</p>
            </GlassCard>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="flex flex-col gap-6">
          <GlassCard className="p-6 bg-gradient-to-b from-[var(--electric-blue)]/10 to-transparent">
            <h4 className="font-bold mb-4">Quick Fixes</h4>
            <div className="flex flex-col gap-4">
              {[
                "Add 'GraphQL' to your technical skills section.",
                "Quantify your bullet point for 'Led frontend migration'.",
                "Ensure action verbs are used at the start of every sentence."
              ].map((fix, idx) => (
                <div key={idx} className="flex gap-3 items-start group cursor-pointer">
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-[var(--electric-blue)] transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                  <p className="text-sm text-gray-300 group-hover:text-white transition-colors">{fix}</p>
                </div>
              ))}
            </div>
          </GlassCard>
          
          <GlassCard className="p-6">
            <h4 className="font-bold mb-4">Recruiter Readiness</h4>
            <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden mb-2">
              <div className="h-full bg-[var(--emerald-green)] w-[90%] rounded-full"></div>
            </div>
            <p className="text-xs text-gray-400 text-right">90% Ready</p>
          </GlassCard>
        </div>
        
      </div>
    </div>
  );
}
