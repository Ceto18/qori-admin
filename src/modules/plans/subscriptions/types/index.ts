export type SubscriptionPreviewPayload = {
    plan_uuid: string;
    discount_code?: string | null;
};

export type SubscriptionPreview = {
    plan_id: number;
    discount_code_id: number | null;
    plan: {
        uuid: string;
        name: string;
        price: number;
    };
    discount_code: {
        uuid: string;
        code: string;
        type: "percentage" | "fixed";
        value: number;
    } | null;
    original_price: number;
    discount_amount: number;
    final_price: number;
};

export type SubscriptionPreviewResponse = {
    success: boolean;
    message: string;
    data: SubscriptionPreview;
};

export type SubscriptionCheckoutPayload = {
    plan_uuid: string;
    discount_code?: string | null;
};

export type SubscriptionCheckout = {
    subscription: {
        id?: number;
        uuid: string;
        status?: string;
        amount?: number;
        plan_name?: string;
    };
    payment: {
        uuid: string;
        status?: string;
        amount_cents: number;
        currency: string;
        order_id?: string | null;
    };
    order_id?: string | null;
};

export type SubscriptionCheckoutResponse = {
    success: boolean;
    message: string;
    data: SubscriptionCheckout;
};

export type SubscriptionSubscribePayload = {
    subscription_uuid: string;
    token_id: string;
};

export type SubscriptionSubscribe = {
    subscription?: {
        id?: number;
        uuid?: string;
        status?: string;
    };
    payment?: {
        uuid?: string;
        status?: string;
        amount_cents?: number;
        currency?: string;
        charge_id?: string | null;
    };
};

export type SubscriptionSubscribeResponse = {
    success: boolean;
    message: string;
    data: SubscriptionSubscribe;
};