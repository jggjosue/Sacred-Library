
"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/navigation/navbar';
import { Footer } from '@/components/footer/footer';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Search,
  SlidersHorizontal,
  ArrowRight,
  Bookmark,
  BookmarkCheck,
  Share2,
  X,
} from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useI18n } from '@/components/providers/i18n-provider';
import { useToast } from '@/hooks/use-toast';

const PLANS_INITIAL_COUNT = 6;
const PLANS_STEP = 4;
const SAVED_PLANS_STORAGE_KEY = 'sacred-library:saved-plans';
const PROGRESS_STORAGE_KEY = 'sacred-library:plan-progress';
const PARTICIPANTS_STORAGE_KEY = 'sacred-library:plan-participants';

type PlanCategory = 'popular' | 'new' | 'short';
type PlanTopic =
  | 'hope'
  | 'faith'
  | 'peace'
  | 'love'
  | 'healing'
  | 'anxiety'
  | 'wisdom'
  | 'prophecy'
  | 'discipleship'
  | 'easter';

const SHORT_PLAN_MAX_DAYS = 14;

const POPULAR_IDS = new Set<string>([
  'bibliaAnoClasico',
  'nt90',
  'salmos150',
  'proverbios',
  'ansiedad',
  'amor',
  'esperanza',
  'sanidad',
  'viajeJuan',
]);

const NEW_IDS = new Set<string>([
  'entradaTriunfal',
  'lunesAutoridad',
  'martesControversia',
  'miercolesDescanso',
  'juevesMesa',
  'viernesMuerte',
  'sabadoSilencio',
  'domingoResurreccion',
  'sietePalabras',
  'preparacionPasion14',
  'renovarFe10',
]);

const TOPIC_PLANS: Record<PlanTopic, string[]> = {
  hope: [
    'esperanza',
    'renovarFe10',
    'domingoResurreccion',
    'bibliaConJesus',
    'historiaRedencion',
    'epifaniaCristo',
    'entradaTriunfal',
    'esterilFructifero',
  ],
  faith: [
    'territorioFe',
    'isaiasConfianza',
    'isaiasSalvacion',
    'isaiasInmersion',
    'isaias5Dias',
    'isaiasRecorrido',
    'sobreEstaRoca',
    'bibliaConJesus',
    'historiaRedencion',
    'buscarReino',
    'bibliaAnoClasico',
    'nt90',
    'at180',
  ],
  peace: [
    'ansiedad',
    'corazonesAnsiosos',
    'enojo',
    'sabadoSilencio',
    'sanidad',
    'miercolesDescanso',
    'salmos150',
  ],
  love: [
    'amor',
    'esterilFructifero',
    'juevesMesa',
    'viernesMuerte',
    'sietePalabras',
    'milagrosJesus',
    'tierraSanta',
    'pascuaPreparacion',
  ],
  healing: ['sanidad', 'milagrosJesus', 'viernesMuerte', 'sanidadInterior7'],
  anxiety: ['ansiedad', 'corazonesAnsiosos', 'enojo', 'ansiedadConfianza7'],
  wisdom: ['proverbios', 'salmos150', 'buscarReino', 'sabiduriaDiaria14'],
  prophecy: [
    'isaiasConfianza',
    'isaiasSalvacion',
    'isaiasInmersion',
    'isaias5Dias',
    'isaiasRecorrido',
    'vocesProfeticas10',
  ],
  discipleship: [
    'bibliaConJesus',
    'viajeJuan',
    'sobreEstaRoca',
    'nt90',
    'at180',
    'bibliaAnoClasico',
    'discipuladoVida10',
  ],
  easter: [
    'entradaTriunfal',
    'juevesMesa',
    'viernesMuerte',
    'sabadoSilencio',
    'domingoResurreccion',
    'sietePalabras',
    'preparacionPasion14',
    'pascuaPreparacion',
  ],
};

