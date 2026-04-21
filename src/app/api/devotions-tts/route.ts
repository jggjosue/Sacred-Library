import { NextResponse } from "next/server";
import googleTTS from "google-tts-api";

const MAX_TEXT_LENGTH = 8000;
const CHUNK_TARGET = 180;

function splitText(text: string): string[] {
  const cleaned = text.replace(/\s+/g, " ").trim();
  if (!cleaned) return [];

  const sentences = cleaned.split(/(?<=[.!?])\s+/);
  const chunks: string[] = [];
  let current = "";

  for (const sentence of sentences) {
    const s = sentence.trim();
    if (!s) continue;

    if (s.length > CHUNK_TARGET) {
      const words = s.split(" ");
      for (const word of words) {
        const candidate = current ? `${current} ${word}` : word;
        if (candidate.length > CHUNK_TARGET && current) {
          chunks.push(current);
          current = word;
        } else if (candidate.length > CHUNK_TARGET) {
          chunks.push(word.slice(0, CHUNK_TARGET));
          current = word.slice(CHUNK_TARGET);
        } else {
          current = candidate;
        }
      }
      continue;
    }

    const candidate = current ? `${current} ${s}` : s;
    if (candidate.length > CHUNK_TARGET && current) {
      chunks.push(current);
      current = s;
    } else {
      current = candidate;
    }
  }

  if (current) chunks.push(current);
  return chunks;
}

function sanitizeFilename(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9-_]+/gi, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "") || "devotional";
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      text?: string;
      lang?: string;
      title?: string;
    };
    const text = typeof body.text === "string" ? body.text : "";
    const lang = body.lang === "es" ? "es" : "en";
    const title = typeof body.title === "string" ? body.title : "devotional";

    if (!text.trim()) {
      return NextResponse.json(
        { ok: false, code: "missing_text" },
        { status: 400 }
      );
    }

    if (text.length > MAX_TEXT_LENGTH) {
      return NextResponse.json(
        { ok: false, code: "text_too_long" },
        { status: 400 }
      );
    }

    const chunks = splitText(text);
    if (chunks.length === 0) {
      return NextResponse.json(
        { ok: false, code: "empty_chunks" },
        { status: 400 }
      );
    }

    const audioBuffers: Buffer[] = [];
    for (const chunk of chunks) {
      const url = googleTTS.getAudioUrl(chunk, {
        lang,
        slow: false,
        host: "https://translate.google.com",
      });
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`tts_http_${response.status}`);
      }
      const ab = await response.arrayBuffer();
      audioBuffers.push(Buffer.from(ab));
    }

    const merged = Buffer.concat(audioBuffers);
    const filename = `${sanitizeFilename(title)}.mp3`;

    return new NextResponse(merged, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return NextResponse.json(
      { ok: false, code: "tts_failed" },
      { status: 500 }
    );
  }
}

