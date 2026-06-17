import { create } from "zustand";
import { planService } from "../services/planService";
import { Plan, PlanPayload } from "../types";

import { showSuccess } from "@/shared/utils/toast";
import { handleApiError } from "@/shared/utils/handleApiError";

type FetchPlansParams = {
  page?: number;
  perPage?: number;
  search?: string;
};

interface PlanState {
  plans: Plan[];
  plan: Plan | null;

  loading: boolean;

  currentPage: number;
  totalPages: number;
  perPage: number;
  total: number;

  fetchPlans: (params?: FetchPlansParams) => Promise<void>;
  fetchPlan: (uuid: string) => Promise<void>;
  createPlan: (payload: PlanPayload) => Promise<void>;
  updatePlan: (uuid: string, payload: PlanPayload) => Promise<void>;
  deletePlan: (uuid: string) => Promise<void>;
  togglePlanState: (uuid: string, state: boolean) => Promise<void>;
  clearPlan: () => void;
}

export const usePlanStore = create<PlanState>((set, get) => ({
  plans: [],
  plan: null,

  loading: false,

  currentPage: 1,
  totalPages: 1,
  perPage: 10,
  total: 0,

  fetchPlans: async (params = {}) => {
    try {
      set({ loading: true });

      const { page = 1, perPage = get().perPage, search = "" } = params;

      const response = await planService.getPlans({
        page,
        per_page: perPage,
        search,
      });

      set({
        plans: response.data?.data ?? [],
        currentPage: response.data?.current_page ?? 1,
        totalPages: response.data?.last_page ?? 1,
        perPage: Number(response.data?.per_page ?? perPage),
        total: response.data?.total ?? 0,
      });
    } catch (error) {
      console.error("Error fetchPlans:", error);
      handleApiError(error);
    } finally {
      set({ loading: false });
    }
  },

  fetchPlan: async (uuid) => {
    try {
      set({
        loading: true,
        plan: null,
      });

      const response = await planService.getPlan(uuid);

      const planData = response?.data?.plan ?? response?.data ?? null;

      set({
        plan: planData,
      });
    } catch (error) {
      console.error("Error fetchPlan:", error);
      handleApiError(error);
    } finally {
      set({ loading: false });
    }
  },

  createPlan: async (payload) => {
    try {
      set({ loading: true });

      const response = await planService.createPlan(payload);

      showSuccess(response?.message ?? "Plan creado correctamente.");
    } catch (error) {
      console.error("Error createPlan:", error);
      handleApiError(error);
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  updatePlan: async (uuid, payload) => {
    try {
      set({ loading: true });

      const response = await planService.updatePlan(uuid, payload);

      showSuccess(response?.message ?? "Plan actualizado correctamente.");
    } catch (error) {
      console.error("Error updatePlan:", error);
      handleApiError(error);
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  deletePlan: async (uuid) => {
    try {
      set({ loading: true });

      const response = await planService.deletePlan(uuid);

      showSuccess(response?.message ?? "Plan eliminado correctamente.");

      const { currentPage, perPage } = get();

      await get().fetchPlans({
        page: currentPage,
        perPage,
      });
    } catch (error) {
      console.error("Error deletePlan:", error);
      handleApiError(error);
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  togglePlanState: async (uuid, state) => {
    try {
      set({ loading: true });

      const response = await planService.togglePlanState(uuid, state);

      showSuccess(
        response?.message ??
          (state
            ? "Plan habilitado correctamente."
            : "Plan deshabilitado correctamente.")
      );

      set((store) => ({
        plans: store.plans.map((plan) =>
          plan.uuid === uuid ? { ...plan, active: state } : plan
        ),
        plan:
          store.plan?.uuid === uuid
            ? { ...store.plan, active: state }
            : store.plan,
      }));
    } catch (error) {
      console.error("Error togglePlanState:", error);
      handleApiError(error);
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  clearPlan: () => {
    set({
      plan: null,
    });
  },
}));