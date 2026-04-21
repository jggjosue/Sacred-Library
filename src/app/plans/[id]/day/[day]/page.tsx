
"use client";

import React from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/footer/footer";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  ArrowLeft,
  CheckCircle2,
  Check,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  Search,
  Play,
  Pause,
  RotateCcw,
  RotateCw,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { useI18n } from "@/components/providers/i18n-provider";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import {
  getPlanReadings,
  formatReadingReference,
  BOOK_USFM,
  parseVerseRange,
  type PlanReading,
} from "@/lib/plan-readings";
import {
  LOCAL_VERSIONS,
  isLocalVersionId,
  fetchLocalChapter,
} from "@/lib/bible-local";
import { applyNarratorSettings } from "@/lib/speech";

const PROGRESS_STORAGE_KEY = "sacred-library:plan-progress";
const READER_VERSION_STORAGE_KEY = "sacred-library:reader-version";
const DEFAULT_VERSION_ID = "local:es_rvr_1960";
const DEFAULT_VERSION_BY_LANG: Record<"en" | "es", string> = {
  en: "local:en_kjv",
  es: "local:es_rvr_1960",
};

type PlanProgressState = Record<string, number>;

function readProgress(): PlanProgressState {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(PROGRESS_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object") return parsed;
    return {};
  } catch {
    return {};
  }
}

function writeProgress(state: PlanProgressState) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* ignore */
  }
}

type ChapterVerse = {
  verse: number;
  text: string;
};

