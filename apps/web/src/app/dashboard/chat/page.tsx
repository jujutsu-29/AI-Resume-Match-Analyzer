"use client";

import React, { useState, useEffect, useRef } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { Send, User, Bot, History, Loader2, Sparkles } from "lucide-react";
import { getUserResumes } from "../upload/actions";
import ReactMarkdown from "react-markdown";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatAssistantPage() {
  const [resumes, setResumes] = useState<any[]>([]);
  const [selectedResumeId, setSelectedResumeId] = useState<string>("");
  
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! I'm your AI career assistant. Select a resume from the dropdown above and ask me any questions about your experience, or ask me to tailor specific bullet points!" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getUserResumes().then(res => setResumes(res));
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || !selectedResumeId || isLoading) return;

    const userMsg: Message = { role: "user", content: input.trim() };
    const currentHistory = [...messages, userMsg];
    
    setMessages(currentHistory);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: userMsg.content,
          document_id: selectedResumeId,
          // Exclude the very first welcome message and the newest user message from history for brevity
          chat_history: messages.slice(1) 
        }),
      });

      if (!response.ok) throw new Error("Failed to fetch AI response");
      
      const data = await response.json();
      setMessages(prev => [...prev, { role: "assistant", content: data.response }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: "assistant", content: "Sorry, I encountered an error communicating with the server. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto h-[calc(100vh-140px)] flex flex-col animate-in fade-in duration-700">
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-[var(--electric-blue)]" />
            AI Chat Assistant
          </h1>
          <p className="text-gray-400">Ask questions about your resume. I'll search its contents instantly.</p>
        </div>
        
        <div className="w-full md:w-72 relative">
          <History className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          <select
            className="w-full pl-10 pr-4 py-2.5 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:border-[var(--electric-blue)] text-white text-sm appearance-none"
            value={selectedResumeId}
            onChange={(e) => setSelectedResumeId(e.target.value)}
          >
            <option value="">-- Select a Resume Context --</option>
            {resumes.map((r, idx) => (
              <option key={r.id} value={r.id}>
                {r.file_name || `Resume ${idx + 1}`} ({new Date(r.created_at).toLocaleDateString()})
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none border-t-4 border-l-4 border-r-4 border-t-gray-400 border-l-transparent border-r-transparent"></div>
        </div>
      </div>

      <GlassCard className="flex-1 flex flex-col p-0 overflow-hidden border-[var(--electric-blue)]/20 shadow-[0_0_40px_-10px_rgba(79,70,229,0.15)] relative">
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-4 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                msg.role === "user" ? "bg-gradient-to-tr from-purple-600 to-blue-500" : "bg-black/50 border border-white/10"
              }`}>
                {msg.role === "user" ? <User className="w-5 h-5 text-white" /> : <Bot className="w-5 h-5 text-[var(--electric-blue)]" />}
              </div>
              <div className={`px-5 py-3 rounded-2xl max-w-[80%] ${
                msg.role === "user" 
                  ? "bg-[var(--electric-blue)] text-white rounded-tr-none" 
                  : "bg-white/5 border border-white/5 text-gray-200 rounded-tl-none prose prose-invert prose-p:leading-relaxed prose-pre:bg-black/50 prose-pre:border prose-pre:border-white/10"
              }`}>
                {msg.role === "user" ? (
                  <div className="whitespace-pre-wrap">{msg.content}</div>
                ) : (
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                )}
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex gap-4 flex-row">
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-black/50 border border-white/10">
                <Bot className="w-5 h-5 text-[var(--electric-blue)]" />
              </div>
              <div className="px-5 py-4 rounded-2xl bg-white/5 border border-white/5 text-gray-200 rounded-tl-none flex items-center gap-3">
                <Loader2 className="w-4 h-4 animate-spin text-[var(--electric-blue)]" />
                <span className="text-sm text-gray-400">Searching your resume and generating answer...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-black/40 border-t border-white/5">
          <form onSubmit={handleSend} className="relative flex items-center">
            <input
              type="text"
              className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-6 pr-14 text-white focus:outline-none focus:border-[var(--electric-blue)] transition-colors disabled:opacity-50"
              placeholder={selectedResumeId ? "Ask a question about your resume..." : "Please select a resume above first..."}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading || !selectedResumeId}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim() || !selectedResumeId}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[var(--electric-blue)] flex items-center justify-center text-white hover:bg-indigo-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          {!selectedResumeId && (
            <p className="text-xs text-red-400 mt-2 ml-4 flex items-center gap-1">
               * You must select a resume context from the top right dropdown before chatting.
            </p>
          )}
        </div>
      </GlassCard>
    </div>
  );
}
