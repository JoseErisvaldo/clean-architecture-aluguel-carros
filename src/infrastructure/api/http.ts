import axios from "axios";

const API_URL =
  import.meta.env.VITE_SUPABASE_URL ?? import.meta.env.VITE_REACT_APP_API_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!API_URL || !SUPABASE_ANON_KEY) {
  console.error(
    "Missing Supabase env vars. Please set VITE_SUPABASE_URL (or VITE_REACT_APP_API_URL) and VITE_SUPABASE_ANON_KEY in your .env file.",
  );
}

export const http = axios.create({
  baseURL: API_URL,
  headers: {
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
  },
});
