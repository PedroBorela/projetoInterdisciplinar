import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { d2 } from '../lib/formatters';
import type { OcorrenciaFixa } from '../types';

function fromDB(row: Record<string, unknown>): OcorrenciaFixa {
  return {
    id: row.id as string,
    descricao: row.descricao as string,
    valor: Number(row.valor),
    categoriaId: row.categoria_id as string,
    diaCobranca: row.dia_cobranca as number,
    debitoAutomatico: row.debito_automatico as boolean,
    ativa: row.ativa as boolean,
    criadoEm: row.criado_em as string,
  };
}

interface OcorrenciasState {
  ocorrencias: OcorrenciaFixa[];
  loading: boolean;
  carregar: () => Promise<void>;
  adicionar: (dados: Omit<OcorrenciaFixa, 'id' | 'criadoEm'>) => Promise<void>;
  editar: (id: string, dados: Partial<Omit<OcorrenciaFixa, 'id' | 'criadoEm'>>) => Promise<void>;
  remover: (id: string) => Promise<void>;
  toggleAtiva: (id: string) => Promise<void>;
}

export const useOcorrenciasStore = create<OcorrenciasState>()((set, get) => ({
  ocorrencias: [],
  loading: false,

  carregar: async () => {
    set({ loading: true });
    const { data, error } = await supabase
      .from('ocorrencias_fixas')
      .select('*')
      .order('criado_em', { ascending: true });
    if (error) { set({ loading: false }); return; }
    set({ ocorrencias: (data ?? []).map(fromDB), loading: false });
  },

  adicionar: async (dados) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('ocorrencias_fixas')
      .insert({
        user_id: user.id,
        descricao: dados.descricao,
        valor: d2(dados.valor),
        categoria_id: dados.categoriaId || null,
        dia_cobranca: dados.diaCobranca,
        debito_automatico: dados.debitoAutomatico,
        ativa: dados.ativa,
      })
      .select()
      .single();

    if (error || !data) return;
    set((s) => ({ ocorrencias: [...s.ocorrencias, fromDB(data)] }));
  },

  editar: async (id, dados) => {
    const update: Record<string, unknown> = {};
    if (dados.descricao !== undefined) update.descricao = dados.descricao;
    if (dados.valor !== undefined) update.valor = d2(dados.valor);
    if (dados.categoriaId !== undefined) update.categoria_id = dados.categoriaId || null;
    if (dados.diaCobranca !== undefined) update.dia_cobranca = dados.diaCobranca;
    if (dados.debitoAutomatico !== undefined) update.debito_automatico = dados.debitoAutomatico;
    if (dados.ativa !== undefined) update.ativa = dados.ativa;

    const { error } = await supabase.from('ocorrencias_fixas').update(update).eq('id', id);
    if (error) return;
    set((s) => ({
      ocorrencias: s.ocorrencias.map((o) => (o.id === id ? { ...o, ...dados } : o)),
    }));
  },

  remover: async (id) => {
    const { error } = await supabase.from('ocorrencias_fixas').delete().eq('id', id);
    if (error) return;
    set((s) => ({ ocorrencias: s.ocorrencias.filter((o) => o.id !== id) }));
  },

  toggleAtiva: async (id) => {
    const ocorrencia = get().ocorrencias.find((o) => o.id === id);
    if (!ocorrencia) return;

    const novoEstado = !ocorrencia.ativa;
    const { error } = await supabase
      .from('ocorrencias_fixas')
      .update({ ativa: novoEstado })
      .eq('id', id);
    if (error) return;
    set((s) => ({
      ocorrencias: s.ocorrencias.map((o) => (o.id === id ? { ...o, ativa: novoEstado } : o)),
    }));
  },
}));
