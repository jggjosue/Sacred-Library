
"use client";

import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-slate-50/50 py-16 px-6 border-t border-slate-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-4">
            <h2 className="font-headline text-2xl font-bold italic text-blue-600">
              Aura Sanctum
            </h2>
          </div>

          <nav className="flex flex-wrap justify-center gap-8 text-[11px] font-medium text-slate-400">
            <Link href="#" className="hover:text-blue-600 transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-blue-600 transition-colors">Terms</Link>
            <Link href="#" className="hover:text-blue-600 transition-colors">Editorial Policy</Link>
            <Link href="#" className="hover:text-blue-600 transition-colors">Support</Link>
          </nav>
          
          <div className="text-[11px] font-medium text-slate-400">
            © 2024 Aura Sanctum. A space for quiet reflection.
          </div>
        </div>
      </div>
    </footer>
  );
}
