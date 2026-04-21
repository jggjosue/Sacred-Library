
"use client";

import React from 'react';
import { TrendingUp, Heart, GraduationCap, Users, HeartHandshake, Music } from 'lucide-react';
import { cn } from '@/lib/utils';

const interests = [
  { id: 'growth', label: 'Spiritual Growth', icon: TrendingUp },
  { id: 'encouragement', label: 'Daily Encouragement', icon: Heart },
  { id: 'bible', label: 'Bible Study', icon: GraduationCap },
  { id: 'community', label: 'Community', icon: Users },
  { id: 'service', label: 'Service & Missions', icon: HeartHandshake },
  { id: 'worship', label: 'Worship', icon: Music },
];

export function InterestsPicker() {
  const [selected, setSelected] = React.useState('encouragement');

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-headline font-bold mb-4">Personalize Your Experience</h2>
        <p className="text-muted-foreground text-lg mb-12 max-w-2xl mx-auto">
          Select your interests to help us recommend the best content for you.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {interests.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelected(item.id)}
              className={cn(
                "group relative flex flex-col items-center justify-center p-12 rounded-[2.5rem] transition-all duration-300 border-2",
                selected === item.id 
                  ? "border-primary bg-primary/[0.02] shadow-xl shadow-primary/5 scale-[1.02]" 
                  : "border-transparent bg-slate-50/50 hover:bg-slate-100/80"
              )}
            >
              <div className={cn(
                "w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-all duration-300",
                selected === item.id 
                  ? "bg-primary text-white shadow-lg shadow-primary/20" 
                  : "bg-white text-muted-foreground group-hover:text-primary shadow-sm"
              )}>
                <item.icon className="w-8 h-8" />
              </div>
              <span className={cn(
                "text-xl font-medium transition-colors",
                selected === item.id ? "text-primary" : "text-foreground"
              )}>
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
