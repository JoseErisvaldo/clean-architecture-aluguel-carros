### Estrutura escalável (feature-based + clean)

---A estrutura do projeto é organizada de forma a promover a escalabilidade e a manutenção, seguindo os princípios da arquitetura limpa e baseada em features. A organização é dividida em três camadas principais: `app`, `modules` e `shared`.

```

src/
app/
router/
index.tsx
providers/
index.tsx

modules/
customers/
domain/
entities/
customer.ts
repositories/
customerRepository.ts

      application/
        use-cases/
          getCustomers.ts

      infrastructure/
        repositories/
          customerRepositoryMock.ts

      presentation/
        pages/
          customersPage.tsx
        components/
          customerCard.tsx
        hooks/
          useCustomers.ts

shared/
components/
hooks/
utils/
types/

🧠 Fluxo (importante)
Page → Hook → UseCase → Repository (interface) → Repository (implementação)
```
