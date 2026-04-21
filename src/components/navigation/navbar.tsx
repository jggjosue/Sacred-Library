
"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Heart, Moon, Sun, Menu, Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { SignInButton, SignUpButton, UserButton, Show } from "@clerk/nextjs";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const [isDark, setIsDark] = React.useState(false);
  const [lang, setLang] = React.useState<'en' | 'es'>('en');
  const pathname = usePathname();

  React.useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const savedLang = localStorage.getItem('lang') as 'en' | 'es';
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }

    if (savedLang) {
      setLang(savedLang);
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

  const handleLangChange = (newLang: 'en' | 'es') => {
    setLang(newLang);
    localStorage.setItem('lang', newLang);
  };

  const translations = {
    en: {
      bible: 'BIBLE',
      plans: 'PLANS',
      devotions: 'DEVOTIONS',
      library: 'LIBRARY',
      dashboard: 'DASHBOARD',
      favorites: 'FAVORITES',
      language: 'Language',
      signIn: 'Sign In',
      signUp: 'Sign Up',
    },
    es: {
      bible: 'BIBLIA',
      plans: 'PLANES',
      devotions: 'DEVOCIONALES',
      library: 'BIBLIOTECA',
      dashboard: 'DASHBOARD',
      favorites: 'FAVORITOS',
      language: 'Idioma',
      signIn: 'Iniciar Sesión',
      signUp: 'Registrarse',
    }
  };

  const t = translations[lang];

  const navLinks = [
    { name: t.bible, href: '/bible' },
    { name: t.plans, href: '/plans' },
    { name: t.devotions, href: '/devotions' },
    { name: t.library, href: '/library' },
    { name: t.dashboard, href: '/studio', isExternal: true },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-4">
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
                  {t.favorites}
                </Link>
                <Show when="signed-out">
                  <div className="flex flex-col gap-2 pt-4">
                    <SignInButton mode="modal">
                      <Button variant="outline" className="w-full font-bold uppercase tracking-widest text-xs h-12">
                        {t.signIn}
                      </Button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <Button className="w-full bg-primary text-white font-bold uppercase tracking-widest text-xs h-12">
                        {t.signUp}
                      </Button>
                    </SignUpButton>
                  </div>
                </Show>
              </nav>
            </SheetContent>
          </Sheet>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary rounded-full">
                <Languages className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="rounded-xl border-border bg-card">
              <DropdownMenuItem onClick={() => handleLangChange('en')} className="font-bold text-[10px] tracking-widest uppercase cursor-pointer">
                English
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleLangChange('es')} className="font-bold text-[10px] tracking-widest uppercase cursor-pointer">
                Español
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

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
          
          <div className="flex items-center gap-3">
            <Show when="signed-out">
              <div className="hidden sm:flex items-center gap-3">
                <SignInButton mode="modal">
                  <Button variant="ghost" className="text-[10px] font-bold tracking-[0.2em] uppercase hover:text-primary h-10 px-4">
                    {t.signIn}
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button className="bg-primary text-white rounded-full px-6 h-10 font-bold text-[10px] tracking-[0.2em] uppercase shadow-lg shadow-primary/20">
                    {t.signUp}
                  </Button>
                </SignUpButton>
              </div>
            </Show>
            <Show when="signed-in">
              <UserButton appearance={{ elements: { userButtonAvatarBox: "w-8 h-8 sm:w-10 sm:h-10 border border-border" } }} />
            </Show>
          </div>
        </div>
      </div>
    </header>
  );
}
