export type LocalVersion = {
  id: string;
  file: string;
  abbreviation: string;
  title: string;
  language: string;
  languageCode: string;
};

export const LOCAL_VERSION_PREFIX = "local:";

export const LOCAL_VERSIONS: LocalVersion[] = [
  // Spanish
  {
    id: "local:es_rvr_1960",
    file: "/versions/es_rvr_1960.json",
    abbreviation: "RVR1960",
    title: "Reina Valera 1960",
    language: "Spanish",
    languageCode: "spa",
  },
  {
    id: "local:bible_dhh_",
    file: "/versions/bible_dhh_.json",
    abbreviation: "DHH94I",
    title: "Dios Habla Hoy",
    language: "Spanish",
    languageCode: "spa",
  },
  {
    id: "local:bible_dhhs",
    file: "/versions/bible_dhhs.json",
    abbreviation: "DHHS94",
    title: "Dios Habla Hoy (Estándar)",
    language: "Spanish",
    languageCode: "spa",
  },
  {
    id: "local:bible_lbla",
    file: "/versions/bible_lbla.json",
    abbreviation: "LBLA",
    title: "La Biblia de las Américas",
    language: "Spanish",
    languageCode: "spa",
  },
  {
    id: "local:bible_nbla",
    file: "/versions/bible_nbla.json",
    abbreviation: "NBLA",
    title: "Nueva Biblia de las Américas",
    language: "Spanish",
    languageCode: "spa",
  },
  {
    id: "local:bible_ntv",
    file: "/versions/bible_ntv.json",
    abbreviation: "NTV",
    title: "Nueva Traducción Viviente",
    language: "Spanish",
    languageCode: "spa",
  },
  {
    id: "local:bible_nvi_castellano",
    file: "/versions/bible_nvi_castellano.json",
    abbreviation: "NVI-ES",
    title: "Nueva Versión Internacional (Castellano)",
    language: "Spanish",
    languageCode: "spa",
  },
  {
    id: "local:bible_nvi_es",
    file: "/versions/bible_nvi_es.json",
    abbreviation: "NVI",
    title: "Nueva Versión Internacional",
    language: "Spanish",
    languageCode: "spa",
  },
  {
    id: "local:bible_rva_2015",
    file: "/versions/bible_rva_2015.json",
    abbreviation: "RVA2015",
    title: "Reina Valera Actualizada 2015",
    language: "Spanish",
    languageCode: "spa",
  },
  {
    id: "local:bible_rvc",
    file: "/versions/bible_rvc.json",
    abbreviation: "RVC",
    title: "Reina Valera Contemporánea",
    language: "Spanish",
    languageCode: "spa",
  },
  {
    id: "local:bible_tla",
    file: "/versions/bible_tla.json",
    abbreviation: "TLA",
    title: "Traducción en Lenguaje Actual",
    language: "Spanish",
    languageCode: "spa",
  },
  {
    id: "local:bible_tlai",
    file: "/versions/bible_tlai.json",
    abbreviation: "TLAI",
    title: "Traducción en Lenguaje Actual Interconfesional",
    language: "Spanish",
    languageCode: "spa",
  },
  {
    id: "local:es-rvg",
    file: "/versions/es-rvg.json",
    abbreviation: "RVG",
    title: "Reina Valera Gómez",
    language: "Spanish",
    languageCode: "spa",
  },
  {
    id: "local:es_rvr",
    file: "/versions/es_rvr.json",
    abbreviation: "RVR",
    title: "Reina Valera Revisada",
    language: "Spanish",
    languageCode: "spa",
  },
  // English
  {
    id: "local:en_kjv",
    file: "/versions/en_kjv.json",
    abbreviation: "KJV (local)",
    title: "King James Version",
    language: "English",
    languageCode: "eng",
  },
  {
    id: "local:eng_asv",
    file: "/versions/eng_asv.json",
    abbreviation: "ASV (local)",
    title: "American Standard Version",
    language: "English",
    languageCode: "eng",
  },
  {
    id: "local:en_bbe",
    file: "/versions/en_bbe.json",
    abbreviation: "BBE",
    title: "Bible in Basic English",
    language: "English",
    languageCode: "eng",
  },
  // Portuguese
  {
    id: "local:pt_aa",
    file: "/versions/pt_aa.json",
    abbreviation: "AA",
    title: "Almeida Atualizada",
    language: "Portuguese",
    languageCode: "por",
  },
  {
    id: "local:pt_acf",
    file: "/versions/pt_acf.json",
    abbreviation: "ACF",
    title: "Almeida Corrigida Fiel",
    language: "Portuguese",
    languageCode: "por",
  },
  {
    id: "local:pt_nvi",
    file: "/versions/pt_nvi.json",
    abbreviation: "NVI-PT",
    title: "Nova Versão Internacional",
    language: "Portuguese",
    languageCode: "por",
  },
  // Others
  {
    id: "local:ar_svd",
    file: "/versions/ar_svd.json",
    abbreviation: "SVD",
    title: "Smith & Van Dyke",
    language: "Arabic",
    languageCode: "ara",
  },
  {
    id: "local:de_schlachter",
    file: "/versions/de_schlachter.json",
    abbreviation: "SCH",
    title: "Schlachter",
    language: "German",
    languageCode: "deu",
  },
  {
    id: "local:el_greek",
    file: "/versions/el_greek.json",
    abbreviation: "GRK",
    title: "Greek",
    language: "Greek",
    languageCode: "grc",
  },
  {
    id: "local:eo_esperanto",
    file: "/versions/eo_esperanto.json",
    abbreviation: "EO",
    title: "Esperanto",
    language: "Esperanto",
    languageCode: "epo",
  },
  {
    id: "local:fi_finnish",
    file: "/versions/fi_finnish.json",
    abbreviation: "FI",
    title: "Finnish Bible",
    language: "Finnish",
    languageCode: "fin",
  },
  {
    id: "local:fi_pr",
    file: "/versions/fi_pr.json",
    abbreviation: "PR",
    title: "Pyhä Raamattu",
    language: "Finnish",
    languageCode: "fin",
  },
  {
    id: "local:fr_apee",
    file: "/versions/fr_apee.json",
    abbreviation: "APEE",
    title: "Bible Française APEE",
    language: "French",
    languageCode: "fra",
  },
  {
    id: "local:ko_ko",
    file: "/versions/ko_ko.json",
    abbreviation: "KR",
    title: "Korean Bible",
    language: "Korean",
    languageCode: "kor",
  },
  {
    id: "local:ro_cornilescu",
    file: "/versions/ro_cornilescu.json",
    abbreviation: "COR",
    title: "Cornilescu",
    language: "Romanian",
    languageCode: "ron",
  },
  {
    id: "local:ru_synodal",
    file: "/versions/ru_synodal.json",
    abbreviation: "SYN",
    title: "Synodal Translation",
    language: "Russian",
    languageCode: "rus",
  },
  {
    id: "local:vi_vietnamese",
    file: "/versions/vi_vietnamese.json",
    abbreviation: "VI",
    title: "Vietnamese Bible",
    language: "Vietnamese",
    languageCode: "vie",
  },
  {
    id: "local:zh_cuv",
    file: "/versions/zh_cuv.json",
    abbreviation: "CUV",
    title: "Chinese Union Version",
    language: "Chinese",
    languageCode: "zho",
  },
  {
    id: "local:zh_ncv",
    file: "/versions/zh_ncv.json",
    abbreviation: "NCV",
    title: "New Chinese Version",
    language: "Chinese",
    languageCode: "zho",
  },
];

