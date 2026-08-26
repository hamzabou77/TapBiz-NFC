export interface ClientProfile {
  id: string;
  business_name: string;
  full_name?: string;
  job_title?: string;
  slug: string;
  logo: string;
  cover_image?: string;
  tagline?: string;
  description: string;
  bio?: string;
  city?: string;
  country?: string;
  themeColor?: string; // 'blue' | 'emerald' | 'purple' | 'dark' | 'amber' | 'rose' | hex
  phone: string;
  whatsapp: string;
  email: string;
  website: string;
  instagram: string;
  facebook: string;
  tiktok?: string;
  tiktok_url?: string;
  linkedin?: string;
  linkedin_url?: string;
  google_maps_url: string;
  google_review_url: string;
  address: string;
  status: 'active' | 'inactive';
  views_count?: number;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string; // e.g., 'Cartes NFC', 'Google Reviews', 'Supports', 'Plaques'
  imageUrl?: string;
  imageUrls?: string[]; // Array of images for carousel
  badge?: string; // e.g., 'CLASSIQUE', 'SOCIAL', 'POPULAIRE'
  isPopular: boolean;
  features?: string[];
  created_at?: string;
  updated_at?: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  billing_period: string;
  popular?: boolean;
  features: string[];
  description: string;
}

export interface SiteSettings {
  site_name: string;
  tagline: string;
  contact_phone: string;
  contact_whatsapp: string;
  contact_email: string;
  currency: string;
  custom_domain: string;
  pricing_plans: PricingPlan[];
}

export interface AdminUser {
  username: string;
  token?: string;
}
