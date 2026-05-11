const API_REST_URL =
  import.meta.env.VITE_SUPABASE_URL ?? import.meta.env.VITE_REACT_APP_API_URL;
const API_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!API_REST_URL || !API_KEY) {
  console.error(
    "Missing API env vars. Please set VITE_SUPABASE_URL (or VITE_REACT_APP_API_URL) and VITE_SUPABASE_ANON_KEY in your .env file.",
  );
}

const API_AUTH_URL = API_REST_URL?.replace("/rest/v1", "/auth/v1");

export const API_CONFIG = {
  API_REST_URL,
  API_AUTH_URL,
  API_KEY,
  DEFAULT_HEADERS: {
    apikey: API_KEY,
    Authorization: `Bearer ${API_KEY}`,
  },
};
