# Exemplo Avancado 3 - Cancelamento com Estorno Parcial

Este exemplo mostra um fluxo realista de cancelamento de locacao com regras de estorno.

Cenario:

- Usuario cancela uma locacao antes do inicio.
- Sistema calcula taxa de cancelamento conforme antecedencia.
- Registra estorno parcial no pagamento.
- Atualiza status da locacao para CANCELLED.
- Garante consistencia em caso de falha no meio do processo.

---

## 1) Regras de negocio

Regras de estorno (exemplo):

- Cancelou com 48h ou mais de antecedencia: estorno de 90%.
- Cancelou entre 24h e 48h: estorno de 70%.
- Cancelou com menos de 24h: estorno de 50%.
- Locacao ja iniciada nao pode ser cancelada por esse fluxo.

---

## 2) Domain (contratos)

```ts
// modules/rental/domain/repositories/rental-repository.ts
export interface RentalRepository {
  getById(id: string): Promise<{
    id: string;
    customerId: string;
    vehicleId: string;
    startDate: string;
    status: "OPEN" | "CLOSED" | "CANCELLED";
    totalAmount: number;
  }>;
  cancel(id: string, reason: string): Promise<void>;
  reopen(id: string): Promise<void>;
}

// modules/payment/domain/repositories/payment-repository.ts
export interface PaymentRepository {
  refund(input: {
    rentalId: string;
    customerId: string;
    originalAmount: number;
    refundAmount: number;
    reason: string;
  }): Promise<{ id: string }>;
}

// modules/vehicle/domain/repositories/vehicle-repository.ts
export interface VehicleRepository {
  setAvailability(vehicleId: string, available: boolean): Promise<void>;
}
```

---

## 3) Application (use case)

```ts
// modules/rental/application/use-cases/cancel-rental-with-refund.ts
import type { RentalRepository } from "../../domain/repositories/rental-repository";
import type { PaymentRepository } from "../../../payment/domain/repositories/payment-repository";
import type { VehicleRepository } from "../../../vehicle/domain/repositories/vehicle-repository";

interface CancelRentalInput {
  rentalId: string;
  reason: string;
  now: string;
}

export class CancelRentalWithRefund {
  constructor(
    private rentalRepository: RentalRepository,
    private paymentRepository: PaymentRepository,
    private vehicleRepository: VehicleRepository,
  ) {}

  async execute(input: CancelRentalInput) {
    const rental = await this.rentalRepository.getById(input.rentalId);

    if (rental.status !== "OPEN") {
      throw new Error("Somente locacoes abertas podem ser canceladas.");
    }

    this.validateNotStarted(rental.startDate, input.now);

    const refundRate = this.calculateRefundRate(rental.startDate, input.now);
    const refundAmount = Number((rental.totalAmount * refundRate).toFixed(2));

    let canceled = false;

    try {
      await this.rentalRepository.cancel(rental.id, input.reason);
      canceled = true;

      await this.paymentRepository.refund({
        rentalId: rental.id,
        customerId: rental.customerId,
        originalAmount: rental.totalAmount,
        refundAmount,
        reason: input.reason,
      });

      await this.vehicleRepository.setAvailability(rental.vehicleId, true);

      return {
        rentalId: rental.id,
        refundRate,
        refundAmount,
      };
    } catch (error) {
      if (canceled) {
        await this.rentalRepository.reopen(rental.id);
      }

      throw error;
    }
  }

  private validateNotStarted(startDate: string, now: string) {
    const start = new Date(startDate).getTime();
    const current = new Date(now).getTime();

    if (!Number.isFinite(start) || !Number.isFinite(current)) {
      throw new Error("Data invalida para cancelamento.");
    }

    if (current >= start) {
      throw new Error(
        "Locacao ja iniciada nao pode ser cancelada por este fluxo.",
      );
    }
  }

  private calculateRefundRate(startDate: string, now: string) {
    const start = new Date(startDate).getTime();
    const current = new Date(now).getTime();
    const diffHours = (start - current) / (1000 * 60 * 60);

    if (diffHours >= 48) return 0.9;
    if (diffHours >= 24) return 0.7;
    return 0.5;
  }
}
```

---

## 4) Infrastructure (repositorios API)

```ts
// modules/rental/infrastructure/repositories/rental-repository-api.ts
export class RentalRepositoryApi implements RentalRepository {
  async getById(id: string) {
    const response = await RentalApi.getById(id);
    return response.data[0];
  }

  async cancel(id: string, reason: string) {
    await RentalApi.cancel(id, reason);
  }

  async reopen(id: string) {
    await RentalApi.reopen(id);
  }
}
```

```ts
// modules/payment/infrastructure/repositories/payment-repository-api.ts
export class PaymentRepositoryApi implements PaymentRepository {
  async refund(input: {
    rentalId: string;
    customerId: string;
    originalAmount: number;
    refundAmount: number;
    reason: string;
  }) {
    const response = await PaymentApi.refund(input);
    return response.data[0];
  }
}
```

---

## 5) Presentation (hook)

```ts
// modules/rental/presentation/hooks/use-cancel-rental.ts
import { useState } from "react";

export function useCancelRental() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cancelRental = async (input: {
    rentalId: string;
    reason: string;
    now: string;
  }) => {
    setLoading(true);
    setError(null);

    try {
      const rentalRepository = new RentalRepositoryApi();
      const paymentRepository = new PaymentRepositoryApi();
      const vehicleRepository = new VehicleRepositoryApi();

      const useCase = new CancelRentalWithRefund(
        rentalRepository,
        paymentRepository,
        vehicleRepository,
      );

      return await useCase.execute(input);
    } catch {
      setError("Nao foi possivel cancelar a locacao agora.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { cancelRental, loading, error };
}
```

---

## 6) Mapeamento de erro amigavel

```ts
function mapCancelError(error: unknown): string {
  if (typeof error === "object" && error && "message" in error) {
    const message = String((error as { message: unknown }).message);

    if (message.includes("ja iniciada")) {
      return "A locacao ja iniciou e nao pode ser cancelada por este fluxo.";
    }

    if (message.includes("Somente locacoes abertas")) {
      return "Essa locacao nao esta disponivel para cancelamento.";
    }
  }

  return "Nao foi possivel concluir o cancelamento agora.";
}
```

---

## 7) Checklist

- Regra de estorno ficou no Application.
- Contratos estao no Domain.
- API ficou na Infrastructure.
- Hook da tela so orquestra estado de UI.
- Existe compensacao para falha parcial.
- Mensagens para usuario estao claras.

---

## 8) Quando usar esse modelo

Use esse modelo quando houver:

- regra financeira;
- mudanca de status em mais de uma entidade;
- necessidade de consistencia em caso de erro;
- impacto direto para cliente final.
