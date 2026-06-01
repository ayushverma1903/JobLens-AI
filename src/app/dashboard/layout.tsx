"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="p-0 w-64">
          <Sidebar collapsed={false} onToggle={() => setMobileOpen(false)} />
        </SheetContent>
      </Sheet>

      {/* Main Content Area */}
      <motion.div
        initial={false}
        animate={{ marginLeft: collapsed ? 72 : 256 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={cn("min-h-screen transition-all md:ml-64", "max-md:ml-0")}
        style={{ marginLeft: undefined }} // Let framer-motion handle this on desktop
      >
        <div className="hidden md:block">
          <motion.div
            initial={false}
            animate={{ marginLeft: collapsed ? 72 : 256 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="min-h-screen flex flex-col"
          >
            <Topbar onMenuClick={() => setMobileOpen(true)} />
            <main className="flex-1 p-4 md:p-6 lg:p-8">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {children}
              </motion.div>
            </main>
          </motion.div>
        </div>
        <div className="md:hidden min-h-screen flex flex-col">
          <Topbar onMenuClick={() => setMobileOpen(true)} />
          <main className="flex-1 p-4">
            {children}
          </main>
        </div>
      </motion.div>
    </div>
  );
}
