# LisoControl — Script References

Índice de referências do projeto para navegação rápida e contexto de desenvolvimento.

---

## Visão Geral

**Nome do App:** LisoControl  
**Versão:** 1.0.0  
**Propósito:** App de gerenciamento financeiro pessoal voltado para estudantes  
**Stack:** React 19 + TypeScript + Vite + Tailwind CSS 4 + GSAP + OGL (WebGL)  
**Estado dos dados:** Mock/hardcoded (sem backend)  
**Gestão de estado:** React hooks apenas (sem Redux/Context)

---

## Arquivos de Configuração

| Arquivo | Propósito |
|---------|-----------|
| [package.json](package.json) | Dependências e scripts |
| [vite.config.ts](vite.config.ts) | Plugins React + Tailwind CSS |
| [tsconfig.json](tsconfig.json) | Referencia `tsconfig.app.json` e `tsconfig.node.json` |
| [tsconfig.app.json](tsconfig.app.json) | Config TS da aplicação |
| [tsconfig.node.json](tsconfig.node.json) | Config TS do Node (Vite) |
| [eslint.config.js](eslint.config.js) | ESLint com TypeScript + React hooks |

---

## Entry Point & Roteamento

### [src/main.tsx](src/main.tsx)
- Ponto de entrada da aplicação
- Registra `ScrollTrigger` do GSAP globalmente
- Monta `<App />` no DOM

### [src/App.tsx](src/App.tsx)
- BrowserRouter com 15 rotas

| Rota | Componente | Tipo |
|------|-----------|------|
| `/` | `Landing` | Pública |
| `/login` | `Login` | Pública |
| `/cadastro` | `Cadastro` | Pública |
| `/dashboard` | `Dashboard` | Autenticada |
| `/transacoes` | `Transacoes` | Autenticada |
| `/nova-transacao` | `NovaTransacao` | Autenticada |
| `/categorias` | `Categorias` | Autenticada |
| `/calendario` | `Calendario` | Autenticada |
| `/ocorrencias-fixas` | `OcorrenciasFixas` | Autenticada |
| `/parcelamentos` | `Parcelamentos` | Autenticada |
| `/limites-gastos` | `LimitesDeGastos` | Autenticada |
| `/cartoes` | `CartoesDeCredito` | Autenticada |
| `/fatura` | `DetalhesDaFatura` | Autenticada |
| `/relatorios` | `Relatorios` | Autenticada |
| `/configuracoes` | `Configuracoes` | Autenticada |

---

## Páginas (`src/pages/`)

### Páginas Públicas

#### [src/pages/Landing.tsx](src/pages/Landing.tsx)
- Página de marketing/showcase do produto
- Compõe: `Header`, `Hero`, `Features`, `CreditIntelligence`, `StudentsFeatures`, `TrustSection`, `Footer`
- Sem `TopNavBar` ou `BottomNavBar`

#### [src/pages/Login.tsx](src/pages/Login.tsx)
- Formulário de login com layout split (marca esquerda / form direita)
- Usa `DarkVeil` (efeito WebGL no fundo)
- Campos: Email, Senha, checkbox "Lembrar dispositivo"
- Botões OAuth: Google, GitHub
- Navega para `/dashboard` no submit
- Link para `/cadastro`

#### [src/pages/Cadastro.tsx](src/pages/Cadastro.tsx)
- Formulário de registro de usuário
- Campos: Nome, Email, Senha, Confirmar Senha
- Usa `DarkVeil` no fundo
- Navega para `/dashboard` no submit

---

### Páginas Autenticadas

#### [src/pages/Dashboard.tsx](src/pages/Dashboard.tsx)
- Página inicial do usuário autenticado
- **Seções:**
  - Hero: Saldo total (R$ 4.280,50), botões Transferir/Detalhes
  - Resumo Mensal: Entradas/Saídas, barra de saúde financeira (65% receita, 35% despesa)
  - Top Categorias: Gráfico donut com distribuição por categoria
  - Acesso Rápido: 6 ícones de navegação rápida
  - Histórico Recente: 3 transações exemplo