const TOPIC_OPTIONS: Array<{
  id: PlanTopic;
  imgId?: string;
  imageUrl?: string;
  imageHint?: string;
}> = [
  { id: 'hope', imgId: 'topic-hope' },
  { id: 'faith', imgId: 'topic-faith' },
  { id: 'peace', imgId: 'topic-peace' },
  { id: 'love', imgId: 'topic-love' },
  {
    id: 'healing',
    imageUrl:
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&h=900&fit=crop',
    imageHint: 'healing hands prayer',
  },
  {
    id: 'anxiety',
    imageUrl:
      'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=1200&h=900&fit=crop',
    imageHint: 'anxiety alone reflection',
  },
  {
    id: 'wisdom',
    imageUrl:
      'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&h=900&fit=crop',
    imageHint: 'wisdom old bible',
  },
  {
    id: 'prophecy',
    imageUrl:
      'https://images.unsplash.com/photo-1473177104440-ffee2f376098?w=1200&h=900&fit=crop',
    imageHint: 'prophecy light clouds',
  },
  {
    id: 'discipleship',
    imageUrl:
      'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=1200&h=900&fit=crop',
    imageHint: 'discipleship group prayer',
  },
  {
    id: 'easter',
    imageUrl:
      'https://images.unsplash.com/photo-1524601500432-1e1a4c71d692?w=1200&h=900&fit=crop',
    imageHint: 'easter cross sunrise',
  },
];

const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

