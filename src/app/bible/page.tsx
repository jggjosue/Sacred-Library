
"use client";

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Navbar } from '@/components/navigation/navbar';
import { Footer } from '@/components/footer/footer';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  Check,
  Search,
  Type,
  Play,
  Pause,
  Share2,
  Highlighter,
  Bookmark,
  BookmarkCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { useI18n } from '@/components/providers/i18n-provider';
import {
  LOCAL_VERSIONS,
  isLocalVersionId,
  fetchLocalChapter,
  type LocalVersion,
  type LocalChapterResponse,
} from '@/lib/bible-local';
import { applyNarratorSettings } from '@/lib/speech';
import { isValidUsfm } from '@/lib/global-search';

type BibleVersion = {
  id: string;
  version: string;
  description: string;
  scope: string;
  language: { name: string; code: string; level: string };
  country: { name: string; code: string };
  localVersionName: string;
  localVersionAbbreviation: string;
};

type RemoteVerse = {
  book: string;
  chapter: string;
  verse: string;
  text: string;
};
type RemoteChapter = { data: RemoteVerse[] };

const DEFAULT_VERSION = "local:es_rvr_1960";
const DEFAULT_VERSION_BY_LANG: Record<"en" | "es", string> = {
  en: "local:en_kjv",
  es: "local:es_rvr_1960",
};
const DEFAULT_BOOK = "JHN";
const DEFAULT_CHAPTER = 3;
const JOHN_USFM = "JHN";

const localToBibleVersion = (v: LocalVersion): BibleVersion => ({
  id: v.id,
  version: v.title,
  description: `${v.title} (local)`,
  scope: "Bible",
  language: { name: v.language, code: v.languageCode, level: "Common" },
  country: { name: "", code: "" },
  localVersionName: v.title,
  localVersionAbbreviation: v.abbreviation,
});

const BIBLE_API_BASE =
  "https://cdn.jsdelivr.net/gh/wldeh/bible-api/bibles";

const buildChapterUrl = (version: string, book: string, chapter: number) =>
  `${BIBLE_API_BASE}/${version}/books/${book}/chapters/${chapter}.json`;

const buildVerseUrl = (
  version: string,
  book: string,
  chapter: number,
  verse: number
) =>
  `${BIBLE_API_BASE}/${version}/books/${book}/chapters/${chapter}/verses/${verse}.json`;

const buildVersionsUrl = () => `${BIBLE_API_BASE}/bibles.json`;

// Book-listing is used only to detect the Gospel of John's folder name per
// version (the documented Bible API does not expose a books list endpoint).
const buildBooksListUrl = (version: string) =>
  `https://api.github.com/repos/wldeh/bible-api/contents/bibles/${version}/books?ref=main`;

// Stems used to identify the Gospel of John across languages
const JOHN_STEMS = [
  "john",
  "juan",
  "johannes",
  "giovanni",
  "jean",
  "johan",
  "yohan",
  "ioan",
  "yuhanna",
  "ioann",
  "iohan",
  "joao",
  "joão",
  "jan",
];

const EXCLUDE_PATTERNS = /(epistol|carta|brief|lettre|letter|послан)/i;

const resolveJohnBook = (bookNames: string[]): string | null => {
  const notDigit = bookNames.filter((n) => !/^[123]/.test(n));
  const filtered = notDigit.filter((n) => !EXCLUDE_PATTERNS.test(n));

  // exact matches first (sanjuan, san_juan, san-juan included)
  for (const stem of JOHN_STEMS) {
    const hit = filtered.find((n) => {
      const low = n.toLowerCase();
      return (
        low === stem ||
        low === `san${stem}` ||
        low === `san_${stem}` ||
        low === `san-${stem}` ||
        low === `evangelio${stem}` ||
        low === `ev.${stem}` ||
        low === `ev${stem}`
      );
    });
    if (hit) return hit;
  }
  // substring match (e.g. "evangelodis.giovanni")
  for (const stem of JOHN_STEMS) {
    const hit = filtered.find((n) => n.toLowerCase().includes(stem));
    if (hit) return hit;
  }
  return null;
};

