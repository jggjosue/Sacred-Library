
"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Navbar } from '@/components/navigation/navbar';
import { Footer } from '@/components/footer/footer';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BookMarked, History, Settings, User, Bell, Shield, Download, Layout } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useI18n } from '@/components/providers/i18n-provider';

export default function ProfilePage() {
  const { t } = useI18n();
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-50/50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-24">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Profile Sidebar */}
          <aside className="lg:col-span-4 space-y-8">
            <Card className="rounded-[2.5rem] border-none shadow-xl bg-white overflow-hidden">
              <div className="h-32 bg-blue-600" />
              <CardContent className="relative pt-0 text-center pb-12">
                <div className="flex justify-center -mt-16 mb-6">
                  <Avatar className="w-32 h-32 border-4 border-white shadow-2xl">
                    <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=128&h=128&fit=crop" />
                    <AvatarFallback className="text-2xl font-bold">JD</AvatarFallback>
                  </Avatar>
                </div>
                <h2 className="text-3xl font-headline font-bold text-slate-900">John Doe</h2>
                <p className="text-slate-400 font-medium mb-8">{t('profile.memberSince')} 2024</p>
                
                <div className="flex flex-col gap-3 px-4">
                  <Button className="w-full rounded-full bg-blue-600 hover:bg-blue-700 h-12 font-bold">
                    {t('profile.editProfile')}
                  </Button>
                  <Button variant="outline" className="w-full rounded-full border-slate-100 h-12 font-bold text-slate-600">
                    {t('profile.signOut')}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <nav className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden">
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

          {/* Activity Section */}
          <section className="lg:col-span-8 space-y-12">
            <header className="space-y-2">
              <h1 className="text-5xl font-headline font-bold text-slate-900 tracking-tight">{t('profile.title')}</h1>
              <p className="text-slate-500">{t('profile.subtitle')}</p>
            </header>

            <div className="grid md:grid-cols-2 gap-8">
              <ActivityCard 
                icon={BookMarked} 
                title={t('profile.savedContent')} 
                count={24} 
                description={t('profile.savedDesc')}
                color="text-blue-600"
                bgColor="bg-blue-50"
              />
              <ActivityCard 
                icon={History} 
                title={t('profile.readingHistory')} 
                count={156} 
                description={t('profile.historyDesc')}
                color="text-emerald-600"
                bgColor="bg-emerald-50"
              />
            </div>

            <div className="space-y-8">
              <h3 className="text-2xl font-headline font-bold text-slate-900">{t('profile.recentActivity')}</h3>
              <div className="space-y-4">
                {[
                  { action: "Saved a verse", detail: "Philippians 4:13", time: "2 hours ago" },
                  { action: "Completed a reading plan", detail: "Morning Gratitude", time: "Yesterday" },
                  { action: "Journaled reflection", detail: "October 24 Daily Reflection", time: "2 days ago" }
                ].map((item, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 flex justify-between items-center group hover:border-blue-100 transition-colors">
                    <div>
                      <p className="font-bold text-slate-900">{item.action}</p>
                      <p className="text-sm text-slate-500">{item.detail}</p>
                    </div>
                    <span className="text-xs font-medium text-slate-400">{item.time}</span>
                  </div>
                ))}
              </div>
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
        : "text-slate-500 border-transparent hover:bg-slate-50 hover:text-slate-900"
    )}>
      <Icon className="w-5 h-5" />
      {label}
    </Link>
  );
}

function ActivityCard({ icon: Icon, title, count, description, color, bgColor }: any) {
  return (
    <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-6">
      <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center", bgColor, color)}>
        <Icon className="w-7 h-7" />
      </div>
      <div className="space-y-2">
        <h4 className="text-slate-400 font-bold text-xs uppercase tracking-widest">{title}</h4>
        <p className="text-4xl font-headline font-bold text-slate-900">{count}</p>
        <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
