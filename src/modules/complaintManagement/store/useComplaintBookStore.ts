// src/modules/complaintBook/store/useComplaintBookStore.ts

import { create } from "zustand";

import { complaintBookService } from "../services/complaintBookService";
import { ComplaintBookEntry, ComplaintBookPayload } from "../types";

import { showSuccess } from "@/shared/utils/toast";
import { handleApiError } from "@/shared/utils/handleApiError";

type FetchComplaintBookEntriesParams = {
    page?: number;
    perPage?: number;
    search?: string;
};

interface ComplaintBookState {
    complaintBookEntries: ComplaintBookEntry[];
    complaintBookEntry: ComplaintBookEntry | null;

    loading: boolean;

    currentPage: number;
    totalPages: number;
    perPage: number;
    total: number;

    fetchComplaintBookEntries: (
        params?: FetchComplaintBookEntriesParams
    ) => Promise<void>;

    fetchComplaintBookEntry: (uuid: string) => Promise<void>;

    createComplaintBookEntry: (
        payload: ComplaintBookPayload
    ) => Promise<void>;

    deleteComplaintBookEntry: (uuid: string) => Promise<void>;

    clearComplaintBookEntry: () => void;
}

export const useComplaintBookStore = create<ComplaintBookState>((set, get) => ({
    complaintBookEntries: [],
    complaintBookEntry: null,

    loading: false,

    currentPage: 1,
    totalPages: 1,
    perPage: 10,
    total: 0,

    fetchComplaintBookEntries: async (params = {}) => {
        try {
            set({ loading: true });

            const { page = 1, perPage = get().perPage, search = "" } = params;

            const response =
                await complaintBookService.getComplaintBookEntries({
                    page,
                    per_page: perPage,
                    search,
                });

            set({
                complaintBookEntries: response.data?.data ?? [],
                currentPage: response.data?.current_page ?? 1,
                totalPages: response.data?.last_page ?? 1,
                perPage: Number(response.data?.per_page ?? perPage),
                total: response.data?.total ?? 0,
            });
        } catch (error) {
            console.error("Error fetchComplaintBookEntries:", error);
            handleApiError(error);
        } finally {
            set({ loading: false });
        }
    },

    fetchComplaintBookEntry: async (uuid) => {
        try {
            set({
                loading: true,
                complaintBookEntry: null,
            });

            const response =
                await complaintBookService.getComplaintBookEntry(uuid);

            const entryData =
                response?.data?.complaint_book_entry ??
                response?.data?.complaintBookEntry ??
                response?.data ??
                null;

            set({
                complaintBookEntry: entryData,
            });
        } catch (error) {
            console.error("Error fetchComplaintBookEntry:", error);
            handleApiError(error);
        } finally {
            set({ loading: false });
        }
    },

    createComplaintBookEntry: async (payload) => {
        try {
            set({ loading: true });

            const response =
                await complaintBookService.createComplaintBookEntry(payload);

            const entryData =
                response?.data?.complaint_book_entry ??
                response?.data?.complaintBookEntry ??
                response?.data ??
                null;

            set({
                complaintBookEntry: entryData,
            });

            showSuccess(
                response?.message ??
                    "Reclamo o queja registrado correctamente."
            );
        } catch (error) {
            console.error("Error createComplaintBookEntry:", error);
            handleApiError(error);
            throw error;
        } finally {
            set({ loading: false });
        }
    },

    deleteComplaintBookEntry: async (uuid) => {
        try {
            set({ loading: true });

            const response =
                await complaintBookService.deleteComplaintBookEntry(uuid);

            showSuccess(
                response?.message ?? "Registro eliminado correctamente."
            );

            const { currentPage, perPage } = get();

            await get().fetchComplaintBookEntries({
                page: currentPage,
                perPage,
            });
        } catch (error) {
            console.error("Error deleteComplaintBookEntry:", error);
            handleApiError(error);
            throw error;
        } finally {
            set({ loading: false });
        }
    },

    clearComplaintBookEntry: () => {
        set({
            complaintBookEntry: null,
        });
    },
}));