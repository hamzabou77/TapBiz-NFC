export interface ClientProfile {
  id: string;
  business_name: string;
  slug: string;
  logo: string;
  cover_image?: string;
  tagline?: string;
  description: string;
  phone: string;
  whatsapp: string;
  email: string;
  website: string;
  instagram: string;
  facebook: string;
  google_maps_url: string;
  google_review_url: string;
  address: string;
  status: 'active' | 'inactive';
  views_count?: number;
  created_at: string;
  updated_at: string;
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
