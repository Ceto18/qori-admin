import { api } from "@/services/api";

import { DiscountCodePayload } from "../types";

type GetDiscountCodesParams = {
  page?: number;
  per_page?: number;
  search?: string;
};

export const discountCodeService = {
  getDiscountCodes: async (params: GetDiscountCodesParams = {}) => {
    const res = await api.get("/admin/discount-codes", {
      params,
    });

    return res.data;
  },

  getDiscountCode: async (uuid: string) => {
    const res = await api.get(`/admin/discount-codes/${uuid}`);

    return res.data;
  },

  createDiscountCode: async (payload: DiscountCodePayload) => {
    const res = await api.post("/admin/discount-codes", payload);

    return res.data;
  },

  updateDiscountCode: async (uuid: string, payload: DiscountCodePayload) => {
    const res = await api.put(`/admin/discount-codes/${uuid}`, payload);

    return res.data;
  },

  deleteDiscountCode: async (uuid: string) => {
    const res = await api.delete(`/admin/discount-codes/${uuid}`);

    return res.data;
  },
};