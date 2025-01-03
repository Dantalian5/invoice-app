import axios from "axios";
import { useAuth } from "@/components/context/AuthContext";

const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
});

export const useAxiosInterceptors = () => {
  const { token } = useAuth();
  apiClient.interceptors.request.use((config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return apiClient;
};
