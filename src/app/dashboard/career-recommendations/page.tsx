"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket, Loader2, Sparkles, GraduationCap, IndianRupee, BookOpen, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { availableSkills } from "@/lib/mock-data";

interface CareerResult {
  recommendedPaths: { title: string; description: string; matchScore: number; salaryRange: string; growthOutlook: string; keySkills: string[]; topCompanies: string[] }[];
  certifications: { name: string; provider: string; relevance: string; cost: string }[];
  learningRoadmap: { phase: number; title: string; duration: string; skills: string[]; description: string }[];
  industryInsights: string;
  immediateActions: string[];
}

const interests = [
  "Data Analysis", "Machine Learning", "Web Development", "Mobile Apps",
  "Cloud Computing", "Cybersecurity", "Product Management", "UI/UX Design",
  "Artificial Intelligence", "DevOps", "Blockchain", "Game Development",
];

export default function CareerRecommendationsPage() {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [experienceLevel, setExperienceLevel] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<CareerResult | null>(null);

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev =>
      prev.includes(interest) ? prev.filter(s => s !== interest) : [...prev, interest]
    );
  };

  const analyze = async () => {
    if (selectedSkills.length === 0 || selectedInterests.length === 0 || !experienceLevel) return;
    setAnalyzing(true);
    try {
      const res = await fetch("/api/ai/career-recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skills: selectedSkills, interests: selectedInterests, experienceLevel }),
      });
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      setResult(data);
    } catch {
      // Handle error
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-heading)]">
          AI Career Recommendations
        </h1>
        <p className="text-muted-foreground mt-1">
          Get personalized career paths, salary expectations, and learning roadmaps powered by AI.
        </p>
      </div>

      {/* Input Section */}
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-sm">Your Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto">
              {availableSkills.slice(0, 25).map(skill => (
                <Badge
                  key={skill}
                  variant={selectedSkills.includes(skill) ? "default" : "outline"}
                  className={`cursor-pointer text-[11px] ${selectedSkills.includes(skill) ? "bg-indigo-500 text-white" : ""}`}
                  onClick={() => toggleSkill(skill)}
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-sm">Your Interests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-1.5">
              {interests.map(interest => (
                <Badge
                  key={interest}
                  variant={selectedInterests.includes(interest) ? "default" : "outline"}
                  className={`cursor-pointer text-[11px] ${selectedInterests.includes(interest) ? "bg-violet-500 text-white" : ""}`}
                  onClick={() => toggleInterest(interest)}
                >
                  {interest}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-sm">Experience Level</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select onValueChange={(val) => setExperienceLevel(val || "")} value={experienceLevel}>
              <SelectTrigger>
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fresher">Fresher (0-1 yr)</SelectItem>
                <SelectItem value="junior">Junior (1-3 yrs)</SelectItem>
                <SelectItem value="mid">Mid (3-5 yrs)</SelectItem>
                <SelectItem value="senior">Senior (5+ yrs)</SelectItem>
              </SelectContent>
            </Select>
            <Button
              onClick={analyze}
              disabled={analyzing || selectedSkills.length === 0 || selectedInterests.length === 0 || !experienceLevel}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-0"
            >
              {analyzing ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Generating...</> : <><Sparkles className="mr-2 h-4 w-4" />Get Recommendations</>}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Results */}
      <AnimatePresence>
        {result && (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            {/* Career Paths */}
            <h2 className="text-xl font-bold font-[family-name:var(--font-heading)]">
              <Rocket className="inline h-5 w-5 mr-2 text-indigo-500" />
              Recommended Career Paths
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {result.recommendedPaths.map((path, i) => (
                <motion.div
                  key={path.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="border-border/50 h-full hover:shadow-md transition-shadow">
                    <CardContent className="pt-6 space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{path.title}</h3>
                        <Badge className="bg-indigo-500/10 text-indigo-500">{path.matchScore}% match</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{path.description}</p>
                      <div className="flex items-center gap-2 text-xs">
                        <IndianRupee className="h-3 w-3 text-emerald-500" />
                        <span className="font-medium">{path.salaryRange}</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {path.keySkills.map(s => (
                          <Badge key={s} variant="secondary" className="text-[9px]">{s}</Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Certifications */}
            {result.certifications.length > 0 && (
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-base font-[family-name:var(--font-heading)]">
                    <GraduationCap className="inline h-4 w-4 mr-2 text-violet-500" />
                    Recommended Certifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {result.certifications.map((cert, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                        <div className="flex-1">
                          <p className="text-sm font-medium">{cert.name}</p>
                          <p className="text-xs text-muted-foreground">{cert.provider} • {cert.cost}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Immediate Actions */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-base font-[family-name:var(--font-heading)]">
                  <Zap className="inline h-4 w-4 mr-2 text-amber-500" />
                  Immediate Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {result.immediateActions.map((action, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="h-5 w-5 rounded-full bg-indigo-500/10 text-indigo-500 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                      <span className="text-muted-foreground">{action}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Industry Insights */}
            <Card className="border-border/50 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-cyan-500/5">
              <CardHeader>
                <CardTitle className="text-base font-[family-name:var(--font-heading)]">
                  <Sparkles className="inline h-4 w-4 mr-2 text-indigo-500" />
                  Industry Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">{result.industryInsights}</p>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
