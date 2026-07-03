// src/modules/public-plans/store/usePublicPlanStore.ts

import { create } from "zustand";

import { publicPlanService } from "../services/publicPlanService";
import type { PublicPlan } from "../types";

import { handleApiError } from "@/shared/utils/handleApiError";

type PublicPlanState = {
  plans: PublicPlan[];
  loading: boolean;

  fetchActivePlans: () => Promise<void>;
  clearPlans: () => void;
};

export const usePublicPlanStore = create<PublicPlanState>((set) => ({
  plans: [],
  loading: false,

  fetchActivePlans: async () => {
    try {
      set({ loading: true });

      const response = await publicPlanService.getActivePlans();

      set({
        plans: response.data ?? [],
      });
    } catch (error) {
      handleApiError(error);

      set({
        plans: [],
      });
    } finally {
      set({
        loading: false,
      });
    }
  },

  clearPlans: () => {
    set({
      plans: [],
    });
  },
}));