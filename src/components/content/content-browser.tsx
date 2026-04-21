
"use client";

import React from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
      <div className="max-w-7xl mx-auto px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-headline font-bold mb-4 text-foreground">Explore the Collection</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover a rich tapestry of spiritual resources curated to nourish your soul and guide your journey.
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full relative"
        >
          <CarouselContent className="-ml-4 md:-ml-8">
            {categories.map((cat) => (
              <CarouselItem key={cat.id} className="pl-4 md:pl-8 md:basis-1/2 lg:basis-1/3">
                <Card className="group cursor-pointer overflow-hidden border-border bg-card hover:shadow-xl transition-all duration-300 h-full flex flex-col">
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
                  <CardHeader className="flex-1">
                    <CardTitle className="font-headline text-2xl text-card-foreground">{cat.title}</CardTitle>
                    <CardDescription className="text-muted-foreground">{cat.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-end pt-0">
                    <div className="flex items-center text-primary font-medium group-hover:translate-x-1 transition-transform">
                      Browse Collection <ChevronRight className="w-4 h-4 ml-1" />
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-6 h-12 w-12 bg-background/80 backdrop-blur-sm border-slate-200 dark:border-white/10 hover:bg-primary hover:text-white transition-all shadow-lg" />
          <CarouselNext className="-right-6 h-12 w-12 bg-background/80 backdrop-blur-sm border-slate-200 dark:border-white/10 hover:bg-primary hover:text-white transition-all shadow-lg" />
        </Carousel>
      </div>
    </section>
  );
}
