
"use client";

import React from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Navbar } from '@/components/navigation/navbar';
import { Footer } from '@/components/footer/footer';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, Circle, ArrowLeft, Play } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useI18n } from '@/components/providers/i18n-provider';
import Link from 'next/link';
import {
  getPlanReadings,
  formatReadingReference,
  type PlanReading,
} from '@/lib/plan-readings';

const PROGRESS_STORAGE_KEY = "sacred-library:plan-progress";
const SAVED_PLANS_STORAGE_KEY = "sacred-library:saved-plans";
const PARTICIPANTS_STORAGE_KEY = "sacred-library:plan-participants";

type PlanProgressState = Record<string, number>;
type PlanParticipantsState = Record<string, number>;

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

function readParticipants(): PlanParticipantsState {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(PARTICIPANTS_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object") return parsed;
    return {};
  } catch {
    return {};
  }
}

function isPlanSaved(planId: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = window.localStorage.getItem(SAVED_PLANS_STORAGE_KEY);
    if (!raw) return false;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.includes(planId);
  } catch {
    return false;
  }
}

// Deterministic base participants per plan (looks organic, stable across reloads)
function basePlanParticipants(planId: string): number {
  let hash = 0;
  for (let i = 0; i < planId.length; i++) {
    hash = (hash * 33 + planId.charCodeAt(i)) >>> 0;
  }
  // 800 — 18000
  return 800 + (hash % 17200);
}

function formatParticipantsCount(n: number): string {
  if (n >= 10000) return `${Math.floor(n / 1000)}k`;
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  return String(n);
}

