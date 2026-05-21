# Plano de Implementação — LisoControl

Objetivo: tornar todas as telas funcionais, eliminar dados mockados e conectar o app a uma camada de dados real (localStorage + stores reativos).

---

## Decisões Arquiteturais

| Decisão | Escolha | Justificativa |
|---------|---------|---------------|
| **State management** | Zustand | Leve, sem boilerplate, fácil de persistir |
| **Persistência** | localStorage via `zustand/middleware` | Sem backend, funciona offline, adequado para MVP |
| **Formulários** | React Hook Form + Zod | Validação tipada, sem re-render desnecessário |
| **Datas** | date-fns | Leve, tree-shakeable, suporte a pt-BR |
| **Auth** | Zustand (simples, sem JWT) | Sem backend — simular sessão via localStorage |
| **Backend futuro** | Supabase (planejado, não implementado aqui) | Camada de store já isolada para migração fácil |

---

## Dependências a Instalar

```bash
npm install zustand react-hook-form zod @hookform/resolvers date-fns
```

| Pacote | Versão esperada | Uso |
|--------|----------------|-----|
| `zustand` | ^5.x | Stores globais |
| `react-hook-form` | ^7.x | Formulários |
| `zod` | ^3.x | Schemas de validação |
| `@hookform/resolvers` | ^3.x | Integração RHF + Zod |
| `date-fns` | ^4.x | Formatação e cálculo de datas |

---

## Estrutura de Arquivos Nova

```
src/
├── types/
│   └── index.ts                  ← Todas as interfaces TypeScript
│
├── stores/
│   ├── useAuthStore.ts           ← Auth (usuário logado)
│   ├── useTransacoesStore.ts     ← Transações (CRUD)
│   ├── useCategoriasStore.ts     ← Categorias (CRUD)
│   ├── useCartoesStore.ts        ← Cartões de crédito (CRUD)
│   ├── useLimitesStore.ts        ← Limites de orçamento (CRUD)
│   ├── useOcorrenciasStore.ts    ← Recorrências fixas (CRUD)
│   ├── useParcelamentosStore.ts  ← Parcelamentos (CRUD)
│   └── useConfigStore.ts         ← Preferências do usuário
│
├── lib/
│   ├── formatters.ts             ← Formatação BRL, datas pt-BR
│   ├── calculators.ts            ← Saldo, totais, percentuais
│   └── schemas.ts                ← Schemas Zod reutilizáveis
│
├── hooks/
│   ├── useDashboardData.ts       ← Dados calculados para o Dashboard
│   └── useCalendarioData.ts      ← Mapa de intensidade mensal
│
└── components/
    ├── ProtectedRoute.tsx        ← Guard de rota autenticada
    ├── EmptyState.tsx            ← Componente de lista vazia
    ├── ConfirmDialog.tsx         ← Modal de confirmação de exclusão
    └── CurrencyInput.tsx         ← Input formatado em BRL
```

---

## Fase 1 — Fundação de Tipos e Stores

**Objetivo:** criar toda a camada de dados antes de tocar nas telas.

### 1.1 — `src/types/index.ts`

Definir interfaces para todas as entidades:

