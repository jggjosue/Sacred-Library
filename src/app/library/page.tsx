
"use client";

import React from 'react';
import Image from 'next/image';
import { Navbar } from '@/components/navigation/navbar';
import { Footer } from '@/components/footer/footer';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Heart, ArrowRight } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const filters = ["Verses", "Devotionals", "Plans"];

const libraryItems = [
  {
    title: 'Morning Gratitude',
    author: 'BY SARAH YOUNG',
    quote: '"Find peace in the quiet moments before the day begins. Let your heart be filled with gratitude for the breath in your lungs and the light breaking over the horizon..."',
    image: PlaceHolderImages.find(img => img.id === 'library-morning'),
    active: true,
  },
  {
    title: 'Finding Stillness',
    author: 'BY JOHN MARK COMER',
    quote: '"In a world addicted to noise, stillness is an act of rebellion. It is in the quiet spaces that we finally hear the whispers of grace that guide our steps..."',
    image: PlaceHolderImages.find(img => img.id === 'library-wave'),
    active: false,
  }
];

export default function LibraryPage() {
  const [activeFilter, setActiveFilter] = React.useState("Devotionals");

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-24">
        <header className="mb-16 space-y-10">
          <h1 className="text-6xl font-headline font-bold text-slate-900 tracking-tight">
            Your Favorites
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
                  <Button 
                    className={cn(
                      "w-full rounded-full py-8 text-sm font-bold transition-all duration-300",
                      item.active 
                        ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200" 
                        : "bg-slate-50 hover:bg-slate-100 text-slate-900 shadow-none"
                    )}
                  >
                    Read Now
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
