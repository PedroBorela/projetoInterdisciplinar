import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Cartao } from '../types';

interface CartoesState {
  cartoes: Cartao[];
  adicionar: (dados: Omit<Cartao, 'id' | 'criadoEm'>) => void;
  editar: (id: string, dados: Partial<Omit<Cartao, 'id' | 'criadoEm'>>) => void;
  remover: (id: string) => void;
  definirPrincipal: (id: string) => void;
}

export const useCartoesStore = create<CartoesState>()(
  persist(
    (set) => ({
      cartoes: [],

      adicionar: (dados) =>
        set((s) => ({
          cartoes: [
            ...s.cartoes,
            { ...dados, id: crypto.randomUUID(), criadoEm: new Date().toISOString() },
          ],
        })),

      editar: (id, dados) =>
        set((s) => ({
          cartoes: s.cartoes.map((c) => (c.id === id ? { ...c, ...dados } : c)),
        })),

      remover: (id) =>
        set((s) => ({ cartoes: s.cartoes.filter((c) => c.id !== id) })),

      definirPrincipal: (id) =>
        set((s) => ({
          cartoes: s.cartoes.map((c) => ({ ...c, principal: c.id === id })),
        })),
    }),
    { name: 'liso-cartoes' }
  )
);
