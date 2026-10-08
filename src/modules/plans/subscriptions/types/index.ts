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
    customer_email: string;
};

export type SubscriptionCheckout = {
    subscriptionIntent: {
        uuid: string;
        status?: string;
    };
    pricing: {
        original: number;
        discount: number;
        amount: number;
        amount_cents: number;
        currency: string;
    };
    expires_at?: string | null;
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

export type SubscriptionCancel = {
    subscription?: {
        uuid?: string;
        status?: string;
    };
};

export type SubscriptionCancelResponse = {
    success: boolean;
    message: string;
    data: SubscriptionCancel | null;
};

export type CurrentPlanSubscription = {
    status: string;
    plan: {
        uuid: string;
        name: string;
        description: string;
    };
    billing: {
        amount: string;
        currency: string;
    };
    period: {
        starts_at: string;
        ends_at: string;
        days_remaining: number;
    };
    payment_method: {
        brand: string | null;
        last_four: string | null;
    };
};

export type CurrentPlan = {
    has_subscription: boolean;
    subscription: CurrentPlanSubscription | null;
};

export type CurrentPlanResponse = {
    success: boolean;
    message: string;
    data: CurrentPlan;
};