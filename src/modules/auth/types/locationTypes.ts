export type Country = {
  id: number;
  name: string;
  code: string;
};

export type LocationItem = {
  id: number;
  name: string;
};

export type CountriesResponse = {
  success: boolean;
  message: string;
  data: Country[];
};

export type LocationsResponse = {
  success: boolean;
  message: string;
  data: LocationItem[];
};