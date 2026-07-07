// src/modules/public-plans/services/publicPlanService.ts

import { api } from "@/services/api";
import type { PublicPlansResponse } from "../types";

export const publicPlanService = {
  getActivePlans: async (): Promise<PublicPlansResponse> => {
    const res = await api.get("/plans/active");

    return res.data;
  },
};