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