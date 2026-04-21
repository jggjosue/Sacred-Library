
"use client";

import React from 'react';
import { Sparkles, BookOpen } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useI18n } from '@/components/providers/i18n-provider';

export function DiscoverPath() {
  const { t } = useI18n();

  const paths = [
    {
      title: t('discover.verseTitle'),
      description: t('discover.verseDesc'),
      icon: Sparkles,
    },
    {
      title: t('discover.plansTitle'),
      description: t('discover.plansDesc'),
      icon: BookOpen,
    },
  ];

  return (
    <section className="py-24 bg-muted/10">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-5xl md:text-6xl font-headline font-bold mb-6 text-foreground">{t('discover.title')}</h2>
        <p className="text-muted-foreground text-xl max-w-3xl mx-auto mb-16 leading-relaxed">
          {t('discover.description')}
        </p>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {paths.map((path, idx) => (
            <Card key={idx} className="border-border shadow-2xl shadow-slate-200/60 dark:shadow-none rounded-[3rem] p-8 md:p-12 hover:scale-[1.01] transition-all duration-300 bg-card">
              <CardContent className="flex flex-col items-center text-center space-y-6 pt-0">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <path.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-headline font-bold text-foreground">{path.title}</h3>
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
