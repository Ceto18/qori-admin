import { create } from "zustand";

import { discountCodeService } from "../services/discountCodeService";
import { DiscountCode, DiscountCodePayload } from "../types";

import { showSuccess } from "@/shared/utils/toast";
import { handleApiError } from "@/shared/utils/handleApiError";

type FetchDiscountCodesParams = {
  page?: number;
  perPage?: number;
  search?: string;
};

interface DiscountCodeState {
  discountCodes: DiscountCode[];
  discountCode: DiscountCode | null;

  loading: boolean;

  currentPage: number;
  totalPages: number;
  perPage: number;
  total: number;

  fetchDiscountCodes: (params?: FetchDiscountCodesParams) => Promise<void>;
  fetchDiscountCode: (uuid: string) => Promise<void>;
  createDiscountCode: (payload: DiscountCodePayload) => Promise<void>;
  updateDiscountCode: (
    uuid: string,
    payload: DiscountCodePayload
  ) => Promise<void>;
  deleteDiscountCode: (uuid: string) => Promise<void>;
  clearDiscountCode: () => void;
}

export const useDiscountCodeStore = create<DiscountCodeState>((set, get) => ({
  discountCodes: [],
  discountCode: null,

  loading: false,

  currentPage: 1,
  totalPages: 1,
  perPage: 10,
  total: 0,

  fetchDiscountCodes: async (params = {}) => {
    try {
      set({ loading: true });

      const { page = 1, perPage = get().perPage, search = "" } = params;

      const response = await discountCodeService.getDiscountCodes({
        page,
        per_page: perPage,
        search,
      });

      set({
        discountCodes: response.data?.data ?? [],
        currentPage: response.data?.current_page ?? 1,
        totalPages: response.data?.last_page ?? 1,
        perPage: Number(response.data?.per_page ?? perPage),
        total: response.data?.total ?? 0,
      });
    } catch (error) {
      console.error("Error fetchDiscountCodes:", error);
      handleApiError(error);
    } finally {
      set({ loading: false });
    }
  },

  fetchDiscountCode: async (uuid) => {
    try {
      set({
        loading: true,
        discountCode: null,
      });

      const response = await discountCodeService.getDiscountCode(uuid);

      const discountCodeData =
        response?.data?.discount_code ??
        response?.data?.discountCode ??
        response?.data ??
        null;

      set({
        discountCode: discountCodeData,
      });
    } catch (error) {
      console.error("Error fetchDiscountCode:", error);
      handleApiError(error);
    } finally {
      set({ loading: false });
    }
  },

  createDiscountCode: async (payload) => {
    try {
      set({ loading: true });

      const response = await discountCodeService.createDiscountCode(payload);

      showSuccess(
        response?.message ?? "Código de descuento creado correctamente."
      );
    } catch (error) {
      console.error("Error createDiscountCode:", error);
      handleApiError(error);
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  updateDiscountCode: async (uuid, payload) => {
    try {
      set({ loading: true });

      const response = await discountCodeService.updateDiscountCode(
        uuid,
        payload
      );

      showSuccess(
        response?.message ?? "Código de descuento actualizado correctamente."
      );
    } catch (error) {
      console.error("Error updateDiscountCode:", error);
      handleApiError(error);
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  deleteDiscountCode: async (uuid) => {
    try {
      set({ loading: true });

      const response = await discountCodeService.deleteDiscountCode(uuid);

      showSuccess(
        response?.message ?? "Código de descuento eliminado correctamente."
      );

      const { currentPage, perPage } = get();

      await get().fetchDiscountCodes({
        page: currentPage,
        perPage,
      });
    } catch (error) {
      console.error("Error deleteDiscountCode:", error);
      handleApiError(error);
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  clearDiscountCode: () => {
    set({
      discountCode: null,
    });
  },
}));