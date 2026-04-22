import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = buildPageMetadata("Plan Day");

export default function PlanDayLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
