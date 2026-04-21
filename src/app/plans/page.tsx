
"use client";

import React from 'react';
import Image from 'next/image';
import { Navbar } from '@/components/navigation/navbar';
import { Footer } from '@/components/footer/footer';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, SlidersHorizontal, ArrowRight } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function PlansPage() {
  const hopeImage = PlaceHolderImages.find(img => img.id === 'topic-hope');
  const faithImage = PlaceHolderImages.find(img => img.id === 'topic-faith');
  const peaceImage = PlaceHolderImages.find(img => img.id === 'topic-peace');
  const loveImage = PlaceHolderImages.find(img => img.id === 'topic-love');
  const recommendPeace = PlaceHolderImages.find(img => img.id === 'recommend-peace');
  const recommendFaith = PlaceHolderImages.find(img => img.id === 'recommend-faith');

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-24">
        <header className="mb-16 space-y-4">
          <h1 className="text-6xl font-headline font-bold text-slate-900 tracking-tight">
            Reading Plans
          </h1>
          <p className="text-lg text-slate-500 font-body">
            Structure your spiritual journey with guided readings.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left Column: My Plans & Recommended */}
          <div className="lg:col-span-8 space-y-20">
            {/* My Plans Section */}
            <section className="space-y-8">
              <h2 className="text-4xl font-headline font-bold text-slate-900">My Plans</h2>
              
              <div className="space-y-6">
                {/* Plan 1 */}
                <div className="bg-white rounded-[2.5rem] p-10 border border-slate-50 shadow-2xl shadow-slate-100/50 flex flex-col md:flex-row items-center gap-8 group">
                  <div className="flex-1 space-y-6 w-full">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-blue-100 text-blue-600 hover:bg-blue-100 border-none font-bold text-[10px] tracking-widest uppercase px-3 py-1">
                        ACTIVE
                      </Badge>
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Day 12 of 30</span>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-3xl font-headline font-bold text-slate-900 leading-tight">The Gospels in 30 Days</h3>
                      <p className="text-sm text-slate-500">A journey through the life and teachings of Jesus.</p>
                    </div>
                    <div className="space-y-4">
                      <Progress value={40} className="h-2 bg-slate-50" />
                      <div className="flex justify-between text-[10px] font-bold text-slate-400 tracking-widest uppercase">
                        <span>40% Completed</span>
                        <span>18 Days Left</span>
                      </div>
                    </div>
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-10 h-14 font-bold text-sm shadow-xl shadow-blue-100 transition-all hover:scale-105">
                    Continue <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>

                {/* Plan 2 */}
                <div className="bg-white rounded-[2.5rem] p-10 border border-slate-50 shadow-2xl shadow-slate-100/50 flex flex-col md:flex-row items-center gap-8 group">
                  <div className="flex-1 space-y-6 w-full">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-blue-100 text-blue-600 hover:bg-blue-100 border-none font-bold text-[10px] tracking-widest uppercase px-3 py-1">
                        ACTIVE
                      </Badge>
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Day 3 of 7</span>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-3xl font-headline font-bold text-slate-900 leading-tight">Psalms of Praise</h3>
                      <p className="text-sm text-slate-500">Finding joy and gratitude through the Psalms.</p>
                    </div>
                    <div className="space-y-4">
                      <Progress value={42} className="h-2 bg-slate-50" />
                      <div className="flex justify-between text-[10px] font-bold text-slate-400 tracking-widest uppercase">
                        <span>42% Completed</span>
                        <span>4 Days Left</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="secondary" className="bg-slate-50 hover:bg-slate-100 text-slate-900 rounded-full px-10 h-14 font-bold text-sm transition-all hover:scale-105">
                    Continue <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </section>

            {/* Recommended For You Section */}
            <section className="space-y-8">
              <h2 className="text-4xl font-headline font-bold text-slate-900">Recommended For You</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Recommendation 1 */}
                <div className="relative h-80 rounded-[3rem] overflow-hidden group cursor-pointer shadow-2xl transition-transform duration-500 hover:scale-[1.02]">
                  <Image
                    src={recommendPeace?.imageUrl || ''}
                    alt="Finding Peace in Chaos"
                    fill
                    className="object-cover"
                    data-ai-hint="misty sunset"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-8 left-8 right-8 text-white space-y-3">
                    <span className="text-[10px] font-bold tracking-[0.2em] opacity-80 uppercase">14 DAYS</span>
                    <h3 className="text-2xl font-headline font-bold leading-tight">Finding Peace in Chaos</h3>
                    <p className="text-xs font-medium opacity-70 line-clamp-2 leading-relaxed">Daily readings to center your mind and find tranquility.</p>
                  </div>
                </div>

                {/* Recommendation 2 */}
                <div className="relative h-80 rounded-[3rem] overflow-hidden group cursor-pointer shadow-2xl transition-transform duration-500 hover:scale-[1.02]">
                  <Image
                    src={recommendFaith?.imageUrl || ''}
                    alt="Walking in Faith"
                    fill
                    className="object-cover"
                    data-ai-hint="sunlight forest"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-8 left-8 right-8 text-white space-y-3">
                    <span className="text-[10px] font-bold tracking-[0.2em] opacity-80 uppercase">7 DAYS</span>
                    <h3 className="text-2xl font-headline font-bold leading-tight">Walking in Faith</h3>
                    <p className="text-xs font-medium opacity-70 line-clamp-2 leading-relaxed">A short journey exploring the foundations of trust.</p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Discover & Topics */}
          <aside className="lg:col-span-4 space-y-12">
            <div className="bg-blue-50/30 rounded-[3rem] p-10 space-y-10">
              <div className="space-y-6">
                <h3 className="text-3xl font-headline font-bold text-slate-900">Discover Plans</h3>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input 
                    placeholder="Search by topic, book, or author" 
                    className="pl-12 h-12 bg-white border-none rounded-full text-slate-900 placeholder:text-slate-400 text-xs font-medium"
                  />
                  <SlidersHorizontal className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-white/50 hover:bg-white text-slate-500 border-none rounded-full px-4 py-2 text-[10px] font-bold">Popular</Badge>
                  <Badge variant="secondary" className="bg-white/50 hover:bg-white text-slate-500 border-none rounded-full px-4 py-2 text-[10px] font-bold">New</Badge>
                  <Badge variant="secondary" className="bg-white/50 hover:bg-white text-slate-500 border-none rounded-full px-4 py-2 text-[10px] font-bold">Short Plans</Badge>
                </div>
              </div>

              <div className="space-y-8">
                <h3 className="text-3xl font-headline font-bold text-slate-900">Browse By Topic</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { id: 'Hope', img: hopeImage },
                    { id: 'Faith', img: faithImage },
                    { id: 'Peace', img: peaceImage },
                    { id: 'Love', img: loveImage }
                  ].map((topic) => (
                    <div key={topic.id} className="relative aspect-square rounded-[2rem] overflow-hidden group cursor-pointer shadow-lg">
                      <Image
                        src={topic.img?.imageUrl || ''}
                        alt={topic.id}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        data-ai-hint={topic.img?.imageHint}
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-white text-xl font-headline font-bold drop-shadow-md">{topic.id}</span>
                      </div>
                    </div>
                  ))}
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
