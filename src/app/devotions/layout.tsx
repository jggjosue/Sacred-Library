import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = buildPageMetadata("Devotions");

export default function DevotionsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
