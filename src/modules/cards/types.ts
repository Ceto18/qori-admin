// src/modules/cards/types/index.ts

export type CardTemplateKey =
  | "classic"
  | "modern"
  | "corporate"
  | "minimal"
  | "premium";

export type SocialNetworkType = "email" | "url" | "phone" | string;

export interface CardQuality {
  uuid?: string;
  name: string;
}

export interface CardNetwork {
  uuid: string;
  value: string;
  label: string;

  name?: string;
  icon?: string | null;
  icon_url?: string | null;
  type?: SocialNetworkType;
}

export interface Card {
  uuid: string;

  first_name?: string | null;
  last_name?: string | null;
  full_name?: string | null;

  position?: string | null;
  institution?: string | null;
  profession?: string | null;
  ubication?: string | null;
  description?: string | null;

  design_id: string | number;

  primary_color?: string | null;
  secondary_color?: string | null;

  photo_perfil_url?: string | null;
  photo_banner_url?: string | null;

  active?: boolean;

  qualities?: CardQuality[];
  documents?: string[];
  networks?: CardNetwork[];

  created_at?: string;
  updated_at?: string;
}

export interface CardFormValues {
  first_name: string;
  last_name: string;

  // Solo para previsualización
  full_name: string;

  position: string;
  institution: string;
  profession: string;
  ubication: string;
  description: string;

  design_id: string;

  primary_color: string;
  secondary_color: string;

  // Archivos que se envían al backend
  photo_perfil?: File | null;
  photo_banner?: File | null;

  // URLs que devuelve el backend para edición / preview
  photo_perfil_url?: string | null;
  photo_banner_url?: string | null;

  qualities: CardQuality[];
  documents: Array<File | null>;
  networks: CardNetwork[];
}

export interface CardTemplate {
  id: string;
  key: CardTemplateKey;
  name: string;
  description: string;
}

export interface SocialNetwork {
  uuid: string;
  name: string;
  icon_url: string | null;
  type?: SocialNetworkType;
}

export interface SocialNetworkOption {
  label: string;
  value: string;
}