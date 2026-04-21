"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Footer } from '@/components/footer/footer';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Bookmark, Share2, Play, Pause, Settings, ChevronLeft } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function DevotionalDetailPage() {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const heroImage = PlaceHolderImages.find(img => img.id === 'devotional-cat');

  return (
    <div className="min-h-screen bg-slate-50/30 flex flex-col">
      {/* Reading Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/library" className="flex items-center gap-2 group text-slate-900">
            <span className="font-headline text-2xl font-bold italic tracking-tight">Sacred Library</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-blue-600">
              <Bookmark className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-blue-600">
              <Share2 className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-32 pb-48">
        <article className="max-w-4xl mx-auto px-6">
          {/* Header Info */}
          <div className="text-center space-y-4 mb-12">
            <h1 className="text-5xl md:text-7xl font-headline font-bold text-slate-900 leading-tight">
              Morning Gratitude
            </h1>
            <p className="text-xs font-bold tracking-[0.2em] text-slate-400 uppercase">
              BY SARAH YOUNG <span className="mx-2">•</span> APRIL 15, 2024
            </p>
          </div>

          {/* Hero Image */}
          <div className="relative h-[300px] md:h-[500px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl mb-16">
            <Image
              src={heroImage?.imageUrl || ''}
              alt="Morning Sunrise"
              fill
              className="object-cover"
              priority
              data-ai-hint="peaceful sunrise"
            />
          </div>

          {/* Content Body */}
          <div className="max-w-2xl mx-auto space-y-8 text-lg leading-relaxed text-slate-700 font-body">
            <p>
              Start your day by acknowledging the gifts you've been given. Even in difficult times, there is always something to be thankful for. Cultivating a heart of gratitude changes your perspective, shifting your focus from what you lack to the abundance that surrounds you.
            </p>
            <p>
              Take a moment now to breathe deeply. As you inhale, receive the peace of this new morning. As you exhale, release any anxiety from yesterday or worries about tomorrow. This moment is a sanctuary.
            </p>
            <p>
              Look for the small blessings today: the warmth of your coffee, a kind word from a friend, or simply the ability to see the sky. When you train your mind to look for goodness, you will find it multiplying in your life.
            </p>

            {/* Verse Highlight Box */}
            <div className="my-16 p-10 bg-blue-50/50 rounded-r-[2.5rem] border-l-4 border-blue-600 relative overflow-hidden">
              <blockquote className="space-y-4 relative z-10">
                <p className="text-3xl font-headline italic font-bold text-slate-800 leading-tight">
                  "Give thanks in all circumstances; for this is God's will for you in Christ Jesus."
                </p>
                <cite className="block text-sm font-bold tracking-widest text-blue-600 not-italic uppercase">
                  — 1 Thessalonians 5:18
                </cite>
              </blockquote>
            </div>
          </div>
        </article>
      </main>

      {/* Sticky Audio Player */}
      <div className="fixed bottom-12 left-1/2 -translate-x-1/2 w-full max-w-2xl px-6 z-40">
        <div className="bg-white/80 backdrop-blur-xl border border-slate-100 rounded-full shadow-2xl p-4 flex items-center gap-6">
          <Button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white shrink-0 shadow-lg shadow-blue-200"
          >
            {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
          </Button>

          <div className="flex-1 flex items-center gap-4">
            <span className="text-[10px] font-bold text-slate-400 w-8">0:00</span>
            <Slider defaultValue={[15]} max={100} step={1} className="flex-1" />
            <span className="text-[10px] font-bold text-slate-400 w-8">4:12</span>
          </div>

          <div className="flex items-center gap-4 border-l border-slate-100 pl-6 pr-2">
            <div className="flex items-center gap-2">
              <button className="text-[10px] font-bold text-slate-400 hover:text-blue-600">A-</button>
              <button className="text-[10px] font-bold text-slate-900 hover:text-blue-600">A+</button>
            </div>
            <div className="h-4 w-px bg-slate-100 mx-2" />
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-blue-600">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
