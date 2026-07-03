// src/modules/plans/types/index.ts

export interface PlanFeature {
  uuid?: string;
  id?: number;
  description: string;
  sort_order: number;
}

export interface Plan {
  uuid: string;
  name: string;
  slug: string;
  description: string;
  price: string;
  max_organizations: number;
  max_cards: number;
  active: boolean;
  features?: PlanFeature[];
}

export interface PlanDetail {
  uuid: string;
  name: string;
  slug: string;
  description: string;
  price: string;
  max_organizations: number;
  max_cards: number;
  active: boolean;
  features: PlanFeature[];
}

export interface PlanPayload {
  name: string;
  description: string;
  price: number;
  max_organizations: number;
  max_cards: number;
  features: {
    description: string;
    sort_order: number;
  }[];
}

export interface PlanFormFeature {
  description: string;
  sort_order: string;
}

export interface PlanFormValues {
  name: string;
  description: string;
  price: string;
  max_organizations: string;
  max_cards: string;
  features: PlanFormFeature[];
}