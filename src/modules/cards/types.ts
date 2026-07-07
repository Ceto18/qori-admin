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

export interface CardNetworkMeta {
  uuid: string;
  name: string;
  type?: SocialNetworkType;
  icon_url: string | null;
}

export interface CardNetwork {
  /**
   * UUID del registro network de la tarjeta.
   * Este NO es el UUID de la red social.
   */
  uuid: string;

  value: string;
  label: string;

  /**
   * UUID real de la red social.
   * Este es el valor que se envía como:
   * networks[0][red_social]
   */
  red_social?: string;
  red_social_uuid?: string;

  /**
   * Datos auxiliares para mostrar en el formulario.
   */
  name?: string;
  icon?: string | null;
  icon_url?: string | null;

  /**
   * Objeto que devuelve el backend cuando se obtiene una tarjeta.
   * Aquí viene la red social real:
   * type.uuid
   * type.name
   * type.icon_url
   */
  type?: CardNetworkMeta;
}

export interface CardDocument {
  /**
   * UUID del documento guardado en backend.
   * Cuando el documento es nuevo, todavía no existe UUID.
   */
  uuid?: string;

  /**
   * Nombre original o visible del documento.
   */
  name: string;

  /**
   * URL pública del documento guardado en backend.
   * Solo existe cuando el documento ya fue recuperado desde la API.
   */
  document_url?: string;
}

export interface Card {
  uuid: string;

  /**
   * Slug público de la tarjeta.
   * Viene en el listado:
   * /organization/{organizationUuid}/cards
   */
  slug?: string | null;

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

  /**
   * El backend devuelve documentos como objetos.
   */
  documents?: CardDocument[];

  networks?: CardNetwork[];

  created_at?: string;
  updated_at?: string;
}

export interface CardPagination {
  current_page: number;
  data: Card[];
  from: number | null;
  last_page: number;
  per_page: number;
  to: number | null;
  total: number;

  first_page_url?: string | null;
  last_page_url?: string | null;
  next_page_url?: string | null;
  prev_page_url?: string | null;
  path?: string;
}

export interface CardsResponse {
  success: boolean;
  message: string;
  data: CardPagination;
}

export interface CardResponse {
  success: boolean;
  message: string;
  data: Card;
}

export interface CardUrlResponse {
  success: boolean;
  message: string;
  data: string;
}

export interface CardQrResponse {
  success: boolean;
  message: string;
  data: string;
}

export interface CardFormValues {
  first_name: string;
  last_name: string;

  full_name: string;

  position: string;
  institution: string;
  profession: string;
  ubication: string;
  description: string;

  design_id: string;

  primary_color: string;
  secondary_color: string;

  photo_perfil?: File | null;
  photo_banner?: File | null;

  photo_perfil_url?: string | null;
  photo_banner_url?: string | null;

  qualities: CardQuality[];

  /**
   * En create/update puede contener:
   * - File: documentos nuevos seleccionados desde el formulario.
   * - CardDocument: documentos ya guardados que vienen del backend.
   * - null: espacios vacíos temporales del formulario.
   */
  documents: Array<File | CardDocument | null>;

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