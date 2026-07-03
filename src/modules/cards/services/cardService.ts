// src/modules/cards/services/cardService.ts

import { api } from "@/services/api";
import type {
  CardsResponse,
  CardResponse,
  CardUrlResponse,
  CardQrResponse,
} from "../types";

export type GetCardsParams = {
  page?: number;
  per_page?: number;
  search?: string;
};

export const cardService = {
  getCards: async (
    organizationUuid: string,
    params: GetCardsParams = {}
  ): Promise<CardsResponse> => {
    const res = await api.get(`/organization/${organizationUuid}/cards`, {
      params,
    });

    return res.data;
  },

  getCard: async (
    organizationUuid: string,
    uuid: string
  ): Promise<CardResponse> => {
    const res = await api.get(
      `/organization/${organizationUuid}/cards/${uuid}`
    );

    return res.data;
  },

  getCardUrl: async (
    organizationUuid: string,
    cardUuid: string
  ): Promise<CardUrlResponse> => {
    const res = await api.get(
      `/organization/${organizationUuid}/cards/${cardUuid}/urlcard`
    );

    return res.data;
  },

  getCardQr: async (
    organizationUuid: string,
    cardUuid: string
  ): Promise<CardQrResponse> => {
    const res = await api.get(
      `/organization/${organizationUuid}/cards/${cardUuid}/codeqr`
    );

    return res.data;
  },

  createCard: async (
    organizationUuid: string,
    payload: FormData
  ): Promise<CardResponse> => {
    const res = await api.post(
      `/organization/${organizationUuid}/cards`,
      payload
    );

    return res.data;
  },

  updateCard: async (
    organizationUuid: string,
    uuid: string,
    payload: FormData
  ): Promise<CardResponse> => {
    const res = await api.post(
      `/organization/${organizationUuid}/cards/${uuid}`,
      payload
    );

    return res.data;
  },

  toggleCardState: async (
    organizationUuid: string,
    cardUuid: string,
    state: boolean
  ): Promise<CardResponse> => {
    const res = await api.put(
      `/organization/${organizationUuid}/cards/state/${cardUuid}`,
      {
        state,
      }
    );

    return res.data;
  },

  deleteCard: async (
    organizationUuid: string,
    uuid: string
  ): Promise<CardResponse> => {
    const res = await api.delete(
      `/organization/${organizationUuid}/cards/${uuid}`
    );

    return res.data;
  },
};