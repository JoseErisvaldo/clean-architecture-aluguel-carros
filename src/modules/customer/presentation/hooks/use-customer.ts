import { useEffect, useState } from "react";
import { CustomerRepositoryApi } from "../../infrastructure/repositories/customer-repository-api";
import { GetCustomers } from "../../application/use-cases/get-customer";
import type { Customer } from "../../domain/entities/customer";

export function useCustomers() {
  const [Customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const repo = new CustomerRepositoryApi();
    const useCase = new GetCustomers(repo);

    useCase
      .execute()
      .then((customers) => {
        if (!isMounted) return;
        if (!Array.isArray(customers)) {
          setCustomers([]);
          setError("Resposta inesperada da API ao carregar clientes.");
          return;
        }

        setCustomers(customers);
      })
      .catch(() => {
        if (!isMounted) return;
        setError(
          "Nao foi possivel carregar os clientes. Tente novamente em alguns instantes.",
        );
      })
      .finally(() => {
        if (!isMounted) return;
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { Customers, loading, error };
}

export function useCustomerById(id: string) {
  const hasValidId = Boolean(id);
  const [Customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(hasValidId);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      return;
    }

    let isMounted = true;
    const repo = new CustomerRepositoryApi();
    const useCase = new GetCustomers(repo);

    useCase
      .executeById(id)
      .then((customer) => {
        if (!isMounted) return;
        setCustomer(customer);
      })
      .catch(() => {
        if (!isMounted) return;
        setError(
          "Nao foi possivel carregar o cliente. Tente novamente em alguns instantes.",
        );
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
    Customer,
    loading: hasValidId ? loading : false,
    error: hasValidId ? error : "ID de cliente invalido.",
  };
}
