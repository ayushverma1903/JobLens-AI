"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart3,
  Briefcase,
  Building2,
  ChevronLeft,
  FileSearch,
  GraduationCap,
  IndianRupee,
  LayoutDashboard,
  MapPin,
  Brain,
  Rocket,
  Settings,
  Shield,
  Sparkles,
  User,
  Target,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  className?: string;
}

const navItems = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { type: "separator" as const, label: "Analytics" },
  { label: "Job Market", href: "/dashboard/job-analytics", icon: Briefcase },
  { label: "Salaries", href: "/dashboard/salary-analytics", icon: IndianRupee },
  { label: "Locations", href: "/dashboard/location-analytics", icon: MapPin },
  { label: "Internships", href: "/dashboard/internship-analytics", icon: GraduationCap },
  { label: "Companies", href: "/dashboard/company-analytics", icon: Building2 },
  { type: "separator" as const, label: "AI Tools" },
  { label: "Resume Analyzer", href: "/dashboard/resume-analyzer", icon: FileSearch },
  { label: "Skill Gap", href: "/dashboard/skill-gap", icon: Target },
  { label: "Career AI", href: "/dashboard/career-recommendations", icon: Rocket },
  { type: "separator" as const, label: "Account" },
  { label: "Profile", href: "/dashboard/profile", icon: User },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
  { label: "Admin", href: "/dashboard/admin", icon: Shield },
];

export function Sidebar({ collapsed, onToggle, className }: SidebarProps) {
  const pathname = usePathname();

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 72 : 256 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={cn(
        "fixed left-0 top-0 bottom-0 z-40 flex flex-col border-r border-sidebar-border bg-sidebar",
        className
      )}
    >
      {/* Logo */}
      <div className="flex items-center h-16 px-4 gap-3">
        <div className="h-8 w-8 min-w-[2rem] rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
          <Sparkles className="h-4 w-4 text-white" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="text-lg font-bold font-[family-name:var(--font-heading)] whitespace-nowrap"
            >
              JobLens <span className="gradient-text">AI</span>
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <Separator className="mx-3" />

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {navItems.map((item, i) => {
          if ('type' in item && item.type === "separator") {
            return (
              <div key={i} className="pt-4 pb-2">
                <AnimatePresence>
                  {!collapsed && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-3"
                    >
                      {item.label}
                    </motion.p>
                  )}
                </AnimatePresence>
                {collapsed && <Separator className="my-1" />}
              </div>
            );
          }

          if (!('href' in item)) return null;
          const isActive = pathname === item.href;
          const Icon = item.icon;

          const linkContent = (
            <Link
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-sidebar-accent text-sidebar-primary shadow-sm"
                  : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
              )}
            >
              <Icon className={cn("h-4 w-4 min-w-[1rem]", isActive && "text-sidebar-primary")} />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-sidebar-primary rounded-r-full"
                />
              )}
            </Link>
          );

          if (collapsed) {
            return (
              <Tooltip key={item.label}>
                <TooltipTrigger>{linkContent}</TooltipTrigger>
                <TooltipContent side="right" className="font-medium">
                  {item.label}
                </TooltipContent>
              </Tooltip>
            );
          }

          return <div key={item.label} className="relative">{linkContent}</div>;
        })}
      </nav>

      {/* Collapse Toggle */}
      <div className="p-3 border-t border-sidebar-border">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className="w-full justify-center"
        >
          <ChevronLeft className={cn("h-4 w-4 transition-transform", collapsed && "rotate-180")} />
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="ml-2"
              >
                Collapse
              </motion.span>
            )}
          </AnimatePresence>
        </Button>
      </div>
    </motion.aside>
  );
}
