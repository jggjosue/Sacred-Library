
"use client";

import React from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Navbar } from '@/components/navigation/navbar';
import { Footer } from '@/components/footer/footer';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, Circle, ArrowLeft, Play } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useI18n } from '@/components/providers/i18n-provider';
import Link from 'next/link';

export default function PlanDetailPage() {
  const { id } = useParams();
  const { t } = useI18n();
  
  const heroImage = PlaceHolderImages.find(img => img.id === 'plan-mountains');

  // Simulated plan data based on ID
  const planData = {
    title: t(`plans.${id}.title`),
    description: t(`plans.${id}.desc`),
    progress: 40,
    currentDay: 12,
    totalDays: 30,
    days: Array.from({ length: 15 }, (_, i) => ({
      number: i + 1,
      title: `Day ${i + 1}: Reflection & Wisdom`,
      completed: i < 11,
      active: i === 11
    }))
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-24">
        <Link href="/plans" className="inline-flex items-center text-sm font-bold text-slate-400 hover:text-blue-600 transition-colors mb-12">
          <ArrowLeft className="w-4 h-4 mr-2" />
          BACK TO PLANS
        </Link>

        <div className="grid lg:grid-cols-12 gap-16">
          {/* Plan Header & Progress */}
          <div className="lg:col-span-8 space-y-12">
            <header className="space-y-8">
              <div className="relative h-[400px] w-full rounded-[3.5rem] overflow-hidden shadow-2xl">
                {heroImage && (
                  <Image
                    src={heroImage.imageUrl}
                    alt={planData.title}
                    fill
                    className="object-cover"
                    priority
                  />
                )}
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute bottom-12 left-12 right-12 text-white space-y-4">
                  <h1 className="text-5xl md:text-7xl font-headline font-bold leading-tight">
                    {planData.title}
                  </h1>
                  <p className="text-lg opacity-80 max-w-xl font-medium">
                    {planData.description}
                  </p>
                </div>
              </div>

              <div className="bg-slate-50/50 rounded-[2.5rem] p-10 space-y-6">
                <div className="flex justify-between items-end">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Your Progress</p>
                    <h3 className="text-3xl font-headline font-bold text-slate-900">
                      Day {planData.currentDay} of {planData.totalDays}
                    </h3>
                  </div>
                  <span className="text-2xl font-headline font-bold text-blue-600">{planData.progress}%</span>
                </div>
                <Progress value={planData.progress} className="h-3 bg-white shadow-inner" />
              </div>
            </header>

            {/* Daily Content List */}
            <section className="space-y-8">
              <h2 className="text-3xl font-headline font-bold text-slate-900">Daily Journey</h2>
              <div className="space-y-4">
                {planData.days.map((day) => (
                  <div 
                    key={day.number}
                    className={`flex items-center gap-6 p-6 rounded-2xl border transition-all ${
                      day.active 
                        ? "bg-blue-50 border-blue-200 shadow-lg shadow-blue-100/50 ring-1 ring-blue-300" 
                        : "bg-white border-slate-100"
                    }`}
                  >
                    <div className="shrink-0">
                      {day.completed ? (
                        <CheckCircle2 className="w-8 h-8 text-blue-600" />
                      ) : day.active ? (
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                          <Play className="w-4 h-4 fill-current ml-0.5" />
                        </div>
                      ) : (
                        <Circle className="w-8 h-8 text-slate-200" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <h4 className={`font-bold ${day.completed ? "text-slate-400 line-through" : "text-slate-900"}`}>
                        {day.title}
                      </h4>
                      {day.active && <p className="text-xs text-blue-600 font-bold uppercase tracking-widest mt-1">Ready to start</p>}
                    </div>

                    {day.active && (
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 font-bold text-xs h-10">
                        START READING
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Sidebar */}
          <aside className="lg:col-span-4 space-y-10">
            <div className="bg-slate-900 rounded-[3rem] p-10 text-white space-y-8">
              <div className="space-y-4">
                <h3 className="text-2xl font-headline font-bold">About this Plan</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Join thousands of others in this structured journey through sacred wisdom. Designed to be completed in small daily steps, this plan will help you build a consistent habit of reflection and spiritual growth.
                </p>
              </div>

              <div className="space-y-6 pt-6 border-t border-white/10">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Duration</span>
                  <span className="font-bold">{planData.totalDays} Days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Category</span>
                  <span className="font-bold">Bible Study</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Participants</span>
                  <span className="font-bold">12.4k Active</span>
                </div>
              </div>

              <Button variant="outline" className="w-full rounded-full border-white/20 hover:bg-white/10 text-white h-12 font-bold text-xs">
                RESET PROGRESS
              </Button>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
