import { BOOK_NAMES_ES, BOOK_USFM, PLAN_READINGS } from "@/lib/plan-readings";
import { REFLECTIONS } from "@/lib/reflections";

export type SearchCategory = "bible" | "plans" | "devotions" | "library" | "site";

export type SearchHit = {
  id: string;
  category: SearchCategory;
  title: string;
  subtitle?: string;
  href: string;
};

const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const USFM_SET = new Set(Object.values(BOOK_USFM));

type BookMatch = { usfm: string; en: string; terms: string[] };

const BOOK_MATCH_ROWS: BookMatch[] = Object.entries(BOOK_USFM).map(
  ([en, usfm]) => {
    const es = BOOK_NAMES_ES[en] ?? en;
    return {
      usfm,
      en,
      terms: [norm(en), norm(es), norm(usfm)],
    };
  }
);

BOOK_MATCH_ROWS.sort((a, b) => b.en.length - a.en.length);

export function isValidUsfm(code: string): boolean {
  return USFM_SET.has(code.toUpperCase());
}

export function parseBibleReference(raw: string): {
  usfm: string;
  chapter: number;
} | null {
  const trimmed = raw.trim();
  const m = trimmed.match(/^(.+?)\s+(\d+)\s*(?::\s*(\d+))?$/);
  if (!m) return null;
  const bookPart = m[1].trim();
  const chapter = Number(m[2]);
  if (!Number.isFinite(chapter) || chapter < 1) return null;
  const nBook = norm(bookPart);

  for (const row of BOOK_MATCH_ROWS) {
    for (const term of row.terms) {
      if (!term) continue;
      if (nBook === term) return { usfm: row.usfm, chapter };
      if (nBook.startsWith(term + " ") || term.startsWith(nBook))
        return { usfm: row.usfm, chapter };
    }
  }
  for (const row of BOOK_MATCH_ROWS) {
    for (const term of row.terms) {
      if (term.length >= 3 && (nBook.includes(term) || term.includes(nBook)))
        return { usfm: row.usfm, chapter };
    }
  }
  return null;
}

export function bibleChapterHref(usfm: string, chapter: number): string {
  return `/bible?book=${encodeURIComponent(usfm)}&chapter=${chapter}`;
}

const PLAN_IDS = Object.keys(PLAN_READINGS);

const LIBRARY_ENTRIES: { id: string; href: string; match: string[] }[] = [
  {
    id: "lib-morning",
    href: "/library/morning-gratitude",
    match: [
      "morning gratitude",
      "gratitud matutina",
      "sarah young",
      "library",
      "biblio",
    ],
  },
  {
    id: "lib-stillness",
    href: "/library/finding-stillness",
    match: [
      "finding stillness",
      "encontrar quietud",
      "john mark comer",
      "stillness",
      "quietud",
    ],
  },
];

const SITE_ENTRIES: {
  id: string;
  href: string;
  titleKey: string;
  descKey: string;
  keywords: string[];
}[] = [
  {
    id: "site-home",
    href: "/",
    titleKey: "search.site.home",
    descKey: "search.site.homeDesc",
    keywords: ["home", "inicio", "sacred", "hero", "community", "comunidad"],
  },
  {
    id: "site-bible",
    href: "/bible",
    titleKey: "search.site.linkBible",
    descKey: "search.site.bibleDesc",
    keywords: [
      "bible",
      "biblia",
      "scripture",
      "escritura",
      "versículo",
      "verse",
    ],
  },
  {
    id: "site-plans",
    href: "/plans",
    titleKey: "search.site.linkPlans",
    descKey: "search.site.plansDesc",
    keywords: ["plans", "planes", "lectura", "reading"],
  },
  {
    id: "site-devotions",
    href: "/devotions",
    titleKey: "search.site.linkDevotions",
    descKey: "search.site.devotionsDesc",
    keywords: ["devotional", "devocional", "reflection", "reflexión"],
  },
  {
    id: "site-library",
    href: "/library",
    titleKey: "search.site.linkLibrary",
    descKey: "search.site.libraryDesc",
    keywords: ["library", "biblioteca", "audio", "sermon"],
  },
  {
    id: "site-scripture",
    href: "/scripture",
    titleKey: "search.site.scripture",
    descKey: "search.site.scriptureDesc",
    keywords: ["scripture", "text", "texto"],
  },
  {
    id: "site-downloads",
    href: "/downloads",
    titleKey: "search.site.downloads",
    descKey: "search.site.downloadsDesc",
    keywords: ["download", "descarga", "offline"],
  },
  {
    id: "site-favorites",
    href: "/favorites",
    titleKey: "search.site.linkFavorites",
    descKey: "search.site.favoritesDesc",
    keywords: ["favorites", "favoritos", "heart", "saved"],
  },
  {
    id: "site-profile",
    href: "/profile",
    titleKey: "search.site.profile",
    descKey: "search.site.profileDesc",
    keywords: ["profile", "perfil", "account", "cuenta"],
  },
];

