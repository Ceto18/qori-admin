import { create } from "zustand";

import { subscriptionService } from "../services/subscriptionService";
import type {
    SubscriptionPreview,
    SubscriptionPreviewPayload,
    SubscriptionCheckoutPayload,
    SubscriptionCheckoutResponse,
    SubscriptionSubscribePayload,
    SubscriptionSubscribeResponse,
} from "../types";

type SubscriptionStore = {
    preview: SubscriptionPreview | null;
    loadingPreview: boolean;
    previewError: string | null;

    loadingCheckout: boolean;
    checkoutError: string | null;
    checkoutData: SubscriptionCheckoutResponse | null;
    subscribeData: SubscriptionSubscribeResponse | null;

    fetchPreview: (
        payload: SubscriptionPreviewPayload
    ) => Promise<SubscriptionPreview | null>;

    checkout: (
        payload: SubscriptionCheckoutPayload
    ) => Promise<SubscriptionCheckoutResponse | null>;

    subscribe: (
        payload: SubscriptionSubscribePayload
    ) => Promise<SubscriptionSubscribeResponse | null>;

    clearPreview: () => void;
    clearCheckout: () => void;
};

export const useSubscriptionStore = create<SubscriptionStore>((set) => ({
    preview: null,
    loadingPreview: false,
    previewError: null,

    loadingCheckout: false,
    checkoutError: null,
    checkoutData: null,
    subscribeData: null,

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
                previewError: message,
                loadingPreview: false,
            });

            return null;
        }
    },

    checkout: async (payload) => {
        try {
            set({
                loadingCheckout: true,
                checkoutError: null,
                checkoutData: null,
                subscribeData: null,
            });

            const response = await subscriptionService.checkout(payload);

            set({
                checkoutData: response,
                loadingCheckout: false,
            });

            return response;
        } catch (error: any) {
            const message =
                error?.response?.data?.message ||
                "No se pudo crear el checkout.";

            set({
                checkoutData: null,
                checkoutError: message,
                loadingCheckout: false,
            });

            return null;
        }
    },

    subscribe: async (payload) => {
        try {
            set({
                loadingCheckout: true,
                checkoutError: null,
                subscribeData: null,
            });

            const response = await subscriptionService.subscribe(payload);

            set({
                subscribeData: response,
                loadingCheckout: false,
            });

            return response;
        } catch (error: any) {
            const message =
                error?.response?.data?.message ||
                "No se pudo procesar la suscripción.";

            set({
                subscribeData: null,
                checkoutError: message,
                loadingCheckout: false,
            });

            throw error;
        }
    },

    clearPreview: () =>
        set({
            preview: null,
            previewError: null,
            loadingPreview: false,
        }),

    clearCheckout: () =>
        set({
            checkoutData: null,
            subscribeData: null,
            checkoutError: null,
            loadingCheckout: false,
        }),
}));