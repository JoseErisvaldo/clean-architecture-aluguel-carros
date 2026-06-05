// Este codigo vai ficar a fins de exemplo de como usar o useCars e useCarById

import { useEffect, useState } from "react";
import { GetFilterModels } from "../../../../shared/cross-features/filter-models/application/use-cases/get-filter-models";
import type { FilterModels } from "../../../../shared/cross-features/filter-models/domain/entities/filter-models";
import { FilterModelsRepositories } from "../../../../shared/cross-features/filter-models/infrastructure/repositories/filter-models-repositories";

const repo = new FilterModelsRepositories();
const useCase = new GetFilterModels(repo);

export function useFilterModels() {
  const [filterModels, setFilterModels] = useState<FilterModels[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        setError(null);
        setLoading(true);

        const models = await useCase.execute(controller.signal);

        if (controller.signal.aborted) {
          return;
        }

        setFilterModels(models);
      } catch {
        setError(
          "Nao foi possivel carregar os modelos. Tente novamente em alguns instantes.",
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    })();

    return () => {
      controller.abort();
    };
  }, []);

  return {
    filterModels,
    loading,
    error,
  };
}
