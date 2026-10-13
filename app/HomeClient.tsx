'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  FaInstagram,
  FaWhatsapp,
  FaEnvelope,
  FaArrowUp,
  FaVolumeMute,
  FaVolumeUp,
  FaComments,
  FaArrowRight,
} from 'react-icons/fa';
import LoadingScreen from '@/src/components/sections/LoadingScreen';
import EditorialHeader from '@/src/components/sections/EditorialHeader';
import DifferentBannerSection from '@/src/components/sections/DifferentBannerSection';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const SHOOT_CATEGORIES = [
  {
    id: 'wedding',
    number: '01',
    title: 'WEDDING',
    tagline: 'Your story. Your day. Your forever.',
    tags: ['Wedding Photography', 'Candid', 'Cinematic', 'Traditional', 'Highlights'],
    image: '/images/portfolio/wedding-1.png',
  },
  {
    id: 'pre-wedding',
    number: '02',
    title: 'PRE-WEDDING',
    tagline: 'Two people. One story.',
    tags: ['Couple Shoots', 'Outdoor Concepts', 'Cinematic Love Stories', 'Save-the-Date'],
    image: '/images/portfolio/prewedding.png',
  },
  {
    id: 'baby-newborn',
    number: '03',
    title: 'BABY & NEWBORN',
    tagline: 'Little moments. Lifetime memories.',
    tags: ['Newborn', 'Baby Portraits', '1st Birthday Cake Smash', 'Milestone Shoots'],
    image: '/images/portfolio/baby.png',
  },
  {
    id: 'model-fashion',
    number: '04',
    title: 'MODEL / FASHION',
    tagline: 'Your look. Our lens.',
    tags: ['Fashion Portraits', 'Model Portfolios', 'Editorial Brand Shoots', 'Lookbooks'],
    image: '/images/portfolio/fashion.png',
  },
  {
    id: 'events-celebrations',
    number: '05',
    title: 'EVENTS & CELEBRATIONS',
    tagline: 'Celebrate it. Remember it.',
    tags: ['Birthdays', 'Engagements', 'Anniversaries', 'Private Parties', 'Galas'],
    image: '/images/portfolio/event.png',
  },
  {
    id: 'commercial-brand',
    number: '06',
    title: 'COMMERCIAL / BRAND',
    tagline: 'Make your brand impossible to ignore.',
    tags: ['Product Photography', 'Brand Campaigns', 'Social Media Visuals', 'Corporate Films'],
    image: '/images/portfolio/commercial.png',
  },
];

const TESTIMONIALS = [
  {
    quote:
      'Gokulraj didn’t merely photograph our wedding; he captured the soul of our families and created an heirloom we will cherish for our entire lives.',
    author: 'Aishwarya & Vignesh',
    location: 'Chennai • Royal Palace Wedding',
  },
  {
    quote:
      'The calmest, most reassuring team on our wedding day. Watching our cinematic film felt like reliving a dream on 35mm film.',
    author: 'Kavyanjali & Rohit',
    location: 'Coimbatore • Le Méridien',
  },
  {
    quote:
      'Every single picture looks like an editorial cover from Vogue India. Gokulraj’s mastery of light and candid emotion is unmatched.',
    author: 'Divya & Arjun',
    location: 'Bangalore • Heritage Courtyard',
  },
];

