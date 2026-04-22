import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = buildPageMetadata("Library");

export default function LibraryLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
