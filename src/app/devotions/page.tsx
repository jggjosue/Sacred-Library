
"use client";

import React from 'react';
import Image from 'next/image';
import { Navbar } from '@/components/navigation/navbar';
import { Footer } from '@/components/footer/footer';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Play, RotateCcw, RotateCw, Headphones, Timer } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function DevotionsPage() {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const heroImage = PlaceHolderImages.find(img => img.id === 'devotional-cat');

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-6 pt-32 pb-24">
        {/* Header section */}
        <header className="text-center space-y-4 mb-12">
          <span className="text-[10px] font-bold tracking-[0.3em] text-blue-600 uppercase">
            Daily Devotional
          </span>
          <h1 className="text-5xl md:text-7xl font-headline font-bold text-slate-900 leading-tight">
            Morning Gratitude
          </h1>
          <p className="text-lg font-headline italic text-slate-500">
            by Sarah Young
          </p>
        </header>

        {/* Hero Image */}
        <div className="relative h-[400px] w-full rounded-[3rem] overflow-hidden shadow-2xl mb-16">
          <Image
            src={heroImage?.imageUrl || ''}
            alt="Morning Gratitude"
            fill
            className="object-cover"
            priority
            data-ai-hint="peaceful sunrise"
          />
        </div>

        {/* Content Body */}
        <div className="max-w-3xl mx-auto space-y-10">
          <div className="text-xl leading-relaxed text-slate-700 font-body">
            <p className="relative">
              <span className="float-left text-7xl font-headline font-bold text-blue-600 mr-4 mt-2 leading-[0.8]">C</span>
              ome to Me with your plans and purposes, but be willing to lay them aside if I lead you in another direction. I am the Sovereign Lord; I know what is best for you. My ways are higher than your ways, and My thoughts are higher than your thoughts.
            </p>
          </div>

          <div className="text-xl leading-relaxed text-slate-700 font-body space-y-8">
            <p>
              When you cling tightly to your own agenda, you limit what I can do in your life. You also increase your stress level, because you are trying to force things to go your way. Instead of striving to make your plans succeed, yield yourself fully to Me. Ask Me to guide your steps and open the right doors at the right time.
            </p>
            
            <p>
              As you wait on Me, remember that I am working behind the scenes. Even when you cannot see what I am doing, trust that I am orchestrating events for your ultimate good and My glory. Rest in the knowledge that I love you perfectly and My timing is always flawless.
            </p>
          </div>

          {/* Styled Scripture Box */}
          <div className="my-16 p-12 bg-blue-50/40 rounded-[2.5rem] relative overflow-hidden border-l-[6px] border-blue-600">
            <blockquote className="space-y-6">
              <p className="text-2xl font-headline italic text-slate-800 leading-relaxed">
                "For I know the plans I have for you," declares the LORD, "plans to prosper you and not to harm you, plans to give you hope and a future."
              </p>
              <cite className="block text-right text-sm font-bold tracking-widest text-blue-600 not-italic uppercase">
                — Jeremiah 29:11
              </cite>
            </blockquote>
          </div>

          <div className="text-xl leading-relaxed text-slate-700 font-body">
            <p>
              Let go of your need for control and surrender your desires to Me. As you do, you will experience My profound peace—a peace that transcends understanding. This peace will guard your heart and mind, keeping you focused on Me rather than on your circumstances.
            </p>
          </div>

          {/* Audio Player Card */}
          <div className="mt-20 p-8 bg-slate-50/80 backdrop-blur-sm rounded-[3rem] border border-slate-100 shadow-xl space-y-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-200">
                  <Headphones className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Listen to Devotional</h3>
                  <p className="text-xs text-slate-400 font-medium">Narrated by Sarah Young • 4:32</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="rounded-full bg-white text-slate-400 font-bold text-[10px] h-8 px-4 gap-2">
                <Timer className="w-3.5 h-3.5" />
                Timer
              </Button>
            </div>

            <div className="space-y-3">
              <Slider defaultValue={[28]} max={100} step={1} className="w-full" />
              <div className="flex justify-between text-[10px] font-bold text-slate-400 tracking-widest">
                <span>1:15</span>
                <span>4:32</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-12">
              <button className="text-slate-400 hover:text-blue-600 transition-colors">
                <RotateCcw className="w-8 h-8" />
              </button>
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-2xl shadow-blue-200 hover:scale-105 transition-transform"
              >
                <Play className="w-8 h-8 fill-current ml-1" />
              </button>
              <button className="text-slate-400 hover:text-blue-600 transition-colors">
                <RotateCw className="w-8 h-8" />
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
