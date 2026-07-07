// src/modules/public-plans/types.ts

export type PublicPlanFeature = {
    description: string;
    sort_order: number;
};

export type PublicPlanLimits = {
    max_organizations: number;
    max_cards: number;
};

export type PublicPlan = {
    uuid: string;
    name: string;
    slug: string;
    price: string;
    description: string;
    limits: PublicPlanLimits;
    features: PublicPlanFeature[];
};

export type PublicPlansResponse = {
    success: boolean;
    message: string;
    data: PublicPlan[];
};