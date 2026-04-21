import { NextResponse } from "next/server";
import {
  getEtsyConfig,
  getEtsyCacheRevalidateSeconds,
  etsyFetch,
  listingImagesPath,
} from "@/lib/etsy-api";

/** Imágenes de un listing. Etsy: GET /application/listings/{listing_id}/images */
export async function GET(
  _request: Request,
  context: { params: Promise<{ listingId: string }> }
) {
  const cfg = getEtsyConfig();
  if (!cfg) {
    return NextResponse.json(
      { error: "Etsy not configured", hint: "Set ETSY_API_KEY, ETSY_ACCESS_TOKEN, ETSY_SHOP_ID" },
      { status: 501 }
    );
  }

  const { listingId } = await context.params;
  if (!listingId || !/^\d+$/.test(listingId)) {
    return NextResponse.json({ error: "Invalid listing id" }, { status: 400 });
  }

  const cacheSec = getEtsyCacheRevalidateSeconds();
  const res = await etsyFetch(listingImagesPath(listingId), undefined, cacheSec);
  const text = await res.text();
  if (!res.ok) {
    return NextResponse.json(
      { error: "Etsy API error", status: res.status, body: text.slice(0, 2000) },
      { status: res.status >= 500 ? 502 : res.status }
    );
  }

  return NextResponse.json(JSON.parse(text) as unknown, {
    headers: {
      "Cache-Control": `public, s-maxage=${cacheSec}, stale-while-revalidate=${cacheSec * 2}`,
    },
  });
}
