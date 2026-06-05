import { useQuery } from "@tanstack/react-query";
import { GetFilterBrands } from "../../../../shared/cross-features/filter-brands/application/use-cases/get-filter-brands";
import { FilterBrandsRepositories } from "../../../../shared/cross-features/filter-brands/infrastructure/repositories/filter-brands-repositories";
import { filterBrandsQueryKey } from "../endpoints-keys/filter-brands-keys";

const repository = new FilterBrandsRepositories();
const useCase = new GetFilterBrands(repository);

export function useFilterBrandsQueries() {
  return useQuery({
    queryKey: filterBrandsQueryKey,
    queryFn: async ({ signal }) => useCase.execute(signal),
  });
}
