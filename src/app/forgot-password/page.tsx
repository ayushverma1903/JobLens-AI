"use client";

import { motion } from "framer-motion";
import { Mail, Sparkles, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import dynamic from "next/dynamic";

const FloatingParticles = dynamic(() => import("@/components/three/floating-particles"), { ssr: false });

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute top-1/3 -left-32 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
      <FloatingParticles className="opacity-20" />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative w-full max-w-md">
        <div className="glass rounded-2xl p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="h-12 w-12 mx-auto rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)]">Reset Password</h1>
            <p className="text-sm text-muted-foreground">Enter your email to receive a reset link</p>
          </div>

          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="email" type="email" placeholder="you@example.com" className="pl-10 py-5 rounded-xl" />
              </div>
            </div>
            <Button className="w-full py-5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-0" type="button">
              Send Reset Link
            </Button>
          </form>

          <Link href="/login" className="flex items-center justify-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-3 w-3" />
            Back to sign in
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
