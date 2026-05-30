import { http } from "../../../../../infrastructure/api/http";

export const FilterBrandsApi = {
  getAll: (signal?: AbortSignal) => {
    return http.get("/view_filter_brands?select=*", { signal });
  },
};