- FAB de nova transação
- Usa `TopNavBar` e `BottomNavBar`

#### [src/pages/Transacoes.tsx](src/pages/Transacoes.tsx)
- Ledger/histórico de transações
- Barra de busca + filtros (Este Mês, Categorias, Tipo, Mais Filtros)
- Transações agrupadas por data (Hoje, Ontem, etc.)
- Hover nos itens revela botões editar/excluir
- Card de insights de gastos
- FAB + `BottomNavBar`

#### [src/pages/NovaTransacao.tsx](src/pages/NovaTransacao.tsx)
- Formulário para nova transação
- Toggle Despesa/Receita no topo
- Input de valor centralizado (R$)
- Campos: Nome da despesa, Categoria (dropdown), Data
- Botões de método de pagamento: Cartão, Dinheiro, Digital
- Toggle de parcelamento
- Botões Salvar/Cancelar

#### [src/pages/Categorias.tsx](src/pages/Categorias.tsx)
- Gerenciamento de categorias de gastos
- Stats: Total Alocado (R$ 3.450,00), Mais Usada (Lazer)
- Lista de categorias com ícone colorido, contagem de transações, valor gasto
- Hover revela ações de editar/excluir
- Banner de insights de IA

#### [src/pages/Calendario.tsx](src/pages/Calendario.tsx)
- Visualização de calendário mensal com heatmap de gastos
- Navegação de mês
- Grid: pontos coloridos indicam atividade de entrada/despesa por dia
- Sidebar: resumo diário com entradas/saídas e barra de saúde
- Lista de transações do dia selecionado

#### [src/pages/OcorrenciasFixas.tsx](src/pages/OcorrenciasFixas.tsx)
- Gerenciador de recorrências/despesas fixas
- Stats: Total Mensal Fixo (R$ 1.420,00), Saldo Disponível (R$ 3.842,50)
- Lista: Aluguel, Academia, Streaming, Conta de Luz
- Formulário inline: Descrição, Valor, Categoria, Dia de Cobrança, toggle Débito Automático

#### [src/pages/Parcelamentos.tsx](src/pages/Parcelamentos.tsx)
- Rastreamento de compras parceladas
- Stats: Total Restante (R$ 4.280,00), Parcela Mensal (R$ 345,50)
- Grid de compras ativas (7 colunas):
  - MacBook Pro M3 (8/12 meses, 66%)
  - Intercâmbio Berlim (2/6 meses, 33%)
  - Mesa Ergonômica (11/12 meses, 92%)
- Sidebar de detalhes (5 colunas, sticky): progresso circular, histórico de parcelas, download de comprovantes

#### [src/pages/LimitesDeGastos.tsx](src/pages/LimitesDeGastos.tsx)
- Configuração e acompanhamento de limites de orçamento
- Resumo: Teto Mensal (R$ 2.450,00), Gasto até Agora (R$ 1.892,40), 77% utilizado
- Breakdown por categoria com barras de progresso coloridas:
  - Verde: ok (< 60%)
  - Amarelo: atenção (60-90%)
  - Vermelho: excedido (> 100%)
- Inputs de limite editáveis + botão Salvar Alterações

#### [src/pages/CartoesDeCredito.tsx](src/pages/CartoesDeCredito.tsx)
- Gerenciamento de cartões de crédito
- Grid 2x: Midnight (primário), Emerald Reserve, Cloud Daily, + Adicionar Cartão
- Bento informativo: Limite total disponível (R$ 14.500), 65% utilização
- Info de segurança AES-256
- Link para fatura (`/fatura`)

