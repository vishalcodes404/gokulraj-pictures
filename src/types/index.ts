export type PortfolioCategory =
  | 'All'
  | 'Wedding'
  | 'Pre Wedding'
  | 'Portrait'
  | 'Commercial'
  | 'Fashion'
  | 'Events'
  | 'Baby Shoot'
  | 'Cinematography';

export interface PortfolioProject {
  id: string;
  slug: string;
  title: string;
  category: PortfolioCategory | string;
  coverImage: string;
  images: string[];
  description: string;
  client?: string;
  date?: string;
  year?: string;
  location?: string;
  featured?: boolean;
  size?: 'small' | 'medium' | 'large';
  aspectRatio?: 'tall' | 'wide' | 'square' | 'portrait';
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  image?: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar?: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
}
