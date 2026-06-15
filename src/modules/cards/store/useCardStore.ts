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

const normalizeCard = (card: any): Card => {
  const firstName = card.first_name ?? "";
  const lastName = card.last_name ?? "";

  return {
    ...card,

    first_name: firstName,
    last_name: lastName,
    full_name: card.full_name ?? `${firstName} ${lastName}`.trim(),

    company: card.company ?? card.institution ?? "",
    location: card.location ?? card.ubication ?? "",
    bio: card.bio ?? card.description ?? "",

    profile_image: card.profile_image ?? card.photo_perfil_url ?? "",
    banner_image: card.banner_image ?? card.photo_banner_url ?? "",

    active: card.active ?? true,
  };
};

const buildCardFormData = (payload: CardFormValues) => {
  const formData = new FormData();

  appendString(formData, "first_name", payload.first_name);
  appendString(formData, "last_name", payload.last_name);

  appendString(formData, "position", payload.position);
  appendString(formData, "institution", payload.company);
  appendString(formData, "profession", payload.profession);
  appendString(formData, "ubication", payload.location);
  appendString(formData, "description", payload.bio);

  appendString(formData, "design_id", payload.design_id);

  appendString(formData, "primary_color", payload.primary_color);
  appendString(formData, "secondary_color", payload.secondary_color);

  formData.append("active", "true");

  if (payload.profile_image instanceof File) {
    formData.append("photo_perfil", payload.profile_image);
  }

  if (payload.banner_image instanceof File) {
    formData.append("photo_banner", payload.banner_image);
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
    const redSocial = network.red_social?.trim() ?? "";
    const value = network.value?.trim() ?? "";
    const label = network.label?.trim() ?? "";

    if (!redSocial && !value && !label) return;

    formData.append(`networks[${index}][red_social]`, redSocial);
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

      if (!organizationUuid) {
        throw new Error("No se encontró el UUID de la organización.");
      }

      const { page = 1, perPage = get().perPage, search = "" } = params;

      const response = await cardService.getCards(organizationUuid, {
        page,
        per_page: perPage,
        search,
      });

      const cards = response.data?.data ?? [];

      set({
        cards: cards.map(normalizeCard),
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

      if (!organizationUuid) {
        throw new Error("No se encontró el UUID de la organización.");
      }

      if (!uuid) {
        throw new Error("No se encontró el UUID de la tarjeta.");
      }

      const response = await cardService.getCard(organizationUuid, uuid);
      const card = response.data ? normalizeCard(response.data) : null;

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

      if (!organizationUuid) {
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

      if (!organizationUuid) {
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

      if (!organizationUuid) {
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