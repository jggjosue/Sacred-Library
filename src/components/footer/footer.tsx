
"use client";

import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-slate-50/50 py-20 px-6 mt-auto">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
          <div className="space-y-4">
            <h2 className="font-headline text-2xl font-bold italic text-slate-900 leading-tight">
              Aura <br /> Sanctum
            </h2>
          </div>

          <nav className="flex flex-wrap gap-x-10 gap-y-4 text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase">
            <Link href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-blue-600 transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-blue-600 transition-colors">Guided Path</Link>
            <Link href="#" className="hover:text-blue-600 transition-colors">Contact Support</Link>
          </nav>
        </div>
        
        <div className="mt-16 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-medium text-slate-400 tracking-wider">
          <p>© {new Date().getFullYear()} AURA SANCTUM. A SPACE FOR QUIET DEVOTION AND INTENTIONAL GROWTH.</p>
        </div>
      </div>
    </footer>
  );
}
