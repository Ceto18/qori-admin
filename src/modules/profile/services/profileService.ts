import { api } from "@/services/api";

import type {
  ProfileResponse,
  UpdateProfilePayload,
  UpdateProfileResponse,
  UpdatePasswordPayload,
  UpdatePasswordResponse,
} from "../types";

export const profileService = {
  getProfile: async (): Promise<ProfileResponse> => {
    const { data } = await api.get<ProfileResponse>(
      "/me/profile"
    );

    return data;
  },

  updateProfile: async (
    payload: UpdateProfilePayload
  ): Promise<UpdateProfileResponse> => {
    const { data } = await api.put<UpdateProfileResponse>(
      "/me/profile",
      payload
    );

    return data;
  },

  updatePassword: async (
    payload: UpdatePasswordPayload
  ): Promise<UpdatePasswordResponse> => {
    const { data } = await api.put<UpdatePasswordResponse>(
      "/me/password",
      payload
    );

    return data;
  },
};