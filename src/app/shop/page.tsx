"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useI18n } from "@/components/providers/i18n-provider";
import {
  formatPrintifyPrice,
  getPrintifyMinVariantPrice,
  getPrintifyProductExternalUrl,
  getPrintifyProductImageUrl,
  stripHtmlBrief,
  type PrintifyProductJson,
} from "@/lib/printify-product";

type ShopCategory = "all" | "jewelry" | "journals" | "candles";

type CatalogSource = "printify" | "etsy" | "static";

type EtsyListingRow = {
  listing_id: number;
  title?: string;
  url?: string;
  price?: { amount?: number; divisor?: number; currency_code?: string };
  _primaryImageUrl?: string | null;
};

function formatEtsyPrice(
  price: EtsyListingRow["price"],
  locale: string
): string {
  if (
    price?.amount == null ||
    price?.divisor == null ||
    !Number.isFinite(price.amount) ||
    !Number.isFinite(price.divisor) ||
    price.divisor === 0
  ) {
    return "—";
  }
  const n = price.amount / price.divisor;
  const code = price.currency_code || "USD";
  try {
    return new Intl.NumberFormat(locale === "es" ? "es-MX" : "en-US", {
      style: "currency",
      currency: code,
    }).format(n);
  } catch {
    return `${n.toFixed(2)} ${code}`;
  }
}

const PRODUCTS: {
  id: string;
  category: Exclude<ShopCategory, "all">;
  image: string;
  titleKey: string;
  descKey: string;
  priceKey: string;
}[] = [
  {
    id: "1",
    category: "jewelry",
    image: "https://picsum.photos/seed/shop-necklace/600/750",
    titleKey: "shop.p1Title",
    descKey: "shop.p1Desc",
    priceKey: "shop.price1",
  },
  {
    id: "2",
    category: "journals",
    image: "https://picsum.photos/seed/shop-journal/600/750",
    titleKey: "shop.p2Title",
    descKey: "shop.p2Desc",
    priceKey: "shop.price2",
  },
  {
    id: "3",
    category: "candles",
    image: "https://picsum.photos/seed/shop-candle/600/750",
    titleKey: "shop.p3Title",
    descKey: "shop.p3Desc",
    priceKey: "shop.price3",
  },
  {
    id: "4",
    category: "jewelry",
    image: "https://picsum.photos/seed/shop-mala/600/750",
    titleKey: "shop.p4Title",
    descKey: "shop.p4Desc",
    priceKey: "shop.price4",
  },
];

