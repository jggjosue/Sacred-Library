
"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Heart, Moon, Sun, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AuthModal } from '@/components/auth/auth-modal';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Navbar() {
  const [isAuthOpen, setIsAuthOpen] = React.useState(false);
  const [isDark, setIsDark] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    if (newIsDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const navLinks = [
    { name: 'BIBLE', href: '/bible' },
    { name: 'PLANS', href: '/plans' },
    { name: 'DEVOTIONS', href: '/devotions' },
    { name: 'LIBRARY', href: '/library' },
    { name: 'DASHBOARD', href: '/studio', isExternal: true },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle className="text-left font-headline text-2xl text-primary">Sacred Library</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-8">
                {navLinks.map((link) => (
                  <Link 
                    key={link.name}
                    href={link.href}
                    target={link.isExternal ? "_blank" : undefined}
                    rel={link.isExternal ? "noopener noreferrer" : undefined}
                    className={cn(
                      "text-sm font-bold tracking-[0.2em] py-3 border-b border-border text-muted-foreground hover:text-primary",
                      pathname === link.href && "text-primary"
                    )}
                  >
                    {link.name}
                  </Link>
                ))}
                <Link 
                  href="/favorites"
                  className={cn(
                    "text-sm font-bold tracking-[0.2em] py-3 border-b border-border text-muted-foreground hover:text-primary",
                    pathname === '/favorites' && "text-primary"
                  )}
                >
                  FAVORITES
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <span className="font-headline text-xl sm:text-2xl font-bold tracking-tight text-primary">Sacred Library</span>
          </Link>
        </div>
        
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              href={link.href}
              target={link.isExternal ? "_blank" : undefined}
              rel={link.isExternal ? "noopener noreferrer" : undefined}
              className={cn(
                "text-[10px] font-bold tracking-[0.2em] transition-all relative py-2 text-muted-foreground hover:text-primary",
                pathname === link.href && "text-primary border-b-2 border-primary"
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-6">
          <div className="flex items-center gap-1 sm:gap-2">
            <Link href="/favorites" className="hidden sm:inline-block">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary rounded-full">
                <Heart className={cn("w-5 h-5", pathname === '/favorites' && "fill-primary text-primary")} />
              </Button>
            </Link>

            <Button 
              variant="ghost" 
              size="icon" 
              className="text-muted-foreground hover:text-primary rounded-full"
              onClick={toggleTheme}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
          </div>
          
          <Avatar 
            className="w-8 h-8 sm:w-10 sm:h-10 cursor-pointer hover:opacity-80 transition-opacity border border-border"
            onClick={() => setIsAuthOpen(true)}
          >
            <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop" />
            <AvatarFallback className="bg-muted text-muted-foreground text-[10px] font-bold">SL</AvatarFallback>
          </Avatar>
        </div>
      </div>
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </header>
  );
}
