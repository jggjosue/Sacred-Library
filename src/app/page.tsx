
"use client";

import React from 'react';
import Image from 'next/image';
import { Navbar } from '@/components/navigation/navbar';
import { ContentBrowser } from '@/components/content/content-browser';
import { JournalSection } from '@/components/journal/journal-section';
import { Footer } from '@/components/footer/footer';
import { InterestsPicker } from '@/components/personalization/interests-picker';
import { DiscoverPath } from '@/components/content/discover-path';
import { InspirationCarousel } from '@/components/content/inspiration-carousel';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Quote, Loader2 } from 'lucide-react';
import { useI18n } from '@/components/providers/i18n-provider';
import { useToast } from '@/hooks/use-toast';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-library');
  const { t } = useI18n();
  const { toast } = useToast();
  const [email, setEmail] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);
  const [emailError, setEmailError] = React.useState<string | null>(null);

  const handleNotify = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();

    if (!trimmed) {
      setEmailError(t('community.required'));
      return;
    }
    if (!EMAIL_REGEX.test(trimmed)) {
      setEmailError(t('community.invalid'));
      return;
    }

    setEmailError(null);
    setSubmitting(true);

    try {
      const res = await fetch('/api/community-notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed }),
      });

      if (!res.ok) {
        const { error } = await res.json().catch(() => ({ error: 'send_failed' }));
        throw new Error(error ?? 'send_failed');
      }

      toast({
        title: t('community.successTitle'),
        description: t('community.successDescription'),
      });
      setEmail('');
    } catch (err) {
      toast({
        variant: 'destructive',
        title: t('community.errorTitle'),
        description: t('community.errorDescription'),
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Static Hero Section */}
      <section className="relative min-h-[100vh] w-full flex items-center justify-center overflow-hidden">
        {heroImage?.imageUrl && (
          <Image
            src={heroImage.imageUrl}
            alt="Sacred Library Hero"
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-primary/40 dark:bg-black/60 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/10 to-background" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 pt-32 pb-32 text-center text-white space-y-12 animate-in fade-in zoom-in duration-700">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="text-sm font-medium tracking-wide uppercase">{t('hero.dailyWisdom')}</span>
          </div>
          
          <div className="space-y-6">
            <Quote className="w-10 h-10 mx-auto text-accent/80 opacity-60" />
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-bold leading-tight drop-shadow-2xl px-4">
              {t('hero.verse')}
            </h1>
          </div>
          
          <p className="text-lg md:text-2xl font-light text-white/90 max-w-2xl mx-auto leading-relaxed">
            {t('hero.description')}
          </p>
          
          <div className="pt-12">
            <a 
              href="#explore" 
              className="bg-accent text-white px-10 py-4 md:px-12 md:py-5 rounded-full font-bold text-lg hover:bg-accent/90 transition-all hover:scale-105 inline-block shadow-2xl shadow-accent/40 ring-4 ring-white/10"
            >
              {t('hero.cta')}
            </a>
          </div>
        </div>
      </section>

      {/* Content Browsing Section */}
      <ContentBrowser />

      {/* Inspiration Carousel Section */}
      <InspirationCarousel />

      {/* Journaling Section */}
      <JournalSection dailyVerse={t('hero.verse')} />

      {/* Community Placeholder */}
      <section className="py-24 bg-primary/5 dark:bg-white/5">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-card p-12 rounded-[3rem] border border-border shadow-xl space-y-6">
            <h2 className="text-4xl font-headline font-bold text-card-foreground">{t('community.title')}</h2>
            <p className="text-muted-foreground text-lg">
              {t('community.description')}
            </p>
            <form
              onSubmit={handleNotify}
              noValidate
              className="max-w-md mx-auto space-y-2"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError(null);
                  }}
                  placeholder={t('community.placeholder')}
                  aria-invalid={Boolean(emailError)}
                  aria-describedby={emailError ? 'community-email-error' : undefined}
                  disabled={submitting}
                  className={`flex-1 px-6 py-4 rounded-full border bg-background text-foreground focus:outline-none focus:ring-2 transition-colors disabled:opacity-60 ${
                    emailError
                      ? 'border-destructive focus:ring-destructive/40'
                      : 'border-input focus:ring-primary/40'
                  }`}
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-primary text-primary-foreground px-10 py-4 rounded-full font-bold whitespace-nowrap shadow-lg hover:bg-primary/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
                >
                  {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  {submitting ? t('community.sending') : t('community.notify')}
                </button>
              </div>
              {emailError && (
                <p
                  id="community-email-error"
                  role="alert"
                  className="text-sm text-destructive text-left px-4"
                >
                  {emailError}
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Personalization Section */}
      <InterestsPicker />

      {/* Discover Path Section */}
      <DiscoverPath />

      <Footer />
    </main>
  );
}