const POPULAR_REFERENCES: { usfm: string; chapter: number }[] = [
  { usfm: "JHN", chapter: 3 },
  { usfm: "PSA", chapter: 23 },
  { usfm: "PRO", chapter: 3 },
  { usfm: "ROM", chapter: 8 },
  { usfm: "GEN", chapter: 1 },
  { usfm: "MAT", chapter: 5 },
];

function bookDisplayName(usfm: string, lang: "en" | "es"): string {
  const entry = BOOK_MATCH_ROWS.find((r) => r.usfm === usfm);
  if (!entry) return usfm;
  return lang === "es"
    ? BOOK_NAMES_ES[entry.en] ?? entry.en
    : entry.en;
}

export function runGlobalSearch(
  query: string,
  lang: "en" | "es",
  t: (key: string) => string
): SearchHit[] {
  const q = norm(query.trim());
  const out: SearchHit[] = [];
  const seen = new Set<string>();

  const push = (h: SearchHit) => {
    if (seen.has(h.id)) return;
    seen.add(h.id);
    out.push(h);
  };

  if (q.length >= 2) {
    const ref = parseBibleReference(query);
    if (ref && isValidUsfm(ref.usfm)) {
      const name = bookDisplayName(ref.usfm, lang);
      push({
        id: `bible-ref-${ref.usfm}-${ref.chapter}`,
        category: "bible",
        title: `${name} ${ref.chapter}`,
        subtitle: t("search.bibleOpenChapter"),
        href: bibleChapterHref(ref.usfm, ref.chapter),
      });
    }
  }

  const addBookMatches = (filter: (row: BookMatch) => boolean) => {
    for (const row of BOOK_MATCH_ROWS) {
      if (!filter(row)) continue;
      const name = lang === "es" ? BOOK_NAMES_ES[row.en] ?? row.en : row.en;
      for (let ch = 1; ch <= 3; ch++) {
        push({
          id: `bible-${row.usfm}-${ch}`,
          category: "bible",
          title: `${name} ${ch}`,
          subtitle: t("search.bibleOpenChapter"),
          href: bibleChapterHref(row.usfm, ch),
        });
        if (out.filter((x) => x.category === "bible").length >= 24) return;
      }
    }
  };

  if (q.length === 0) {
    for (const r of POPULAR_REFERENCES) {
      const name = bookDisplayName(r.usfm, lang);
      push({
        id: `bible-pop-${r.usfm}-${r.chapter}`,
        category: "bible",
        title: `${name} ${r.chapter}`,
        subtitle: t("search.popularRefs"),
        href: bibleChapterHref(r.usfm, r.chapter),
      });
    }
    for (const planId of PLAN_IDS.slice(0, 8)) {
      push({
        id: `plan-${planId}`,
        category: "plans",
        title: t(`plans.${planId}.title`),
        subtitle: t(`plans.${planId}.desc`),
        href: `/plans/${planId}`,
      });
    }
    for (const ref of REFLECTIONS.slice(0, 4)) {
      const text = ref.content[lang] ?? ref.content.en;
      push({
        id: `dev-ref-${ref.id}`,
        category: "devotions",
        title: ref.name,
        subtitle: text.length > 120 ? `${text.slice(0, 117)}…` : text,
        href: `/devotions#reflection-${ref.id}`,
      });
    }
    for (const lib of LIBRARY_ENTRIES) {
      push({
        id: lib.id,
        category: "library",
        title:
          lib.id === "lib-morning"
            ? t("search.library.morningTitle")
            : t("search.library.stillnessTitle"),
        subtitle:
          lib.id === "lib-morning"
            ? t("search.library.morningDesc")
            : t("search.library.stillnessDesc"),
        href: lib.href,
      });
    }
    for (const site of SITE_ENTRIES.slice(0, 6)) {
      push({
        id: site.id,
        category: "site",
        title: t(site.titleKey),
        subtitle: t(site.descKey),
        href: site.href,
      });
    }
  } else {
    addBookMatches((row) =>
      row.terms.some((term) => term.includes(q) || q.includes(term))
    );

    for (const planId of PLAN_IDS) {
      if (out.filter((x) => x.category === "plans").length >= 20) break;
      const titleKey = `plans.${planId}.title`;
      const descKey = `plans.${planId}.desc`;
      const title = t(titleKey);
      const desc = t(descKey);
      const hay = norm(`${title} ${desc} ${planId}`);
      if (hay.includes(q)) {
        push({
          id: `plan-${planId}`,
          category: "plans",
          title,
          subtitle: desc,
          href: `/plans/${planId}`,
        });
      }
    }

    for (const ref of REFLECTIONS) {
      if (out.filter((x) => x.category === "devotions").length >= 12) break;
      const text = ref.content[lang] ?? ref.content.en;
      const hay = norm(`${ref.name} ${ref.tradition} ${text}`);
      if (hay.includes(q)) {
        push({
          id: `dev-ref-${ref.id}`,
          category: "devotions",
          title: ref.name,
          subtitle: text.length > 120 ? `${text.slice(0, 117)}…` : text,
          href: `/devotions#reflection-${ref.id}`,
        });
      }
    }

    for (const lib of LIBRARY_ENTRIES) {
      if (
        lib.match.some(
          (m) => norm(m).includes(q) || q.includes(norm(m))
        )
      ) {
        push({
          id: lib.id,
          category: "library",
          title:
            lib.id === "lib-morning"
              ? t("search.library.morningTitle")
              : t("search.library.stillnessTitle"),
          subtitle:
            lib.id === "lib-morning"
              ? t("search.library.morningDesc")
              : t("search.library.stillnessDesc"),
          href: lib.href,
        });
      }
    }

    for (const site of SITE_ENTRIES) {
      const title = t(site.titleKey);
      const desc = t(site.descKey);
      const hay = norm(`${title} ${desc} ${site.keywords.join(" ")}`);
      if (hay.includes(q)) {
        push({
          id: site.id,
          category: "site",
          title,
          subtitle: desc,
          href: site.href,
        });
      }
    }
  }

  const order: SearchCategory[] = [
    "bible",
    "plans",
    "devotions",
    "library",
    "site",
  ];
  out.sort(
    (a, b) => order.indexOf(a.category) - order.indexOf(b.category)
  );

  return out.slice(0, 45);
}

export function categoryLabel(
  category: SearchCategory,
  t: (key: string) => string
): string {
  switch (category) {
    case "bible":
      return t("search.category.bible");
    case "plans":
      return t("search.category.plans");
    case "devotions":
      return t("search.category.devotions");
    case "library":
      return t("search.category.library");
    case "site":
      return t("search.category.site");
    default:
      return category;
  }
}
