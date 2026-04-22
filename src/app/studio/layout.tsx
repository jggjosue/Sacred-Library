import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = buildPageMetadata("Studio");

export default function StudioLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
