import React from "react";
import Link from "next/link";
import { 
  LayoutDashboard, 
  FileText, 
  CheckSquare, 
  History, 
  Bookmark, 
  Sparkles, 
  Settings,
  Bell,
  Search,
  User,
  Zap
} from "lucide-react";
import { AnalysisProvider } from "@/context/AnalysisContext";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--dark-bg)] text-white flex overflow-hidden">
      {/* Left Sidebar Navigation */}
      <aside className="w-64 border-r border-white/10 glass-panel rounded-none flex flex-col fixed h-full z-20 hidden md:flex">
        <div className="h-20 flex items-center px-6 border-b border-white/5">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-[var(--electric-blue)]" />
            <span className="text-xl font-bold">MatchAnalyzer</span>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-2">
          <NavItem href="/dashboard" icon={LayoutDashboard} label="Dashboard" />
          <NavItem href="/dashboard/upload" icon={FileText} label="Resume Upload" />
          <NavItem href="/dashboard/analysis" icon={CheckSquare} label="Analysis Result" />
          <NavItem href="/dashboard/job-match" icon={Zap} label="Job Match" />
          <NavItem href="/dashboard/history" icon={History} label="Resume History" />
          <div className="my-4 border-t border-white/5"></div>
          <NavItem href="#" icon={Bookmark} label="Saved Reports" />
          <NavItem href="#" icon={Sparkles} label="AI Suggestions" />
        </div>

        <div className="p-4 border-t border-white/5">
          <NavItem href="#" icon={Settings} label="Settings" />
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-20 glass-panel rounded-none border-b border-white/10 flex items-center justify-between px-8 z-10">
          <div className="relative w-96 hidden lg:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search reports, jobs, skills..." 
              className="w-full bg-black/20 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-[var(--electric-blue)] transition-colors text-white placeholder-gray-500"
            />
          </div>
          
          <div className="flex items-center gap-6 ml-auto">
            <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-primary rounded-full text-sm font-bold text-white shadow-lg shadow-[var(--electric-blue)]/20 hover:scale-105 transition-transform">
              Upgrade Plan
            </button>
            <button className="relative text-gray-400 hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[var(--electric-blue)] rounded-full border border-[var(--dark-bg)]"></span>
            </button>
            <button className="w-8 h-8 rounded-full bg-gradient-to-tr from-[var(--electric-blue)] to-purple-500 flex items-center justify-center text-sm font-bold">
              JD
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-8 relative">
          {/* Subtle background glow for dashboard area */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--electric-blue)]/5 rounded-full filter blur-[120px] pointer-events-none"></div>
          <AnalysisProvider>
            {children}
          </AnalysisProvider>
        </div>
      </main>
    </div>
  );
}

function NavItem({ href, icon: Icon, label }: { href: string; icon: any; label: string }) {
  // In a real app we'd use usePathname to highlight the active link
  return (
    <Link href={href} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors group font-medium text-sm">
      <Icon className="w-5 h-5 group-hover:text-[var(--electric-blue)] transition-colors" />
      {label}
    </Link>
  );
}
