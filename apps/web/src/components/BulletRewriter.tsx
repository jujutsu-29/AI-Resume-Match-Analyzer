"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export function BulletRewriter({ jdContext = "" }: { jdContext?: string }) {
  const [bullet, setBullet] = useState("");
  const [isRewriting, setIsRewriting] = useState(false);
  const [rewrites, setRewrites] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleRewrite = async () => {
    if (!bullet.trim()) return;
    setIsRewriting(true);
    setError(null);
    setRewrites(null);

    try {
      const response = await fetch("/api/rewrite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bullet_point: bullet, jd_context: jdContext })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to rewrite bullet");
      }

      const data = await response.json();
      setRewrites(data.rewrites);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsRewriting(false);
    }
  };

  return (
    <Card className="mt-8 border-indigo-200 shadow-md">
      <CardHeader className="bg-indigo-50 rounded-t-xl">
        <CardTitle className="text-indigo-800">Interactive Bullet Rewriter</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-6">
        <div className="space-y-2">
          <Label htmlFor="bullet">Original Resume Bullet</Label>
          <Textarea 
            id="bullet" 
            placeholder="e.g., Led a team to build a web app"
            className="min-h-[100px]"
            value={bullet}
            onChange={(e) => setBullet(e.target.value)}
          />
        </div>
        
        {error && <p className="text-sm text-red-500">{error}</p>}
        
        <Button 
          onClick={handleRewrite} 
          disabled={!bullet.trim() || isRewriting}
          className="bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          {isRewriting ? "Rewriting..." : "Optimize Bullet"}
        </Button>

        {rewrites && !rewrites.error && (
          <div className="space-y-4 mt-6">
            <div className="p-4 bg-gray-50 border rounded-md">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">ATS Optimized</span>
              <p className="mt-1 text-gray-800">{rewrites.ats_optimized}</p>
            </div>
            <div className="p-4 bg-gray-50 border rounded-md">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Quantified Metrics</span>
              <p className="mt-1 text-gray-800">{rewrites.quantified}</p>
            </div>
            <div className="p-4 bg-gray-50 border rounded-md">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Recruiter Friendly</span>
              <p className="mt-1 text-gray-800">{rewrites.recruiter_friendly}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
