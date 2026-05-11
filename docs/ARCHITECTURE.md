# Guia de Arquitetura do Projeto

Este documento explica, de forma simples e prática, como o projeto é organizado, onde cada tipo de código deve ficar e como implementar novas funcionalidades sem bagunçar a base.

Objetivo:
- Escalar o projeto com segurança.
- Facilitar manutenção.
- Ajudar onboarding de pessoas novas.
- Servir como referência para automações e agentes de IA.

---

## 1) Visão geral em linguagem simples

Pense no sistema como uma empresa com setores:

- Presentation: telas, componentes visuais e interação com usuário.
- Application: regras de fluxo da funcionalidade (o que precisa acontecer, em ordem).
- Domain: coração da regra de negócio (entidades e contratos).
- Infrastructure: integração com mundo externo (API, armazenamento, etc).

Regra principal:
A tela não conversa direto com API.

Fluxo padrão:

Page -> Hook -> UseCase -> Repository (interface do Domain) -> Repository (implementação na Infrastructure) -> API

Benefício:
- Trocar API ou backend fica mais fácil.
- Reaproveitar lógica em outras telas é natural.
- Testar e evoluir fica previsível.

---

## 2) Estrutura de pastas e responsabilidades

## app

Responsabilidade:
- Configuração global da aplicação.
- Router.
- Providers.

Exemplos:
- app/router: define rotas públicas e privadas.
- app/providers: injeta contextos globais.

## modules

Responsabilidade:
- Cada pasta representa uma feature de negócio.
- Cada feature contém Domain, Application, Infrastructure e Presentation.

Exemplos:
- modules/customer
- modules/login

## shared

Responsabilidade:
- Código transversal usado por várias features.
- Não deve depender de uma feature específica.

Exemplos:
- shared/auth: provider, hooks, rotas guardadas, layout privado, storage de autenticação.

## infrastructure

Responsabilidade:
- Clientes HTTP e configuração técnica comum.

Exemplos:
- infrastructure/api/api-config.ts
- infrastructure/api/http.ts
- infrastructure/api/auth-http.ts

---

## 3) Como decidir onde colocar cada coisa

Use esta regra rápida:

- Se é visual e UI: Presentation.
- Se orquestra um caso de uso: Application.
- Se define contrato, entidade e regra central: Domain.
- Se chama API, localStorage ou libs externas: Infrastructure.
- Se é compartilhado entre múltiplas features: Shared.

Exemplo:
- Botão de sair que pode aparecer em várias telas: shared/auth/presentation/components.
- Endpoint de clientes: modules/customer/infrastructure/endpoints.
- Entidade Customer: modules/customer/domain/entities.

---

## 4) Comunicação entre camadas (contratos)

Para evitar acoplamento, usamos contratos no Domain.

Exemplo de ideia:
- Domain define uma interface CustomerRepository.
- Application usa essa interface.
- Infrastructure implementa essa interface com API real.

Assim, a regra de negócio não depende de tecnologia específica.

---

## 5) Passo a passo para criar uma nova feature

Exemplo: feature Vehicle.

1. Criar estrutura base:
- modules/vehicle/domain/entities
- modules/vehicle/domain/repositories
- modules/vehicle/application/use-cases
- modules/vehicle/infrastructure/endpoints
- modules/vehicle/infrastructure/repositories
- modules/vehicle/presentation/pages
- modules/vehicle/presentation/components
- modules/vehicle/presentation/hooks

2. Domain:
- Criar entidade Vehicle.
- Criar interface VehicleRepository com métodos necessários.

3. Application:
- Criar use cases com nomes claros:
  - get-vehicles.ts
  - create-vehicle.ts
  - update-vehicle.ts
  - delete-vehicle.ts

4. Infrastructure:
- Criar endpoint com chamadas HTTP.
- Criar repository que implementa VehicleRepository.

5. Presentation:
- Criar hooks que instanciam repository e use cases.
- Criar páginas e componentes.

