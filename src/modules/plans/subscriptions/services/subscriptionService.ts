import { api } from "@/services/api";

import type {
    SubscriptionPreviewPayload,
    SubscriptionPreviewResponse,
    SubscriptionCheckoutPayload,
    SubscriptionCheckoutResponse,
} from "../types";

export const subscriptionService = {
    preview: async (payload: SubscriptionPreviewPayload) => {
        const response = await api.post<SubscriptionPreviewResponse>(
            "/subscriptions/preview",
            payload
        );

        return response.data;
    },

    checkout: async (payload: SubscriptionCheckoutPayload) => {
        const response = await api.post<SubscriptionCheckoutResponse>(
            "/subscriptions/checkout",
            payload
        );

        return response.data;
    },
};