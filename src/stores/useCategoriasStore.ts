import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { Categoria } from '../types';

const DEFAULTS: Omit<Categoria, 'id' | 'criadoEm'>[] = [
  { nome: 'Alimentação', icone: 'lunch_dining', cor: 'bg-orange-500', corTexto: 'text-orange-700', corFundo: 'bg-orange-100' },
  { nome: 'Transporte', icone: 'directions_car', cor: 'bg-blue-500', corTexto: 'text-blue-700', corFundo: 'bg-blue-100' },
  { nome: 'Educação', icone: 'school', cor: 'bg-purple-500', corTexto: 'text-purple-700', corFundo: 'bg-purple-100' },
  { nome: 'Lazer', icone: 'movie', cor: 'bg-pink-500', corTexto: 'text-pink-700', corFundo: 'bg-pink-100' },
  { nome: 'Moradia', icone: 'home', cor: 'bg-yellow-500', corTexto: 'text-yellow-700', corFundo: 'bg-yellow-100' },
  { nome: 'Saúde', icone: 'favorite', cor: 'bg-red-500', corTexto: 'text-red-700', corFundo: 'bg-red-100' },
  { nome: 'Renda', icone: 'account_balance_wallet', cor: 'bg-green-500', corTexto: 'text-green-700', corFundo: 'bg-green-100' },
  { nome: 'Compras', icone: 'shopping_bag', cor: 'bg-indigo-500', corTexto: 'text-indigo-700', corFundo: 'bg-indigo-100' },
];

function fromDB(row: Record<string, unknown>): Categoria {
  return {
    id: row.id as string,
    nome: row.nome as string,
    icone: row.icone as string,
    cor: row.cor as string,
    corTexto: row.cor_texto as string,
    corFundo: row.cor_fundo as string,
    criadoEm: row.criado_em as string,
  };
}

interface CategoriasState {
  categorias: Categoria[];
  loading: boolean;
  carregar: () => Promise<void>;
  adicionar: (dados: Omit<Categoria, 'id' | 'criadoEm'>) => Promise<void>;
  editar: (id: string, dados: Partial<Omit<Categoria, 'id' | 'criadoEm'>>) => Promise<void>;
  remover: (id: string) => Promise<void>;
}

export const useCategoriasStore = create<CategoriasState>()((set) => ({
  categorias: [],
  loading: false,

  carregar: async () => {
    set({ loading: true });
    const { data, error } = await supabase
      .from('categorias')
      .select('*')
      .order('criado_em', { ascending: true });

    if (error) { set({ loading: false }); return; }

    // Se usuário não tem categorias ainda, inserir os defaults
    if (data.length === 0) {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const inserts = DEFAULTS.map((c) => ({
          user_id: user.id,
          nome: c.nome,
          icone: c.icone,
          cor: c.cor,
          cor_texto: c.corTexto,
          cor_fundo: c.corFundo,
        }));
        const { data: criadas } = await supabase
          .from('categorias')
          .insert(inserts)
          .select();
        set({ categorias: (criadas ?? []).map(fromDB), loading: false });
        return;
      }
    }

    set({ categorias: data.map(fromDB), loading: false });
  },

  adicionar: async (dados) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('categorias')
      .insert({
        user_id: user.id,
        nome: dados.nome,
        icone: dados.icone,
        cor: dados.cor,
        cor_texto: dados.corTexto,
        cor_fundo: dados.corFundo,
      })
      .select()
      .single();

    if (error || !data) return;
    set((s) => ({ categorias: [...s.categorias, fromDB(data)] }));
  },

  editar: async (id, dados) => {
    const update: Record<string, unknown> = {};
    if (dados.nome !== undefined) update.nome = dados.nome;
    if (dados.icone !== undefined) update.icone = dados.icone;
    if (dados.cor !== undefined) update.cor = dados.cor;
    if (dados.corTexto !== undefined) update.cor_texto = dados.corTexto;
    if (dados.corFundo !== undefined) update.cor_fundo = dados.corFundo;

    const { error } = await supabase.from('categorias').update(update).eq('id', id);
    if (error) return;
    set((s) => ({
      categorias: s.categorias.map((c) => (c.id === id ? { ...c, ...dados } : c)),
    }));
  },

  remover: async (id) => {
    const { error } = await supabase.from('categorias').delete().eq('id', id);
    if (error) return;
    set((s) => ({ categorias: s.categorias.filter((c) => c.id !== id) }));
  },
}));
