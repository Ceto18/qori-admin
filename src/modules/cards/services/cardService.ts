// src/modules/cards/services/cardService.ts

import { api } from "@/services/api";

type GetCardsParams = {
  page?: number;
  per_page?: number;
  search?: string;
};

export const cardService = {
  getCards: async (
    organizationUuid: string,
    params: GetCardsParams = {}
  ) => {
    const res = await api.get(`/organization/${organizationUuid}/cards`, {
      params,
    });

    return res.data;
  },

  getCard: async (organizationUuid: string, uuid: string) => {
    const res = await api.get(
      `/organization/${organizationUuid}/cards/${uuid}`
    );

    return res.data;
  },

  createCard: async (organizationUuid: string, payload: FormData) => {
    const res = await api.post(
      `/organization/${organizationUuid}/cards`,
      payload,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return res.data;
  },

  updateCard: async (
    organizationUuid: string,
    uuid: string,
    payload: FormData
  ) => {
    const res = await api.post(
      `/organization/${organizationUuid}/cards/${uuid}`,
      payload,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return res.data;
  },

  toggleCardState: async (
    organizationUuid: string,
    cardUuid: string,
    state: boolean
  ) => {
    const res = await api.put(
      `/organization/${organizationUuid}/cards/state/${cardUuid}`,
      {
        state,
      }
    );

    return res.data;
  },

  deleteCard: async (organizationUuid: string, uuid: string) => {
    const res = await api.delete(
      `/organization/${organizationUuid}/cards/${uuid}`
    );

    return res.data;
  },
};