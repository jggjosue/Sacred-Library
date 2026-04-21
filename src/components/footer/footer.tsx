
"use client";

import Link from 'next/link';
import { useI18n } from '@/components/providers/i18n-provider';

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="bg-slate-50/50 py-16 px-6 border-t border-slate-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-4">
            <h2 className="font-headline text-2xl font-bold text-blue-600">
              Sacred Library
            </h2>
          </div>

          <nav className="flex flex-wrap justify-center gap-8 text-[11px] font-medium text-slate-400">
            <Link href="#" className="hover:text-blue-600 transition-colors">{t('footer.privacy')}</Link>
            <Link href="#" className="hover:text-blue-600 transition-colors">{t('footer.terms')}</Link>
            <Link href="#" className="hover:text-blue-600 transition-colors">{t('footer.policy')}</Link>
            <Link href="#" className="hover:text-blue-600 transition-colors">{t('footer.support')}</Link>
          </nav>
          
          <div className="text-[11px] font-medium text-slate-400">
            {t('footer.copy')}
          </div>
        </div>
      </div>
    </footer>
  );
}
