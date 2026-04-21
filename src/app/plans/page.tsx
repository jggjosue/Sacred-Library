
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

const categories = ["All Plans", "Emotional Help", "Scripture Journey"];

const readingPlans = [
  {
    title: "Enfrentando la Ansiedad",
    duration: "7-DAY PLAN",
    progress: 0,
    category: "Emotional Help",
    image: PlaceHolderImages.find(img => img.id === 'plan-ansiedad'),
  },
  {
    title: "Enfrentando la Depresión",
    duration: "10-DAY PLAN",
    progress: 0,
    category: "Emotional Help",
    image: PlaceHolderImages.find(img => img.id === 'plan-depresion'),
  },
  {
    title: "Enfrentando el Miedo",
    duration: "5-DAY PLAN",
    progress: 20,
    category: "Emotional Help",
    image: PlaceHolderImages.find(img => img.id === 'plan-miedo'),
  },
  {
    title: "Enfrentando el Duelo",
    duration: "15-DAY PLAN",
    progress: 0,
    category: "Emotional Help",
    image: PlaceHolderImages.find(img => img.id === 'plan-duelo'),
  },
  {
    title: "Enfrentando la Soledad",
    duration: "7-DAY PLAN",
    progress: 0,
    category: "Emotional Help",
    image: PlaceHolderImages.find(img => img.id === 'plan-soledad'),
  },
  {
    title: "Journey Through Psalms",
    duration: "30-DAY PLAN",
    progress: 40,
    category: "Scripture Journey",
    image: PlaceHolderImages.find(img => img.id === 'plan-mountains'),
  }
];

export default function PlansPage() {
  const [activeCategory, setActiveCategory] = React.useState("All Plans");

  const filteredPlans = readingPlans.filter(plan => 
    activeCategory === "All Plans" || plan.category === activeCategory
  );

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-24">
        <header className="mb-16 space-y-10">
          <div className="space-y-4">
            <span className="text-[10px] font-bold tracking-[0.3em] text-blue-600 uppercase">
              RECURSOS ESPIRITUALES
            </span>
            <h1 className="text-5xl md:text-7xl font-headline font-bold text-slate-900 tracking-tight">
              Planes de Lectura
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl font-body">
              Encuentra consuelo y guía a través de la Palabra de Dios en cada circunstancia de la vida.
            </p>
          </div>

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
          {filteredPlans.map((plan, idx) => (
            <div 
              key={idx} 
              className="group bg-white rounded-[3rem] overflow-hidden shadow-2xl shadow-slate-200/50 border border-slate-50 flex flex-col transition-all duration-500 hover:scale-[1.02] animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDelay: `${idx * 100}ms` }}
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
                    <Heart className="w-5 h-5" />
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
                    <span className="text-slate-400">Progreso</span>
                    <span className="text-blue-600">{plan.progress}%</span>
                  </div>
                  <Progress value={plan.progress} className="h-2 bg-slate-50" />
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full py-7 h-auto text-sm font-bold shadow-lg shadow-blue-200 group-hover:shadow-blue-300 transition-all">
                  {plan.progress > 0 ? "Continuar Plan" : "Iniciar Plan"}
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
