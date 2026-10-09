export type AffiliateProfile = {
  name: string;
  last_name: string;
  type_document: string;
  document: string;
  country_code: string;
  phone: string;
  address: string;
  district_id: number | null;
  province_id: number | null;
  department_id: number | null;
  country_id: number | null;
};

export type Affiliate = {
  uuid: string;
  email: string;
  role: "affiliate";
  active: boolean;
  profile: AffiliateProfile;
  created_at: string;
};

export type AffiliateOption = {
  id: number;
  uuid: string;
  full_name: string;
};

export type AffiliateFormValues = {
  email: string;
  password: string;
  password_confirmation: string;
  name: string;
  last_name: string;
  type_document: string;
  document: string;
  phone: string;
  address: string;
};

export type AffiliatePayload = {
  email: string;
  password: string;
  password_confirmation: string;
  name: string;
  last_name: string;
  type_document: string;
  document: string;
  phone: string;
  address: string;
};

export type UpdateAffiliatePayload = {
  email: string;
  name: string;
  last_name: string;
  type_document: string;
  document: string;
  phone: string;
  address: string;
};

export type PaginatedResponse<T> = {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number | null;
  last_page: number;
  last_page_url: string;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number | null;
  total: number;
};

export type AffiliatesResponse = {
  success: boolean;
  message: string;
  data: PaginatedResponse<Affiliate>;
};

export type AffiliateOptionsResponse = {
  success: boolean;
  message: string;
  data: PaginatedResponse<AffiliateOption>;
};

export type AffiliateResponse = {
  success: boolean;
  message: string;
  data: Affiliate;
};

export type ActionResponse = {
  success: boolean;
  message: string;
};