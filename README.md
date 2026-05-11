# Clean Architecture - Aluguel de Carros

Projeto React + TypeScript com organização por feature e princípios de Clean Architecture.

## Stack

- React 19
- Vite
- TypeScript
- React Router
- Axios
- MUI

## Como rodar

1. Instale dependências:

```bash
npm install
```

2. Crie o arquivo `.env` na raiz com as variáveis:

```env
VITE_SUPABASE_URL=https://SEU_PROJETO.supabase.co/rest/v1
VITE_SUPABASE_ANON_KEY=SEU_TOKEN
```

Observação: o projeto também aceita `VITE_REACT_APP_API_URL` como fallback para URL da API.

3. Execute em desenvolvimento:

```bash
npm run dev
```

## Scripts

- `npm run dev` - ambiente local
- `npm run build` - build de produção
- `npm run preview` - preview do build
- `npm run lint` - lint

## Arquitetura

Estrutura principal:

```text
src/
  app/
    providers/
    router/
  infrastructure/
    api/
  modules/
    customer/
    login/
  shared/
    auth/
```

Fluxo por feature:

```text
Page -> Hook -> UseCase -> Repository (interface) -> Repository (API)
```

## Autenticação e rotas

- Rotas públicas: `/login`
- Rotas privadas: `/`, `/Customers/:id`
- Guardas de rota:
  - `PublicRoute`: bloqueia acesso ao login quando já autenticado
  - `PrivateRoute`: redireciona para login quando não autenticado
- Layout privado com sidebar responsiva e botão de logout

## Fonte única de configuração da API

A configuração central da API fica em:

`src/infrastructure/api/api-config.ts`

Esse arquivo concentra:

- URL REST da API
- URL de autenticação
- chave da API
- headers padrão
