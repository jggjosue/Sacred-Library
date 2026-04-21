
"use client";

import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-white py-16 px-6 mt-auto border-t border-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center gap-8">
          <h2 className="font-headline text-2xl font-bold italic text-slate-900">
            Aura Sanctum
          </h2>

          <nav className="flex flex-wrap justify-center items-center gap-x-12 gap-y-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            <Link href="#" className="hover:text-blue-600 transition-colors">Terms of Peace</Link>
            <Link href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-blue-600 transition-colors">Contact Support</Link>
          </nav>
          
          <div className="text-[10px] font-bold text-slate-300 tracking-[0.2em] uppercase mt-4">
            © 2024 Aura Sanctum. Devoted to Stillness.
          </div>
        </div>
      </div>
    </footer>
  );
}
