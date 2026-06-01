"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Target, Loader2, Sparkles, CheckCircle2, Clock, BookOpen, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { availableSkills, availableRoles } from "@/lib/mock-data";

interface SkillGapResult {
  overallReadiness: number;
  matchingSkills: string[];
  missingSkills: { name: string; priority: string; estimatedTime: string; resources: string[]; reason: string }[];
  learningRoadmap: { phase: number; title: string; duration: string; skills: string[]; description: string }[];
  recommendedCertifications: string[];
  salaryExpectation: string;
}

export default function SkillGapPage() {
  const [selectedSkills, setSelectedSkills] = useState<string[]>(["Python", "SQL", "JavaScript", "Git"]);
  const [desiredRole, setDesiredRole] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<SkillGapResult | null>(null);

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const analyze = async () => {
    if (selectedSkills.length === 0 || !desiredRole) return;
    setAnalyzing(true);
    try {
      const res = await fetch("/api/ai/skill-gap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentSkills: selectedSkills, desiredRole }),
      });
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      setResult(data);
    } catch {
      // Show error state
    } finally {
      setAnalyzing(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    if (priority === "critical") return "bg-red-500/10 text-red-500 border-red-500/20";
    if (priority === "important") return "bg-amber-500/10 text-amber-500 border-amber-500/20";
    return "bg-blue-500/10 text-blue-500 border-blue-500/20";
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-heading)]">
          Skill Gap Analyzer
        </h1>
        <p className="text-muted-foreground mt-1">
          Identify missing skills and get a personalized learning roadmap for your dream role.
        </p>
      </div>

      {/* Input Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Current Skills */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-base font-[family-name:var(--font-heading)]">
              <CheckCircle2 className="inline h-4 w-4 mr-2 text-emerald-500" />
              Your Current Skills
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {availableSkills.slice(0, 30).map((skill) => (
                <Badge
                  key={skill}
                  variant={selectedSkills.includes(skill) ? "default" : "outline"}
                  className={`cursor-pointer transition-all ${
                    selectedSkills.includes(skill)
                      ? "bg-indigo-500 text-white hover:bg-indigo-600"
                      : "hover:border-indigo-500/50"
                  }`}
                  onClick={() => toggleSkill(skill)}
                >
                  {skill}
                </Badge>
              ))}
            </div>
            {selectedSkills.length > 0 && (
              <p className="text-xs text-muted-foreground mt-3">{selectedSkills.length} skills selected</p>
            )}
          </CardContent>
        </Card>

        {/* Desired Role */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-base font-[family-name:var(--font-heading)]">
              <Target className="inline h-4 w-4 mr-2 text-indigo-500" />
              Desired Role
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select onValueChange={(val) => setDesiredRole(val || "")} value={desiredRole}>
              <SelectTrigger>
                <SelectValue placeholder="Select your dream role" />
              </SelectTrigger>
              <SelectContent>
                {availableRoles.map((role) => (
                  <SelectItem key={role} value={role}>{role}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              onClick={analyze}
              disabled={analyzing || selectedSkills.length === 0 || !desiredRole}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white border-0"
            >
              {analyzing ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Analyzing with AI...</>
              ) : (
                <><Sparkles className="mr-2 h-4 w-4" />Analyze Skill Gap</>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Results */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Readiness Score */}
            <Card className="border-border/50">
              <CardContent className="pt-6">
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <span className="text-5xl font-bold font-[family-name:var(--font-heading)] gradient-text">
                      {result.overallReadiness}%
                    </span>
                    <p className="text-sm text-muted-foreground mt-1">Overall Readiness</p>
                  </div>
                  <div className="flex-1">
                    <Progress value={result.overallReadiness} className="h-3" />
                    <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                      <span>{result.matchingSkills.length} matching skills</span>
                      <span>{result.missingSkills.length} skills to learn</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Missing Skills */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-base font-[family-name:var(--font-heading)]">Missing Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {result.missingSkills.map((skill, i) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-start gap-3 p-3 rounded-lg bg-muted/30"
                    >
                      <Badge className={`shrink-0 text-[10px] ${getPriorityColor(skill.priority)}`}>
                        {skill.priority}
                      </Badge>
                      <div className="flex-1">
                        <p className="text-sm font-semibold">{skill.name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{skill.reason}</p>
                        <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{skill.estimatedTime}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Learning Roadmap */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-base font-[family-name:var(--font-heading)]">
                  <BookOpen className="inline h-4 w-4 mr-2 text-indigo-500" />
                  Learning Roadmap
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {result.learningRoadmap.map((phase, i) => (
                    <motion.div
                      key={phase.phase}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="relative pl-8 pb-4 border-l-2 border-indigo-500/30 last:border-0"
                    >
                      <div className="absolute left-0 top-0 -translate-x-1/2 h-6 w-6 rounded-full bg-indigo-500 text-white text-xs font-bold flex items-center justify-center">
                        {phase.phase}
                      </div>
                      <h4 className="text-sm font-semibold">{phase.title}</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">{phase.duration}</p>
                      <p className="text-xs text-muted-foreground mt-1">{phase.description}</p>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {phase.skills.map(s => (
                          <Badge key={s} variant="secondary" className="text-[10px]">{s}</Badge>
                        ))}
                      </div>
                    </motion.div>
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
