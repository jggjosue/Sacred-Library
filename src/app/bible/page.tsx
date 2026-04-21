
"use client";

import React from 'react';
import { Navbar } from '@/components/navigation/navbar';
import { Footer } from '@/components/footer/footer';
import { 
  ChevronLeft, 
  ChevronRight, 
  Type, 
  Play, 
  Share2, 
  Highlighter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Verse = {
  number: number;
  text: string;
};

type Section = {
  title: string;
  verses: Verse[];
};

type BibleContent = {
  sections: Section[];
};

const BIBLE_DATA: Record<string, BibleContent> = {
  niv: {
    sections: [
      {
        title: "The Beginning",
        verses: [
          { number: 1, text: "In the beginning God created the heavens and the earth." },
          { number: 2, text: "Now the earth was formless and empty, darkness was over the surface of the deep, and the Spirit of God was hovering over the waters." },
        ]
      },
      {
        title: "The First Day",
        verses: [
          { number: 3, text: "And God said, \"Let there be light,\" and there was light." },
          { number: 4, text: "God saw that the light was good, and he separated the light from the darkness." },
          { number: 5, text: "God called the light \"day,\" and the darkness he called \"night.\" And there was evening, and there was morning—the first day." },
        ]
      }
    ]
  },
  kjv: {
    sections: [
      {
        title: "The Creation of the World",
        verses: [
          { number: 1, text: "In the beginning God created the heaven and the earth." },
          { number: 2, text: "And the earth was without form, and void; and darkness was upon the face of the deep. And the Spirit of God moved upon the face of the waters." },
        ]
      },
      {
        title: "Dividing the Light from Darkness",
        verses: [
          { number: 3, text: "And God said, Let there be light: and there was light." },
          { number: 4, text: "And God saw the light, that it was good: and God divided the light from the darkness." },
          { number: 5, text: "And God called the light Day, and the darkness he called Night. And the evening and the morning were the first day." },
        ]
      }
    ]
  },
  esv: {
    sections: [
      {
        title: "The History of Creation",
        verses: [
          { number: 1, text: "In the beginning, God created the heavens and the earth." },
          { number: 2, text: "The earth was without form and void, and darkness was over the face of the deep. And the Spirit of God was hovering over the face of the waters." },
        ]
      },
      {
        title: "Day One",
        verses: [
          { number: 3, text: "And God said, “Let there be light,” and there was light." },
          { number: 4, text: "And God saw that the light was good. And God separated the light from the darkness." },
          { number: 5, text: "God called the light Day, and the darkness he called Night. And there was evening and there was morning, the first day." },
        ]
      }
    ]
  }
};

export default function BiblePage() {
  const [version, setVersion] = React.useState<string>("niv");
  const currentContent = BIBLE_DATA[version] || BIBLE_DATA.niv;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-6 pt-32 pb-48">
        {/* Reader Header */}
        <header className="flex flex-col md:flex-row items-center justify-between mb-20 gap-6">
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

          <Select value={version} onValueChange={setVersion}>
            <SelectTrigger className="w-[280px] bg-slate-50 border-none rounded-full h-12 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">
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
        <div className="space-y-12 max-w-2xl mx-auto">
          {currentContent.sections.map((section, sIdx) => (
            <div key={sIdx} className="space-y-8">
              <h2 className="text-sm font-bold tracking-[0.3em] text-blue-600 uppercase border-b border-blue-100 pb-4">
                {section.title}
              </h2>
              <div className="space-y-8 text-xl leading-relaxed text-slate-700 font-body">
                {section.verses.map((verse) => (
                  <p key={verse.number} className="relative group">
                    <span className="text-slate-300 text-[10px] font-bold absolute -left-10 top-2 opacity-50 group-hover:opacity-100 transition-opacity">
                      {verse.number}
                    </span>
                    {verse.text}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Floating Tools Bar */}
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 bg-slate-100/80 backdrop-blur-xl border border-white/50 rounded-full p-2 flex items-center gap-2 shadow-2xl z-40">
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