export default function PlanDayPage() {
  const params = useParams();
  const router = useRouter();
  const { t, lang } = useI18n();
  const { toast } = useToast();

  const planId = Array.isArray(params?.id) ? params.id[0] : (params?.id as string);
  const dayParam = Array.isArray(params?.day)
    ? params.day[0]
    : (params?.day as string);
  const dayNumber = Number(dayParam);

  const readings = React.useMemo<PlanReading[]>(
    () => getPlanReadings(planId),
    [planId]
  );
  const totalDays = readings.length;

  const reading = readings.find((r) => r.number === dayNumber);
  const reference = reading ? formatReadingReference(reading, lang) : "";
  const topic = reading?.topic?.[lang] ?? reading?.topic?.en;

  const [versionId, setVersionId] = React.useState<string>(DEFAULT_VERSION_ID);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = window.localStorage.getItem(READER_VERSION_STORAGE_KEY);
      if (stored && isLocalVersionId(stored)) {
        setVersionId(stored);
      }
    } catch {
      /* ignore */
    }
  }, []);

  React.useEffect(() => {
    const preferred = DEFAULT_VERSION_BY_LANG[lang];
    if (!preferred || preferred === versionId) return;
    setVersionId(preferred);
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem(READER_VERSION_STORAGE_KEY, preferred);
      } catch {
        /* ignore */
      }
    }
  }, [lang, versionId]);

  const selectedVersion = React.useMemo(
    () => LOCAL_VERSIONS.find((v) => v.id === versionId),
    [versionId]
  );

  const [versionPopoverOpen, setVersionPopoverOpen] =
    React.useState<boolean>(false);
  const [versionQuery, setVersionQuery] = React.useState<string>("");

  const changeVersion = (nextId: string) => {
    if (!isLocalVersionId(nextId) || nextId === versionId) {
      setVersionPopoverOpen(false);
      return;
    }
    setVersionId(nextId);
    setVersionPopoverOpen(false);
    setVersionQuery("");
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem(READER_VERSION_STORAGE_KEY, nextId);
      } catch {
        /* ignore */
      }
    }
  };

  const filteredVersions = React.useMemo(() => {
    const q = versionQuery.trim().toLowerCase();
    if (!q) return LOCAL_VERSIONS;
    return LOCAL_VERSIONS.filter((v) => {
      return [v.title, v.abbreviation, v.language, v.languageCode]
        .filter(Boolean)
        .some((field) => field!.toLowerCase().includes(q));
    });
  }, [versionQuery]);

  const versionsByLanguage = React.useMemo(() => {
    const groups: Record<string, typeof LOCAL_VERSIONS> = {};
    for (const v of filteredVersions) {
      const key = v.language || "Other";
      if (!groups[key]) groups[key] = [];
      groups[key].push(v);
    }
    return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b));
  }, [filteredVersions]);

  const [verses, setVerses] = React.useState<ChapterVerse[]>([]);
  const [chapterHeading, setChapterHeading] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!reading) {
      setLoading(false);
      return;
    }
    const usfm = BOOK_USFM[reading.book];
    if (!usfm) {
      setLoading(false);
      setError("missing_usfm");
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    fetchLocalChapter(versionId, usfm, reading.chapter)
      .then((res) => {
        if (cancelled) return;
        const parsed: ChapterVerse[] = res.data
          .map((d) => ({ verse: Number(d.verse), text: d.text }))
          .filter((v) => Number.isFinite(v.verse));
        setVerses(parsed);

        const firstVerse = parseVerseRange(reading.verses)?.start;
        const heading =
          firstVerse && res.headings?.[firstVerse]
            ? res.headings[firstVerse]
            : null;
        setChapterHeading(heading);
      })
      .catch(() => {
        if (cancelled) return;
        setVerses([]);
        setError("load_error");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [reading, versionId]);

  const range = parseVerseRange(reading?.verses);
  const filteredVerses = React.useMemo(() => {
    if (!range) return verses;
    return verses.filter((v) => v.verse >= range.start && v.verse <= range.end);
  }, [verses, range]);

  /* ----------------------- Audio playback ----------------------- */

  const WORDS_PER_MINUTE = 150;
  const SKIP_SECONDS = 15;

  const [isPlaying, setIsPlaying] = React.useState<boolean>(false);
  const [elapsedSec, setElapsedSec] = React.useState<number>(0);

  const audioText = React.useMemo(() => {
    if (filteredVerses.length === 0) return "";
    const intro = topic
      ? `${topic}. ${reference}. `
      : `${reference}. `;
    return (
      intro +
      filteredVerses
        .map((v) => `${v.verse}. ${v.text}`)
        .join(" ")
    );
  }, [filteredVerses, reference, topic]);

  const totalSec = React.useMemo(() => {
    const words = audioText.split(/\s+/).filter(Boolean).length;
    return Math.max(10, Math.round((words / WORDS_PER_MINUTE) * 60));
  }, [audioText]);

  const speechLang = React.useMemo(() => {
    const code = selectedVersion?.languageCode?.toLowerCase();
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
      fin: "fi-FI",
      nld: "nl-NL",
      ron: "ro-RO",
      ell: "el-GR",
      ara: "ar-SA",
    };
    if (code && map[code]) return map[code];
    return lang === "es" ? "es-ES" : "en-US";
  }, [selectedVersion, lang]);

  const timerRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimer = React.useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const stopSpeech = React.useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    clearTimer();
    setIsPlaying(false);
  }, [clearTimer]);

  const startSpeech = React.useCallback(
    (fromSec: number = 0) => {
      if (typeof window === "undefined" || !("speechSynthesis" in window)) {
        toast({
          title: t("devotions.audioUnavailable"),
          description: t("devotions.audioUnavailableDesc"),
          variant: "destructive",
        });
        return;
      }
      if (!audioText) return;

      window.speechSynthesis.cancel();

      let textToSpeak = audioText;
      if (fromSec > 0 && fromSec < totalSec) {
        const ratio = fromSec / totalSec;
        const startChar = Math.floor(audioText.length * ratio);
        textToSpeak = audioText.slice(startChar);
      }

      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = speechLang;
      applyNarratorSettings(utterance);
      utterance.onend = () => {
        clearTimer();
        setIsPlaying(false);
        setElapsedSec(0);
      };
      utterance.onerror = (e) => {
        clearTimer();
        setIsPlaying(false);
        if (e.error !== "canceled" && e.error !== "interrupted") {
          toast({
            title: t("devotions.audioError"),
            variant: "destructive",
          });
        }
      };

      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
      setElapsedSec(fromSec);
      clearTimer();
      timerRef.current = setInterval(() => {
        setElapsedSec((prev) => {
          if (prev + 1 >= totalSec) return totalSec;
          return prev + 1;
        });
      }, 1000);
    },
    [audioText, clearTimer, speechLang, t, toast, totalSec]
  );

  const handlePlayToggle = () => {
    if (isPlaying) {
      stopSpeech();
    } else {
      startSpeech(elapsedSec >= totalSec ? 0 : elapsedSec);
    }
  };

  const handleSkipBack = () => {
    const next = Math.max(0, elapsedSec - SKIP_SECONDS);
    if (isPlaying) {
      startSpeech(next);
    } else {
      setElapsedSec(next);
    }
  };

  const handleSkipForward = () => {
    const next = Math.min(totalSec, elapsedSec + SKIP_SECONDS);
    if (isPlaying) {
      if (next >= totalSec) {
        stopSpeech();
        setElapsedSec(totalSec);
      } else {
        startSpeech(next);
      }
    } else {
      setElapsedSec(next);
    }
  };

  const handleSliderChange = (values: number[]) => {
    const pct = values[0] ?? 0;
    const nextSec = Math.round((pct / 100) * totalSec);
    if (isPlaying) {
      startSpeech(nextSec);
    } else {
      setElapsedSec(nextSec);
    }
  };

  // Stop audio when version, day, plan or language changes.
  React.useEffect(() => {
    stopSpeech();
    setElapsedSec(0);
  }, [versionId, dayNumber, planId, lang, stopSpeech]);

  React.useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.getVoices();
    const handler = () => window.speechSynthesis.getVoices();
    window.speechSynthesis.addEventListener?.("voiceschanged", handler);
    return () => {
      window.speechSynthesis.removeEventListener?.(
        "voiceschanged",
        handler
      );
    };
  }, []);

  React.useEffect(() => {
    return () => {
      stopSpeech();
    };
  }, [stopSpeech]);

  const progressPercent = totalSec > 0 ? (elapsedSec / totalSec) * 100 : 0;
  const formatMMSS = (n: number) => {
    const s = Math.max(0, Math.floor(n));
    const mm = Math.floor(s / 60).toString().padStart(2, "0");
    const ss = (s % 60).toString().padStart(2, "0");
    return `${mm}:${ss}`;
  };

  const [progress, setProgress] = React.useState<number>(1);

  React.useEffect(() => {
    const store = readProgress();
    const saved = store[planId];
    setProgress(typeof saved === "number" ? saved : 1);
  }, [planId]);

  const isAlreadyCompleted = dayNumber < progress;
  const planTitle = t(`plans.${planId}.title`);

  const markComplete = () => {
    const store = readProgress();
    const current = typeof store[planId] === "number" ? store[planId] : 1;
    const next = Math.max(current, dayNumber + 1);
    store[planId] = Math.min(next, totalDays + 1);
    writeProgress(store);
    setProgress(store[planId]);
    toast({
      title: t("plans.dayCompleted"),
      description: topic
        ? `${t("plans.day")} ${dayNumber} · ${topic}`
        : `${t("plans.day")} ${dayNumber} · ${reference}`,
    });
    if (dayNumber < totalDays) {
      router.push(`/plans/${planId}/day/${dayNumber + 1}`);
    } else {
      router.push(`/plans/${planId}`);
    }
  };

  const goToDay = (target: number) => {
    if (target < 1 || target > totalDays) return;
    router.push(`/plans/${planId}/day/${target}`);
  };

  if (!reading) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-900">
        <Navbar />
        <main className="max-w-3xl mx-auto px-6 pt-32 pb-24">
          <Link
            href={`/plans/${planId}`}
            className="inline-flex items-center text-sm font-bold text-slate-400 dark:text-slate-500 hover:text-blue-600 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t("plans.backToPlan")}
          </Link>
          <div className="rounded-2xl border border-amber-100 bg-amber-50/60 dark:bg-amber-500/10 dark:border-amber-900 px-6 py-5 text-sm text-amber-900 dark:text-amber-200">
            {t("plans.dayNotFound")}
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Navbar />

      <main className="max-w-3xl mx-auto px-6 pt-32 pb-24">
        <div className="flex items-center justify-between mb-10">
          <Link
            href={`/plans/${planId}`}
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-blue-600 transition-colors px-4 py-2 rounded-full border border-slate-100 dark:border-slate-800"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("plans.backToPlan")}
          </Link>

          <Popover
            open={versionPopoverOpen}
            onOpenChange={(open) => {
              setVersionPopoverOpen(open);
              if (!open) setVersionQuery("");
            }}
          >
            <PopoverTrigger asChild>
              <button
                type="button"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 hover:text-blue-600 px-4 py-2 rounded-full border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors"
                title={t("plans.changeVersion")}
                aria-label={t("plans.changeVersion")}
              >
                <span>{selectedVersion?.abbreviation ?? t("plans.selectVersion")}</span>
                <ChevronsUpDown className="w-3.5 h-3.5 shrink-0 text-slate-400" />
              </button>
            </PopoverTrigger>
            <PopoverContent
              align="end"
              sideOffset={8}
              className="w-[360px] p-0 rounded-2xl border-slate-100 dark:border-slate-800 shadow-xl"
            >
              <div className="relative border-b border-slate-100 dark:border-slate-800 p-2">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500 pointer-events-none" />
                <Input
                  autoFocus
                  value={versionQuery}
                  onChange={(e) => setVersionQuery(e.target.value)}
                  placeholder={t("bible.searchPlaceholder")}
                  className="h-10 pl-9 pr-3 border-none shadow-none focus-visible:ring-0 text-sm"
                />
              </div>
              <div className="max-h-80 overflow-y-auto py-2">
                {versionsByLanguage.length === 0 ? (
                  <p className="px-4 py-6 text-center text-xs font-medium text-slate-400">
                    {t("bible.noResults")}
                  </p>
                ) : (
                  versionsByLanguage.map(([lang, versions]) => (
                    <div key={lang} className="px-2 pb-1">
                      <p className="px-2 pt-2 pb-1 text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                        {lang}
                      </p>
                      {versions.map((v) => {
                        const active = v.id === versionId;
                        return (
                          <button
                            key={v.id}
                            type="button"
                            onClick={() => changeVersion(v.id)}
                            className={cn(
                              "flex items-start gap-3 w-full rounded-xl px-3 py-2 text-left text-sm transition-colors",
                              active
                                ? "bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300"
                                : "hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200"
                            )}
                          >
                            <span className="flex-1 min-w-0">
                              <span className="block font-bold truncate">
                                {v.title}
                              </span>
                              <span className="block text-[11px] font-medium text-slate-400 dark:text-slate-500 truncate">
                                {v.abbreviation}
                              </span>
                            </span>
                            {active && (
                              <Check className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  ))
                )}
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2 mb-8">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
            {t("plans.day")} {reading.number} · {planTitle}
          </p>
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-slate-900 dark:text-slate-100 leading-tight">
            {topic ?? reference}
          </h1>
          {topic && (
            <p className="text-lg text-slate-500 dark:text-slate-400 font-medium">
              {reference}
            </p>
          )}
        </div>

        <div className="bg-slate-50/60 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 rounded-3xl px-6 py-5 mb-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
              {t("plans.yourProgress")}
            </span>
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
              {Math.min(progress - 1, totalDays)}/{totalDays} ·{" "}
              {Math.min(
                100,
                Math.round(((progress - 1) / Math.max(totalDays, 1)) * 100)
              )}
              %
            </span>
          </div>
          <Progress
            value={Math.min(
              100,
              ((progress - 1) / Math.max(totalDays, 1)) * 100
            )}
            className="h-2 bg-white dark:bg-slate-900 shadow-inner"
          />
        </div>

        {/* Audio player */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl px-6 py-5 mb-10 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
              {t("plans.listenLabel")}
            </span>
            {selectedVersion?.abbreviation && (
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                {selectedVersion.abbreviation}
              </span>
            )}
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={handleSkipBack}
              disabled={loading || !!error || filteredVerses.length === 0}
              aria-label={t("devotions.skipBack")}
              title={t("devotions.skipBack")}
              className="w-10 h-10 rounded-full flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handlePlayToggle}
              disabled={loading || !!error || filteredVerses.length === 0}
              aria-label={isPlaying ? t("devotions.pause") : t("devotions.play")}
              title={isPlaying ? t("devotions.pause") : t("devotions.play")}
              className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center text-white shadow-lg shadow-blue-200 hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 fill-current" />
              ) : (
                <Play className="w-5 h-5 fill-current ml-0.5" />
              )}
            </button>
            <button
              type="button"
              onClick={handleSkipForward}
              disabled={loading || !!error || filteredVerses.length === 0}
              aria-label={t("devotions.skipForward")}
              title={t("devotions.skipForward")}
              className="w-10 h-10 rounded-full flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <RotateCw className="w-4 h-4" />
            </button>

            <div className="flex-1 flex items-center gap-3">
              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 tabular-nums w-9">
                {formatMMSS(elapsedSec)}
              </span>
              <Slider
                value={[progressPercent]}
                onValueChange={handleSliderChange}
                max={100}
                step={1}
                className="flex-1"
                disabled={loading || !!error || filteredVerses.length === 0}
              />
              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 tabular-nums w-9 text-right">
                {formatMMSS(totalSec)}
              </span>
            </div>
          </div>
        </div>

        <section className="rounded-3xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 px-8 py-10 shadow-sm mb-10 min-h-[240px]">
          {loading ? (
            <p className="text-center text-sm text-slate-400 dark:text-slate-500 py-12">
              {t("bible.loadingChapter")} {reading.chapter}…
            </p>
          ) : error ? (
            <div className="rounded-2xl border border-amber-100 bg-amber-50/60 dark:bg-amber-500/10 dark:border-amber-900 px-6 py-5 text-sm text-amber-900 dark:text-amber-200 space-y-2">
              <p className="font-bold text-base">
                {t("plans.translationInProgressTitle")}
              </p>
              <p>
                {t("plans.translationInProgressDesc")}{" "}
                <span className="font-bold">
                  {selectedVersion?.title ?? selectedVersion?.abbreviation ?? ""}
                </span>
                {". "}
                {t("plans.translationInProgressHint")}
              </p>
            </div>
          ) : filteredVerses.length === 0 ? (
            <p className="text-center text-sm text-slate-400 dark:text-slate-500 py-12">
              {t("plans.noVerses")}
            </p>
          ) : (
            <div className="space-y-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400 text-center border-b border-slate-100 dark:border-slate-800 pb-4">
                {reference}
              </p>
              {chapterHeading && (
                <h3 className="text-sm font-extrabold tracking-[0.2em] uppercase text-slate-700 dark:text-slate-200 text-center">
                  {chapterHeading}
                </h3>
              )}
              <div className="space-y-4 text-slate-700 dark:text-slate-200 text-lg leading-relaxed font-body">
                {filteredVerses.map((v) => (
                  <p key={v.verse} className="relative pl-8">
                    <span className="text-blue-600 dark:text-blue-400 text-xs font-extrabold tabular-nums absolute left-0 top-[0.45rem]">
                      {v.verse}
                    </span>
                    {v.text}
                  </p>
                ))}
              </div>
            </div>
          )}
        </section>

        <div className="flex items-center justify-center mb-6">
          <Button
            onClick={markComplete}
            disabled={loading}
            className={cn(
              "rounded-full px-10 h-14 font-bold text-sm shadow-xl transition-all inline-flex items-center gap-2",
              isAlreadyCompleted
                ? "bg-slate-500 hover:bg-slate-600 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-100 hover:scale-105"
            )}
          >
            <CheckCircle2 className="w-5 h-5" />
            {isAlreadyCompleted
              ? t("plans.alreadyDone")
              : t("plans.markDayComplete")}
          </Button>
        </div>

        <nav className="flex items-center justify-between gap-4 pt-6 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            onClick={() => goToDay(dayNumber - 1)}
            disabled={dayNumber <= 1}
            className="flex items-center gap-2 text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            {t("plans.previousDay")}
          </button>

          <button
            type="button"
            onClick={() => goToDay(dayNumber + 1)}
            disabled={dayNumber >= totalDays}
            className="flex items-center gap-2 text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            {t("plans.nextDay")}
            <ChevronRight className="w-4 h-4" />
          </button>
        </nav>
      </main>

      <Footer />
    </div>
  );
}
