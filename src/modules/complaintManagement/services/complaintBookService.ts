// src/modules/complaintBook/services/complaintBookService.ts

import { api } from "@/services/api";

import { ComplaintBookPayload } from "../types";

type GetComplaintBookEntriesParams = {
    page?: number;
    per_page?: number;
    search?: string;
};

export const complaintBookService = {
    getComplaintBookEntries: async (
        params: GetComplaintBookEntriesParams = {}
    ) => {
        const res = await api.get("/admin/complaint-book-entries", {
            params,
        });

        return res.data;
    },

    getComplaintBookEntry: async (uuid: string) => {
        const res = await api.get(`/admin/complaint-book-entries/${uuid}`);

        return res.data;
    },

    createComplaintBookEntry: async (payload: ComplaintBookPayload) => {
        const res = await api.post(
            "/public/complaint-book-entries",
            payload
        );

        return res.data;
    },

    deleteComplaintBookEntry: async (uuid: string) => {
        const res = await api.delete(`/admin/complaint-book-entries/${uuid}`);

        return res.data;
    },
};