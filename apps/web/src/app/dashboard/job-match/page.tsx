"use client";

import React from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { CheckCircle2, AlertCircle, ArrowRightLeft } from "lucide-react";

export default function JobMatchPage() {
  return (
    <div className="h-full flex flex-col animate-in fade-in duration-700">
      <div className="mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold mb-2">Job Match Comparison</h1>
          <p className="text-gray-400">Comparing your resume against the Software Engineer JD.</p>
        </div>
        <div className="px-6 py-2 rounded-full glass-panel flex items-center gap-3 border-[var(--emerald-green)]/30 shadow-[0_0_20px_-5px_rgba(16,185,129,0.2)]">
          <span className="text-gray-400 text-sm font-medium">Match Score</span>
          <span className="text-2xl font-black text-[var(--emerald-green)]">92%</span>
        </div>
      </div>

      <div className="flex-1 grid lg:grid-cols-2 gap-6 min-h-[600px]">
        {/* Resume Panel */}
        <GlassCard className="p-0 overflow-hidden flex flex-col border-l-4 border-l-[var(--electric-blue)]">
          <div className="p-4 border-b border-white/10 bg-white/5 font-bold flex justify-between items-center">
            Your Resume
            <span className="text-xs font-normal text-gray-400 bg-black/40 px-3 py-1 rounded-full">resume_v4_final.pdf</span>
          </div>
          <div className="p-8 overflow-y-auto flex-1 font-serif bg-white text-black">
            <h2 className="text-2xl font-bold mb-1">John Doe</h2>
            <p className="text-sm text-gray-600 mb-6">Senior Frontend Engineer | New York, NY</p>
            
            <h3 className="font-bold border-b border-gray-300 pb-1 mb-3 uppercase text-xs tracking-wider">Experience</h3>
            <div className="mb-4">
              <div className="flex justify-between font-bold text-sm">
                <span>Tech Corp Inc.</span>
                <span>2020 - Present</span>
              </div>
              <p className="text-sm italic mb-2">Lead Software Engineer</p>
              <ul className="list-disc pl-5 text-sm space-y-1">
                <li className="bg-green-100 rounded px-1">Spearheaded the migration of a legacy Angular app to <strong className="text-green-700">React</strong> and <strong className="text-green-700">TypeScript</strong>.</li>
                <li>Improved rendering performance by 40% using memoization and code splitting.</li>
                <li className="bg-green-100 rounded px-1">Mentored 5 junior developers and established <strong className="text-green-700">Agile</strong> best practices.</li>
              </ul>
            </div>
            
            <h3 className="font-bold border-b border-gray-300 pb-1 mb-3 mt-6 uppercase text-xs tracking-wider">Skills</h3>
            <p className="text-sm">
              <span className="bg-green-100 text-green-800 px-1 rounded font-medium">JavaScript</span>, <span className="bg-green-100 text-green-800 px-1 rounded font-medium">React</span>, <span className="bg-green-100 text-green-800 px-1 rounded font-medium">Node.js</span>, CSS, HTML, <span className="bg-red-100 text-red-800 px-1 rounded line-through">Python</span>
            </p>
          </div>
        </GlassCard>

        {/* Job Description Panel */}
        <GlassCard className="p-0 overflow-hidden flex flex-col border-l-4 border-l-purple-500 relative">
          {/* Link Icon in middle on desktop */}
          <div className="absolute top-1/2 -left-6 -translate-y-1/2 w-12 h-12 rounded-full glass-panel bg-[var(--dark-bg)] z-10 hidden lg:flex items-center justify-center border border-white/20 shadow-xl">
            <ArrowRightLeft className="w-5 h-5 text-gray-300" />
          </div>

          <div className="p-4 border-b border-white/10 bg-white/5 font-bold flex justify-between items-center">
            Job Description
            <span className="text-xs font-normal text-gray-400 bg-black/40 px-3 py-1 rounded-full">Senior Engineer @ StartupX</span>
          </div>
          <div className="p-8 overflow-y-auto flex-1 font-sans">
            <h2 className="text-2xl font-bold mb-4">Senior Full Stack Engineer</h2>
            
            <h3 className="font-bold mt-6 mb-2 text-purple-400">About the Role</h3>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              We are looking for a Senior Engineer to join our fast-paced startup. You will be responsible for building highly scalable web applications from scratch.
            </p>

            <h3 className="font-bold mt-6 mb-2 text-purple-400">Requirements</h3>
            <ul className="list-disc pl-5 text-sm space-y-2 text-gray-300">
              <li>5+ years of experience with <span className="text-white font-bold bg-white/10 px-1 rounded border border-white/20">React</span> and modern frontend frameworks.</li>
              <li>Strong proficiency in <span className="text-white font-bold bg-white/10 px-1 rounded border border-white/20">TypeScript</span> and <span className="text-white font-bold bg-white/10 px-1 rounded border border-white/20">Node.js</span>.</li>
              <li className="flex items-center gap-2"><AlertCircle className="w-4 h-4 text-orange-500 inline" /> Experience with <strong>GraphQL</strong> API design. <span className="text-xs text-orange-500 bg-orange-500/10 px-2 py-0.5 rounded-full ml-2">Missing</span></li>
              <li>Familiarity with cloud platforms, preferably <strong>AWS</strong>.</li>
              <li>Proven track record working in an <span className="text-white font-bold bg-white/10 px-1 rounded border border-white/20">Agile</span> environment.</li>
            </ul>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
