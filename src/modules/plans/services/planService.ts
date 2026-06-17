import { api } from "@/services/api";
import { PlanPayload } from "../types";

type GetPlansParams = {
  page?: number;
  per_page?: number;
  search?: string;
};

export const planService = {
  getPlans: async (params: GetPlansParams = {}) => {
    const res = await api.get("/admin/plans", {
      params,
    });

    return res.data;
  },

  getPlan: async (uuid: string) => {
    const res = await api.get(`/admin/plans/${uuid}`);

    return res.data;
  },

  createPlan: async (payload: PlanPayload) => {
    const res = await api.post("/admin/plans", payload);

    return res.data;
  },

  updatePlan: async (uuid: string, payload: PlanPayload) => {
    const res = await api.put(`/admin/plans/${uuid}`, payload);

    return res.data;
  },

  deletePlan: async (uuid: string) => {
    const res = await api.delete(`/admin/plans/${uuid}`);

    return res.data;
  },

  togglePlanState: async (uuid: string, state: boolean) => {
    const res = await api.put(`/admin/plans/state/${uuid}`, {
      state,
    });

    return res.data;
  },
};