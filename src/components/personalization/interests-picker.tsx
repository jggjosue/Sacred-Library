
"use client";

import React from 'react';
import { TrendingUp, Heart, GraduationCap, Users, HeartHandshake, Music } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useI18n } from '@/components/providers/i18n-provider';

export function InterestsPicker() {
  const [selected, setSelected] = React.useState('encouragement');
  const { t } = useI18n();

  const interests = [
    { id: 'growth', label: t('personalization.growth'), icon: TrendingUp },
    { id: 'encouragement', label: t('personalization.encouragement'), icon: Heart },
    { id: 'bible', label: t('personalization.bible'), icon: GraduationCap },
    { id: 'community', label: t('personalization.community'), icon: Users },
    { id: 'service', label: t('personalization.service'), icon: HeartHandshake },
    { id: 'worship', label: t('personalization.worship'), icon: Music },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-headline font-bold mb-4 text-foreground">{t('personalization.title')}</h2>
        <p className="text-muted-foreground text-lg mb-12 max-w-2xl mx-auto">
          {t('personalization.description')}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {interests.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelected(item.id)}
              className={cn(
                "group relative flex flex-col items-center justify-center p-12 rounded-[2.5rem] transition-all duration-300 border-2",
                selected === item.id 
                  ? "border-primary bg-primary/[0.05] shadow-xl shadow-primary/5 scale-[1.02]" 
                  : "border-transparent bg-muted/30 hover:bg-muted/50"
              )}
            >
              <div className={cn(
                "w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-all duration-300",
                selected === item.id 
                  ? "bg-primary text-white shadow-lg shadow-primary/20" 
                  : "bg-background text-muted-foreground group-hover:text-primary shadow-sm"
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
