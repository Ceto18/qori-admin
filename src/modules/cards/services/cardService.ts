// src/modules/cards/services/cardService.ts

import { api } from "@/services/api";

type GetCardsParams = {
  page?: number;
  per_page?: number;
  search?: string;
};

export const cardService = {
  getCards: async (params: GetCardsParams = {}) => {
    const res = await api.get("/cards", {
      params,
    });

    return res.data;
  },

  getCard: async (uuid: string) => {
    const res = await api.get(`/cards/${uuid}`);

    return res.data;
  },

  createCard: async (payload: FormData) => {
    const res = await api.post("/cards", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  },

  updateCard: async (uuid: string, payload: FormData) => {
    const res = await api.post(`/cards/${uuid}`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  },

  deleteCard: async (uuid: string) => {
    const res = await api.delete(`/cards/${uuid}`);

    return res.data;
  },
};