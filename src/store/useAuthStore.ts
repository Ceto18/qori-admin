// src/store/useAuthStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type UserRole = "user" | "admin" | "superadmin";

export type AuthUser = {
  uuid: string;
  name: string;
  last_name: string;
  email: string;
  role: UserRole;
};

interface AuthState {
  user: AuthUser | null;
  token: string | null;

  setAuth: (data: { user: AuthUser; token: string }) => void;
  logout: () => void;

  hasRole: (roles: UserRole[]) => boolean;
  isUser: () => boolean;
  isAdmin: () => boolean;
  isSuperAdmin: () => boolean;
  isAdminOrSuperAdmin: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,

      setAuth: ({ user, token }) => {
        set({
          user,
          token,
        });
      },

      logout: () => {
        set({
          user: null,
          token: null,
        });

        if (typeof window !== "undefined") {
          localStorage.removeItem("auth-storage");
          window.location.href = "/signin";
        }
      },

      hasRole: (roles) => {
        const user = get().user;

        if (!user) return false;

        return roles.includes(user.role);
      },

      isUser: () => {
        return get().user?.role === "user";
      },

      isAdmin: () => {
        return get().user?.role === "admin";
      },

      isSuperAdmin: () => {
        return get().user?.role === "superadmin";
      },

      isAdminOrSuperAdmin: () => {
        const role = get().user?.role;

        return role === "admin" || role === "superadmin";
      },
    }),
    {
      name: "auth-storage",
    }
  )
);