#### [src/pages/DetalhesDaFatura.tsx](src/pages/DetalhesDaFatura.tsx)
- Detalhes da fatura do cartão
- Hero: R$ 2.840,50, Vencimento 12 Out, Fechamento 28 Set
- Card de saúde: 65% do limite usado
- Botão Pagar Agora
- Transações recentes (3 exemplos)
- Carrossel de histórico de faturas (3 meses)

#### [src/pages/Relatorios.tsx](src/pages/Relatorios.tsx)
- Dashboard de inteligência financeira/relatórios
- Selector de mês
- Bento grid:
  - Patrimônio Total: R$ 14.280,45, +12.4%
  - Previsão de Economia: potencial de R$ 420
- Gráficos: Fluxo Mensal (barras), Distribuição (donut), Receitas × Despesas (trimestral)
- Ledger de transações
- Botão Download PDF

#### [src/pages/Configuracoes.tsx](src/pages/Configuracoes.tsx)
- Página de configurações e preferências
- Hub de ferramentas: atalhos para Cartões, Limites, Parcelamentos, Recorrências, Relatórios
- Card de perfil: Avatar, Nome (Alex Rivera), Email, Editar Perfil
- Preferências: Moeda (R$), Saldo Inicial, Dark Mode toggle, Exportar Dados, Privacidade & Segurança
- Zona de perigo: Logout
- Versão: LisoControl v1.0.0

---

## Componentes (`src/components/`)

### Layout & Navegação

#### [src/components/Header.tsx](src/components/Header.tsx)
- Header sticky da landing page (scroll → backdrop blur via GSAP)
- Logo + "LisoControl"
- Links desktop: Recursos, Inteligência, Estudantes, Preços
- CTA: "Começar Agora" → `/login`
- Menu hamburger mobile

#### [src/components/TopNavBar.tsx](src/components/TopNavBar.tsx)
- Navbar superior fixo para telas autenticadas
- Logo "LisoControl"
- Direita: ícone de notificações + avatar com dropdown
- Dropdown: info do usuário, link Configurações, Ajuda & Suporte, Logout
- Lida com click-outside para fechar dropdown (`useRef` + event listener)

#### [src/components/BottomNavBar.tsx](src/components/BottomNavBar.tsx)
- Barra de navegação inferior fixa (mobile-first)
- 5 itens com `NavLink` (estado ativo com background primary-fixed):
  - Home (`/dashboard`) — ícone `home`
  - Atividade (`/transacoes`) — ícone `receipt_long`
  - Calendário (`/calendario`) — ícone `calendar_today`
  - Análise (`/relatorios`) — ícone `analytics`
  - Mais (`/configuracoes`) — ícone `menu`

### Seções da Landing Page

#### [src/components/Hero.tsx](src/components/Hero.tsx)
- Seção hero full-screen com animações GSAP (timeline staggered)
- Vídeo de fundo em loop: `Fluid_animation_wavy.mp4`
- Conteúdo esquerdo: badge, heading, descrição, botões CTA, stats (50k usuários, R$2B gerenciados, 4.9 rating)
- Conteúdo direito: frame de imagem + floating cards (Economizado +R$ 1.240, Score 892/1000)

#### [src/components/Features.tsx](src/components/Features.tsx)
- Grid 2 colunas com animação de scroll (GSAP ScrollTrigger)
- Heatmap Calendar: mapas de intensidade de gastos
- Real-Time Tracking: autocategorização por IA

#### [src/components/CreditIntelligence.tsx](src/components/CreditIntelligence.tsx)
- Grid 3 colunas de features de crédito
- Alertas Inteligentes, Otimização de Limite, Detecção de Fraude
- Animações com scroll trigger

#### [src/components/StudentsFeatures.tsx](src/components/StudentsFeatures.tsx)
- Layout 2 colunas (texto esquerda, imagens direita; invertido no mobile)
- Gastos Compartilhados (ícone `groups`), Metas Gamificadas (ícone `savings`)
- GSAP animations stagger

