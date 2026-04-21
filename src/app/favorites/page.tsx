
"use client";

import React from 'react';
import Image from 'next/image';
import { Navbar } from '@/components/navigation/navbar';
import { Footer } from '@/components/footer/footer';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Heart } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const filters = ["All", "Verses", "Devotionals", "Plans"];

const favorites = [
  {
    type: 'verse',
    content: '"I can do all things through him who gives me strength."',
    author: 'PHILIPPIANS 4:13',
  },
  {
    type: 'devotional',
    title: 'Peace in the Woods',
    category: 'DEVOTIONAL',
    image: PlaceHolderImages.find(img => img.id === 'plans-cat'),
  },
  {
    type: 'plan',
    title: 'Morning Wisdom',
    category: 'PLAN • 7 DAYS',
    image: PlaceHolderImages.find(img => img.id === 'ancient-scroll'),
  }
];

export default function FavoritesPage() {
  const [activeFilter, setActiveFilter] = React.useState("All");

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 pt-24 pb-12">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-6">
        <header className="mb-12 space-y-8">
          <h1 className="text-5xl md:text-6xl font-headline font-bold text-slate-900 dark:text-slate-100">
            Your Favorites
          </h1>

          <div className="flex flex-wrap gap-4">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  "px-8 py-3 rounded-full text-sm font-medium transition-all",
                  activeFilter === filter
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                    : "bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                )}
              >
                {filter}
              </button>
            ))}
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {favorites.map((fav, idx) => (
            <div key={idx} className="group relative transition-all duration-300 hover:scale-[1.02]">
              {fav.type === 'verse' ? (
                <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] p-10 h-80 flex flex-col justify-between shadow-xl shadow-slate-100/50">
                  <div className="space-y-6">
                    <p className="text-2xl font-headline italic leading-relaxed text-slate-700 dark:text-slate-300">
                      {fav.content}
                    </p>
                    <p className="text-xs font-bold tracking-[0.2em] text-slate-400 dark:text-slate-500 uppercase">
                      {fav.author}
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <button className="text-blue-600 hover:scale-110 transition-transform">
                      <Heart className="w-6 h-6 fill-blue-600" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="relative rounded-[2.5rem] overflow-hidden h-80 shadow-2xl">
                  <Image
                    src={fav.image?.imageUrl || ''}
                    alt={fav.title}
                    fill
                    className="object-cover"
                    data-ai-hint={fav.image?.imageHint}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  
                  <div className="absolute top-6 left-6">
                    <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider border border-white/20">
                      {fav.category}
                    </span>
                  </div>

                  <div className="absolute top-6 right-6">
                    <button className="text-white hover:scale-110 transition-transform">
                      <Heart className="w-6 h-6 fill-white" />
                    </button>
                  </div>

                  <div className="absolute bottom-8 left-8 right-8">
                    <h3 className="text-white text-2xl font-headline font-bold">
                      {fav.title}
                    </h3>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
