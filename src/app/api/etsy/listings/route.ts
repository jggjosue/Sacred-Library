import { NextResponse } from "next/server";
import {
  activeListingsPath,
  getEtsyConfig,
  getEtsyCacheRevalidateSeconds,
  etsyFetch,
  listingImagesPath,
} from "@/lib/etsy-api";

/**
 * Lista anuncios activos de la tienda (proxy seguro: Key y token solo en servidor).
 * Equivalente al cURL de Etsy con x-api-key + Authorization Bearer.
 *
 * Query Etsy (reenviados): `limit` (default API ~25), `offset`, `sort_on`, `sort_order`, …
 * Query propia: `enrich=1` → una llamada extra a /images por listing (primera imagen).
 */
export async function GET(request: Request) {
  const cfg = getEtsyConfig();
  if (!cfg) {
    return NextResponse.json(
      { error: "Etsy not configured", hint: "Set ETSY_API_KEY, ETSY_ACCESS_TOKEN, ETSY_SHOP_ID" },
      { status: 501 }
    );
  }

  const { searchParams } = new URL(request.url);
  const enrich = searchParams.get("enrich") === "1";
  const params = new URLSearchParams();
  for (const [k, v] of searchParams.entries()) {
    if (k === "enrich") continue;
    params.set(k, v);
  }

  const path = activeListingsPath(cfg.shopId, params);
  const cacheSec = getEtsyCacheRevalidateSeconds();
  const cacheHeaders = {
    "Cache-Control": `public, s-maxage=${cacheSec}, stale-while-revalidate=${cacheSec * 2}`,
  };

  const res = await etsyFetch(path, undefined, cacheSec);
  const text = await res.text();
  if (!res.ok) {
    return NextResponse.json(
      { error: "Etsy API error", status: res.status, body: text.slice(0, 2000) },
      { status: res.status >= 500 ? 502 : res.status }
    );
  }

  let data: unknown = JSON.parse(text) as unknown;
  if (!enrich || typeof data !== "object" || data === null) {
    return NextResponse.json(data, { headers: cacheHeaders });
  }

  const obj = data as { results?: { listing_id?: number }[] };
  const results = obj.results ?? [];
  const withImages = await Promise.all(
    results.map(async (listing) => {
      const id = listing.listing_id;
      if (id == null) return { ...listing, _primaryImageUrl: null as string | null };
      try {
        const ir = await etsyFetch(listingImagesPath(id), undefined, cacheSec);
        if (!ir.ok) return { ...listing, _primaryImageUrl: null };
        const imgJson = (await ir.json()) as { results?: Record<string, unknown>[] };
        const first = imgJson.results?.[0] as
          | { url_570xN?: string; url_fullxfull?: string }
          | undefined;
        const url =
          first?.url_570xN ?? first?.url_fullxfull ?? null;
        return { ...listing, _primaryImageUrl: url };
      } catch {
        return { ...listing, _primaryImageUrl: null as string | null };
      }
    })
  );

  return NextResponse.json({ ...obj, results: withImages }, { headers: cacheHeaders });
}
