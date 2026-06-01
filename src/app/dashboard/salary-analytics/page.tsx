"use client";

import { BarChartComponent, LineChartComponent, MultiBarChart } from "@/components/charts/chart-components";
import { salaryByCityData, salaryByExperienceData, salaryBySkillData } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import { KPICard } from "@/components/charts/kpi-card";

export default function SalaryAnalyticsPage() {
  const avgSalary = salaryBySkillData.reduce((a, b) => a + b.avgSalary, 0) / salaryBySkillData.length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-heading)]">
          Salary Analytics
        </h1>
        <p className="text-muted-foreground mt-1">
          Comprehensive salary insights across skills, cities, and experience levels.
        </p>
      </div>

      {/* Salary KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard label="Avg. Salary" value={formatCurrency(avgSalary)} change={6.7} trend="up" icon="IndianRupee" color="emerald" index={0} />
        <KPICard label="Highest Paying Skill" value="GenAI" change={18.9} trend="up" icon="TrendingUp" color="violet" index={1} />
        <KPICard label="Top Paying City" value="Bangalore" change={5.4} trend="up" icon="MapPin" color="rose" index={2} />
        <KPICard label="Avg. Growth" value="+6.7%" change={6.7} trend="up" icon="BarChart3" color="blue" index={3} />
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <BarChartComponent
          title="Average Salary by Skill"
          description="Annual salary comparison across top skills"
          data={salaryBySkillData.map(d => ({ ...d, avgSalaryLPA: Math.round(d.avgSalary / 100000) }))}
          dataKey="avgSalaryLPA"
          nameKey="skill"
          layout="horizontal"
          height={400}
        />
        <MultiBarChart
          title="Salary by City"
          description="Average vs median annual salary (in LPA)"
          data={salaryByCityData.map(d => ({
            city: d.city,
            "Avg Salary": Math.round(d.avgSalary / 100000),
            "Median Salary": Math.round(d.medianSalary / 100000),
          }))}
          xAxisKey="city"
          dataKeys={[
            { key: "Avg Salary", color: "#6366f1", name: "Average (LPA)" },
            { key: "Median Salary", color: "#06b6d4", name: "Median (LPA)" },
          ]}
          height={400}
        />
      </div>

      <MultiBarChart
        title="Salary by Experience Level"
        description="Average and median salary across experience bands (in LPA)"
        data={salaryByExperienceData.map(d => ({
          experience: d.experience,
          "Avg Salary": Math.round(d.avgSalary / 100000),
          "Median Salary": Math.round(d.medianSalary / 100000),
        }))}
        xAxisKey="experience"
        dataKeys={[
          { key: "Avg Salary", color: "#6366f1", name: "Average (LPA)" },
          { key: "Median Salary", color: "#8b5cf6", name: "Median (LPA)" },
        ]}
        height={350}
      />
    </div>
  );
}
