import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = buildPageMetadata("Shop");

export default function ShopLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
