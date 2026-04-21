
"use client";

import React from 'react';
import Image from 'next/image';
import { Navbar } from '@/components/navigation/navbar';
import { Footer } from '@/components/footer/footer';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Heart, 
  Share2, 
  Play, 
  Pause, 
  RotateCcw, 
  RotateCw, 
  Download, 
  Settings, 
  MoreVertical,
  Bookmark,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useI18n } from '@/components/providers/i18n-provider';
import { useToast } from '@/hooks/use-toast';
import { applyNarratorSettings, runSpeechWhenReady } from '@/lib/speech';
import { DEVOTIONAL_CATALOG } from '@/lib/devotional-catalog';

const WORDS_PER_MINUTE = 150;
const SKIP_SECONDS = 15;
const SAVED_DEVOTIONS_STORAGE_KEY = 'sacred-library:saved-devotions';
const CURRENT_DEVOTIONAL_ID = 'morning-gratitude';
const DEVOTIONS_AUDIO_RATE_STORAGE_KEY = 'sacred-library:devotions-audio-rate';
const AUDIO_RATE_OPTIONS = [0.9, 1, 1.1] as const;

function pickDevotionalImage(devotionalId: string) {
  if (PlaceHolderImages.length === 0) return null;
  const hash = devotionalId.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return PlaceHolderImages[hash % PlaceHolderImages.length];
}

function formatMMSS(totalSeconds: number): string {
  const s = Math.max(0, Math.floor(totalSeconds));
  const mm = Math.floor(s / 60)
    .toString()
    .padStart(2, "0");
  const ss = (s % 60).toString().padStart(2, "0");
  return `${mm}:${ss}`;
}

