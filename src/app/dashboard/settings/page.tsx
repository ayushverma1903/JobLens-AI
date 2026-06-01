"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Settings, Bell, Shield, Palette, Globe, Trash2 } from "lucide-react";
import { ThemeToggle } from "@/components/shared/theme-toggle";

export default function SettingsPage() {
  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-heading)]">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account preferences and configurations.</p>
      </div>

      {/* Appearance */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-base font-[family-name:var(--font-heading)]">
            <Palette className="inline h-4 w-4 mr-2" />Appearance
          </CardTitle>
          <CardDescription>Customize the look and feel of the dashboard.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Theme</Label>
              <p className="text-xs text-muted-foreground">Toggle between dark and light mode</p>
            </div>
            <ThemeToggle />
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-base font-[family-name:var(--font-heading)]">
            <Bell className="inline h-4 w-4 mr-2" />Notifications
          </CardTitle>
          <CardDescription>Configure how you receive notifications.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { label: "Email Notifications", desc: "Receive job alerts and market updates via email", default: true },
            { label: "Resume Analysis Alerts", desc: "Get notified when your resume analysis is complete", default: true },
            { label: "Weekly Market Digest", desc: "Receive a weekly summary of market trends", default: false },
            { label: "New Feature Announcements", desc: "Be the first to know about new features", default: true },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between">
              <div>
                <Label>{item.label}</Label>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
              <Switch defaultChecked={item.default} />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Privacy */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-base font-[family-name:var(--font-heading)]">
            <Shield className="inline h-4 w-4 mr-2" />Privacy & Security
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Profile Visibility</Label>
              <p className="text-xs text-muted-foreground">Allow recruiters to view your profile</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Analytics Tracking</Label>
              <p className="text-xs text-muted-foreground">Help us improve with anonymous usage data</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div>
            <Button variant="outline" className="text-sm">Change Password</Button>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-500/20">
        <CardHeader>
          <CardTitle className="text-base text-red-500 font-[family-name:var(--font-heading)]">
            <Trash2 className="inline h-4 w-4 mr-2" />Danger Zone
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Once you delete your account, all your data will be permanently removed. This action cannot be undone.
          </p>
          <Button variant="destructive" size="sm">Delete Account</Button>
        </CardContent>
      </Card>
    </div>
  );
}
