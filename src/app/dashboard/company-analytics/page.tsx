"use client";

import { BarChartComponent } from "@/components/charts/chart-components";
import { KPICard } from "@/components/charts/kpi-card";
import { companyAnalyticsData } from "@/lib/mock-data";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Star, Building2 } from "lucide-react";

export default function CompanyAnalyticsPage() {
  const topByJobs = [...companyAnalyticsData].sort((a, b) => b.jobCount - a.jobCount).slice(0, 10);
  const topBySalary = [...companyAnalyticsData].sort((a, b) => b.avgSalary - a.avgSalary).slice(0, 10);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-heading)]">
          Company Analytics
        </h1>
        <p className="text-muted-foreground mt-1">
          Top hiring companies, salary benchmarks, and growth analysis.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard label="Companies Tracked" value="1,240" change={8.3} trend="up" icon="Building2" color="cyan" index={0} />
        <KPICard label="Top Hirer" value="TCS" change={8.5} trend="up" icon="Briefcase" color="indigo" index={1} />
        <KPICard label="Highest Paying" value="Google" change={15.4} trend="up" icon="IndianRupee" color="emerald" index={2} />
        <KPICard label="Fastest Growing" value="Razorpay" change={25.8} trend="up" icon="Rocket" color="violet" index={3} />
      </div>

      {/* Company Rankings Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 rounded-2xl border border-border/50 bg-card"
      >
        <h3 className="text-base font-semibold font-[family-name:var(--font-heading)] mb-4">
          <Building2 className="inline h-4 w-4 mr-2 text-indigo-500" />
          Company Rankings
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-3 text-muted-foreground font-medium">Rank</th>
                <th className="text-left py-3 px-3 text-muted-foreground font-medium">Company</th>
                <th className="text-left py-3 px-3 text-muted-foreground font-medium">Industry</th>
                <th className="text-right py-3 px-3 text-muted-foreground font-medium">Jobs</th>
                <th className="text-right py-3 px-3 text-muted-foreground font-medium">Avg Salary</th>
                <th className="text-right py-3 px-3 text-muted-foreground font-medium">Growth</th>
                <th className="text-right py-3 px-3 text-muted-foreground font-medium">Rating</th>
              </tr>
            </thead>
            <tbody>
              {topByJobs.map((company, i) => (
                <motion.tr
                  key={company.company}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="border-b border-border/50 hover:bg-muted/30 transition-colors"
                >
                  <td className="py-3 px-3 font-semibold text-muted-foreground">#{i + 1}</td>
                  <td className="py-3 px-3 font-medium">{company.company}</td>
                  <td className="py-3 px-3">
                    <Badge variant="secondary" className="text-[10px]">{company.industry}</Badge>
                  </td>
                  <td className="py-3 px-3 text-right font-semibold">{company.jobCount.toLocaleString()}</td>
                  <td className="py-3 px-3 text-right">₹{(company.avgSalary / 100000).toFixed(1)} LPA</td>
                  <td className="py-3 px-3 text-right text-emerald-500 font-medium">+{company.growthRate}%</td>
                  <td className="py-3 px-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                      {company.rating}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        <BarChartComponent
          title="Top Companies by Job Count"
          data={topByJobs}
          dataKey="jobCount"
          nameKey="company"
          layout="horizontal"
          height={400}
        />
        <BarChartComponent
          title="Top Companies by Salary"
          description="Average annual salary in LPA"
          data={topBySalary.map(c => ({ ...c, salaryLPA: Math.round(c.avgSalary / 100000) }))}
          dataKey="salaryLPA"
          nameKey="company"
          layout="horizontal"
          height={400}
        />
      </div>
    </div>
  );
}
