export function handleApiError(err: any) {
  const status = err?.status || err?.response?.status;

  const messages: Record<number, string> = {
    400: "Dados inválidos. Verifique os campos preenchidos.",
    401: "Você não tem permissão para essa ação.",
    404: "Recurso não encontrado.",
    409: "Já existe um registro com esses dados.",
    500: "Erro interno do servidor. Tente novamente mais tarde.",
  };

  return {
    status,
    message: messages[status] ?? "Ocorreu um erro inesperado.",
  };
}
