'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

export default function About() {
  const containerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({ delay: 0.15 });

    if (contentRef.current) {
      tl.fromTo(
        contentRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: 'power3.out',
        }
      );
    }
  }, []);

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative min-h-screen bg-white text-[#111111] pt-[130px] sm:pt-[150px] pb-24 sm:pb-32 px-6 sm:px-12 select-none flex flex-col justify-center items-center w-full"
      aria-label="About Gokulraj"
    >
      <div
        ref={contentRef}
        className="max-w-[1400px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
      >
        {/* Left Column: The Artist & Visionary Story (7 cols on lg) */}
        <div className="lg:col-span-7 flex flex-col justify-between h-full text-left">
          <div>
            {/* Top Tag matching Screenshot */}
            <span className="text-[10px] sm:text-[11px] tracking-[0.45em] text-[#B8860B] uppercase font-sans font-medium block mb-6">
              THE ARTIST &amp; VISIONARY
            </span>

            {/* Main Headline */}
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#111111] leading-[1.25] tracking-tight mb-8">
              Wedding photographer Gokulraj has built a life and career defined by light, honesty and love.
            </h1>

            {/* 2-Column Story Spread matching Screenshot */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[13px] font-serif leading-[1.85] text-[#333333]">
              {/* Column 1 */}
              <div className="space-y-4 font-light">
                <p>
                  Sunlight spills across the timber floors of a studio home, soft and golden against the quiet hum of family life.
                  Here, wedding photographer Gokulraj begins his day in the space built together on open land in Coimbatore. It is a home filled with light, laughter and gratitude.
                </p>
                <blockquote className="italic border-l-2 border-[#B8860B] pl-4 py-1 text-[#111111] font-normal">
                  &ldquo;I still have pinch-me moments,&rdquo; he says. &ldquo;We built this life together. To say I&apos;m proud to capture these stories is an understatement.&rdquo;
                </blockquote>
                <p>
                  Based in Tamil Nadu and photographing weddings across the world, his work is defined by emotion and elegance.
                  Known for his instinctive use of light, he captures the quiet in-between moments that often go unseen.
                </p>
              </div>

              {/* Column 2 */}
              <div className="space-y-4 font-light">
                <p>
                  Before weddings, there was fashion. Gokulraj&apos;s early years photographing editorial campaigns shaped his refined
                  approach to composition and detail, teaching him the balance between structure and spontaneity.
                </p>
                <blockquote className="italic border-l-2 border-[#B8860B] pl-4 py-1 text-[#111111] font-normal">
                  &ldquo;Fashion taught me to find beauty in simplicity,&rdquo; he says. &ldquo;But weddings taught me to find meaning in imperfection.&rdquo;
                </blockquote>
                <p>
                  In Gokulraj&apos;s world, love is not a pose or a performance. It is presence, and he captures it with quiet grace.
                </p>
              </div>
            </div>
          </div>

          {/* Accolade summary matching Screenshot exactly */}
          <div className="mt-12 pt-8 border-t border-black/10 flex flex-wrap items-center gap-10 sm:gap-14">
            <div>
              <span className="font-serif text-2xl sm:text-3xl text-[#111111] font-medium block">Coimbatore</span>
              <span className="text-[10px] tracking-[0.2em] text-[#666666] uppercase font-sans font-medium mt-1 block">Flagship Studio</span>
            </div>
            <div>
              <span className="font-serif text-2xl sm:text-3xl text-[#111111] font-medium block">Worldwide</span>
              <span className="text-[10px] tracking-[0.2em] text-[#666666] uppercase font-sans font-medium mt-1 block">Destination Travel</span>
            </div>
            <div>
              <span className="font-serif text-2xl sm:text-3xl text-[#111111] font-medium block">Award Winner</span>
              <span className="text-[10px] tracking-[0.2em] text-[#666666] uppercase font-sans font-medium mt-1 block">Fine-Art Photography</span>
            </div>
          </div>
        </div>

        {/* Right Column: Photographer Portrait with Rounded Corners & Text Overlay (5 cols on lg) */}
        <div className="lg:col-span-5 w-full">
          <div className="relative aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4] w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-black/10 shadow-xl group bg-[#F5F5F5]">
            <Image
              src="/images/about/photographer.png"
              alt="Gokulraj - Fine Art Wedding Photographer"
              fill
              className="object-cover object-top contrast-[1.02] transition-transform duration-1000 ease-out group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 42vw"
              priority
              quality={95}
            />
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />

            {/* Bottom-left Text Overlay matching Screenshot */}
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white pointer-events-none">
              <div>
                <span className="font-serif text-lg sm:text-xl tracking-[0.15em] uppercase font-light block">
                  GOKULRAJ
                </span>
                <span className="text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-[#E5C158] font-sans font-medium mt-1 block">
                  FOUNDER &amp; PRINCIPAL ARTIST
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
