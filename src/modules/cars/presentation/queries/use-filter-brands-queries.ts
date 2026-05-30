import { useQuery } from "@tanstack/react-query";
import { GetFilterBrands } from "../../../../shared/cross-features/filter-brands/application/use-cases/get-filter-brands";
import type { FilterBrands } from "../../../../shared/cross-features/filter-brands/domain/entities/filter-brands";
import { FilterBrandsRepositories } from "../../../../shared/cross-features/filter-brands/infrastructure/repositories/filter-brands-repositories";
import { filterBrandsQueryKey } from "../endpoints-keys/filter-brands-keys";

const repository = new FilterBrandsRepositories();
const useCase = new GetFilterBrands(repository);

export function useFilterBrandsQueries() {
  const query = useQuery<FilterBrands[]>({
    queryKey: filterBrandsQueryKey,
    queryFn: ({ signal }) => useCase.execute(signal),
    staleTime: 5 * 60 * 1000,
  });

  return {
    filterBrands: query.data ?? [],
    loading: query.isLoading,
    error: query.error
      ? "Nao foi possivel carregar as marcas. Tente novamente em alguns instantes."
      : null,
    refetch: query.refetch,
  };
}
