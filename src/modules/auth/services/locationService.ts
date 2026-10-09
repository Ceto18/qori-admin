import { api } from "@/services/api";

import type {
  CountriesResponse,
  LocationsResponse,
} from "../types/locationTypes";

export const locationService = {
  getCountries: async (): Promise<CountriesResponse> => {
    const { data } = await api.get<CountriesResponse>(
      "/locations/countries"
    );

    return data;
  },

  getDepartments: async (
    countryId: number
  ): Promise<LocationsResponse> => {
    const { data } = await api.get<LocationsResponse>(
      "/locations/departments",
      {
        params: {
          country_id: countryId,
        },
      }
    );

    return data;
  },

  getProvinces: async (
    departmentId: number
  ): Promise<LocationsResponse> => {
    const { data } = await api.get<LocationsResponse>(
      "/locations/provinces",
      {
        params: {
          department_id: departmentId,
        },
      }
    );

    return data;
  },

  getDistricts: async (
    provinceId: number
  ): Promise<LocationsResponse> => {
    const { data } = await api.get<LocationsResponse>(
      "/locations/districts",
      {
        params: {
          province_id: provinceId,
        },
      }
    );

    return data;
  },
};