import { api } from "@/services/api";

type GetOrganizationsParams = {
  page?: number;
  per_page?: number;
  name?: string;
};

export const organizationService = {
  getOrganizations: async (params: GetOrganizationsParams = {}) => {
    const res = await api.get("/organization", {
      params,
    });

    return res.data;
  },

  getOrganization: async (uuid: string) => {
    const res = await api.get(`/organization/${uuid}`);

    return res.data;
  },

  createOrganization: async (payload: FormData) => {
    const res = await api.post("/organization", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  },

  updateOrganization: async (uuid: string, payload: FormData) => {
    payload.append("_method", "PUT");

    const res = await api.post(`/organization/${uuid}`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  },

  deleteOrganization: async (uuid: string) => {
    const res = await api.delete(`/organization/${uuid}`);

    return res.data;
  },
};