export const isLocalVersionId = (id: string) =>
  id.startsWith(LOCAL_VERSION_PREFIX);

export const getLocalVersion = (id: string): LocalVersion | undefined =>
  LOCAL_VERSIONS.find((v) => v.id === id);

// USFM book order for the standard Protestant 66-book canon. Index aligns with
// the `chapters` array of books in LIST-STRINGS files.
const CANONICAL_USFM: string[] = [
  "GEN", "EXO", "LEV", "NUM", "DEU", "JOS", "JDG", "RUT", "1SA", "2SA",
  "1KI", "2KI", "1CH", "2CH", "EZR", "NEH", "EST", "JOB", "PSA", "PRO",
  "ECC", "SNG", "ISA", "JER", "LAM", "EZK", "DAN", "HOS", "JOL", "AMO",
  "OBA", "JON", "MIC", "NAM", "HAB", "ZEP", "HAG", "ZEC", "MAL",
  "MAT", "MRK", "LUK", "JHN", "ACT", "ROM", "1CO", "2CO", "GAL", "EPH",
  "PHP", "COL", "1TH", "2TH", "1TI", "2TI", "TIT", "PHM", "HEB", "JAS",
  "1PE", "2PE", "1JN", "2JN", "3JN", "JUD", "REV",
];

export const getCanonicalIndex = (usfm: string): number =>
  CANONICAL_USFM.indexOf(usfm);

export type LocalChapterResponse = {
  data: Array<{
    book: string;
    chapter: string;
    verse: string;
    text: string;
  }>;
  /**
   * Pre-verse headings keyed by the verse number they immediately precede.
   * Only populated for formats that store section titles (YouVersion-style).
   */
  headings?: Record<number, string>;
};

