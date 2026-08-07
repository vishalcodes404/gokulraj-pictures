import { NavLink, StatItem, TimelineItem } from '@/src/types';

export const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Plans', href: '/plans' },
  { label: 'Shoots', href: '/shoots' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export const BRAND = {
  name: 'Gokulraj Pictures',
  tagline: 'Capturing Stories That Last Forever',
  phone: '+91 98765 43210',
  email: 'hello@gokulrajpictures.com',
  instagram: '@gokulrajpictures',
  whatsapp: '+919876543210',
  address: '123 Photography Lane, Creative District, Chennai, Tamil Nadu 600001',
  mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248849.886539092!2d80.04919045!3d13.047525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265ea4f7d3361%3A0x6e61a70b6863d433!2sChennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
};

export const STATS: StatItem[] = [
  { value: 500, suffix: '+', label: 'Happy Clients' },
  { value: 300, suffix: '+', label: 'Weddings' },
  { value: 10, suffix: '+', label: 'Years Experience' },
  { value: 1000, suffix: '+', label: 'Stories Captured' },
];

export const TIMELINE: TimelineItem[] = [
  {
    year: '2014',
    title: 'The Beginning',
    description: 'Gokulraj Pictures was born from a passion for storytelling through the lens.',
  },
  {
    year: '2016',
    title: 'First Wedding',
    description: 'Captured our first major wedding, setting the standard for cinematic wedding photography.',
  },
  {
    year: '2018',
    title: 'Studio Launch',
    description: 'Opened our flagship studio with state-of-the-art equipment and creative spaces.',
  },
  {
    year: '2020',
    title: 'Going Cinematic',
    description: 'Expanded into cinematography, bringing film-quality visuals to every project.',
  },
  {
    year: '2022',
    title: '500+ Clients',
    description: 'Crossed 500 happy clients with weddings, portraits, and commercial projects.',
  },
  {
    year: '2024',
    title: 'Award Winning',
    description: 'Recognized as one of the top photography studios with multiple industry awards.',
  },
];

export const SOCIAL_LINKS = [
  { label: 'Instagram', url: 'https://instagram.com/gokulrajpictures', icon: 'FaInstagram' },
  { label: 'Facebook', url: 'https://facebook.com/gokulrajpictures', icon: 'FaFacebookF' },
  { label: 'YouTube', url: 'https://youtube.com/gokulrajpictures', icon: 'FaYoutube' },
  { label: 'WhatsApp', url: 'https://wa.me/919876543210', icon: 'FaWhatsapp' },
];
