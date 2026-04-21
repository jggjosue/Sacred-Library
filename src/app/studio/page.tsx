"use client";

import React from 'react';
import Image from 'next/image';
import { 
  Layout, 
  Monitor, 
  Book, 
  Type, 
  Wand2, 
  HelpCircle, 
  MessageSquare,
  Share2,
  Settings,
  Cloud,
  Download,
  Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';

export default function StudioPage() {
  const faithImage = PlaceHolderImages.find(img => img.id === 'topic-faith');

  return (
    <div className="h-screen flex flex-col bg-white overflow-hidden">
      {/* Top Navigation */}
      <header className="h-16 border-b flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-2">
          <span className="font-headline text-xl font-bold text-blue-600 tracking-tight">Aura Sanctum</span>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
            <button className="hover:text-blue-600 transition-colors uppercase tracking-wider">Publish</button>
            <button className="hover:text-blue-600 transition-colors uppercase tracking-wider">Export</button>
          </div>
          <div className="h-4 w-px bg-slate-100 mx-2" />
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="text-blue-600 font-bold gap-2 hover:bg-blue-50">
              Share
            </Button>
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-blue-600">
              <Cloud className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-blue-600">
              <Settings className="w-5 h-5" />
            </Button>
            <div className="w-8 h-8 rounded-full overflow-hidden border">
              <Image src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop" alt="Profile" width={32} height={32} />
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <aside className="w-20 border-r flex flex-col items-center py-6 justify-between shrink-0">
          <div className="flex flex-col gap-8 items-center w-full">
            <SidebarIcon icon={Layout} label="Studio" active badge="Creative Hub" />
            <SidebarIcon icon={Monitor} label="Canvas" />
            <SidebarIcon icon={Book} label="Scripture" />
            <SidebarIcon icon={Type} label="Typography" />
            <SidebarIcon icon={Wand2} label="Effects" highlighted />
          </div>
          
          <div className="flex flex-col gap-6 items-center">
            <SidebarIcon icon={HelpCircle} label="Help" small />
            <SidebarIcon icon={MessageSquare} label="Feedback" small />
          </div>
        </aside>

        {/* Main Canvas Area */}
        <main className="flex-1 bg-slate-50 p-12 flex items-center justify-center relative overflow-auto">
          <div className="relative aspect-video w-full max-w-4xl rounded-[3rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.15)] group bg-black">
            {faithImage && (
              <Image 
                src={faithImage.imageUrl} 
                alt="Studio Canvas" 
                fill 
                className="object-cover opacity-60"
                priority
              />
            )}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-12">
              <h2 className="text-5xl md:text-7xl font-headline font-bold leading-tight max-w-2xl drop-shadow-2xl">
                "In the beginning God created the heavens and the earth."
              </h2>
              <p className="mt-8 text-sm font-bold tracking-[0.3em] uppercase opacity-70">
                GENESIS 1:1
              </p>
            </div>
          </div>
        </main>

        {/* Right Properties Panel */}
        <aside className="w-80 border-l p-8 flex flex-col gap-10 shrink-0 bg-white overflow-y-auto">
          <div className="space-y-1">
            <h3 className="text-2xl font-headline font-bold text-slate-900">Properties</h3>
            <p className="text-sm text-slate-400 font-medium">Refine details</p>
          </div>

          <div className="space-y-8">
            <Tabs defaultValue="outlines" className="w-full">
              <TabsList className="bg-transparent border-b rounded-none w-full justify-start h-auto p-0 gap-6">
                <TabsTrigger value="filters" className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-[10px] font-bold uppercase tracking-widest p-0 pb-3">Filters</TabsTrigger>
                <TabsTrigger value="shadows" className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-[10px] font-bold uppercase tracking-widest p-0 pb-3">Shadows</TabsTrigger>
                <TabsTrigger value="outlines" className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-[10px] font-bold uppercase tracking-widest p-0 pb-3">Outlines</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-900">Text Shadow</h4>
                <Button variant="ghost" size="icon" className="w-6 h-6 bg-slate-100 rounded-full text-slate-400">
                  <Plus className="w-3 h-3" />
                </Button>
              </div>

              <PropertySlider label="Blur" value={24} unit="px" />
              <PropertySlider label="Offset Y" value={4} unit="px" />
              <PropertySlider label="Opacity" value={50} unit="%" />

              <div className="space-y-4">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Color</p>
                <div className="flex items-center gap-3">
                  <ColorCircle color="bg-black" active />
                  <ColorCircle color="bg-slate-700" />
                  <ColorCircle color="bg-blue-800" />
                  <ColorCircle color="bg-amber-900" />
                  <div className="w-8 h-8 rounded-full border border-dashed border-slate-300 flex items-center justify-center text-slate-300">
                    <Plus className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-300">Text Outline</h4>
                <Button variant="ghost" size="icon" className="w-6 h-6 bg-slate-50 rounded-full text-slate-200">
                  <Plus className="w-3 h-3" />
                </Button>
              </div>
              <p className="text-xs italic text-slate-300">Enable outline to adjust settings.</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function SidebarIcon({ icon: Icon, label, active = false, highlighted = false, small = false, badge = "" }: any) {
  return (
    <div className="flex flex-col items-center gap-1 group cursor-pointer w-full relative">
      <div className={cn(
        "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
        active ? "bg-slate-100 text-blue-600" : "text-slate-400 group-hover:bg-slate-50 group-hover:text-slate-600",
        highlighted && "bg-blue-600 text-white shadow-xl shadow-blue-200"
      )}>
        <Icon className={cn(small ? "w-4 h-4" : "w-5 h-5")} />
      </div>
      {!small && <span className={cn("text-[8px] font-bold uppercase tracking-wider", active ? "text-slate-900" : "text-slate-400")}>{label}</span>}
      {badge && <span className="absolute -bottom-4 text-[7px] font-medium text-slate-300 whitespace-nowrap">{badge}</span>}
    </div>
  );
}

function PropertySlider({ label, value, unit }: { label: string, value: number, unit: string }) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-slate-400">
        <span>{label}</span>
        <span className="text-slate-900">{value}{unit}</span>
      </div>
      <Slider defaultValue={[value]} max={100} step={1} className="w-full" />
    </div>
  );
}

function ColorCircle({ color, active = false }: { color: string, active?: boolean }) {
  return (
    <div className={cn(
      "w-8 h-8 rounded-full border-2 transition-all p-0.5",
      active ? "border-blue-600" : "border-transparent"
    )}>
      <div className={cn("w-full h-full rounded-full cursor-pointer", color)} />
    </div>
  );
}