export default function PlanDetailPage() {
  const params = useParams();
  const planId = Array.isArray(params?.id) ? params.id[0] : (params?.id as string);
  const { t, lang } = useI18n();

  const heroImage = PlaceHolderImages.find(img => img.id === 'plan-mountains');

  const readings: PlanReading[] = React.useMemo(
    () => getPlanReadings(planId),
    [planId]
  );

  const totalDays = readings.length;

  const [currentDay, setCurrentDay] = React.useState<number>(1);

  React.useEffect(() => {
    const store = readProgress();
    const saved = store[planId];
    if (typeof saved === "number" && saved >= 1 && saved <= totalDays) {
      setCurrentDay(saved);
    } else {
      setCurrentDay(1);
    }
  }, [planId, totalDays]);

  const [participants, setParticipants] = React.useState<number>(() =>
    basePlanParticipants(planId)
  );

  const computeParticipants = React.useCallback(() => {
    const store = readParticipants();
    const base = basePlanParticipants(planId);
    const delta = typeof store[planId] === "number" ? store[planId] : 0;
    setParticipants(base + Math.max(delta, 0));
  }, [planId]);

  React.useEffect(() => {
    computeParticipants();
    if (typeof window === "undefined") return;
    const handleStorage = (e: StorageEvent) => {
      if (e.key === PARTICIPANTS_STORAGE_KEY) computeParticipants();
    };
    const handleCustom = () => computeParticipants();
    window.addEventListener("storage", handleStorage);
    window.addEventListener(
      "sacred-library:participants-changed",
      handleCustom as EventListener
    );
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener(
        "sacred-library:participants-changed",
        handleCustom as EventListener
      );
    };
  }, [computeParticipants]);

  const resetProgress = () => {
    setCurrentDay(1);
    if (typeof window === "undefined") return;
    try {
      const store = readProgress();
      delete store[planId];
      window.localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(store));
    } catch {
      /* ignore */
    }
  };

  const progress = totalDays === 0
    ? 0
    : Math.min(100, Math.round(((currentDay - 1) / totalDays) * 100));

  const planData = {
    title: t(`plans.${planId}.title`),
    description: t(`plans.${planId}.desc`),
    progress,
    currentDay: Math.min(currentDay, totalDays || 1),
    totalDays,
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-24">
        <Link href="/plans" className="inline-flex items-center text-sm font-bold text-slate-400 dark:text-slate-500 hover:text-blue-600 transition-colors mb-12">
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t('plans.backToPlans')}
        </Link>

        <div className="grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8 space-y-12">
            <header className="space-y-8">
              <div className="relative h-[400px] w-full rounded-[3.5rem] overflow-hidden shadow-2xl">
                {heroImage && (
                  <Image
                    src={heroImage.imageUrl}
                    alt={planData.title}
                    fill
                    className="object-cover"
                    priority
                  />
                )}
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute bottom-12 left-12 right-12 text-white space-y-4">
                  <h1 className="text-5xl md:text-7xl font-headline font-bold leading-tight">
                    {planData.title}
                  </h1>
                  <p className="text-lg opacity-80 max-w-xl font-medium">
                    {planData.description}
                  </p>
                </div>
              </div>

              <div className="bg-slate-50/50 dark:bg-slate-900/40 rounded-[2.5rem] p-10 space-y-6">
                <div className="flex justify-between items-end">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                      {t('plans.yourProgress')}
                    </p>
                    <h3 className="text-3xl font-headline font-bold text-slate-900 dark:text-slate-100">
                      {t('plans.day')} {planData.currentDay} {t('plans.of')} {planData.totalDays}
                    </h3>
                  </div>
                  <span className="text-2xl font-headline font-bold text-blue-600">{planData.progress}%</span>
                </div>
                <Progress value={planData.progress} className="h-3 bg-white dark:bg-slate-900 shadow-inner" />
              </div>
            </header>

            <section className="space-y-8">
              <h2 className="text-3xl font-headline font-bold text-slate-900 dark:text-slate-100">
                {t('plans.dailyJourney')}
              </h2>

              {readings.length === 0 ? (
                <div className="rounded-2xl border border-amber-100 bg-amber-50/60 dark:bg-amber-500/10 dark:border-amber-900 px-6 py-5 text-sm text-amber-900 dark:text-amber-200">
                  {t('plans.notFound')}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {readings.map((reading) => {
                    const isCompleted = reading.number < currentDay;
                    const isActive = reading.number === currentDay;
                    const reference = formatReadingReference(reading, lang);
                    const topic = reading.topic?.[lang] ?? reading.topic?.en;

                    return (
                      <Link
                        key={reading.number}
                        href={`/plans/${planId}/day/${reading.number}`}
                        className={`flex items-center gap-4 p-5 rounded-2xl border transition-all group hover:shadow-md ${
                          isActive
                            ? "bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/40 shadow-lg shadow-blue-100/50 ring-1 ring-blue-300 dark:ring-blue-500/40"
                            : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-500/40"
                        }`}
                      >
                        <div className="shrink-0">
                          {isCompleted ? (
                            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
                              <CheckCircle2 className="w-6 h-6" />
                            </div>
                          ) : isActive ? (
                            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
                              <Play className="w-4 h-4 fill-current ml-0.5" />
                            </div>
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 text-sm font-bold">
                              {reading.number}
                            </div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline gap-2">
                            <span
                              className={`text-[11px] font-bold uppercase tracking-widest ${
                                isCompleted
                                  ? "text-slate-400 dark:text-slate-500"
                                  : isActive
                                  ? "text-blue-600 dark:text-blue-400"
                                  : "text-slate-400 dark:text-slate-500"
                              }`}
                            >
                              {t('plans.day')} {reading.number}
                            </span>
                          </div>
                          <h4
                            className={`font-bold truncate text-base ${
                              isCompleted
                                ? "text-slate-400 dark:text-slate-500 line-through"
                                : "text-slate-900 dark:text-slate-100"
                            }`}
                          >
                            {topic ?? reference}
                          </h4>
                          {topic && (
                            <p
                              className={`text-xs mt-0.5 font-medium ${
                                isCompleted
                                  ? "text-slate-400 dark:text-slate-500"
                                  : "text-slate-500 dark:text-slate-400"
                              }`}
                            >
                              {reference}
                            </p>
                          )}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </section>
          </div>

          <aside className="lg:col-span-4 space-y-10">
            <div className="bg-slate-900 rounded-[3rem] p-10 text-white space-y-8">
              <div className="space-y-4">
                <h3 className="text-2xl font-headline font-bold">{t('plans.about')}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {t('plans.aboutDesc')}
                </p>
              </div>

              <div className="space-y-6 pt-6 border-t border-white/10">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t('plans.duration')}</span>
                  <span className="font-bold">{planData.totalDays} {t('plans.days')}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t('plans.category')}</span>
                  <span className="font-bold">{t('plans.bibleStudy')}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t('plans.participants')}</span>
                  <span className="font-bold">
                    {formatParticipantsCount(participants)} {t('plans.active')}
                  </span>
                </div>
              </div>

              <Button
                onClick={resetProgress}
                className="w-full rounded-full h-12 font-bold text-xs bg-white/10 hover:bg-white/20 text-white border border-white/20 shadow-none"
              >
                {t('plans.resetProgress')}
              </Button>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
