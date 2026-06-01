"use client";

import { AreaChartComponent, BarChartComponent, PieChartComponent } from "@/components/charts/chart-components";
import { KPICard } from "@/components/charts/kpi-card";
import { internshipAnalyticsData, internshipTrendData } from "@/lib/mock-data";

export default function InternshipAnalyticsPage() {
  const totalInternships = internshipAnalyticsData.reduce((a, b) => a + b.count, 0);
  const avgStipend = Math.round(internshipAnalyticsData.reduce((a, b) => a + b.avgStipend, 0) / internshipAnalyticsData.length);
  const avgRemote = Math.round(internshipAnalyticsData.reduce((a, b) => a + b.remotePercentage, 0) / internshipAnalyticsData.length);

  const categoryPieData = internshipAnalyticsData.map((d, i) => ({
    name: d.category,
    value: d.count,
    color: ["#6366f1", "#06b6d4", "#8b5cf6", "#10b981", "#f59e0b", "#ef4444", "#ec4899", "#14b8a6", "#3b82f6"][i],
  }));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-heading)]">
          Internship Analytics
        </h1>
        <p className="text-muted-foreground mt-1">
          Internship trends, stipend analysis, and category insights.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard label="Total Internships" value={totalInternships.toLocaleString()} change={15.2} trend="up" icon="GraduationCap" color="violet" index={0} />
        <KPICard label="Avg. Stipend" value={`₹${(avgStipend / 1000).toFixed(0)}K/mo`} change={8.4} trend="up" icon="IndianRupee" color="emerald" index={1} />
        <KPICard label="Remote %" value={`${avgRemote}%`} change={12.1} trend="up" icon="Laptop" color="cyan" index={2} />
        <KPICard label="Top Category" value="Data Science" change={22.5} trend="up" icon="BarChart3" color="indigo" index={3} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AreaChartComponent
            title="Internship Trends"
            description="Monthly internship postings and stipend trends"
            data={internshipTrendData}
            xAxisKey="month"
            dataKeys={[
              { key: "total", color: "#8b5cf6", name: "Total" },
              { key: "remote", color: "#06b6d4", name: "Remote" },
              { key: "onsite", color: "#6366f1", name: "On-site" },
            ]}
            height={350}
          />
        </div>
        <PieChartComponent
          title="Category Distribution"
          data={categoryPieData}
          height={350}
          innerRadius={50}
        />
      </div>

      <BarChartComponent
        title="Average Stipend by Category"
        description="Monthly stipend comparison across internship categories"
        data={internshipAnalyticsData.map(d => ({ ...d, stipendK: Math.round(d.avgStipend / 1000) }))}
        dataKey="stipendK"
        nameKey="category"
        height={320}
      />
    </div>
  );
}
