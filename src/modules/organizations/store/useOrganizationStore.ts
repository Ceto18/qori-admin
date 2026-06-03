import { create } from "zustand";
import { organizationService } from "../services/organizationService";
import { Organization } from "../types";

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

  updateOrganization: (
    uuid: string,
    payload: FormData
  ) => Promise<void>;

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

      const {
        page = 1,
        perPage = get().perPage,
        search = "",
      } = params;

      const response = await organizationService.getOrganizations({
        page,
        per_page: perPage,
        name: search,
      });

      console.log("GET ORGANIZATIONS RESPONSE:", response);

      set({
        organizations: response.data?.data ?? [],
        currentPage: response.data?.current_page ?? 1,
        totalPages: response.data?.last_page ?? 1,
        perPage: response.data?.per_page ?? perPage,
        total: response.data?.total ?? 0,
      });
    } catch (error) {
      console.error("Error fetchOrganizations:", error);
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

      console.log("FETCH ORGANIZATION UUID:", uuid);

      const response = await organizationService.getOrganization(uuid);

      console.log("GET ORGANIZATION RESPONSE:", response);
      console.log("GET ORGANIZATION RESPONSE.DATA:", response?.data);

      const organizationData =
        response?.data?.organization ??
        response?.data ??
        null;

      console.log("ORGANIZATION DATA FINAL:", organizationData);

      set({
        organization: organizationData,
      });
    } catch (error) {
      console.error("Error fetchOrganization:", error);
    } finally {
      set({ loading: false });
    }
  },

  createOrganization: async (payload) => {
    try {
      set({ loading: true });

      await organizationService.createOrganization(payload);
    } catch (error) {
      console.error("Error createOrganization:", error);
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  updateOrganization: async (uuid, payload) => {
    try {
      set({ loading: true });

      await organizationService.updateOrganization(uuid, payload);
    } catch (error) {
      console.error("Error updateOrganization:", error);
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  deleteOrganization: async (uuid) => {
    try {
      set({ loading: true });

      await organizationService.deleteOrganization(uuid);

      const { currentPage, perPage } = get();

      await get().fetchOrganizations({
        page: currentPage,
        perPage,
      });
    } catch (error) {
      console.error("Error deleteOrganization:", error);
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