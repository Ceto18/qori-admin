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
    culqi_token: string;
};

export type SubscriptionCheckout = {
    subscription_id?: number;
    subscription_uuid?: string;
    charge_id?: string;
    status?: string;
    original_price?: number;
    discount_amount?: number;
    final_price?: number;
};

export type SubscriptionCheckoutResponse = {
    success: boolean;
    message: string;
    data: SubscriptionCheckout;
};