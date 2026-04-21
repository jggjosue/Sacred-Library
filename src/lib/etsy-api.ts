/**
 * Etsy Open API v3 (Application API)
 * Docs: https://developers.etsy.com/documentation/reference
 *
 * Variables de entorno (solo servidor — nunca exponer Key ni token al navegador):
 * - ETSY_API_KEY: Keystring de la app → cabecera `x-api-key`
 * - ETSY_ACCESS_TOKEN: OAuth2 → cabecera `Authorization: Bearer …`
 * - ETSY_SHOP_ID: ID numérico de la tienda
 * - ETSY_CACHE_SECONDS (opcional): segundos de caché en `fetch` (default 300). Reduce
 *   llamadas ante el límite ~10.000 peticiones/día de Etsy.
 *
 * Ejemplo equivalente a esta petición (solo backend o terminal):
 *
 * ```bash
 * curl --request GET \
 *   'https://openapi.etsy.com/v3/application/shops/TU_SHOP_ID/listings/active' \
 *   --header 'x-api-key: TU_KEYSTRING' \
 *   --header 'Authorization: Bearer TU_ACCESS_TOKEN'
 * ```
 *
 * Consideraciones:
 * - Paginación: por defecto ~25 resultados; usa query `limit` y `offset` en la ruta
 *   `/api/etsy/listings?limit=25&offset=0`.
 * - Imágenes: el listado activo no trae todas las URLs; hace falta
 *   `GET .../listings/{listing_id}/images` (p. ej. `?enrich=1` en nuestra API).
 */

const ETSY_BASE = "https://openapi.etsy.com/v3";

const DEFAULT_CACHE_SECONDS = 300;

export function getEtsyCacheRevalidateSeconds(): number {
  const raw = process.env.ETSY_CACHE_SECONDS?.trim();
  if (!raw) return DEFAULT_CACHE_SECONDS;
  const n = Number.parseInt(raw, 10);
  if (!Number.isFinite(n) || n < 0) return DEFAULT_CACHE_SECONDS;
  return n;
}

/** Solo Key + token (p. ej. `GET /application/users/me` no usa shop_id). */
export function getEtsyAuthOnly(): { apiKey: string; accessToken: string } | null {
  const apiKey = process.env.ETSY_API_KEY?.trim();
  const accessToken = process.env.ETSY_ACCESS_TOKEN?.trim();
  if (!apiKey || !accessToken) return null;
  return { apiKey, accessToken };
}

export function getEtsyConfig(): {
  apiKey: string;
  accessToken: string;
  shopId: string;
} | null {
  const apiKey = process.env.ETSY_API_KEY?.trim();
  const accessToken = process.env.ETSY_ACCESS_TOKEN?.trim();
  const shopId = process.env.ETSY_SHOP_ID?.trim();
  if (!apiKey || !accessToken || !shopId) return null;
  return { apiKey, accessToken, shopId };
}

/**
 * `fetch` hacia Etsy con caché de datos de Next.js (`next.revalidate`) para no
 * golpear la API en cada visita.
 */
export async function etsyFetch(
  path: string,
  init?: RequestInit,
  revalidateSeconds?: number
): Promise<Response> {
  const cfg = getEtsyConfig();
  if (!cfg) {
    throw new Error("Etsy is not configured (ETSY_API_KEY, ETSY_ACCESS_TOKEN, ETSY_SHOP_ID)");
  }
  const url = path.startsWith("http") ? path : `${ETSY_BASE}${path.startsWith("/") ? "" : "/"}${path}`;
  const revalidate = revalidateSeconds ?? getEtsyCacheRevalidateSeconds();
  return fetch(url, {
    ...init,
    headers: {
      Authorization: `Bearer ${cfg.accessToken}`,
      "x-api-key": cfg.apiKey,
      Accept: "application/json",
      ...init?.headers,
    },
    next: { revalidate },
  });
}

/**
 * GET https://openapi.etsy.com/v3/application/users/me
 * Usuario autenticado asociado al access token (solo requiere ETSY_API_KEY + ETSY_ACCESS_TOKEN).
 */
export async function etsyFetchUsersMe(
  init?: RequestInit,
  revalidateSeconds?: number
): Promise<Response> {
  const auth = getEtsyAuthOnly();
  if (!auth) {
    throw new Error("Etsy auth not configured (ETSY_API_KEY, ETSY_ACCESS_TOKEN)");
  }
  const revalidate = revalidateSeconds ?? getEtsyCacheRevalidateSeconds();
  const url = `${ETSY_BASE}/application/users/me`;
  return fetch(url, {
    ...init,
    method: init?.method ?? "GET",
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
      "x-api-key": auth.apiKey,
      Accept: "application/json",
      ...init?.headers,
    },
    next: { revalidate },
  });
}

/** GET /application/shops/{shop_id}/listings/active */
export function activeListingsPath(shopId: string, searchParams?: URLSearchParams): string {
  const q = searchParams?.toString();
  return `/application/shops/${shopId}/listings/active${q ? `?${q}` : ""}`;
}

/** GET /application/listings/{listing_id} */
export function listingPath(listingId: string | number): string {
  return `/application/listings/${listingId}`;
}

/** GET /application/listings/{listing_id}/images */
export function listingImagesPath(listingId: string | number): string {
  return `/application/listings/${listingId}/images`;
}