#### [src/components/TrustSection.tsx](src/components/TrustSection.tsx)
- Grid 2x2 (4 colunas md, 2 colunas sm):
  - Criptografia AES-256, Modo Privacidade, Exportação de Dados, Auditoria Semanal
- Hover effect com scale

#### [src/components/Footer.tsx](src/components/Footer.tsx)
- Layout 4 colunas:
  - Col 1: Logo + descrição
  - Col 2: Links Produto
  - Col 3: Links Suporte
  - Col 4: Links Legais
- Copyright + ícones sociais
- GSAP stagger nas colunas

### Componente Especial

#### [src/components/DarkVeil.tsx](src/components/DarkVeil.tsx)
- Efeito WebGL usando OGL com shader GLSL customizado
- CPPN (Compositional Pattern-Producing Network) para efeito visual
- **Props:**

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `hueShift` | number | 0 | Rotação de cor |
| `noiseIntensity` | number | 0 | Overlay de ruído |
| `scanlineIntensity` | number | 0 | Efeito scanline |
| `speed` | number | 2.3 | Velocidade da animação |
| `scanlineFrequency` | number | 0 | Frequência das scanlines |
| `warpAmount` | number | 0 | Distorção/warp |
| `resolutionScale` | number | 1 | Escala DPI |

- Uso atual: Login e Cadastro (`hueShift: -40, speed: 0.2, noiseIntensity: 0.05, scanlineIntensity: 0.1`)

---

## Design System (`src/index.css`)

### Paleta de Cores (Tailwind Theme)

| Token | Valor | Uso |
|-------|-------|-----|
| `primary` | `#4800b2` → `#6200ee` | Ações principais, gradientes |
| `secondary` | `#4ffbe6` | Accent cyan |
| `secondary-fixed` | `#a8f5eb` | Variante clara |
| `error` | `#ba1a1a` | Erros |
| `warning` | `#b45309` | Alertas |
| `income` | `#047857` | Entradas (WCAG AA) |
| `expense` | `#be123c` | Despesas (WCAG AA) |
| `on-surface` | `#1a1c1d` | Texto principal |
| `on-surface-variant` | `#49454f` | Texto secundário |

### Tipografia

| Papel | Fonte |
|-------|-------|
| Display | Quicksand |
| Headline | Quicksand |
| Body | Inter |
| Label | Inter |

### Classes Utilitárias Principais

| Classe | Efeito |
|--------|--------|
| `.shadow-ambient` | Sombra suave roxa (0 12px 32px) |
| `.editorial-gradient` | Gradiente 135deg roxo |
| `.primary-gradient` | Gradiente primário |
| `.editorial-shadow` | Sombra dupla com alpha primário |
| `.gradient-text` | Texto com clip de gradiente |
| `.glow-primary` | Box-shadow de brilho roxo |
| `.animate-float` | Animação float (keyframe) |
| `.animate-float-delayed` | Float com delay |
| `.card-hover` | Transform no hover |
| `.bottom-nav` | Barra inferior fixa |
| `.card-glass` | Glassmorphism (backdrop-filter blur) |
| `.no-scrollbar` | Oculta scrollbars |

---

## Dependências Principais

### Runtime

| Pacote | Versão | Uso |
|--------|--------|-----|
| `react` | 19.2.0 | Core |
| `react-dom` | 19.2.0 | DOM |
| `react-router-dom` | 7.14.0 | Roteamento |
| `gsap` | 3.14.2 | Animações + ScrollTrigger |
| `ogl` | 1.0.11 | WebGL/shaders (DarkVeil) |

### Dev

| Pacote | Versão | Uso |
|--------|--------|-----|
| `typescript` | ~5.9.3 | Tipagem |
| `vite` | 7.3.1 | Build |
| `tailwindcss` | 4.2.1 | Estilos |
| `eslint` | 9.39.1 | Linting |
| `@vitejs/plugin-react` | 5.1.1 | Plugin Vite |
| `@tailwindcss/vite` | 4.2.1 | Plugin Tailwind |
| `postcss` | 8.5.8 | CSS processing |
| `autoprefixer` | 10.4.27 | CSS prefixes |

