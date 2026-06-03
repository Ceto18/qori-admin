import { api } from "@/services/api";

export const loginRequest = async (data: {
  email: string;
  password: string;
}) => {
  const response = await api.post("/auth/login", data);

  return {
    user: response.data.data.user,
    token: response.data.data.access_token,
    refreshToken: response.data.data.refresh_token,
    expiresIn: response.data.data.expires_in,
  };
};

export const registerRequest = async (data: {
  name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation: string;
}) => {
  const response = await api.post("/auth/register", data);

  return {
    user: response.data.data.user,
    token: response.data.data.token,
  };
};