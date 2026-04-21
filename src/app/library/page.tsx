
"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/navigation/navbar';
import { Footer } from '@/components/footer/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import { Heart, ArrowRight, Search, Play, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useI18n } from '@/components/providers/i18n-provider';

const libraryItems = [
  {
    id: 'morning-gratitude',
    title: 'Morning Gratitude',
    author: 'BY SARAH YOUNG',
    quote: '"Find peace in the quiet moments before the day begins. Let your heart be filled with gratitude for the breath in your lungs and the light breaking over the horizon..."',
    image: PlaceHolderImages.find(img => img.id === 'library-morning'),
    active: true,
  },
  {
    id: 'finding-stillness',
    title: 'Finding Stillness',
    author: 'BY JOHN MARK COMER',
    quote: '"In a world addicted to noise, stillness is an act of rebellion. It is in the quiet spaces that we finally hear the whispers of grace that guide our steps..."',
    image: PlaceHolderImages.find(img => img.id === 'library-wave'),
    active: false,
  }
];

const recentlyPlayed = [
  {
    title: 'Genesis',
    subtitle: 'Chapter 1 - In the beginning',
    image: PlaceHolderImages.find(img => img.id === 'genesis-card'),
  },
  {
    title: 'Proverbs',
    subtitle: 'Chapter 3 - Trust in the Lord',
    image: PlaceHolderImages.find(img => img.id === 'proverbs-card'),
  },
  {
    title: 'John',
    subtitle: 'Chapter 14 - The Way, the Truth',
    image: PlaceHolderImages.find(img => img.id === 'john-card'),
  }
];

