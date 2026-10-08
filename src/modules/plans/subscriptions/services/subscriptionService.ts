import { api } from "@/services/api";

import type {
    SubscriptionPreviewPayload,
    SubscriptionPreviewResponse,
    SubscriptionCheckoutPayload,
    SubscriptionCheckoutResponse,
    SubscriptionSubscribePayload,
    SubscriptionSubscribeResponse,
    SubscriptionCancelResponse,
    CurrentPlanResponse,
} from "../types";

function generateIdempotencyKey(): string {
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
    preview: async (
        payload: SubscriptionPreviewPayload
    ): Promise<SubscriptionPreviewResponse> => {
        const { data } = await api.post<SubscriptionPreviewResponse>(
            "/subscriptions/preview",
            payload
        );

        return data;
    },

    checkout: async (
        payload: SubscriptionCheckoutPayload
    ): Promise<SubscriptionCheckoutResponse> => {
        const { data } = await api.post<SubscriptionCheckoutResponse>(
            "/subscriptions/checkout",
            payload,
            {
                headers: {
                    "Idempotency-Key": generateIdempotencyKey(),
                },
            }
        );

        return data;
    },

    subscribe: async (
        payload: SubscriptionSubscribePayload
    ): Promise<SubscriptionSubscribeResponse> => {
        const { data } = await api.post<SubscriptionSubscribeResponse>(
            "/subscriptions/subscribe",
            payload,
            {
                headers: {
                    "Idempotency-Key": generateIdempotencyKey(),
                },
            }
        );

        return data;
    },

    cancel: async (): Promise<SubscriptionCancelResponse> => {
        const { data } = await api.post<SubscriptionCancelResponse>(
            "/subscriptions/cancel",
            {},
            {
                headers: {
                    "Idempotency-Key": generateIdempotencyKey(),
                },
            }
        );

        return data;
    },

    currentPlan: async (): Promise<CurrentPlanResponse> => {
        const { data } = await api.get<CurrentPlanResponse>(
            "/auth/current-plan"
        );

        return data;
    },
};