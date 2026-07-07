import { create } from "zustand";

import { subscriptionService } from "../services/subscriptionService";
import type { SubscriptionPreview, SubscriptionPreviewPayload } from "../types";

type SubscriptionStore = {
    preview: SubscriptionPreview | null;
    loadingPreview: boolean;
    previewError: string | null;

    fetchPreview: (
        payload: SubscriptionPreviewPayload
    ) => Promise<SubscriptionPreview | null>;

    clearPreview: () => void;
};

export const useSubscriptionStore = create<SubscriptionStore>((set) => ({
    preview: null,
    loadingPreview: false,
    previewError: null,

    fetchPreview: async (payload) => {
        try {
            set({
                loadingPreview: true,
                previewError: null,
            });

            const response = await subscriptionService.preview(payload);

            set({
                preview: response.data,
                loadingPreview: false,
            });

            return response.data;
        } catch (error: any) {
            const message =
                error?.response?.data?.message ||
                "No se pudo calcular el precio.";

            set({
                preview: null,
                loadingPreview: false,
                previewError: message,
            });

            return null;
        }
    },

    clearPreview: () => {
        set({
            preview: null,
            previewError: null,
            loadingPreview: false,
        });
    },
}));