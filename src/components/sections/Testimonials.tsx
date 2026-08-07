'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TESTIMONIALS } from '@/src/constants/testimonials';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Header animation
    gsap.from(headerRef.current?.querySelectorAll('.testimonials-header-el') || [], {
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

    // Auto-slide
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="section-padding bg-transparent"
      aria-label="Testimonials"
    >
      <div className="section-container">
        {/* Header */}
        <div ref={headerRef} className="mb-16 lg:mb-24 text-center">
          <span className="testimonials-header-el label-text block mb-4">Testimonials</span>
          <h2 className="testimonials-header-el heading-lg">
            Words from Our <span className="text-accent">Clients</span>
          </h2>
        </div>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto relative overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {TESTIMONIALS.map((testimonial) => (
              <div
                key={testimonial.id}
                className="w-full flex-shrink-0 px-4"
              >
                <div className="text-center">
                  {/* Quote Icon */}
                  <FaQuoteLeft className="w-10 h-10 text-accent opacity-30 mx-auto mb-8" />

                  {/* Content */}
                  <blockquote className="heading-sm font-light italic leading-relaxed mb-8 text-[rgba(255,255,255,0.85)]">
                    &ldquo;{testimonial.content}&rdquo;
                  </blockquote>

                  {/* Rating */}
                  <div className="flex items-center justify-center gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <FaStar key={i} className="w-4 h-4 text-accent" />
                    ))}
                  </div>

                  {/* Client Info */}
                  <div>
                    <p className="text-white font-medium text-lg">{testimonial.name}</p>
                    <p className="text-foreground-muted text-sm mt-1">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-3 mt-12">
            {TESTIMONIALS.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === current
                    ? 'w-8 bg-accent'
                    : 'bg-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.4)]'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
