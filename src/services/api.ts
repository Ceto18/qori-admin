// src/services/api.ts

import axios, { AxiosHeaders } from "axios";
import { useAuthStore } from "@/store/useAuthStore";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Accept: "application/json",
  },
});

const isAuthUrl = (url: string) => {
  return (
    url.includes("/auth/login") ||
    url.includes("/auth/register") ||
    url.includes("/auth/forgot-password") ||
    url.includes("/auth/reset-password")
  );
};

const getPersistedToken = (): string | null => {
  if (typeof window === "undefined") return null;

  const persisted = localStorage.getItem("auth-storage");

  if (!persisted) return null;

  try {
    const parsed = JSON.parse(persisted);

    return parsed?.state?.token ?? null;
  } catch {
    localStorage.removeItem("auth-storage");
    return null;
  }
};

api.interceptors.request.use((config) => {
  const url = config.url ?? "";
  const isAuthRequest = isAuthUrl(url);

  const headers = AxiosHeaders.from(config.headers);
  config.headers = headers;

  headers.set("Accept", "application/json");

  if (isAuthRequest) {
    headers.delete("Authorization");
    headers.set("Content-Type", "application/json");
    return config;
  }

  const storeToken = useAuthStore.getState().token;
  const persistedToken = getPersistedToken();

  const token = storeToken || persistedToken;

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  } else {
    headers.delete("Authorization");
  }

  if (config.data instanceof FormData) {
    headers.delete("Content-Type");
  } else {
    headers.set("Content-Type", "application/json");
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const url = error.config?.url ?? "";
    const isAuthRequest = isAuthUrl(url);

    if (error.response?.status === 401 && !isAuthRequest) {
      const token = useAuthStore.getState().token || getPersistedToken();

      /**
       * Solo cerramos sesión si realmente había token.
       * Esto evita borrar la sesión por una petición que salió antes de hidratar.
       */
      if (token) {
        useAuthStore.getState().logout();
      }
    }

    return Promise.reject(error);
  }
);