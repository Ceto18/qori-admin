import { create } from "zustand";

import { profileService } from "../services/profileService";

import type {
    ProfileData,
} from "../types";

type ProfileStore = {
    profile: ProfileData | null;
    loadingProfile: boolean;
    profileError: string | null;

    fetchProfile: () => Promise<ProfileData | null>;
    clearProfile: () => void;
};

export const useProfileStore = create<ProfileStore>((set) => ({
    profile: null,
    loadingProfile: false,
    profileError: null,

    fetchProfile: async () => {
        try {
            set({
                loadingProfile: true,
                profileError: null,
            });

            const response = await profileService.getProfile();

            set({
                profile: response.data,
                loadingProfile: false,
            });

            return response.data;
        } catch (error: any) {
            const message =
                error?.response?.data?.message ||
                "No se pudo obtener el perfil.";

            set({
                profile: null,
                profileError: message,
                loadingProfile: false,
            });

            return null;
        }
    },

    clearProfile: () =>
        set({
            profile: null,
            profileError: null,
            loadingProfile: false,
        }),
}));