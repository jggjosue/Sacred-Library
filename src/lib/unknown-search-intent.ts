export const UNKNOWN_SEARCH_STORAGE_KEY =
  "sacred-library:unknown-search-intents";

export type UnknownSearchIntentId =
  | "bible"
  | "plans"
  | "devotions"
  | "library"
  | "general"
  | "topic"
  | "person"
  | "place"
  | "other";

/** One row: word first without intent, then same row updated when user picks meaning */
export type UnknownSearchStored = {
  word: string;
  lang: "en" | "es";
  savedAt: string;
  intent?: UnknownSearchIntentId;
};

const MAX_STORED = 200;

function readList(): UnknownSearchStored[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(UNKNOWN_SEARCH_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeList(list: UnknownSearchStored[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(
      UNKNOWN_SEARCH_STORAGE_KEY,
      JSON.stringify(list.slice(-MAX_STORED))
    );
  } catch {
    /* ignore */
  }
}

/**
 * When the query has no results: store the raw term (once per burst of typing).
 */
export function noteUnmatchedSearchWord(word: string, lang: "en" | "es") {
  const trimmed = word.trim();
  if (trimmed.length < 2) return;
  const list = readList();
  const last = list[list.length - 1];
  const now = Date.now();
  if (
    last &&
    last.word === trimmed &&
    last.intent === undefined &&
    now - new Date(last.savedAt).getTime() < 90_000
  ) {
    return;
  }
  list.push({
    word: trimmed,
    lang,
    savedAt: new Date().toISOString(),
  });
  writeList(list);
}

/**
 * Attach the user's chosen meaning to the latest pending row for this word,
 * or append a fully classified row if none pending.
 */
export function classifySearchWord(
  word: string,
  intent: UnknownSearchIntentId,
  lang: "en" | "es"
) {
  const trimmed = word.trim();
  if (!trimmed) return;
  const list = readList();
  for (let i = list.length - 1; i >= 0; i--) {
    const row = list[i];
    if (row.word === trimmed && row.intent === undefined) {
      list[i] = { ...row, intent };
      writeList(list);
      return;
    }
  }
  list.push({
    word: trimmed,
    lang,
    savedAt: new Date().toISOString(),
    intent,
  });
  writeList(list);
}

export const UNKNOWN_INTENT_OPTIONS: UnknownSearchIntentId[] = [
  "bible",
  "plans",
  "devotions",
  "library",
  "general",
  "topic",
  "person",
  "place",
  "other",
];
