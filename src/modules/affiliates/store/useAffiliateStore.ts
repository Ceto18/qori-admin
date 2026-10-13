import { create } from "zustand";

import { affiliateService } from "../services/affiliateService";

import type {
  Affiliate,
  AffiliateOption,
  AffiliatePayload,
  UpdateAffiliatePayload,
  AffiliateInfo,
  AffiliateReferralsPagination,
} from "../types";

import { showSuccess } from "@/shared/utils/toast";
import { handleApiError } from "@/shared/utils/handleApiError";

type FetchAffiliatesParams = {
  page?: number;
  perPage?: number;
  search?: string;
};

type FetchAffiliateOptionsParams = {
  page?: number;
  perPage?: number;
  search?: string;
};

type FetchAffiliateReferralsParams = {
  page?: number;
  perPage?: number;
};

interface AffiliateState {
  affiliates: Affiliate[];
  affiliate: Affiliate | null;
  affiliateOptions: AffiliateOption[];

  affiliateInfo: AffiliateInfo | null;
  affiliateReferrals: AffiliateReferralsPagination | null;

  loading: boolean;
  loadingOptions: boolean;
  loadingInfo: boolean;
  loadingReferrals: boolean;

  currentPage: number;
  totalPages: number;
  perPage: number;
  total: number;

  fetchAffiliates: (
    params?: FetchAffiliatesParams
  ) => Promise<void>;

  fetchAffiliate: (
    uuid: string
  ) => Promise<void>;

  fetchAffiliateOptions: (
    params?: FetchAffiliateOptionsParams
  ) => Promise<void>;

  createAffiliate: (
    payload: AffiliatePayload
  ) => Promise<boolean>;

  updateAffiliate: (
    uuid: string,
    payload: UpdateAffiliatePayload
  ) => Promise<boolean>;

  deleteAffiliate: (
    uuid: string
  ) => Promise<boolean>;

  fetchAffiliateInfo: () => Promise<void>;

  fetchAffiliateReferrals: (
    params?: FetchAffiliateReferralsParams
  ) => Promise<void>;

  clearAffiliate: () => void;
  clearAffiliateInfo: () => void;
  clearAffiliateReferrals: () => void;
}

export const useAffiliateStore =
  create<AffiliateState>((set, get) => ({
    affiliates: [],
    affiliate: null,
    affiliateOptions: [],

    affiliateInfo: null,
    affiliateReferrals: null,

    loading: false,
    loadingOptions: false,
    loadingInfo: false,
    loadingReferrals: false,

    currentPage: 1,
    totalPages: 1,
    perPage: 10,
    total: 0,

    fetchAffiliates: async (params = {}) => {
      try {
        set({ loading: true });

        const {
          page = 1,
          perPage = get().perPage,
          search = "",
        } = params;

        const response =
          await affiliateService.getAffiliates({
            page,
            per_page: perPage,
            search,
          });

        set({
          affiliates:
            response.data?.data ?? [],
          currentPage:
            response.data?.current_page ?? 1,
          totalPages:
            response.data?.last_page ?? 1,
          perPage: Number(
            response.data?.per_page ?? perPage
          ),
          total:
            response.data?.total ?? 0,
        });
      } catch (error) {
        console.error(
          "Error fetchAffiliates:",
          error
        );

        handleApiError(error);
      } finally {
        set({ loading: false });
      }
    },

    fetchAffiliate: async (uuid) => {
      try {
        set({
          loading: true,
          affiliate: null,
        });

        const response =
          await affiliateService.getAffiliate(
            uuid
          );

        set({
          affiliate:
            response?.data ?? null,
        });
      } catch (error) {
        console.error(
          "Error fetchAffiliate:",
          error
        );

        handleApiError(error);
      } finally {
        set({ loading: false });
      }
    },

    fetchAffiliateOptions: async (
      params = {}
    ) => {
      try {
        set({
          loadingOptions: true,
        });

        const {
          page = 1,
          perPage = 20,
          search = "",
        } = params;

        const response =
          await affiliateService.getAffiliateOptions(
            {
              page,
              per_page: perPage,
              search,
            }
          );

        set({
          affiliateOptions:
            response.data?.data ?? [],
        });
      } catch (error) {
        console.error(
          "Error fetchAffiliateOptions:",
          error
        );

        handleApiError(error);
      } finally {
        set({
          loadingOptions: false,
        });
      }
    },

    createAffiliate: async (payload) => {
      try {
        set({ loading: true });

        const response =
          await affiliateService.createAffiliate(
            payload
          );

        showSuccess(
          response?.message ??
            "Afiliado creado correctamente."
        );

        await get().fetchAffiliates({
          page: 1,
          perPage: get().perPage,
        });

        return true;
      } catch (error) {
        console.error(
          "Error createAffiliate:",
          error
        );

        handleApiError(error);

        return false;
      } finally {
        set({ loading: false });
      }
    },

    updateAffiliate: async (
      uuid,
      payload
    ) => {
      try {
        set({ loading: true });

        const response =
          await affiliateService.updateAffiliate(
            uuid,
            payload
          );

        showSuccess(
          response?.message ??
            "Afiliado actualizado correctamente."
        );

        await get().fetchAffiliates({
          page: get().currentPage,
          perPage: get().perPage,
        });

        return true;
      } catch (error) {
        console.error(
          "Error updateAffiliate:",
          error
        );

        handleApiError(error);

        return false;
      } finally {
        set({ loading: false });
      }
    },

    deleteAffiliate: async (uuid) => {
      try {
        set({ loading: true });

        const response =
          await affiliateService.deleteAffiliate(
            uuid
          );

        showSuccess(
          response?.message ??
            "Afiliado eliminado correctamente."
        );

        const {
          currentPage,
          perPage,
          affiliates,
        } = get();

        const nextPage =
          affiliates.length === 1 &&
          currentPage > 1
            ? currentPage - 1
            : currentPage;

        await get().fetchAffiliates({
          page: nextPage,
          perPage,
        });

        return true;
      } catch (error) {
        console.error(
          "Error deleteAffiliate:",
          error
        );

        handleApiError(error);

        return false;
      } finally {
        set({ loading: false });
      }
    },

    fetchAffiliateInfo: async () => {
      try {
        set({
          loadingInfo: true,
        });

        const response =
          await affiliateService.getInfo();

        set({
          affiliateInfo:
            response?.data ?? null,
        });
      } catch (error) {
        console.error(
          "Error fetchAffiliateInfo:",
          error
        );

        handleApiError(error);

        set({
          affiliateInfo: null,
        });
      } finally {
        set({
          loadingInfo: false,
        });
      }
    },

    fetchAffiliateReferrals: async (
      params = {}
    ) => {
      try {
        set({
          loadingReferrals: true,
        });

        const {
          page = 1,
          perPage = 10,
        } = params;

        const response =
          await affiliateService.getReferrals({
            page,
            per_page: perPage,
          });

        set({
          affiliateReferrals:
            response?.data ?? null,
        });
      } catch (error) {
        console.error(
          "Error fetchAffiliateReferrals:",
          error
        );

        handleApiError(error);

        set({
          affiliateReferrals: null,
        });
      } finally {
        set({
          loadingReferrals: false,
        });
      }
    },

    clearAffiliate: () => {
      set({
        affiliate: null,
      });
    },

    clearAffiliateInfo: () => {
      set({
        affiliateInfo: null,
      });
    },

    clearAffiliateReferrals: () => {
      set({
        affiliateReferrals: null,
      });
    },
  }));