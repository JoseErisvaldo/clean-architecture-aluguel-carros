type ApiErrorResponse = {
  status?: number;
  response?: {
    status?: number;
  };
};

type HandleApiErrorReturn = {
  status?: number;
  message: string;
};

export function handleApiError(err: unknown): HandleApiErrorReturn {
  console.error("API Error:", err);

  const error = err as ApiErrorResponse;

  const status = error?.status ?? error?.response?.status;

  const messages: Record<number, string> = {
    400: "Dados inválidos. Verifique os campos preenchidos.",
    404: "Dados não encontrados.",
    409: "Já existe um registro com esses dados.",
    500: "Erro interno do servidor. Tente novamente mais tarde.",
  };

  return {
    status,
    message: status
      ? (messages[status] ?? "Ocorreu um erro inesperado.")
      : "Ocorreu um erro inesperado.",
  };
}
