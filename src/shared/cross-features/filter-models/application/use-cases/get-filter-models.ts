import type { FilterModelsRepositories } from "../../infrastructure/repositories/filter-models-repositories";

export class GetFilterModels {
  private repository: FilterModelsRepositories;

  constructor(repository: FilterModelsRepositories) {
    this.repository = repository;
  }

  async execute(signal?: AbortSignal) {
    return this.repository.getAll(signal);
  }
}