const fileCache = new Map<string, unknown>();

const loadFile = async (file: string): Promise<unknown> => {
  const cached = fileCache.get(file);
  if (cached) return cached;
  const res = await fetch(file);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  // Some local files are saved with a UTF-8 BOM which breaks JSON.parse in
  // some browsers. Read as text, strip the BOM, and parse manually.
  const text = await res.text();
  const data = JSON.parse(text.charCodeAt(0) === 0xfeff ? text.slice(1) : text);
  fileCache.set(file, data);
  return data;
};

type ListStringsBook = {
  name: string;
  abbrev?: string;
  chapters: string[][];
};

type YouVersionChapterItem = {
  type: string;
  verse_numbers: number[];
  lines: string[];
};

type YouVersionChapter = {
  chapter_usfm: string;
  is_chapter: boolean;
  items: YouVersionChapterItem[];
};

type YouVersionBook = {
  book_usfm: string;
  name: string;
  chapters: YouVersionChapter[];
};

type YouVersionBible = {
  local_abbreviation?: string;
  local_title?: string;
  books: YouVersionBook[];
};

const isListStringsFormat = (data: unknown): data is ListStringsBook[] =>
  Array.isArray(data) &&
  data.length > 0 &&
  typeof (data[0] as ListStringsBook | undefined)?.name === "string" &&
  Array.isArray((data[0] as ListStringsBook | undefined)?.chapters);

const isYouVersionFormat = (data: unknown): data is YouVersionBible =>
  typeof data === "object" &&
  data !== null &&
  Array.isArray((data as YouVersionBible).books);

export const fetchLocalChapter = async (
  versionId: string,
  bookUsfm: string,
  chapter: number
): Promise<LocalChapterResponse> => {
  const version = getLocalVersion(versionId);
  if (!version) throw new Error(`Unknown local version: ${versionId}`);

  const raw = await loadFile(version.file);

  if (isYouVersionFormat(raw)) {
    const book = raw.books.find((b) => b.book_usfm === bookUsfm);
    if (!book) throw new Error(`Book ${bookUsfm} not found`);
    const chapterUsfm = `${bookUsfm}.${chapter}`;
    const ch = book.chapters.find(
      (c) => c.chapter_usfm === chapterUsfm && c.is_chapter
    );
    if (!ch) throw new Error(`Chapter ${chapter} not found`);
    const data: LocalChapterResponse["data"] = [];
    const headings: Record<number, string> = {};
    let pendingHeading: string | null = null;
    for (const item of ch.items) {
      if (/^heading\d?$/.test(item.type)) {
        const title = (item.lines || []).join(" ").trim();
        if (title) pendingHeading = title;
        continue;
      }
      if (item.type !== "verse") continue;
      const verseNumber = item.verse_numbers?.[0];
      if (!verseNumber) continue;
      const text = (item.lines || []).join(" ").trim();
      if (!text) continue;
      if (pendingHeading) {
        headings[verseNumber] = pendingHeading;
        pendingHeading = null;
      }
      data.push({
        book: book.name,
        chapter: String(chapter),
        verse: String(verseNumber),
        text,
      });
    }
    return { data, headings };
  }

  if (isListStringsFormat(raw)) {
    const idx = getCanonicalIndex(bookUsfm);
    if (idx < 0 || idx >= raw.length) {
      throw new Error(`Book ${bookUsfm} not found`);
    }
    const book = raw[idx];
    const chapterVerses = book.chapters[chapter - 1];
    if (!chapterVerses) throw new Error(`Chapter ${chapter} not found`);
    return {
      data: chapterVerses.map((text, i) => ({
        book: book.name,
        chapter: String(chapter),
        verse: String(i + 1),
        text,
      })),
    };
  }

  throw new Error("Unsupported local Bible format");
};

export const getChapterCountForLocalBook = async (
  versionId: string,
  bookUsfm: string
): Promise<number | null> => {
  const version = getLocalVersion(versionId);
  if (!version) return null;
  try {
    const raw = await loadFile(version.file);
    if (isYouVersionFormat(raw)) {
      const book = raw.books.find((b) => b.book_usfm === bookUsfm);
      if (!book) return 0;
      return book.chapters.filter((c) => c.is_chapter).length;
    }
    if (isListStringsFormat(raw)) {
      const idx = getCanonicalIndex(bookUsfm);
      if (idx < 0 || idx >= raw.length) return 0;
      return raw[idx].chapters.length;
    }
    return null;
  } catch {
    return null;
  }
};