```typescript
export type TipoTransacao = 'despesa' | 'receita';
export type MeioPagamento = 'cartao' | 'dinheiro' | 'digital';

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  senha: string; // hash simples (sem backend real)
  avatarUrl?: string;
  moeda: string;
  saldoInicial: number;
  darkMode: boolean;
  criadoEm: string; // ISO date
}

export interface Categoria {
  id: string;
  nome: string;
  icone: string;           // nome do Material Symbol
  cor: string;             // classe Tailwind bg ou hex
  limite?: number;         // limite mensal (opcional)
  criadoEm: string;
}

export interface Transacao {
  id: string;
  tipo: TipoTransacao;
  valor: number;
  descricao: string;
  categoriaId: string;
  data: string;            // ISO date
  meioPagamento: MeioPagamento;
  cartaoId?: string;       // se pago no cartão
  parcelamentoId?: string; // se é parcela de parcelamento
  ocorrenciaId?: string;   // se é instância de recorrência fixa
  criadoEm: string;
}

export interface Cartao {
  id: string;
  apelido: string;         // ex: "Midnight"
  ultimos4: string;
  bandeira: string;        // "visa" | "mastercard" | "elo"
  limite: number;
  diaFechamento: number;   // 1-31
  diaVencimento: number;   // 1-31
  cor: string;             // gradiente/classe CSS
  principal: boolean;
  criadoEm: string;
}

export interface LimiteCategoria {
  id: string;
  categoriaId: string;
  valorLimite: number;
  mes: number;             // 1-12
  ano: number;
  criadoEm: string;
}

export interface OcorrenciaFixa {
  id: string;
  descricao: string;
  valor: number;
  categoriaId: string;
  diaCobranca: number;     // 1-31
  debitoAutomatico: boolean;
  ativa: boolean;
  criadoEm: string;
}

export interface Parcelamento {
  id: string;
  descricao: string;
  valorTotal: number;
  totalParcelas: number;
  parcelaspagas: number;
  valorParcela: number;    // valorTotal / totalParcelas
  categoriaId: string;
  cartaoId?: string;
  dataInicio: string;
  criadoEm: string;
}
```

---

### 1.2 — Stores Zustand com Persistência

Cada store segue o mesmo padrão:

```typescript
// Padrão de store com persist
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface TransacoesState {
  transacoes: Transacao[];
  adicionar: (t: Omit<Transacao, 'id' | 'criadoEm'>) => void;
  editar: (id: string, dados: Partial<Transacao>) => void;
  remover: (id: string) => void;
}

export const useTransacoesStore = create<TransacoesState>()(
  persist(
    (set) => ({
      transacoes: [],
      adicionar: (dados) => set((s) => ({
        transacoes: [...s.transacoes, {
          ...dados,
          id: crypto.randomUUID(),
          criadoEm: new Date().toISOString(),
        }],
      })),
      editar: (id, dados) => set((s) => ({
        transacoes: s.transacoes.map((t) => t.id === id ? { ...t, ...dados } : t),
      })),
      remover: (id) => set((s) => ({
        transacoes: s.transacoes.filter((t) => t.id !== id),
      })),
    }),
    { name: 'lisocontrol-transacoes' }
  )
);
```

**Criar store para cada entidade:**
- [ ] `useAuthStore.ts` — usuario atual, login(), logout(), cadastrar()
- [ ] `useTransacoesStore.ts`
- [ ] `useCategoriasStore.ts` — com categorias padrão pré-carregadas
- [ ] `useCartoesStore.ts`
- [ ] `useLimitesStore.ts`
- [ ] `useOcorrenciasStore.ts`
- [ ] `useParcelamentosStore.ts`
- [ ] `useConfigStore.ts` — darkMode, saldoInicial, moeda

---

### 1.3 — `src/lib/formatters.ts`

```typescript
// Formatar valor monetário BRL
export function formatBRL(valor: number): string {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Formatar data em pt-BR
export function formatData(iso: string): string {
  return new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
}

// Formatar data relativa (Hoje, Ontem, ...)
export function formatDataRelativa(iso: string): string { ... }
```

---

### 1.4 — `src/lib/calculators.ts`

```typescript
// Saldo total: saldoInicial + receitas - despesas
export function calcularSaldo(transacoes, saldoInicial): number

// Totais do mês (ano/mes como parâmetros)
export function calcularTotaisMes(transacoes, ano, mes): { receitas, despesas, saldo }

// Gastos por categoria no mês
export function calcularPorCategoria(transacoes, categorias, ano, mes): Array<{categoria, total}>

// Percentual de limite usado
export function calcularPercentualLimite(gasto, limite): number

// Mapa de intensidade para calendário (dia → { receitas, despesas })
export function calcularMapaCalendario(transacoes, ano, mes): Record<number, { receitas, despesas }>
```

