export type MembershipPlan = {
  uuid: string;
  name: string;
  description?: string | null;
  price: string | number;
  duration_days?: number | null;
  active?: boolean;
};