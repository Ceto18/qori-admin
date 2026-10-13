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

export type AffiliateInfoUser = {
  uuid: string;
  email: string;
  active: boolean;
};

export type AffiliateDiscountCode = {
  uuid: string;
  name: string;
  code: string;
};

export type AffiliateInfo = {
  user: AffiliateInfoUser;
  discount_code: AffiliateDiscountCode;
  total_uses: number;
};

export type AffiliateInfoResponse = {
  success: boolean;
  message: string;
  data: AffiliateInfo;
};

export type AffiliateReferralSubscription = {
  name: string;
  status: string;
};

export type AffiliateReferral = {
  uuid: string;
  full_name: string;
  document: string;
  used_at: string;
  discount_amount: string;
  subscription: AffiliateReferralSubscription;
};

export type AffiliateReferralLink = {
  url: string | null;
  label: string;
  page: number | null;
  active: boolean;
};

export type AffiliateReferralsPagination = {
  current_page: number;
  data: AffiliateReferral[];
  first_page_url: string;
  from: number | null;
  last_page: number;
  last_page_url: string;
  links: AffiliateReferralLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number | null;
  total: number;
};

export type AffiliateReferralsResponse = {
  success: boolean;
  message: string;
  data: AffiliateReferralsPagination;
};