'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const textColsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({ delay: 0.2 });

    if (headlineRef.current) {
      tl.fromTo(
        headlineRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' }
      );
    }

    if (textColsRef.current) {
      tl.fromTo(
        textColsRef.current.children,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out' },
        '-=0.6'
      );
    }

    if (imageRef.current) {
      tl.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.98 },
        { opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out' },
        '-=0.8'
      );
    }
  }, []);

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative min-h-screen bg-white text-[#111111] pt-4 pb-24 select-none flex flex-col items-center w-full"
      aria-label="About Gokulraj"
    >
      <div
        className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start"
        style={{ maxWidth: 1260, marginLeft: 'auto', marginRight: 'auto', paddingLeft: 24, paddingRight: 24 }}
      >
        {/* Left Column: Subtitle + Headline + 2-Column Story Text (6 cols on lg) */}
        <div className="lg:col-span-6 flex flex-col justify-between h-full pt-1">
          {/* Subtitle / Category Tag */}
          <span className="text-[10px] sm:text-[11px] tracking-[0.28em] font-sans uppercase font-medium text-[#111111]/80 block mb-6">
            THE ART OF STILLNESS: INSIDE THE WORLD OF GOKULRAJ PICTURES
          </span>

          {/* Main Headline Statement */}
          <h1
            ref={headlineRef}
            className="font-serif text-2xl sm:text-3xl md:text-[2rem] font-light text-[#111111] leading-[1.35] tracking-tight mb-8"
          >
            Wedding photographer Gokulraj has built a life and career defined by light, honesty and love, both behind the lens and at home.
          </h1>

          {/* 2-Column Newspaper/Editorial Text Block */}
          <div
            ref={textColsRef}
            className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-7 text-[12px] sm:text-[12.5px] font-serif leading-[1.85] text-[#333333]"
          >
            {/* Left Column Paragraphs */}
            <div className="space-y-4 font-light">
              <p>
                Sunlight spills across the timber floors of a studio home, soft and golden against the quiet hum of family life. Here, wedding photographer Gokulraj begins his day in the space built together on open land. It is a home filled with light, laughter and gratitude, the kind of place that reflects the calm and honesty woven through his work.
              </p>

              <blockquote className="italic border-l border-black/20 pl-3.5 py-0.5 text-[#111111] font-light">
                &ldquo;I still have pinch-me moments,&rdquo; he says. &ldquo;We built this life together. To say I&apos;m proud to capture these stories is an understatement. I love the craft we&apos;ve worked so hard for.&rdquo;
              </blockquote>

              <p>
                That same sense of intention and grounded beauty flows through every image Gokulraj creates. Based in India and photographing weddings across the world, his work is defined by emotion and elegance. Known for his timeless style and instinctive use of light, he captures the quiet in-between moments that often go unseen, a glance, a laugh, the trace of sunlight through fabric.
              </p>

              <p>
                Before weddings, there was fashion. Gokulraj&apos;s early years photographing campaigns shaped his refined approach to composition and detail, teaching him the balance between structure and spontaneity. &ldquo;Fashion taught me to find beauty in simplicity,&rdquo; he says. &ldquo;But weddings taught me to find meaning in imperfection.&rdquo;
              </p>
            </div>

            {/* Right Column Paragraphs */}
            <div className="space-y-4 font-light">
              <p>
                Now, more than ten years into his career, his imagery is recognised for its warmth and cinematic stillness. He has photographed love stories around the world, from coastal elopements to grand celebrations, yet what he treasures most are the fleeting details that make each day unique.
              </p>

              <blockquote className="italic border-l border-black/20 pl-3.5 py-0.5 text-[#111111] font-light">
                &ldquo;I&apos;m a hopeless romantic,&rdquo; he admits with a smile. &ldquo;After all these years, I still absolutely love love. It&apos;s the little moments that stay with me, not just between the couple, but between the people they love. That&apos;s what makes each story feel alive.&rdquo;
              </blockquote>

              <p>
                Through his lens, beauty feels effortless. There is no artifice, no excess, only truth rendered softly in light and shadow. His photographs do not simply record a wedding day; they preserve the atmosphere, the pulse, the human connection.
              </p>

              <p>
                In Gokulraj&apos;s world, love is not a pose or a performance. It is presence, and he captures it with quiet grace.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Lengthy Portrait Image (6 cols on lg) */}
        <div
          ref={imageRef}
          className="lg:col-span-6 relative w-full h-[600px] sm:h-[750px] lg:h-[860px] rounded-sm overflow-hidden bg-[#FAFAFA] group cursor-pointer border border-black/5 shadow-xs"
        >
          <Image
            src="/images/about/photographer.png"
            alt="Gokulraj - Fine Art Wedding Photographer"
            fill
            className="object-cover object-top grayscale contrast-[1.03] transition-transform duration-1000 ease-out group-hover:scale-[1.02]"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>

      {/* Vertical Fixed BACK TO TOP indicator on Bottom Left matching reference layout */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-12 left-6 z-40 origin-bottom-left -rotate-90 text-[9px] tracking-[0.3em] font-sans text-[#111111]/60 hover:text-[#111111] uppercase font-medium cursor-pointer transition-colors duration-300 hidden md:block border-none bg-transparent"
        aria-label="Back to top"
      >
        BACK TO TOP
      </button>
    </section>
  );
}
