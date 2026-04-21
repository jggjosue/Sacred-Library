
"use client";

import Link from 'next/link';
import { useI18n } from '@/components/providers/i18n-provider';

type FooterLink = {
  name: string;
  href: string;
  external?: boolean;
};

export function Footer() {
  const { t } = useI18n();

  const SUPPORT_EMAIL = 'josue.23.glez@gmail.com';
  const gmailComposeUrl = (subject: string) =>
    `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      SUPPORT_EMAIL
    )}&su=${encodeURIComponent(subject)}`;

  const legalLinks: FooterLink[] = [
    {
      name: t('footer.privacy'),
      href: 'https://clerk.com/legal/privacy',
      external: true,
    },
    {
      name: t('footer.terms'),
      href: 'https://clerk.com/legal/terms',
      external: true,
    },
  ];

  const contactLinks: FooterLink[] = [
    {
      name: t('footer.contactUs'),
      href: gmailComposeUrl('Sacred Library — Contacto'),
      external: true,
    },
    {
      name: t('footer.support'),
      href: gmailComposeUrl('Sacred Library — Soporte'),
      external: true,
    },
  ];

  const communityLinks: FooterLink[] = [
    { name: t('footer.docs'), href: '#' },
  ];

  const linkClass =
    'text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors';

  const renderLink = (link: FooterLink) =>
    link.external ? (
      <a
        key={link.name}
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
      >
        {link.name}
      </a>
    ) : (
      <Link key={link.name} href={link.href} className={linkClass}>
        {link.name}
      </Link>
    );

  const columns: { title: string; links: FooterLink[] }[] = [
    { title: t('footer.legal'), links: legalLinks },
    { title: t('footer.contact'), links: contactLinks },
    { title: t('footer.community'), links: communityLinks },
  ];

  return (
    <footer className="bg-slate-50/50 dark:bg-slate-900/40 py-16 px-6 border-t border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div className="flex flex-col gap-4">
          <h2 className="font-headline text-2xl font-bold text-blue-600 dark:text-blue-400">
            Sacred Library
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs">
            {t('footer.tagline')}
          </p>
          <address className="not-italic text-xs text-slate-400 dark:text-slate-500 leading-relaxed pt-2">
            Magzin LLC, 800 Third Avenue Associates, New
            <br />
            York, NY, 10022, United States
          </address>
          <p className="text-xs text-slate-400 dark:text-slate-500">
            {t('footer.copy')}
          </p>
        </div>

        {columns.map((column) => (
          <div key={column.title} className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 tracking-wide">
              {column.title}
            </h3>
            <ul className="flex flex-col gap-2">
              {column.links.map((link) => (
                <li key={link.name}>{renderLink(link)}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
}
