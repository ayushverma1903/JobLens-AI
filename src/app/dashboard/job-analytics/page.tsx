"use client";

import { motion } from "framer-motion";
import { BarChartComponent, LineChartComponent, PieChartComponent, AreaChartComponent } from "@/components/charts/chart-components";
import { skillDemandData, skillGrowthData } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Zap } from "lucide-react";

export default function JobAnalyticsPage() {
  const topSkills = skillDemandData.slice(0, 10);
  const emergingSkills = skillDemandData
    .filter((s) => s.growth > 25)
    .sort((a, b) => b.growth - a.growth);

  const categoryData = [
    { name: "Programming", value: skillDemandData.filter(s => s.category === 'programming').reduce((a, b) => a + b.count, 0), color: "#6366f1" },
    { name: "Data/AI", value: skillDemandData.filter(s => s.category === 'data').reduce((a, b) => a + b.count, 0), color: "#8b5cf6" },
    { name: "Tools", value: skillDemandData.filter(s => s.category === 'tools').reduce((a, b) => a + b.count, 0), color: "#06b6d4" },
    { name: "Frameworks", value: skillDemandData.filter(s => s.category === 'frameworks').reduce((a, b) => a + b.count, 0), color: "#10b981" },
    { name: "Cloud", value: skillDemandData.filter(s => s.category === 'cloud').reduce((a, b) => a + b.count, 0), color: "#f59e0b" },
    { name: "Database", value: skillDemandData.filter(s => s.category === 'database').reduce((a, b) => a + b.count, 0), color: "#ef4444" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-heading)]">
          Job Market Analytics
        </h1>
        <p className="text-muted-foreground mt-1">
          Deep analysis of skill demand, growth trends, and emerging technologies.
        </p>
      </div>

      {/* Emerging Skills Badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-5 rounded-2xl border border-border/50 bg-card"
      >
        <div className="flex items-center gap-2 mb-3">
          <Zap className="h-4 w-4 text-amber-500" />
          <h3 className="text-sm font-semibold">Emerging & Trending Skills</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {emergingSkills.map((skill) => (
            <Badge key={skill.skill} variant="secondary" className="px-3 py-1.5 text-xs">
              {skill.skill}
              <span className="ml-1.5 text-emerald-500 font-semibold">
                <TrendingUp className="inline h-3 w-3 mr-0.5" />
                +{skill.growth}%
              </span>
            </Badge>
          ))}
        </div>
      </motion.div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <BarChartComponent
          title="Most In-Demand Skills"
          description="Top 10 skills by number of job postings"
          data={topSkills}
          dataKey="count"
          nameKey="skill"
          layout="horizontal"
          height={400}
        />
        <PieChartComponent
          title="Skill Category Distribution"
          description="Jobs grouped by skill category"
          data={categoryData}
          height={400}
        />
      </div>

      <LineChartComponent
        title="Skill Growth Trends"
        description="How skill popularity changed over the last 9 months"
        data={skillGrowthData}
        xAxisKey="month"
        dataKeys={[
          { key: "Python", color: "#6366f1", name: "Python" },
          { key: "SQL", color: "#06b6d4", name: "SQL" },
          { key: "React", color: "#8b5cf6", name: "React" },
          { key: "ML", color: "#10b981", name: "ML" },
          { key: "GenAI", color: "#f59e0b", name: "GenAI" },
          { key: "AWS", color: "#ef4444", name: "AWS" },
        ]}
        height={360}
      />

      <BarChartComponent
        title="Skill Growth Rate (%)"
        description="Year-over-year growth percentage for top skills"
        data={topSkills}
        dataKey="growth"
        nameKey="skill"
        height={300}
      />
    </div>
  );
}
