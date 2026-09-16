import axios from "axios";

import { API } from "@/constants/api";
import { ROUTES } from "@/constants/routes";

import { getAccessToken, clearTokens } from "@/services/token.service";

const api = axios.create({
  baseURL: API.BASE_URL,

  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response?.status === 401) {
      clearTokens();

      window.location.href = ROUTES.LOGIN;
    }

    return Promise.reject(error);
  },
);

export default api;
