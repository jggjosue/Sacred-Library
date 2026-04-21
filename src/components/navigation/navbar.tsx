
"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User, Menu, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AuthModal } from '@/components/auth/auth-modal';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [isAuthOpen, setIsAuthOpen] = React.useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Library', href: '/library' },
    { name: 'Meditate', href: '/devotions' },
    { name: 'Community', href: '#' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-16">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="font-headline text-2xl font-bold italic tracking-tight text-blue-600">Aura Sanctum</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                href={link.href} 
                className={cn(
                  "text-sm font-medium transition-all relative py-2 text-slate-500 hover:text-blue-600",
                  (pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))) && "text-blue-600 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-600"
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-slate-400 hover:text-blue-600">
            <Settings className="w-5 h-5" />
          </Button>

          <Button 
            onClick={() => setIsAuthOpen(true)}
            variant="ghost" 
            className="p-0 hover:bg-transparent"
          >
            <Avatar className="w-8 h-8 border border-slate-100 shadow-sm">
              <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100&h=100" />
              <AvatarFallback><User /></AvatarFallback>
            </Avatar>
          </Button>

          <Button variant="ghost" size="icon" className="md:hidden text-slate-400">
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </header>
  );
}
