
import type {Metadata} from 'next';
import './globals.css';
import { Analytics } from '@vercel/analytics/next';
import {Toaster} from '@/components/ui/toaster';
import { ClerkProvider } from "@clerk/nextjs";
import { TooltipProvider } from "@/components/ui/tooltip";
import { I18nProvider } from "@/components/providers/i18n-provider";

export const metadata: Metadata = {
  title: 'Sacred Library | Divine Wisdom & Reflection',
  description: 'Your personal sanctuary for scripture, devotionals, and spiritual growth.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Alegreya:wght@400;700&family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var p=window.matchMedia('(prefers-color-scheme: dark)').matches;var d=t==='dark'||(!t&&p);var r=document.documentElement;if(d){r.classList.add('dark');}else{r.classList.remove('dark');}r.style.colorScheme=d?'dark':'light';}catch(e){}})();`,
          }}
        />
      </head>
      <body className="font-body antialiased selection:bg-blue-600/20" suppressHydrationWarning>
        <ClerkProvider>
          <I18nProvider>
            <TooltipProvider>
              {children}
              <Toaster />
              <Analytics />
            </TooltipProvider>
          </I18nProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
