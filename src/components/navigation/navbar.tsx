
"use client";

import React from 'react';
import Link from 'next/link';
import { Book, Library, Search, User, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AuthModal } from '@/components/auth/auth-modal';

export function Navbar() {
  const [isAuthOpen, setIsAuthOpen] = React.useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 group">
            <Library className="w-6 h-6 text-primary transition-transform group-hover:scale-110" />
            <span className="font-headline text-2xl font-bold tracking-tight text-primary">Sacred Library</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#scripture" className="text-sm font-medium hover:text-primary transition-colors">Scripture</Link>
            <Link href="#devotionals" className="text-sm font-medium hover:text-primary transition-colors">Devotionals</Link>
            <Link href="#plans" className="text-sm font-medium hover:text-primary transition-colors">Guided Plans</Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <Search className="w-5 h-5" />
          </Button>
          <Button 
            onClick={() => setIsAuthOpen(true)}
            variant="default" 
            className="flex items-center gap-2"
          >
            <User className="w-4 h-4" />
            <span className="hidden sm:inline">Sign In</span>
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </header>
  );
}
