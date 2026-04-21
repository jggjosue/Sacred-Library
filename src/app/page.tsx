
"use client";

import React from 'react';
import Image from 'next/image';
import { Navbar } from '@/components/navigation/navbar';
import { ContentBrowser } from '@/components/content/content-browser';
import { JournalSection } from '@/components/journal/journal-section';
import { Footer } from '@/components/footer/footer';
import { InterestsPicker } from '@/components/personalization/interests-picker';
import { DiscoverPath } from '@/components/content/discover-path';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Quote } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const DAILY_VERSE = "Be still, and know that I am God. (Psalm 46:10)";

const heroItems = [
  { id: 'hero-library', title: DAILY_VERSE, description: 'Step into the quiet halls of infinite wisdom. Explore, reflect, and grow in your spiritual journey.', badge: 'Daily Wisdom' },
  { id: 'inspiration-1', title: 'Eternal Peace', description: 'Finding tranquility in the vastness of the heavens.', badge: 'Inspiration' },
  { id: 'inspiration-2', title: 'New Beginnings', description: 'Every dawn brings a fresh opportunity for grace.', badge: 'Inspiration' },
  { id: 'inspiration-3', title: 'Steadfast Faith', description: 'Remaining rooted even when the seasons change.', badge: 'Inspiration' },
  { id: 'inspiration-4', title: 'Sacred Light', description: 'Letting the light of truth illuminate your path.', badge: 'Inspiration' },
  { id: 'inspiration-5', title: 'Abundant Joy', description: 'Celebrating the beauty in every small flower.', badge: 'Inspiration' },
  { id: 'inspiration-6', title: 'Reflective Stillness', description: 'Seeing clearly when the heart is quiet.', badge: 'Inspiration' },
  { id: 'inspiration-7', title: 'Unending Hope', description: 'Walking towards a future filled with promise.', badge: 'Inspiration' },
  { id: 'inspiration-8', title: 'Inner Strength', description: 'A single flame can conquer any darkness.', badge: 'Inspiration' },
  { id: 'inspiration-9', title: 'Pure Grace', description: 'The gentle touch of peace in a winter world.', badge: 'Inspiration' },
  { id: 'inspiration-10', title: 'Spiritual Freedom', description: 'Rising above the noise to find higher perspectives.', badge: 'Inspiration' },
  { id: 'inspiration-11', title: 'Constant Flow', description: 'The steady movement of divine love in our lives.', badge: 'Inspiration' },
  { id: 'inspiration-12', title: 'Word of Life', description: 'Finding comfort and wisdom in sacred spaces.', badge: 'Inspiration' },
  { id: 'inspiration-13', title: 'Faithful Promise', description: 'A reminder of the beauty after the storm.', badge: 'Inspiration' },
  { id: 'inspiration-14', title: 'Strong Foundations', description: 'Building a life on the bridges of the past.', badge: 'Inspiration' },
  { id: 'inspiration-15', title: 'Guiding Grace', description: 'A constant beacon in the shifting tides of life.', badge: 'Inspiration' },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Carousel Section */}
      <section className="relative min-h-screen w-full overflow-hidden">
        <Carousel
          opts={{
            loop: true,
          }}
          className="w-full h-full"
        >
          <CarouselContent className="h-full ml-0">
            {heroItems.map((item, index) => {
              const imageData = PlaceHolderImages.find(img => img.id === item.id);
              return (
                <CarouselItem key={index} className="h-full pl-0 basis-full min-h-screen">
                  <div className="relative h-screen w-full flex items-center justify-center">
                    {imageData?.imageUrl && (
                      <Image
                        src={imageData.imageUrl}
                        alt={item.title}
                        fill
                        className="object-cover"
                        priority={index === 0}
                        data-ai-hint={imageData.imageHint}
                      />
                    )}
                    <div className="absolute inset-0 bg-primary/40 dark:bg-black/70 mix-blend-multiply" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/10 to-background" />
                    
                    <div className="relative z-10 max-w-4xl mx-auto px-6 py-12 text-center text-white space-y-8 animate-in fade-in zoom-in duration-700">
                      <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                        <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                        <span className="text-sm font-medium tracking-wide uppercase">{item.badge}</span>
                      </div>
                      
                      <div className="space-y-6">
                        <Quote className="w-10 h-10 mx-auto text-accent/80 opacity-60" />
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-bold leading-tight drop-shadow-2xl px-4">
                          {item.title}
                        </h1>
                      </div>
                      
                      <p className="text-lg md:text-2xl font-light text-white/90 max-w-2xl mx-auto leading-relaxed">
                        {item.description}
                      </p>
                      
                      <div className="pt-12">
                        <a 
                          href="#explore" 
                          className="bg-accent text-white px-10 py-4 md:px-12 md:py-5 rounded-full font-bold text-lg hover:bg-accent/90 transition-all hover:scale-105 inline-block shadow-2xl shadow-accent/40 ring-4 ring-white/10"
                        >
                          Start Exploring
                        </a>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          
          {/* Custom Arrows positioned on the sides */}
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 md:pl-12 z-30">
            <CarouselPrevious className="relative left-0 h-12 w-12 md:h-16 md:w-16 bg-white/10 hover:bg-white/30 border-white/20 text-white backdrop-blur-xl transition-all shadow-2xl translate-x-0" />
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-4 md:pr-12 z-30">
            <CarouselNext className="relative right-0 h-12 w-12 md:h-16 md:w-16 bg-white/10 hover:bg-white/30 border-white/20 text-white backdrop-blur-xl transition-all shadow-2xl translate-x-0" />
          </div>
        </Carousel>
      </section>

      {/* Content Browsing Section */}
      <ContentBrowser />

      {/* Journaling Section */}
      <JournalSection dailyVerse={DAILY_VERSE} />

      {/* Community Placeholder */}
      <section className="py-24 bg-primary/5 dark:bg-white/5">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-card p-12 rounded-[3rem] border border-border shadow-xl space-y-6">
            <h2 className="text-4xl font-headline font-bold text-card-foreground">Community Circles</h2>
            <p className="text-muted-foreground text-lg">
              Our shared spaces for prayer, discussion, and fellowship are currently being prepared. Join our waitlist to be the first to know when we open our doors.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-6 py-4 rounded-full border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
              <button className="bg-primary text-primary-foreground px-10 py-4 rounded-full font-bold whitespace-nowrap shadow-lg hover:bg-primary/90 transition-colors">
                Notify Me
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Personalization Section */}
      <InterestsPicker />

      {/* Discover Path Section */}
      <DiscoverPath />

      <Footer />
    </main>
  );
}
