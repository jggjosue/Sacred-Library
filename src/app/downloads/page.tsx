
"use client";

import React from 'react';
import Image from 'next/image';
import { Navbar } from '@/components/navigation/navbar';
import { Footer } from '@/components/footer/footer';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Play, Trash2, X, ChevronDown } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';

const downloads = [
  {
    id: 1,
    title: "The Path to Forgiveness",
    author: "Max Lucado",
    type: "Audio",
    size: "45 MB",
    progress: 45,
    status: "downloading",
    image: PlaceHolderImages.find(img => img.id === 'plans-cat'),
  },
  {
    id: 2,
    title: "Strength in Stillness",
    author: "Charles Stanley",
    type: "Audio",
    size: "32 MB",
    progress: 75,
    status: "downloading",
    image: PlaceHolderImages.find(img => img.id === 'plan-mountains'),
  },
  {
    id: 3,
    title: "Morning Gratitude",
    author: "Sarah Young",
    type: "Audio",
    size: "15 MB",
    status: "completed",
    image: PlaceHolderImages.find(img => img.id === 'devotional-cat'),
  },
  {
    id: 4,
    title: "Finding Peace in His Presence",
    author: "John Piper",
    type: "Audio",
    size: "28 MB",
    status: "completed",
    image: PlaceHolderImages.find(img => img.id === 'library-wave'),
  },
  {
    id: 5,
    title: "A Heart of Service",
    author: "Joyce Meyer",
    type: "Audio",
    size: "22 MB",
    status: "completed",
    image: PlaceHolderImages.find(img => img.id === 'library-morning'),
  }
];

export default function DownloadsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-24">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div className="space-y-2">
            <h1 className="text-6xl font-headline font-bold text-slate-900 tracking-tight">
              Downloads
            </h1>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
              5 Items • 41.2 MB
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-slate-400">Sort by:</span>
            <Button variant="outline" className="rounded-full border-slate-100 bg-slate-50/50 text-slate-900 hover:bg-slate-100 font-medium text-sm h-10 px-5 gap-2">
              Recent
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </Button>
          </div>
        </header>

        {/* Downloads Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {downloads.map((item) => (
            <div key={item.id} className="group bg-white rounded-[2.5rem] p-8 border border-slate-50 shadow-2xl shadow-slate-100/50 transition-all duration-300 hover:scale-[1.02] flex flex-col h-full">
              <div className="flex gap-6 mb-8">
                <div className="relative w-24 h-24 shrink-0 rounded-[1.5rem] overflow-hidden">
                  <Image
                    src={item.image?.imageUrl || ''}
                    alt={item.title}
                    fill
                    className="object-cover"
                    data-ai-hint={item.image?.imageHint}
                  />
                </div>
                <div className="space-y-1 py-1">
                  <h3 className="text-xl font-headline font-bold text-slate-900 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm font-medium text-slate-400">
                    {item.author}
                  </p>
                  <p className="text-[10px] font-bold tracking-widest text-slate-300 uppercase">
                    {item.type} • {item.size}
                  </p>
                </div>
              </div>

              <div className="mt-auto pt-4">
                {item.status === 'downloading' ? (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-[10px] font-bold tracking-widest uppercase">
                      <span className="text-blue-600 animate-pulse">Downloading...</span>
                      <span className="text-slate-400">{item.progress}%</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <Progress value={item.progress} className="h-2 bg-slate-50 flex-1" />
                      {item.progress === 75 && (
                        <button className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors">
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <Button 
                      className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-100"
                    >
                      <Play className="w-5 h-5 fill-current" />
                    </Button>
                    <button className="text-slate-300 hover:text-red-500 transition-colors p-2">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