---

## Padrões Arquiteturais

### Hooks em Uso
- `useState` — estado local (toggles, inputs, seleções)
- `useRef` — refs para DOM (click-outside, canvas WebGL)
- `useEffect` — efeitos colaterais (event listeners, WebGL loop)
- `useLayoutEffect` — animações GSAP (evita flash antes de pintar)
- `useNavigate` — navegação programática (React Router)

### Ícones
- **Material Symbols Outlined** (Google Fonts CDN)
- Ícones preenchidos via `fontVariationSettings: "'FILL' 1"`
- Tamanhos: `text-xl`, `text-2xl`, `text-3xl`

### Responsividade
- Mobile-first com breakpoints Tailwind: `sm:`, `md:`, `lg:`
- `BottomNavBar` → mobile; `TopNavBar` → topo em todas as telas autenticadas
- Grids: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`

---

## Tipos Inferidos (sem interfaces explícitas)

```typescript
// Transação
type Transaction = {
  category: string;
  merchant: string;
  time: string;
  amount: number;
  type: 'income' | 'expense';
};

// Categoria
type Category = {
  bg: string;       // Tailwind bg class
  text: string;     // Tailwind text class
  icon: string;     // Material Symbol name
  name: string;
  count: number;
  amount: number;
};

// Cartão
type Card = {
  type: string;
  number: string;   // últimos 4 dígitos
  closeDate: string;
  dueDate: string;
  limit: number;
};

// Limite de Orçamento
type Budget = {
  category: string;
  limit: number;
  spent: number;
  percentage: number;
};

// Parcelamento
type Installment = {
  name: string;
  total: number;
  monthsPaid: number;
  monthsTotal: number;
  progress: number;  // 0-100
};
```

---

## Índice Rápido de Todos os Arquivos

```
src/
├── main.tsx                          ← Entry point, GSAP ScrollTrigger
├── App.tsx                           ← Router com 15 rotas
├── App.css                           ← Estilos base (pouco usado)
├── index.css                         ← Tailwind theme + utilitários
│
├── pages/
│   ├── Landing.tsx                   ← Marketing (público)
│   ├── Login.tsx                     ← Autenticação (público)
│   ├── Cadastro.tsx                  ← Registro (público)
│   ├── Dashboard.tsx                 ← Home autenticada
│   ├── Transacoes.tsx                ← Histórico de transações
│   ├── NovaTransacao.tsx             ← Form nova transação
│   ├── Categorias.tsx                ← Gestão de categorias
│   ├── Calendario.tsx                ← Heatmap calendário
│   ├── OcorrenciasFixas.tsx          ← Recorrências/fixas
│   ├── Parcelamentos.tsx             ← Controle de parcelas
│   ├── LimitesDeGastos.tsx           ← Limites de orçamento
│   ├── CartoesDeCredito.tsx          ← Cartões
│   ├── DetalhesDaFatura.tsx          ← Fatura do cartão
│   ├── Relatorios.tsx                ← Relatórios financeiros
│   └── Configuracoes.tsx             ← Configurações
│
└── components/
    ├── Header.tsx                    ← Navbar landing (público)
    ├── Hero.tsx                      ← Seção hero landing
    ├── Features.tsx                  ← Seção features landing
    ├── CreditIntelligence.tsx        ← Seção crédito landing
    ├── StudentsFeatures.tsx          ← Seção estudantes landing
    ├── TrustSection.tsx              ← Seção segurança landing
    ├── Footer.tsx                    ← Footer landing
    ├── TopNavBar.tsx                 ← Navbar app autenticado
    ├── BottomNavBar.tsx              ← Nav inferior mobile
    └── DarkVeil.tsx                  ← Efeito WebGL/OGL
```
