import React from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { CircularProgress } from "@/components/ui/circular-progress";
import { FileText, Target, Trophy, AlertTriangle, ArrowUpRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function DashboardHome() {
  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold mb-2">Welcome to your Dashboard 👋</h1>
          <p className="text-gray-400">Upload a resume to get your personalized analysis and job match score.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* ATS Score Card */}
        <GlassCard className="flex flex-col items-center justify-center text-center p-8 relative overflow-hidden group border-[var(--electric-blue)]/30 shadow-[0_0_30px_-10px_rgba(79,70,229,0.2)]">
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--electric-blue)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <h3 className="text-gray-400 font-medium text-sm mb-6 uppercase tracking-wider">Overall ATS Score</h3>
          <CircularProgress value={0} size={140} color="var(--electric-blue)" label="Pending" />
        </GlassCard>

        {/* Job Match Card */}
        <GlassCard className="flex flex-col justify-between p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-full bg-[var(--electric-blue)]/20 flex items-center justify-center">
              <Target className="w-5 h-5 text-[var(--electric-blue)]" />
            </div>
            <span className="text-xs font-bold px-2 py-1 bg-[var(--emerald-green)]/20 text-[var(--emerald-green)] rounded-md">High Match</span>
          </div>
          <div>
            <h3 className="text-4xl font-black mb-1">--%</h3>
            <p className="text-sm text-gray-400 font-medium">Job Compatibility</p>
          </div>
          <div className="w-full bg-white/10 h-2 rounded-full mt-4 overflow-hidden">
            <div className="h-full bg-[var(--electric-blue)]/50 w-[0%] rounded-full"></div>
          </div>
        </GlassCard>

        {/* AI Insights Card */}
        <GlassCard className="lg:col-span-2 p-6 flex flex-col">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-5 h-5 text-gray-500" />
            <h3 className="font-bold text-lg text-gray-400">AI Recommendations</h3>
          </div>
          <div className="flex-1 flex items-center justify-center border border-dashed border-white/10 rounded-lg bg-black/20 p-6">
            <p className="text-gray-500 text-sm text-center">Upload your resume and a job description to generate actionable AI insights and feedback.</p>
          </div>
        </GlassCard>
      </div>

      <h2 className="text-xl font-bold mt-4">Resume Strength Breakdown</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Skills Score", score: 0, color: "var(--electric-blue)" },
          { title: "Experience Score", score: 0, color: "var(--electric-blue)" },
          { title: "Formatting Score", score: 0, color: "var(--electric-blue)" },
          { title: "Keywords Score", score: 0, color: "var(--electric-blue)" },
        ].map((item, idx) => (
          <GlassCard key={idx} className="p-5 flex flex-col justify-between group cursor-default hover:bg-white/5 transition-colors">
            <div className="text-gray-400 font-medium text-sm mb-4">{item.title}</div>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-bold">{item.score}<span className="text-base text-gray-500 font-normal">/100</span></div>
              <ArrowUpRight className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" />
            </div>
            <div className="w-full bg-white/10 h-1.5 rounded-full mt-4 overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${item.score}%`, backgroundColor: item.color }}></div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
