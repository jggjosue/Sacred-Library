/**
 * Printify REST API v1
 * https://developers.printify.com/
 *
 * El token solo debe usarse en el servidor (API Routes / Server Actions).
 *
 * Variables:
 * - PRINTIFY_TOKEN: Bearer token de la API
 * - PRINTIFY_SHOP_ID (opcional): ID numérico de tienda; evita listar shops si ya lo conoces
 * - PRINTIFY_CACHE_SECONDS (opcional): caché de fetch Next (default 3600 = 1 h)
 */

const PRINTIFY_BASE = "https://api.printify.com/v1";

const DEFAULT_CACHE_SECONDS = 3600;

export function getPrintifyCacheRevalidateSeconds(): number {
  const raw = process.env.PRINTIFY_CACHE_SECONDS?.trim();
  if (!raw) return DEFAULT_CACHE_SECONDS;
  const n = Number.parseInt(raw, 10);
  if (!Number.isFinite(n) || n < 0) return DEFAULT_CACHE_SECONDS;
  return n;
}

export function getPrintifyToken(): string | null {
  const t = process.env.PRINTIFY_TOKEN?.trim();
  return t || null;
}

export function getPrintifyShopIdFromEnv(): string | null {
  const id = process.env.PRINTIFY_SHOP_ID?.trim();
  return id || null;
}

/**
 * GET https://api.printify.com/v1/shops.json
 */
export function shopsPath(searchParams?: URLSearchParams): string {
  const q = searchParams?.toString();
  return `/shops.json${q ? `?${q}` : ""}`;
}

/**
 * GET https://api.printify.com/v1/shops/{shop_id}/products.json
 */
export function shopProductsPath(
  shopId: string | number,
  searchParams?: URLSearchParams
): string {
  const q = searchParams?.toString();
  return `/shops/${shopId}/products.json${q ? `?${q}` : ""}`;
}

export async function printifyFetch(
  path: string,
  init?: RequestInit,
  revalidateSeconds?: number
): Promise<Response> {
  const token = getPrintifyToken();
  if (!token) {
    throw new Error("Printify not configured (PRINTIFY_TOKEN)");
  }
  const url = path.startsWith("http")
    ? path
    : `${PRINTIFY_BASE}${path.startsWith("/") ? "" : "/"}${path}`;
  const revalidate = revalidateSeconds ?? getPrintifyCacheRevalidateSeconds();
  return fetch(url, {
    ...init,
    method: init?.method ?? "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
      ...init?.headers,
    },
    next: { revalidate },
  });
}
