/**
 * Normaliza campos de la API Printify para la UI (estructura puede variar ligeramente).
 */

export type PrintifyProductJson = Record<string, unknown>;

export function getPrintifyProductImageUrl(product: PrintifyProductJson): string | null {
  const imgs = product.images;
  if (!Array.isArray(imgs) || imgs.length === 0) return null;
  const first = imgs[0];
  if (typeof first === "string") return first;
  if (first && typeof first === "object") {
    const o = first as { src?: string; url?: string };
    if (typeof o.src === "string") return o.src;
    if (typeof o.url === "string") return o.url;
  }
  return null;
}

/** Precio en variantes (API suele usar centavos). */
export function getPrintifyMinVariantPrice(product: PrintifyProductJson): {
  cents: number;
} | null {
  const variants = product.variants;
  if (!Array.isArray(variants)) return null;
  const prices: number[] = [];
  for (const v of variants) {
    if (typeof v !== "object" || v === null) continue;
    const vo = v as { is_enabled?: boolean; price?: number };
    if (vo.is_enabled === false) continue;
    if (typeof vo.price === "number") prices.push(vo.price);
  }
  if (prices.length === 0) return null;
  return { cents: Math.min(...prices) };
}

export function formatPrintifyPrice(
  cents: number,
  lang: "en" | "es",
  currencyCode = "USD"
): string {
  const amount = cents / 100;
  try {
    return new Intl.NumberFormat(lang === "es" ? "es-MX" : "en-US", {
      style: "currency",
      currency: currencyCode,
    }).format(amount);
  } catch {
    return `${amount.toFixed(2)} ${currencyCode}`;
  }
}

export function stripHtmlBrief(html: string, maxLen = 140): string {
  const text = html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  if (text.length <= maxLen) return text;
  return `${text.slice(0, maxLen)}…`;
}

/** URL pública si el producto está enlazado a un canal de ventas (p. ej. Shopify). */
export function getPrintifyProductExternalUrl(
  product: PrintifyProductJson
): string | null {
  const ext = product.external;
  if (ext && typeof ext === "object") {
    const e = ext as { reference_url?: string };
    if (typeof e.reference_url === "string" && e.reference_url.startsWith("http")) {
      return e.reference_url;
    }
  }
  return null;
}
