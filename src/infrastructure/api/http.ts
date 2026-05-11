import axios from "axios";
import { API_CONFIG } from "./api-config";

export const http = axios.create({
  baseURL: API_CONFIG.API_REST_URL,
  headers: API_CONFIG.DEFAULT_HEADERS,
});
