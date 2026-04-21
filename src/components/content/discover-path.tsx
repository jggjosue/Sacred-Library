
"use client";

import React from 'react';
import { Sparkles, BookOpen } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const paths = [
  {
    title: 'Verse of the Day',
    description: 'Start your day with inspiration. A carefully selected passage to guide your morning thoughts.',
    icon: Sparkles,
  },
  {
    title: 'Reading Plans',
    description: 'Follow structured paths through Scripture. Tailored reading guides for deeper understanding.',
    icon: BookOpen,
  },
];

export function DiscoverPath() {
  return (
    <section className="py-24 bg-slate-50/30">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-5xl md:text-6xl font-headline font-bold mb-6">Discover Your Path</h2>
        <p className="text-muted-foreground text-xl max-w-3xl mx-auto mb-16 leading-relaxed">
          Your sanctuary for reflection. Begin a journey of structured growth, daily inspiration, and thoughtful devotion.
        </p>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {paths.map((path, idx) => (
            <Card key={idx} className="border-none shadow-2xl shadow-slate-200/60 rounded-[3rem] p-8 md:p-12 hover:scale-[1.01] transition-all duration-300 bg-white">
              <CardContent className="flex flex-col items-center text-center space-y-6 pt-0">
                <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center text-primary/80">
                  <path.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-headline font-bold">{path.title}</h3>
                <p className="text-muted-foreground text-lg leading-relaxed px-4">
                  {path.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
