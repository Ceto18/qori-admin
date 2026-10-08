import { api } from "@/services/api";

import type {
    ProfileResponse,
} from "../types";

export const profileService = {
    getProfile: async (): Promise<ProfileResponse> => {
        const { data } = await api.get<ProfileResponse>(
            "/auth/profile"
        );

        return data;
    },
};