import { create } from "zustand";

import { profileService } from "../services/profileService";

import type {
  ProfileData,
  UpdateProfilePayload,
  UpdatePasswordPayload,
} from "../types";

import { showSuccess } from "@/shared/utils/toast";
import { handleApiError } from "@/shared/utils/handleApiError";

type ProfileStore = {
  profile: ProfileData | null;

  loadingProfile: boolean;
  updatingProfile: boolean;
  updatingPassword: boolean;

  profileError: string | null;
  passwordError: string | null;

  fetchProfile: () => Promise<ProfileData | null>;

  updateProfile: (
    payload: UpdateProfilePayload
  ) => Promise<boolean>;

  updatePassword: (
    payload: UpdatePasswordPayload
  ) => Promise<boolean>;

  clearProfile: () => void;

  clearProfileError: () => void;
  clearPasswordError: () => void;
};

export const useProfileStore = create<ProfileStore>((set) => ({
  profile: null,

  loadingProfile: false,
  updatingProfile: false,
  updatingPassword: false,

  profileError: null,
  passwordError: null,

  fetchProfile: async () => {
    try {
      set({
        loadingProfile: true,
        profileError: null,
      });

      const response = await profileService.getProfile();

      set({
        profile: response.data,
      });

      return response.data;
    } catch (error) {
      console.error("Error fetchProfile:", error);

      handleApiError(error);

      set({
        profile: null,
        profileError: "No se pudo obtener el perfil.",
      });

      return null;
    } finally {
      set({
        loadingProfile: false,
      });
    }
  },

  updateProfile: async (payload) => {
    try {
      set({
        updatingProfile: true,
        profileError: null,
      });

      const response =
        await profileService.updateProfile(payload);

      showSuccess(
        response?.message ??
          "Perfil actualizado correctamente."
      );
      const profileResponse =
        await profileService.getProfile();

      set({
        profile: profileResponse.data,
      });

      return true;
    } catch (error) {
      console.error("Error updateProfile:", error);

      handleApiError(error);

      set({
        profileError:
          "No se pudo actualizar el perfil.",
      });

      return false;
    } finally {
      set({
        updatingProfile: false,
      });
    }
  },

  updatePassword: async (payload) => {
    try {
      set({
        updatingPassword: true,
        passwordError: null,
      });

      const response =
        await profileService.updatePassword(payload);

      showSuccess(
        response?.message ??
          "Contraseña actualizada correctamente."
      );

      return true;
    } catch (error) {
      console.error("Error updatePassword:", error);

      handleApiError(error);

      set({
        passwordError:
          "No se pudo actualizar la contraseña.",
      });

      return false;
    } finally {
      set({
        updatingPassword: false,
      });
    }
  },

  clearProfile: () =>
    set({
      profile: null,

      loadingProfile: false,
      updatingProfile: false,
      updatingPassword: false,

      profileError: null,
      passwordError: null,
    }),

  clearProfileError: () =>
    set({
      profileError: null,
    }),

  clearPasswordError: () =>
    set({
      passwordError: null,
    }),
}));