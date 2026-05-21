import { z } from 'zod';

export const transacaoSchema = z.object({
  tipo: z.enum(['despesa', 'receita']),
  valor: z.number({ invalid_type_error: 'Informe um valor' }).positive('Valor deve ser maior que zero'),
  descricao: z.string().min(1, 'Descrição obrigatória').max(100),
  categoriaId: z.string().min(1, 'Selecione uma categoria'),
  data: z.string().min(1, 'Selecione uma data'),
  meioPagamento: z.enum(['cartao', 'dinheiro', 'digital']),
  cartaoId: z.string().optional(),
  parcelado: z.boolean().optional(),
  numeroParcelas: z.number().int().min(2).max(60).optional(),
});

export const categoriaSchema = z.object({
  nome: z.string().min(1, 'Nome obrigatório').max(30),
  icone: z.string().min(1, 'Ícone obrigatório'),
  cor: z.string().min(1),
  corTexto: z.string().min(1),
  corFundo: z.string().min(1),
});

export const cartaoSchema = z.object({
  apelido: z.string().min(1, 'Apelido obrigatório').max(30),
  ultimos4: z.string().length(4, 'Informe os 4 últimos dígitos'),
  bandeira: z.string().min(1, 'Selecione a bandeira'),
  limite: z.number().positive('Limite deve ser positivo'),
  diaFechamento: z.number().int().min(1).max(31),
  diaVencimento: z.number().int().min(1).max(31),
  gradiente: z.string().min(1),
  principal: z.boolean().optional(),
});

export const ocorrenciaSchema = z.object({
  descricao: z.string().min(1, 'Descrição obrigatória').max(60),
  valor: z.number().positive('Valor deve ser positivo'),
  categoriaId: z.string().min(1, 'Selecione uma categoria'),
  diaCobranca: z.number().int().min(1).max(31),
  debitoAutomatico: z.boolean(),
});

export const parcelamentoSchema = z.object({
  descricao: z.string().min(1, 'Descrição obrigatória').max(60),
  valorTotal: z.number().positive('Valor deve ser positivo'),
  totalParcelas: z.number().int().min(2).max(60),
  categoriaId: z.string().min(1, 'Selecione uma categoria'),
  cartaoId: z.string().optional(),
  dataInicio: z.string().min(1),
});

export type TransacaoForm = z.infer<typeof transacaoSchema>;
export type CategoriaForm = z.infer<typeof categoriaSchema>;
export type CartaoForm = z.infer<typeof cartaoSchema>;
export type OcorrenciaForm = z.infer<typeof ocorrenciaSchema>;
export type ParcelamentoForm = z.infer<typeof parcelamentoSchema>;
