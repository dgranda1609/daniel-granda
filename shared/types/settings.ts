export interface SiteSettings {
  contact_email: string;
  contact_phone: string;
  social_instagram: string;
  social_linkedin: string;
  social_x: string;
  hero_video_id: string;
  stats: StatItem[];
  services: ServiceItem[];
}

export interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

export interface ServiceItem {
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
}
