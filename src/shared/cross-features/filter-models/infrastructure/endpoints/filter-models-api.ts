import { http } from "../../../../../infrastructure/api/http";

export const FilterModelsApi = {
  getAll: (signal?: AbortSignal) =>
    http.get("/filter_models?select=*", { signal }),
};
