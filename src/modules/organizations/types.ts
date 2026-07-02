export interface Organization {
  uuid: string;
  name: string;
  role: string;

  description?: string | null;
  slug?: string;
  address?: string | null;
  country?: string | null;
  city?: string | null;
  phone?: string | null;
  website?: string | null;
  active?: boolean;
  logo_url?: string | null;
}

export interface OrganizationDetail {
  uuid: string;
  name: string;
  role?: string | null;

  description: string | null;
  slug: string;

  address: string | null;
  country: string | null;
  city: string | null;

  phone: string | null;
  website: string | null;

  active: boolean;
  logo_url: string | null;

  created_at?: string;
  updated_at?: string;
}