import type { LocationItem } from "@/modules/auth/types/locationTypes";

export type UserProfile = {
  name: string;
  last_name: string;
  type_document: string;
  document: string;
  country_code: string;
  phone: string;
  address: string;

  country: LocationItem | null;
  department: LocationItem | null;
  province: LocationItem | null;
  district: LocationItem | null;
};

export type ProfileData = {
  uuid: string;
  email: string;
  email_verified_at: string | null;
  role: "user" | "affiliate" | "admin" | "superadmin";
  profile: UserProfile;
};

export type ProfileResponse = {
  success: boolean;
  message: string;
  data: ProfileData;
};

export type UpdateProfilePayload = {
  name: string;
  last_name: string;
  phone: string;
  address: string;
  district_id: number;
  province_id: number;
  department_id: number;
};

export type UpdateProfileResponse = {
  success: boolean;
  message: string;
  data?: ProfileData;
};

export type UpdatePasswordPayload = {
  current_password: string;
  password: string;
  password_confirmation: string;
};

export type UpdatePasswordResponse = {
  success: boolean;
  message: string;
};