"use client";

import React, { useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { UploadCloud, FileText, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function UploadPage() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
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

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    simulateUpload();
  };

  const simulateUpload = () => {
    setUploading(true);
    setTimeout(() => {
      router.push("/dashboard/job-match");
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center mt-10">
        <h1 className="text-4xl font-bold mb-4">Upload Your Resume</h1>
        <p className="text-gray-400 text-lg">We support PDF and DOCX formats up to 5MB.</p>
      </div>

      <div 
        className={`relative w-full h-96 rounded-3xl border-2 border-dashed flex flex-col items-center justify-center p-12 transition-all duration-300 ${
          isDragging ? "border-[var(--electric-blue)] bg-[var(--electric-blue)]/10 scale-[1.02]" : "border-white/20 hover:border-white/40 hover:bg-white/5"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {uploading ? (
          <div className="flex flex-col items-center gap-6">
            <div className="w-16 h-16 border-4 border-white/20 border-t-[var(--electric-blue)] rounded-full animate-spin"></div>
            <h3 className="text-2xl font-bold">Analyzing Resume...</h3>
            <p className="text-gray-400">Our AI is parsing your experience and skills.</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-6 text-center cursor-pointer" onClick={simulateUpload}>
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[var(--electric-blue)]/20 to-[var(--emerald-green)]/20 flex items-center justify-center shadow-[0_0_40px_-10px_rgba(79,70,229,0.3)]">
              <UploadCloud className="w-12 h-12 text-[var(--electric-blue)]" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">Drag & drop your file here</h3>
              <p className="text-gray-400 mb-6">or click to browse from your computer</p>
              <button className="px-8 py-3 rounded-full bg-gradient-primary font-bold shadow-lg hover:shadow-[0_0_30px_-10px_rgba(79,70,229,0.5)] transition-shadow">
                Select File
              </button>
            </div>
          </div>
        )}
      </div>
      
      <div className="grid md:grid-cols-3 gap-6 mt-8">
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
