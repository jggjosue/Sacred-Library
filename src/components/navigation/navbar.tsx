
"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Heart, Moon, Sun, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AuthModal } from '@/components/auth/auth-modal';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from '@/lib/utils';

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
    { name: 'DOWNLOADS', href: '/downloads' },
  ];

  const librarySubmenu = [
    { name: 'OVERVIEW', href: '/library' },
    { name: 'PLANS', href: '/plans' },
    { name: 'DEVOTIONS', href: '/devotions' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <span className="font-headline text-2xl font-bold tracking-tight text-primary">Sacred Library</span>
        </Link>
        
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              href={link.href} 
              className={cn(
                "text-[10px] font-bold tracking-[0.2em] transition-all relative py-2 text-muted-foreground hover:text-primary",
                pathname === link.href && "text-primary border-b-2 border-primary"
              )}
            >
              {link.name}
            </Link>
          ))}

          <DropdownMenu>
            <DropdownMenuTrigger className={cn(
              "flex items-center gap-1 text-[10px] font-bold tracking-[0.2em] transition-all py-2 text-muted-foreground hover:text-primary outline-none",
              (pathname === '/library' || pathname === '/plans' || pathname === '/devotions') && "text-primary"
            )}>
              LIBRARY
              <ChevronDown className="w-3 h-3" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="bg-background border-border rounded-xl shadow-xl min-w-[180px] p-2">
              {librarySubmenu.map((sub) => (
                <DropdownMenuItem key={sub.name} asChild className="focus:bg-primary/5 focus:text-primary rounded-lg cursor-pointer">
                  <Link href={sub.href} className="w-full px-3 py-2 text-[10px] font-bold tracking-widest uppercase">
                    {sub.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-2">
            <Link href="/favorites">
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
            className="w-8 h-8 cursor-pointer hover:opacity-80 transition-opacity border border-border"
            onClick={() => setIsAuthOpen(true)}
          >
            <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop" />
            <AvatarFallback className="bg-muted text-muted-foreground text-[10px] font-bold">SL</AvatarFallback>
          </Avatar>
        </div>
      </div>
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </header>
  );
}
