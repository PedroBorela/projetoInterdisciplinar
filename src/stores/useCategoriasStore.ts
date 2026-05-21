import { create } from 'zustand';
import { persist } from 'zustand/middleware';
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

interface CategoriasState {
  categorias: Categoria[];
  adicionar: (dados: Omit<Categoria, 'id' | 'criadoEm'>) => void;
  editar: (id: string, dados: Partial<Omit<Categoria, 'id' | 'criadoEm'>>) => void;
  remover: (id: string) => void;
}

export const useCategoriasStore = create<CategoriasState>()(
  persist(
    (set) => ({
      categorias: DEFAULTS.map((c) => ({
        ...c,
        id: crypto.randomUUID(),
        criadoEm: new Date().toISOString(),
      })),

      adicionar: (dados) =>
        set((s) => ({
          categorias: [
            ...s.categorias,
            { ...dados, id: crypto.randomUUID(), criadoEm: new Date().toISOString() },
          ],
        })),

      editar: (id, dados) =>
        set((s) => ({
          categorias: s.categorias.map((c) => (c.id === id ? { ...c, ...dados } : c)),
        })),

      remover: (id) =>
        set((s) => ({ categorias: s.categorias.filter((c) => c.id !== id) })),
    }),
    { name: 'liso-categorias' }
  )
);
