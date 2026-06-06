"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export function ResumeUpload({ onUploadSuccess }: { onUploadSuccess: (text: string) => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async () => {
    if (!file) return;
    setIsUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      // In a real app, this would route through Next.js API first to attach auth
      // For MVP, if we call FastAPI directly it needs CORS.
      // We will proxy through Next.js API: /api/extract
      const response = await fetch("/api/extract", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to extract PDF");
      }

      const data = await response.json();
      onUploadSuccess(data.text);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Resume</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="resume">PDF File</Label>
          <Input 
            id="resume" 
            type="file" 
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <Button onClick={handleUpload} disabled={!file || isUploading}>
          {isUploading ? "Processing..." : "Extract Text"}
        </Button>
      </CardContent>
    </Card>
  );
}
