
"use client";

import React from 'react';
import Image from 'next/image';
import { Navbar } from '@/components/navigation/navbar';
import { Footer } from '@/components/footer/footer';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { Share2, ArrowRight, BookOpen } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function ScripturePage() {
  const ancientImage = PlaceHolderImages.find(img => img.id === 'ancient-scroll');

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-900/40 pt-24 pb-12">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Featured Verse Card */}
          <div className="lg:col-span-8">
            <div className="relative overflow-hidden rounded-[2.5rem] bg-black text-white min-h-[500px] flex flex-col justify-end p-8 md:p-12 shadow-2xl">
              <Image
                src={ancientImage?.imageUrl || ''}
                alt="Ancient Scroll"
                fill
                className="object-cover opacity-40 mix-blend-luminosity"
                data-ai-hint={ancientImage?.imageHint}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              
              <div className="relative z-10 space-y-6">
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-slate-400 dark:text-slate-500">Verse of the Day</span>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-headline italic leading-tight max-w-2xl">
                  "For I know the plans I have for you," declares the LORD, "plans to prosper you and not to harm you, plans to give you hope and a future."
                </h1>
                <p className="text-lg text-slate-300 dark:text-slate-600 font-medium">— Jeremiah 29:11</p>
                
                <div className="flex flex-wrap gap-4 pt-4">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 py-6 h-auto text-lg font-bold">
                    Study Verse
                  </Button>
                  <Button variant="secondary" className="bg-white/10 hover:bg-white/20 text-white border-none rounded-full px-8 py-6 h-auto text-lg font-bold backdrop-blur-sm">
                    <Share2 className="w-5 h-5 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Side Panel: My Journey */}
          <div className="lg:col-span-4 space-y-8">
            <div className="space-y-6">
              <h2 className="text-4xl font-headline font-bold text-slate-900 dark:text-slate-100">My Journey</h2>
              
              <Card className="border-none shadow-xl shadow-slate-200/50 rounded-[2rem] overflow-hidden bg-white dark:bg-slate-900">
                <CardContent className="p-8 space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold tracking-widest uppercase bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                      Active Plan
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">The Gospels in 30 Days</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                      Explore the life and teachings of Jesus across Matthew, Mark, Luke, and John.
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-slate-400 dark:text-slate-500">Day 5 of 30</span>
                      <span className="text-blue-600">16%</span>
                    </div>
                    <Progress value={16} className="h-2 bg-slate-100 dark:bg-slate-800" />
                  </div>

                  <Button className="w-full bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-blue-600 border-none shadow-none rounded-full py-6 h-auto text-sm font-bold group">
                    Continue Reading
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
