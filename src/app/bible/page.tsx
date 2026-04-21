
"use client";

import React from 'react';
import { Navbar } from '@/components/navigation/navbar';
import { Footer } from '@/components/footer/footer';
import { 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Type, 
  Play, 
  Share2, 
  Highlighter,
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function BiblePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-6 pt-32 pb-48">
        {/* Reader Header */}
        <header className="flex items-center justify-between mb-20">
          <div className="flex items-center gap-8">
            <button className="text-slate-300 hover:text-blue-600 transition-colors">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h1 className="text-5xl font-headline font-bold text-slate-900 tracking-tight">
              Genesis 1
            </h1>
            <button className="text-slate-300 hover:text-blue-600 transition-colors">
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          <Select defaultValue="niv">
            <SelectTrigger className="w-[240px] bg-slate-50 border-none rounded-full h-12 px-6 text-xs font-medium text-slate-500">
              <SelectValue placeholder="Select Version" />
            </SelectTrigger>
            <SelectContent className="rounded-2xl border-slate-100">
              <SelectItem value="niv">New International Version (NIV)</SelectItem>
              <SelectItem value="kjv">King James Version (KJV)</SelectItem>
              <SelectItem value="esv">English Standard Version (ESV)</SelectItem>
            </SelectContent>
          </Select>
        </header>

        {/* Scripture Content */}
        <div className="space-y-8 text-xl leading-relaxed text-slate-700 font-body max-w-2xl mx-auto">
          <p className="relative">
            <span className="text-slate-300 text-sm font-bold absolute -left-8 top-1">1</span>
            In the beginning God created the heavens and the earth.
          </p>
          
          <p className="relative">
            <span className="text-slate-300 text-sm font-bold absolute -left-8 top-1">2</span>
            Now the earth was formless and empty, darkness was over the surface of the deep, and the Spirit of God was hovering over the waters.
          </p>

          <p className="relative">
            <span className="text-slate-300 text-sm font-bold absolute -left-8 top-1">3</span>
            And God said, "Let there be light," and there was light.
          </p>

          <p className="relative">
            <span className="text-slate-300 text-sm font-bold absolute -left-8 top-1">4</span>
            God saw that the light was good, and he separated the light from the darkness.
          </p>

          <p className="relative">
            <span className="text-slate-300 text-sm font-bold absolute -left-8 top-1">5</span>
            God called the light "day," and the darkness he called "night." And there was evening, and there was morning—the first day.
          </p>
        </div>

        {/* Floating Tools Bar */}
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 bg-slate-100/80 backdrop-blur-xl border border-white/50 rounded-full p-2 flex items-center gap-2 shadow-2xl">
          <Button variant="ghost" size="icon" className="w-12 h-12 rounded-full text-slate-600 hover:bg-white hover:text-blue-600 transition-all">
            <Type className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="w-12 h-12 rounded-full text-slate-600 hover:bg-white hover:text-blue-600 transition-all">
            <Play className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="w-12 h-12 rounded-full text-slate-600 hover:bg-white hover:text-blue-600 transition-all">
            <Share2 className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="w-12 h-12 rounded-full text-slate-600 hover:bg-white hover:text-blue-600 transition-all">
            <Highlighter className="w-5 h-5" />
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
