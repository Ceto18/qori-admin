export type DiscountCodeType = "percentage" | "fixed";

export interface DiscountCode {
  uuid: string;
  name?: string;
  code: string;
  type: DiscountCodeType;
  value: string;
  max_uses: number | null;
  used_count: number;
  active: boolean;
  starts_at: string | null;
  expires_at: string | null;
  user_id: number | null;
}

export interface DiscountCodePayload {
  name: string;
  code: string;
  type: DiscountCodeType;
  value: number;
  max_uses: number | null;
  starts_at: string | null;
  expires_at: string | null;
  user_id: number | null;
  active: boolean;
}

export interface DiscountCodeFormValues {
  name: string;
  code: string;
  type: DiscountCodeType;
  value: string;
  max_uses: string;
  starts_at: string;
  expires_at: string;
  user_id: string;
  active: boolean;
}