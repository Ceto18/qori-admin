// src/store/useAuthStore.ts

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { refreshRequest } from "@/modules/auth/services/authService";

export type UserRole =
  | "user"
  | "affiliate"
  | "admin"
  | "superadmin";

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

  setUser: (user: AuthUser) => void;

  refreshSession: () => Promise<boolean>;

  logout: () => void;
  setHasHydrated: (value: boolean) => void;

  hasRole: (roles: UserRole[]) => boolean;

  isUser: () => boolean;
  isAffiliate: () => boolean;
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

      setUser: (user) => {
        set({ user });
      },

      refreshSession: async () => {
        const currentRefreshToken = get().refreshToken;
        const currentUser = get().user;

        if (!currentRefreshToken) {
          console.error("No existe refresh token.");
          return false;
        }

        try {
          const response = await refreshRequest(
            currentRefreshToken
          );

          if (!response.token) {
            console.error(
              "No se recibió un nuevo access token."
            );

            return false;
          }

          const role = response.role as UserRole | null;

          set({
            token: response.token,
            refreshToken:
              response.refreshToken ??
              currentRefreshToken,
            expiresIn: response.expiresIn,
            user: currentUser
              ? {
                  ...currentUser,
                  role: role ?? currentUser.role,
                }
              : null,
          });

          return true;
        } catch (error) {
          console.error(
            "Error al refrescar la sesión:",
            error
          );

          return false;
        }
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

      isAffiliate: () => {
        return get().user?.role === "affiliate";
      },

      isAdmin: () => {
        return get().user?.role === "admin";
      },

      isSuperAdmin: () => {
        return get().user?.role === "superadmin";
      },

      isAdminOrSuperAdmin: () => {
        const role = get().user?.role;

        return (
          role === "admin" ||
          role === "superadmin"
        );
      },
    }),
    {
      name: "auth-storage",

      storage: createJSONStorage(
        () => localStorage
      ),

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