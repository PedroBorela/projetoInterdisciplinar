import { create } from 'zustand';
import { addMonths, format } from 'date-fns';
import { supabase } from '../lib/supabase';
import { d2 } from '../lib/formatters';
import type { Parcelamento } from '../types';
import { useTransacoesStore } from './useTransacoesStore';

function fromDB(row: Record<string, unknown>): Parcelamento {
  return {
    id: row.id as string,
    descricao: row.descricao as string,
    valorTotal: Number(row.valor_total),
    totalParcelas: row.total_parcelas as number,
    valorParcela: Number(row.valor_parcela),
    categoriaId: row.categoria_id as string,
    cartaoId: row.cartao_id as string | undefined,
    dataInicio: row.data_inicio as string,
    criadoEm: row.criado_em as string,
  };
}

interface ParcelamentosState {
  parcelamentos: Parcelamento[];
  loading: boolean;
  carregar: () => Promise<void>;
  adicionar: (dados: Omit<Parcelamento, 'id' | 'criadoEm' | 'valorParcela'>) => Promise<void>;
  remover: (id: string) => Promise<void>;
}

export const useParcelamentosStore = create<ParcelamentosState>()((set) => ({
  parcelamentos: [],
  loading: false,

  carregar: async () => {
    set({ loading: true });
    const { data, error } = await supabase
      .from('parcelamentos')
      .select('*')
      .order('criado_em', { ascending: false });
    if (error) { set({ loading: false }); return; }
    set({ parcelamentos: (data ?? []).map(fromDB), loading: false });
  },

  adicionar: async (dados) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const valorParcela = d2(dados.valorTotal / dados.totalParcelas);

    const { data, error } = await supabase
      .from('parcelamentos')
      .insert({
        user_id: user.id,
        descricao: dados.descricao,
        valor_total: d2(dados.valorTotal),
        total_parcelas: dados.totalParcelas,
        valor_parcela: valorParcela,
        categoria_id: dados.categoriaId || null,
        cartao_id: dados.cartaoId || null,
        data_inicio: dados.dataInicio,
      })
      .select()
      .single();

    if (error || !data) return;
    const parcelamento = fromDB(data);
    set((s) => ({ parcelamentos: [parcelamento, ...s.parcelamentos] }));

    // Gerar transações para cada parcela em lote
    const parcelas = Array.from({ length: dados.totalParcelas }, (_, i) => ({
      tipo: 'despesa' as const,
      valor: valorParcela,
      descricao: `${dados.descricao} (${i + 1}/${dados.totalParcelas})`,
      categoriaId: dados.categoriaId,
      data: format(addMonths(new Date(dados.dataInicio), i), 'yyyy-MM-dd'),
      meioPagamento: dados.cartaoId ? 'cartao' as const : 'dinheiro' as const,
      cartaoId: dados.cartaoId,
      parcelamentoId: parcelamento.id,
    }));

    await useTransacoesStore.getState().adicionarLote(parcelas);
  },

  remover: async (id) => {
    // O cascade no banco já apaga as transações vinculadas
    const { error } = await supabase.from('parcelamentos').delete().eq('id', id);
    if (error) return;
    set((s) => ({ parcelamentos: s.parcelamentos.filter((p) => p.id !== id) }));
    // Remover da memória local também
    await useTransacoesStore.getState().removerPorParcelamento(id);
  },
}));
