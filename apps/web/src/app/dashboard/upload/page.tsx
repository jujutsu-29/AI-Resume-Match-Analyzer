"use client";

import React, { useState, useRef, useEffect } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { UploadCloud, FileText, CheckCircle2, Target, AlertCircle, History } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAnalysis } from "@/context/AnalysisContext";

import { saveAnalysisResult, getUserResumes } from "./actions";

export default function UploadPage() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingText, setLoadingText] = useState("Analyzing Resume...");
  
  // Existing Resumes State
  const [existingResumes, setExistingResumes] = useState<any[]>([]);
  const [selectedResumeId, setSelectedResumeId] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { setResumeText, setJdText, setAnalysisResult, jdText } = useAnalysis();
  const router = useRouter();

  useEffect(() => {
    // Fetch resumes on mount
    getUserResumes().then(resumes => setExistingResumes(resumes));
  }, []);

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

  const handleExistingResumeSubmit = async () => {
    if (!selectedResumeId) {
      setError("Please select an existing resume.");
      return;
    }
    
    const selectedResume = existingResumes.find(r => r.id.toString() === selectedResumeId);
    if (!selectedResume) return;

    await runAnalysis(selectedResume.content);
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
    setLoadingText("Extracting PDF text...");
    
    try {
      const formData = new FormData();
      formData.append("file", file);
      
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "";
      const extractRes = await fetch(`${API_URL}/api/extract-pdf`, {
        method: "POST",
        body: formData,
      });
      
      if (!extractRes.ok) throw new Error("Failed to extract text from PDF");
      const extractData = await extractRes.json();
      const extractedText = extractData.text;
      const fileName = extractData.filename;
      
      await runAnalysis(extractedText, fileName);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An error occurred during extraction.");
      setUploading(false);
    }
  };

  const runAnalysis = async (extractedText: string, fileName: string = "Existing Resume") => {
    if (!jdText.trim()) {
      setError("Please paste a Job Description first.");
      setUploading(false);
      return;
    }

    setError(null);
    setUploading(true);
    setResumeText(extractedText);

    try {
      // Analyze Resume against JD
      setLoadingText("AI is analyzing your resume...");
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "";
      const analyzeRes = await fetch(`${API_URL}/api/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resume_text: extractedText,
          jd_text: jdText
        }),
      });

      if (!analyzeRes.ok) throw new Error("Failed to analyze resume");
      const analyzeData = await analyzeRes.json();
      const analysisObj = analyzeData.analysis;
      
      setAnalysisResult(analysisObj);

      // Save to Supabase securely via Server Action
      setLoadingText("Saving results securely...");
      const { resumeId } = await saveAnalysisResult(extractedText, analysisObj, fileName);
      
      // Generate Vector Embeddings
      setLoadingText("Generating semantic embeddings...");
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "";
      const embedRes = await fetch(`${API_URL}/api/embed`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          document_id: resumeId,
          text: extractedText,
          metadata: { source: "user_upload" }
        }),
      });

      if (!embedRes.ok) console.warn("Failed to generate embeddings, but analysis was saved.");
      
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

      <div className="grid md:grid-cols-2 gap-6">
        {/* Existing Resume Selection */}
        <GlassCard className="p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <History className="w-5 h-5 text-purple-400" />
              Use Existing Resume
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              Select a resume you've already uploaded to skip PDF extraction and get instant results.
            </p>
            
            {existingResumes.length > 0 ? (
              <select
                className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:border-purple-400 text-white mb-6"
                value={selectedResumeId}
                onChange={(e) => setSelectedResumeId(e.target.value)}
                disabled={uploading}
              >
                <option value="">-- Select a Resume --</option>
                {existingResumes.map((r, idx) => (
                  <option key={r.id} value={r.id}>
                    {r.file_name || `Resume ${idx + 1}`} ({new Date(r.created_at).toLocaleDateString()})
                  </option>
                ))}
              </select>
            ) : (
              <div className="p-4 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-400 mb-6 text-center">
                No existing resumes found. Upload a PDF first!
              </div>
            )}
          </div>
          
          <button 
            onClick={handleExistingResumeSubmit}
            disabled={uploading || !selectedResumeId || !jdText.trim()}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-[var(--electric-blue)] font-bold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Analyze Selected Resume
          </button>
        </GlassCard>

        {/* File Upload */}
        <div 
          className={`relative w-full rounded-3xl border-2 border-dashed flex flex-col items-center justify-center p-8 transition-all duration-300 min-h-[300px] ${
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
            <div className="flex flex-col items-center gap-6 text-center">
              <div className="w-12 h-12 border-4 border-white/20 border-t-[var(--electric-blue)] rounded-full animate-spin"></div>
              <div>
                <h3 className="text-xl font-bold">{loadingText}</h3>
                <p className="text-sm text-gray-400 mt-2">Processing your document securely.</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4 text-center cursor-pointer" onClick={() => fileInputRef.current?.click()}>
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--electric-blue)]/20 to-[var(--emerald-green)]/20 flex items-center justify-center shadow-[0_0_40px_-10px_rgba(79,70,229,0.3)]">
                <UploadCloud className="w-10 h-10 text-[var(--electric-blue)]" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Upload New PDF</h3>
                <p className="text-sm text-gray-400 mb-4">Drag & drop your file here</p>
                <button className="px-6 py-2 rounded-full bg-white/10 font-medium hover:bg-white/20 transition-colors">
                  Browse Files
                </button>
              </div>
            </div>
          )}
        </div>
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
