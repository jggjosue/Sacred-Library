
"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Layout, 
  Monitor, 
  Book, 
  Type, 
  Wand2, 
  HelpCircle, 
  MessageSquare,
  Settings,
  Cloud,
  Plus,
  User,
  PanelRight,
  ChevronUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function StudioPage() {
  const faithImage = PlaceHolderImages.find(img => img.id === 'topic-faith');
  const [isPropertiesOpen, setIsPropertiesOpen] = React.useState(false);

  return (
    <div className="h-screen flex flex-col bg-white overflow-hidden">
      {/* Top Navigation */}
      <header className="h-16 border-b flex items-center justify-between px-4 sm:px-6 shrink-0">
        <div className="flex items-center gap-2">
          <Link href="/" className="font-headline text-lg sm:text-xl font-bold text-blue-600 tracking-tight">Aura Sanctum</Link>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-6">
          <div className="hidden sm:flex items-center gap-4 text-xs font-bold text-slate-400">
            <button className="hover:text-blue-600 transition-colors uppercase tracking-wider">Publish</button>
            <button className="hover:text-blue-600 transition-colors uppercase tracking-wider">Export</button>
          </div>
          <div className="hidden sm:block h-4 w-px bg-slate-100 mx-2" />
          <div className="flex items-center gap-1 sm:gap-3">
            <Button variant="ghost" size="sm" className="hidden sm:flex text-blue-600 font-bold gap-2 hover:bg-blue-50">
              Share
            </Button>
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-blue-600">
              <Cloud className="w-5 h-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden text-slate-400 hover:text-blue-600"
              onClick={() => setIsPropertiesOpen(true)}
            >
              <PanelRight className="w-5 h-5" />
            </Button>
            <div className="w-8 h-8 rounded-full overflow-hidden border">
              <Image src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop" alt="Profile" width={32} height={32} />
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden flex-col lg:flex-row">
        {/* Mobile Toolbar (Bottom on Mobile) */}
        <aside className="lg:w-20 border-t lg:border-t-0 lg:border-r flex flex-row lg:flex-col items-center py-2 lg:py-6 justify-around lg:justify-between shrink-0 bg-white z-10">
          <div className="flex flex-row lg:flex-col gap-4 sm:gap-8 items-center w-full justify-around lg:justify-start">
            <SidebarIcon icon={Layout} label="Studio" active badge="Creative Hub" />
            <SidebarIcon icon={Monitor} label="Canvas" />
            <SidebarIcon icon={Book} label="Scripture" />
            <SidebarIcon icon={Type} label="Typography" />
            <SidebarIcon icon={Wand2} label="Effects" highlighted />
          </div>
          
          <div className="hidden lg:flex flex-col gap-6 items-center">
            <SidebarIcon icon={HelpCircle} label="Help" small />
            <SidebarIcon icon={MessageSquare} label="Feedback" small />
            <Link href="/profile" className="w-full">
              <SidebarIcon icon={User} label="Profile" small />
            </Link>
          </div>
        </aside>

        {/* Main Canvas Area */}
        <main className="flex-1 bg-slate-50 p-4 sm:p-12 flex items-center justify-center relative overflow-auto">
          <div className="relative aspect-video w-full max-w-4xl rounded-[1.5rem] sm:rounded-[3rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.15)] group bg-black">
            {faithImage && (
              <Image 
                src={faithImage.imageUrl} 
                alt="Studio Canvas" 
                fill 
                className="object-cover opacity-60"
                priority
              />
            )}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-6 sm:p-12">
              <h2 className="text-2xl sm:text-5xl md:text-7xl font-headline font-bold leading-tight max-w-2xl drop-shadow-2xl">
                "In the beginning God created the heavens and the earth."
              </h2>
              <p className="mt-4 sm:mt-8 text-[8px] sm:text-sm font-bold tracking-[0.3em] uppercase opacity-70">
                GENESIS 1:1
              </p>
            </div>
          </div>
        </main>

        {/* Right Properties Panel (Desktop Only) */}
        <aside className="hidden lg:flex w-80 border-l p-8 flex-col gap-10 shrink-0 bg-white overflow-y-auto">
          <PropertiesContent />
        </aside>

        {/* Mobile Properties Drawer */}
        <Sheet open={isPropertiesOpen} onOpenChange={setIsPropertiesOpen}>
          <SheetContent side="right" className="w-80 p-6 overflow-y-auto">
            <PropertiesContent />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}

function PropertiesContent() {
  return (
    <>
      <div className="space-y-1 mt-6 lg:mt-0">
        <h3 className="text-2xl font-headline font-bold text-slate-900">Properties</h3>
        <p className="text-sm text-slate-400 font-medium">Refine details</p>
      </div>

      <div className="space-y-8 mt-10">
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
            <div className="flex flex-wrap items-center gap-3">
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
    </>
  );
}

function SidebarIcon({ icon: Icon, label, active = false, highlighted = false, small = false, badge = "" }: any) {
  return (
    <div className="flex flex-col items-center gap-1 group cursor-pointer w-full relative">
      <div className={cn(
        "w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all",
        active ? "bg-slate-100 text-blue-600" : "text-slate-400 group-hover:bg-slate-50 group-hover:text-slate-600",
        highlighted && "bg-blue-600 text-white shadow-xl shadow-blue-200"
      )}>
        <Icon className={cn(small ? "w-3 h-3 sm:w-4 sm:h-4" : "w-4 h-4 sm:w-5 sm:h-5")} />
      </div>
      {!small && <span className={cn("hidden sm:block text-[8px] font-bold uppercase tracking-wider", active ? "text-slate-900" : "text-slate-400")}>{label}</span>}
      {badge && <span className="hidden lg:block absolute -bottom-4 text-[7px] font-medium text-slate-300 whitespace-nowrap">{badge}</span>}
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
