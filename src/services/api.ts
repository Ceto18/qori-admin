import axios from "axios";
import { useAuthStore } from "@/store/useAuthStore";

export const api = axios.create({
  baseURL: "/api",
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

api.interceptors.request.use((config) => {
  const url = config.url ?? "";

  const isAuthRequest = isAuthUrl(url);

  if (isAuthRequest) {
    if (config.headers) {
      delete config.headers.Authorization;
    }

    console.log("TOKEN FINAL: auth request sin token");

    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    } else {
      config.headers["Content-Type"] = "application/json";
    }

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

  if (config.data instanceof FormData) {
    delete config.headers["Content-Type"];
  } else {
    config.headers["Content-Type"] = "application/json";
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

    const url = error.config?.url ?? "";
    const isAuthRequest = isAuthUrl(url);

    if (error.response?.status === 401 && !isAuthRequest) {
      useAuthStore.getState().logout();
    }

    return Promise.reject(error);
  }
);