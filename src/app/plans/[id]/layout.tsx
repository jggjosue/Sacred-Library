import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = buildPageMetadata("Plan Detail");

export default function PlanDetailLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
