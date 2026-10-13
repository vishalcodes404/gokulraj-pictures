'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaInstagram, FaWhatsapp, FaTh, FaTimes } from 'react-icons/fa';

const NAV_LINKS = [
  { label: 'HOME', href: '/' },
  { label: 'SHOOTS', href: '/shoots' },
  { label: 'ABOUT', href: '/about' },
  { label: 'CONTACT', href: '/contact' },
];

export default function EditorialHeader({ darkMode = false }: { darkMode?: boolean }) {
  const pathname = usePathname();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      {/* Top Menu Bar — Matching Screenshot Design across all pages */}
      <header
        className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md py-4 sm:py-5 border-b border-black/10 shadow-sm text-[#111111] transition-all"
        role="banner"
      >
        <div className="max-w-[1500px] mx-auto px-6 sm:px-12 flex items-center justify-between">
          {/* Brand Logo & Name (Top Left) */}
          <Link
            href="/"
            className="flex items-center gap-3 group text-left cursor-pointer"
            aria-label="Gokulraj Pictures"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden border border-[#FFBA00]/60 shadow-[0_0_15px_rgba(255,186,0,0.4)] bg-[#FFBA00] flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <img
                src="/images/logo.png"
                alt="Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-sm sm:text-base tracking-[0.25em] font-medium uppercase leading-tight text-[#111111] group-hover:text-[#B8860B] transition-colors">
                GOKULRAJ
              </span>
              <span className="font-sans text-[8px] sm:text-[9px] tracking-[0.45em] text-[#B8860B] uppercase font-light">
                PICTURES
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links (Center) — Active item with gold underline */}
          <nav
            className="hidden md:flex items-center gap-10 lg:gap-14 text-[11px] font-sans tracking-[0.28em] text-[#111111]/80"
            role="navigation"
            aria-label="Main Navigation"
          >
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === '/'
                  ? pathname === '/'
                  : pathname?.startsWith(link.href) ||
                    (link.href === '/shoots' && pathname?.startsWith('/shoot'));

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`relative py-1 transition-colors cursor-pointer ${
                    isActive
                      ? 'text-[#111111] font-semibold'
                      : 'text-[#111111]/70 hover:text-[#B8860B]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#FFBA00] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Top Right Actions (WhatsApp, Instagram, 9-Dots Grid Menu) */}
          <div className="flex items-center gap-4 sm:gap-6 text-[#111111]/85">
            <a
              href="https://wa.me/919894738911"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp Gokulraj"
              className="hover:text-[#25D366] transition-colors hover:scale-110 duration-200"
            >
              <FaWhatsapp size={17} />
            </a>
            <a
              href="https://instagram.com/gokulrajpictures"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Gokulraj Pictures"
              className="hover:text-[#B8860B] transition-colors hover:scale-110 duration-200"
            >
              <FaInstagram size={17} />
            </a>
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="p-1.5 hover:text-[#B8860B] transition-colors cursor-pointer"
              aria-label="Open Menu"
            >
              <FaTh size={16} />
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Luxury Drawer Overlay */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-[99999] bg-white/95 backdrop-blur-2xl flex flex-col justify-between p-8 sm:p-16 animate-fadeIn text-[#111111]">
          {/* Drawer Top */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full overflow-hidden border border-[#FFBA00]/60 bg-[#FFB800] flex items-center justify-center">
                <img
                  src="/images/logo.png"
                  alt="Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-serif text-lg tracking-[0.25em] text-[#111111] font-medium">
                GOKULRAJ
              </span>
            </div>
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="p-3 text-[#111111] hover:rotate-90 transition-all cursor-pointer"
              aria-label="Close Drawer"
            >
              <FaTimes size={20} />
            </button>
          </div>

          {/* Drawer Nav Links */}
          <nav className="flex flex-col items-center justify-center gap-8 text-center my-auto">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsDrawerOpen(false)}
                className="font-serif text-2xl sm:text-4xl tracking-[0.25em] uppercase text-[#111111] hover:text-[#B8860B] transition-colors cursor-pointer"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Drawer Bottom Coordinates */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-black/10 text-xs tracking-[0.2em] text-[#666666]">
            <span>Coimbatore, Tamil Nadu • Worldwide</span>
            <div className="flex items-center gap-6">
              <a
                href="https://wa.me/919894738911"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#25D366]"
              >
                WhatsApp
              </a>
              <a
                href="https://instagram.com/gokulrajpictures"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#B8860B]"
              >
                Instagram
              </a>
              <a href="mailto:hello@gokulrajpictures.com" className="hover:text-black">
                Email
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
