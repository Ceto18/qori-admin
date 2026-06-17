// src/modules/plans/types/index.ts

export interface Plan {
  uuid: string;
  name: string;
  slug: string;
  price: string;
  max_organizations: number;
  max_cards: number;
  active: boolean;
}

export interface PlanDetail {
  uuid: string;
  name: string;
  slug: string;
  price: string;
  max_organizations: number;
  max_cards: number;
  active: boolean;
}

export interface PlanPayload {
  name: string;
  price: number;
  max_organizations: number;
  max_cards: number;
}

export interface PlanFormValues {
  name: string;
  price: string;
  max_organizations: string;
  max_cards: string;
}