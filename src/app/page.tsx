
"use client";

import React from 'react';
import Image from 'next/image';
import { Navbar } from '@/components/navigation/navbar';
import { ContentBrowser } from '@/components/content/content-browser';
import { JournalSection } from '@/components/journal/journal-section';
import { Footer } from '@/components/footer/footer';
import { InterestsPicker } from '@/components/personalization/interests-picker';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Quote } from 'lucide-react';

const DAILY_VERSE = "Be still, and know that I am God. (Psalm 46:10)";

export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-library');

  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <Image
          src={heroImage?.imageUrl || ''}
          alt="Majestic Library"
          fill
          className="object-cover"
          priority
          data-ai-hint={heroImage?.imageHint}
        />
        <div className="absolute inset-0 bg-primary/40 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white space-y-8 animate-in fade-in zoom-in duration-700">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="text-sm font-medium tracking-wide">Daily Wisdom</span>
          </div>
          
          <div className="space-y-4">
            <Quote className="w-12 h-12 mx-auto text-accent/80 opacity-50" />
            <h1 className="text-5xl md:text-7xl font-headline font-bold leading-tight drop-shadow-lg">
              {DAILY_VERSE}
            </h1>
          </div>
          
          <p className="text-xl md:text-2xl font-light text-white/90 max-w-2xl mx-auto">
            Step into the quiet halls of infinite wisdom. Explore, reflect, and grow in your spiritual journey.
          </p>
          
          <div className="pt-8">
            <a 
              href="#explore" 
              className="bg-accent text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-accent/90 transition-all hover:scale-105 inline-block shadow-xl shadow-accent/20"
            >
              Start Exploring
            </a>
          </div>
        </div>
      </section>

      {/* Content Browsing Section */}
      <ContentBrowser />

      {/* Journaling Section */}
      <JournalSection dailyVerse={DAILY_VERSE} />

      {/* Community Placeholder */}
      <section className="py-24 bg-primary/5">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-white p-12 rounded-3xl border border-primary/10 shadow-xl space-y-6">
            <h2 className="text-4xl font-headline font-bold">Community Circles</h2>
            <p className="text-muted-foreground text-lg">
              Our shared spaces for prayer, discussion, and fellowship are currently being prepared. Join our waitlist to be the first to know when we open our doors.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-6 py-3 rounded-full border border-primary/20 focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
              <button className="bg-primary text-white px-8 py-3 rounded-full font-bold whitespace-nowrap">Notify Me</button>
            </div>
          </div>
        </div>
      </section>

      {/* Personalization Section */}
      <InterestsPicker />

      <Footer />
    </main>
  );
}
