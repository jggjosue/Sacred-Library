import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = buildPageMetadata("Scripture");

export default function ScriptureLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
