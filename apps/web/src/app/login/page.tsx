import React from 'react';
import { login, signup } from './actions';
import { Sparkles, ArrowRight, Github } from 'lucide-react';
import { GlassCard } from '@/components/ui/glass-card';

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ message?: string }> }) {
  const params = await searchParams;

  return (
    <div className="min-h-screen bg-[var(--dark-bg)] text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--electric-blue)]/20 rounded-full filter blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--emerald-green)]/10 rounded-full filter blur-[120px] pointer-events-none"></div>
      
      <div className="mb-8 flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[var(--electric-blue)] to-[var(--emerald-green)] flex items-center justify-center">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-3xl font-black tracking-tight">MatchAnalyzer</h1>
      </div>

      <GlassCard className="w-full max-w-md p-8 shadow-[0_0_50px_-15px_rgba(79,70,229,0.3)]">
        <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
        <p className="text-gray-400 text-sm mb-8">Sign in to your account or create a new one.</p>

        {params?.message && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm mb-6">
            {params.message}
          </div>
        )}

        <form className="flex flex-col gap-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300" htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl focus:outline-none focus:border-[var(--electric-blue)] transition-colors text-white"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300" htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl focus:outline-none focus:border-[var(--electric-blue)] transition-colors text-white"
            />
          </div>

          <div className="flex gap-4 mt-4">
            <button
              formAction={login}
              className="flex-1 py-3 px-4 bg-gradient-primary rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-[0_0_20px_-5px_rgba(79,70,229,0.5)] transition-all"
            >
              Sign In <ArrowRight className="w-4 h-4" />
            </button>
            <button
              formAction={signup}
              className="flex-1 py-3 px-4 glass-panel rounded-xl font-bold hover:bg-white/10 transition-all text-gray-300"
            >
              Create Account
            </button>
          </div>
        </form>

      </GlassCard>
      
      <p className="mt-8 text-sm text-gray-500">
        By continuing, you agree to our Terms of Service and Privacy Policy.
      </p>
    </div>
  );
}
