"use client";

import { motion } from "framer-motion";
import { KPICard } from "@/components/charts/kpi-card";
import {
  AreaChartComponent,
  BarChartComponent,
  PieChartComponent,
  LineChartComponent,
} from "@/components/charts/chart-components";
import {
  kpiMetrics,
  monthlyTrendData,
  skillDemandData,
  industryData,
  jobTypeData,
  experienceDistData,
  skillGrowthData,
  remoteData,
} from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-heading)] tracking-tight">
          Dashboard Overview
        </h1>
        <p className="text-muted-foreground mt-1">
          Real-time job market intelligence across India&apos;s tech ecosystem.
        </p>
      </div>

      {/* KPI Cards Grid */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {kpiMetrics.map((metric, i) => (
          <KPICard key={metric.label} {...metric} index={i} />
        ))}
      </motion.div>

      {/* Charts Row 1 */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AreaChartComponent
            title="Job Market Trends"
            description="Monthly job postings over the last 12 months"
            data={monthlyTrendData}
            xAxisKey="month"
            dataKeys={[
              { key: "jobs", color: "#6366f1", name: "Jobs" },
              { key: "internships", color: "#8b5cf6", name: "Internships" },
            ]}
            height={320}
          />
        </div>
        <PieChartComponent
          title="Industry Distribution"
          description="Jobs by industry sector"
          data={industryData}
          height={320}
        />
      </div>

      {/* Charts Row 2 */}
      <div className="grid lg:grid-cols-2 gap-6">
        <BarChartComponent
          title="Top Skills in Demand"
          description="Most requested skills in job postings"
          data={skillDemandData.slice(0, 10)}
          dataKey="count"
          nameKey="skill"
          layout="horizontal"
          height={380}
        />
        <LineChartComponent
          title="Skill Growth Trends"
          description="Skill popularity over the past 9 months"
          data={skillGrowthData}
          xAxisKey="month"
          dataKeys={[
            { key: "Python", color: "#6366f1", name: "Python" },
            { key: "React", color: "#06b6d4", name: "React" },
            { key: "GenAI", color: "#8b5cf6", name: "GenAI" },
            { key: "ML", color: "#10b981", name: "ML" },
            { key: "AWS", color: "#f59e0b", name: "AWS" },
          ]}
          height={380}
        />
      </div>

      {/* Charts Row 3 */}
      <div className="grid lg:grid-cols-3 gap-6">
        <PieChartComponent
          title="Job Type Distribution"
          data={jobTypeData}
          height={280}
        />
        <PieChartComponent
          title="Experience Level Demand"
          data={experienceDistData}
          height={280}
        />
        <PieChartComponent
          title="Work Mode Split"
          data={remoteData}
          height={280}
        />
      </div>

      {/* AI Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 rounded-2xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-cyan-500/10 border border-indigo-500/20 flex items-center"
      >
        <div className="flex items-start gap-4">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shrink-0">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold font-[family-name:var(--font-heading)]">AI Market Insight</h3>
              <Badge variant="secondary" className="text-[10px]">Gemini AI</Badge>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              <strong>GenAI/LLM skills are surging +85% YoY</strong> — making it the fastest-growing category.
              Python remains the #1 most demanded skill, but TypeScript (+35.6%) and Next.js (+45.2%) are emerging
              rapidly in the frontend ecosystem. Bangalore continues to lead with 31% of all tech job postings,
              while Hyderabad shows the strongest growth at +18.5%.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
