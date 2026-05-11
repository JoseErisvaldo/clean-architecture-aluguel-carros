# Exemplo Avancado 2 - Fechamento de Locacao

Este documento traz um segundo exemplo complexo, separado do arquivo principal de exemplos.

Cenario:

- Encerrar a locacao no retorno do veiculo.
- Calcular atraso.
- Aplicar multa quando necessario.
- Registrar pagamento final.
- Liberar veiculo novamente para disponivel.

Objetivo:

- Mostrar como implementar logica de negocio mais pesada sem quebrar o padrao de arquitetura.

---

## 1) Regras de negocio do cenario

Regras:

- Se devolucao for no prazo: sem multa.
- Se devolucao atrasar: cobra valor adicional por dia.
- Sempre fechar locacao com status CLOSED.
- Sempre liberar veiculo para disponivel no final.
- Se falhar no pagamento final, nao pode deixar o sistema inconsistente.

---

## 2) Domain (contratos)

```ts
// modules/rental/domain/repositories/rental-repository.ts
export interface RentalRepository {
  getById(id: string): Promise<{
    id: string;
    customerId: string;
    vehicleId: string;
    endDate: string;
    dailyRate: number;
    status: "OPEN" | "CLOSED" | "CANCELLED";
  }>;
  close(id: string): Promise<void>;
  reopen(id: string): Promise<void>;
}

// modules/vehicle/domain/repositories/vehicle-repository.ts
export interface VehicleRepository {
  setAvailability(vehicleId: string, available: boolean): Promise<void>;
}

// modules/payment/domain/repositories/payment-repository.ts
export interface PaymentRepository {
  create(input: {
    rentalId: string;
    customerId: string;
    amount: number;
    method: "PIX" | "CARD";
    type: "FINAL" | "FINE";
  }): Promise<{ id: string }>;
}
```

---

## 3) Application (use case orquestrador)

```ts
// modules/rental/application/use-cases/close-rental.ts
import type { RentalRepository } from "../../domain/repositories/rental-repository";
import type { VehicleRepository } from "../../../vehicle/domain/repositories/vehicle-repository";
import type { PaymentRepository } from "../../../payment/domain/repositories/payment-repository";

interface CloseRentalInput {
  rentalId: string;
  returnDate: string;
  paymentMethod: "PIX" | "CARD";
}

export class CloseRental {
  constructor(
    private rentalRepository: RentalRepository,
    private vehicleRepository: VehicleRepository,
    private paymentRepository: PaymentRepository,
  ) {}

  async execute(input: CloseRentalInput) {
    const rental = await this.rentalRepository.getById(input.rentalId);

    if (rental.status !== "OPEN") {
      throw new Error("Locacao nao esta aberta para fechamento.");
    }

    const { finalAmount, hasFine } = this.calculateFinalAmount(
      rental.endDate,
      input.returnDate,
      rental.dailyRate,
    );

    let closed = false;

    try {
      await this.rentalRepository.close(rental.id);
      closed = true;

      await this.paymentRepository.create({
        rentalId: rental.id,
        customerId: rental.customerId,
        amount: finalAmount,
        method: input.paymentMethod,
        type: hasFine ? "FINE" : "FINAL",
      });

      await this.vehicleRepository.setAvailability(rental.vehicleId, true);

      return {
        rentalId: rental.id,
        finalAmount,
        hasFine,
      };
    } catch (error) {
      if (closed) {
        await this.rentalRepository.reopen(rental.id);
      }

      throw error;
    }
  }

  private calculateFinalAmount(
    expectedEndDate: string,
    returnDate: string,
    dailyRate: number,
  ) {
    const expected = new Date(expectedEndDate).getTime();
    const actual = new Date(returnDate).getTime();

    if (!Number.isFinite(expected) || !Number.isFinite(actual)) {
      throw new Error("Datas invalidas para fechamento.");
    }

    if (actual <= expected) {
      return { finalAmount: dailyRate, hasFine: false };
    }

    const dayMs = 24 * 60 * 60 * 1000;
    const lateDays = Math.ceil((actual - expected) / dayMs);
    const finePerDay = dailyRate * 0.5;
    const fine = lateDays * finePerDay;

    return {
      finalAmount: dailyRate + fine,
      hasFine: true,
    };
  }
}
```

---

## 4) Infrastructure (implementacao)

```ts
// modules/rental/infrastructure/repositories/rental-repository-api.ts
export class RentalRepositoryApi implements RentalRepository {
  async getById(id: string) {
    const response = await RentalApi.getById(id);
    return response.data[0];
  }

  async close(id: string) {
    await RentalApi.updateStatus(id, "CLOSED");
  }

  async reopen(id: string) {
    await RentalApi.updateStatus(id, "OPEN");
  }
}
```

```ts
// modules/payment/infrastructure/repositories/payment-repository-api.ts
export class PaymentRepositoryApi implements PaymentRepository {
  async create(input: {
    rentalId: string;
    customerId: string;
    amount: number;
    method: "PIX" | "CARD";
    type: "FINAL" | "FINE";
  }) {
    const response = await PaymentApi.create(input);
    return response.data[0];
  }
}
```

---

## 5) Presentation (hook de fechamento)

```ts
// modules/rental/presentation/hooks/use-close-rental.ts
import { useState } from "react";

export function useCloseRental() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const closeRental = async (input: {
    rentalId: string;
    returnDate: string;
    paymentMethod: "PIX" | "CARD";
  }) => {
    setLoading(true);
    setError(null);

    try {
      const rentalRepository = new RentalRepositoryApi();
      const vehicleRepository = new VehicleRepositoryApi();
      const paymentRepository = new PaymentRepositoryApi();

      const useCase = new CloseRental(
        rentalRepository,
        vehicleRepository,
        paymentRepository,
      );

      return await useCase.execute(input);
    } catch {
      setError("Nao foi possivel fechar a locacao.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { closeRental, loading, error };
}
```

---

## 6) Mensagens amigaveis para usuario

```ts
function mapCloseRentalError(error: unknown): string {
  if (typeof error === "object" && error && "message" in error) {
    const message = String((error as { message: unknown }).message);

    if (message.includes("nao esta aberta")) {
      return "Essa locacao ja foi finalizada.";
    }

    if (message.includes("Datas invalidas")) {
      return "A data de devolucao informada e invalida.";
    }
  }

  return "Nao foi possivel finalizar agora. Tente novamente.";
}
```

---

## 7) Checklist deste fluxo

- Contratos no Domain estao claros.
- Use case centraliza regra de fechamento.
- Infrastructure apenas integra com API.
- Hook da tela somente chama use case.
- Existe estrategia de compensacao em falha.
- Mensagens para usuario sao compreensiveis.

---

## 8) Quando usar esse modelo

Use esse padrao quando a operacao:

- altera varias entidades na mesma acao.
- exige ordem de execucao.
- precisa de desfazer parcial em caso de erro.
- envolve regra de negocio com calculo.

Esse e um modelo seguro para projeto grande e para automacao por IA.
