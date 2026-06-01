"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDropzone } from "react-dropzone";
import { FileSearch, Upload, Loader2, CheckCircle2, AlertCircle, Sparkles, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ResumeAnalysisResult } from "@/types/analytics";

export default function ResumeAnalyzerPage() {
  const [file, setFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<ResumeAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      setResult(null);
      setError(null);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  const analyzeResume = async () => {
    if (!file) return;
    setAnalyzing(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/ai/resume-analyze", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Analysis failed. Please try again.");
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setAnalyzing(false);
    }
  };



  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-500";
    if (score >= 60) return "text-amber-500";
    return "text-red-500";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Needs Work";
    return "Poor";
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-heading)]">
          AI Resume Analyzer
        </h1>
        <p className="text-muted-foreground mt-1">
          Upload your resume and get instant ATS score, skill extraction, and improvement suggestions.
        </p>
      </div>

      {/* Upload Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div
          {...getRootProps()}
          className={`relative p-12 rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer text-center ${
            isDragActive
              ? "border-indigo-500 bg-indigo-500/5"
              : "border-border hover:border-indigo-500/50 hover:bg-muted/30"
          }`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-4">
            <div className="h-16 w-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center">
              <Upload className="h-8 w-8 text-indigo-500" />
            </div>
            {file ? (
              <div className="space-y-1">
                <p className="text-sm font-medium">{file.name}</p>
                <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(0)} KB</p>
              </div>
            ) : (
              <>
                <p className="text-sm font-medium">
                  {isDragActive ? "Drop your resume here..." : "Drag & drop your resume here"}
                </p>
                <p className="text-xs text-muted-foreground">or click to browse — PDF only, max 10MB</p>
              </>
            )}
          </div>
        </div>

        {file && !result && (
          <div className="flex justify-center mt-4">
            <Button
              onClick={analyzeResume}
              disabled={analyzing}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white border-0 px-8"
            >
              {analyzing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing with Gemini AI...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Analyze Resume
                </>
              )}
            </Button>
          </div>
        )}

        {error && (
          <div className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-red-500 shrink-0" />
            <p className="text-sm text-red-500">{error}</p>
          </div>
        )}
      </motion.div>

      {/* Results */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="space-y-6"
          >
            {/* Score Cards */}
            <div className="grid sm:grid-cols-2 gap-6">
              <Card className="border-border/50 overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">ATS Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end gap-3 mb-3">
                    <span className={`text-5xl font-bold font-[family-name:var(--font-heading)] ${getScoreColor(result.atsScore)}`}>
                      {result.atsScore}
                    </span>
                    <span className="text-lg text-muted-foreground mb-1">/100</span>
                    <Badge className={`mb-1 ${result.atsScore >= 80 ? 'bg-emerald-500/10 text-emerald-500' : result.atsScore >= 60 ? 'bg-amber-500/10 text-amber-500' : 'bg-red-500/10 text-red-500'}`}>
                      {getScoreLabel(result.atsScore)}
                    </Badge>
                  </div>
                  <Progress value={result.atsScore} className="h-2" />
                </CardContent>
              </Card>

              <Card className="border-border/50 overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Quality Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end gap-3 mb-3">
                    <span className={`text-5xl font-bold font-[family-name:var(--font-heading)] ${getScoreColor(result.qualityScore)}`}>
                      {result.qualityScore}
                    </span>
                    <span className="text-lg text-muted-foreground mb-1">/100</span>
                    <Badge className={`mb-1 ${result.qualityScore >= 80 ? 'bg-emerald-500/10 text-emerald-500' : result.qualityScore >= 60 ? 'bg-amber-500/10 text-amber-500' : 'bg-red-500/10 text-red-500'}`}>
                      {getScoreLabel(result.qualityScore)}
                    </Badge>
                  </div>
                  <Progress value={result.qualityScore} className="h-2" />
                </CardContent>
              </Card>
            </div>

            {/* Summary */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-base font-[family-name:var(--font-heading)]">Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">{result.summary}</p>
              </CardContent>
            </Card>

            {/* Skills */}
            <div className="grid sm:grid-cols-2 gap-6">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-base font-[family-name:var(--font-heading)]">
                    <CheckCircle2 className="inline h-4 w-4 mr-2 text-emerald-500" />
                    Extracted Skills
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {result.extractedSkills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="px-3 py-1">{skill}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-base font-[family-name:var(--font-heading)]">
                    <AlertCircle className="inline h-4 w-4 mr-2 text-amber-500" />
                    Missing Keywords
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {result.missingKeywords.map((keyword) => (
                      <Badge key={keyword} variant="outline" className="px-3 py-1 border-amber-500/30 text-amber-600">{keyword}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Improvements */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-base font-[family-name:var(--font-heading)]">
                  <Sparkles className="inline h-4 w-4 mr-2 text-indigo-500" />
                  Improvement Suggestions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {result.improvements.map((imp, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                      <Badge
                        className={`shrink-0 text-[10px] ${
                          imp.priority === "high" ? "bg-red-500/10 text-red-500" :
                          imp.priority === "medium" ? "bg-amber-500/10 text-amber-500" :
                          "bg-blue-500/10 text-blue-500"
                        }`}
                      >
                        {imp.priority}
                      </Badge>
                      <div>
                        <p className="text-sm font-medium">{imp.category}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{imp.suggestion}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>


          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
