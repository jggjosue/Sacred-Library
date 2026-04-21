
"use client";

import { Library, Github, Twitter, Instagram } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-white border-t py-12 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2 group">
          <Library className="w-6 h-6 text-primary" />
          <span className="font-headline text-xl font-bold text-primary">Sacred Library</span>
        </div>

        <nav className="flex gap-8 text-sm text-muted-foreground">
          <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
          <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
          <Link href="#" className="hover:text-primary transition-colors">Support</Link>
          <Link href="#" className="hover:text-primary transition-colors">Contact</Link>
        </nav>

        <div className="flex gap-4">
          <button className="text-muted-foreground hover:text-primary transition-colors"><Twitter className="w-5 h-5" /></button>
          <button className="text-muted-foreground hover:text-primary transition-colors"><Instagram className="w-5 h-5" /></button>
          <button className="text-muted-foreground hover:text-primary transition-colors"><Github className="w-5 h-5" /></button>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-8 pt-8 border-t text-center text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} Sacred Library. All rights reserved. Built for peace and reflection.
      </div>
    </footer>
  );
}