---

### 1.5 — `src/components/ProtectedRoute.tsx`

```typescript
export function ProtectedRoute({ children }) {
  const usuario = useAuthStore((s) => s.usuario);
  if (!usuario) return <Navigate to="/login" replace />;
  return children;
}
```

Atualizar `App.tsx` para envolver todas as rotas autenticadas.

---

## Fase 2 — Autenticação

**Arquivo:** `src/stores/useAuthStore.ts`

**Funcionalidades:**
- `cadastrar(nome, email, senha)` — cria usuário, salva no localStorage
- `login(email, senha)` — valida contra usuários cadastrados
- `logout()` — limpa sessão
- `atualizarPerfil(dados)` — edita nome, avatar, preferências

**Páginas a tornar funcionais:**

### Login.tsx
- [ ] Conectar form ao `useAuthStore`
- [ ] Adicionar validação Zod: email válido, senha ≥ 6 chars
- [ ] Exibir erro se credenciais inválidas
- [ ] Redirecionar para `/dashboard` após login
- [ ] Botões Google/GitHub: manter visuais, adicionar `disabled` com tooltip "Em breve"

### Cadastro.tsx
- [ ] Validação Zod: nome obrigatório, email, senha + confirmação igual
- [ ] Chamar `useAuthStore.cadastrar()`
- [ ] Redirecionar para `/dashboard` após registro
- [ ] Detectar email já cadastrado

---

## Fase 3 — Categorias (base para tudo)

**Por que primeiro:** Categorias são referenciadas por Transações, Limites, Ocorrências e Parcelamentos.

### `src/stores/useCategoriasStore.ts`

Categorias padrão pré-carregadas na primeira inicialização:
```typescript
const CATEGORIAS_PADRAO = [
  { nome: 'Alimentação', icone: 'lunch_dining', cor: 'bg-orange-500' },
  { nome: 'Transporte', icone: 'directions_car', cor: 'bg-blue-500' },
  { nome: 'Educação', icone: 'school', cor: 'bg-purple-500' },
  { nome: 'Lazer', icone: 'movie', cor: 'bg-pink-500' },
  { nome: 'Moradia', icone: 'home', cor: 'bg-yellow-600' },
  { nome: 'Saúde', icone: 'favorite', cor: 'bg-red-500' },
  { nome: 'Renda', icone: 'account_balance_wallet', cor: 'bg-green-600' },
];
```

### Categorias.tsx
- [ ] Listar categorias do store (substituir hardcoded)
- [ ] Calcular total gasto por categoria no mês atual
- [ ] Calcular contagem de transações por categoria
- [ ] Botão "Adicionar Categoria" → modal inline (nome, ícone, cor)
- [ ] Botão editar → preencher modal com dados atuais
- [ ] Botão excluir → `ConfirmDialog` antes de remover
- [ ] Stats: "Total Alocado" = soma dos limites; "Mais Usada" = categoria com maior gasto
- [ ] Estado vazio: quando não há categorias

---

## Fase 4 — Transações

### `src/stores/useTransacoesStore.ts`

### NovaTransacao.tsx
- [ ] Formulário controlado via `react-hook-form` + Zod
- [ ] Toggle Despesa/Receita → altera `tipo` no form
- [ ] Input de valor: formatar como BRL enquanto digita (`CurrencyInput`)
- [ ] Select de categoria: popular do `useCategoriasStore`
- [ ] Data: default = hoje
- [ ] Meio de pagamento: estado local com toggle visual
- [ ] Toggle parcelamento: se ativo, exibir campos `n° parcelas` + `total`
- [ ] Ao salvar: chamar `useTransacoesStore.adicionar()` + navegar para `/transacoes`
- [ ] Botão Cancelar: `navigate(-1)`
- [ ] Validação: valor > 0, descrição obrigatória, categoria obrigatória

