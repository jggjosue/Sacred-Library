import { NextResponse } from "next/server";
import {
  getEtsyAuthOnly,
  getEtsyCacheRevalidateSeconds,
  etsyFetchUsersMe,
} from "@/lib/etsy-api";

/**
 * Usuario autenticado (token OAuth). Proxy a:
 * GET https://openapi.etsy.com/v3/application/users/me
 *
 * Requiere: ETSY_API_KEY, ETSY_ACCESS_TOKEN (no hace falta ETSY_SHOP_ID).
 */
export async function GET() {
  if (!getEtsyAuthOnly()) {
    return NextResponse.json(
      {
        error: "Etsy auth not configured",
        hint: "Set ETSY_API_KEY and ETSY_ACCESS_TOKEN",
      },
      { status: 501 }
    );
  }

  const cacheSec = getEtsyCacheRevalidateSeconds();
  try {
    const res = await etsyFetchUsersMe(undefined, cacheSec);
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
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
