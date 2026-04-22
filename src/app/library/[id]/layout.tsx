import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = buildPageMetadata("Library Detail");

export default function LibraryDetailLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
