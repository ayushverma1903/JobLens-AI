"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Brain,
  FileSearch,
  MapPin,
  Sparkles,
  TrendingUp,
  Briefcase,
  GraduationCap,
  Building2,
  IndianRupee,
  Zap,
  Rocket,
  ChevronRight,
  Star,
  Users,
  Target,
  Shield,
} from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/shared/theme-toggle";

// Dynamic import for 3D components (client-only, no SSR)
const HeroGlobe = dynamic(() => import("@/components/three/hero-globe"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-transparent" />,
});

const FloatingParticles = dynamic(
  () => import("@/components/three/floating-particles"),
  { ssr: false }
);

// ---- Animation Variants ----
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

// ---- Counter Animation Component ----
function AnimatedCounter({ value, suffix = "" }: { value: string; suffix?: string }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] gradient-text"
    >
      {value}{suffix}
    </motion.span>
  );
}

// ---- Navigation Bar ----
function Navbar() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 glass"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold font-[family-name:var(--font-heading)]">
              JobLens <span className="gradient-text">AI</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#analytics" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Analytics</a>
            <a href="#ai" className="text-sm text-muted-foreground hover:text-foreground transition-colors">AI Tools</a>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link href="/login">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white border-0">
                Get Started
                <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

// ---- Hero Section ----
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid opacity-50" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]">
        <HeroGlobe />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="space-y-6"
        >
          <motion.div variants={fadeInUp}>
            <Badge variant="secondary" className="px-4 py-1.5 text-xs font-medium glass border-indigo-500/20">
              <Sparkles className="h-3 w-3 mr-1 text-indigo-500" />
              Powered by Gemini AI
            </Badge>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-4xl sm:text-5xl md:text-7xl font-bold font-[family-name:var(--font-heading)] leading-tight tracking-tight"
          >
            Decode the{" "}
            <span className="gradient-text">Job Market</span>
            <br />
            with AI Intelligence
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Discover trending skills, analyze salary patterns, get your resume ATS-scored,
            and receive personalized career paths — all powered by advanced AI.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/dashboard">
              <Button
                size="lg"
                className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white border-0 text-base px-8 py-6 rounded-xl glow-indigo"
              >
                Explore Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/signup">
              <Button
                size="lg"
                variant="outline"
                className="text-base px-8 py-6 rounded-xl glass"
              >
                Create Free Account
              </Button>
            </Link>
          </motion.div>

          {/* Trust indicators */}
          <motion.div variants={fadeInUp} className="flex items-center justify-center gap-6 pt-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Shield className="h-4 w-4 text-emerald-500" />
              <span>Free to Use</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="h-4 w-4 text-amber-500" />
              <span>Real-time Data</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Brain className="h-4 w-4 text-indigo-500" />
              <span>AI-Powered</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ---- Stats Section ----
