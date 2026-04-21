
"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, Settings, Heart, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AuthModal } from '@/components/auth/auth-modal';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [isAuthOpen, setIsAuthOpen] = React.useState(false);
  const [isDark, setIsDark] = React.useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'BIBLE', href: '/bible' },
    { name: 'PLANS', href: '/plans' },
    { name: 'DEVOTIONS', href: '/devotions' },
    { name: 'LIBRARY', href: '/library' },
    { name: 'DOWNLOADS', href: '/downloads' },
    { name: 'FAVORITES', href: '/favorites' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <span className="font-headline text-2xl font-bold italic tracking-tight text-blue-600">Sacred Library</span>
        </Link>
        
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              href={link.href} 
              className={cn(
                "text-[10px] font-bold tracking-[0.2em] transition-all relative py-2 text-slate-400 hover:text-blue-600",
                pathname === link.href && "text-blue-600 border-b-2 border-blue-600"
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-2">
            <Link href="/favorites">
              <Button variant="ghost" size="icon" className="text-slate-400 hover:text-blue-600 rounded-full">
                <Heart className={cn("w-5 h-5", pathname === '/favorites' && "fill-blue-600 text-blue-600")} />
              </Button>
            </Link>

            <Button variant="ghost" size="icon" className="text-blue-600 hover:bg-blue-50 rounded-full">
              <BookOpen className="w-5 h-5 fill-current" />
            </Button>
            
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-blue-600 rounded-full">
              <Settings className="w-5 h-5" />
            </Button>

            <Button 
              variant="ghost" 
              size="icon" 
              className="text-slate-400 hover:text-blue-600 rounded-full"
              onClick={() => setIsDark(!isDark)}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
          </div>
          <Avatar className="w-8 h-8 cursor-pointer hover:opacity-80 transition-opacity">
            <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>
      </div>
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </header>
  );
}
