'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BRAND } from '@/src/constants/navigation';
import MagneticButton from '@/src/components/animations/MagneticButton';
import { FaPhone, FaEnvelope, FaInstagram, FaWhatsapp, FaMapMarkerAlt } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Header
    gsap.from(headerRef.current?.querySelectorAll('.contact-header-el') || [], {
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

    // Form fields
    const formFields = formRef.current?.querySelectorAll('.form-field');
    if (formFields) {
      gsap.from(formFields, {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: formRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    }

    // Info items
    gsap.from(infoRef.current?.querySelectorAll('.contact-info-item') || [], {
      x: 40,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: infoRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section-padding bg-background"
      aria-label="Contact"
    >
      <div className="section-container">
        {/* Header */}
        <div ref={headerRef} className="mb-16 lg:mb-24 text-center">
          <span className="contact-header-el label-text block mb-4">Get In Touch</span>
          <h2 className="contact-header-el heading-lg">
            Let&apos;s Create <span className="text-accent">Together</span>
          </h2>
          <p className="contact-header-el body-lg mt-6 max-w-2xl mx-auto">
            Ready to capture your story? Reach out to us and let&apos;s create
            something extraordinary together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-0">
            <div className="form-field">
              <input type="text" id="name" placeholder=" " required />
              <label htmlFor="name">Your Name</label>
            </div>
            <div className="form-field">
              <input type="email" id="email" placeholder=" " required />
              <label htmlFor="email">Email Address</label>
            </div>
            <div className="form-field">
              <input type="tel" id="phone" placeholder=" " />
              <label htmlFor="phone">Phone Number</label>
            </div>
            <div className="form-field">
              <input type="text" id="service" placeholder=" " />
              <label htmlFor="service">Service Interested In</label>
            </div>
            <div className="form-field">
              <textarea id="message" rows={4} placeholder=" " required />
              <label htmlFor="message">Your Message</label>
            </div>

            <MagneticButton
              className="magnetic-btn w-full py-4 border border-accent text-accent text-sm tracking-[0.2em] uppercase mt-8 relative overflow-hidden"
            >
              Send Message
            </MagneticButton>
          </form>

          {/* Contact Info */}
          <div ref={infoRef} className="flex flex-col justify-center space-y-8">
            <div className="contact-info-item flex items-start gap-5">
              <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center flex-shrink-0">
                <FaPhone className="w-4 h-4 text-accent" />
              </div>
              <div>
                <h4 className="label-text mb-2">Phone</h4>
                <a href={`tel:${BRAND.phone}`} className="body-lg text-white hover:text-accent transition-colors">
                  {BRAND.phone}
                </a>
              </div>
            </div>

            <div className="contact-info-item flex items-start gap-5">
              <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center flex-shrink-0">
                <FaEnvelope className="w-4 h-4 text-accent" />
              </div>
              <div>
                <h4 className="label-text mb-2">Email</h4>
                <a href={`mailto:${BRAND.email}`} className="body-lg text-white hover:text-accent transition-colors">
                  {BRAND.email}
                </a>
              </div>
            </div>

            <div className="contact-info-item flex items-start gap-5">
              <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center flex-shrink-0">
                <FaInstagram className="w-4 h-4 text-accent" />
              </div>
              <div>
                <h4 className="label-text mb-2">Instagram</h4>
                <a href="https://instagram.com/gokulrajpictures" target="_blank" rel="noopener noreferrer" className="body-lg text-white hover:text-accent transition-colors">
                  {BRAND.instagram}
                </a>
              </div>
            </div>

            <div className="contact-info-item flex items-start gap-5">
              <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center flex-shrink-0">
                <FaWhatsapp className="w-4 h-4 text-accent" />
              </div>
              <div>
                <h4 className="label-text mb-2">WhatsApp</h4>
                <a href={`https://wa.me/${BRAND.whatsapp}`} target="_blank" rel="noopener noreferrer" className="body-lg text-white hover:text-accent transition-colors">
                  {BRAND.phone}
                </a>
              </div>
            </div>

            <div className="contact-info-item flex items-start gap-5">
              <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center flex-shrink-0">
                <FaMapMarkerAlt className="w-4 h-4 text-accent" />
              </div>
              <div>
                <h4 className="label-text mb-2">Studio Address</h4>
                <p className="body-lg text-white">{BRAND.address}</p>
              </div>
            </div>

            {/* Map */}
            <div className="contact-info-item mt-4 aspect-video rounded-sm overflow-hidden border border-border">
              <iframe
                src={BRAND.mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) grayscale(30%)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Studio Location"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
