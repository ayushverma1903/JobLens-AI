"use client";

import dynamic from "next/dynamic";

const ThreeBackground = dynamic(
  () => import("@/components/ui/three-background").then((mod) => mod.ThreeBackground),
  { ssr: false }
);

export function ThreeBackgroundWrapper() {
  return <ThreeBackground />;
}