const stripFootnotes = (text: string) =>
  text
    .replace(/\s*\d+\.\d+\s*[^.]*?\.(?=[A-ZÁÉÍÓÚÑ])/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim();

type Verse = {
  number: number;
  text: string;
};

type Section = {
  title: string;
  verses: Verse[];
};

type BibleContent = {
  sections: Section[];
};

const BIBLE_DATA: Record<string, BibleContent> = {
  niv: {
    sections: [
      {
        title: "The Beginning",
        verses: [
          { number: 1, text: "In the beginning God created the heavens and the earth." },
          { number: 2, text: "Now the earth was formless and empty, darkness was over the surface of the deep, and the Spirit of God was hovering over the waters." },
        ]
      },
      {
        title: "The First Day",
        verses: [
          { number: 3, text: "And God said, \"Let there be light,\" and there was light." },
          { number: 4, text: "God saw that the light was good, and he separated the light from the darkness." },
          { number: 5, text: "God called the light \"day,\" and the darkness he called \"night.\" And there was evening, and there was morning—the first day." },
        ]
      }
    ]
  },
  kjv: {
    sections: [
      {
        title: "The Creation of the World",
        verses: [
          { number: 1, text: "In the beginning God created the heaven and the earth." },
          { number: 2, text: "And the earth was without form, and void; and darkness was upon the face of the deep. And the Spirit of God moved upon the face of the waters." },
        ]
      },
      {
        title: "Dividing the Light from Darkness",
        verses: [
          { number: 3, text: "And God said, Let there be light: and there was light." },
          { number: 4, text: "And God saw the light, that it was good: and God divided the light from the darkness." },
          { number: 5, text: "And God called the light Day, and the darkness he called Night. And the evening and the morning were the first day." },
        ]
      }
    ]
  },
  esv: {
    sections: [
      {
        title: "The History of Creation",
        verses: [
          { number: 1, text: "In the beginning, God created the heavens and the earth." },
          { number: 2, text: "The earth was without form and void, and darkness was over the face of the deep. And the Spirit of God was hovering over the face of the waters." },
        ]
      },
      {
        title: "Day One",
        verses: [
          { number: 3, text: "And God said, “Let there be light,” and there was light." },
          { number: 4, text: "And God saw that the light was good. And God separated the light from the darkness." },
          { number: 5, text: "God called the light Day, and the darkness he called Night. And there was evening and there was morning, the first day." },
        ]
      }
    ]
  }
};

type ReaderFontScaleId = "small" | "normal" | "large";
type ReaderLineHeightId = "tight" | "normal" | "relaxed";
type ReaderThemeId = "light" | "sepia" | "dark";

const READER_FONT_SCALES: {
  id: ReaderFontScaleId;
  label: string;
  size: string;
}[] = [
  { id: "small", label: "A-", size: "1.05rem" },
  { id: "normal", label: "100%", size: "1.25rem" },
  { id: "large", label: "A+", size: "1.5rem" },
];

const READER_LINE_HEIGHTS: {
  id: ReaderLineHeightId;
  lineHeight: number;
  gapClass: string;
  labelKey: string;
}[] = [
  { id: "tight", lineHeight: 1.45, gapClass: "gap-[3px]", labelKey: "bible.lineHeightTight" },
  { id: "normal", lineHeight: 1.75, gapClass: "gap-[6px]", labelKey: "bible.lineHeightNormal" },
  { id: "relaxed", lineHeight: 2.05, gapClass: "gap-[10px]", labelKey: "bible.lineHeightRelaxed" },
];

const READER_THEMES: {
  id: ReaderThemeId;
  labelKey: string;
  preview: string;
  page: string;
  body: string;
  title: string;
  verseNumber: string;
  numberFaint: string;
  divider: string;
  card: string;
}[] = [
  {
    id: "light",
    labelKey: "bible.themeLight",
    preview: "bg-white border-slate-200",
    page: "bg-white text-slate-800",
    body: "text-slate-700",
    title: "text-blue-600",
    verseNumber: "text-blue-600",
    numberFaint: "text-slate-400",
    divider: "border-blue-100",
    card: "bg-white border-slate-100",
  },
  {
    id: "sepia",
    labelKey: "bible.themeSepia",
    preview: "bg-[#f4ecd8] border-[#d9c89f]",
    page: "bg-[#f4ecd8] text-[#5b4636]",
    body: "text-[#5b4636]",
    title: "text-[#8a5a3b]",
    verseNumber: "text-[#8a5a3b]",
    numberFaint: "text-[#a89173]",
    divider: "border-[#d9c89f]",
    card: "bg-[#faf3e1] border-[#d9c89f]",
  },
  {
    id: "dark",
    labelKey: "bible.themeDark",
    preview: "bg-slate-900 border-slate-700",
    page: "bg-slate-950 text-slate-100",
    body: "text-slate-200",
    title: "text-blue-400",
    verseNumber: "text-blue-400",
    numberFaint: "text-slate-500",
    divider: "border-slate-800",
    card: "bg-slate-900 border-slate-800",
  },
];

const READER_FONT_SCALE_BY_ID: Record<ReaderFontScaleId, (typeof READER_FONT_SCALES)[number]> =
  READER_FONT_SCALES.reduce((acc, s) => {
    acc[s.id] = s;
    return acc;
  }, {} as Record<ReaderFontScaleId, (typeof READER_FONT_SCALES)[number]>);

const READER_LINE_HEIGHT_BY_ID: Record<
  ReaderLineHeightId,
  (typeof READER_LINE_HEIGHTS)[number]
> = READER_LINE_HEIGHTS.reduce((acc, l) => {
  acc[l.id] = l;
  return acc;
}, {} as Record<ReaderLineHeightId, (typeof READER_LINE_HEIGHTS)[number]>);

const READER_THEME_BY_ID: Record<ReaderThemeId, (typeof READER_THEMES)[number]> =
  READER_THEMES.reduce((acc, t) => {
    acc[t.id] = t;
    return acc;
  }, {} as Record<ReaderThemeId, (typeof READER_THEMES)[number]>);

type HighlightColor = {
  id: string;
  labelKey: string;
  swatch: string;
  bg: string;
};

const HIGHLIGHT_COLORS: HighlightColor[] = [
  {
    id: "yellow",
    labelKey: "bible.color.yellow",
    swatch: "bg-yellow-400",
    bg: "bg-yellow-200/80 dark:bg-yellow-400/30",
  },
  {
    id: "green",
    labelKey: "bible.color.green",
    swatch: "bg-green-400",
    bg: "bg-green-200/80 dark:bg-green-400/30",
  },
  {
    id: "blue",
    labelKey: "bible.color.blue",
    swatch: "bg-blue-400",
    bg: "bg-blue-200/80 dark:bg-blue-400/30",
  },
  {
    id: "pink",
    labelKey: "bible.color.pink",
    swatch: "bg-pink-400",
    bg: "bg-pink-200/80 dark:bg-pink-400/30",
  },
  {
    id: "orange",
    labelKey: "bible.color.orange",
    swatch: "bg-orange-400",
    bg: "bg-orange-200/80 dark:bg-orange-400/30",
  },
  {
    id: "purple",
    labelKey: "bible.color.purple",
    swatch: "bg-purple-400",
    bg: "bg-purple-200/80 dark:bg-purple-400/30",
  },
  {
    id: "red",
    labelKey: "bible.color.red",
    swatch: "bg-red-400",
    bg: "bg-red-200/80 dark:bg-red-400/30",
  },
];

const HIGHLIGHT_BY_ID: Record<string, HighlightColor> = HIGHLIGHT_COLORS.reduce(
  (acc, c) => {
    acc[c.id] = c;
    return acc;
  },
  {} as Record<string, HighlightColor>
);

const verseId = (sIdx: number, number: number) => `${sIdx}-${number}`;

function BiblePageInner() {
  const searchParams = useSearchParams();
  const [version, setVersion] = React.useState<string>(DEFAULT_VERSION);
  const [book, setBook] = React.useState<string>(DEFAULT_BOOK);
  const [chapter, setChapter] = React.useState<number>(DEFAULT_CHAPTER);
  const [bookResolving, setBookResolving] = React.useState<boolean>(false);
  const [remoteContent, setRemoteContent] = React.useState<BibleContent | null>(
    null
  );
  const [remoteHeader, setRemoteHeader] = React.useState<string>("");
  const [remoteLoading, setRemoteLoading] = React.useState<boolean>(true);
  const [remoteError, setRemoteError] = React.useState<string | null>(null);
  const [bibleVersions, setBibleVersions] = React.useState<BibleVersion[]>([]);
  const [selectedVerses, setSelectedVerses] = React.useState<Set<string>>(
    new Set()
  );
  const [versionPickerOpen, setVersionPickerOpen] = React.useState(false);
  const [versionQuery, setVersionQuery] = React.useState("");

  React.useEffect(() => {
    const b = searchParams.get('book')?.trim();
    const c = searchParams.get('chapter');
    if (b) {
      const u = b.toUpperCase();
      if (isValidUsfm(u)) setBook(u);
    }
    if (c != null && c !== '') {
      const n = parseInt(c, 10);
      if (Number.isFinite(n) && n >= 1) setChapter(n);
    }
  }, [searchParams]);

  React.useEffect(() => {
    let cancelled = false;
    const localAsBibleVersions = LOCAL_VERSIONS.map(localToBibleVersion);
    setBibleVersions(localAsBibleVersions);
    fetch('/bible/bibles.json')
      .then((res) => res.json() as Promise<BibleVersion[]>)
      .then((data) => {
        if (cancelled) return;
        setBibleVersions([...localAsBibleVersions, ...data]);
      })
      .catch(() => {
        // silent: keep only local versions
      });
    return () => {
      cancelled = true;
    };
  }, []);

  React.useEffect(() => {
    let cancelled = false;
    setBookResolving(true);
    setRemoteError(null);

    if (isLocalVersionId(version)) {
      setBook((prev) => {
        const u = prev.toUpperCase();
        return isValidUsfm(u) ? u : JOHN_USFM;
      });
      setBookResolving(false);
      return () => {
        cancelled = true;
      };
    }

    fetch(buildBooksListUrl(version))
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return (await res.json()) as Array<{ name: string; type: string }>;
      })
      .then((items) => {
        if (cancelled) return;
        const names = (items || [])
          .filter((i) => i.type === "dir")
          .map((i) => i.name);
        const resolved = resolveJohnBook(names) ?? "sanjuan";
        setBook(resolved);
      })
      .catch(() => {
        if (!cancelled) setBook("sanjuan");
      })
      .finally(() => {
        if (!cancelled) setBookResolving(false);
      });
    return () => {
      cancelled = true;
    };
  }, [version]);

  const lastValidChapterRef = React.useRef<number>(DEFAULT_CHAPTER);

  React.useEffect(() => {
    if (bookResolving) return;
    let cancelled = false;
    setRemoteLoading(true);
    setRemoteError(null);

    const chapterPromise: Promise<RemoteChapter> = isLocalVersionId(version)
      ? fetchLocalChapter(version, book, chapter)
      : fetch(buildChapterUrl(version, book, chapter)).then(async (res) => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          return (await res.json()) as RemoteChapter;
        });

    chapterPromise
      .then((data) => {
        if (cancelled) return;
        if (!data?.data?.length) {
          setRemoteContent(null);
          setRemoteError("Capítulo no disponible en esta versión.");
          return;
        }
        lastValidChapterRef.current = chapter;
        setRemoteHeader(`${data.data[0].book} ${data.data[0].chapter}`);
        const headings =
          (data as LocalChapterResponse).headings ?? {};
        const sections: Section[] = [];
        let current: Section = { title: "", verses: [] };
        sections.push(current);
        for (const v of data.data) {
          const number = Number(v.verse);
          const heading = headings[number];
          if (heading) {
            // Start a new section; drop the first empty one if unused.
            if (current.verses.length === 0 && sections.length === 1) {
              current.title = heading;
            } else {
              current = { title: heading, verses: [] };
              sections.push(current);
            }
          }
          current.verses.push({
            number,
            text: stripFootnotes(v.text),
          });
        }
        setRemoteContent({ sections });
      })
      .catch((err) => {
        if (cancelled) return;
        const message =
          err instanceof Error ? err.message : "Error desconocido";
        // If the user navigated past the last chapter, revert silently.
        if (
          /HTTP 4\d\d/.test(message) &&
          chapter !== lastValidChapterRef.current
        ) {
          setChapter(lastValidChapterRef.current);
          toast({
            title: "Último capítulo alcanzado",
            description:
              "No hay más capítulos disponibles en esta dirección.",
          });
          return;
        }
        setRemoteContent(null);
        setRemoteError('load_error');
      })
      .finally(() => {
        if (!cancelled) setRemoteLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [version, book, chapter, bookResolving]);

  const filteredVersions = React.useMemo(() => {
    const q = versionQuery.trim().toLowerCase();
    if (!q) return bibleVersions;
    return bibleVersions.filter((b) => {
      const haystack = [
        b.id,
        b.version,
        b.localVersionName,
        b.localVersionAbbreviation,
        b.language?.name,
        b.language?.code,
        b.country?.name,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [bibleVersions, versionQuery]);

  const versionsByLanguage = React.useMemo(() => {
    const groups: Record<string, BibleVersion[]> = {};
    for (const b of filteredVersions) {
      const lang = b.language?.name || 'Other';
      if (!groups[lang]) groups[lang] = [];
      groups[lang].push(b);
    }
    Object.values(groups).forEach((list) =>
      list.sort((a, b) =>
        (a.localVersionAbbreviation || a.version).localeCompare(
          b.localVersionAbbreviation || b.version
        )
      )
    );
    return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b));
  }, [filteredVersions]);

  const selectedVersion = React.useMemo(
    () => bibleVersions.find((b) => b.id === version),
    [bibleVersions, version]
  );
  const [highlightedVerses, setHighlightedVerses] = React.useState<
    Record<string, string>
  >({});

  const READER_FONT_SCALE_STORAGE_KEY = "sacred-library:reader-font-scale";
  const READER_LINE_HEIGHT_STORAGE_KEY = "sacred-library:reader-line-height";
  const READER_THEME_STORAGE_KEY = "sacred-library:reader-theme";

  const [readerFontScale, setReaderFontScale] =
    React.useState<ReaderFontScaleId>("normal");
  const [readerLineHeight, setReaderLineHeight] =
    React.useState<ReaderLineHeightId>("normal");
  const [readerTheme, setReaderTheme] = React.useState<ReaderThemeId>("light");

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const fs = window.localStorage.getItem(
        READER_FONT_SCALE_STORAGE_KEY
      ) as ReaderFontScaleId | null;
      const lh = window.localStorage.getItem(
        READER_LINE_HEIGHT_STORAGE_KEY
      ) as ReaderLineHeightId | null;
      const th = window.localStorage.getItem(
        READER_THEME_STORAGE_KEY
      ) as ReaderThemeId | null;
      if (fs && READER_FONT_SCALE_BY_ID[fs]) setReaderFontScale(fs);
      if (lh && READER_LINE_HEIGHT_BY_ID[lh]) setReaderLineHeight(lh);
      if (th && READER_THEME_BY_ID[th]) setReaderTheme(th);
    } catch {
      /* ignore */
    }
  }, []);

  const persistReaderPref = (key: string, value: string) => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(key, value);
    } catch {
      /* ignore */
    }
  };

  const applyReaderFontScale = (id: ReaderFontScaleId) => {
    setReaderFontScale(id);
    persistReaderPref(READER_FONT_SCALE_STORAGE_KEY, id);
  };
  const applyReaderLineHeight = (id: ReaderLineHeightId) => {
    setReaderLineHeight(id);
    persistReaderPref(READER_LINE_HEIGHT_STORAGE_KEY, id);
  };
  const applyReaderTheme = (id: ReaderThemeId) => {
    setReaderTheme(id);
    persistReaderPref(READER_THEME_STORAGE_KEY, id);
  };

  const activeReaderTheme = READER_THEME_BY_ID[readerTheme];
  const activeFontScale = READER_FONT_SCALE_BY_ID[readerFontScale];
  const activeLineHeight = READER_LINE_HEIGHT_BY_ID[readerLineHeight];
  const [speakingId, setSpeakingId] = React.useState<string | null>(null);
  const { toast } = useToast();
  const { t, lang } = useI18n();
  const currentContent =
    remoteContent || BIBLE_DATA[version] || BIBLE_DATA.niv;
  const headerTitle = remoteHeader || `Juan ${chapter}`;

  const scriptureRef = React.useRef<HTMLDivElement>(null);
  const toolsRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const preferred = DEFAULT_VERSION_BY_LANG[lang];
    if (preferred && preferred !== version) {
      setVersion(preferred);
      setVersionQuery("");
      setVersionPickerOpen(false);
    }
  }, [lang, version]);

  React.useEffect(() => {
    if (selectedVerses.size === 0) return;
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (scriptureRef.current?.contains(target)) return;
      if (toolsRef.current?.contains(target)) return;
      if (target.closest?.('[data-bible-tool]')) return;
      setSelectedVerses(new Set());
    };
    document.addEventListener("click", handleDocumentClick);
    return () => document.removeEventListener("click", handleDocumentClick);
  }, [selectedVerses]);

  const stopSpeech = React.useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setSpeakingId(null);
  }, []);

  React.useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.getVoices();
    const handler = () => {
      window.speechSynthesis.getVoices();
    };
    window.speechSynthesis.addEventListener?.("voiceschanged", handler);
    return () => {
      window.speechSynthesis.removeEventListener?.("voiceschanged", handler);
      window.speechSynthesis.cancel();
    };
  }, []);

  React.useEffect(() => {
    stopSpeech();
  }, [version, chapter, book, stopSpeech]);

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevChapter = () => {
    if (remoteLoading || bookResolving || chapter <= 1) return;
    stopSpeech();
    setChapter((c) => Math.max(1, c - 1));
    setSelectedVerses(new Set());
    setHighlightedVerses({});
    scrollToTop();
  };

  const handleNextChapter = () => {
    if (remoteLoading || bookResolving) return;
    stopSpeech();
    setChapter((c) => c + 1);
    setSelectedVerses(new Set());
    setHighlightedVerses({});
    scrollToTop();
  };

  const toggleVerseSelection = (id: string) => {
    setSelectedVerses((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const getSelectedVerseTexts = React.useCallback(() => {
    const results: { id: string; text: string; number: number }[] = [];
    currentContent.sections.forEach((section, sIdx) => {
      section.verses.forEach((verse) => {
        const id = verseId(sIdx, verse.number);
        if (selectedVerses.has(id)) {
          results.push({ id, text: verse.text, number: verse.number });
        }
      });
    });
    return results;
  }, [currentContent, selectedVerses]);

  const requireSelection = () => {
    if (selectedVerses.size === 0) {
      toast({
        title: "Selecciona un versículo",
        description:
          "Haz clic sobre uno o varios versículos antes de usar la barra de herramientas.",
      });
      return false;
    }
    return true;
  };

  const applyHighlight = (colorId: string | null) => {
    if (!requireSelection()) return;
    setHighlightedVerses((prev) => {
      const next = { ...prev };
      selectedVerses.forEach((id) => {
        if (colorId === null) {
          delete next[id];
        } else {
          next[id] = colorId;
        }
      });
      return next;
    });
  };

  const SAVED_VERSES_STORAGE_KEY = "sacred-library:saved-verses";
  const [savedVerseIds, setSavedVerseIds] = React.useState<Set<string>>(
    new Set()
  );

  const buildVerseStorageId = React.useCallback(
    (versionId: string, bookCode: string, chapterNum: number, verseNum: number) =>
      `${versionId}::${bookCode}::${chapterNum}::${verseNum}`,
    []
  );

  const readSavedVerses = React.useCallback((): {
    storageId: string;
  }[] => {
    if (typeof window === "undefined") return [];
    try {
      const raw = window.localStorage.getItem(SAVED_VERSES_STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return parsed.filter(
        (item) => item && typeof item.storageId === "string"
      );
    } catch {
      return [];
    }
  }, []);

  React.useEffect(() => {
    const items = readSavedVerses();
    const idsForCurrent = new Set<string>();
    items.forEach((item) => {
      const parts = item.storageId.split("::");
      if (
        parts.length === 4 &&
        parts[0] === version &&
        parts[1] === book &&
        Number(parts[2]) === chapter
      ) {
        const verseNum = Number(parts[3]);
        currentContent.sections.forEach((section, sIdx) => {
          section.verses.forEach((verse) => {
            if (verse.number === verseNum) {
              idsForCurrent.add(verseId(sIdx, verse.number));
            }
          });
        });
      }
    });
    setSavedVerseIds(idsForCurrent);
  }, [version, book, chapter, currentContent, readSavedVerses]);

  const allSelectedAlreadySaved = React.useMemo(() => {
    if (selectedVerses.size === 0) return false;
    for (const id of selectedVerses) {
      if (!savedVerseIds.has(id)) return false;
    }
    return true;
  }, [selectedVerses, savedVerseIds]);

  const handleSave = () => {
    if (!requireSelection()) return;
    if (typeof window === "undefined") return;

    const verses = getSelectedVerseTexts();
    const existing = readSavedVerses() as Array<Record<string, unknown>>;
    const versionLabel =
      selectedVersion?.localVersionAbbreviation ||
      selectedVersion?.version ||
      version;
    const bookLabel = headerTitle.replace(/\s+\d+$/, "").trim() || book;
    const now = new Date().toISOString();

    const selectedStorageIds = new Set(
      verses.map((v) => buildVerseStorageId(version, book, chapter, v.number))
    );

    let updated: Array<Record<string, unknown>>;
    let action: "saved" | "removed";

    if (allSelectedAlreadySaved) {
      updated = existing.filter(
        (item) => !selectedStorageIds.has(String(item.storageId))
      );
      action = "removed";
    } else {
      const remaining = existing.filter(
        (item) => !selectedStorageIds.has(String(item.storageId))
      );
      const additions = verses.map((v) => ({
        storageId: buildVerseStorageId(version, book, chapter, v.number),
        versionId: version,
        versionLabel,
        book,
        bookLabel,
        chapter,
        verseNumber: v.number,
        text: v.text,
        savedAt: now,
      }));
      updated = [...remaining, ...additions];
      action = "saved";
    }

    try {
      window.localStorage.setItem(
        SAVED_VERSES_STORAGE_KEY,
        JSON.stringify(updated)
      );
      setSavedVerseIds((prev) => {
        const next = new Set(prev);
        if (action === "saved") {
          selectedVerses.forEach((id) => next.add(id));
        } else {
          selectedVerses.forEach((id) => next.delete(id));
        }
        return next;
      });
      toast({
        title:
          action === "saved"
            ? t("bible.saveSuccessTitle")
            : t("bible.unsaveSuccessTitle"),
        description:
          action === "saved"
            ? t("bible.saveSuccessDescription")
            : t("bible.unsaveSuccessDescription"),
      });
    } catch {
      toast({
        variant: "destructive",
        title: t("bible.saveErrorTitle"),
        description: t("bible.saveErrorDescription"),
      });
    }
  };

  const handleShare = async () => {
    if (!requireSelection()) return;
    const verses = getSelectedVerseTexts();
    const shareText = verses
      .map((v) => `${v.number}. ${v.text}`)
      .join("\n");
    const payload = `Genesis 1 (${version.toUpperCase()})\n\n${shareText}`;

    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({
          title: "Sacred Library - Genesis 1",
          text: payload,
        });
        return;
      }
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(payload);
        toast({
          title: "Copiado al portapapeles",
          description: "Ya puedes pegarlo donde quieras compartirlo.",
        });
        return;
      }
      throw new Error("Share no disponible");
    } catch (err) {
      toast({
        title: "No se pudo compartir",
        description: "Intenta de nuevo o copia el texto manualmente.",
        variant: "destructive",
      });
    }
  };

  const toSpeechLang = (code?: string | null): string | undefined => {
    if (!code) return undefined;
    const normalized = code.toLowerCase().trim();
    const map: Record<string, string> = {
      spa: "es-ES",
      eng: "en-US",
      por: "pt-PT",
      fra: "fr-FR",
      fre: "fr-FR",
      deu: "de-DE",
      ger: "de-DE",
      ita: "it-IT",
      rus: "ru-RU",
      zho: "zh-CN",
      chi: "zh-CN",
      jpn: "ja-JP",
      kor: "ko-KR",
      ara: "ar-SA",
      ell: "el-GR",
      gre: "el-GR",
      fin: "fi-FI",
      nld: "nl-NL",
      dut: "nl-NL",
      vie: "vi-VN",
      ron: "ro-RO",
      rum: "ro-RO",
      epo: "eo",
      pol: "pl-PL",
      tur: "tr-TR",
      heb: "he-IL",
      ces: "cs-CZ",
      cze: "cs-CZ",
      dan: "da-DK",
      swe: "sv-SE",
      nor: "nb-NO",
      ukr: "uk-UA",
      hun: "hu-HU",
      hin: "hi-IN",
      ind: "id-ID",
      tha: "th-TH",
    };
    if (map[normalized]) return map[normalized];
    if (/^[a-z]{2}(-[A-Za-z]{2,4})?$/i.test(code)) return code;
    return undefined;
  };

  const handlePlay = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      toast({
        title: "Audio no disponible",
        description: "Tu navegador no soporta síntesis de voz.",
        variant: "destructive",
      });
      return;
    }

    if (speakingId) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }

    const selected = getSelectedVerseTexts();
    const pieces: { id: string; text: string }[] =
      selected.length > 0
        ? selected.map((v) => ({ id: v.id, text: v.text }))
        : currentContent.sections.flatMap((section, sIdx) => {
            const items: { id: string; text: string }[] = [];
            if (section.title) {
              items.push({
                id: `title-${sIdx}`,
                text: section.title,
              });
            }
            section.verses.forEach((verse) => {
              items.push({
                id: verseId(sIdx, verse.number),
                text: verse.text,
              });
            });
            return items;
          });

    if (pieces.length === 0) {
      toast({
        title: "Sin contenido",
        description: "No hay texto para reproducir.",
      });
      return;
    }

    const text = pieces.map((p) => p.text).join(" ");
    const utterance = new SpeechSynthesisUtterance(text);
    const lang = toSpeechLang(selectedVersion?.language?.code);
    if (lang) utterance.lang = lang;
    applyNarratorSettings(utterance);
    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);
    setSpeakingId(pieces.map((p) => p.id).join(","));
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div
      className={cn(
        "min-h-screen transition-colors",
        activeReaderTheme.page
      )}
    >
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-6 pt-32 pb-48">
        {/* Reader Header */}
        <header className="flex flex-col md:flex-row items-center justify-between mb-20 gap-6">
          <div className="flex items-center gap-8">
            <button
              type="button"
              onClick={handlePrevChapter}
              disabled={
                chapter <= 1 || remoteLoading || bookResolving
              }
              aria-label="Capítulo anterior"
              className="text-slate-300 dark:text-slate-600 hover:text-blue-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h1 className="text-5xl font-headline font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              {headerTitle}
            </h1>
            <button
              type="button"
              onClick={handleNextChapter}
              disabled={remoteLoading || bookResolving}
              aria-label="Capítulo siguiente"
              className="text-slate-300 dark:text-slate-600 hover:text-blue-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          <Popover
            open={versionPickerOpen}
            onOpenChange={(open) => {
              setVersionPickerOpen(open);
              if (!open) setVersionQuery("");
            }}
          >
            <PopoverTrigger asChild>
              <button
                type="button"
                role="combobox"
                aria-expanded={versionPickerOpen}
                className="w-[280px] bg-slate-50 dark:bg-slate-900 border-none rounded-full h-12 px-6 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center justify-between gap-3 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <span className="truncate text-left">
                  {selectedVersion
                    ? `${
                        selectedVersion.localVersionAbbreviation ||
                        selectedVersion.id
                      } — ${selectedVersion.version}`
                    : "Seleccionar versión"}
                </span>
                <ChevronsUpDown className="w-4 h-4 shrink-0 text-slate-400 dark:text-slate-500" />
              </button>
            </PopoverTrigger>
            <PopoverContent
              align="end"
              className="w-[360px] p-0 rounded-2xl border-slate-100 dark:border-slate-800 shadow-xl"
            >
              <div className="relative border-b border-slate-100 dark:border-slate-800 p-2">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500 pointer-events-none" />
                <Input
                  autoFocus
                  value={versionQuery}
                  onChange={(e) => setVersionQuery(e.target.value)}
                  placeholder={t('bible.searchPlaceholder')}
                  className="h-10 pl-9 pr-3 border-none shadow-none focus-visible:ring-0 text-sm"
                />
              </div>
              <div
                role="listbox"
                className="max-h-[60vh] overflow-y-auto py-2"
              >
                {!versionQuery && (
                  <div className="px-3 pb-1">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-blue-600 px-2 py-1">
                      Featured
                    </div>
                    {(
                      [
                        {
                          id: "local:es_rvr_1960",
                          label: "Reina Valera 1960 (RVR1960)",
                        },
                        { id: "local:en_kjv", label: "King James Version" },
                        {
                          id: "local:bible_nvi_es",
                          label: "Nueva Versión Internacional (NVI)",
                        },
                      ] as const
                    ).map((item) => (
                      <VersionRow
                        key={item.id}
                        active={version === item.id}
                        onSelect={() => {
                          setVersion(item.id);
                          setVersionPickerOpen(false);
                          setVersionQuery("");
                        }}
                      >
                        <span>{item.label}</span>
                      </VersionRow>
                    ))}
                  </div>
                )}

                {versionsByLanguage.length === 0 && (
                  <div className="px-6 py-8 text-center text-sm text-slate-400 dark:text-slate-500">
                    Sin resultados para “{versionQuery}”.
                  </div>
                )}

                {versionsByLanguage.map(([language, items]) => (
                  <div key={language} className="px-3 py-1">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 px-2 py-1">
                      {language}
                    </div>
                    {items.map((b) => {
                      const abbr = b.localVersionAbbreviation || b.id;
                      return (
                        <VersionRow
                          key={b.id}
                          active={version === b.id}
                          onSelect={() => {
                            setVersion(b.id);
                            setVersionPickerOpen(false);
                            setVersionQuery("");
                          }}
                        >
                          <span className="font-semibold">{abbr}</span>
                          <span className="text-slate-400 dark:text-slate-500"> — {b.version}</span>
                        </VersionRow>
                      );
                    })}
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </header>

        {(remoteLoading || bookResolving) && (
          <div className="max-w-2xl mx-auto mb-10 text-center text-sm text-slate-400 dark:text-slate-500">
            {t('bible.loadingChapter')} {chapter}…
          </div>
        )}

        {!remoteLoading && remoteError && (
          <div className="max-w-2xl mx-auto mb-10 rounded-2xl border border-amber-100 bg-amber-50/60 px-5 py-4 text-sm text-amber-900">
            <p className="font-semibold">{t('bible.loadError')}</p>
          </div>
        )}

        {selectedVersion &&
          !isLocalVersionId(version) &&
          !BIBLE_DATA[version] &&
          !remoteLoading &&
          !remoteError && (
            <div className="max-w-2xl mx-auto mb-10 rounded-2xl border border-blue-100 dark:border-blue-900 bg-blue-50/40 dark:bg-blue-950/40 px-5 py-4 text-sm text-slate-600 dark:text-slate-300">
              <p className="font-semibold text-slate-900 dark:text-slate-100">
                {selectedVersion.localVersionName || selectedVersion.version}
              </p>
              <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
                {selectedVersion.language?.name}
                {selectedVersion.country?.name
                  ? ` · ${selectedVersion.country.name}`
                  : ''}
                {selectedVersion.scope ? ` · ${selectedVersion.scope}` : ''}
              </p>
            </div>
          )}

        {/* Scripture Content */}
        <div
          ref={scriptureRef}
          className={cn("space-y-12 max-w-2xl mx-auto", activeReaderTheme.body)}
          style={{
            fontSize: activeFontScale.size,
            lineHeight: activeLineHeight.lineHeight,
          }}
        >
          {!remoteError && !remoteLoading && currentContent.sections.map((section, sIdx) => (
            <div key={sIdx} className="space-y-8">
              {section.title && (
                <h2
                  className={cn(
                    "text-lg md:text-xl font-extrabold tracking-[0.25em] uppercase border-b pb-4",
                    activeReaderTheme.title,
                    activeReaderTheme.divider
                  )}
                >
                  {section.title}
                </h2>
              )}
              <div
                className={cn(
                  "space-y-8 font-body",
                  activeReaderTheme.body
                )}
              >
                {section.verses.map((verse) => {
                  const id = verseId(sIdx, verse.number);
                  const isSelected = selectedVerses.has(id);
                  const highlightId = highlightedVerses[id];
                  const highlight = highlightId
                    ? HIGHLIGHT_BY_ID[highlightId]
                    : undefined;
                  return (
                    <p
                      key={verse.number}
                      role="button"
                      tabIndex={0}
                      onClick={() => toggleVerseSelection(id)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          toggleVerseSelection(id);
                        }
                      }}
                      className={cn(
                        "relative group cursor-pointer rounded-lg -mx-3 px-3 py-1 transition-all",
                        highlight?.bg,
                        isSelected && !highlight &&
                          "bg-blue-50/60 dark:bg-blue-500/10 ring-1 ring-blue-200 dark:ring-blue-500/60",
                        isSelected && highlight &&
                          "ring-2 ring-blue-400 dark:ring-blue-400"
                      )}
                    >
                      <span
                        className={cn(
                          "text-xs font-extrabold tabular-nums absolute -left-8 top-[0.35rem] tracking-tight opacity-80 group-hover:opacity-100 transition-opacity",
                          activeReaderTheme.verseNumber
                        )}
                      >
                        {verse.number}
                      </span>
                      {verse.text}
                    </p>
                  );
                })}
              </div>
            </div>
          ))}

          {!remoteError && !remoteLoading && (
            <nav
              aria-label={t('bible.chapterNav')}
              className="flex flex-col sm:flex-row items-stretch gap-4 pt-12 mt-12 border-t border-slate-100 dark:border-slate-800"
            >
              <button
                type="button"
                onClick={handlePrevChapter}
                disabled={chapter <= 1 || remoteLoading || bookResolving}
                className="flex-1 group flex items-center gap-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 py-5 text-left shadow-sm hover:border-blue-200 dark:hover:border-blue-500/40 hover:shadow-md transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-slate-100 disabled:hover:shadow-sm"
              >
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 dark:group-hover:bg-blue-500/10 dark:group-hover:text-blue-400 transition-colors shrink-0">
                  <ChevronLeft className="w-5 h-5" />
                </span>
                <span className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                    {t('bible.previous')}
                  </span>
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
                    {chapter > 1
                      ? `${t('bible.chapter')} ${chapter - 1}`
                      : t('bible.noPrevious')}
                  </span>
                </span>
              </button>

              <button
                type="button"
                onClick={handleNextChapter}
                disabled={remoteLoading || bookResolving}
                className="flex-1 group flex items-center gap-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 py-5 text-right shadow-sm hover:border-blue-200 dark:hover:border-blue-500/40 hover:shadow-md transition-all sm:flex-row-reverse disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-slate-100 disabled:hover:shadow-sm"
              >
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 dark:group-hover:bg-blue-500/10 dark:group-hover:text-blue-400 transition-colors shrink-0">
                  <ChevronRight className="w-5 h-5" />
                </span>
                <span className="flex flex-col flex-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                    {t('bible.next')}
                  </span>
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
                    {t('bible.chapter')} {chapter + 1}
                  </span>
                </span>
              </button>
            </nav>
          )}
        </div>

        {/* Floating Tools Bar */}
        <div
          ref={toolsRef}
          className="fixed bottom-12 left-1/2 -translate-x-1/2 bg-slate-100/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/50 rounded-full p-2 flex items-center gap-2 shadow-2xl z-40"
        >
          {selectedVerses.size > 0 && (
            <span className="hidden sm:inline-block text-[10px] font-bold uppercase tracking-widest text-blue-600 px-3">
              {selectedVerses.size} {t(selectedVerses.size > 1 ? 'bible.selectedPlural' : 'bible.selected')}
            </span>
          )}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                title={t('bible.toolTypography')}
                className="w-12 h-12 rounded-full text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 hover:text-blue-600 transition-all"
              >
                <Type className="w-5 h-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              data-bible-tool=""
              align="start"
              side="top"
              sideOffset={12}
              className="w-[300px] p-5 rounded-2xl border-slate-100 dark:border-slate-800 shadow-xl"
            >
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-400 dark:text-slate-500 mb-5">
                {t('bible.typographySettings')}
              </p>

              <div className="space-y-5">
                <div>
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
                    {t('bible.fontSize')}
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {READER_FONT_SCALES.map((s) => {
                      const active = readerFontScale === s.id;
                      return (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => applyReaderFontScale(s.id)}
                          className={cn(
                            "h-11 rounded-xl border text-sm font-bold transition-colors",
                            active
                              ? "border-blue-500 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 ring-2 ring-blue-500/30"
                              : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600"
                          )}
                        >
                          {s.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
                    {t('bible.lineHeight')}
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {READER_LINE_HEIGHTS.map((h) => {
                      const active = readerLineHeight === h.id;
                      return (
                        <button
                          key={h.id}
                          type="button"
                          onClick={() => applyReaderLineHeight(h.id)}
                          title={t(h.labelKey)}
                          aria-label={t(h.labelKey)}
                          className={cn(
                            "h-11 rounded-xl border flex flex-col items-center justify-center transition-colors",
                            h.gapClass,
                            active
                              ? "border-blue-500 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 ring-2 ring-blue-500/30"
                              : "border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600"
                          )}
                        >
                          <span className="w-5 h-[2px] bg-current rounded-full" />
                          <span className="w-5 h-[2px] bg-current rounded-full" />
                          <span className="w-5 h-[2px] bg-current rounded-full" />
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
                    {t('bible.theme')}
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {READER_THEMES.map((th) => {
                      const active = readerTheme === th.id;
                      return (
                        <button
                          key={th.id}
                          type="button"
                          onClick={() => applyReaderTheme(th.id)}
                          className={cn(
                            "p-2 rounded-xl border flex flex-col items-center gap-2 transition-colors",
                            active
                              ? "border-blue-500 ring-2 ring-blue-500/30"
                              : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
                          )}
                        >
                          <span
                            className={cn(
                              "w-full h-8 rounded-md border",
                              th.preview
                            )}
                          />
                          <span
                            className={cn(
                              "text-xs font-bold",
                              active
                                ? "text-blue-600 dark:text-blue-400"
                                : "text-slate-600 dark:text-slate-300"
                            )}
                          >
                            {t(th.labelKey)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePlay}
            title={speakingId ? "Detener audio" : "Reproducir audio"}
            className={cn(
              "w-12 h-12 rounded-full hover:bg-white dark:hover:bg-slate-800 hover:text-blue-600 transition-all",
              speakingId ? "text-blue-600 bg-white dark:bg-slate-900" : "text-slate-600 dark:text-slate-300"
            )}
          >
            {speakingId ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleShare}
            title={t('bible.toolShare')}
            className="w-12 h-12 rounded-full text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 hover:text-blue-600 transition-all"
          >
            <Share2 className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSave}
            title={
              allSelectedAlreadySaved
                ? t('bible.toolUnsave')
                : t('bible.toolSave')
            }
            className={cn(
              "w-12 h-12 rounded-full hover:bg-white dark:hover:bg-slate-800 hover:text-blue-600 transition-all",
              allSelectedAlreadySaved
                ? "text-blue-600 bg-white dark:bg-slate-900"
                : "text-slate-600 dark:text-slate-300"
            )}
          >
            {allSelectedAlreadySaved ? (
              <BookmarkCheck className="w-5 h-5" />
            ) : (
              <Bookmark className="w-5 h-5" />
            )}
          </Button>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                title={t('bible.toolHighlight')}
                className="w-12 h-12 rounded-full text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 hover:text-blue-600 transition-all"
              >
                <Highlighter className="w-5 h-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              data-bible-tool=""
              align="end"
              side="top"
              sideOffset={12}
              className="w-auto p-3 rounded-2xl border-slate-100 dark:border-slate-800 shadow-xl"
            >
              <div className="flex items-center gap-2">
                {HIGHLIGHT_COLORS.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => applyHighlight(c.id)}
                    title={t(c.labelKey)}
                    aria-label={t(c.labelKey)}
                    className={cn(
                      "w-7 h-7 rounded-full ring-1 ring-black/5 transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
                      c.swatch
                    )}
                  />
                ))}
                <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-1" />
                <button
                  type="button"
                  onClick={() => applyHighlight(null)}
                  title={t('bible.removeHighlight')}
                  aria-label={t('bible.removeHighlight')}
                  className="w-7 h-7 rounded-full border border-slate-300 dark:border-slate-600 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-red-500 hover:border-red-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                >
                  <span className="text-sm font-bold leading-none">×</span>
                </button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function VersionRow({
  children,
  active,
  onSelect,
}: {
  children: React.ReactNode;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      role="option"
      aria-selected={active}
      onClick={onSelect}
      className={cn(
        "w-full flex items-center gap-2 px-2 py-2 rounded-lg text-left text-sm transition-colors",
        active
          ? "bg-blue-50 text-blue-700"
          : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
      )}
    >
      <Check
        className={cn(
          "w-4 h-4 shrink-0",
          active ? "opacity-100 text-blue-600" : "opacity-0"
        )}
      />
      <span className="truncate">{children}</span>
    </button>
  );
}

export default function BiblePage() {
  return (
    <Suspense
      fallback={
        <div
          className="min-h-screen bg-white dark:bg-slate-900 flex items-center justify-center text-muted-foreground text-sm"
          role="status"
          aria-live="polite"
        >
          Loading
        </div>
      }
    >
      <BiblePageInner />
    </Suspense>
  );
}
