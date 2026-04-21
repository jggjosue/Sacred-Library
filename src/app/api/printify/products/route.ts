import { NextResponse } from "next/server";
import {
  getPrintifyToken,
  getPrintifyShopIdFromEnv,
  getPrintifyCacheRevalidateSeconds,
  printifyFetch,
  shopProductsPath,
} from "@/lib/printify-api";

/**
 * Atajo: productos usando PRINTIFY_SHOP_ID del .env (sin pasar shop en la URL).
 * GET /api/printify/products → mismo contrato que …/shops/{id}/products.json
 */
export async function GET(request: Request) {
  if (!getPrintifyToken()) {
    return NextResponse.json(
      { error: "Printify not configured", hint: "Set PRINTIFY_TOKEN" },
      { status: 501 }
    );
  }

  const shopId = getPrintifyShopIdFromEnv();
  if (!shopId) {
    return NextResponse.json(
      {
        error: "PRINTIFY_SHOP_ID not set",
        hint: "Add PRINTIFY_SHOP_ID or use /api/printify/shops/{shopId}/products",
      },
      { status: 501 }
    );
  }

  const { searchParams } = new URL(request.url);
  const path = shopProductsPath(shopId, searchParams);
  const cacheSec = getPrintifyCacheRevalidateSeconds();

  try {
    const res = await printifyFetch(path, undefined, cacheSec);
    const text = await res.text();
    if (!res.ok) {
      return NextResponse.json(
        { error: "Printify API error", status: res.status, body: text.slice(0, 2000) },
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
