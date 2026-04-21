"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Heart, Moon, Sun, Menu, Languages, LogIn, UserPlus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { UserButton, Show } from "@clerk/nextjs";
import { useI18n } from '@/components/providers/i18n-provider';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { GlobalSearchTrigger } from '@/components/navigation/global-search';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function Navbar() {
  const [isDark, setIsDark] = React.useState(false);
  const { lang, setLang, t } = useI18n();
  const pathname = usePathname();

  React.useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    const root = document.documentElement;
    if (newIsDark) {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
      localStorage.setItem('theme', 'light');
    }
  };

  const publicLinks = [
    { name: t('nav.bible'), href: '/bible' },
    { name: t('nav.plans'), href: '/plans' },
    { name: t('nav.devotions'), href: '/devotions' },
    { name: t('nav.library'), href: '/library' },
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
              <div className="mt-6">
                <SheetClose asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full justify-start gap-2 font-bold text-xs uppercase tracking-widest h-12 rounded-xl border-border"
                    onClick={() =>
                      window.dispatchEvent(
                        new Event('sacred-library:open-search')
                      )
                    }
                  >
                    <Search className="w-4 h-4" />
                    {t('nav.search')}
                  </Button>
                </SheetClose>
              </div>
              <nav className="flex flex-col gap-4 mt-8">
                {publicLinks.map((link) => (
                  <Link 
                    key={link.name}
                    href={link.href}
                    className={cn(
                      "text-sm font-bold tracking-[0.2em] py-3 border-b border-border text-muted-foreground hover:text-primary",
                      pathname === link.href && "text-primary"
                    )}
                  >
                    {link.name}
                  </Link>
                ))}
                
                <Show when="signed-in">
                  <Link 
                    href="/studio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "text-sm font-bold tracking-[0.2em] py-3 border-b border-border text-muted-foreground hover:text-primary",
                      pathname === '/studio' && "text-primary"
                    )}
                  >
                    {t('nav.dashboard')}
                  </Link>
                  <Link 
                    href="/favorites"
                    className={cn(
                      "text-sm font-bold tracking-[0.2em] py-3 border-b border-border text-muted-foreground hover:text-primary",
                      pathname === '/favorites' && "text-primary"
                    )}
                  >
                    {t('nav.favorites')}
                  </Link>
                </Show>

                <Show when="signed-out">
                  <div className="flex flex-col gap-2 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      disabled
                      className="w-full font-bold uppercase tracking-widest text-xs h-12 gap-2 opacity-50 cursor-not-allowed"
                    >
                      <LogIn className="w-4 h-4" />
                      {t('nav.signIn')}
                    </Button>
                    <Button
                      type="button"
                      disabled
                      className="w-full bg-primary/50 text-white font-bold uppercase tracking-widest text-xs h-12 gap-2 cursor-not-allowed"
                    >
                      <UserPlus className="w-4 h-4" />
                      {t('nav.signUp')}
                    </Button>
                  </div>
                </Show>
              </nav>
            </SheetContent>
          </Sheet>
          
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <span className="font-headline text-xl sm:text-2xl font-bold tracking-tight text-primary">Sacred Library</span>
          </Link>
        </div>
        
        <nav className="hidden lg:flex items-center gap-6">
          {publicLinks.map((link) => (
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
          <Show when="signed-in">
            <Link 
              href="/studio"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "text-[10px] font-bold tracking-[0.2em] transition-all relative py-2 text-muted-foreground hover:text-primary",
                pathname === '/studio' && "text-primary border-b-2 border-primary"
              )}
            >
              {t('nav.dashboard')}
            </Link>
          </Show>
        </nav>

        <div className="flex items-center gap-1 sm:gap-4">
          <div className="flex items-center gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="inline-flex">
                  <GlobalSearchTrigger />
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-[10px] font-bold uppercase tracking-widest">{t('nav.search')}</p>
              </TooltipContent>
            </Tooltip>

            <Show when="signed-in">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href="/favorites" className="hidden sm:inline-block">
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary rounded-full">
                      <Heart className={cn("w-5 h-5", pathname === '/favorites' && "fill-primary text-primary")} />
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-[10px] font-bold uppercase tracking-widest">{t('nav.favorites')}</p>
                </TooltipContent>
              </Tooltip>
            </Show>

            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary rounded-full">
                      <Languages className="w-5 h-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="rounded-xl border-border bg-card">
                    <DropdownMenuItem onClick={() => setLang('en')} className="font-bold text-[10px] tracking-widest uppercase cursor-pointer">
                      English
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setLang('es')} className="font-bold text-[10px] tracking-widest uppercase cursor-pointer">
                      Español
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-[10px] font-bold uppercase tracking-widest">{t('nav.language')}</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-muted-foreground hover:text-primary rounded-full"
                  onClick={toggleTheme}
                >
                  {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-[10px] font-bold uppercase tracking-widest">{t('nav.theme')}</p>
              </TooltipContent>
            </Tooltip>

          </div>
          
          <div className="flex items-center gap-1">
            <Show when="signed-out">
              <div className="flex items-center gap-1">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="inline-flex">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        disabled
                        className="text-muted-foreground rounded-full opacity-50 cursor-not-allowed"
                        aria-label={t('nav.signIn')}
                      >
                        <LogIn className="w-5 h-5" />
                      </Button>
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-[10px] font-bold uppercase tracking-widest">{t('nav.signIn')}</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="inline-flex">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        disabled
                        className="text-muted-foreground rounded-full opacity-50 cursor-not-allowed"
                        aria-label={t('nav.signUp')}
                      >
                        <UserPlus className="w-5 h-5" />
                      </Button>
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-[10px] font-bold uppercase tracking-widest">{t('nav.signUp')}</p>
                  </TooltipContent>
                </Tooltip>
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
