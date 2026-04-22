import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = buildPageMetadata("Profile");

export default function ProfileLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
