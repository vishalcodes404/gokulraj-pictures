'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SERVICES } from '@/src/constants/services';
import {
  FaHeart, FaCamera, FaBaby, FaBriefcase, FaCalendarCheck, FaFilm,
} from 'react-icons/fa';
import { GiDiamondRing, GiLipstick, GiDeliveryDrone } from 'react-icons/gi';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  GiDiamondRing,
  FaHeart,
  FaCamera,
  FaBaby,
  FaBriefcase,
  GiLipstick,
  FaCalendarCheck,
  GiDeliveryDrone,
  FaFilm,
};

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.from(headerRef.current?.querySelectorAll('.services-header-el') || [], {
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

    const cards = cardsRef.current?.querySelectorAll('.service-card');
    if (cards) {
      gsap.from(cards, {
        y: 80,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="section-padding bg-transparent"
      aria-label="Services"
    >
      <div className="section-container">
        {/* Header */}
        <div ref={headerRef} className="mb-16 lg:mb-24 text-center">
          <span className="services-header-el label-text block mb-4">Our Services</span>
          <h2 className="services-header-el heading-lg">
            What We <span className="text-accent">Offer</span>
          </h2>
          <p className="services-header-el body-lg mt-6 max-w-2xl mx-auto">
            From intimate portraits to grand celebrations, we offer a comprehensive
            range of photography and cinematography services tailored to perfection.
          </p>
        </div>

        {/* Service Cards Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service) => {
            const Icon = iconMap[service.icon];
            return (
              <div
                key={service.id}
                className="service-card group relative p-8 lg:p-10 border border-border rounded-sm bg-[rgba(255,255,255,0.02)] hover:bg-[rgba(245,184,0,0.03)] hover:border-border-accent transition-all duration-500"
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-full border border-border group-hover:border-accent flex items-center justify-center mb-6 transition-all duration-500">
                  {Icon && <Icon className="w-6 h-6 text-accent" />}
                </div>

                {/* Title */}
                <h3 className="heading-sm mb-4 group-hover:text-accent transition-colors duration-300">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="body-md">{service.description}</p>

                {/* Decorative accent line */}
                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-accent group-hover:w-full transition-all duration-700 ease-out" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
