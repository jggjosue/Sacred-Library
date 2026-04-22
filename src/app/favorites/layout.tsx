import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = buildPageMetadata("Favorites");

export default function FavoritesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
