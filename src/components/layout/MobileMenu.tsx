'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { NAV_LINKS, SOCIAL_LINKS } from '@/src/constants/navigation';
import { FaInstagram, FaFacebookF, FaYoutube, FaWhatsapp } from 'react-icons/fa';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaWhatsapp,
};

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!overlayRef.current) return;

    if (isOpen) {
      document.body.style.overflow = 'hidden';

      gsap.to(overlayRef.current, {
        clipPath: 'circle(150% at top right)',
        duration: 0.8,
        ease: 'power4.inOut',
      });

      if (linksRef.current) {
        gsap.from(linksRef.current.children, {
          y: 60,
          opacity: 0,
          duration: 0.6,
          stagger: 0.08,
          delay: 0.3,
          ease: 'power3.out',
        });
      }

      if (socialRef.current) {
        gsap.from(socialRef.current.children, {
          y: 20,
          opacity: 0,
          duration: 0.4,
          stagger: 0.05,
          delay: 0.8,
          ease: 'power3.out',
        });
      }
    } else {
      document.body.style.overflow = '';

      gsap.to(overlayRef.current, {
        clipPath: 'circle(0% at top right)',
        duration: 0.6,
        ease: 'power4.inOut',
      });
    }
  }, [isOpen]);

  return (
    <div
      ref={overlayRef}
      className="mobile-menu-overlay flex flex-col items-center justify-center"
      style={{ clipPath: 'circle(0% at top right)' }}
      aria-hidden={!isOpen}
    >
      {/* Logo */}
      <div className="absolute top-6 left-5">
        <Image
          src="/images/logo.png"
          alt="Gokulraj Pictures"
          width={40}
          height={40}
          className="rounded-full"
        />
      </div>

      {/* Navigation Links */}
      <div ref={linksRef} className="flex flex-col items-center gap-8">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="heading-md text-white hover:text-accent transition-colors duration-300"
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Social Links */}
      <div ref={socialRef} className="absolute bottom-12 flex items-center gap-6">
        {SOCIAL_LINKS.map((social) => {
          const Icon = iconMap[social.icon];
          return (
            <a
              key={social.label}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground-muted hover:text-accent transition-colors duration-300"
              aria-label={social.label}
            >
              {Icon && <Icon className="w-5 h-5" />}
            </a>
          );
        })}
      </div>
    </div>
  );
}
