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

  fetchCards: (
    organizationUuid: string,
    params?: FetchCardsParams
  ) => Promise<void>;

  fetchCard: (
    organizationUuid: string,
    uuid: string
  ) => Promise<Card | null>;

  createCard: (
    organizationUuid: string,
    payload: CardFormValues
  ) => Promise<void>;

  updateCard: (
    organizationUuid: string,
    uuid: string,
    payload: CardFormValues
  ) => Promise<void>;

  deleteCard: (
    organizationUuid: string,
    uuid: string
  ) => Promise<void>;

  clearSelectedCard: () => void;
}

const appendString = (
  formData: FormData,
  key: string,
  value?: string | number | boolean | null
) => {
  if (value === undefined || value === null) return;
  if (String(value).trim() === "") return;

  formData.append(key, String(value));
};

const buildCardFormData = (payload: CardFormValues) => {
  const formData = new FormData();

  appendString(formData, "first_name", payload.first_name);
  appendString(formData, "last_name", payload.last_name);

  appendString(formData, "position", payload.position);
  appendString(formData, "institution", payload.institution);
  appendString(formData, "profession", payload.profession);
  appendString(formData, "ubication", payload.ubication);
  appendString(formData, "description", payload.description);

  appendString(formData, "design_id", payload.design_id);

  appendString(formData, "primary_color", payload.primary_color);
  appendString(formData, "secondary_color", payload.secondary_color);

  formData.append("active", "true");

  if (payload.photo_perfil instanceof File) {
    formData.append("photo_perfil", payload.photo_perfil);
  }

  if (payload.photo_banner instanceof File) {
    formData.append("photo_banner", payload.photo_banner);
  }

  payload.qualities?.forEach((quality, index) => {
    if (!quality.name?.trim()) return;

    formData.append(`qualities[${index}][name]`, quality.name);
  });

  payload.documents?.forEach((document, index) => {
    if (!(document instanceof File)) return;

    formData.append(`documents[${index}]`, document);
  });

  payload.networks?.forEach((network, index) => {
    const uuid = network.uuid?.trim() ?? "";
    const value = network.value?.trim() ?? "";
    const label = network.label?.trim() ?? "";

    if (!uuid && !value && !label) return;

    formData.append(`networks[${index}][red_social]`, uuid);
    formData.append(`networks[${index}][value]`, value);
    formData.append(`networks[${index}][label]`, label);
  });

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

  fetchCards: async (organizationUuid: string, params = {}) => {
    try {
      set({ loading: true });

      if (!organizationUuid || typeof organizationUuid !== "string") {
        throw new Error("No se encontró el UUID de la organización.");
      }

      const { page = 1, perPage = get().perPage, search = "" } = params;

      const response = await cardService.getCards(organizationUuid, {
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

  fetchCard: async (organizationUuid: string, uuid: string) => {
    try {
      set({ loading: true });

      if (!organizationUuid || typeof organizationUuid !== "string") {
        throw new Error("No se encontró el UUID de la organización.");
      }

      if (!uuid) {
        throw new Error("No se encontró el UUID de la tarjeta.");
      }

      const response = await cardService.getCard(organizationUuid, uuid);
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

  createCard: async (organizationUuid: string, payload: CardFormValues) => {
    try {
      set({ saving: true });

      if (!organizationUuid || typeof organizationUuid !== "string") {
        throw new Error("No se encontró el UUID de la organización.");
      }

      if (!payload) {
        throw new Error("No se recibió la información del formulario.");
      }

      const formData = buildCardFormData(payload);

      await cardService.createCard(organizationUuid, formData);
    } catch (error) {
      console.error("Error createCard:", error);
      handleApiError(error);
      throw error;
    } finally {
      set({ saving: false });
    }
  },

  updateCard: async (
    organizationUuid: string,
    uuid: string,
    payload: CardFormValues
  ) => {
    try {
      set({ saving: true });

      if (!organizationUuid || typeof organizationUuid !== "string") {
        throw new Error("No se encontró el UUID de la organización.");
      }

      if (!uuid) {
        throw new Error("No se encontró el UUID de la tarjeta.");
      }

      if (!payload) {
        throw new Error("No se recibió la información del formulario.");
      }

      const formData = buildCardFormData(payload);

      await cardService.updateCard(organizationUuid, uuid, formData);
    } catch (error) {
      console.error("Error updateCard:", error);
      handleApiError(error);
      throw error;
    } finally {
      set({ saving: false });
    }
  },

  deleteCard: async (organizationUuid: string, uuid: string) => {
    try {
      set({ deleting: true });

      if (!organizationUuid || typeof organizationUuid !== "string") {
        throw new Error("No se encontró el UUID de la organización.");
      }

      if (!uuid) {
        throw new Error("No se encontró el UUID de la tarjeta.");
      }

      await cardService.deleteCard(organizationUuid, uuid);

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