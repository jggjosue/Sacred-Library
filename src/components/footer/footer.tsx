
"use client";

import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-white py-12 px-6 mt-auto border-t border-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <h2 className="font-headline text-lg font-bold italic text-slate-700">
              Aura Sanctum
            </h2>
          </div>

          <nav className="flex items-center gap-8 text-xs font-medium text-slate-400">
            <Link href="#" className="hover:text-blue-600 transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-blue-600 transition-colors">Terms of Grace</Link>
            <Link href="#" className="hover:text-blue-600 transition-colors">Contact</Link>
          </nav>
          
          <div className="text-[10px] font-medium text-blue-600/60 tracking-tight">
            © 2024 Aura Sanctum. Seek stillness.
          </div>
        </div>
      </div>
    </footer>
  );
}
