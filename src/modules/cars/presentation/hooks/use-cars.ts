// Este codido vai ficar a fins de exemplo de como usar o useCars e useCarById

import { useEffect, useState } from "react";
import { CarsRepositoryApi } from "../../infrastructure/repositories/cars-repositories-api";
import { GetCars } from "../../application/use-cases/get-customer";
import type { Cars } from "../../domain/entities/cars";

export function useCars() {
  const [Cars, setCars] = useState<Cars[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRetrying, setIsRetrying] = useState(false);

  const fetchCars = async () => {
    const useCase = new GetCars(new CarsRepositoryApi());

    try {
      setError(null);
      setIsRetrying(true);
      setLoading(true);

      const cars = await useCase.execute();
      setCars(cars);
    } catch {
      setError(
        "Nao foi possivel carregar os carros. Tente novamente em alguns instantes.",
      );
    } finally {
      setLoading(false);
      setIsRetrying(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    const useCase = new GetCars(new CarsRepositoryApi());

    const load = async () => {
      if (isMounted) {
        try {
          setError(null);
          setIsRetrying(true);
          setLoading(true);

          const cars = await useCase.execute();
          if (isMounted) {
            setCars(cars);
          }
        } catch {
          if (isMounted) {
            setError(
              "Nao foi possivel carregar os carros. Tente novamente em alguns instantes.",
            );
          }
        } finally {
          if (isMounted) {
            setLoading(false);
            setIsRetrying(false);
          }
        }
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    Cars,
    loading,
    error,
    isRetrying,
    fetchCars,
  };
}
export function useCarById(id: string) {
  const hasValidId = Boolean(id);
  const [Car, setCar] = useState<Cars | null>(null);
  const [loading, setLoading] = useState(hasValidId);
  const [error, setError] = useState<string | null>(null);
  const [isRetrying, setIsRetrying] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }

    let isMounted = true;
    const repo = new CarsRepositoryApi();
    const useCase = new GetCars(repo);

    useCase
      .executeById(id)
      .then((car) => {
        if (!isMounted) return;
        setCar(car);
      })
      .catch(() => {
        if (!isMounted) return;
        setError(
          "Nao foi possivel carregar o carro. Tente novamente em alguns instantes.",
        );
        setIsRetrying(false);
      })
      .finally(() => {
        if (!isMounted) return;
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  return {
    Car,
    loading: hasValidId ? loading : false,
    error,
    isRetrying,
  };
}