### Transacoes.tsx
- [ ] Listar transações do store (substituir hardcoded)
- [ ] Agrupar por data usando `date-fns` (`groupBy` ou `reduce`)
- [ ] Busca: filtrar por descrição
- [ ] Filtro "Este Mês": filtrar por `data` no mês atual
- [ ] Filtro "Categorias": multi-select das categorias existentes
- [ ] Filtro "Tipo": despesa | receita | todos
- [ ] Hover → botão editar (navega para `/nova-transacao?id=xxx`)
- [ ] Hover → botão excluir com `ConfirmDialog`
- [ ] Card de insights: total do mês, variação vs mês anterior
- [ ] Estado vazio: sem transações no período

---

## Fase 5 — Dashboard

### `src/hooks/useDashboardData.ts`

Hook que agrega dados de todos os stores:

```typescript
export function useDashboardData() {
  const transacoes = useTransacoesStore((s) => s.transacoes);
  const categorias = useCategoriasStore((s) => s.categorias);
  const config = useConfigStore((s) => s);

  const hoje = new Date();
  const totaisMes = calcularTotaisMes(transacoes, hoje.getFullYear(), hoje.getMonth() + 1);
  const saldo = calcularSaldo(transacoes, config.saldoInicial);
  const porCategoria = calcularPorCategoria(transacoes, categorias, hoje.getFullYear(), hoje.getMonth() + 1);
  const recentes = transacoes.slice(-3).reverse(); // últimas 3

  return { saldo, totaisMes, porCategoria, recentes };
}
```

### Dashboard.tsx
- [ ] Saldo total: `formatBRL(saldo)` real do hook
- [ ] Percentual de variação vs mês anterior (calculado)
- [ ] Entradas/Saídas do mês: calculados
- [ ] Barra de saúde financeira: larguras dinâmicas
- [ ] Top Categorias: top 3 por gasto no mês
- [ ] Donut: percentual do maior gasto sobre o limite
- [ ] Histórico Recente: 3 últimas transações reais
- [ ] Estado vazio: quando não há transações

---

## Fase 6 — Calendário

### `src/hooks/useCalendarioData.ts`

```typescript
export function useCalendarioData(ano: number, mes: number) {
  const transacoes = useTransacoesStore((s) => s.transacoes);
  const mapa = calcularMapaCalendario(transacoes, ano, mes);
  return mapa; // { 1: { receitas: 0, despesas: 450.00 }, 12: {...}, ... }
}
```

### Calendario.tsx
- [ ] Navegação de mês: estado `{ ano, mes }` controlado
- [ ] Grid de dias: renderizar com base nos dias do mês (date-fns `getDaysInMonth`)
- [ ] Cor dos pontos: receita = verde, despesa = vermelho, ambos = amber
- [ ] Intensidade: transparência proporcional ao valor gasto
- [ ] Dia selecionado: estado local, default = hoje
- [ ] Sidebar: entradas/saídas do dia selecionado (calculados)
- [ ] Lista de transações do dia selecionado
- [ ] Estado vazio: sem transações no dia

---

## Fase 7 — Limites de Gastos

### `src/stores/useLimitesStore.ts`

- Limite por categoria + mês/ano
- Um limite por categoria por mês

### LimitesDeGastos.tsx
- [ ] Listar categorias com seus limites do mês atual
- [ ] Gasto real: calculado do `useTransacoesStore` por categoria
- [ ] Percentual e cor dinâmicos (verde/amarelo/vermelho)
- [ ] Input editável por categoria: `react-hook-form`
- [ ] Botão "Salvar Alterações": chamar `useLimitesStore.salvar()`
- [ ] Teto mensal geral: soma de todos os limites
- [ ] Estado vazio: nenhuma categoria com limite

---

## Fase 8 — Ocorrências Fixas

