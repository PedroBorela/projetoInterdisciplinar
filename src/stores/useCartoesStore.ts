import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { d2 } from '../lib/formatters';
import type { Cartao } from '../types';

function fromDB(row: Record<string, unknown>): Cartao {
  return {
    id: row.id as string,
    apelido: row.apelido as string,
    ultimos4: row.ultimos4 as string,
    bandeira: row.bandeira as string,
    limite: Number(row.limite),
    diaFechamento: row.dia_fechamento as number,
    diaVencimento: row.dia_vencimento as number,
    gradiente: row.gradiente as string,
    principal: row.principal as boolean,
    faturasPagas: (row.faturas_pagas as string[]) ?? [],
    criadoEm: row.criado_em as string,
  };
}

interface CartoesState {
  cartoes: Cartao[];
  loading: boolean;
  carregar: () => Promise<void>;
  adicionar: (dados: Omit<Cartao, 'id' | 'criadoEm'>) => Promise<void>;
  editar: (id: string, dados: Partial<Omit<Cartao, 'id' | 'criadoEm'>>) => Promise<void>;
  remover: (id: string) => Promise<void>;
  definirPrincipal: (id: string) => Promise<void>;
}

export const useCartoesStore = create<CartoesState>()((set) => ({
  cartoes: [],
  loading: false,

  carregar: async () => {
    set({ loading: true });
    const { data, error } = await supabase
      .from('cartoes')
      .select('*')
      .order('criado_em', { ascending: true });

    if (error) { set({ loading: false }); return; }
    set({ cartoes: (data ?? []).map(fromDB), loading: false });
  },

  adicionar: async (dados) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('cartoes')
      .insert({
        user_id: user.id,
        apelido: dados.apelido,
        ultimos4: dados.ultimos4,
        bandeira: dados.bandeira,
        limite: d2(dados.limite),
        dia_fechamento: dados.diaFechamento,
        dia_vencimento: dados.diaVencimento,
        gradiente: dados.gradiente,
        principal: dados.principal,
        faturas_pagas: dados.faturasPagas ?? [],
      })
      .select()
      .single();

    if (error || !data) return;
    set((s) => ({ cartoes: [...s.cartoes, fromDB(data)] }));
  },

  editar: async (id, dados) => {
    const update: Record<string, unknown> = {};
    if (dados.apelido !== undefined) update.apelido = dados.apelido;
    if (dados.ultimos4 !== undefined) update.ultimos4 = dados.ultimos4;
    if (dados.bandeira !== undefined) update.bandeira = dados.bandeira;
    if (dados.limite !== undefined) update.limite = d2(dados.limite);
    if (dados.diaFechamento !== undefined) update.dia_fechamento = dados.diaFechamento;
    if (dados.diaVencimento !== undefined) update.dia_vencimento = dados.diaVencimento;
    if (dados.gradiente !== undefined) update.gradiente = dados.gradiente;
    if (dados.principal !== undefined) update.principal = dados.principal;
    if (dados.faturasPagas !== undefined) update.faturas_pagas = dados.faturasPagas;

    const { error } = await supabase.from('cartoes').update(update).eq('id', id);
    if (error) return;
    set((s) => ({
      cartoes: s.cartoes.map((c) => (c.id === id ? { ...c, ...dados } : c)),
    }));
  },

  remover: async (id) => {
    const { error } = await supabase.from('cartoes').delete().eq('id', id);
    if (error) return;
    set((s) => ({ cartoes: s.cartoes.filter((c) => c.id !== id) }));
  },

  definirPrincipal: async (id) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // Desmarcar todos, depois marcar o escolhido
    await supabase
      .from('cartoes')
      .update({ principal: false })
      .eq('user_id', user.id);

    await supabase
      .from('cartoes')
      .update({ principal: true })
      .eq('id', id);

    set((s) => ({
      cartoes: s.cartoes.map((c) => ({ ...c, principal: c.id === id })),
    }));
  },
}));
