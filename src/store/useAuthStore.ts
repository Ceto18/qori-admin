// src/store/useAuthStore.ts

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

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
  refreshToken: string | null;
  expiresIn: number | null;

  hasHydrated: boolean;

  setAuth: (data: {
    user: AuthUser;
    token: string;
    refreshToken?: string | null;
    expiresIn?: number | null;
  }) => void;

  logout: () => void;
  setHasHydrated: (value: boolean) => void;

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
      refreshToken: null,
      expiresIn: null,

      hasHydrated: false,

      setAuth: ({
        user,
        token,
        refreshToken = null,
        expiresIn = null,
      }) => {
        set({
          user,
          token,
          refreshToken,
          expiresIn,
        });
      },

      logout: () => {
        set({
          user: null,
          token: null,
          refreshToken: null,
          expiresIn: null,
        });

        if (typeof window !== "undefined") {
          localStorage.removeItem("auth-storage");
        }
      },

      setHasHydrated: (value) => {
        set({
          hasHydrated: value,
        });
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

      storage: createJSONStorage(() => localStorage),

      partialize: (state) => ({
        user: state.user,
        token: state.token,
        refreshToken: state.refreshToken,
        expiresIn: state.expiresIn,
      }),

      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);