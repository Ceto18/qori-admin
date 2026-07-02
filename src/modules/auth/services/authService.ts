import { api } from "@/services/api";

export type UserRole = "user" | "admin" | "superadmin";

export type AuthUser = {
  uuid: string;
  name: string;
  last_name: string;
  email: string;
  role: UserRole;
};

type LoginPayload = {
  email: string;
  password: string;
};

type RegisterPayload = {
  email: string;
  password: string;
  password_confirmation: string;

  name: string;
  last_name: string;
  type_document: string;
  document: string;
  country_code: string;
  phone: string;
  address: string;
  district: string;
  province: string;
  department: string;
  country: string;
};

type AuthResponse = {
  user: AuthUser | null;
  token: string | null;
  refreshToken: string | null;
  expiresIn: number | null;
  message: string;
};

export const loginRequest = async (
  data: LoginPayload
): Promise<AuthResponse> => {
  const response = await api.post("/auth/login", data);

  const payload = response.data?.data;

  return {
    user: payload?.user ?? null,
    token: payload?.access_token ?? null,
    refreshToken: payload?.refresh_token ?? null,
    expiresIn: payload?.expires_in ?? null,
    message: response.data?.message ?? "Inicio de sesión correcto.",
  };
};

export const registerRequest = async (
  data: RegisterPayload
): Promise<AuthResponse> => {
  const response = await api.post("/auth/register", data);

  const payload = response.data?.data;

  return {
    user: payload?.user ?? null,
    token: payload?.access_token ?? payload?.token ?? null,
    refreshToken: payload?.refresh_token ?? null,
    expiresIn: payload?.expires_in ?? null,
    message: response.data?.message ?? "Registro correcto.",
  };
};