export default function HomeClient() {
  const [isLoading, setIsLoading] = useState(true);
  const [soundOn, setSoundOn] = useState(false);

  // Hero Background Video Ref
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  // Hero Background Video Audio Toggle
  const toggleSound = () => {
    if (heroVideoRef.current) {
      if (!soundOn) {
        heroVideoRef.current.muted = false;
        heroVideoRef.current.play().catch(() => {});
        setSoundOn(true);
      } else {
        heroVideoRef.current.muted = true;
        setSoundOn(false);
      }
    } else {
      setSoundOn(!soundOn);
    }
  };

  // Entrance animations when loading completes
  useEffect(() => {
    if (isLoading) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      tl.fromTo(
        '.pictures-hero-brand',
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }
      );

      tl.fromTo(
        '.pictures-hero-sub',
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.7'
      );

      tl.fromTo(
        '.pictures-sound-btn',
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.7, ease: 'power2.out' },
        '-=0.5'
      );

      tl.fromTo(
        '.pictures-bottom-right',
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.6'
      );

      // Scroll triggers for editorial sections
      gsap.utils.toArray<HTMLElement>('.reveal-item').forEach((elem) => {
        gsap.fromTo(
          elem,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: elem,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, [isLoading]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };



  return (
    <>
      {/* 1. Yellow Glowing Logo Loading Screen (5 seconds duration) */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {/* Luxury Editorial Header (Consistent across all pages) */}
      <EditorialHeader />

      <main className="min-h-screen bg-white text-[#111111] selection:bg-[#E5C158] selection:text-black">
        {/* ========================================================
            HERO SECTION — Fullscreen Background Video (Gokulraj Pictures Style)
            ======================================================== */}
        <section
          ref={heroRef}
          className="relative w-full h-[100vh] min-h-[640px] overflow-hidden flex flex-col justify-between"
          id="hero"
        >
          {/* Background Cinematic Video with Fallback Poster */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <video
              ref={heroVideoRef}
              src="/videos/demo-film.mp4"
              poster="/images/hero/hero-bg.png"
              autoPlay
              loop
              muted={!soundOn}
              playsInline
              className="w-full h-full object-cover object-center scale-[1.02]"
            />

            {/* Cinematic Vignette Gradients for Video Contrast */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black/90 pointer-events-none" />
            <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/20 to-black/60 pointer-events-none" />
          </div>

          {/* Spacer for Fixed Header */}
          <div className="h-24 sm:h-28" />

          {/* BOTTOM HERO CONTENT (Bottom Left Brand & Sound + Bottom Right Explore & Contact) */}
          <div className="relative z-10 px-6 sm:px-12 pb-8 sm:pb-12 max-w-[1500px] w-full mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
            {/* Bottom Left — Brand Identity & Audio Toggle */}
            <div className="flex flex-col items-start gap-4">
              <div>
                <h1 className="pictures-hero-brand font-serif text-3xl sm:text-5xl lg:text-6xl tracking-[0.2em] sm:tracking-[0.25em] text-white uppercase font-light leading-tight drop-shadow-md">
                  GOKULRAJ PICTURES
                </h1>
                <p className="pictures-hero-sub font-sans text-[10px] sm:text-[12px] tracking-[0.38em] text-[#E5C158] uppercase font-medium mt-2">
                  CINEMATIC WEDDING LEGACIES
                </p>
              </div>

              {/* Sound Toggle Pill Button (Controls Hero Video Audio) */}
              <button
                onClick={toggleSound}
                className="pictures-sound-btn flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/20 bg-black/40 backdrop-blur-md text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-white/90 hover:border-[#FFBA00]/60 hover:text-white transition-all cursor-pointer shadow-lg"
                aria-label={soundOn ? 'Turn sound off' : 'Turn sound on'}
              >
                {soundOn ? (
                  <>
                    <FaVolumeUp size={12} className="text-[#FFBA00] animate-pulse" />
                    <span>SOUND ON</span>
                  </>
                ) : (
                  <>
                    <FaVolumeMute size={12} className="text-white/60" />
                    <span>SOUND OFF</span>
                  </>
                )}
              </button>
            </div>

            {/* Bottom Right — Explore & Contact Us (Exact match to Photo 1) */}
            <div className="pictures-bottom-right flex items-center justify-between md:justify-end gap-6 sm:gap-10">
              {/* Explore Scroll Trigger */}
              <button
                onClick={() => scrollToSection('manifesto')}
                className="flex items-center gap-3 text-[10px] sm:text-[11px] tracking-[0.32em] text-white/80 hover:text-white transition-colors uppercase group cursor-pointer"
                aria-label="Explore our work"
              >
                <span>EXPLORE</span>
                <span className="w-8 sm:w-12 h-[1px] bg-white/40 group-hover:w-16 group-hover:bg-[#FFBA00] transition-all duration-300" />
              </button>

              {/* Contact Us Pill Button with Chat Icon */}
              <Link
                href="/contact"
                className="flex items-center gap-2.5 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full border border-white/25 bg-black/60 backdrop-blur-md text-[10px] sm:text-[11px] font-medium tracking-[0.22em] text-white uppercase hover:bg-white hover:text-black hover:border-white transition-all duration-300 shadow-xl cursor-pointer"
              >
                <span>CONTACT US</span>
                <FaComments size={13} className="text-[#E5C158]" />
              </Link>
            </div>
          </div>

          {/* Delicate Center Scroll Indicator */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center opacity-60">
            <span className="w-[1px] h-6 bg-gradient-to-b from-transparent via-white/50 to-transparent animate-pulse" />
          </div>
        </section>

        {/* ========================================================
            SECTION 1: THE GOKULRAJ PICTURES MANIFESTO & HEIRLOOM SHOWCASE
            White Background & Crisp Black Typography
            Left: Left-aligned Manifesto & Metrics
            Right: Curated Heritage Wedding Photo
            ======================================================== */}
        <section id="manifesto" className="relative py-28 sm:py-36 px-6 sm:px-12 border-b border-black/10 bg-white">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Left-aligned Text */}
            <div className="lg:col-span-7 flex flex-col items-start text-left reveal-item">
              <span className="text-[10px] sm:text-[11px] tracking-[0.45em] text-[#B8860B] uppercase font-sans font-medium block mb-6">
                THE VISION • COIMBATORE &amp; WORLDWIDE
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-light tracking-[0.03em] text-[#111111] leading-[1.3] text-left mb-8">
                “Every sacred moment is an heirloom. Every single second, a timeless legacy.”
              </h2>
              <p className="font-sans text-sm sm:text-base text-[#444444] font-light leading-relaxed text-left max-w-xl mb-12">
                Guided by natural light, emotional sincerity, and fine-art editorial discipline, Gokulraj
                Pictures creates visual heirlooms that transcend trends. We do not manufacture poses;
                we immortalize your heritage.
              </p>

              {/* Gokulraj Pictures Metric Accolades */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-black/10 w-full">
                <div className="flex flex-col items-start">
                  <span className="font-serif text-3xl sm:text-4xl text-[#B8860B] font-light">8+</span>
                  <span className="text-[10px] tracking-[0.2em] text-[#666666] uppercase mt-2 font-medium">
                    Years of Mastery
                  </span>
                </div>
                <div className="flex flex-col items-start">
                  <span className="font-serif text-3xl sm:text-4xl text-[#B8860B] font-light">250+</span>
                  <span className="text-[10px] tracking-[0.2em] text-[#666666] uppercase mt-2 font-medium">
                    Weddings Chronicled
                  </span>
                </div>
                <div className="flex flex-col items-start">
                  <span className="font-serif text-3xl sm:text-4xl text-[#B8860B] font-light">100%</span>
                  <span className="text-[10px] tracking-[0.2em] text-[#666666] uppercase mt-2 font-medium">
                    Bespoke Curation
                  </span>
                </div>
                <div className="flex flex-col items-start">
                  <span className="font-serif text-3xl sm:text-4xl text-[#B8860B] font-light">Global</span>
                  <span className="text-[10px] tracking-[0.2em] text-[#666666] uppercase mt-2 font-medium">
                    Destination Access
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Curated Wedding Photo */}
            <div className="lg:col-span-5 reveal-item w-full">
              <div className="relative aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] w-full rounded-2xl overflow-hidden border border-black/10 shadow-xl group">
                <Image
                  src="/images/portfolio/wedding-1.png"
                  alt="Royal Indian Wedding Photography by Gokulraj Pictures"
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  quality={90}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity pointer-events-none" />

                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between pointer-events-none">
                  <div className="flex flex-col">
                    <span className="font-serif text-sm tracking-[0.2em] text-white uppercase font-light">
                      Royal Ceremonies
                    </span>
                    <span className="font-sans text-[9px] tracking-[0.3em] text-[#E5C158] uppercase font-medium mt-1">
                      Fine-Art Wedding Heirloom
                    </span>
                  </div>
                  <span className="text-[10px] tracking-[0.2em] text-white/70 uppercase font-sans">
                    01
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            SECTION 2: SHOOTS / OUR ARCHIVES (Whole Website on Home)
            White Background, Crisp Black Headings, All Uploaded Details
            ======================================================== */}
        <section id="shoots" className="relative py-28 sm:py-36 px-6 sm:px-12 border-b border-black/10 bg-[#FAFAFA]">
          <div className="max-w-[1400px] mx-auto">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-20 reveal-item">
              <span className="text-[10px] tracking-[0.45em] text-[#B8860B] uppercase font-sans font-medium block mb-4">
                THE ARCHIVES • DISCIPLINES
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#111111] tracking-[0.06em] uppercase">
                Curated Stories &amp; Shoots
              </h2>
              <div className="w-16 h-[1px] bg-[#B8860B] mx-auto my-6" />
              <p className="text-sm sm:text-base text-[#555555] font-light leading-relaxed">
                From sacred royal rituals to candid laughter, every collection is photographed with intention,
                fashion sensibility, and timeless elegance.
              </p>
            </div>

            {/* Shoots Grid of 6 Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {SHOOT_CATEGORIES.map((shoot) => (
                <div
                  key={shoot.id}
                  className="reveal-item group rounded-2xl overflow-hidden bg-white border border-black/10 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between"
                >
                  {/* Category Image */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
                    <Image
                      src={shoot.image}
                      alt={shoot.title}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      quality={90}
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] tracking-[0.2em] font-medium text-[#111111]">
                      {shoot.number}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-8 flex flex-col flex-1 justify-between">
                    <div>
                      <h3 className="font-serif text-xl sm:text-2xl text-[#111111] tracking-[0.1em] uppercase font-medium mb-2 group-hover:text-[#B8860B] transition-colors">
                        {shoot.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#B8860B] font-medium tracking-[0.08em] uppercase mb-4">
                        {shoot.tagline}
                      </p>
                      <div className="flex flex-wrap gap-2 pt-2 border-t border-black/5">
                        {shoot.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="text-[10px] text-[#555555] bg-black/[0.03] px-2.5 py-1 rounded-md"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6 mt-6 border-t border-black/5 flex items-center justify-between">
                      <a
                        href={`https://wa.me/919894738911?text=${encodeURIComponent(`Hi Gokulraj Pictures! I am interested in booking a ${shoot.title} shoot.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] font-sans tracking-[0.2em] uppercase font-semibold text-[#111111] group-hover:text-[#B8860B] flex items-center gap-2 transition-colors"
                      >
                        <span>BOOK THIS SHOOT</span>
                        <FaArrowRight size={10} className="group-hover:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================
            A DIFFERENT BANNER MEDIA COMPANY — YOUTUBE SHOWCASE
            ======================================================== */}
        <DifferentBannerSection />

        {/* ========================================================
            SECTION 4: CLIENT PRAISE / LOVE NOTES
            ======================================================== */}
        <section id="testimonials" className="py-24 sm:py-32 px-6 sm:px-12 border-b border-black/10 bg-[#FAFAFA]">
          <div className="max-w-[1400px] mx-auto">
            <div className="text-center mb-16 reveal-item">
              <span className="text-[10px] tracking-[0.45em] text-[#B8860B] uppercase font-sans font-medium block mb-3">
                KIND WORDS
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#111111] font-light tracking-[0.06em] uppercase">
                From Our Couples
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {TESTIMONIALS.map((item, idx) => (
                <div
                  key={idx}
                  className="reveal-item p-8 sm:p-10 border border-black/10 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <p className="font-serif text-base sm:text-lg text-[#222222] italic leading-relaxed mb-8">
                    “{item.quote}”
                  </p>
                  <div className="pt-6 border-t border-black/5">
                    <span className="font-serif text-sm text-[#111111] tracking-[0.15em] uppercase font-medium block">
                      {item.author}
                    </span>
                    <span className="text-[10px] tracking-[0.2em] text-[#B8860B] uppercase font-sans mt-1 block">
                      {item.location}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>




        {/* ========================================================
            EDITORIAL WHITE FOOTER
            ======================================================== */}
        <footer className="relative bg-[#F9F8F6] text-[#111111] pt-20 pb-12 px-6 sm:px-12 border-t border-black/10">
          <div className="max-w-[1400px] mx-auto">
            {/* Top Footer Logo */}
            <div className="flex flex-col items-center text-center pb-14 border-b border-black/10">
              <div className="w-16 h-16 rounded-full overflow-hidden border border-[#FFBA00]/60 shadow-[0_0_25px_rgba(255,186,0,0.4)] bg-[#FFB800] flex items-center justify-center mb-6">
                <img
                  src="/images/logo.png"
                  alt="Gokulraj Pictures"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-serif text-2xl sm:text-3xl tracking-[0.25em] text-[#111111] uppercase font-medium">
                GOKULRAJ PICTURES
              </span>
              <span className="text-[10px] tracking-[0.45em] text-[#B8860B] uppercase font-sans mt-2 font-medium">
                STUDIO BASED IN COIMBATORE • AVAILABLE GLOBALLY
              </span>
              <p className="text-xs text-[#666666] font-serif italic mt-3">
                Capturing timeless stories with fine-art elegance
              </p>
            </div>

            {/* Middle Footer: Links, Studio Coordinates, Socials */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 py-14 border-b border-black/10">
              <div>
                <h4 className="text-[11px] tracking-[0.28em] text-[#B8860B] uppercase font-sans font-semibold mb-4">
                  THE STUDIO
                </h4>
                <p className="text-xs text-[#555555] leading-relaxed font-sans font-light">
                  Coimbatore, Tamil Nadu<br />
                  South India<br />
                  Available for destination shoots worldwide
                </p>
              </div>

              <div>
                <h4 className="text-[11px] tracking-[0.28em] text-[#B8860B] uppercase font-sans font-semibold mb-4">
                  EXPLORE
                </h4>
                <ul className="space-y-2 text-xs font-sans tracking-[0.18em] uppercase text-[#555555]">
                  <li>
                    <Link
                      href="/"
                      className="hover:text-black transition-colors cursor-pointer"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/shoots"
                      className="hover:text-black transition-colors cursor-pointer"
                    >
                      Shoots &amp; Archives
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about"
                      className="hover:text-black transition-colors cursor-pointer"
                    >
                      About Gokulraj
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="hover:text-black transition-colors cursor-pointer"
                    >
                      Book A Consultation
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-[11px] tracking-[0.28em] text-[#B8860B] uppercase font-sans font-semibold mb-4">
                  DIRECT CONTACT
                </h4>
                <div className="space-y-2 text-xs font-sans tracking-[0.1em] text-[#555555]">
                  <a
                    href="mailto:hello@gokulrajpictures.com"
                    className="block hover:text-[#B8860B] transition-colors"
                  >
                    hello@gokulrajpictures.com
                  </a>
                  <a
                    href="tel:+919894738911"
                    className="block hover:text-[#B8860B] transition-colors"
                  >
                    +91 98947 38911
                  </a>
                  <a
                    href="https://wa.me/919894738911"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:text-[#25D366] transition-colors"
                  >
                    WhatsApp: +91 98947 38911
                  </a>
                </div>
              </div>

              <div>
                <h4 className="text-[11px] tracking-[0.28em] text-[#B8860B] uppercase font-sans font-semibold mb-4">
                  SOCIAL PICTURES
                </h4>
                <div className="flex items-center gap-4 text-[#444444]">
                  <a
                    href="https://instagram.com/gokulrajpictures"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full border border-black/10 hover:border-[#B8860B] hover:text-[#B8860B] transition-all bg-white"
                    aria-label="Instagram"
                  >
                    <FaInstagram size={15} />
                  </a>
                  <a
                    href="https://wa.me/919894738911"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full border border-black/10 hover:border-[#25D366] hover:text-[#25D366] transition-all bg-white"
                    aria-label="WhatsApp"
                  >
                    <FaWhatsapp size={15} />
                  </a>
                  <a
                    href="mailto:hello@gokulrajpictures.com"
                    className="p-3 rounded-full border border-black/10 hover:border-[#B8860B] hover:text-[#B8860B] transition-all bg-white"
                    aria-label="Email"
                  >
                    <FaEnvelope size={15} />
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom Bar: Copyright & Back to Top */}
            <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] tracking-[0.2em] uppercase text-[#777777]">
              <span>© {new Date().getFullYear()} GOKULRAJ PICTURES. ALL RIGHTS RESERVED.</span>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="flex items-center gap-2 hover:text-black transition-colors cursor-pointer"
                aria-label="Scroll back to top"
              >
                <span>BACK TO TOP</span>
                <FaArrowUp size={10} />
              </button>
            </div>
          </div>
        </footer>

      </main>
    </>
  );
}
