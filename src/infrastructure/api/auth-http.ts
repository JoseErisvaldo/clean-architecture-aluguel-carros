import axios from "axios";
import { API_CONFIG } from "./api-config";

export const authHttp = axios.create({
  baseURL: API_CONFIG.API_AUTH_URL,
  headers: {
    ...API_CONFIG.DEFAULT_HEADERS,
    "Content-Type": "application/json",
  },
});
