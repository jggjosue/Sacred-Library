
"use client";

import React from 'react';
import Image from 'next/image';
import { Navbar } from '@/components/navigation/navbar';
import { Footer } from '@/components/footer/footer';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Heart, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const categories = ["Verses", "Devotionals", "Plans"];

const favoritePlans = [
  {
    title: "Journey Through Psalms",
    duration: "30-DAY PLAN",
    progress: 40,
    image: PlaceHolderImages.find(img => img.id === 'plan-mountains'),
  },
  {
    title: "Finding Peace in Chaos",
    duration: "14-DAY PLAN",
    progress: 85,
    image: PlaceHolderImages.find(img => img.id === 'plan-sunset'),
  },
  {
    title: "Wisdom of Proverbs",
    duration: "7-DAY PLAN",
    progress: 15,
    image: PlaceHolderImages.find(img => img.id === 'plan-forest'),
  }
];

export default function PlansPage() {
  const [activeCategory, setActiveCategory] = React.useState("Plans");

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-24">
        <header className="mb-16 space-y-10">
          <h1 className="text-5xl md:text-6xl font-headline font-bold text-slate-900 tracking-tight">
            Your Favorite Plans
          </h1>

          <div className="flex flex-wrap gap-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-10 py-4 rounded-full text-sm font-semibold transition-all duration-300",
                  activeCategory === cat
                    ? "bg-blue-600 text-white shadow-xl shadow-blue-200"
                    : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {favoritePlans.map((plan, idx) => (
            <div 
              key={idx} 
              className="group bg-white rounded-[3rem] overflow-hidden shadow-2xl shadow-slate-200/50 border border-slate-50 flex flex-col transition-all duration-500 hover:scale-[1.02]"
            >
              {/* Image Section */}
              <div className="relative h-72 overflow-hidden">
                <Image
                  src={plan.image?.imageUrl || ''}
                  alt={plan.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  data-ai-hint={plan.image?.imageHint}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                <div className="absolute top-6 right-6">
                  <button className="bg-white/20 backdrop-blur-md p-2.5 rounded-full text-white hover:bg-white/40 transition-colors">
                    <Heart className="w-5 h-5 fill-current" />
                  </button>
                </div>

                <div className="absolute bottom-8 left-8 right-8 text-white space-y-2">
                  <span className="text-[10px] font-bold tracking-[0.2em] opacity-80 uppercase">
                    {plan.duration}
                  </span>
                  <h3 className="text-2xl font-headline font-bold leading-tight">
                    {plan.title}
                  </h3>
                </div>
              </div>

              {/* Progress Section */}
              <div className="p-8 space-y-8 flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-[10px] font-bold tracking-widest uppercase">
                    <span className="text-slate-400">Progress</span>
                    <span className="text-blue-600">{plan.progress}%</span>
                  </div>
                  <Progress value={plan.progress} className="h-2 bg-slate-50" />
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full py-7 h-auto text-sm font-bold shadow-lg shadow-blue-200 group-hover:shadow-blue-300 transition-all">
                  Continue Plan
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
