"use client";

import React, { useState, useRef } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { UploadCloud, FileText, CheckCircle2, Target, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAnalysis } from "@/context/AnalysisContext";

export default function UploadPage() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { setResumeText, setJdText, setAnalysisResult, jdText } = useAnalysis();
  const router = useRouter();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      await processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      await processFile(e.target.files[0]);
    }
  };

  const processFile = async (file: File) => {
    if (!jdText.trim()) {
      setError("Please paste a Job Description first so we can analyze the match.");
      return;
    }
    
    if (file.type !== "application/pdf") {
      setError("Please upload a valid PDF file.");
      return;
    }

    setError(null);
    setUploading(true);
    
    try {
      // 1. Extract PDF
      const formData = new FormData();
      formData.append("file", file);
      
      const extractRes = await fetch("http://127.0.0.1:8000/api/extract-pdf", {
        method: "POST",
        body: formData,
      });
      
      if (!extractRes.ok) throw new Error("Failed to extract text from PDF");
      const extractData = await extractRes.json();
      const extractedText = extractData.text;
      
      setResumeText(extractedText);

      // 2. Analyze Resume against JD
      const analyzeRes = await fetch("http://127.0.0.1:8000/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resume_text: extractedText,
          jd_text: jdText
        }),
      });

      if (!analyzeRes.ok) throw new Error("Failed to analyze resume");
      const analyzeData = await analyzeRes.json();
      
      setAnalysisResult(analyzeData.analysis);
      
      // 3. Navigate to results
      router.push("/dashboard/analysis");
      
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An error occurred during analysis.");
      setUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-10">
      <div className="text-center mt-10">
        <h1 className="text-4xl font-bold mb-4">New Analysis</h1>
        <p className="text-gray-400 text-lg">Compare your resume against a target job description.</p>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-500 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {/* JD Input */}
      <GlassCard className="p-6 border-[var(--electric-blue)]/30">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-[var(--electric-blue)]" />
          Step 1: Paste Job Description
        </h3>
        <textarea
          className="w-full h-40 bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-[var(--electric-blue)] transition-colors resize-none placeholder-gray-600"
          placeholder="Paste the full job description here..."
          value={jdText}
          onChange={(e) => setJdText(e.target.value)}
          disabled={uploading}
        ></textarea>
      </GlassCard>

      {/* File Upload */}
      <div 
        className={`relative w-full rounded-3xl border-2 border-dashed flex flex-col items-center justify-center p-12 transition-all duration-300 min-h-[300px] ${
          isDragging ? "border-[var(--electric-blue)] bg-[var(--electric-blue)]/10 scale-[1.02]" : "border-white/20 hover:border-white/40 hover:bg-white/5"
        } ${uploading ? "opacity-80 pointer-events-none" : ""}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input 
          type="file" 
          accept=".pdf" 
          className="hidden" 
          ref={fileInputRef} 
          onChange={handleFileSelect} 
        />
        
        {uploading ? (
          <div className="flex flex-col items-center gap-6">
            <div className="w-16 h-16 border-4 border-white/20 border-t-[var(--electric-blue)] rounded-full animate-spin"></div>
            <h3 className="text-2xl font-bold">Analyzing Resume...</h3>
            <p className="text-gray-400">Our AI is parsing your experience and matching it against the JD.</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-6 text-center cursor-pointer" onClick={() => fileInputRef.current?.click()}>
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[var(--electric-blue)]/20 to-[var(--emerald-green)]/20 flex items-center justify-center shadow-[0_0_40px_-10px_rgba(79,70,229,0.3)]">
              <UploadCloud className="w-12 h-12 text-[var(--electric-blue)]" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">Step 2: Upload Resume</h3>
              <p className="text-gray-400 mb-6">Drag & drop your PDF file here or click to browse</p>
              <button className="px-8 py-3 rounded-full bg-gradient-primary font-bold shadow-lg hover:shadow-[0_0_30px_-10px_rgba(79,70,229,0.5)] transition-shadow">
                Select PDF File
              </button>
            </div>
          </div>
        )}
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        {[
          { icon: FileText, title: "Secure Parsing", desc: "Your data is encrypted and never shared." },
          { icon: CheckCircle2, title: "Instant Analysis", desc: "Get your ATS score in seconds." },
          { icon: Target, title: "Precision Matching", desc: "Compare against real job requirements." },
        ].map((item, idx) => (
          <GlassCard key={idx} className="flex flex-col items-center text-center p-6 bg-transparent shadow-none border-white/5">
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 text-gray-300">
              <item.icon className="w-6 h-6" />
            </div>
            <h4 className="font-bold mb-2">{item.title}</h4>
            <p className="text-sm text-gray-500">{item.desc}</p>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
