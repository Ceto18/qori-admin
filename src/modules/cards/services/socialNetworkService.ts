// src/modules/cards/services/socialNetworkService.ts

import { api } from "@/services/api";

export type SocialNetwork = {
    uuid: string;
    name: string;
    icon: string | null;
    type: "email" | "url" | "phone" | string;
};

export const socialNetworkService = {
    getSocialNetworks: async () => {
        const res = await api.get("/social-networks", {
            params: {
                per_page: 100,
            },
        });

        return res.data;
    },
};