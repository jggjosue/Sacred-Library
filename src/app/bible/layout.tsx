import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = buildPageMetadata("Bible");

export default function BibleLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
