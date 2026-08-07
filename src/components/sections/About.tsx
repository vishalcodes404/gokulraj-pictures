'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { STATS, TIMELINE } from '@/src/constants/navigation';
import ImageReveal from '@/src/components/animations/ImageReveal';

gsap.registerPlugin(ScrollTrigger);

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const countRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!countRef.current || hasAnimated.current) return;

    const el = countRef.current;

    ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      onEnter: () => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;

        const obj = { val: 0 };
        gsap.to(obj, {
          val: value,
          duration: 2,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = Math.round(obj.val) + suffix;
          },
        });
      },
    });
  }, [value, suffix]);

  return (
    <span ref={countRef} className="heading-xl text-accent">
      0{suffix}
    </span>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Header animation
    gsap.from(headerRef.current?.querySelectorAll('.about-header-el') || [], {
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: headerRef.current,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    // Story text animation
    gsap.from(storyRef.current?.querySelectorAll('.story-el') || [], {
      y: 40,
      opacity: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: storyRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    // Timeline items
    const timelineItems = timelineRef.current?.querySelectorAll('.timeline-item');
    if (timelineItems) {
      gsap.from(timelineItems, {
        x: -40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section-padding bg-background"
      aria-label="About Gokulraj Pictures"
    >
      <div className="section-container">
        {/* Header */}
        <div ref={headerRef} className="mb-16 lg:mb-24">
          <span className="about-header-el label-text block mb-4">About Us</span>
          <h2 className="about-header-el heading-lg">
            The Story Behind <span className="text-accent">the Lens</span>
          </h2>
        </div>

        {/* Main Content - Image + Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-24">
          {/* Portrait Image */}
          <ImageReveal className="relative aspect-[3/4] rounded-sm" direction="left">
            <Image
              src="/images/about/photographer.png"
              alt="Gokulraj - Lead Photographer"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              loading="lazy"
            />
          </ImageReveal>

          {/* Story */}
          <div ref={storyRef} className="flex flex-col justify-center">
            <h3 className="story-el heading-md mb-6">
              A Passion for <span className="text-accent">Visual Storytelling</span>
            </h3>
            <p className="story-el body-lg mb-6">
              Founded with a vision to transform moments into timeless art, Gokulraj
              Pictures has grown into one of the most sought-after photography studios.
              Every project we undertake is infused with creativity, passion, and an
              unwavering commitment to excellence.
            </p>
            <p className="story-el body-lg mb-8">
              Our philosophy is simple: every story deserves to be told beautifully.
              Whether it&apos;s the sacred rituals of a wedding, the innocence of a newborn,
              or the elegance of a fashion editorial — we approach each frame with the
              same dedication and artistic vision.
            </p>

            {/* Mission & Vision */}
            <div className="story-el grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <h4 className="label-text mb-3">Our Mission</h4>
                <p className="body-md">
                  To capture life&apos;s most precious moments with artistry,
                  authenticity, and cinematic beauty.
                </p>
              </div>
              <div>
                <h4 className="label-text mb-3">Our Vision</h4>
                <p className="body-md">
                  To be the most trusted name in photography, known for
                  creating timeless visual stories.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-24 py-16 border-t border-b border-border">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              <p className="body-md mt-2">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div ref={timelineRef}>
          <h3 className="heading-md mb-12 text-center">
            Our <span className="text-accent">Journey</span>
          </h3>
          <div className="relative">
            {/* Center line */}
            <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-[1px] bg-border lg:-translate-x-1/2" />

            <div className="space-y-12">
              {TIMELINE.map((item, index) => (
                <div
                  key={item.year}
                  className={`timeline-item relative flex items-start gap-8 ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-4 lg:left-1/2 w-3 h-3 rounded-full bg-accent border-2 border-background -translate-x-1/2 mt-2 z-10" />

                  {/* Content */}
                  <div className={`ml-12 lg:ml-0 lg:w-[45%] ${index % 2 === 0 ? 'lg:text-right lg:pr-12' : 'lg:text-left lg:pl-12'}`}>
                    <span className="label-text">{item.year}</span>
                    <h4 className="heading-sm mt-2 mb-2">{item.title}</h4>
                    <p className="body-md">{item.description}</p>
                  </div>

                  {/* Spacer for alignment */}
                  <div className="hidden lg:block lg:w-[45%]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