export default function LibraryPage() {
  const { t } = useI18n();
  const filters = [t('library.devotionalsTab'), t('nav.plans'), t('explore.scripture')];
  const [activeFilter, setActiveFilter] = React.useState(t('library.devotionalsTab'));
  const psalmsHero = PlaceHolderImages.find(img => img.id === 'psalms-hero');

  const renderBibleChapters = () => (
    <div className="space-y-16 animate-in fade-in duration-500">
      {/* Audio Player Hero */}
      <div className="relative h-[450px] w-full rounded-[3.5rem] overflow-hidden shadow-2xl">
        <Image
          src={psalmsHero?.imageUrl || ''}
          alt="Audio Player Background"
          fill
          className="object-cover"
          priority
          data-ai-hint="forest sunlight"
        />
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="absolute inset-0 p-12 md:p-20 flex flex-col justify-end md:flex-row md:items-end md:justify-between gap-12">
          <div className="text-white space-y-4 max-w-xl">
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-70">{t('library.nowPlaying')}</span>
            <h2 className="text-5xl md:text-7xl font-headline font-bold leading-tight">
              The Book of Psalms
            </h2>
            <p className="text-lg md:text-xl font-medium text-white/80">
              Chapter 23 - A Psalm of David
            </p>
          </div>

          <div className="w-full md:w-[380px] bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[2.5rem] p-8 space-y-8">
            <div className="flex items-center justify-center gap-8">
              <button className="text-white/70 hover:text-white transition-colors">
                <SkipBack className="w-6 h-6 fill-current" />
              </button>
              <button className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-xl shadow-blue-500/20 hover:scale-105 transition-all">
                <Play className="w-6 h-6 fill-current ml-1" />
              </button>
              <button className="text-white/70 hover:text-white transition-colors">
                <SkipForward className="w-6 h-6 fill-current" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-[10px] font-bold text-white/50 tracking-widest">
                <span>0:00</span>
                <span>-4:32</span>
              </div>
              <Slider defaultValue={[20]} max={100} step={1} className="w-full" />
            </div>

            <div className="flex items-center gap-4 group">
              <Volume2 className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
              <Slider defaultValue={[70]} max={100} step={1} className="flex-1" />
              <Volume2 className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs and Search */}
      <div className="space-y-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 border-b border-slate-100">
          <div className="flex gap-12">
            {[t('library.bibleChapters'), t('library.devotionalsTab'), t('library.sermonsTab')].map((tab) => (
              <button
                key={tab}
                className={cn(
                  "pb-6 text-sm font-bold tracking-tight transition-all relative",
                  tab === t('library.bibleChapters') 
                    ? "text-blue-600 after:absolute after:bottom-[-1px] after:left-0 after:right-0 after:h-0.5 after:bg-blue-600"
                    : "text-slate-400 hover:text-slate-600"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="relative max-w-md">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
          <Input 
            placeholder={t('library.searchPlaceholder')} 
            className="pl-14 h-14 bg-slate-50/50 border-none rounded-full text-slate-900 placeholder:text-slate-300"
          />
        </div>

        {/* Recently Played */}
        <div className="space-y-10">
          <h3 className="text-4xl font-headline font-bold text-slate-900">{t('library.recentlyPlayed')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentlyPlayed.map((item, idx) => (
              <div key={idx} className="group cursor-pointer">
                <div className="relative h-64 rounded-[2.5rem] overflow-hidden mb-6 shadow-xl transition-transform duration-500 group-hover:scale-[1.02]">
                  <Image
                    src={item.image?.imageUrl || ''}
                    alt={item.title}
                    fill
                    className="object-cover"
                    data-ai-hint={item.image?.imageHint}
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-blue-600">
                      <Play className="w-5 h-5 fill-current ml-1" />
                    </div>
                  </div>
                </div>
                <div className="space-y-1 px-4">
                  <h4 className="text-2xl font-headline font-bold text-slate-900">{item.title}</h4>
                  <p className="text-sm font-medium text-slate-400">{item.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-24">
        {activeFilter !== t('explore.scripture') && (
          <header className="mb-16 space-y-10">
            <h1 className="text-6xl font-headline font-bold text-slate-900 tracking-tight">
              {t('library.title')}
            </h1>

            <div className="flex flex-wrap gap-4">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={cn(
                    "px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300",
                    activeFilter === filter
                      ? "bg-blue-600 text-white shadow-xl shadow-blue-200"
                      : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                  )}
                >
                  {filter}
                </button>
              ))}
            </div>
          </header>
        )}

        {activeFilter === t('explore.scripture') ? renderBibleChapters() : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {libraryItems.map((item, idx) => (
              <div key={idx} className="group flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${idx * 150}ms` }}>
                <div className="relative h-[400px] w-full rounded-t-[2.5rem] overflow-hidden">
                  <Image
                    src={item.image?.imageUrl || ''}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    data-ai-hint={item.image?.imageHint}
                  />
                  <button className="absolute top-8 right-8 text-white/90 hover:text-white hover:scale-110 transition-all drop-shadow-lg">
                    <Heart className="w-8 h-8 fill-white/20 backdrop-blur-sm rounded-full p-1" />
                  </button>
                </div>

                <div className="bg-white rounded-b-[2.5rem] p-12 flex flex-col flex-1 space-y-6 border-x border-b border-slate-50 shadow-sm transition-shadow group-hover:shadow-xl group-hover:shadow-slate-100/50">
                  <div className="space-y-4">
                    <h3 className="text-4xl font-headline font-bold text-slate-900 leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs font-bold tracking-[0.2em] text-blue-600 uppercase">
                      {item.author}
                    </p>
                  </div>

                  <p className="text-lg text-slate-600 italic font-medium leading-relaxed">
                    {item.quote}
                  </p>

                  <div className="pt-6">
                    <Link href={`/library/${item.id}`}>
                      <Button 
                        className={cn(
                          "w-full rounded-full py-8 text-sm font-bold transition-all duration-300",
                          item.active 
                            ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200" 
                            : "bg-slate-50 hover:bg-slate-100 text-slate-900 shadow-none"
                        )}
                      >
                        {t('library.readNow')}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