export default function PlansPage() {
  const { t } = useI18n();
  const { toast } = useToast();
  const resultsSectionRef = React.useRef<HTMLElement | null>(null);
  const [visiblePlansCount, setVisiblePlansCount] =
    React.useState<number>(PLANS_INITIAL_COUNT);
  const [savedPlans, setSavedPlans] = React.useState<Set<string>>(new Set());
  const [planProgress, setPlanProgress] = React.useState<
    Record<string, number>
  >({});
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [activeCategory, setActiveCategory] =
    React.useState<PlanCategory | null>(null);
  const [activeTopic, setActiveTopic] = React.useState<PlanTopic | null>(null);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const raw = window.localStorage.getItem(SAVED_PLANS_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setSavedPlans(new Set(parsed.filter((v) => typeof v === 'string')));
        }
      }
    } catch {
      /* ignore */
    }
    try {
      const rawProgress = window.localStorage.getItem(PROGRESS_STORAGE_KEY);
      if (rawProgress) {
        const parsed = JSON.parse(rawProgress);
        if (parsed && typeof parsed === 'object') {
          const clean: Record<string, number> = {};
          Object.entries(parsed).forEach(([k, v]) => {
            if (typeof v === 'number') clean[k] = v;
          });
          setPlanProgress(clean);
        }
      }
    } catch {
      /* ignore */
    }
  }, []);

  const persistSavedPlans = (next: Set<string>) => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(
        SAVED_PLANS_STORAGE_KEY,
        JSON.stringify(Array.from(next))
      );
    } catch {
      /* ignore */
    }
  };

  const adjustParticipants = (planId: string, delta: 1 | -1) => {
    if (typeof window === 'undefined') return;
    try {
      const raw = window.localStorage.getItem(PARTICIPANTS_STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : {};
      const store: Record<string, number> =
        parsed && typeof parsed === 'object' ? parsed : {};
      const current = typeof store[planId] === 'number' ? store[planId] : 0;
      const next = Math.max(0, current + delta);
      store[planId] = next;
      window.localStorage.setItem(
        PARTICIPANTS_STORAGE_KEY,
        JSON.stringify(store)
      );
      window.dispatchEvent(
        new CustomEvent('sacred-library:participants-changed', {
          detail: { planId, count: next },
        })
      );
    } catch {
      /* ignore */
    }
  };

  const toggleSavePlan = (planId: string, planTitle: string) => {
    const wasSaved = savedPlans.has(planId);
    const next = new Set(savedPlans);
    if (wasSaved) {
      next.delete(planId);
    } else {
      next.add(planId);
    }
    setSavedPlans(next);
    persistSavedPlans(next);
    adjustParticipants(planId, wasSaved ? -1 : 1);
    toast({
      title: wasSaved
        ? t('plans.unsavedPlanTitle')
        : t('plans.savedPlanTitle'),
      description: planTitle,
    });
  };

  const handleSharePlan = async (planId: string, planTitle: string) => {
    const url =
      typeof window !== 'undefined'
        ? `${window.location.origin}/plans/${planId}`
        : `/plans/${planId}`;
    const shareData = {
      title: planTitle,
      text: `${t('plans.shareIntro')} ${planTitle}`,
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
          title: t('plans.linkCopied'),
          description: planTitle,
        });
        return;
      }
      throw new Error('Share not available');
    } catch (err) {
      if ((err as Error)?.name === 'AbortError') return;
      toast({
        variant: 'destructive',
        title: t('plans.shareError'),
        description: t('plans.shareErrorDesc'),
      });
    }
  };
  const imageById = (id: string) =>
    PlaceHolderImages.find((img) => img.id === id);

  const availablePlans = [
    { id: 'amor', titleKey: 'plans.amor.title', descKey: 'plans.amor.desc', duration: '10', image: imageById('topic-love') },
    { id: 'ansiedad', titleKey: 'plans.ansiedad.title', descKey: 'plans.ansiedad.desc', duration: '7', image: imageById('topic-peace') },
    { id: 'sanidad', titleKey: 'plans.sanidad.title', descKey: 'plans.sanidad.desc', duration: '10', image: imageById('recommend-peace') },
    { id: 'enojo', titleKey: 'plans.enojo.title', descKey: 'plans.enojo.desc', duration: '7', image: imageById('inspiration-9') },
    { id: 'esperanza', titleKey: 'plans.esperanza.title', descKey: 'plans.esperanza.desc', duration: '10', image: imageById('topic-hope') },
    { id: 'territorioFe', titleKey: 'plans.territorioFe.title', descKey: 'plans.territorioFe.desc', duration: '14', image: imageById('topic-faith') },
    { id: 'isaiasConfianza', titleKey: 'plans.isaiasConfianza.title', descKey: 'plans.isaiasConfianza.desc', duration: '14', image: imageById('inspiration-6') },
    { id: 'isaiasSalvacion', titleKey: 'plans.isaiasSalvacion.title', descKey: 'plans.isaiasSalvacion.desc', duration: '14', image: imageById('inspiration-4') },
    { id: 'isaiasInmersion', titleKey: 'plans.isaiasInmersion.title', descKey: 'plans.isaiasInmersion.desc', duration: '30', image: imageById('inspiration-2') },
    { id: 'isaias5Dias', titleKey: 'plans.isaias5Dias.title', descKey: 'plans.isaias5Dias.desc', duration: '5', image: imageById('inspiration-12') },
    { id: 'isaiasRecorrido', titleKey: 'plans.isaiasRecorrido.title', descKey: 'plans.isaiasRecorrido.desc', duration: '66', image: imageById('ancient-scroll') },
    { id: 'sobreEstaRoca', titleKey: 'plans.sobreEstaRoca.title', descKey: 'plans.sobreEstaRoca.desc', duration: '14', image: imageById('inspiration-14') },
    { id: 'pascuaPreparacion', titleKey: 'plans.pascuaPreparacion.title', descKey: 'plans.pascuaPreparacion.desc', duration: '14', image: imageById('john-card') },
    { id: 'milagrosJesus', titleKey: 'plans.milagrosJesus.title', descKey: 'plans.milagrosJesus.desc', duration: '21', image: imageById('recommend-faith') },
    { id: 'epifaniaCristo', titleKey: 'plans.epifaniaCristo.title', descKey: 'plans.epifaniaCristo.desc', duration: '12', image: imageById('inspiration-15') },
    { id: 'buscarReino', titleKey: 'plans.buscarReino.title', descKey: 'plans.buscarReino.desc', duration: '14', image: imageById('inspiration-7') },
    { id: 'tierraSanta', titleKey: 'plans.tierraSanta.title', descKey: 'plans.tierraSanta.desc', duration: '12', image: imageById('inspiration-14') },
    { id: 'esterilFructifero', titleKey: 'plans.esterilFructifero.title', descKey: 'plans.esterilFructifero.desc', duration: '7', image: imageById('inspiration-5') },
    { id: 'corazonesAnsiosos', titleKey: 'plans.corazonesAnsiosos.title', descKey: 'plans.corazonesAnsiosos.desc', duration: '14', image: imageById('inspiration-11') },
    { id: 'viajeJuan', titleKey: 'plans.viajeJuan.title', descKey: 'plans.viajeJuan.desc', duration: '21', image: imageById('john-card') },
    { id: 'proverbios', titleKey: 'plans.proverbios.title', descKey: 'plans.proverbios.desc', duration: '31', image: imageById('proverbs-card') },
    { id: 'historiaRedencion', titleKey: 'plans.historiaRedencion.title', descKey: 'plans.historiaRedencion.desc', duration: '30', image: imageById('inspiration-1') },
    { id: 'bibliaAnoClasico', titleKey: 'plans.bibliaAnoClasico.title', descKey: 'plans.bibliaAnoClasico.desc', duration: '365', image: imageById('hero-library') },
    { id: 'cronologico', titleKey: 'plans.cronologico.title', descKey: 'plans.cronologico.desc', duration: '180', image: imageById('genesis-card') },
    { id: 'evangelioMes', titleKey: 'plans.evangelioMes.title', descKey: 'plans.evangelioMes.desc', duration: '120', image: imageById('library-morning') },
    { id: 'planTematico', titleKey: 'plans.planTematico.title', descKey: 'plans.planTematico.desc', duration: '30', image: imageById('inspiration-10') },
    { id: 'salmos150', titleKey: 'plans.salmos150.title', descKey: 'plans.salmos150.desc', duration: '150', image: imageById('psalms-hero') },
    { id: 'nt90', titleKey: 'plans.nt90.title', descKey: 'plans.nt90.desc', duration: '90', image: imageById('scripture-cat') },
    { id: 'at180', titleKey: 'plans.at180.title', descKey: 'plans.at180.desc', duration: '180', image: imageById('library-wave') },
    { id: 'bibliaConJesus', titleKey: 'plans.bibliaConJesus.title', descKey: 'plans.bibliaConJesus.desc', duration: '90', image: imageById('inspiration-3') },
    { id: 'renovarFe10', titleKey: 'plans.renovarFe10.title', descKey: 'plans.renovarFe10.desc', duration: '10', image: imageById('inspiration-13') },
    { id: 'preparacionPasion14', titleKey: 'plans.preparacionPasion14.title', descKey: 'plans.preparacionPasion14.desc', duration: '14', image: imageById('plan-mountains') },
    { id: 'domingoResurreccion', titleKey: 'plans.domingoResurreccion.title', descKey: 'plans.domingoResurreccion.desc', duration: '7', image: imageById('inspiration-8') },
    { id: 'sabadoSilencio', titleKey: 'plans.sabadoSilencio.title', descKey: 'plans.sabadoSilencio.desc', duration: '3', image: imageById('devotional-cat') },
    { id: 'sietePalabras', titleKey: 'plans.sietePalabras.title', descKey: 'plans.sietePalabras.desc', duration: '7', image: imageById('john-card') },
    { id: 'viernesMuerte', titleKey: 'plans.viernesMuerte.title', descKey: 'plans.viernesMuerte.desc', duration: '4', image: imageById('inspiration-4') },
    { id: 'juevesMesa', titleKey: 'plans.juevesMesa.title', descKey: 'plans.juevesMesa.desc', duration: '6', image: imageById('library-morning') },
    { id: 'miercolesDescanso', titleKey: 'plans.miercolesDescanso.title', descKey: 'plans.miercolesDescanso.desc', duration: '3', image: imageById('inspiration-12') },
    { id: 'martesControversia', titleKey: 'plans.martesControversia.title', descKey: 'plans.martesControversia.desc', duration: '5', image: imageById('plans-cat') },
    { id: 'lunesAutoridad', titleKey: 'plans.lunesAutoridad.title', descKey: 'plans.lunesAutoridad.desc', duration: '3', image: imageById('recommend-faith') },
    { id: 'entradaTriunfal', titleKey: 'plans.entradaTriunfal.title', descKey: 'plans.entradaTriunfal.desc', duration: '5', image: imageById('inspiration-15') },
    { id: 'discipuladoVida10', titleKey: 'plans.discipuladoVida10.title', descKey: 'plans.discipuladoVida10.desc', duration: '10', image: imageById('inspiration-3') },
    { id: 'sanidadInterior7', titleKey: 'plans.sanidadInterior7.title', descKey: 'plans.sanidadInterior7.desc', duration: '7', image: imageById('recommend-peace') },
    { id: 'ansiedadConfianza7', titleKey: 'plans.ansiedadConfianza7.title', descKey: 'plans.ansiedadConfianza7.desc', duration: '7', image: imageById('topic-peace') },
    { id: 'sabiduriaDiaria14', titleKey: 'plans.sabiduriaDiaria14.title', descKey: 'plans.sabiduriaDiaria14.desc', duration: '14', image: imageById('proverbs-card') },
    { id: 'vocesProfeticas10', titleKey: 'plans.vocesProfeticas10.title', descKey: 'plans.vocesProfeticas10.desc', duration: '10', image: imageById('ancient-scroll') },
  ];

  const planMatchesCurrentFilters = React.useCallback(
    (plan: { id: string; titleKey: string; descKey: string; duration: string }) => {
      const q = norm(searchQuery.trim());
      const searchRequestsPopular =
        q.includes('popular') || q.includes('populares');
      const searchRequestsNew =
        q.includes('new') || q.includes('nuevo') || q.includes('nuevos');
      const searchRequestsShort =
        q.includes('short') ||
        q.includes('corto') ||
        q.includes('cortos') ||
        q.includes('short plans');

      const isPopularPlan = POPULAR_IDS.has(plan.id);
      const isNewPlan = NEW_IDS.has(plan.id);
      const isShortPlan = Number(plan.duration) <= SHORT_PLAN_MAX_DAYS;

      // Category filter
      if (activeCategory === 'popular' && !isPopularPlan) return false;
      if (activeCategory === 'new' && !isNewPlan) return false;
      if (activeCategory === 'short' && !isShortPlan) return false;

      // Topic filter
      if (
        activeTopic !== null &&
        !TOPIC_PLANS[activeTopic].includes(plan.id)
      ) {
        return false;
      }

      // Search filter — check title + description in current language
      if (q.length > 0) {
        const searchableTags = [
          isPopularPlan ? 'popular populares' : '',
          isNewPlan ? 'new nuevo nuevos' : '',
          isShortPlan ? 'short corto cortos short plans planes cortos' : '',
        ].join(' ');
        const haystack = norm(
          `${t(plan.titleKey)} ${t(plan.descKey)} ${plan.id} ${searchableTags}`
        );

        if (searchRequestsPopular && !isPopularPlan) return false;
        if (searchRequestsNew && !isNewPlan) return false;
        if (searchRequestsShort && !isShortPlan) return false;
        if (!haystack.includes(q)) return false;
      }

      return true;
    },
    [activeCategory, activeTopic, searchQuery, t]
  );

  const filteredPlans = React.useMemo(() => {
    return availablePlans.filter((plan) => planMatchesCurrentFilters(plan));
  }, [availablePlans, planMatchesCurrentFilters]);

  React.useEffect(() => {
    setVisiblePlansCount(PLANS_INITIAL_COUNT);
  }, [activeCategory, activeTopic, searchQuery]);

  React.useEffect(() => {
    if (!activeTopic) return;
    resultsSectionRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }, [activeTopic]);

  const hasActiveFilter =
    searchQuery.trim().length > 0 ||
    activeCategory !== null ||
    activeTopic !== null;

  const clearFilters = () => {
    setSearchQuery('');
    setActiveCategory(null);
    setActiveTopic(null);
  };

  const handleTopicSelect = (topicId: PlanTopic) => {
    const shouldClear = activeTopic === topicId;
    if (shouldClear) {
      setActiveTopic(null);
      return;
    }
    // Browse by Topic prioritizes topic results on the left list.
    setSearchQuery('');
    setActiveCategory(null);
    setActiveTopic(topicId);
  };

  const selectedTopicLabel = React.useMemo(
    () => (activeTopic ? t(`plans.topic.${activeTopic}`) : null),
    [activeTopic, t]
  );

  const activePlans = React.useMemo(() => {
    return availablePlans
      .filter((p) => savedPlans.has(p.id))
      .filter((p) => planMatchesCurrentFilters(p))
      .map((p) => {
        const totalDays = Number(p.duration) || 0;
        const rawProgress = planProgress[p.id];
        const currentDay = Math.min(
          Math.max(typeof rawProgress === 'number' ? rawProgress : 1, 1),
          totalDays + 1
        );
        const completedDays = Math.min(currentDay - 1, totalDays);
        const percent = totalDays > 0
          ? Math.min(100, Math.round((completedDays / totalDays) * 100))
          : 0;
        const daysLeft = Math.max(totalDays - completedDays, 0);
        return {
          ...p,
          totalDays,
          currentDay: Math.min(currentDay, totalDays || 1),
          completedDays,
          percent,
          daysLeft,
        };
      });
  }, [savedPlans, planProgress, availablePlans, planMatchesCurrentFilters]);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-24">
        <header className="mb-16 space-y-4">
          <h1 className="text-6xl font-headline font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            {t('plans.title')}
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 font-body">
            {t('plans.description')}
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left Column: My Plans & Recommended */}
          <div className="lg:col-span-8 space-y-20">
            {/* My Plans Section */}
            <section className="space-y-8">
              <div className="flex items-end justify-between gap-4 flex-wrap">
                <h2 className="text-4xl font-headline font-bold text-slate-900 dark:text-slate-100">
                  {t('plans.myPlans')}
                </h2>
                {activePlans.length > 0 && (
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                    {activePlans.length} {t(activePlans.length === 1 ? 'plans.plan' : 'plans.plans')}
                  </span>
                )}
              </div>

              {activePlans.length === 0 ? (
                <div className="bg-slate-50/60 dark:bg-slate-900/40 rounded-[2rem] border border-dashed border-slate-200 dark:border-slate-800 p-10 text-center space-y-3">
                  <p className="text-base font-bold text-slate-700 dark:text-slate-200">
                    {t('plans.emptyTitle')}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {t('plans.emptyDescription')}
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {activePlans.map((plan) => (
                    <div
                      key={plan.id}
                      className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 border border-slate-50 dark:border-slate-800 shadow-2xl shadow-slate-100/50 flex flex-col md:flex-row items-center gap-8 group"
                    >
                      <div className="flex-1 space-y-6 w-full">
                        <div className="flex items-center gap-3">
                          <Badge className="bg-blue-100 text-blue-600 hover:bg-blue-100 border-none font-bold text-[10px] tracking-widest uppercase px-3 py-1">
                            {t('plans.active')}
                          </Badge>
                          <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                            {t('plans.dayOf')} {plan.currentDay} {t('plans.of')} {plan.totalDays}
                          </span>
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-3xl font-headline font-bold text-slate-900 dark:text-slate-100 leading-tight">
                            {t(plan.titleKey)}
                          </h3>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            {t(plan.descKey)}
                          </p>
                        </div>
                        <div className="space-y-4">
                          <Progress
                            value={plan.percent}
                            className="h-2 bg-slate-50 dark:bg-slate-800"
                          />
                          <div className="flex justify-between text-[10px] font-bold text-slate-400 dark:text-slate-500 tracking-widest uppercase">
                            <span>
                              {plan.percent}% {t('plans.completed')}
                            </span>
                            <span>
                              {plan.daysLeft} {t('plans.daysLeft')}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Link href={`/plans/${plan.id}`}>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-10 h-14 font-bold text-sm shadow-xl shadow-blue-100 transition-all hover:scale-105">
                          {t('plans.continue')} <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Recommended / Results Section */}
            <section ref={resultsSectionRef} className="space-y-8">
              <div className="flex items-end justify-between gap-4 flex-wrap">
                <h2 className="text-4xl font-headline font-bold text-slate-900 dark:text-slate-100">
                  {activeTopic
                    ? `${t('plans.results')}: ${selectedTopicLabel}`
                    : hasActiveFilter
                    ? t('plans.results')
                    : t('plans.recommended')}
                </h2>
                {hasActiveFilter && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="text-xs font-bold uppercase tracking-widest text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    {t('plans.clearFilters')}
                  </button>
                )}
              </div>

              {filteredPlans.length === 0 ? (
                <div className="bg-slate-50/60 dark:bg-slate-900/40 rounded-[2rem] border border-dashed border-slate-200 dark:border-slate-800 p-10 text-center space-y-3">
                  <p className="text-base font-bold text-slate-700 dark:text-slate-200">
                    {t('plans.noResultsTitle')}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {t('plans.noResultsDescription')}
                  </p>
                </div>
              ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredPlans.slice(0, visiblePlansCount).map((plan) => {
                  const planTitle = t(plan.titleKey);
                  const isSaved = savedPlans.has(plan.id);
                  return (
                    <div key={plan.id} className="relative h-80 rounded-[3rem] overflow-hidden group shadow-2xl transition-transform duration-500 hover:scale-[1.02]">
                      <Link
                        href={`/plans/${plan.id}`}
                        aria-label={planTitle}
                        className="absolute inset-0 block"
                      >
                        <Image
                          src={plan.image?.imageUrl || ''}
                          alt={planTitle}
                          fill
                          className="object-cover"
                          data-ai-hint={plan.image?.imageHint}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      </Link>

                      <div className="absolute top-5 right-5 flex items-center gap-2 z-10">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleSharePlan(plan.id, planTitle);
                          }}
                          aria-label={t('plans.sharePlan')}
                          title={t('plans.sharePlan')}
                          className="w-10 h-10 rounded-full bg-white/85 hover:bg-white dark:bg-slate-900/80 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-200 flex items-center justify-center backdrop-blur-md shadow-md transition-colors"
                        >
                          <Share2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleSavePlan(plan.id, planTitle);
                          }}
                          aria-pressed={isSaved}
                          aria-label={
                            isSaved ? t('plans.unsavePlan') : t('plans.savePlan')
                          }
                          title={
                            isSaved ? t('plans.unsavePlan') : t('plans.savePlan')
                          }
                          className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md shadow-md transition-colors ${
                            isSaved
                              ? 'bg-blue-600 text-white hover:bg-blue-700'
                              : 'bg-white/85 hover:bg-white dark:bg-slate-900/80 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-200'
                          }`}
                        >
                          {isSaved ? (
                            <BookmarkCheck className="w-4 h-4" />
                          ) : (
                            <Bookmark className="w-4 h-4" />
                          )}
                        </button>
                      </div>

                      <div className="absolute bottom-8 left-8 right-8 text-white space-y-3 pointer-events-none">
                        <span className="text-[10px] font-bold tracking-[0.2em] opacity-80 uppercase">{plan.duration} {t('plans.left').split(' ')[1]}</span>
                        <h3 className="text-2xl font-headline font-bold leading-tight">{planTitle}</h3>
                        <p className="text-xs font-medium opacity-70 line-clamp-2 leading-relaxed">{t(plan.descKey)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              )}

              {filteredPlans.length > 0 &&
                visiblePlansCount < filteredPlans.length && (
                  <div className="flex justify-center pt-4">
                    <Button
                      variant="outline"
                      onClick={() =>
                        setVisiblePlansCount((n) =>
                          Math.min(n + PLANS_STEP, filteredPlans.length)
                        )
                      }
                      className="rounded-full border-slate-100 dark:border-slate-800 text-slate-400 dark:text-slate-500 font-bold text-xs h-12 px-10 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                    >
                      {t('plans.loadMore')}
                    </Button>
                  </div>
                )}
            </section>
          </div>

          {/* Right Column: Discover & Topics */}
          <aside className="lg:col-span-4 space-y-12">
            <div className="bg-blue-50/30 dark:bg-slate-900/40 rounded-[3rem] p-10 space-y-10">
              <div className="space-y-6">
                <h3 className="text-3xl font-headline font-bold text-slate-900 dark:text-slate-100">{t('plans.discover')}</h3>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t('plans.searchPlaceholder')}
                    className="pl-12 pr-12 h-12 bg-white dark:bg-slate-900 border-none rounded-full text-slate-900 dark:text-slate-100 placeholder:text-slate-400 text-xs font-medium"
                  />
                  {searchQuery.length > 0 ? (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      aria-label={t('plans.clearSearch')}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  ) : (
                    <SlidersHorizontal className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {([
                    { id: 'popular', label: t('plans.popular') },
                    { id: 'new', label: t('plans.new') },
                    { id: 'short', label: t('plans.short') },
                  ] as { id: PlanCategory; label: string }[]).map((cat) => {
                    const active = activeCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() =>
                          setActiveCategory(active ? null : cat.id)
                        }
                        aria-pressed={active}
                        className={`rounded-full px-4 py-2 text-[10px] font-bold tracking-wide transition-colors border ${
                          active
                            ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-100'
                            : 'bg-white/50 dark:bg-slate-900/60 text-slate-500 dark:text-slate-400 border-transparent hover:bg-white dark:hover:bg-slate-800'
                        }`}
                      >
                        {cat.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-8">
                <h3 className="text-3xl font-headline font-bold text-slate-900 dark:text-slate-100">{t('plans.browseTopic')}</h3>
                <div className="grid grid-cols-2 gap-4">
                  {TOPIC_OPTIONS.map((topic) => {
                    const label = t(`plans.topic.${topic.id}`);
                    const img = topic.imgId ? imageById(topic.imgId) : undefined;
                    const imageSrc = topic.imageUrl || img?.imageUrl || '';
                    const imageHint = topic.imageHint || img?.imageHint;
                    const active = activeTopic === topic.id;
                    return (
                      <button
                        type="button"
                        key={topic.id}
                        onClick={() => handleTopicSelect(topic.id)}
                        aria-pressed={active}
                        className={`relative aspect-square rounded-[2rem] overflow-hidden group shadow-lg transition-transform hover:scale-[1.02] focus:outline-none ${
                          active
                            ? 'ring-4 ring-blue-500 ring-offset-2 ring-offset-blue-50 dark:ring-offset-slate-900'
                            : ''
                        }`}
                      >
                        {imageSrc && (
                          <Image
                            src={imageSrc}
                            alt={label}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            data-ai-hint={imageHint}
                          />
                        )}
                        <div
                          className={`absolute inset-0 transition-colors ${
                            active ? 'bg-blue-600/60' : 'bg-black/40 group-hover:bg-black/20'
                          }`}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-white text-xl font-headline font-bold drop-shadow-md">
                            {label}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
