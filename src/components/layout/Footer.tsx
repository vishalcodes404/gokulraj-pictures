'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { NAV_LINKS, SOCIAL_LINKS, BRAND } from '@/src/constants/navigation';
import { FaInstagram, FaFacebookF, FaYoutube, FaWhatsapp, FaArrowUp } from 'react-icons/fa';
import MagneticButton from '@/src/components/animations/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaWhatsapp,
};

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!footerRef.current) return;

    gsap.from(footerRef.current.querySelectorAll('.footer-animate'), {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: footerRef.current,
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
    });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer ref={footerRef} className="relative bg-transparent" role="contentinfo">
      {/* Gold Divider */}
      <div className="gold-divider" />

      <div className="section-container py-20 lg:py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Logo & Description */}
          <div className="footer-animate lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3 mb-6">
              <Image
                src="/images/logo.png"
                alt="Gokulraj Pictures"
                width={56}
                height={56}
                className="w-14 h-14 rounded-full"
              />
              <div>
                <span className="block text-white font-medium tracking-wider text-lg">
                  GOKULRAJ <span className="text-accent">PICTURES</span>
                </span>
              </div>
            </Link>
            <p className="body-md max-w-md mt-4">
              Capturing timeless stories through the lens. Premium photography
              and cinematography for weddings, events, portraits, and more.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-animate">
            <h4 className="label-text mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="body-md animated-underline hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-animate">
            <h4 className="label-text mb-6">Get In Touch</h4>
            <div className="space-y-3">
              <a href={`tel:${BRAND.phone}`} className="body-md block hover:text-accent transition-colors">
                {BRAND.phone}
              </a>
              <a href={`mailto:${BRAND.email}`} className="body-md block hover:text-accent transition-colors">
                {BRAND.email}
              </a>
              <p className="body-md">{BRAND.address}</p>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 mt-6">
              {SOCIAL_LINKS.map((social) => {
                const Icon = iconMap[social.icon];
                return (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground-muted hover:text-accent hover:border-accent transition-all duration-300"
                    aria-label={social.label}
                  >
                    {Icon && <Icon className="w-4 h-4" />}
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-animate mt-16 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-foreground-muted">
            © {new Date().getFullYear()} Gokulraj Pictures. All rights reserved.
          </p>
          <MagneticButton
            className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-foreground-muted hover:text-accent hover:border-accent transition-all duration-300"
            onClick={scrollToTop}
          >
            <FaArrowUp className="w-4 h-4" />
          </MagneticButton>
        </div>
      </div>
    </footer>
  );
}
