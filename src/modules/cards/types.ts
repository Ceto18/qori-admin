// src/modules/cards/types/index.ts

export type CardTemplateKey =
  | "classic"
  | "modern"
  | "corporate"
  | "minimal"
  | "premium";

export type CardStatus = "active" | "inactive";

export interface Card {
  uuid: string;
  full_name: string;
  position?: string | null;
  company?: string | null;
  profession?: string | null;
  email?: string | null;
  phone?: string | null;
  whatsapp?: string | null;
  website?: string | null;
  location?: string | null;
  bio?: string | null;
  slug?: string | null;
  template_key: CardTemplateKey;
  primary_color?: string | null;
  secondary_color?: string | null;
  profile_image?: string | null;
  banner_image?: string | null;
  status?: CardStatus;
  created_at?: string;
  updated_at?: string;
}

export interface CardFormValues {
  full_name: string;
  position: string;
  company: string;
  profession: string;
  email: string;
  phone: string;
  whatsapp: string;
  website: string;
  location: string;
  bio: string;
  slug: string;
  template_key: CardTemplateKey;
  primary_color: string;
  secondary_color: string;
  status: CardStatus;
  profile_image?: File | null;
  banner_image?: File | null;
}

export interface CardTemplate {
  key: CardTemplateKey;
  name: string;
  description: string;
}