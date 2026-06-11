# LisoControl — Projeto Integrador

Aplicação web de **gestão financeira pessoal** desenvolvida como Projeto Integrador do curso de **Sistemas de Informação**. Focada no perfil do estudante universitário: controle de gastos, parcelamentos, cartões de crédito e orçamento mensal.

---

## Funcionalidades

- **Dashboard** — saldo total, entradas/saídas do mês, top categorias e saúde financeira
- **Transações** — CRUD completo com busca, filtros por tipo, categoria e mês
- **Categorias** — gerenciamento com ícones e paletas de cores customizáveis
- **Cartões de crédito** — múltiplos cartões, controle de fatura por ciclo e histórico
- **Parcelamentos** — criação com geração automática de transações mensais
- **Ocorrências fixas** — despesas recorrentes mensais (aluguel, assinaturas, etc.)
- **Limites de gastos** — orçamento por categoria com barra de progresso visual
- **Calendário** — visualização mensal e semanal de transações por dia
- **Relatórios** — fluxo semanal, distribuição por categoria e comparativo de meses
- **Configurações** — perfil, saldo inicial, dark mode e exportação CSV

---

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Framework | React 19 + TypeScript |
| Build | Vite 7 |
| Estilização | Tailwind CSS v4 |
| Estado | Zustand 5 |
| Backend / Auth | Supabase (PostgreSQL + Auth) |
| Formulários | React Hook Form + Zod |
| Datas | date-fns |
| Animações | GSAP + ScrollTrigger |

---

## Estrutura do projeto

```
src/
├── pages/          # Telas da aplicação (15 páginas)
├── components/     # Componentes reutilizáveis (NavBar, ProtectedRoute, etc.)
├── stores/         # Estado global com Zustand (8 stores)
├── lib/
│   ├── supabase.ts     # Cliente Supabase
│   ├── calculators.ts  # Cálculos financeiros
│   ├── formatters.ts   # Formatação BRL e datas pt-BR
│   └── schemas.ts      # Schemas de validação Zod
├── hooks/          # Hooks derivados (useCalendarioData)
└── types/          # Interfaces TypeScript
```

---

## Banco de dados (Supabase)

Todas as tabelas possuem **Row Level Security** — cada usuário acessa somente seus próprios dados.

| Tabela | Descrição |
|--------|-----------|
| `categorias` | Categorias de despesa/receita |
| `transacoes` | Movimentações financeiras |
| `cartoes` | Cartões de crédito |
| `parcelamentos` | Compras parceladas |
| `ocorrencias_fixas` | Despesas mensais recorrentes |
| `limites_categorias` | Orçamento por categoria/mês |
| `user_config` | Preferências do usuário |

---

## Como executar localmente

1. Clone o repositório:
   ```bash
   git clone <url-do-repositorio>
   cd gerenciamentoGastos
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente — crie um arquivo `.env.local` na raiz:
   ```env
   VITE_SUPABASE_URL=https://<seu-projeto>.supabase.co
   VITE_SUPABASE_ANON_KEY=<sua-anon-key>
   ```

4. Execute o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

---

## Autenticação

O sistema usa **Supabase Auth** (e-mail e senha). O cadastro cria automaticamente as categorias padrão e o perfil do usuário. Todas as rotas da aplicação são protegidas — usuários não autenticados são redirecionados para `/login`.

---

## Equipe

Projeto desenvolvido para a disciplina de **Projeto Integrador** — curso de Sistemas de Informação.