function StatsSection() {
  const stats = [
    { value: "24,850+", label: "Jobs Analyzed", icon: Briefcase },
    { value: "1,240+", label: "Companies Tracked", icon: Building2 },
    { value: "50+", label: "Skills Monitored", icon: Target },
    { value: "10,000+", label: "Users Served", icon: Users },
  ];

  return (
    <section className="relative py-20 border-y border-border/50">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={scaleIn}
              className="text-center space-y-2"
            >
              <stat.icon className="h-6 w-6 mx-auto text-indigo-500 mb-3" />
              <AnimatedCounter value={stat.value} />
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ---- Features Section ----
function FeaturesSection() {
  const features = [
    {
      icon: BarChart3,
      title: "Job Market Analytics",
      description: "Deep-dive into hiring trends, skill demand, and market dynamics with interactive visualizations.",
      color: "from-indigo-500 to-blue-600",
    },
    {
      icon: IndianRupee,
      title: "Salary Intelligence",
      description: "Compare salaries by skill, city, experience, and company with real-time market data.",
      color: "from-emerald-500 to-teal-600",
    },
    {
      icon: MapPin,
      title: "Location Analytics",
      description: "Interactive maps showing hiring hotspots across Bangalore, Hyderabad, Pune, Mumbai, and more.",
      color: "from-rose-500 to-pink-600",
    },
    {
      icon: FileSearch,
      title: "AI Resume Analyzer",
      description: "Upload your resume and get instant ATS score, skill extraction, and improvement suggestions.",
      color: "from-amber-500 to-orange-600",
    },
    {
      icon: Brain,
      title: "AI Career Counselor",
      description: "Get personalized career paths, certifications, and learning roadmaps based on your profile.",
      color: "from-violet-500 to-purple-600",
    },
    {
      icon: GraduationCap,
      title: "Internship Insights",
      description: "Discover top internship opportunities, stipend trends, and remote internship analytics.",
      color: "from-cyan-500 to-blue-600",
    },
  ];

  return (
    <section id="features" className="relative py-24">
      <FloatingParticles className="opacity-30" />
      <div className="relative max-w-6xl mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.div variants={fadeInUp}>
            <Badge variant="secondary" className="mb-4 glass">
              <Rocket className="h-3 w-3 mr-1" />
              Features
            </Badge>
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-heading)] mb-4"
          >
            Everything you need to{" "}
            <span className="gradient-text">navigate your career</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From market analytics to AI-powered resume scoring — we&apos;ve got all the tools you need.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={fadeInUp}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="group relative p-6 rounded-2xl glass border border-border/50 hover:border-indigo-500/30 transition-all duration-300"
            >
              <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold font-[family-name:var(--font-heading)] mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
              <div className="mt-4 flex items-center text-sm text-indigo-500 group-hover:gap-2 transition-all">
                <span>Learn more</span>
                <ChevronRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ---- Analytics Preview Section ----
function AnalyticsPreviewSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const previewCards = [
    { label: "Python", value: "8,540", change: "+22%", color: "text-emerald-500" },
    { label: "React", value: "5,640", change: "+18%", color: "text-cyan-500" },
    { label: "GenAI", value: "1,980", change: "+85%", color: "text-violet-500" },
    { label: "SQL", value: "7,820", change: "+15%", color: "text-blue-500" },
  ];

  return (
    <section id="analytics" ref={ref} className="relative py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <Badge variant="secondary" className="mb-4 glass">
                <BarChart3 className="h-3 w-3 mr-1" />
                Real-time Analytics
              </Badge>
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] mb-4">
              Data-driven career decisions
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-muted-foreground mb-8">
              Track skill demand, salary trends, and hiring patterns across India&apos;s top tech hubs.
              Our analytics engine processes thousands of job listings daily.
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Link href="/dashboard">
                <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white border-0">
                  View Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div style={{ y }} className="grid grid-cols-2 gap-4">
            {previewCards.map((card, i) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                className="p-5 rounded-2xl glass border border-border/50"
              >
                <p className="text-sm text-muted-foreground mb-1">{card.label}</p>
                <p className="text-2xl font-bold font-[family-name:var(--font-heading)]">{card.value}</p>
                <p className={`text-sm font-medium ${card.color}`}>
                  <TrendingUp className="inline h-3 w-3 mr-1" />
                  {card.change}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ---- AI Features Section ----
function AIFeaturesSection() {
  return (
    <section id="ai" className="relative py-24 bg-gradient-to-b from-transparent via-indigo-500/5 to-transparent">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.div variants={fadeInUp}>
            <Badge variant="secondary" className="mb-4 glass">
              <Brain className="h-3 w-3 mr-1" />
              AI-Powered
            </Badge>
          </motion.div>
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-heading)] mb-4">
            AI that <span className="gradient-text">understands</span> your career
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our Gemini AI analyzes your resume, identifies skill gaps, and creates personalized learning roadmaps.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-6"
        >
          {[
            {
              title: "Resume ATS Score",
              desc: "Upload your PDF resume and get an instant ATS compatibility score with actionable improvement tips.",
              metric: "95",
              metricLabel: "ATS Score",
              icon: FileSearch,
            },
            {
              title: "Skill Gap Analysis",
              desc: "Select your dream role and discover exactly which skills you need to learn with a priority roadmap.",
              metric: "12",
              metricLabel: "Skills to Master",
              icon: Target,
            },
            {
              title: "Career Pathfinder",
              desc: "Input your skills and interests to get AI-recommended career paths with salary expectations.",
              metric: "5",
              metricLabel: "Career Paths",
              icon: Rocket,
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              variants={fadeInUp}
              whileHover={{ y: -5 }}
              className="relative p-8 rounded-2xl glass border border-border/50 overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-indigo-500/10 to-transparent rounded-bl-full" />
              <item.icon className="h-10 w-10 text-indigo-500 mb-4" />
              <h3 className="text-xl font-bold font-[family-name:var(--font-heading)] mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{item.desc}</p>
              <div className="flex items-end gap-2">
                <span className="text-4xl font-bold gradient-text">{item.metric}</span>
                <span className="text-sm text-muted-foreground pb-1">{item.metricLabel}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ---- Testimonials ----
function TestimonialsSection() {
  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Data Analyst, Bangalore",
      text: "JobLens AI helped me understand exactly which skills to learn for my transition into data science. The ATS score feature improved my resume dramatically!",
      rating: 5,
    },
    {
      name: "Rahul Verma",
      role: "Software Engineer, Hyderabad",
      text: "The salary insights are incredibly accurate. I used the data to negotiate a 30% raise at my current company. Highly recommended!",
      rating: 5,
    },
    {
      name: "Ananya Reddy",
      role: "B.Tech Student, Pune",
      text: "As a fresher, the internship analytics and career recommendations gave me a clear roadmap. I landed my dream internship at a top startup!",
      rating: 5,
    },
  ];

  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] mb-4">
            Trusted by <span className="gradient-text">thousands</span> of professionals
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-6"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={fadeInUp}
              className="p-6 rounded-2xl glass border border-border/50"
            >
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed italic">
                &ldquo;{t.text}&rdquo;
              </p>
              <div>
                <p className="text-sm font-semibold">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ---- CTA Section ----
function CTASection() {
  return (
    <section className="py-24">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="relative p-12 rounded-3xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-center overflow-hidden"
        >
          <div className="absolute inset-0 bg-grid opacity-10" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
          
          <motion.h2 variants={fadeInUp} className="relative text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] mb-4">
            Ready to supercharge your career?
          </motion.h2>
          <motion.p variants={fadeInUp} className="relative text-white/80 mb-8 max-w-xl mx-auto">
            Join thousands of professionals using AI-powered insights to make smarter career decisions.
          </motion.p>
          <motion.div variants={fadeInUp} className="relative flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/signup">
              <Button size="lg" className="bg-white text-indigo-600 hover:bg-white/90 text-base px-8 py-6 rounded-xl font-semibold">
                Get Started for Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 text-base px-8 py-6 rounded-xl">
                View Live Demo
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ---- Footer ----
function Footer() {
  return (
    <footer className="border-t border-border/50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Sparkles className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="text-sm font-semibold font-[family-name:var(--font-heading)]">
              JobLens AI
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            © 2026 JobLens AI. Built with Next.js, Supabase & Gemini AI.
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ---- Main Landing Page ----
export default function LandingPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <AnalyticsPreviewSection />
      <AIFeaturesSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </main>
  );
}
