"use client";

import { motion } from "framer-motion";
import { KPICard } from "@/components/charts/kpi-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Database, Activity, Shield, FileSpreadsheet, Brain } from "lucide-react";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

interface Dataset {
  id: string;
  name: string;
  rows: number;
  status: string;
  created_at: string;
}

interface Profile {
  id: string;
  full_name: string;
  role: string;
  created_at: string;
  last_sign_in_at?: string;
}

export default function AdminPage() {
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const supabase = createClient();

  useEffect(() => {
    // Initial fetch
    fetchData();

    // Set up real-time subscriptions
    const datasetsSubscription = supabase
      .channel('datasets-channel')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'datasets' }, () => {
        fetchData();
      })
      .subscribe();

    const profilesSubscription = supabase
      .channel('profiles-channel')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'profiles' }, () => {
        fetchData();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(datasetsSubscription);
      supabase.removeChannel(profilesSubscription);
    };
  }, [supabase]);

  const fetchData = async () => {
    const { data: dData } = await supabase.from('datasets').select('*').order('created_at', { ascending: false }).limit(5);
    if (dData) setDatasets(dData);

    const { data: pData } = await supabase.from('profiles').select('*').order('created_at', { ascending: false }).limit(10);
    if (pData) setProfiles(pData);
  };

  return (
    <div className="space-y-8 relative z-10">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-heading)] gradient-text">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1">Platform management and real-time data administration.</p>
      </div>

      {/* Admin KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard label="Total Users" value={profiles.length > 0 ? profiles.length.toString() : "0"} change={2.5} trend="up" icon="Users" color="indigo" index={0} />
        <KPICard label="Active Sessions" value="12" change={8.3} trend="up" icon="Activity" color="emerald" index={1} />
        <KPICard label="Datasets Uploaded" value={datasets.length.toString()} change={15.0} trend="up" icon="Database" color="violet" index={2} />
        <KPICard label="AI Analyses" value="3,420" change={22.5} trend="up" icon="Brain" color="cyan" index={3} />
      </div>

      {/* Real-time Dataset Upload Monitor */}
      <Card className="glass border-border/50 bg-background/50 backdrop-blur-xl shadow-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-[family-name:var(--font-heading)] flex items-center">
              <Database className="inline h-4 w-4 mr-2 text-indigo-500" />Live Dataset Monitor
            </CardTitle>
            <Badge variant="outline" className="border-indigo-500/50 text-indigo-500 bg-indigo-500/10">Live Connection</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {datasets.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">No datasets found. Waiting for real-time data...</p>
            ) : (
              datasets.map((upload, i) => (
                <motion.div
                  key={upload.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <FileSpreadsheet className="h-4 w-4 text-emerald-500" />
                    <div>
                      <p className="text-sm font-medium">{upload.name}</p>
                      <p className="text-xs text-muted-foreground">{upload.rows.toLocaleString()} rows • {new Date(upload.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <Badge className="bg-emerald-500/10 text-emerald-500 text-[10px] border-emerald-500/20">{upload.status}</Badge>
                </motion.div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Real-time User Management */}
      <Card className="glass border-border/50 bg-background/50 backdrop-blur-xl shadow-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-[family-name:var(--font-heading)] flex items-center">
              <Users className="inline h-4 w-4 mr-2 text-violet-500" />Real-time User Stream
            </CardTitle>
            <Button variant="outline" size="sm" className="glass hover:bg-white/5">Export Users</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left py-3 px-3 text-muted-foreground font-medium">User</th>
                  <th className="text-left py-3 px-3 text-muted-foreground font-medium">Role</th>
                  <th className="text-left py-3 px-3 text-muted-foreground font-medium">Joined</th>
                  <th className="text-left py-3 px-3 text-muted-foreground font-medium">Last Active</th>
                  <th className="text-right py-3 px-3 text-muted-foreground font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {profiles.length === 0 ? (
                  <tr><td colSpan={4} className="text-center py-8 text-muted-foreground">No users found. Waiting for real-time data...</td></tr>
                ) : (
                  profiles.map((user) => (
                    <tr key={user.id} className="border-b border-border/20 hover:bg-muted/20 transition-colors">
                      <td className="py-3 px-3">
                        <p className="font-medium">{user.full_name || 'Anonymous User'}</p>
                        <p className="text-xs text-muted-foreground truncate max-w-[200px]">{user.id}</p>
                      </td>
                      <td className="py-3 px-3">
                        <Badge variant="secondary" className="text-[10px] glass border-white/10">
                          {user.role === "admin" && <Shield className="inline h-2.5 w-2.5 mr-1 text-amber-500" />}
                          {user.role}
                        </Badge>
                      </td>
                      <td className="py-3 px-3 text-muted-foreground">{new Date(user.created_at).toLocaleDateString()}</td>
                      <td className="py-3 px-3 text-muted-foreground">
                        <div className="flex items-center gap-2">
                          {user.last_sign_in_at && (new Date().getTime() - new Date(user.last_sign_in_at).getTime() < 5 * 60 * 1000) ? (
                            <span className="relative flex h-2.5 w-2.5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                            </span>
                          ) : (
                            <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30"></span>
                          )}
                          <span className="text-xs">
                            {user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : 'Never'}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <Button variant="ghost" size="sm" className="hover:bg-indigo-500/20 hover:text-indigo-500">Edit</Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
