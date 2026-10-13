'use client';

import { useState } from 'react';
import Link from 'next/link';
import MobileMenu from './MobileMenu';

export const EDITORIAL_NAV_LINKS = [
  { label: 'HOME', href: '/#hero' },
  { label: 'SHOOTS', href: '/#shoots' },
  { label: 'ABOUT', href: '/#about' },
  { label: 'CONTACT', href: '/#contact' },
];

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      <header className="w-full bg-white text-[#111111] pt-10 pb-6 px-6 select-none border-b border-black/5">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center text-center">
          {/* Centered Brand Title / Logo */}
          <Link
            href="/#hero"
            className="flex flex-col items-center group mb-6"
            aria-label="Gokulraj Pictures Home"
          >
            <div className="relative w-12 h-12 mb-3 rounded-full overflow-hidden border border-[#FFBA00]/30 transition-transform duration-500 group-hover:scale-105">
              <img
                src="/images/logo.png"
                alt="Gokulraj Pictures"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-display text-2xl md:text-3xl font-light tracking-[0.25em] text-[#111111] leading-none uppercase">
              GOKULRAJ
            </span>
            <span className="font-sans text-xs md:text-sm font-light tracking-[0.4em] text-[#111111] leading-tight uppercase mt-1">
              PICTURES
            </span>
          </Link>

          {/* Centered Desktop Menu Links */}
          <nav
            className="hidden md:flex items-center justify-center gap-12 text-[11px] font-medium tracking-[0.25em] text-[#111111]/80 font-sans"
            role="navigation"
            aria-label="Main Navigation"
          >
            {EDITORIAL_NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="hover:text-[#111111] hover:underline underline-offset-8 transition-all duration-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden mt-2 p-2 text-[#111111]"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Toggle Menu"
          >
            <span className="text-xs uppercase tracking-[0.2em] font-medium">
              {isMobileOpen ? 'CLOSE' : 'MENU'}
            </span>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <MobileMenu isOpen={isMobileOpen} onClose={() => setIsMobileOpen(false)} />
    </>
  );
}
