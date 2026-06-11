import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { d2 } from '../lib/formatters';
import type { Transacao } from '../types';

function fromDB(row: Record<string, unknown>): Transacao {
  return {
    id: row.id as string,
    tipo: row.tipo as Transacao['tipo'],
    valor: Number(row.valor),
    descricao: row.descricao as string,
    categoriaId: row.categoria_id as string,
    data: row.data as string,
    meioPagamento: row.meio_pagamento as Transacao['meioPagamento'],
    cartaoId: row.cartao_id as string | undefined,
    parcelamentoId: row.parcelamento_id as string | undefined,
    ocorrenciaId: row.ocorrencia_id as string | undefined,
    criadoEm: row.criado_em as string,
  };
}

interface TransacoesState {
  transacoes: Transacao[];
  loading: boolean;
  carregar: () => Promise<void>;
  adicionar: (dados: Omit<Transacao, 'id' | 'criadoEm'>) => Promise<Transacao | null>;
  adicionarLote: (lista: Omit<Transacao, 'id' | 'criadoEm'>[]) => Promise<void>;
  editar: (id: string, dados: Partial<Omit<Transacao, 'id' | 'criadoEm'>>) => Promise<boolean>;
  remover: (id: string) => Promise<void>;
  removerPorParcelamento: (parcelamentoId: string) => Promise<void>;
}

export const useTransacoesStore = create<TransacoesState>()((set) => ({
  transacoes: [],
  loading: false,

  carregar: async () => {
    set({ loading: true });
    const { data, error } = await supabase
      .from('transacoes')
      .select('*')
      .order('data', { ascending: false });

    if (error) { set({ loading: false }); return; }
    set({ transacoes: (data ?? []).map(fromDB), loading: false });
  },

  adicionar: async (dados) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from('transacoes')
      .insert({
        user_id: user.id,
        tipo: dados.tipo,
        valor: d2(dados.valor),
        descricao: dados.descricao,
        categoria_id: dados.categoriaId || null,
        data: dados.data,
        meio_pagamento: dados.meioPagamento,
        cartao_id: dados.cartaoId || null,
        parcelamento_id: dados.parcelamentoId || null,
        ocorrencia_id: dados.ocorrenciaId || null,
      })
      .select()
      .single();

    if (error || !data) return null;
    const nova = fromDB(data);
    set((s) => ({ transacoes: [nova, ...s.transacoes] }));
    return nova;
  },

  adicionarLote: async (lista) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const inserts = lista.map((dados) => ({
      user_id: user.id,
      tipo: dados.tipo,
      valor: d2(dados.valor),
      descricao: dados.descricao,
      categoria_id: dados.categoriaId || null,
      data: dados.data,
      meio_pagamento: dados.meioPagamento,
      cartao_id: dados.cartaoId || null,
      parcelamento_id: dados.parcelamentoId || null,
      ocorrencia_id: dados.ocorrenciaId || null,
    }));

    const { data, error } = await supabase
      .from('transacoes')
      .insert(inserts)
      .select();

    if (error || !data) return;
    const novas = data.map(fromDB);
    set((s) => ({ transacoes: [...novas, ...s.transacoes] }));
  },

  editar: async (id, dados) => {
    const update: Record<string, unknown> = {};
    if (dados.tipo !== undefined) update.tipo = dados.tipo;
    if (dados.valor !== undefined) update.valor = d2(dados.valor);
    if (dados.descricao !== undefined) update.descricao = dados.descricao;
    if (dados.categoriaId !== undefined) update.categoria_id = dados.categoriaId || null;
    if (dados.data !== undefined) update.data = dados.data;
    if (dados.meioPagamento !== undefined) update.meio_pagamento = dados.meioPagamento;
    if (dados.cartaoId !== undefined) update.cartao_id = dados.cartaoId || null;

    const { error } = await supabase.from('transacoes').update(update).eq('id', id);
    if (error) return false;
    set((s) => ({
      transacoes: s.transacoes.map((t) => (t.id === id ? { ...t, ...dados } : t)),
    }));
    return true;
  },

  remover: async (id) => {
    const { error } = await supabase.from('transacoes').delete().eq('id', id);
    if (error) return;
    set((s) => ({ transacoes: s.transacoes.filter((t) => t.id !== id) }));
  },

  removerPorParcelamento: async (parcelamentoId) => {
    const { error } = await supabase
      .from('transacoes')
      .delete()
      .eq('parcelamento_id', parcelamentoId);
    if (error) return;
    set((s) => ({
      transacoes: s.transacoes.filter((t) => t.parcelamentoId !== parcelamentoId),
    }));
  },
}));
