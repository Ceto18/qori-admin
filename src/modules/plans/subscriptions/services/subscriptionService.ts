import { api } from "@/services/api";

import type {
    SubscriptionPreviewPayload,
    SubscriptionPreviewResponse,
    SubscriptionCheckoutPayload,
    SubscriptionCheckoutResponse,
    SubscriptionSubscribePayload,
    SubscriptionSubscribeResponse,
} from "../types";

function generateIdempotencyKey() {
    if (
        typeof window !== "undefined" &&
        window.crypto &&
        typeof window.crypto.randomUUID === "function"
    ) {
        return window.crypto.randomUUID();
    }

    return `idem_${Date.now()}_${Math.random()
        .toString(36)
        .substring(2)}`;
}

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
            payload,
            {
                headers: {
                    "Idempotency-Key": generateIdempotencyKey(),
                },
            }
        );

        return response.data;
    },

    subscribe: async (payload: SubscriptionSubscribePayload) => {
        const response = await api.post<SubscriptionSubscribeResponse>(
            "/subscriptions/subscribe",
            payload,
            {
                headers: {
                    "Idempotency-Key": generateIdempotencyKey(),
                },
            }
        );

        return response.data;
    },
};
