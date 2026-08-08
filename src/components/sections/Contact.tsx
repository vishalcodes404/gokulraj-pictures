'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaWhatsapp,
  FaUser,
  FaCamera,
  FaPen,
  FaChevronDown,
  FaArrowRight,
  FaShieldAlt,
} from 'react-icons/fa';

export default function Contact() {
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
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
      className="relative min-h-screen bg-[#050505] text-white pt-[140px] pb-[120px] select-none flex flex-col justify-center items-center w-full bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(212,175,55,0.08),rgba(255,255,255,0))]"
      aria-label="Contact Gokulraj Pictures"
    >
      {/* Background Soft Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[480px] bg-[#D4AF37]/10 blur-[190px] pointer-events-none rounded-full" />

      {/* Top Header Section */}
      <div ref={headerRef} className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center text-center mb-12 relative z-10 px-4">
        <h1 className="font-serif text-[#E5C158] font-normal tracking-[0.3em] uppercase text-center text-base sm:text-lg block">
          GET IN TOUCH
        </h1>

        {/* Diamond Line Divider */}
        <div className="flex items-center justify-center gap-3 my-3 opacity-80">
          <div className="w-14 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
          <span className="text-[#E5C158] text-xs">◆</span>
          <div className="w-14 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
        </div>
      </div>

      {/* Main 2-Column Grid Container */}
      <div
        ref={contentRef}
        className="w-full max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch relative z-10"
      >
        {/* Left Column: Contact Info Card (lg:col-span-4) */}
        <div className="lg:col-span-4 rounded-[22px] border border-[#D4AF37]/35 bg-[#0a0a0c] p-7 sm:p-8 flex flex-col justify-between h-full shadow-[0_15px_40px_rgba(0,0,0,0.85)] text-left">
          <div>
            {/* 1. Studio Location */}
            <div className="flex items-start gap-4 mb-6">
              <div className="w-11 h-11 rounded-full border border-[#D4AF37]/45 flex items-center justify-center text-[#E5C158] bg-transparent shrink-0 mt-0.5">
                <FaMapMarkerAlt className="w-4 h-4 text-[#E5C158]" />
              </div>

              <div>
                <span className="text-[10.5px] tracking-[0.2em] font-sans font-extrabold text-[#E5C158] uppercase mb-1.5 block">
                  STUDIO LOCATION
                </span>
                <p className="text-xs sm:text-[13px] text-white/80 font-sans leading-relaxed">
                  Gokulraj Pictures Studio
                  <br />
                  123, Main Road, Near City Centre,
                  <br />
                  Coimbatore, Tamil Nadu - 641001
                </p>
              </div>
            </div>

            <div className="w-full h-[1px] bg-[#D4AF37]/20 my-5" />

            {/* 2. Phone */}
            <div className="flex items-start gap-4 mb-6">
              <div className="w-11 h-11 rounded-full border border-[#D4AF37]/45 flex items-center justify-center text-[#E5C158] bg-transparent shrink-0 mt-0.5">
                <FaPhoneAlt className="w-4 h-4 text-[#E5C158]" />
              </div>

              <div>
                <span className="text-[10.5px] tracking-[0.2em] font-sans font-extrabold text-[#E5C158] uppercase mb-1.5 block">
                  PHONE
                </span>
                <p className="text-xs sm:text-[13px] text-white/80 font-sans leading-relaxed">
                  +91 98765 43210
                  <br />
                  +91 87654 32109
                </p>
              </div>
            </div>

            <div className="w-full h-[1px] bg-[#D4AF37]/20 my-5" />

            {/* 3. Email */}
            <div className="flex items-start gap-4 mb-6">
              <div className="w-11 h-11 rounded-full border border-[#D4AF37]/45 flex items-center justify-center text-[#E5C158] bg-transparent shrink-0 mt-0.5">
                <FaEnvelope className="w-4 h-4 text-[#E5C158]" />
              </div>

              <div>
                <span className="text-[10.5px] tracking-[0.2em] font-sans font-extrabold text-[#E5C158] uppercase mb-1.5 block">
                  EMAIL
                </span>
                <p className="text-xs sm:text-[13px] text-white/80 font-sans leading-relaxed">
                  hello@gokulrajpictures.com
                  <br />
                  info@gokulrajpictures.com
                </p>
              </div>
            </div>

            <div className="w-full h-[1px] bg-[#D4AF37]/20 my-5" />

            {/* 4. Working Hours */}
            <div className="flex items-start gap-4 mb-6">
              <div className="w-11 h-11 rounded-full border border-[#D4AF37]/45 flex items-center justify-center text-[#E5C158] bg-transparent shrink-0 mt-0.5">
                <FaClock className="w-4 h-4 text-[#E5C158]" />
              </div>

              <div>
                <span className="text-[10.5px] tracking-[0.2em] font-sans font-extrabold text-[#E5C158] uppercase mb-1.5 block">
                  WORKING HOURS
                </span>
                <p className="text-xs sm:text-[13px] text-white/80 font-sans leading-relaxed">
                  Monday - Sunday
                  <br />
                  9:00 AM - 9:00 PM
                </p>
              </div>
            </div>

            <div className="w-full h-[1px] bg-[#D4AF37]/20 my-5" />
          </div>

          {/* 5. Follow Us */}
          <div className="pt-2">
            <span className="text-[10.5px] tracking-[0.2em] font-sans font-extrabold text-[#E5C158] uppercase text-center mb-3.5 block">
              FOLLOW US
            </span>

            <div className="flex items-center justify-center gap-3.5">
              <a
                href="https://instagram.com/gokulrajpictures"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full border border-[#D4AF37]/40 flex items-center justify-center text-[#E5C158] hover:border-[#E5C158] hover:bg-[#E5C158]/10 transition-all duration-300"
              >
                <FaInstagram className="w-4 h-4" />
              </a>

              <a
                href="https://facebook.com/gokulrajpictures"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full border border-[#D4AF37]/40 flex items-center justify-center text-[#E5C158] hover:border-[#E5C158] hover:bg-[#E5C158]/10 transition-all duration-300"
              >
                <FaFacebookF className="w-3.5 h-3.5" />
              </a>

              <a
                href="https://youtube.com/gokulrajpictures"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 rounded-full border border-[#D4AF37]/40 flex items-center justify-center text-[#E5C158] hover:border-[#E5C158] hover:bg-[#E5C158]/10 transition-all duration-300"
              >
                <FaYoutube className="w-4 h-4" />
              </a>

              <a
                href="https://wa.me/919894738911"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-full border border-[#D4AF37]/40 flex items-center justify-center text-[#E5C158] hover:border-[#E5C158] hover:bg-[#E5C158]/10 transition-all duration-300"
              >
                <FaWhatsapp className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Send Us A Message Card (lg:col-span-8) */}
        <div className="lg:col-span-8 rounded-[22px] border border-[#D4AF37]/35 bg-[#0a0a0c] p-7 sm:p-9 lg:p-10 flex flex-col justify-between h-full shadow-[0_15px_40px_rgba(0,0,0,0.85)] text-left">
          <form onSubmit={handleSubmit} className="flex flex-col justify-between h-full">
            <div>
              {/* Header inside Message Box */}
              <h2 className="font-serif text-[#E5C158] font-normal tracking-[0.3em] uppercase text-center text-sm sm:text-base mb-1 block">
                SEND US A MESSAGE
              </h2>

              <div className="flex items-center justify-center gap-3 my-3 opacity-80">
                <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
                <span className="text-[#E5C158] text-xs">◆</span>
                <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
              </div>

              {/* Form Fields Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-5 mt-6">
                {/* 1. Your Name */}
                <div className="relative flex items-center w-full">
                  <FaUser className="absolute left-4 text-[#E5C158] w-4 h-4 pointer-events-none" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    required
                    className="w-full h-[52px] rounded-xl border border-[#D4AF37]/30 bg-[#050505]/70 pl-11 pr-4 text-xs sm:text-sm text-white placeholder-white/40 focus:border-[#E5C158] focus:outline-none transition-colors font-sans"
                  />
                </div>

                {/* 2. Phone Number */}
                <div className="relative flex items-center w-full">
                  <FaPhoneAlt className="absolute left-4 text-[#E5C158] w-4 h-4 pointer-events-none" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    required
                    className="w-full h-[52px] rounded-xl border border-[#D4AF37]/30 bg-[#050505]/70 pl-11 pr-4 text-xs sm:text-sm text-white placeholder-white/40 focus:border-[#E5C158] focus:outline-none transition-colors font-sans"
                  />
                </div>

                {/* 3. Email Address */}
                <div className="relative flex items-center w-full">
                  <FaEnvelope className="absolute left-4 text-[#E5C158] w-4 h-4 pointer-events-none" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    required
                    className="w-full h-[52px] rounded-xl border border-[#D4AF37]/30 bg-[#050505]/70 pl-11 pr-4 text-xs sm:text-sm text-white placeholder-white/40 focus:border-[#E5C158] focus:outline-none transition-colors font-sans"
                  />
                </div>

                {/* 4. Shoot Type / Service Dropdown */}
                <div className="relative flex items-center w-full">
                  <FaCamera className="absolute left-4 text-[#E5C158] w-4 h-4 pointer-events-none z-10" />
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full h-[52px] rounded-xl border border-[#D4AF37]/30 bg-[#050505]/70 pl-11 pr-10 text-xs sm:text-sm text-white/80 focus:border-[#E5C158] focus:outline-none appearance-none cursor-pointer transition-colors font-sans"
                  >
                    <option value="" disabled className="bg-[#0a0a0c] text-white/40">
                      Shoot Type / Service
                    </option>
                    <option value="Wedding Photography" className="bg-[#0a0a0c] text-white">
                      Wedding Photography
                    </option>
                    <option value="Pre-Wedding Shoot" className="bg-[#0a0a0c] text-white">
                      Pre-Wedding Shoot
                    </option>
                    <option value="Baby & Newborn" className="bg-[#0a0a0c] text-white">
                      Baby & Newborn
                    </option>
                    <option value="Model / Fashion" className="bg-[#0a0a0c] text-white">
                      Model / Fashion
                    </option>
                    <option value="Events & Celebrations" className="bg-[#0a0a0c] text-white">
                      Events & Celebrations
                    </option>
                    <option value="Commercial / Brand" className="bg-[#0a0a0c] text-white">
                      Commercial / Brand
                    </option>
                  </select>
                  <FaChevronDown className="absolute right-4 text-[#E5C158] w-3 h-3 pointer-events-none" />
                </div>
              </div>

              {/* 5. Message Textarea */}
              <div className="relative flex w-full mb-6">
                <FaPen className="absolute left-4 top-4 text-[#E5C158] w-3.5 h-3.5 pointer-events-none" />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Tell us about your shoot, preferred date, location, etc."
                  required
                  className="w-full min-h-[140px] rounded-xl border border-[#D4AF37]/30 bg-[#050505]/70 pl-11 pt-3.5 pr-4 pb-4 text-xs sm:text-sm text-white placeholder-white/40 focus:border-[#E5C158] focus:outline-none transition-colors resize-none font-sans"
                />
              </div>
            </div>

            {/* Action Button & Privacy Note */}
            <div className="mt-auto pt-4 w-full">
              <button
                type="submit"
                className="w-full h-[54px] relative flex items-center justify-center rounded-xl bg-gradient-to-r from-[#d9a24a] via-[#f0cc71] to-[#c78f35] text-[#111111] shadow-[0_4px_20px_rgba(212,175,55,0.25)] hover:brightness-110 transition-all duration-300 group/btn cursor-pointer font-sans font-extrabold text-xs tracking-[0.25em] uppercase"
              >
                <span>SEND MESSAGE</span>
                <FaArrowRight className="absolute right-6 w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform duration-300" />
              </button>

              <div className="flex items-center justify-center gap-2 mt-4 text-[11px] text-white/50 font-sans tracking-wide">
                <FaShieldAlt className="text-[#E5C158] w-3.5 h-3.5" />
                <span>We respect your privacy. Your details are safe with us.</span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
