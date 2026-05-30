import { FilterBrandsApi } from "../endpoints/filter-brands-api";

export class FilterBrandsRepositories {
  getAll(signal?: AbortSignal) {
    return FilterBrandsApi.getAll(signal).then((response) => response.data);
  }
}
