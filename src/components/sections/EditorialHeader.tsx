'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';

const NAV_LINKS = [
  { label: 'HOME', href: '/' },
  { label: 'PLANS', href: '/plans' },
  { label: 'SHOOTS', href: '/shoots' },
  { label: 'ABOUT', href: '/about' },
  { label: 'CONTACT', href: '/contact' },
];

export default function EditorialHeader({ darkMode = false }: { darkMode?: boolean }) {
  const headerRef = useRef<HTMLElement>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    if (!headerRef.current) return;

    const tl = gsap.timeline({ delay: 0.15 });

    // Logo fade in
    tl.fromTo(
      headerRef.current.querySelector('.logo-group'),
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' }
    );

    // Nav links stagger fade in
    const navLinks = headerRef.current.querySelectorAll('.nav-link-item');
    if (navLinks.length > 0) {
      tl.fromTo(
        navLinks,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power2.out' },
        '-=0.4'
      );
    }
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        className={`editorial-header transition-colors duration-300 ${
          darkMode ? 'bg-[#050505] text-white border-b border-white/10' : ''
        }`}
        role="banner"
      >
        {/* Centered Logo */}
        <div className="logo-group" style={{ opacity: 0 }}>
          <Link href="/" aria-label="Gokulraj Pictures Home" style={{ textDecoration: 'none' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {/* Logo image */}
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  overflow: 'hidden',
                  marginBottom: 14,
                  border: darkMode ? '0.5px solid #D4AF37' : '0.5px solid #e8e6e3',
                }}
              >
                <img
                  src="/images/logo.png"
                  alt="Gokulraj Pictures"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <span className={`editorial-logo-text ${darkMode ? 'text-white' : ''}`}>GOKULRAJ</span>
              <span className={`editorial-logo-sub ${darkMode ? 'text-[#E5C158]' : ''}`}>PICTURES</span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="editorial-nav hidden md:flex" role="navigation" aria-label="Main Navigation">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`nav-link-item ${darkMode ? 'text-white/80 hover:text-[#E5C158]' : ''}`}
              style={{ opacity: 0 }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label="Toggle Menu"
          style={{
            marginTop: 16,
            padding: '8px 0',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'var(--font-sans), sans-serif',
            fontSize: 10,
            letterSpacing: '0.25em',
            textTransform: 'uppercase' as const,
            color: darkMode ? '#ffffff' : '#1a1a1a',
            fontWeight: 500,
          }}
        >
          {isMobileOpen ? 'CLOSE' : 'MENU'}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileOpen && (
        <div
          className={`mobile-menu-overlay ${darkMode ? 'bg-[#050505] text-white' : ''}`}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 32,
          }}
        >
          {/* Close Button */}
          <button
            onClick={() => setIsMobileOpen(false)}
            aria-label="Close Menu"
            style={{
              position: 'absolute',
              top: 24,
              right: 24,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'var(--font-sans), sans-serif',
              fontSize: 10,
              letterSpacing: '0.25em',
              textTransform: 'uppercase' as const,
              color: darkMode ? '#ffffff' : '#1a1a1a',
              fontWeight: 500,
            }}
          >
            CLOSE
          </button>

          {/* Mobile Logo */}
          <div style={{ marginBottom: 24, textAlign: 'center' }}>
            <span className={`editorial-logo-text ${darkMode ? 'text-white' : ''}`} style={{ fontSize: '1.5rem' }}>GOKULRAJ</span>
            <br />
            <span className={`editorial-logo-sub ${darkMode ? 'text-[#E5C158]' : ''}`} style={{ fontSize: '0.7rem' }}>PICTURES</span>
          </div>

          {/* Mobile Nav Links */}
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setIsMobileOpen(false)}
              style={{
                fontFamily: 'var(--font-serif), Playfair Display, serif',
                fontSize: 20,
                fontWeight: 400,
                letterSpacing: '0.15em',
                color: darkMode ? '#ffffff' : '#1a1a1a',
                textDecoration: 'none',
                textTransform: 'uppercase' as const,
                transition: 'color 0.3s ease',
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
