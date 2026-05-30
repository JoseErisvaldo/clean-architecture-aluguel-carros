import type { FilterModels } from "../../domain/entities/filter-models";
import { FilterModelsApi } from "../endpoints/filter-models-api";

export class FilterModelsRepositories {
  async getAll(signal?: AbortSignal): Promise<FilterModels[]> {
    return FilterModelsApi.getAll(signal).then((response) => response.data);
  }
}
