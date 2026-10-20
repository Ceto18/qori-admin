import { api } from "@/services/api";
import type { AuthUser } from "@/store/useAuthStore";

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
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

  country_id: number;
  department_id: number;
  province_id: number;
  district_id: number;
};

export type ForgotPasswordPayload = {
  email: string;
};

export type ResetPasswordPayload = {
  email: string;
  token: string;
  password: string;
  password_confirmation: string;
};

export type AuthResponse = {
  user: AuthUser | null;
  token: string | null;
  refreshToken: string | null;
  expiresIn: number | null;
  message: string;
};

export type RefreshResponse = {
  token: string | null;
  refreshToken: string | null;
  role: string | null;
  expiresIn: number | null;
  message: string;
};

export type ForgotPasswordResponse = {
  success: boolean;
  message: string;
};

export type ResetPasswordResponse = {
  success: boolean;
  message: string;
};

export const loginRequest = async (
  data: LoginPayload
): Promise<AuthResponse> => {
  const response = await api.post(
    "/auth/login",
    data
  );

  const payload = response.data?.data;

  return {
    user: payload?.user ?? null,
    token:
      payload?.access_token ??
      null,
    refreshToken:
      payload?.refresh_token ??
      null,
    expiresIn:
      payload?.expires_in ??
      null,
    message:
      response.data?.message ??
      "Inicio de sesión correcto.",
  };
};

export const registerRequest = async (
  data: RegisterPayload
): Promise<AuthResponse> => {
  const response = await api.post(
    "/auth/register",
    data
  );

  const payload = response.data?.data;

  return {
    user: payload?.user ?? null,
    token:
      payload?.access_token ??
      payload?.token ??
      null,
    refreshToken:
      payload?.refresh_token ??
      null,
    expiresIn:
      payload?.expires_in ??
      null,
    message:
      response.data?.message ??
      "Registro correcto.",
  };
};

export const refreshRequest = async (
  refreshToken: string
): Promise<RefreshResponse> => {
  const response = await api.post(
    "/auth/refresh",
    {
      refresh_token: refreshToken,
    }
  );

  const payload = response.data?.data;

  return {
    token:
      payload?.access_token ??
      null,
    refreshToken:
      payload?.refresh_token ??
      null,
    role:
      payload?.role ??
      null,
    expiresIn:
      payload?.expires_in ??
      null,
    message:
      response.data?.message ??
      "Token actualizado.",
  };
};

export const forgotPasswordRequest = async (
  data: ForgotPasswordPayload
): Promise<ForgotPasswordResponse> => {
  const response = await api.post(
    "/auth/forgot-password",
    data
  );

  return {
    success:
      response.data?.success ??
      true,
    message:
      response.data?.message ??
      "Se envió el enlace de recuperación a tu correo.",
  };
};

export const resetPasswordRequest = async (
  data: ResetPasswordPayload
): Promise<ResetPasswordResponse> => {
  const response = await api.post(
    "/auth/reset-password",
    data
  );

  return {
    success:
      response.data?.success ??
      true,
    message:
      response.data?.message ??
      "Contraseña actualizada correctamente.",
  };
};