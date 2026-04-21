
"use client";

import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-white py-16 px-6 mt-auto border-t border-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
          <div className="flex items-center gap-2">
            <h2 className="font-headline text-xl font-bold italic text-blue-600">
              Aura Sanctum
            </h2>
          </div>

          <nav className="flex flex-wrap justify-center items-center gap-x-12 gap-y-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            <Link href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-blue-600 transition-colors">Terms of Devotion</Link>
            <Link href="#" className="hover:text-blue-600 transition-colors">Support</Link>
          </nav>
          
          <div className="text-[10px] font-bold text-slate-300 tracking-widest uppercase">
            © 2024 Aura Sanctum. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
