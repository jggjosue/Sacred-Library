
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
import { useI18n } from '@/components/providers/i18n-provider';

const inspirationItems = [
  { id: 'inspiration-1', translationKey: 'inspiration.item1' },
  { id: 'inspiration-2', translationKey: 'inspiration.item2' },
  { id: 'inspiration-3', translationKey: 'inspiration.item3' },
  { id: 'inspiration-4', translationKey: 'inspiration.item4' },
  { id: 'inspiration-5', translationKey: 'inspiration.item5' },
  { id: 'inspiration-6', translationKey: 'inspiration.item6' },
  { id: 'inspiration-7', translationKey: 'inspiration.item7' },
  { id: 'inspiration-8', translationKey: 'inspiration.item8' },
  { id: 'inspiration-9', translationKey: 'inspiration.item9' },
  { id: 'inspiration-10', translationKey: 'inspiration.item10' },
  { id: 'inspiration-11', translationKey: 'inspiration.item11' },
  { id: 'inspiration-12', translationKey: 'inspiration.item12' },
  { id: 'inspiration-13', translationKey: 'inspiration.item13' },
  { id: 'inspiration-14', translationKey: 'inspiration.item14' },
  { id: 'inspiration-15', translationKey: 'inspiration.item15' },
];

export function InspirationCarousel() {
  const { t } = useI18n();

  return (
    <section className="py-24 bg-slate-50/50 dark:bg-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-12 md:px-16">
        <div className="text-center mb-16 space-y-4 px-6">
          <h2 className="text-4xl md:text-5xl font-headline font-bold text-foreground">
            {t('inspiration.title')}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('inspiration.subtitle')}
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
                              alt={t(`${item.translationKey}.title`)}
                              fill
                              className="object-cover"
                              data-ai-hint={imageData.imageHint}
                            />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        </div>
                        <div className="p-8 space-y-3">
                          <h3 className="text-2xl font-headline font-bold text-card-foreground">
                            {t(`${item.translationKey}.title`)}
                          </h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {t(`${item.translationKey}.desc`)}
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
