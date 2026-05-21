import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Transacao } from '../types';

interface TransacoesState {
  transacoes: Transacao[];
  adicionar: (dados: Omit<Transacao, 'id' | 'criadoEm'>) => Transacao;
  editar: (id: string, dados: Partial<Omit<Transacao, 'id' | 'criadoEm'>>) => void;
  remover: (id: string) => void;
  removerPorParcelamento: (parcelamentoId: string) => void;
}

export const useTransacoesStore = create<TransacoesState>()(
  persist(
    (set) => ({
      transacoes: [],

      adicionar: (dados) => {
        const nova: Transacao = {
          ...dados,
          id: crypto.randomUUID(),
          criadoEm: new Date().toISOString(),
        };
        set((s) => ({ transacoes: [...s.transacoes, nova] }));
        return nova;
      },

      editar: (id, dados) =>
        set((s) => ({
          transacoes: s.transacoes.map((t) => (t.id === id ? { ...t, ...dados } : t)),
        })),

      remover: (id) =>
        set((s) => ({ transacoes: s.transacoes.filter((t) => t.id !== id) })),

      removerPorParcelamento: (parcelamentoId) =>
        set((s) => ({
          transacoes: s.transacoes.filter((t) => t.parcelamentoId !== parcelamentoId),
        })),
    }),
    { name: 'liso-transacoes' }
  )
);
