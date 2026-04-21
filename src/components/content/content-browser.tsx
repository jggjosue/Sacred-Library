
"use client";

import React from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';

const categories = [
  {
    id: 'scripture',
    title: 'Holy Scripture',
    description: 'Explore ancient wisdom and sacred texts.',
    image: PlaceHolderImages.find(img => img.id === 'scripture-cat'),
    count: '30,000+ Verses'
  },
  {
    id: 'devotionals',
    title: 'Daily Devotionals',
    description: 'Inspiring reflections for your morning walk.',
    image: PlaceHolderImages.find(img => img.id === 'devotional-cat'),
    count: '500+ Guides'
  },
  {
    id: 'plans',
    title: 'Guided Plans',
    description: 'Structured paths for spiritual growth.',
    image: PlaceHolderImages.find(img => img.id === 'plans-cat'),
    count: '50+ Paths'
  }
];

export function ContentBrowser() {
  return (
    <section id="explore" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-headline font-bold mb-4 text-foreground">Explore the Collection</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover a rich tapestry of spiritual resources curated to nourish your soul and guide your journey.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <Card key={cat.id} className="group cursor-pointer overflow-hidden border-border bg-card hover:shadow-xl transition-all duration-300">
              <div className="relative h-48 overflow-hidden">
                {cat.image?.imageUrl && (
                  <Image
                    src={cat.image.imageUrl}
                    alt={cat.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    data-ai-hint={cat.image.imageHint}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <span className="text-xs font-bold uppercase tracking-wider bg-primary/80 px-2 py-1 rounded">
                    {cat.count}
                  </span>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="font-headline text-2xl text-card-foreground">{cat.title}</CardTitle>
                <CardDescription className="text-muted-foreground">{cat.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-end">
                <div className="flex items-center text-primary font-medium group-hover:translate-x-1 transition-transform">
                  Browse Collection <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
