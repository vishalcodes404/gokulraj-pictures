'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaInstagram,
  FaWhatsapp,
  FaArrowRight,
  FaPaperPlane,
} from 'react-icons/fa';
import { BRAND } from '@/src/constants/navigation';

export default function Contact() {
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'Royal Wedding Photography',
    message: '',
  });

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({ delay: 0.15 });

    if (headerRef.current) {
      tl.fromTo(
        headerRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out' }
      );
    }

    if (contentRef.current) {
      tl.fromTo(
        contentRef.current.children,
        { opacity: 0, y: 30, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.85,
          stagger: 0.12,
          ease: 'power3.out',
        },
        '-=0.4'
      );
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hi Gokulraj Pictures!\n\nName: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nService: ${formData.service}\nMessage: ${formData.message}`;
    const whatsappUrl = `https://wa.me/919894738911?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section
      ref={containerRef}
      id="contact"
      className="relative min-h-screen bg-white text-[#111111] pt-[120px] pb-[120px] select-none flex flex-col justify-center items-center w-full"
      aria-label="Contact Gokulraj Pictures"
    >
      {/* Top Header Section */}
      <div
        ref={headerRef}
        className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center text-center mb-16 relative z-10 px-4"
      >
        <span className="text-[10px] sm:text-xs tracking-[0.45em] text-[#B8860B] uppercase font-sans font-semibold block mb-3">
          CONNECT WITH THE STUDIO
        </span>

        <h1 className="font-serif text-4xl sm:text-6xl font-light text-[#111111] tracking-[0.08em] uppercase leading-tight mb-4">
          LET&apos;S TALK
        </h1>

        <div className="w-16 h-[1px] bg-[#B8860B] mx-auto my-4" />

        <p className="font-sans text-sm sm:text-base text-[#555555] font-light max-w-lg leading-relaxed">
          We accept an intentionally limited calendar of commissions each year to ensure personal, uncompromising dedication to every celebration.
        </p>
      </div>

      {/* Main 2-Column Grid Container */}
      <div
        ref={contentRef}
        className="w-full max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative z-10"
      >
        {/* Left Column: Contact Info Card (lg:col-span-5) */}
        <div className="lg:col-span-5 rounded-[22px] border border-black/10 bg-[#FAFAFA] p-8 sm:p-10 flex flex-col justify-between h-full shadow-sm text-left">
          <div>
            <h2 className="font-serif text-2xl text-[#111111] tracking-[0.1em] uppercase font-medium mb-8">
              Gokulraj Pictures Studio
            </h2>

            {/* 1. Studio Location */}
            <div className="flex items-start gap-4 mb-6">
              <div className="w-11 h-11 rounded-full border border-black/10 flex items-center justify-center text-[#B8860B] bg-white shrink-0 mt-0.5 shadow-sm">
                <FaMapMarkerAlt className="w-4 h-4 text-[#B8860B]" />
              </div>

              <div>
                <span className="text-[10px] tracking-[0.25em] font-sans font-semibold text-[#B8860B] uppercase mb-1 block">
                  STUDIO LOCATION
                </span>
                <p className="text-xs sm:text-[13px] text-[#333333] font-sans leading-relaxed">
                  Gokulraj Pictures
                  <br />
                  Coimbatore, Tamil Nadu, South India - 641001
                  <br />
                  Available for destination weddings across India &amp; Worldwide
                </p>
              </div>
            </div>

            <div className="w-full h-[1px] bg-black/5 my-5" />

            {/* 2. Direct Phone & WhatsApp */}
            <div className="flex items-start gap-4 mb-6">
              <div className="w-11 h-11 rounded-full border border-black/10 flex items-center justify-center text-[#B8860B] bg-white shrink-0 mt-0.5 shadow-sm">
                <FaPhoneAlt className="w-4 h-4 text-[#B8860B]" />
              </div>

              <div>
                <span className="text-[10px] tracking-[0.25em] font-sans font-semibold text-[#B8860B] uppercase mb-1 block">
                  PHONE &amp; WHATSAPP
                </span>
                <p className="text-xs sm:text-[13px] text-[#333333] font-sans leading-relaxed">
                  +91 98947 38911
                </p>
              </div>
            </div>

            <div className="w-full h-[1px] bg-black/5 my-5" />

            {/* 3. Email */}
            <div className="flex items-start gap-4 mb-6">
              <div className="w-11 h-11 rounded-full border border-black/10 flex items-center justify-center text-[#B8860B] bg-white shrink-0 mt-0.5 shadow-sm">
                <FaEnvelope className="w-4 h-4 text-[#B8860B]" />
              </div>

              <div>
                <span className="text-[10px] tracking-[0.25em] font-sans font-semibold text-[#B8860B] uppercase mb-1 block">
                  EMAIL
                </span>
                <p className="text-xs sm:text-[13px] text-[#333333] font-sans leading-relaxed">
                  hello@gokulrajpictures.com
                </p>
              </div>
            </div>

            <div className="w-full h-[1px] bg-black/5 my-5" />

            {/* 4. Working Hours */}
            <div className="flex items-start gap-4 mb-6">
              <div className="w-11 h-11 rounded-full border border-black/10 flex items-center justify-center text-[#B8860B] bg-white shrink-0 mt-0.5 shadow-sm">
                <FaClock className="w-4 h-4 text-[#B8860B]" />
              </div>

              <div>
                <span className="text-[10px] tracking-[0.25em] font-sans font-semibold text-[#B8860B] uppercase mb-1 block">
                  COMMISSION HOURS
                </span>
                <p className="text-xs sm:text-[13px] text-[#333333] font-sans leading-relaxed">
                  Monday - Sunday: 9:00 AM - 8:00 PM
                  <br />
                  By Exclusive Appointment
                </p>
              </div>
            </div>
          </div>

          {/* WhatsApp Direct Action Button */}
          <div className="mt-8 pt-6 border-t border-black/10">
            <a
              href="https://wa.me/919894738911"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 w-full justify-center py-3.5 px-6 rounded-full bg-[#25D366] text-white font-sans text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#20ba59] transition-all shadow-md"
            >
              <FaWhatsapp size={16} />
              <span>DIRECT WHATSAPP INQUIRY</span>
            </a>
          </div>

          {/* Embedded Studio Map */}
          <div className="mt-6">
            <div className="w-full h-40 rounded-xl overflow-hidden border border-black/10">
              <iframe
                src={BRAND.mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Coimbatore Studio Location"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Inquiry Form (lg:col-span-7) */}
        <div className="lg:col-span-7 rounded-[22px] border border-black/10 bg-[#FAFAFA] p-8 sm:p-12 shadow-sm">
          <h2 className="font-serif text-2xl sm:text-3xl text-[#111111] tracking-[0.08em] uppercase font-medium mb-3">
            Inquire for Availability
          </h2>
          <p className="text-xs sm:text-sm text-[#666666] mb-8 font-light">
            Share the details of your wedding or portrait session. We reply promptly within 4 hours.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-[11px] font-sans uppercase tracking-[0.2em] text-[#555555] mb-2 font-medium">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Ananya & Arjun"
                  className="w-full px-4 py-3.5 rounded-lg border border-black/15 bg-white text-sm text-[#111111] placeholder:text-[#999999] focus:outline-none focus:border-[#B8860B]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-sans uppercase tracking-[0.2em] text-[#555555] mb-2 font-medium">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-3.5 rounded-lg border border-black/15 bg-white text-sm text-[#111111] placeholder:text-[#999999] focus:outline-none focus:border-[#B8860B]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-[11px] font-sans uppercase tracking-[0.2em] text-[#555555] mb-2 font-medium">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@domain.com"
                  className="w-full px-4 py-3.5 rounded-lg border border-black/15 bg-white text-sm text-[#111111] placeholder:text-[#999999] focus:outline-none focus:border-[#B8860B]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-sans uppercase tracking-[0.2em] text-[#555555] mb-2 font-medium">
                  Service Requested *
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 rounded-lg border border-black/15 bg-white text-sm text-[#111111] focus:outline-none focus:border-[#B8860B]"
                >
                  <option value="Royal Wedding Photography">Royal Wedding Photography</option>
                  <option value="Wedding Cinematography">Wedding Cinematography</option>
                  <option value="Pre-Wedding Love Story">Pre-Wedding Love Story</option>
                  <option value="Baby & Newborn Portrait">Baby &amp; Newborn Portrait</option>
                  <option value="Fashion / Editorial Shoot">Fashion / Editorial Shoot</option>
                  <option value="Events & Celebrations">Events &amp; Celebrations</option>
                  <option value="Commercial Brand Campaign">Commercial Brand Campaign</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-sans uppercase tracking-[0.2em] text-[#555555] mb-2 font-medium">
                Celebration Details &amp; Date
              </label>
              <textarea
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                placeholder="Dates, venue city/resort, expected guests, or any specific vision you have in mind..."
                className="w-full px-4 py-3.5 rounded-lg border border-black/15 bg-white text-sm text-[#111111] placeholder:text-[#999999] focus:outline-none focus:border-[#B8860B]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 px-8 rounded-full bg-[#111111] text-white hover:bg-[#B8860B] transition-colors font-sans text-xs tracking-[0.25em] uppercase font-semibold flex items-center justify-center gap-3 shadow-lg cursor-pointer"
            >
              <span>SEND INQUIRY VIA WHATSAPP</span>
              <FaPaperPlane size={12} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
