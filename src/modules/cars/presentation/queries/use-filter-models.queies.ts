import { useQuery } from "@tanstack/react-query";
import { GetFilterModels } from "../../../../shared/cross-features/filter-models/application/use-cases/get-filter-models";
import { FilterModelsRepositories } from "../../../../shared/cross-features/filter-models/infrastructure/repositories/filter-models-repositories";

const useCase = new GetFilterModels(new FilterModelsRepositories());

export const useFilterModelsQuery = () => {
  return useQuery({
    queryKey: ["filter-models"],
    queryFn: () => useCase.execute(),
  });
};
