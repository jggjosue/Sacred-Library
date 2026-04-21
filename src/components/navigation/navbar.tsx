
"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AuthModal } from '@/components/auth/auth-modal';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [isAuthOpen, setIsAuthOpen] = React.useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'SANCTUM', href: '/' },
    { name: 'SCRIPTURE', href: '/scripture' },
    { name: 'PLANS', href: '/plans' },
    { name: 'REFLECT', href: '/devotions' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="font-headline text-2xl font-bold italic tracking-tight text-blue-600">Sacred Library</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              href={link.href} 
              className={cn(
                "text-[11px] font-bold tracking-[0.2em] transition-all relative py-2 text-slate-400 hover:text-blue-600",
                pathname === link.href && "text-blue-600"
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          <Button variant="ghost" size="icon" className="text-slate-400 hover:text-blue-600 rounded-full">
            <Search className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-blue-600 hover:bg-blue-50 rounded-full">
            <Bookmark className="w-5 h-5 fill-current" />
          </Button>
        </div>
      </div>
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </header>
  );
}
