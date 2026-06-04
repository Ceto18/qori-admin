// src/modules/cards/store/useCardStore.ts

import { create } from "zustand";
import { cardService } from "../services/cardService";
import { Card, CardFormValues } from "../types";

type FetchCardsParams = {
  page?: number;
  perPage?: number;
  search?: string;
};

interface CardState {
  cards: Card[];
  selectedCard: Card | null;

  loading: boolean;
  saving: boolean;
  deleting: boolean;

  currentPage: number;
  totalPages: number;
  perPage: number;
  total: number;

  fetchCards: (params?: FetchCardsParams) => Promise<void>;
  fetchCard: (uuid: string) => Promise<Card | null>;
  createCard: (payload: CardFormValues) => Promise<void>;
  updateCard: (uuid: string, payload: CardFormValues) => Promise<void>;
  deleteCard: (uuid: string) => Promise<void>;
  clearSelectedCard: () => void;
}

const buildCardFormData = (payload: CardFormValues) => {
  const formData = new FormData();

  formData.append("full_name", payload.full_name);
  formData.append("position", payload.position);
  formData.append("company", payload.company);
  formData.append("profession", payload.profession);
  formData.append("email", payload.email);
  formData.append("phone", payload.phone);
  formData.append("whatsapp", payload.whatsapp);
  formData.append("website", payload.website);
  formData.append("location", payload.location);
  formData.append("bio", payload.bio);
  formData.append("slug", payload.slug);
  formData.append("template_key", payload.template_key);
  formData.append("primary_color", payload.primary_color);
  formData.append("secondary_color", payload.secondary_color);
  formData.append("status", payload.status);

  if (payload.profile_image) {
    formData.append("profile_image", payload.profile_image);
  }

  if (payload.banner_image) {
    formData.append("banner_image", payload.banner_image);
  }

  return formData;
};

const handleApiError = (error: unknown) => {
  console.error("API ERROR:", error);
};

export const useCardStore = create<CardState>((set, get) => ({
  cards: [],
  selectedCard: null,

  loading: false,
  saving: false,
  deleting: false,

  currentPage: 1,
  totalPages: 1,
  perPage: 10,
  total: 0,

  fetchCards: async (params = {}) => {
    try {
      set({ loading: true });

      const { page = 1, perPage = get().perPage, search = "" } = params;

      const response = await cardService.getCards({
        page,
        per_page: perPage,
        search,
      });

      set({
        cards: response.data?.data ?? [],
        currentPage: response.data?.current_page ?? 1,
        totalPages: response.data?.last_page ?? 1,
        perPage: Number(response.data?.per_page ?? perPage),
        total: response.data?.total ?? 0,
      });
    } catch (error) {
      console.error("Error fetchCards:", error);
      handleApiError(error);
    } finally {
      set({ loading: false });
    }
  },

  fetchCard: async (uuid: string) => {
    try {
      set({ loading: true });

      const response = await cardService.getCard(uuid);
      const card = response.data ?? null;

      set({ selectedCard: card });

      return card;
    } catch (error) {
      console.error("Error fetchCard:", error);
      handleApiError(error);
      return null;
    } finally {
      set({ loading: false });
    }
  },

  createCard: async (payload: CardFormValues) => {
    try {
      set({ saving: true });

      const formData = buildCardFormData(payload);

      await cardService.createCard(formData);
    } catch (error) {
      console.error("Error createCard:", error);
      handleApiError(error);
      throw error;
    } finally {
      set({ saving: false });
    }
  },

  updateCard: async (uuid: string, payload: CardFormValues) => {
    try {
      set({ saving: true });

      const formData = buildCardFormData(payload);

      await cardService.updateCard(uuid, formData);
    } catch (error) {
      console.error("Error updateCard:", error);
      handleApiError(error);
      throw error;
    } finally {
      set({ saving: false });
    }
  },

  deleteCard: async (uuid: string) => {
    try {
      set({ deleting: true });

      await cardService.deleteCard(uuid);

      set((state) => ({
        cards: state.cards.filter((card) => card.uuid !== uuid),
      }));
    } catch (error) {
      console.error("Error deleteCard:", error);
      handleApiError(error);
      throw error;
    } finally {
      set({ deleting: false });
    }
  },

  clearSelectedCard: () => {
    set({ selectedCard: null });
  },
}));