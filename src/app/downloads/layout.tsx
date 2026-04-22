import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = buildPageMetadata("Downloads");

export default function DownloadsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
