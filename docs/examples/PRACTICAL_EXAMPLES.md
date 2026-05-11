# Exemplos Praticos de Implementacao

Este documento mostra exemplos reais de como implementar funcionalidades seguindo o padrao de arquitetura do projeto.

Objetivo:

- Ajudar quem esta comecando.
- Servir como referencia rapida para o time.
- Servir como contexto para IA gerar codigo no padrao correto.

---

## 1) Exemplo completo de fluxo por camadas (Read)

Cenario: listar clientes.

## Domain - contrato

Arquivo sugerido:

- modules/customer/domain/repositories/customer-repositories.ts

```ts
import type { Customer } from "../entities/customer";

export interface CustomerRepository {
  getAll(): Promise<Customer[]>;
}
```

## Application - caso de uso

Arquivo sugerido:

- modules/customer/application/use-cases/get-customer.ts

```ts
import type { CustomerRepository } from "../../domain/repositories/customer-repositories";

export class GetCustomers {
  constructor(private repository: CustomerRepository) {}

  async execute() {
    return this.repository.getAll();
  }
}
```

## Infrastructure - implementacao do repositorio

Arquivo sugerido:

- modules/customer/infrastructure/repositories/customer-repository-api.ts

```ts
import type { Customer } from "../../domain/entities/customer";
import type { CustomerRepository } from "../../domain/repositories/customer-repositories";
import { CustomersApi } from "../endpoints/customer-api";

export class CustomerRepositoryApi implements CustomerRepository {
  async getAll(): Promise<Customer[]> {
    const response = await CustomersApi.getAll();
    return response.data;
  }
}
```

## Presentation - hook e pagina

Hook:

- modules/customer/presentation/hooks/use-customer.ts

```ts
import { useEffect, useState } from "react";
import { CustomerRepositoryApi } from "../../infrastructure/repositories/customer-repository-api";
import { GetCustomers } from "../../application/use-cases/get-customer";
import type { Customer } from "../../domain/entities/customer";

export function useCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    const repo = new CustomerRepositoryApi();
    const useCase = new GetCustomers(repo);

    useCase.execute().then(setCustomers);
  }, []);

  return { customers };
}
```

Pagina:

```tsx
import { useCustomers } from "../hooks/use-customer";

export function CustomersPage() {
  const { customers } = useCustomers();

  return (
    <div>
      <h1>Clientes</h1>
      {customers.map((customer) => (
        <div key={customer.id}>{customer.name}</div>
      ))}
    </div>
  );
}
```

---

## 2) Exemplo CRUD (modelo)

## Create

```ts
// domain/repositories/vehicle-repositories.ts
create(input: CreateVehicleInput): Promise<Vehicle>;
```

```ts
// application/use-cases/create-vehicle.ts
export class CreateVehicle {
  constructor(private repository: VehicleRepository) {}

  async execute(input: CreateVehicleInput) {
    return this.repository.create(input);
  }
}
```

```ts
// infrastructure/endpoints/vehicle-api.ts
create: (input: CreateVehicleInput) => http.post("/vehicles", input);
```

## Read

```ts
getAll(): Promise<Vehicle[]>;
getById(id: string): Promise<Vehicle>;
```

## Update

```ts
update(id: string, input: UpdateVehicleInput): Promise<Vehicle>;
```

## Delete

```ts
delete(id: string): Promise<void>;
```

---

## 3) Exemplo de regra de negocio (nao CRUD)

Cenario: validar se um veiculo pode ser alugado.

Arquivo sugerido:

- modules/rental/application/use-cases/check-vehicle-availability.ts

```ts
interface CheckAvailabilityInput {
  vehicleId: string;
  startDate: string;
  endDate: string;
}

export class CheckVehicleAvailability {
  constructor(private rentalRepository: RentalRepository) {}

  async execute(input: CheckAvailabilityInput) {
    const hasConflict = await this.rentalRepository.hasDateConflict(
      input.vehicleId,
      input.startDate,
      input.endDate,
    );

    return { available: !hasConflict };
  }
}
```

Ponto importante:

- Regra de negocio fica no use case.
- Componente visual so exibe resultado.

---

## 4) Exemplo de rota privada e publica

Router (resumo):

```tsx
<Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />

<Route element={<PrivateRoute><PrivateLayout /></PrivateRoute>}>
  <Route path="/" element={<CustomersPage />} />
  <Route path="/Customers/:id" element={<CustomersIdPage />} />
</Route>
```

Interpretacao simples:

- PublicRoute: se usuario ja esta logado, nao deixa voltar para login.
- PrivateRoute: se usuario nao esta logado, manda para login.

---

## 5) Checklist rapido de implementacao

Antes de finalizar uma feature, confirme:

- A pagina nao chama API direto.
- Existe contrato no Domain.
- Existe use case no Application.
- Existe implementacao no Infrastructure.
- O hook da tela usa o use case.
- A rota foi adicionada no router.

---

## 6) Estrutura sugerida para novas features

```text
modules/
  nova-feature/
    domain/
      entities/
      repositories/
    application/
      use-cases/
    infrastructure/
      endpoints/
      repositories/
    presentation/
      hooks/
      components/
      pages/
```
