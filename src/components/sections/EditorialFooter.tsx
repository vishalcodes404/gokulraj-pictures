'use client';

import { BRAND } from '@/src/constants/navigation';
import { FaInstagram, FaWhatsapp, FaEnvelope, FaPhone, FaMapMarkerAlt, FaArrowUp } from 'react-icons/fa';

export default function EditorialFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="editorial-footer" id="contact" role="contentinfo">
      {/* Logo */}
      <div className="footer-fade">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            overflow: 'hidden',
            marginBottom: 14,
            border: '0.5px solid #e8e6e3',
          }}>
            <img
              src="/images/logo.png"
              alt="Gokulraj Pictures"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <span className="footer-logo-text">GOKULRAJ</span>
          <span className="footer-logo-sub">PICTURES</span>
        </div>
        <p className="footer-tagline">
          Capturing timeless stories with fine-art elegance
        </p>
      </div>

      {/* Social Links */}
      <div className="footer-fade footer-social-links">
        <a
          href="https://instagram.com/gokulrajpictures"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <FaInstagram size={16} />
        </a>
        <a
          href={`https://wa.me/${BRAND.whatsapp.replace(/[^0-9]/g, '')}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
        >
          <FaWhatsapp size={16} />
        </a>
        <a
          href={`mailto:${BRAND.email}`}
          aria-label="Email"
        >
          <FaEnvelope size={15} />
        </a>
        <a
          href={`tel:${BRAND.phone.replace(/\s/g, '')}`}
          aria-label="Phone"
        >
          <FaPhone size={14} />
        </a>
        <a
          href="https://maps.google.com/?q=Coimbatore,+Tamil+Nadu"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Studio Location"
        >
          <FaMapMarkerAlt size={15} />
        </a>
      </div>

      {/* Contact Details Grid */}
      <div className="footer-fade footer-contact-grid">
        <div className="footer-contact-item">
          <span className="contact-label">Email</span>
          <a href={`mailto:${BRAND.email}`} className="contact-value">
            {BRAND.email}
          </a>
        </div>
        <div className="footer-contact-item">
          <span className="contact-label">Phone</span>
          <a href={`tel:${BRAND.phone.replace(/\s/g, '')}`} className="contact-value">
            {BRAND.phone}
          </a>
        </div>
        <div className="footer-contact-item">
          <span className="contact-label">Instagram</span>
          <a
            href="https://instagram.com/gokulrajpictures"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-value"
          >
            {BRAND.instagram}
          </a>
        </div>
        <div className="footer-contact-item">
          <span className="contact-label">Studio</span>
          <span className="contact-value">
            Coimbatore, Tamil Nadu, India
          </span>
        </div>
      </div>

      {/* Google Maps Embed */}
      <div className="footer-fade footer-map-wrapper">
        <iframe
          src={BRAND.mapUrl}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Gokulraj Pictures Studio Location"
        />
      </div>

      {/* Bottom Bar: Copyright + Back to Top */}
      <div className="footer-fade footer-bottom">
        <span className="footer-copyright">
          © {new Date().getFullYear()} Gokulraj Pictures. All rights reserved.
        </span>
        <button
          className="footer-back-to-top"
          onClick={scrollToTop}
          aria-label="Back to top"
        >
          <FaArrowUp size={10} />
          BACK TO TOP
        </button>
      </div>
    </footer>
  );
}