export default function DevotionsPage() {
  const { t, lang } = useI18n();
  const { toast } = useToast();
  const [selectedDevotionalId, setSelectedDevotionalId] = React.useState<string | null>(null);
  const [isSaved, setIsSaved] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [audioRate, setAudioRate] = React.useState<number>(1);
  const [audioSettingsOpen, setAudioSettingsOpen] = React.useState(false);
  const [elapsedSec, setElapsedSec] = React.useState(0);
  const catalogScrollRef = React.useRef<HTMLDivElement | null>(null);
  const defaultHeroImage = PlaceHolderImages.find(img => img.id === 'psalms-hero');
  const selectedDevotional = React.useMemo(
    () =>
      selectedDevotionalId
        ? DEVOTIONAL_CATALOG.find((d) => d.id === selectedDevotionalId) ?? null
        : null,
    [selectedDevotionalId]
  );
  const currentDevotionalId = selectedDevotional?.id ?? CURRENT_DEVOTIONAL_ID;
  const heroImage =
    (selectedDevotional ? pickDevotionalImage(selectedDevotional.id) : null) ||
    defaultHeroImage ||
    null;
  const mainTitle = selectedDevotional?.title[lang] ?? t('devotions.title');
  const mainAuthor = selectedDevotional?.author ?? t('devotions.author');
  const mainDateOrMeta = selectedDevotional
    ? `${selectedDevotional.tradition[lang]} · ${selectedDevotional.scripture}`
    : t('devotions.date');
  const mainParagraph1 =
    selectedDevotional?.summary[lang] ?? t('devotions.paragraph1');
  const mainParagraph2 = selectedDevotional
    ? lang === 'es'
      ? `Hoy medita en ${selectedDevotional.scripture}. Permite que esta verdad transforme tu manera de pensar y de vivir.`
      : `Today meditate on ${selectedDevotional.scripture}. Let this truth reshape how you think and how you live.`
    : t('devotions.paragraph2');
  const mainVerseQuote = selectedDevotional
    ? `“${selectedDevotional.summary[lang]}”`
    : t('devotions.verseQuote');
  const mainVerseReference =
    selectedDevotional?.scripture ?? t('devotions.verseReference');
  const mainParagraph3 = selectedDevotional
    ? lang === 'es'
      ? `Ora y responde en obediencia. Dios sigue hablando con poder por medio de su Palabra.`
      : `Pray and respond in obedience. God still speaks powerfully through His Word.`
    : t('devotions.paragraph3');

  // Build the full devotional text from the translated parts.
  const fullText = React.useMemo(() => {
    return [
      mainTitle,
      mainParagraph1,
      mainParagraph2,
      mainVerseQuote,
      mainVerseReference,
      mainParagraph3,
    ].join('. ');
  }, [mainParagraph1, mainParagraph2, mainParagraph3, mainTitle, mainVerseQuote, mainVerseReference]);

  const totalSec = React.useMemo(() => {
    const words = fullText.split(/\s+/).filter(Boolean).length;
    return Math.max(30, Math.round((words / WORDS_PER_MINUTE) * 60));
  }, [fullText]);

  const timerRef = React.useRef<ReturnType<typeof setInterval> | null>(null);
  const utteranceRef = React.useRef<SpeechSynthesisUtterance | null>(null);

  const clearTimer = React.useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const stopSpeech = React.useCallback(() => {
    if (typeof window === 'undefined') return;
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    clearTimer();
    setIsPlaying(false);
  }, [clearTimer]);

  const speechLang = lang === 'es' ? 'es-ES' : 'en-US';

  const startSpeech = React.useCallback(
    (fromSec: number = 0) => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
        toast({
          title: t('devotions.audioUnavailable'),
          description: t('devotions.audioUnavailableDesc'),
          variant: 'destructive',
        });
        return;
      }
      window.speechSynthesis.cancel();

      // If starting from an offset, clip the text roughly by seconds.
      let textToSpeak = fullText;
      if (fromSec > 0 && fromSec < totalSec) {
        const ratio = fromSec / totalSec;
        const startChar = Math.floor(fullText.length * ratio);
        textToSpeak = fullText.slice(startChar);
      }

      if (!textToSpeak.trim()) {
        toast({
          title: t('devotions.audioUnavailable'),
          description: t('devotions.audioUnavailableDesc'),
          variant: 'destructive',
        });
        return;
      }

      runSpeechWhenReady(() => {
        window.speechSynthesis.resume();

        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.lang = speechLang;
        applyNarratorSettings(utterance);
        utterance.rate = Math.min(1.6, Math.max(0.7, audioRate));
        utterance.onend = () => {
          clearTimer();
          setIsPlaying(false);
          setElapsedSec(0);
        };
        utterance.onerror = (e) => {
          clearTimer();
          setIsPlaying(false);
          if (e.error !== 'canceled' && e.error !== 'interrupted') {
            toast({
              title: t('devotions.audioError'),
              variant: 'destructive',
            });
          }
        };

        utteranceRef.current = utterance;
        window.speechSynthesis.speak(utterance);

        setIsPlaying(true);
        setElapsedSec(fromSec);
        clearTimer();
        timerRef.current = setInterval(() => {
          setElapsedSec((prev) => {
            if (prev + 1 >= totalSec) {
              return totalSec;
            }
            return prev + 1;
          });
        }, 1000);
      });
    },
    [audioRate, clearTimer, fullText, speechLang, t, toast, totalSec]
  );

  const handlePlayToggle = React.useCallback(() => {
    if (isPlaying) {
      stopSpeech();
    } else {
      startSpeech(elapsedSec >= totalSec ? 0 : elapsedSec);
    }
  }, [elapsedSec, isPlaying, startSpeech, stopSpeech, totalSec]);

  const handleSkipBack = React.useCallback(() => {
    const next = Math.max(0, elapsedSec - SKIP_SECONDS);
    if (isPlaying) {
      startSpeech(next);
    } else {
      setElapsedSec(next);
    }
  }, [elapsedSec, isPlaying, startSpeech]);

  const handleSkipForward = React.useCallback(() => {
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
  }, [elapsedSec, isPlaying, startSpeech, stopSpeech, totalSec]);

  const handleSliderChange = React.useCallback(
    (values: number[]) => {
      const pct = values[0] ?? 0;
      const next = Math.round((pct / 100) * totalSec);
      if (isPlaying) {
        startSpeech(next);
      } else {
        setElapsedSec(next);
      }
    },
    [isPlaying, startSpeech, totalSec]
  );

  React.useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    // Force voice list to load (some browsers load them async).
    window.speechSynthesis.getVoices();
    const handler = () => window.speechSynthesis.getVoices();
    window.speechSynthesis.addEventListener?.('voiceschanged', handler);
    return () => {
      window.speechSynthesis.removeEventListener?.(
        'voiceschanged',
        handler
      );
      window.speechSynthesis.cancel();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const raw = window.localStorage.getItem(DEVOTIONS_AUDIO_RATE_STORAGE_KEY);
      const n = raw ? Number(raw) : NaN;
      if (!Number.isNaN(n) && AUDIO_RATE_OPTIONS.includes(n as 0.9 | 1 | 1.1)) {
        setAudioRate(n);
      }
    } catch {
      /* ignore */
    }
  }, []);

  React.useEffect(() => {
    if (isPlaying) {
      stopSpeech();
    }
  }, [lang]); // eslint-disable-line react-hooks/exhaustive-deps

  const progressPercent = totalSec > 0 ? (elapsedSec / totalSec) * 100 : 0;

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const raw = window.localStorage.getItem(SAVED_DEVOTIONS_STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return;
      setIsSaved(parsed.includes(currentDevotionalId));
    } catch {
      /* ignore */
    }
  }, [currentDevotionalId]);

  const handleSaveToLibrary = React.useCallback(() => {
    if (typeof window === 'undefined') return;
    try {
      const raw = window.localStorage.getItem(SAVED_DEVOTIONS_STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      const list = Array.isArray(parsed)
        ? parsed.filter((v) => typeof v === 'string')
        : [];

      const nextSet = new Set<string>(list);
      let nextSaved = false;
      if (nextSet.has(currentDevotionalId)) {
        nextSet.delete(currentDevotionalId);
        nextSaved = false;
      } else {
        nextSet.add(currentDevotionalId);
        nextSaved = true;
      }

      window.localStorage.setItem(
        SAVED_DEVOTIONS_STORAGE_KEY,
        JSON.stringify(Array.from(nextSet))
      );
      setIsSaved(nextSaved);
      toast({
        title: nextSaved
          ? t('devotions.savedTitle')
          : t('devotions.unsavedTitle'),
        description: t('devotions.savedDescription'),
      });
    } catch {
      toast({
        variant: 'destructive',
        title: t('devotions.saveErrorTitle'),
        description: t('devotions.saveErrorDescription'),
      });
    }
  }, [currentDevotionalId, t, toast]);

  const handleShareDevotional = React.useCallback(async () => {
    const url =
      typeof window !== 'undefined' ? window.location.href : '/devotions';
    const shareData = {
      title: mainTitle,
      text: `${mainTitle} — ${mainVerseReference}`,
      url,
    };
    try {
      if (
        typeof navigator !== 'undefined' &&
        typeof navigator.share === 'function'
      ) {
        await navigator.share(shareData);
        return;
      }
      if (
        typeof navigator !== 'undefined' &&
        navigator.clipboard?.writeText
      ) {
        await navigator.clipboard.writeText(url);
        toast({
          title: t('devotions.shareCopiedTitle'),
          description: t('devotions.shareCopiedDescription'),
        });
        return;
      }
      throw new Error('Share not available');
    } catch (err) {
      if ((err as Error)?.name === 'AbortError') return;
      toast({
        variant: 'destructive',
        title: t('devotions.shareErrorTitle'),
        description: t('devotions.shareErrorDescription'),
      });
    }
  }, [mainTitle, mainVerseReference, t, toast]);

  const handleDownloadDevotional = React.useCallback(() => {
    if (typeof window === 'undefined') return;
    (async () => {
      try {
        const text = [
          mainTitle,
          `${t('devotions.byLabel')} ${mainAuthor}`,
          mainParagraph1,
          mainParagraph2,
          `${mainVerseQuote} (${mainVerseReference})`,
          mainParagraph3,
        ].join('. ');

        const res = await fetch('/api/devotions-tts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text,
            lang: lang === 'es' ? 'es' : 'en',
            title: mainTitle || currentDevotionalId,
          }),
        });
        if (!res.ok) throw new Error('tts_request_failed');

        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${currentDevotionalId}-${lang}.mp3`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        toast({
          title: t('devotions.downloadTitle'),
          description: t('devotions.downloadDescription'),
        });
      } catch {
        toast({
          variant: 'destructive',
          title: t('devotions.downloadErrorTitle'),
          description: t('devotions.downloadErrorDescription'),
        });
      }
    })();
  }, [currentDevotionalId, lang, mainAuthor, mainParagraph1, mainParagraph2, mainParagraph3, mainTitle, mainVerseQuote, mainVerseReference, t, toast]);

  const handleSelectAudioRate = React.useCallback((next: number) => {
    setAudioRate(next);
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(
          DEVOTIONS_AUDIO_RATE_STORAGE_KEY,
          String(next),
        );
      } catch {
        /* ignore */
      }
    }
    toast({
      title: t('devotions.speedTitle'),
      description: `${t('devotions.speedLabel')} ${next.toFixed(1)}x`,
    });
  }, [t, toast]);

  const handleRestartAudio = React.useCallback(() => {
    setElapsedSec(0);
    if (isPlaying) startSpeech(0);
  }, [isPlaying, startSpeech]);

  const handleCopyText = React.useCallback(async () => {
    try {
      if (typeof navigator === 'undefined' || !navigator.clipboard?.writeText) {
        throw new Error('clipboard_unavailable');
      }
      await navigator.clipboard.writeText(fullText);
      toast({
        title: t('devotions.copyTextTitle'),
        description: t('devotions.copyTextDescription'),
      });
    } catch {
      toast({
        variant: 'destructive',
        title: t('devotions.copyTextErrorTitle'),
        description: t('devotions.copyTextErrorDescription'),
      });
    }
  }, [fullText, t, toast]);

  const scrollCatalogBy = React.useCallback((direction: 'left' | 'right') => {
    const container = catalogScrollRef.current;
    if (!container) return;
    const delta = Math.max(280, Math.floor(container.clientWidth * 0.75));
    container.scrollBy({
      left: direction === 'left' ? -delta : delta,
      behavior: 'smooth',
    });
  }, []);

  const catalogBadge = React.useCallback(
    (index: number) => {
      if (index % 3 === 0) return t('devotions.badgeFeatured');
      if (index % 3 === 1) return t('devotions.badgeNew');
      return t('devotions.badgePopular');
    },
    [t]
  );

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 pb-32">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-6 pt-32 pb-24">
        <section className="mb-14 space-y-6">
          <div className="space-y-2">
            <h2 className="text-4xl font-headline font-bold text-slate-900 dark:text-slate-100">
              {t('devotions.catalogTitle')}
            </h2>
          </div>
          <div className="relative">
            <button
              type="button"
              onClick={() => scrollCatalogBy('left')}
              aria-label={t('devotions.catalogLeft')}
              title={t('devotions.catalogLeft')}
              className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-300 hover:text-blue-600 shadow"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div
              ref={catalogScrollRef}
              className="overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <div className="flex gap-5 min-w-max px-1">
                {DEVOTIONAL_CATALOG.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedDevotionalId(item.id)}
                    className={`w-[310px] shrink-0 rounded-[2rem] border bg-white dark:bg-slate-900 p-6 shadow-sm text-left transition-colors ${
                      selectedDevotionalId === item.id
                        ? 'border-blue-500 ring-2 ring-blue-200 dark:ring-blue-900'
                        : 'border-slate-100 dark:border-slate-800 hover:border-blue-300'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-5">
                      <p className="text-[11px] uppercase tracking-[0.22em] font-bold text-blue-600 dark:text-blue-400">
                        {catalogBadge(index)}
                      </p>
                      <Bookmark className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                    </div>
                    <h3 className="text-[2rem] leading-tight font-headline font-bold text-slate-900 dark:text-slate-100 mb-2">
                      {item.title[lang]}
                    </h3>
                    <p className="text-xl font-semibold text-slate-600 dark:text-slate-300">
                      {item.author}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => scrollCatalogBy('right')}
              aria-label={t('devotions.catalogRight')}
              title={t('devotions.catalogRight')}
              className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-300 hover:text-blue-600 shadow"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </section>

        {/* Header section */}
        <header className="text-center space-y-4 mb-12">
          <span className="text-[10px] font-bold tracking-[0.3em] text-blue-600 uppercase">
            {t('devotions.dailyLabel')}
          </span>
          <h1 className="text-5xl md:text-6xl font-headline font-bold text-slate-900 dark:text-slate-100 leading-tight">
            {mainTitle}
          </h1>
          <p className="text-sm font-headline italic text-slate-400 dark:text-slate-500">
            {t('devotions.byLabel')} {mainAuthor} · {mainDateOrMeta}
          </p>
        </header>

        {/* Hero Image */}
        <div className="relative h-[450px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl mb-20">
          {heroImage?.imageUrl && (
            <Image
              src={heroImage.imageUrl}
              alt="Misty Forest"
              fill
              className="object-cover"
              priority
              data-ai-hint={heroImage.imageHint || "misty forest"}
            />
          )}
        </div>

        {/* Content Body */}
        <div className="max-w-2xl mx-auto space-y-12">
          {(() => {
            const p1 = mainParagraph1;
            const firstChar = p1.charAt(0);
            const rest = p1.slice(1);
            return (
              <div className="text-lg leading-relaxed text-slate-700 dark:text-slate-300 font-body">
                <p className="relative">
                  <span className="float-left text-7xl font-headline font-bold text-blue-600 mr-4 mt-2 leading-[0.8]">
                    {firstChar}
                  </span>
                  {rest}
                </p>
              </div>
            );
          })()}

          <div className="text-lg leading-relaxed text-slate-700 dark:text-slate-300 font-body">
            <p>{mainParagraph2}</p>
          </div>

          {/* Styled Scripture Box */}
          <div className="my-16 p-12 bg-blue-50/50 dark:bg-blue-500/10 rounded-[3rem] relative overflow-hidden">
            <blockquote className="space-y-6">
              <p className="text-2xl font-headline italic text-slate-800 dark:text-slate-200 leading-relaxed text-center">
                {mainVerseQuote}
              </p>
              <cite className="block text-center text-xs font-bold tracking-widest text-blue-600 dark:text-blue-400 not-italic uppercase">
                {mainVerseReference}
              </cite>
            </blockquote>
          </div>

          <div className="text-lg leading-relaxed text-slate-700 dark:text-slate-300 font-body">
            <p>{mainParagraph3}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 py-8 border-b border-slate-100 dark:border-slate-800">
            <Button
              type="button"
              variant="secondary"
              onClick={handleSaveToLibrary}
              className={`rounded-full px-8 py-6 h-auto text-xs font-bold gap-2 transition-colors ${
                isSaved
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
              {isSaved ? t('devotions.savedToLibrary') : t('devotions.saveToLibrary')}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={handleShareDevotional}
              className="bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full px-8 py-6 h-auto text-xs font-bold gap-2"
            >
              <Share2 className="w-4 h-4" />
              {t('devotions.share')}
            </Button>
          </div>

        </div>
      </main>

      <Footer />

      {/* Sticky Bottom Audio Player */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 h-24 px-8 flex items-center justify-between shadow-[0_-8px_30px_rgb(0,0,0,0.04)]">
        <div className="flex items-center gap-4 w-1/4">
          <div className="relative w-12 h-12 rounded-full overflow-hidden">
            {heroImage?.imageUrl && <Image src={heroImage.imageUrl} alt="Devotion" fill className="object-cover" />}
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 leading-tight">
              {mainTitle}
            </h4>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
              {t('devotions.narratedBy')} {mainAuthor}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 flex-1 max-w-xl">
          <div className="flex items-center gap-8">
            <button
              type="button"
              onClick={handleSkipBack}
              aria-label={t('devotions.skipBack')}
              title={t('devotions.skipBack')}
              className="text-slate-400 dark:text-slate-500 hover:text-blue-600 transition-colors"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handlePlayToggle}
              aria-label={isPlaying ? t('devotions.pause') : t('devotions.play')}
              title={isPlaying ? t('devotions.pause') : t('devotions.play')}
              className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-200 hover:scale-105 transition-all"
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
            </button>
            <button
              type="button"
              onClick={handleSkipForward}
              aria-label={t('devotions.skipForward')}
              title={t('devotions.skipForward')}
              className="text-slate-400 dark:text-slate-500 hover:text-blue-600 transition-colors"
            >
              <RotateCw className="w-5 h-5" />
            </button>
          </div>

          <div className="w-full flex items-center gap-4">
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 tabular-nums w-10">
              {formatMMSS(elapsedSec)}
            </span>
            <Slider
              value={[progressPercent]}
              onValueChange={handleSliderChange}
              max={100}
              step={1}
              className="flex-1"
            />
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 tabular-nums w-10 text-right">
              {formatMMSS(totalSec)}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-end gap-6 w-1/4">
          <button
            type="button"
            onClick={handleDownloadDevotional}
            aria-label={t('devotions.download')}
            title={t('devotions.download')}
            className="text-slate-400 dark:text-slate-500 hover:text-blue-600 transition-colors"
          >
            <Download className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setAudioSettingsOpen(true)}
            aria-label={t('devotions.audioSettings')}
            title={`${t('devotions.audioSettings')} (${audioRate.toFixed(1)}x)`}
            className="text-slate-400 dark:text-slate-500 hover:text-blue-600 transition-colors"
          >
            <Settings className="w-4 h-4" />
          </button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                aria-label={t('devotions.moreOptions')}
                title={t('devotions.moreOptions')}
                className="text-slate-400 dark:text-slate-500 hover:text-blue-600 transition-colors"
              >
                <MoreVertical className="w-4 h-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleRestartAudio}>
                {t('devotions.restartAudio')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleCopyText}>
                {t('devotions.copyText')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                {t('devotions.scrollTop')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Dialog open={audioSettingsOpen} onOpenChange={setAudioSettingsOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>{t('devotions.audioSettings')}</DialogTitle>
            <DialogDescription>
              {t('devotions.speedDialogDescription')}
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-3 gap-2">
            {AUDIO_RATE_OPTIONS.map((rate) => {
              const active = audioRate === rate;
              return (
                <Button
                  key={rate}
                  type="button"
                  variant={active ? 'default' : 'outline'}
                  className={active ? 'bg-blue-600 hover:bg-blue-700 text-white' : ''}
                  onClick={() => {
                    handleSelectAudioRate(rate);
                    setAudioSettingsOpen(false);
                  }}
                >
                  {rate.toFixed(1)}x
                </Button>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
