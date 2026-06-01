import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "sonner";
import { ThreeBackgroundWrapper } from "@/components/ui/three-background-wrapper";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "JobLens AI — Intelligent Job Market Analytics",
  description:
    "AI-powered job market intelligence dashboard. Analyze trends, discover in-demand skills, understand salary insights, get ATS resume scores, and receive personalized career recommendations.",
  keywords: [
    "job market analytics",
    "salary insights",
    "skill demand",
    "resume analyzer",
    "ATS score",
    "career recommendations",
    "data analytics jobs",
    "AI career counselor",
  ],
  authors: [{ name: "JobLens AI" }],
  openGraph: {
    title: "JobLens AI — Intelligent Job Market Analytics",
    description:
      "Discover trending skills, analyze salaries, get your resume scored, and receive AI-powered career guidance.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${outfit.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ThreeBackgroundWrapper />
          <TooltipProvider>
            {children}
          </TooltipProvider>
          <Toaster
            position="top-right"
            toastOptions={{
              classNames: {
                toast: 'glass',
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
