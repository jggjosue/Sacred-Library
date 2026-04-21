import { NextResponse } from "next/server";
import {
  getPrintifyToken,
  getPrintifyCacheRevalidateSeconds,
  printifyFetch,
  shopProductsPath,
} from "@/lib/printify-api";

/**
 * Productos de una tienda.
 * GET https://api.printify.com/v1/shops/{shop_id}/products.json
 *
 * La lista útil suele estar en `data` (array). Campos típicos: title, description,
 * images, variants (price, is_enabled).
 */
export async function GET(
  request: Request,
  context: { params: Promise<{ shopId: string }> }
) {
  if (!getPrintifyToken()) {
    return NextResponse.json(
      { error: "Printify not configured", hint: "Set PRINTIFY_TOKEN" },
      { status: 501 }
    );
  }

  const { shopId } = await context.params;
  if (!shopId?.trim()) {
    return NextResponse.json({ error: "Missing shop id" }, { status: 400 });
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
