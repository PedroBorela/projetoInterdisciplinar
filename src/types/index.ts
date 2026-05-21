export type TipoTransacao = 'despesa' | 'receita';
export type MeioPagamento = 'cartao' | 'dinheiro' | 'digital';

export interface Categoria {
  id: string;
  nome: string;
  icone: string;
  cor: string; // classe tailwind ex: "bg-orange-500"
  corTexto: string; // ex: "text-orange-700"
  corFundo: string; // ex: "bg-orange-100"
  criadoEm: string;
}

export interface Transacao {
  id: string;
  tipo: TipoTransacao;
  valor: number;
  descricao: string;
  categoriaId: string;
  data: string; // YYYY-MM-DD
  meioPagamento: MeioPagamento;
  cartaoId?: string;
  parcelamentoId?: string;
  ocorrenciaId?: string;
  criadoEm: string;
}

export interface Cartao {
  id: string;
  apelido: string;
  ultimos4: string;
  bandeira: string;
  limite: number;
  diaFechamento: number;
  diaVencimento: number;
  gradiente: string; // ex: "from-slate-800 to-slate-600"
  principal: boolean;
  faturasPagas?: string[]; // formato YYYY-MM
  criadoEm: string;
}

export interface LimiteCategoria {
  id: string;
  categoriaId: string;
  valorLimite: number;
  mes: number;
  ano: number;
}

export interface OcorrenciaFixa {
  id: string;
  descricao: string;
  valor: number;
  categoriaId: string;
  diaCobranca: number;
  debitoAutomatico: boolean;
  ativa: boolean;
  criadoEm: string;
}

export interface Parcelamento {
  id: string;
  descricao: string;
  valorTotal: number;
  totalParcelas: number;
  valorParcela: number;
  categoriaId: string;
  cartaoId?: string;
  dataInicio: string; // YYYY-MM-DD
  criadoEm: string;
}

export interface ConfigApp {
  saldoInicial: number;
  moeda: string;
  darkMode: boolean;
  nomeUsuario: string;
  emailUsuario: string;
}


