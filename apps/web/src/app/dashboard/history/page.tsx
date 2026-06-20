"use client";

import React from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer 
} from "recharts";
import { Download, Eye, Trash2, FileText } from "lucide-react";
import Link from "next/link";

export default function HistoryPage() {
  const trendData = [
    { date: "Jan", score: 65 },
    { date: "Feb", score: 72 },
    { date: "Mar", score: 78 },
    { date: "Apr", score: 85 },
    { date: "May", score: 88 },
    { date: "Jun", score: 92 },
  ];

  const history = [
    { id: 1, name: "resume_v4_final.pdf", target: "Senior Frontend Engineer", date: "Today", score: 92 },
    { id: 2, name: "john_doe_resume_2026.pdf", target: "Full Stack Developer", date: "2 days ago", score: 88 },
    { id: 3, name: "resume_updated.docx", target: "Software Engineer II", date: "Last week", score: 78 },
    { id: 4, name: "resume_old.pdf", target: "Frontend Developer", date: "Last month", score: 65 },
  ];

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-8 animate-in fade-in duration-700">
      <div>
        <h1 className="text-3xl font-bold mb-2">Resume History</h1>
        <p className="text-gray-400">Track your optimization progress over time.</p>
      </div>

      <GlassCard className="p-8">
        <h3 className="text-xl font-bold mb-6">ATS Score Trend</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
              <XAxis dataKey="date" stroke="rgba(255,255,255,0.5)" tickLine={false} axisLine={false} />
              <YAxis stroke="rgba(255,255,255,0.5)" tickLine={false} axisLine={false} domain={[0, 100]} />
              <RechartsTooltip 
                contentStyle={{ backgroundColor: "var(--dark-bg)", borderColor: "rgba(255,255,255,0.1)", borderRadius: "8px" }}
              />
              <Line 
                type="monotone" 
                dataKey="score" 
                stroke="var(--electric-blue)" 
                strokeWidth={3}
                dot={{ r: 4, fill: "var(--electric-blue)" }}
                activeDot={{ r: 6, fill: "var(--emerald-green)" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      <GlassCard className="p-0 overflow-hidden">
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
          <h3 className="text-xl font-bold">Previous Analyses</h3>
          <Link href="/dashboard/upload" className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-sm font-bold">
            New Analysis
          </Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-gray-400 text-sm">
                <th className="p-4 font-medium">Document</th>
                <th className="p-4 font-medium">Target Role</th>
                <th className="p-4 font-medium">Date</th>
                <th className="p-4 font-medium">ATS Score</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item) => (
                <tr key={item.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-[var(--electric-blue)]" />
                      <span className="font-medium">{item.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-gray-300">{item.target}</td>
                  <td className="p-4 text-gray-400 text-sm">{item.date}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-full bg-white/10 h-1.5 rounded-full w-24">
                        <div 
                          className="h-full rounded-full" 
                          style={{ 
                            width: `${item.score}%`, 
                            backgroundColor: item.score > 80 ? "var(--emerald-green)" : item.score > 70 ? "var(--electric-blue)" : "orange" 
                          }}
                        ></div>
                      </div>
                      <span className="text-sm font-bold">{item.score}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors" title="View Report">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-[var(--electric-blue)] transition-colors" title="Download PDF">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-red-500 transition-colors" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}
