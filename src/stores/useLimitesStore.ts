import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { d2 } from '../lib/formatters';
import type { LimiteCategoria } from '../types';

function fromDB(row: Record<string, unknown>): LimiteCategoria {
  return {
    id: row.id as string,
    categoriaId: row.categoria_id as string,
    valorLimite: Number(row.valor_limite),
    mes: row.mes as number,
    ano: row.ano as number,
  };
}

interface LimitesState {
  limites: LimiteCategoria[];
  loading: boolean;
  carregar: () => Promise<void>;
  salvar: (categoriaId: string, valorLimite: number, mes: number, ano: number) => Promise<void>;
  remover: (categoriaId: string, mes: number, ano: number) => Promise<void>;
  getLimite: (categoriaId: string, mes: number, ano: number) => number;
}

export const useLimitesStore = create<LimitesState>()((set, get) => ({
  limites: [],
  loading: false,

  carregar: async () => {
    set({ loading: true });
    const { data, error } = await supabase.from('limites_categorias').select('*');
    if (error) { set({ loading: false }); return; }
    set({ limites: (data ?? []).map(fromDB), loading: false });
  },

  salvar: async (categoriaId, valorLimite, mes, ano) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('limites_categorias')
      .upsert(
        { user_id: user.id, categoria_id: categoriaId, valor_limite: d2(valorLimite), mes, ano },
        { onConflict: 'user_id,categoria_id,mes,ano' }
      )
      .select()
      .single();

    if (error || !data) return;
    const atualizado = fromDB(data);
    set((s) => {
      const existe = s.limites.find(
        (l) => l.categoriaId === categoriaId && l.mes === mes && l.ano === ano
      );
      if (existe) {
        return { limites: s.limites.map((l) => l.id === atualizado.id ? atualizado : l) };
      }
      return { limites: [...s.limites, atualizado] };
    });
  },

  remover: async (categoriaId, mes, ano) => {
    const { error } = await supabase
      .from('limites_categorias')
      .delete()
      .match({ categoria_id: categoriaId, mes, ano });
    if (error) return;
    set((s) => ({
      limites: s.limites.filter(
        (l) => !(l.categoriaId === categoriaId && l.mes === mes && l.ano === ano)
      ),
    }));
  },

  getLimite: (categoriaId, mes, ano) => {
    const l = get().limites.find(
      (l) => l.categoriaId === categoriaId && l.mes === mes && l.ano === ano
    );
    return l?.valorLimite ?? 0;
  },
}));
