export type UserProfile = {
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