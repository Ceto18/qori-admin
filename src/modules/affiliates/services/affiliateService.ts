// src/modules/affiliate/services/affiliateService.ts

import { api } from "@/services/api";

import type {
  AffiliatePayload,
  UpdateAffiliatePayload,
  AffiliatesResponse,
  AffiliateOptionsResponse,
  AffiliateResponse,
  ActionResponse,
} from "../types";

type AffiliateListParams = {
  page?: number;
  per_page?: number;
  search?: string;
};

type AffiliateOptionsParams = {
  page?: number;
  per_page?: number;
  search?: string;
};

export const affiliateService = {
  getAffiliates: async (
    params: AffiliateListParams = {}
  ): Promise<AffiliatesResponse> => {
    const { data } = await api.get<AffiliatesResponse>(
      "/admin/affiliates",
      {
        params,
      }
    );

    return data;
  },

  getAffiliate: async (
    uuid: string
  ): Promise<AffiliateResponse> => {
    const { data } = await api.get<AffiliateResponse>(
      `/admin/affiliates/${uuid}`
    );

    return data;
  },

  getAffiliateOptions: async (
    params: AffiliateOptionsParams = {}
  ): Promise<AffiliateOptionsResponse> => {
    const { data } =
      await api.get<AffiliateOptionsResponse>(
        "/admin/affiliates/options",
        {
          params,
        }
      );

    return data;
  },

  createAffiliate: async (
    payload: AffiliatePayload
  ): Promise<AffiliateResponse> => {
    const { data } = await api.post<AffiliateResponse>(
      "/admin/affiliates",
      payload
    );

    return data;
  },

  updateAffiliate: async (
    uuid: string,
    payload: UpdateAffiliatePayload
  ): Promise<AffiliateResponse> => {
    const { data } = await api.put<AffiliateResponse>(
      `/admin/affiliates/${uuid}`,
      payload
    );

    return data;
  },

  deleteAffiliate: async (
    uuid: string
  ): Promise<ActionResponse> => {
    const { data } = await api.delete<ActionResponse>(
      `/admin/affiliates/${uuid}`
    );

    return data;
  },
};