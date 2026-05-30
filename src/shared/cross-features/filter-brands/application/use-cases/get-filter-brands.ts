import type { FilterBrandsRepositories } from "../../infrastructure/repositories/filter-brands-repositories";

export class GetFilterBrands {
  private repository: FilterBrandsRepositories;

  constructor(repository: FilterBrandsRepositories) {
    this.repository = repository;
  }

  async execute(signal?: AbortSignal) {
    return this.repository.getAll(signal);
  }
}
