"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { cn } from "@/lib/utils";

interface KPICardProps {
  label: string;
  value: string | number;
  change: number;
  trend: "up" | "down" | "stable";
  icon: string;
  color: string;
  index?: number;
}

const colorMap: Record<string, { bg: string; text: string; glow: string }> = {
  indigo: { bg: "bg-indigo-500/10", text: "text-indigo-500", glow: "shadow-indigo-500/20" },
  cyan: { bg: "bg-cyan-500/10", text: "text-cyan-500", glow: "shadow-cyan-500/20" },
  violet: { bg: "bg-violet-500/10", text: "text-violet-500", glow: "shadow-violet-500/20" },
  emerald: { bg: "bg-emerald-500/10", text: "text-emerald-500", glow: "shadow-emerald-500/20" },
  amber: { bg: "bg-amber-500/10", text: "text-amber-500", glow: "shadow-amber-500/20" },
  rose: { bg: "bg-rose-500/10", text: "text-rose-500", glow: "shadow-rose-500/20" },
  green: { bg: "bg-green-500/10", text: "text-green-500", glow: "shadow-green-500/20" },
  blue: { bg: "bg-blue-500/10", text: "text-blue-500", glow: "shadow-blue-500/20" },
};

export function KPICard({ label, value, change, trend, icon, color, index = 0 }: KPICardProps) {
  const colors = colorMap[color] || colorMap.indigo;
  // Safely get icon component
  const IconComponent = (LucideIcons as any)[icon] || LucideIcons.BarChart3;
  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className={cn(
        "relative p-5 rounded-2xl border border-border/50 bg-card",
        "hover:shadow-lg transition-shadow duration-300",
        colors.glow
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground font-medium">{label}</p>
          <p className="text-2xl font-bold font-[family-name:var(--font-heading)] tracking-tight">
            {value}
          </p>
          <div className="flex items-center gap-1.5">
            <TrendIcon
              className={cn(
                "h-3.5 w-3.5",
                trend === "up" ? "text-emerald-500" : trend === "down" ? "text-red-500" : "text-muted-foreground"
              )}
            />
            <span
              className={cn(
                "text-xs font-semibold",
                trend === "up" ? "text-emerald-500" : trend === "down" ? "text-red-500" : "text-muted-foreground"
              )}
            >
              {change > 0 ? "+" : ""}{change}%
            </span>
            <span className="text-xs text-muted-foreground">vs last month</span>
          </div>
        </div>
        <div className={cn("h-11 w-11 rounded-xl flex items-center justify-center", colors.bg)}>
          <IconComponent className={cn("h-5 w-5", colors.text)} />
        </div>
      </div>
    </motion.div>
  );
}