6. Router:
- Adicionar rotas no app/router.
- Se rota for privada, encapsular no fluxo privado.

7. Revisar responsabilidades:
- Garantir que página não chama API diretamente.
- Garantir que regra de negócio não está no componente visual.

---

## 6) Exemplo de CRUD completo (modelo)

### C - Create

Objetivo: cadastrar item.

- Domain: define método create no Repository.
- Application: CreateItem use case valida e chama repository.
- Infrastructure: repository chama endpoint POST.
- Presentation: formulário chama hook, hook chama use case.

### R - Read

Objetivo: listar e detalhar.

- Domain: getAll e getById.
- Application: GetItems e GetItemById.
- Infrastructure: GET list e GET detalhe.
- Presentation: página de listagem e página de detalhe.

### U - Update

Objetivo: editar item.

- Domain: update.
- Application: UpdateItem.
- Infrastructure: PUT/PATCH.
- Presentation: formulário de edição.

### D - Delete

Objetivo: remover item.

- Domain: delete.
- Application: DeleteItem.
- Infrastructure: DELETE.
- Presentation: ação de excluir com feedback para usuário.

---

## 7) Exemplo de lógica de negócio (não CRUD)

Nem toda feature é CRUD.

Exemplo: cálculo de disponibilidade de veículo.

Onde fica:
- Se for regra de negócio central: Domain ou Application (dependendo do nível de abstração).
- Se precisar de dados externos: Application orquestra, Infrastructure fornece dados.

Nunca colocar regra complexa diretamente no componente visual.

---

## 8) Padrões de nome e organização

Sugestões:
- Use cases em formato verbo + entidade:
  - get-customer
  - post-login
  - update-vehicle
- Repositories:
  - contrato em domain/repositories
  - implementação em infrastructure/repositories
- Endpoints:
  - infrastructure/endpoints com funções simples por recurso

Mantendo consistência, o projeto fica previsível para humanos e IA.

---

## 9) Regras de ouro para projeto grande

1. Uma responsabilidade por arquivo.
2. Evitar lógica de negócio em componentes visuais.
3. Evitar acoplamento direto com API fora da Infrastructure.
4. Reutilizável vai para Shared, específico fica na feature.
5. Nome claro e sem abreviação ambígua.
6. Antes de criar novo utilitário global, validar se ele realmente será compartilhado.
7. Toda nova feature deve seguir o mesmo fluxo de camadas.

---

## 10) Checklist de Pull Request

Antes de abrir PR, valide:

- Estrutura da feature segue padrão de camadas.
- Router atualizado corretamente.
- Arquivos compartilhados realmente são compartilhados.
- Fluxo da tela está: Page -> Hook -> UseCase -> Repository.
- Nomes dos arquivos são claros.
- README e este guia continuam atualizados.

---

## 11) Convenção para IA e automação

Para manter qualidade em tarefas automáticas:

- Sempre preservar o fluxo em camadas.
- Nunca pular contrato de repository no Domain.
- Em mudanças grandes, separar commits por tipo:
  - feat: autenticação
  - feat: layout
  - fix: correção pontual
  - docs: documentação
- Quando mover arquivos, atualizar imports na mesma entrega.

---

## 12) Resumo final

Se ficar em dúvida, use esta pergunta:

"Esse código representa regra de negócio, visual da tela, contrato ou integração externa?"

A resposta aponta a pasta correta.

Com esse padrão, o projeto cresce com menos retrabalho, onboarding mais rápido e evolução segura.

---

## 13) Pasta de exemplos praticos

Existe uma pasta dedicada para exemplos de codigo no padrao do projeto:

- examples/PRACTICAL_EXAMPLES.md

Use esse arquivo quando precisar:

- Ver um exemplo completo de fluxo por camadas.
- Implementar CRUD seguindo o padrao.
- Entender onde colocar regras de negocio.
- Acelerar onboarding de pessoas novas e de agentes de IA.
