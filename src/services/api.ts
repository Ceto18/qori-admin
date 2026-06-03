import axios from "axios";
import { useAuthStore } from "@/store/useAuthStore";

export const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.request.use((config) => {
  const url = config.url ?? "";

  const isAuthRequest =
    url.includes("/auth/login") ||
    url.includes("/auth/register") ||
    url.includes("/auth/forgot-password") ||
    url.includes("/auth/reset-password");

  if (isAuthRequest) {
    if (config.headers) {
      delete config.headers.Authorization;
    }

    console.log("TOKEN FINAL: auth request sin token");
    return config;
  }

  let token = useAuthStore.getState().token;

  if (!token && typeof window !== "undefined") {
    const persisted = localStorage.getItem("auth-storage");

    if (persisted) {
      try {
        const parsed = JSON.parse(persisted);
        token = parsed?.state?.token ?? null;
      } catch {
        localStorage.removeItem("auth-storage");
        token = null;
      }
    }
  }

  console.log("TOKEN FINAL:", token);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("❌ AXIOS ERROR:", {
      status: error.response?.status,
      data: error.response?.data,
    });

    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
    }

    return Promise.reject(error);
  }
);