import { create } from "zustand";
import { organizationService } from "../services/organizationService";
import { Organization } from "../types";

import { showSuccess } from "@/shared/utils/toast";
import { handleApiError } from "@/shared/utils/handleApiError";

type FetchOrganizationsParams = {
  page?: number;
  perPage?: number;
  search?: string;
};

interface OrganizationState {
  organizations: Organization[];
  organization: Organization | null;

  loading: boolean;

  currentPage: number;
  totalPages: number;
  perPage: number;
  total: number;

  fetchOrganizations: (params?: FetchOrganizationsParams) => Promise<void>;

  fetchOrganization: (uuid: string) => Promise<void>;

  createOrganization: (payload: FormData) => Promise<void>;

  updateOrganization: (uuid: string, payload: FormData) => Promise<void>;

  deleteOrganization: (uuid: string) => Promise<void>;

  clearOrganization: () => void;
}

export const useOrganizationStore = create<OrganizationState>((set, get) => ({
  organizations: [],
  organization: null,

  loading: false,

  currentPage: 1,
  totalPages: 1,
  perPage: 10,
  total: 0,

  fetchOrganizations: async (params = {}) => {
    try {
      set({ loading: true });

      const { page = 1, perPage = get().perPage, search = "" } = params;

      const response = await organizationService.getOrganizations({
        page,
        per_page: perPage,
        search,
      });

      set({
        organizations: response.data?.data ?? [],
        currentPage: response.data?.current_page ?? 1,
        totalPages: response.data?.last_page ?? 1,
        perPage: Number(response.data?.per_page ?? perPage),
        total: response.data?.total ?? 0,
      });
    } catch (error) {
      console.error("Error fetchOrganizations:", error);
      handleApiError(error);
    } finally {
      set({ loading: false });
    }
  },

  fetchOrganization: async (uuid) => {
    try {
      set({
        loading: true,
        organization: null,
      });

      const response = await organizationService.getOrganization(uuid);

      const organizationData =
        response?.data?.organization ?? response?.data ?? null;

      set({
        organization: organizationData,
      });
    } catch (error) {
      console.error("Error fetchOrganization:", error);
      handleApiError(error);
    } finally {
      set({ loading: false });
    }
  },

  createOrganization: async (payload) => {
    try {
      set({ loading: true });

      const response = await organizationService.createOrganization(payload);

      showSuccess(response?.message ?? "Organización creada correctamente.");
    } catch (error) {
      console.error("Error createOrganization:", error);
      handleApiError(error);
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  updateOrganization: async (uuid, payload) => {
    try {
      set({ loading: true });

      const response = await organizationService.updateOrganization(uuid, payload);

      showSuccess(response?.message ?? "Organización actualizada correctamente.");
    } catch (error) {
      console.error("Error updateOrganization:", error);
      handleApiError(error);
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  deleteOrganization: async (uuid) => {
    try {
      set({ loading: true });

      const response = await organizationService.deleteOrganization(uuid);

      showSuccess(response?.message ?? "Organización eliminada correctamente.");

      const { currentPage, perPage } = get();

      await get().fetchOrganizations({
        page: currentPage,
        perPage,
      });
    } catch (error) {
      console.error("Error deleteOrganization:", error);
      handleApiError(error);
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  clearOrganization: () => {
    set({
      organization: null,
    });
  },
}));