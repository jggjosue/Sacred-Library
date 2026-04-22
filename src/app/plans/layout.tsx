import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = buildPageMetadata("Plans");

export default function PlansLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
