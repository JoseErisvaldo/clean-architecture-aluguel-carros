import { useEffect, useState } from "react";
import { CarsRepositoryApi } from "../../infrastructure/repositories/cars-repositories-api";
import { CreateCar, GetCars } from "../../application/use-cases/get-customer";
import type { Cars, CreateCarDTO } from "../../domain/entities/cars";
import { handleApiError } from "../../../../shared/errors/handle-api-error";

export function useCars() {
  const [Cars, setCars] = useState<Cars[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRetrying, setIsRetrying] = useState(false);

  const repo = new CarsRepositoryApi();
  const useCase = new GetCars(repo);

  const fetchCars = async () => {
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

export function useCreateCar() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const repo = new CarsRepositoryApi();
  const useCase = new CreateCar(repo);

  const createCar = async (data: CreateCarDTO) => {
    try {
      setError(null);
      setLoading(true);
      setSuccess(false);

      await useCase.execute(data);
      setSuccess(true);
    } catch (err) {
      const { message } = handleApiError(err);
      setError(message);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setSuccess(false);
        setError(null);
      }, 3000);
    }
  };

  return {
    createCar,
    loading,
    error,
    success,
  };
}
