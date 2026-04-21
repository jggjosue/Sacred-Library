"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AuthModal } from '@/components/auth/auth-modal';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [isAuthOpen, setIsAuthOpen] = React.useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Reflect', href: '/' },
    { name: 'Devotions', href: '/devotions' },
    { name: 'Community', href: '#' },
    { name: 'Library', href: '/library' },
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
                "text-[13px] font-bold tracking-tight transition-all relative py-2 text-slate-400 hover:text-blue-600",
                (pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))) && "text-blue-600 after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:rounded-full after:bg-blue-600"
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          <Button variant="ghost" size="icon" className="text-blue-600 hover:bg-blue-50 rounded-full">
            <Headphones className="w-5 h-5" />
          </Button>

          <Button 
            onClick={() => setIsAuthOpen(true)}
            variant="ghost" 
            className="p-0 hover:bg-transparent"
          >
            <Avatar className="w-8 h-8 border-2 border-blue-100 shadow-sm">
              <AvatarImage src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100&h=100" />
              <AvatarFallback><User /></AvatarFallback>
            </Avatar>
          </Button>
        </div>
      </div>
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </header>
  );
}