### `src/stores/useOcorrenciasStore.ts`

### OcorrenciasFixas.tsx
- [ ] Listar recorrências do store
- [ ] Total mensal fixo: soma das ativas
- [ ] Formulário "Adicionar": campos descrição, valor, categoria, dia, toggle débito automático
- [ ] Validação Zod
- [ ] Toggle ativa/inativa inline
- [ ] Botão excluir com `ConfirmDialog`
- [ ] Saldo disponível: `saldo - totalFixo` (calculado)

---

## Fase 9 — Parcelamentos

### `src/stores/useParcelamentosStore.ts`

- Ao criar parcelamento, gerar automaticamente as N transações correspondentes no `useTransacoesStore`

### Parcelamentos.tsx
- [ ] Listar parcelamentos do store
- [ ] Parcelas pagas: calculado a partir das transações geradas
- [ ] Progresso: `(parcelasPagas / totalParcelas) * 100`
- [ ] Botão "Adicionar": modal com descrição, valor total, n° parcelas, categoria, cartão, data início
- [ ] Sidebar de detalhes: clicar num card exibe detalhes no painel direito
- [ ] Total restante: soma dos valores restantes de todos ativos
- [ ] Parcela mensal: soma das parcelas com vencimento no mês atual

---

## Fase 10 — Cartões de Crédito

### `src/stores/useCartoesStore.ts`

### CartoesDeCredito.tsx
- [ ] Listar cartões do store (substituir hardcoded)
- [ ] Placeholder "+ Adicionar Cartão" → modal com campos apelido, últimos 4 dígitos, bandeira, limite, datas
- [ ] Total limite disponível: soma dos limites
- [ ] Percentual utilizado: (total gasto via cartão no ciclo) / (soma dos limites)
- [ ] Link "Ver Fatura" → `/fatura?cartaoId=xxx`

### DetalhesDaFatura.tsx
- [ ] Receber `cartaoId` via query param
- [ ] Calcular fatura: transações com `cartaoId` no ciclo atual (fechamento → vencimento)
- [ ] Histórico: agrupar por ciclos anteriores (últimos 3)
- [ ] Botão "Pagar Agora": marcar fatura como paga (campo no store do cartão)

---

## Fase 11 — Relatórios

### Relatorios.tsx
- [ ] Selector de mês: estado controlado
- [ ] Patrimônio Total: saldo atual calculado
- [ ] Variação mensal: comparar com mês anterior
- [ ] Gráfico de barras (fluxo semanal): agrupar transações por semana do mês
- [ ] Gráfico donut (distribuição): top categorias do mês
- [ ] Gráfico comparativo Receitas × Despesas: últimos 4 meses
- [ ] Tabela de transações: filtrada pelo mês selecionado
- [ ] Download PDF: `window.print()` com CSS `@media print` (solução simples)

---

## Fase 12 — Configurações

### Configuracoes.tsx
- [ ] Exibir nome/email do usuário logado (`useAuthStore`)
- [ ] Editar Perfil: form inline (nome, email)
- [ ] Saldo Inicial: input editável → salvar no `useConfigStore`
- [ ] Moeda: selector (apenas BRL por ora)
- [ ] Dark Mode: toggle → aplicar classe `dark` no `document.documentElement`
- [ ] Exportar Dados CSV: serializar stores para CSV e fazer download
- [ ] Logout: `useAuthStore.logout()` + `navigate('/')`

---

## Fase 13 — Componentes de Suporte

### `src/components/ProtectedRoute.tsx`
- Redireciona para `/login` se não autenticado

### `src/components/EmptyState.tsx`
```typescript
interface EmptyStateProps {
  icone: string;
  titulo: string;
  descricao: string;
  acaoPrimaria?: { label: string; onClick: () => void };
}
```

### `src/components/ConfirmDialog.tsx`
- Modal de confirmação antes de excluir
- Props: `mensagem`, `onConfirmar`, `onCancelar`

