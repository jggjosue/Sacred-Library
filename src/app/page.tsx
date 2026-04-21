
"use client";

import React from 'react';
import Image from 'next/image';
import { Navbar } from '@/components/navigation/navbar';
import { ContentBrowser } from '@/components/content/content-browser';
import { JournalSection } from '@/components/journal/journal-section';
import { Footer } from '@/components/footer/footer';
import { InterestsPicker } from '@/components/personalization/interests-picker';
import { DiscoverPath } from '@/components/content/discover-path';
import { InspirationCarousel } from '@/components/content/inspiration-carousel';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Quote } from 'lucide-react';
import { useI18n } from '@/components/providers/i18n-provider';

export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-library');
  const { t } = useI18n();

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Static Hero Section */}
      <section className="relative min-h-[100vh] w-full flex items-center justify-center overflow-hidden">
        {heroImage?.imageUrl && (
          <Image
            src={heroImage.imageUrl}
            alt="Sacred Library Hero"
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-primary/40 dark:bg-black/60 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/10 to-background" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 pt-32 pb-32 text-center text-white space-y-12 animate-in fade-in zoom-in duration-700">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="text-sm font-medium tracking-wide uppercase">{t('hero.dailyWisdom')}</span>
          </div>
          
          <div className="space-y-6">
            <Quote className="w-10 h-10 mx-auto text-accent/80 opacity-60" />
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-bold leading-tight drop-shadow-2xl px-4">
              {t('hero.verse')}
            </h1>
          </div>
          
          <p className="text-lg md:text-2xl font-light text-white/90 max-w-2xl mx-auto leading-relaxed">
            {t('hero.description')}
          </p>
          
          <div className="pt-12">
            <a 
              href="#explore" 
              className="bg-accent text-white px-10 py-4 md:px-12 md:py-5 rounded-full font-bold text-lg hover:bg-accent/90 transition-all hover:scale-105 inline-block shadow-2xl shadow-accent/40 ring-4 ring-white/10"
            >
              {t('hero.cta')}
            </a>
          </div>
        </div>
      </section>

      {/* Content Browsing Section */}
      <ContentBrowser />

      {/* Inspiration Carousel Section */}
      <InspirationCarousel />

      {/* Journaling Section */}
      <JournalSection dailyVerse={t('hero.verse')} />

      {/* Community Placeholder */}
      <section className="py-24 bg-primary/5 dark:bg-white/5">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-card p-12 rounded-[3rem] border border-border shadow-xl space-y-6">
            <h2 className="text-4xl font-headline font-bold text-card-foreground">{t('community.title')}</h2>
            <p className="text-muted-foreground text-lg">
              {t('community.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder={t('community.placeholder')} 
                className="flex-1 px-6 py-4 rounded-full border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
              <button className="bg-primary text-primary-foreground px-10 py-4 rounded-full font-bold whitespace-nowrap shadow-lg hover:bg-primary/90 transition-colors">
                {t('community.notify')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Personalization Section */}
      <InterestsPicker />

      {/* Discover Path Section */}
      <DiscoverPath />

      <Footer />
    </main>
  );
}
