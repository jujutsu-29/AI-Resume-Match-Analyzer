import React from "react";
import Link from "next/link";
import { Upload, CheckCircle, BarChart, Zap, Search, Layers, ChevronRight, Star } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[var(--dark-bg)] text-white overflow-hidden selection:bg-[var(--electric-blue)] selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-panel border-x-0 border-t-0 rounded-none bg-opacity-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-8 h-8 text-[var(--electric-blue)]" />
            <span className="text-xl font-bold tracking-tight">MatchAnalyzer</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
            <Link href="#features" className="hover:text-white transition-colors">Features</Link>
            <Link href="#how-it-works" className="hover:text-white transition-colors">How it Works</Link>
            <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Sign In</Link>
            <Link href="/dashboard/upload" className="px-5 py-2.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-gray-200 transition-colors">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6">
        {/* Background Gradients */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--electric-blue)] rounded-full mix-blend-screen filter blur-[128px] opacity-20 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[var(--emerald-green)] rounded-full mix-blend-screen filter blur-[128px] opacity-20 animate-pulse delay-1000"></div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative z-10 flex flex-col gap-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel w-fit border-[var(--emerald-green)]/30 bg-[var(--emerald-green)]/10 text-[var(--emerald-green)] text-xs font-semibold uppercase tracking-wider">
              <Zap className="w-3 h-3" />
              <span>ATS Optimization Platform v2.0</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1]">
              Land More Interviews with <span className="text-gradient">AI-Powered</span> Analysis
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-xl leading-relaxed">
              Instantly compare your resume against any job description. Get detailed match insights, uncover skill gaps, and optimize your keywords to beat the ATS.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/dashboard/upload" className="flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-primary text-white font-bold text-lg hover:shadow-[0_0_40px_-10px_rgba(79,70,229,0.5)] transition-all hover:-translate-y-1">
                <Upload className="w-5 h-5" />
                Upload Resume
              </Link>
              <Link href="/dashboard" className="flex items-center justify-center gap-2 px-8 py-4 rounded-full glass-panel hover:bg-white/5 transition-all text-white font-bold text-lg">
                View Demo
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-400 mt-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-[var(--dark-bg)] bg-gray-700 flex items-center justify-center text-xs text-white shadow-sm overflow-hidden">
                    <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${i}&backgroundColor=transparent`} alt="avatar" />
                  </div>
                ))}
              </div>
              <div className="flex flex-col">
                <div className="flex text-yellow-500">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <span>Join 10,000+ job seekers</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 hidden lg:block">
            <GlassCard className="p-2 border-white/10 bg-black/40 relative">
              <div className="absolute -left-12 top-20 glass-panel p-4 rounded-xl flex items-center gap-4 animate-[bounce_4s_infinite]">
                <div className="w-12 h-12 rounded-full border-4 border-[var(--emerald-green)] flex items-center justify-center text-[var(--emerald-green)] font-bold">95</div>
                <div>
                  <p className="font-bold text-sm">ATS Score</p>
                  <p className="text-xs text-gray-400">Excellent Match</p>
                </div>
              </div>
              <div className="absolute -right-8 bottom-32 glass-panel p-4 rounded-xl flex items-center gap-3 animate-[bounce_5s_infinite_reverse]">
                <CheckCircle className="w-8 h-8 text-[var(--electric-blue)]" />
                <div>
                  <p className="font-bold text-sm">Skills Matched</p>
                  <p className="text-xs text-gray-400">React, Node.js, AWS</p>
                </div>
              </div>
              <img src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=800&h=600" alt="Resume Preview" className="rounded-xl opacity-80" />
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Social Proof Stats */}
      <section className="py-12 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center divide-y sm:divide-y-0 sm:divide-x divide-white/10">
          <div className="flex flex-col gap-2 py-4">
            <h3 className="text-4xl font-black text-white">10M+</h3>
            <p className="text-gray-400 font-medium">Resumes Analyzed</p>
          </div>
          <div className="flex flex-col gap-2 py-4">
            <h3 className="text-4xl font-black text-white">95%</h3>
            <p className="text-gray-400 font-medium">ATS Detection Accuracy</p>
          </div>
          <div className="flex flex-col gap-2 py-4">
            <h3 className="text-4xl font-black text-white">2.5x</h3>
            <p className="text-gray-400 font-medium">Higher Interview Rate</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Everything you need to beat the ATS</h2>
            <p className="text-lg text-gray-400">Our advanced RAG pipeline and semantic search analyze your resume exactly how modern Applicant Tracking Systems do.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: BarChart, title: "ATS Score Analysis", desc: "Get an instant score on how well your resume matches the target job description." },
              { icon: Search, title: "Semantic Search via RAG", desc: "We don't just look for exact keywords. We understand the context of your experience." },
              { icon: CheckCircle, title: "Skill Gap Detection", desc: "Instantly see which required skills you're missing from your resume." },
              { icon: Zap, title: "AI Recommendations", desc: "Get one-click bullet point rewrites to highlight your impact and metrics." },
              { icon: Layers, title: "Keyword Optimization", desc: "Discover the precise keywords recruiters are searching for in your industry." },
              { icon: BarChart, title: "Industry Benchmarking", desc: "Compare your resume's strength against top candidates in your field." },
            ].map((feature, idx) => (
              <GlassCard key={idx} className="group hover:bg-white/5 transition-colors cursor-default">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-[var(--electric-blue)]" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-32 px-6 bg-black/40 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">How it Works</h2>
            <p className="text-lg text-gray-400">Four simple steps to your next interview.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-[var(--electric-blue)] to-[var(--emerald-green)] -translate-y-1/2 opacity-20"></div>
            {[
              { step: "01", title: "Upload Resume", desc: "Drop your PDF or DOCX file" },
              { step: "02", title: "Paste Job Description", desc: "Input your target role" },
              { step: "03", title: "AI Analysis", desc: "Our models process your data" },
              { step: "04", title: "Get Report", desc: "Receive actionable insights" },
            ].map((item, idx) => (
              <div key={idx} className="relative z-10 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-[var(--dark-bg)] border-2 border-[var(--electric-blue)] flex items-center justify-center text-xl font-bold text-[var(--electric-blue)] mb-6 shadow-[0_0_30px_-5px_rgba(79,70,229,0.4)]">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Simple, transparent pricing</h2>
            <p className="text-lg text-gray-400">Choose the plan that best fits your career goals.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free */}
            <GlassCard className="flex flex-col p-8">
              <h3 className="text-2xl font-bold mb-2">Free</h3>
              <p className="text-gray-400 mb-6">Perfect for trying it out</p>
              <div className="text-4xl font-black mb-8">$0<span className="text-lg text-gray-500 font-medium">/mo</span></div>
              <ul className="flex flex-col gap-4 mb-8 flex-1">
                <li className="flex items-center gap-3 text-gray-300"><CheckCircle className="w-5 h-5 text-[var(--emerald-green)]" /> 3 AI Analyses per month</li>
                <li className="flex items-center gap-3 text-gray-300"><CheckCircle className="w-5 h-5 text-[var(--emerald-green)]" /> Basic ATS Score</li>
                <li className="flex items-center gap-3 text-gray-300"><CheckCircle className="w-5 h-5 text-[var(--emerald-green)]" /> Keyword matching</li>
              </ul>
              <Link href="/dashboard" className="w-full py-3 rounded-xl glass-panel text-center font-bold hover:bg-white/10 transition-colors">Get Started</Link>
            </GlassCard>

            {/* Pro */}
            <GlassCard className="flex flex-col p-8 border-[var(--electric-blue)]/50 relative transform md:-translate-y-4 shadow-[0_0_50px_-12px_rgba(79,70,229,0.3)]">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-primary text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">Most Popular</div>
              <h3 className="text-2xl font-bold mb-2">Pro</h3>
              <p className="text-gray-400 mb-6">For active job seekers</p>
              <div className="text-4xl font-black mb-8">$15<span className="text-lg text-gray-500 font-medium">/mo</span></div>
              <ul className="flex flex-col gap-4 mb-8 flex-1">
                <li className="flex items-center gap-3 text-gray-300"><CheckCircle className="w-5 h-5 text-[var(--emerald-green)]" /> Unlimited Analyses</li>
                <li className="flex items-center gap-3 text-gray-300"><CheckCircle className="w-5 h-5 text-[var(--emerald-green)]" /> Advanced AI Recommendations</li>
                <li className="flex items-center gap-3 text-gray-300"><CheckCircle className="w-5 h-5 text-[var(--emerald-green)]" /> Skill Gap Detection</li>
                <li className="flex items-center gap-3 text-gray-300"><CheckCircle className="w-5 h-5 text-[var(--emerald-green)]" /> Bullet-point rewriter</li>
              </ul>
              <Link href="/dashboard" className="w-full py-3 rounded-xl bg-gradient-primary text-center font-bold text-white hover:shadow-lg transition-all hover:-translate-y-0.5">Upgrade to Pro</Link>
            </GlassCard>

            {/* Enterprise */}
            <GlassCard className="flex flex-col p-8">
              <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
              <p className="text-gray-400 mb-6">For career coaches & teams</p>
              <div className="text-4xl font-black mb-8">$49<span className="text-lg text-gray-500 font-medium">/mo</span></div>
              <ul className="flex flex-col gap-4 mb-8 flex-1">
                <li className="flex items-center gap-3 text-gray-300"><CheckCircle className="w-5 h-5 text-[var(--emerald-green)]" /> Everything in Pro</li>
                <li className="flex items-center gap-3 text-gray-300"><CheckCircle className="w-5 h-5 text-[var(--emerald-green)]" /> API Access</li>
                <li className="flex items-center gap-3 text-gray-300"><CheckCircle className="w-5 h-5 text-[var(--emerald-green)]" /> Custom Branding</li>
              </ul>
              <Link href="/dashboard" className="w-full py-3 rounded-xl glass-panel text-center font-bold hover:bg-white/10 transition-colors">Contact Sales</Link>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--electric-blue)]/10"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10 glass-panel p-16 border-[var(--electric-blue)]/30">
          <h2 className="text-4xl md:text-6xl font-black mb-6">Start Optimizing Your Resume Today</h2>
          <p className="text-xl text-gray-400 mb-10">Join thousands of candidates who are landing their dream roles faster.</p>
          <Link href="/dashboard/upload" className="inline-flex items-center justify-center gap-2 px-10 py-5 rounded-full bg-white text-black font-bold text-xl hover:bg-gray-200 transition-colors hover:scale-105 transform duration-200">
            Upload Your Resume Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/40 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Layers className="w-6 h-6 text-[var(--electric-blue)]" />
            <span className="text-lg font-bold">MatchAnalyzer</span>
          </div>
          <p className="text-gray-500 text-sm">© 2026 MatchAnalyzer. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