### `src/components/CurrencyInput.tsx`
- Input que formata valor em BRL enquanto o usuário digita
- Armazena como `number` no form

---

## Atualização de App.tsx

```typescript
// Envolver todas as rotas autenticadas com ProtectedRoute
<Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
// ... demais rotas autenticadas

// Rota de fatura com parâmetro
<Route path="/fatura/:cartaoId" element={<ProtectedRoute><DetalhesDaFatura /></ProtectedRoute>} />
```

---

## Checklist de Execução

### Fase 1 — Fundação
- [ ] Instalar dependências (`zustand`, `react-hook-form`, `zod`, `@hookform/resolvers`, `date-fns`)
- [ ] Criar `src/types/index.ts`
- [ ] Criar todos os stores (`useAuthStore`, `useTransacoesStore`, `useCategoriasStore`, `useCartoesStore`, `useLimitesStore`, `useOcorrenciasStore`, `useParcelamentosStore`, `useConfigStore`)
- [ ] Criar `src/lib/formatters.ts`
- [ ] Criar `src/lib/calculators.ts`
- [ ] Criar `src/lib/schemas.ts` (schemas Zod)
- [ ] Criar `src/components/ProtectedRoute.tsx`
- [ ] Criar `src/components/EmptyState.tsx`
- [ ] Criar `src/components/ConfirmDialog.tsx`
- [ ] Criar `src/components/CurrencyInput.tsx`
- [ ] Atualizar `App.tsx` com rotas protegidas

### Fase 2 — Auth
- [ ] `Login.tsx` funcional
- [ ] `Cadastro.tsx` funcional

### Fase 3 — Categorias
- [ ] Store de categorias com defaults
- [ ] `Categorias.tsx` funcional (CRUD)

### Fase 4 — Transações
- [ ] `NovaTransacao.tsx` funcional (criar + editar via query param)
- [ ] `Transacoes.tsx` funcional (lista, busca, filtros, excluir)

### Fase 5 — Dashboard
- [ ] `useDashboardData.ts`
- [ ] `Dashboard.tsx` com dados reais

### Fase 6 — Calendário
- [ ] `useCalendarioData.ts`
- [ ] `Calendario.tsx` funcional

### Fase 7 — Limites
- [ ] `LimitesDeGastos.tsx` funcional

### Fase 8 — Ocorrências Fixas
- [ ] `OcorrenciasFixas.tsx` funcional

### Fase 9 — Parcelamentos
- [ ] `Parcelamentos.tsx` funcional

### Fase 10 — Cartões
- [ ] `CartoesDeCredito.tsx` funcional
- [ ] `DetalhesDaFatura.tsx` funcional

### Fase 11 — Relatórios
- [ ] `Relatorios.tsx` funcional

### Fase 12 — Configurações
- [ ] `Configuracoes.tsx` funcional

---

## Ordem de Dependências

```
Fase 1 (tipos + stores + lib)
    ↓
Fase 2 (auth) → Fase 3 (categorias)
                       ↓
               Fase 4 (transações)
                       ↓
    ┌──────────────────┼──────────────────┐
    ↓                  ↓                  ↓
Fase 5 (dashboard)  Fase 6 (calendário)  Fase 7 (limites)
                                          ↓
                                   Fase 8 (ocorrências)
                                   Fase 9 (parcelamentos)
                                   Fase 10 (cartões)
                                          ↓
                                   Fase 11 (relatórios)
                                   Fase 12 (configurações)
```

---

## Notas para Migração Futura (Supabase)

Quando o backend for conectado, a troca será cirúrgica:
- Substituir as funções `adicionar/editar/remover` de cada store por chamadas `supabase.from(...).insert/update/delete`
- Adicionar `loading` e `error` em cada store
- Trocar `persist` por sincronização com `supabase.auth`
- A camada de cálculo (`calculators.ts`) e os hooks derivados (`useDashboardData`) não mudam
