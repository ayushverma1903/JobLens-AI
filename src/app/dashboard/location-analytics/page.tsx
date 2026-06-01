"use client";

import { motion } from "framer-motion";
import { BarChartComponent, MultiBarChart } from "@/components/charts/chart-components";
import { KPICard } from "@/components/charts/kpi-card";
import { cityAnalyticsData } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";

export default function LocationAnalyticsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-heading)]">
          Location Analytics
        </h1>
        <p className="text-muted-foreground mt-1">
          Hiring trends and salary insights across India&apos;s major tech hubs.
        </p>
      </div>

      {/* City KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard label="Top Hiring City" value="Bangalore" change={14.2} trend="up" icon="MapPin" color="rose" index={0} />
        <KPICard label="Fastest Growing" value="Hyderabad" change={18.5} trend="up" icon="TrendingUp" color="emerald" index={1} />
        <KPICard label="Cities Tracked" value="7" change={0} trend="stable" icon="Building2" color="blue" index={2} />
        <KPICard label="Total Locations" value="30,220" change={11.8} trend="up" icon="Briefcase" color="indigo" index={3} />
      </div>

      {/* Interactive Map - City Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 rounded-2xl border border-border/50 bg-card"
      >
        <h3 className="text-base font-semibold font-[family-name:var(--font-heading)] mb-4">
          <MapPin className="inline h-4 w-4 mr-2 text-indigo-500" />
          City Overview
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {cityAnalyticsData.map((city, i) => (
            <motion.div
              key={city.city}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -3 }}
              className="p-4 rounded-xl border border-border/50 hover:border-indigo-500/30 hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="h-8 w-8 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                  <MapPin className="h-4 w-4 text-indigo-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{city.city}</p>
                  <p className="text-[10px] text-emerald-500 font-medium">+{city.growthRate}% growth</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <p className="text-muted-foreground">Jobs</p>
                  <p className="font-semibold">{city.jobCount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Avg Salary</p>
                  <p className="font-semibold">₹{Math.round(city.avgSalary / 100000)} LPA</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Internships</p>
                  <p className="font-semibold">{city.internshipCount}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Top Skills</p>
                  <div className="flex flex-wrap gap-1 mt-0.5">
                    {city.topSkills.slice(0, 2).map(s => (
                      <Badge key={s} variant="secondary" className="text-[9px] px-1.5 py-0">{s}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <BarChartComponent
          title="Jobs by City"
          description="Number of active job postings per city"
          data={cityAnalyticsData}
          dataKey="jobCount"
          nameKey="city"
          height={350}
        />
        <MultiBarChart
          title="City Salary Comparison"
          description="Average salary in LPA by city"
          data={cityAnalyticsData.map(c => ({
            city: c.city,
            "Avg Salary (LPA)": Math.round(c.avgSalary / 100000),
            "Internships": c.internshipCount,
          }))}
          xAxisKey="city"
          dataKeys={[
            { key: "Avg Salary (LPA)", color: "#6366f1", name: "Avg Salary (LPA)" },
            { key: "Internships", color: "#8b5cf6", name: "Internships" },
          ]}
          height={350}
        />
      </div>
    </div>
  );
}
