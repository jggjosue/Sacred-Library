
"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Navbar } from '@/components/navigation/navbar';
import { Footer } from '@/components/footer/footer';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { User, Bell, Shield, Settings, Download, Play, Trash2, X, ChevronDown, Layout } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useI18n } from '@/components/providers/i18n-provider';

const downloads = [
  {
    id: 1,
    title: "The Path to Forgiveness",
    author: "Max Lucado",
    type: "Audio",
    size: "45 MB",
    progress: 45,
    status: "downloading",
    image: PlaceHolderImages.find(img => img.id === 'plans-cat'),
  },
  {
    id: 2,
    title: "Strength in Stillness",
    author: "Charles Stanley",
    type: "Audio",
    size: "32 MB",
    progress: 75,
    status: "downloading",
    image: PlaceHolderImages.find(img => img.id === 'plan-mountains'),
  },
  {
    id: 3,
    title: "Morning Gratitude",
    author: "Sarah Young",
    type: "Audio",
    size: "15 MB",
    status: "completed",
    image: PlaceHolderImages.find(img => img.id === 'devotional-cat'),
  },
  {
    id: 4,
    title: "Finding Peace in His Presence",
    author: "John Piper",
    type: "Audio",
    size: "28 MB",
    status: "completed",
    image: PlaceHolderImages.find(img => img.id === 'library-wave'),
  }
];

export default function DownloadsPage() {
  const pathname = usePathname();
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-900/40">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-24">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Profile Sidebar */}
          <aside className="lg:col-span-4 space-y-8">
            <Card className="rounded-[2.5rem] border-none shadow-xl bg-white dark:bg-slate-900 overflow-hidden">
              <div className="h-32 bg-blue-600" />
              <CardContent className="relative pt-0 text-center pb-12">
                <div className="flex justify-center -mt-16 mb-6">
                  <Avatar className="w-32 h-32 border-4 border-white shadow-2xl">
                    <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=128&h=128&fit=crop" />
                    <AvatarFallback className="text-2xl font-bold">JD</AvatarFallback>
                  </Avatar>
                </div>
                <h2 className="text-3xl font-headline font-bold text-slate-900 dark:text-slate-100">John Doe</h2>
                <p className="text-slate-400 dark:text-slate-500 font-medium mb-8">{t('profile.memberSince')} 2024</p>
                
                <div className="flex flex-col gap-3 px-4">
                  <Button className="w-full rounded-full bg-blue-600 hover:bg-blue-700 h-12 font-bold">
                    {t('profile.editProfile')}
                  </Button>
                  <Button variant="outline" className="w-full rounded-full border-slate-100 dark:border-slate-800 h-12 font-bold text-slate-600 dark:text-slate-300">
                    {t('profile.signOut')}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <nav className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 overflow-hidden">
              <ProfileNavLink href="/profile" icon={User} label={t('profile.personalInfo')} active={pathname === '/profile'} />
              <ProfileNavLink href="/downloads" icon={Download} label={t('profile.downloads')} active={pathname === '/downloads'} />
              <ProfileNavLink 
                href="/studio" 
                icon={Layout} 
                label={t('studio.studio')} 
                target="_blank" 
                rel="noopener noreferrer" 
              />
              <ProfileNavLink href="#" icon={Bell} label={t('profile.notifications')} />
              <ProfileNavLink href="#" icon={Shield} label={t('profile.security')} />
              <ProfileNavLink href="#" icon={Settings} label={t('profile.generalSettings')} />
            </nav>
          </aside>

          {/* Downloads Section */}
          <section className="lg:col-span-8 space-y-12">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
              <div className="space-y-2">
                <h1 className="text-5xl font-headline font-bold text-slate-900 dark:text-slate-100 tracking-tight">{t('profile.downloads')}</h1>
                <p className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                  {downloads.length} Items • 41.2 MB
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-slate-400 dark:text-slate-500">Sort by:</span>
                <Button variant="outline" className="rounded-full border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium text-sm h-10 px-5 gap-2">
                  Recent
                  <ChevronDown className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                </Button>
              </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {downloads.map((item) => (
                <div key={item.id} className="group bg-white dark:bg-slate-900 rounded-[2rem] p-8 border border-slate-100 dark:border-slate-800 shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 flex flex-col h-full">
                  <div className="flex gap-6 mb-8">
                    <div className="relative w-20 h-20 shrink-0 rounded-[1.25rem] overflow-hidden">
                      <Image
                        src={item.image?.imageUrl || ''}
                        alt={item.title}
                        fill
                        className="object-cover"
                        data-ai-hint={item.image?.imageHint}
                      />
                    </div>
                    <div className="space-y-1 py-1">
                      <h3 className="text-lg font-headline font-bold text-slate-900 dark:text-slate-100 leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-xs font-medium text-slate-400 dark:text-slate-500">
                        {item.author}
                      </p>
                      <p className="text-[10px] font-bold tracking-widest text-slate-300 dark:text-slate-600 uppercase">
                        {item.type} • {item.size}
                      </p>
                    </div>
                  </div>

                  <div className="mt-auto pt-4">
                    {item.status === 'downloading' ? (
                      <div className="space-y-4">
                        <div className="flex justify-between items-center text-[10px] font-bold tracking-widest uppercase">
                          <span className="text-blue-600 animate-pulse">Downloading...</span>
                          <span className="text-slate-400 dark:text-slate-500">{item.progress}%</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <Progress value={item.progress} className="h-2 bg-slate-50 dark:bg-slate-900 flex-1" />
                          <button className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-slate-400 dark:text-slate-500 hover:text-red-500 transition-colors">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <Button 
                          className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-100"
                        >
                          <Play className="w-4 h-4 fill-current ml-0.5" />
                        </Button>
                        <button className="text-slate-300 dark:text-slate-600 hover:text-red-500 transition-colors p-2">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function ProfileNavLink({ icon: Icon, label, href, active = false, target, rel }: any) {
  return (
    <Link 
      href={href} 
      target={target}
      rel={rel}
      className={cn(
      "w-full flex items-center gap-4 px-8 py-5 text-sm font-bold transition-all border-l-4",
      active 
        ? "bg-blue-50 text-blue-600 border-blue-600" 
        : "text-slate-500 dark:text-slate-400 border-transparent hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900"
    )}>
      <Icon className="w-5 h-5" />
      {label}
    </Link>
  );
}
