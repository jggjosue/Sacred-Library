
"use client";

import React from 'react';
import Image from 'next/image';
import { Navbar } from '@/components/navigation/navbar';
import { Footer } from '@/components/footer/footer';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { 
  Heart, 
  Share2, 
  Play, 
  Pause, 
  RotateCcw, 
  RotateCw, 
  Download, 
  Settings, 
  MoreVertical,
  ThumbsUp,
  Reply
} from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function DevotionsPage() {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const heroImage = PlaceHolderImages.find(img => img.id === 'psalms-hero');

  const reflections = [
    {
      id: 1,
      name: 'Jane D.',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      time: '2 hours ago',
      content: 'This reading was exactly what I needed today. I\'ve been feeling overwhelmed, but taking a moment to focus on the simple blessing of a quiet morning changed my whole perspective.',
      likes: 12
    },
    {
      id: 2,
      name: 'Mark P.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      time: '5 hours ago',
      content: '"Gratitude is not a denial of difficulties, but a profound declaration of trust." Wow. That quote will stick with me throughout the week.',
      likes: 8
    },
    {
      id: 3,
      name: 'Emily R.',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      time: 'Yesterday',
      content: 'Thank you for this beautiful reminder. Sometimes the hardest thing is to pause before the rush begins.',
      likes: 24
    }
  ];

  return (
    <div className="min-h-screen bg-white pb-32">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-6 pt-32 pb-24">
        {/* Header section */}
        <header className="text-center space-y-4 mb-12">
          <span className="text-[10px] font-bold tracking-[0.3em] text-blue-600 uppercase">
            DAILY DEVOTIONAL
          </span>
          <h1 className="text-5xl md:text-6xl font-headline font-bold text-slate-900 leading-tight">
            Morning Gratitude
          </h1>
          <p className="text-sm font-headline italic text-slate-400">
            by Sarah Young · October 24
          </p>
        </header>

        {/* Hero Image */}
        <div className="relative h-[450px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl mb-20">
          {heroImage?.imageUrl && (
            <Image
              src={heroImage.imageUrl}
              alt="Misty Forest"
              fill
              className="object-cover"
              priority
              data-ai-hint={heroImage.imageHint || "misty forest"}
            />
          )}
        </div>

        {/* Content Body */}
        <div className="max-w-2xl mx-auto space-y-12">
          <div className="text-lg leading-relaxed text-slate-700 font-body">
            <p className="relative">
              <span className="float-left text-7xl font-headline font-bold text-blue-600 mr-4 mt-2 leading-[0.8]">A</span>
              s the dawn breaks, it brings with it a quiet promise - a fresh canvas painted with the soft hues of morning. Before the rush of the day demands your attention, take a moment to simply breathe. In this stillness, there is a profound opportunity to cultivate gratitude. Often, we search for grand miracles, overlooking the quiet blessings that sustain us daily.
            </p>
          </div>

          <div className="text-lg leading-relaxed text-slate-700 font-body">
            <p>
              Consider the air filling your lungs, the warmth of the sun, or the simple comfort of a familiar routine. These are not mundane details; they are the fingerprints of God's steadfast love, meticulously woven into the fabric of your existence. When we shift our focus from what we lack to what we have been generously given, our perspective transforms.
            </p>
          </div>

          {/* Styled Scripture Box */}
          <div className="my-16 p-12 bg-blue-50/50 rounded-[3rem] relative overflow-hidden">
            <blockquote className="space-y-6">
              <p className="text-2xl font-headline italic text-slate-800 leading-relaxed text-center">
                "Give thanks in all circumstances; for this is God's will for you in Christ Jesus."
              </p>
              <cite className="block text-center text-xs font-bold tracking-widest text-blue-600 not-italic uppercase">
                — 1 Thessalonians 5:18
              </cite>
            </blockquote>
          </div>

          <div className="text-lg leading-relaxed text-slate-700 font-body">
            <p>
              Gratitude is not a denial of difficulties, but a profound declaration of trust. It is choosing to see His light even when shadows stretch long. Today, let gratitude be the lens through which you view your world. Let it anchor you in peace and propel you forward with a joyful heart, knowing you are deeply loved and eternally held.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 py-8 border-b border-slate-100">
            <Button variant="secondary" className="bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-full px-8 py-6 h-auto text-xs font-bold gap-2">
              <Heart className="w-4 h-4" />
              Save to Library
            </Button>
            <Button variant="secondary" className="bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-full px-8 py-6 h-auto text-xs font-bold gap-2">
              <Share2 className="w-4 h-4" />
              Share
            </Button>
          </div>

          {/* Community Reflections Section */}
          <section className="space-y-12 pt-12">
            <h2 className="text-4xl font-headline font-bold text-slate-900 text-center">
              Community Reflections
            </h2>

            <div className="bg-slate-50/30 rounded-[2.5rem] p-8 border border-slate-50">
              <div className="flex gap-4">
                <Avatar className="w-10 h-10 border-2 border-white shadow-sm">
                  <AvatarImage src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop" />
                  <AvatarFallback>You</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-4">
                  <Textarea 
                    placeholder="Share your reflection on today's reading..." 
                    className="min-h-[100px] bg-white border-none rounded-2xl shadow-sm text-slate-600 placeholder:text-slate-300 resize-none"
                  />
                  <div className="flex justify-end">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 font-bold text-xs h-10">
                      Post Reflection
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              {reflections.map((ref) => (
                <div key={ref.id} className="flex gap-4 group">
                  <Avatar className="w-10 h-10 shrink-0">
                    <AvatarImage src={ref.avatar} />
                    <AvatarFallback>{ref.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 bg-slate-50/50 rounded-2xl p-6 space-y-3">
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold text-slate-900 text-sm">{ref.name}</h4>
                      <span className="text-[10px] font-medium text-slate-400">{ref.time}</span>
                    </div>
                    <p className="text-slate-600 text-[13px] leading-relaxed">
                      {ref.content}
                    </p>
                    <div className="flex items-center gap-6 pt-2">
                      <button className="flex items-center gap-1.5 text-slate-400 hover:text-blue-600 transition-colors">
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span className="text-[11px] font-bold">{ref.likes}</span>
                      </button>
                      <button className="flex items-center gap-1.5 text-slate-400 hover:text-blue-600 transition-colors">
                        <Reply className="w-3.5 h-3.5" />
                        <span className="text-[11px] font-bold">Reply</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center pt-8">
              <Button variant="outline" className="rounded-full border-slate-100 text-slate-400 font-bold text-xs h-12 px-10 hover:bg-slate-50 transition-all">
                Load More Reflections
              </Button>
            </div>
          </section>
        </div>
      </main>

      <Footer />

      {/* Sticky Bottom Audio Player */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-100 h-24 px-8 flex items-center justify-between shadow-[0_-8px_30px_rgb(0,0,0,0.04)]">
        <div className="flex items-center gap-4 w-1/4">
          <div className="relative w-12 h-12 rounded-full overflow-hidden">
            {heroImage?.imageUrl && <Image src={heroImage.imageUrl} alt="Devotion" fill className="object-cover" />}
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 leading-tight">Morning Gratitude</h4>
            <p className="text-[10px] text-slate-400 font-medium">Narrated by Sarah Young</p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 flex-1 max-w-xl">
          <div className="flex items-center gap-8">
            <button className="text-slate-400 hover:text-blue-600 transition-colors">
              <RotateCcw className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-200 hover:scale-105 transition-all"
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
            </button>
            <button className="text-slate-400 hover:text-blue-600 transition-colors">
              <RotateCw className="w-5 h-5" />
            </button>
          </div>
          
          <div className="w-full flex items-center gap-4">
            <span className="text-[10px] font-bold text-slate-400">01:24</span>
            <Slider defaultValue={[35]} max={100} step={1} className="flex-1" />
            <span className="text-[10px] font-bold text-slate-400">04:15</span>
          </div>
        </div>

        <div className="flex items-center justify-end gap-6 w-1/4">
          <button className="text-slate-400 hover:text-blue-600 transition-colors">
            <Download className="w-4 h-4" />
          </button>
          <button className="text-slate-400 hover:text-blue-600 transition-colors">
            <Settings className="w-4 h-4" />
          </button>
          <button className="text-slate-400 hover:text-blue-600 transition-colors">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