export default function ShopPage() {
  const { t, lang } = useI18n();
  const [activeNav, setActiveNav] = React.useState<string>("shop-all");
  const [filter, setFilter] = React.useState<ShopCategory>("all");
  const [etsyListings, setEtsyListings] = React.useState<EtsyListingRow[]>([]);
  const [printifyProducts, setPrintifyProducts] = React.useState<
    PrintifyProductJson[]
  >([]);
  const [catalogLoading, setCatalogLoading] = React.useState(true);
  const [catalogSource, setCatalogSource] =
    React.useState<CatalogSource>("static");
  const year = new Date().getFullYear();

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      let source: CatalogSource = "static";
      let printify: PrintifyProductJson[] = [];
      let etsy: EtsyListingRow[] = [];

      try {
        const pr = await fetch("/api/printify/products");
        if (!cancelled && pr.ok) {
          const j = (await pr.json()) as { data?: unknown };
          const data = j.data;
          if (Array.isArray(data) && data.length > 0) {
            printify = data as PrintifyProductJson[];
            source = "printify";
          }
        }
      } catch {
        /* continuar con Etsy / estático */
      }

      if (source !== "printify") {
        try {
          const res = await fetch("/api/etsy/listings?limit=24&enrich=1");
          if (cancelled) return;
          if (res.status === 501) {
            /* sin Etsy */
          } else if (res.ok) {
            const data = (await res.json()) as { results?: EtsyListingRow[] };
            const rows = data.results ?? [];
            if (rows.length > 0) {
              etsy = rows;
              source = "etsy";
            }
          }
        } catch {
          /* estático */
        }
      }

      if (!cancelled) {
        setPrintifyProducts(printify);
        setEtsyListings(etsy);
        setCatalogSource(source);
        setCatalogLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const navItems = [
    { id: "shop-all", label: t("shop.navShopAll"), href: "#collection" },
    { id: "jewelry", label: t("shop.navJewelry"), href: "#collection" },
    { id: "journals", label: t("shop.navJournals"), href: "#collection" },
    { id: "candles", label: t("shop.navCandles"), href: "#collection" },
    { id: "story", label: t("shop.navOurStory"), href: "#story" },
  ] as const;

  const filtered =
    filter === "all"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === filter);

  const filterPills: { id: ShopCategory; label: string }[] = [
    { id: "all", label: t("shop.filterAll") },
    { id: "jewelry", label: t("shop.filterJewelry") },
    { id: "journals", label: t("shop.filterJournals") },
    { id: "candles", label: t("shop.filterCandles") },
  ];

  return (
    <div className="min-h-screen bg-[#faf9f7] text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      {/* Top bar */}
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-[#faf9f7]/95 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/95">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            className="font-headline text-xl font-bold tracking-tight text-[#1e3a5f] dark:text-blue-200 sm:text-2xl"
          >
            Sacred Library
          </Link>
          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => {
                  setActiveNav(item.id);
                  if (
                    item.id === "jewelry" ||
                    item.id === "journals" ||
                    item.id === "candles"
                  ) {
                    setFilter(item.id as ShopCategory);
                  }
                  if (item.id === "shop-all") setFilter("all");
                }}
                className={cn(
                  "text-[10px] font-bold uppercase tracking-[0.2em] transition-colors",
                  activeNav === item.id
                    ? "border-b-2 border-[#2563eb] pb-0.5 text-[#1e3a5f] dark:border-blue-400 dark:text-blue-200"
                    : "text-slate-500 hover:text-[#1e3a5f] dark:text-slate-400 dark:hover:text-blue-200"
                )}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2 text-[#1e3a5f] dark:text-blue-200">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="rounded-full"
              aria-label={t("nav.store")}
            >
              <ShoppingBag className="h-5 w-5" />
            </Button>
            <Link href="/profile" aria-label="Profile">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="rounded-full"
              >
                <User className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative mx-auto max-w-6xl overflow-hidden rounded-b-[2rem] px-0 sm:px-6">
        <div className="relative h-[min(52vh,520px)] w-full overflow-hidden rounded-b-3xl">
          <Image
            src="https://picsum.photos/seed/sanctuary-hero-turquoise/1600/700"
            alt=""
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/35 to-black/20" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white">
            <h1 className="font-headline max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              {t("shop.heroTitle")}
            </h1>
            <p className="mt-4 max-w-xl text-sm font-medium text-white/90 sm:text-base">
              {t("shop.heroSubtitle")}
            </p>
            <Button
              asChild
              className="mt-8 rounded-full bg-[#2563eb] px-8 py-6 text-xs font-bold uppercase tracking-widest text-white shadow-lg hover:bg-blue-700"
            >
              <a href="#collection">{t("shop.ctaExplore")}</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Filters + grid */}
      <main id="collection" className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        {catalogLoading && (
          <p className="mb-8 text-center text-sm text-slate-500">
            {lang === "es" ? "Cargando productos…" : "Loading products…"}
          </p>
        )}

        {catalogSource === "printify" && (
          <p className="mb-6 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-700 dark:text-indigo-400">
            {lang === "es"
              ? "Catálogo desde Printify"
              : "Live catalog from Printify"}
          </p>
        )}

        {catalogSource === "etsy" && (
          <p className="mb-6 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400">
            {lang === "es" ? "Catálogo desde Etsy" : "Live catalog from Etsy"}
          </p>
        )}

        {catalogSource === "static" && (
          <div className="mb-10 flex flex-wrap justify-center gap-3">
            {filterPills.map((pill) => (
              <button
                key={pill.id}
                type="button"
                onClick={() => setFilter(pill.id)}
                className={cn(
                  "rounded-full px-5 py-2 text-xs font-bold uppercase tracking-widest transition-all",
                  filter === pill.id
                    ? "bg-violet-100 text-violet-900 dark:bg-violet-900/40 dark:text-violet-100"
                    : "bg-white text-slate-600 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-300 dark:ring-slate-700"
                )}
              >
                {pill.label}
              </button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {catalogSource === "printify"
            ? printifyProducts.map((product, idx) => {
                const id =
                  product.id != null ? String(product.id) : `printify-${idx}`;
                const title =
                  typeof product.title === "string"
                    ? product.title
                    : `Product ${id}`;
                const img =
                  getPrintifyProductImageUrl(product) ||
                  `https://picsum.photos/seed/printify-${id}/600/750`;
                const href = getPrintifyProductExternalUrl(product);
                const descRaw =
                  typeof product.description === "string"
                    ? product.description
                    : "";
                const blurb = descRaw ? stripHtmlBrief(descRaw) : "";
                const minP = getPrintifyMinVariantPrice(product);
                const priceStr = minP
                  ? formatPrintifyPrice(
                      minP.cents,
                      lang === "es" ? "es" : "en"
                    )
                  : "—";
                const inner = (
                  <>
                    <div className="relative aspect-[4/5] w-full overflow-hidden">
                      <Image
                        src={img}
                        alt={title}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, 25vw"
                        unoptimized={!img.includes("images.printify.com")}
                      />
                    </div>
                    <div className="space-y-1 p-5">
                      <h2 className="font-headline text-lg font-bold text-[#1e293b] dark:text-slate-100">
                        {title}
                      </h2>
                      {blurb ? (
                        <p className="line-clamp-3 text-xs text-slate-500 dark:text-slate-400">
                          {blurb}
                        </p>
                      ) : (
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Printify
                        </p>
                      )}
                      <p className="pt-2 text-sm font-bold text-[#2563eb]">
                        {priceStr}
                      </p>
                    </div>
                  </>
                );
                const cardClass =
                  "group block overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-slate-100 transition hover:shadow-xl dark:bg-slate-900 dark:ring-slate-800";
                return href ? (
                  <a
                    key={id}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cardClass}
                  >
                    {inner}
                  </a>
                ) : (
                  <article key={id} className={cardClass}>
                    {inner}
                  </article>
                );
              })
            : catalogSource === "etsy"
              ? etsyListings.map((row) => {
                  const img =
                    row._primaryImageUrl ||
                    `https://picsum.photos/seed/etsy-${row.listing_id}/600/750`;
                  const href = row.url || "#";
                  const title = row.title || `Listing ${row.listing_id}`;
                  return (
                    <a
                      key={row.listing_id}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-slate-100 transition hover:shadow-xl dark:bg-slate-900 dark:ring-slate-800"
                    >
                      <div className="relative aspect-[4/5] w-full overflow-hidden">
                        <Image
                          src={img}
                          alt={title}
                          fill
                          className="object-cover transition duration-500 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, 25vw"
                          unoptimized={img.includes("etsystatic.com")}
                        />
                      </div>
                      <div className="space-y-1 p-5">
                        <h2 className="font-headline text-lg font-bold text-[#1e293b] dark:text-slate-100">
                          {title}
                        </h2>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Etsy
                        </p>
                        <p className="pt-2 text-sm font-bold text-[#2563eb]">
                          {formatEtsyPrice(row.price, lang)}
                        </p>
                      </div>
                    </a>
                  );
                })
              : filtered.map((p) => (
                <article
                  key={p.id}
                  className="group overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-slate-100 transition hover:shadow-xl dark:bg-slate-900 dark:ring-slate-800"
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden">
                    <Image
                      src={p.image}
                      alt={t(p.titleKey)}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 25vw"
                    />
                  </div>
                  <div className="space-y-1 p-5">
                    <h2 className="font-headline text-lg font-bold text-[#1e293b] dark:text-slate-100">
                      {t(p.titleKey)}
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {t(p.descKey)}
                    </p>
                    <p className="pt-2 text-sm font-bold text-[#2563eb]">
                      {t(p.priceKey)}
                    </p>
                  </div>
                </article>
              ))}
        </div>

        {catalogSource === "static" && filtered.length === 0 && (
          <p className="py-12 text-center text-sm text-slate-500">
            {lang === "es"
              ? "No hay productos en esta categoría."
              : "No products in this category."}
          </p>
        )}

        {catalogSource === "etsy" &&
          !catalogLoading &&
          etsyListings.length === 0 && (
          <p className="py-12 text-center text-sm text-slate-500">
            {lang === "es"
              ? "No hay anuncios activos en la tienda Etsy."
              : "No active listings from the Etsy shop."}
          </p>
        )}
      </main>

      <footer
        id="story"
        className="border-t border-slate-200 bg-white py-12 dark:border-slate-800 dark:bg-slate-950"
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <span className="font-headline text-lg font-bold text-[#1e3a5f] dark:text-blue-200">
            Sacred Library
          </span>
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#2563eb]">
            <a href="#" className="hover:underline">
              {t("shop.footerShipping")}
            </a>
            <a href="#" className="hover:underline">
              {t("shop.footerSustainability")}
            </a>
            <a href="#" className="hover:underline">
              {t("shop.footerContact")}
            </a>
            <a href="#" className="hover:underline">
              {t("shop.footerPrivacy")}
            </a>
          </nav>
        </div>
        <p className="mt-8 text-center text-[10px] font-medium uppercase tracking-[0.25em] text-slate-400">
          {t("shop.footerCopyright").replace("{year}", String(year))}{" "}
          {t("shop.footerTagline")}
        </p>
      </footer>
    </div>
  );
}
