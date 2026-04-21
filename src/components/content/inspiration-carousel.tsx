
"use client";

import React from 'react';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { PlaceHolderImages } from '@/lib/placeholder-images';

const inspirationItems = [
  { id: 'inspiration-1', title: 'Eternal Peace', description: 'Finding tranquility in the vastness of the heavens.' },
  { id: 'inspiration-2', title: 'New Beginnings', description: 'Every dawn brings a fresh opportunity for grace.' },
  { id: 'inspiration-3', title: 'Steadfast Faith', description: 'Remaining rooted even when the seasons change.' },
  { id: 'inspiration-4', title: 'Sacred Light', description: 'Letting the light of truth illuminate your path.' },
  { id: 'inspiration-5', title: 'Abundant Joy', description: 'Celebrating the beauty in every small flower.' },
  { id: 'inspiration-6', title: 'Reflective Stillness', description: 'Seeing clearly when the heart is quiet.' },
  { id: 'inspiration-7', title: 'Unending Hope', description: 'Walking towards a future filled with promise.' },
  { id: 'inspiration-8', title: 'Inner Strength', description: 'A single flame can conquer any darkness.' },
  { id: 'inspiration-9', title: 'Pure Grace', description: 'The gentle touch of peace in a winter world.' },
  { id: 'inspiration-10', title: 'Spiritual Freedom', description: 'Rising above the noise to find higher perspectives.' },
  { id: 'inspiration-11', title: 'Constant Flow', description: 'The steady movement of divine love in our lives.' },
  { id: 'inspiration-12', title: 'Word of Life', description: 'Finding comfort and wisdom in sacred spaces.' },
  { id: 'inspiration-13', title: 'Faithful Promise', description: 'A reminder of the beauty after the storm.' },
  { id: 'inspiration-14', title: 'Strong Foundations', description: 'Building a life on the bridges of the past.' },
  { id: 'inspiration-15', title: 'Guiding Grace', description: 'A constant beacon in the shifting tides of life.' },
];

export function InspirationCarousel() {
  return (
    <section className="py-24 bg-slate-50/50 dark:bg-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-12 md:px-16">
        <div className="text-center mb-16 space-y-4 px-6">
          <h2 className="text-4xl md:text-5xl font-headline font-bold text-foreground">Moments of Inspiration</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A curated gallery of spiritual reflections to guide your journey through beauty and truth.
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full relative"
        >
          <CarouselContent className="-ml-4 md:-ml-6">
            {inspirationItems.map((item, index) => {
              const imageData = PlaceHolderImages.find(img => img.id === item.id);
              return (
                <CarouselItem key={index} className="pl-4 md:pl-6 md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card className="overflow-hidden rounded-[2.5rem] border-none shadow-xl bg-card transition-all duration-300 hover:scale-[1.02]">
                      <CardContent className="p-0 flex flex-col h-full">
                        <div className="relative aspect-[4/3] w-full">
                          {imageData?.imageUrl && (
                            <Image
                              src={imageData.imageUrl}
                              alt={item.title}
                              fill
                              className="object-cover"
                              data-ai-hint={imageData.imageHint}
                            />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        </div>
                        <div className="p-8 space-y-3">
                          <h3 className="text-2xl font-headline font-bold text-card-foreground">
                            {item.title}
                          </h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="-left-6 md:-left-12 h-12 w-12 bg-background/80 backdrop-blur-sm border-slate-200 dark:border-white/10 hover:bg-primary hover:text-white transition-all shadow-lg" />
          <CarouselNext className="-right-6 md:-right-12 h-12 w-12 bg-background/80 backdrop-blur-sm border-slate-200 dark:border-white/10 hover:bg-primary hover:text-white transition-all shadow-lg" />
        </Carousel>
      </div>
    </section>
  );
}
