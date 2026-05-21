import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { addMonths, format } from 'date-fns';
import type { Parcelamento } from '../types';
import { useTransacoesStore } from './useTransacoesStore';

interface ParcelamentosState {
  parcelamentos: Parcelamento[];
  adicionar: (dados: Omit<Parcelamento, 'id' | 'criadoEm' | 'valorParcela'>) => void;
  remover: (id: string) => void;
}

export const useParcelamentosStore = create<ParcelamentosState>()(
  persist(
    (set) => ({
      parcelamentos: [],

      adicionar: (dados) => {
        const valorParcela = dados.valorTotal / dados.totalParcelas;
        const id = crypto.randomUUID();
        const parcelamento: Parcelamento = {
          ...dados,
          id,
          valorParcela,
          criadoEm: new Date().toISOString(),
        };

        set((s) => ({ parcelamentos: [...s.parcelamentos, parcelamento] }));

        // Gerar transações para cada parcela
        const adicionarTransacao = useTransacoesStore.getState().adicionar;
        for (let i = 0; i < dados.totalParcelas; i++) {
          const dataVencimento = addMonths(new Date(dados.dataInicio), i);
          adicionarTransacao({
            tipo: 'despesa',
            valor: valorParcela,
            descricao: `${dados.descricao} (${i + 1}/${dados.totalParcelas})`,
            categoriaId: dados.categoriaId,
            data: format(dataVencimento, 'yyyy-MM-dd'),
            meioPagamento: dados.cartaoId ? 'cartao' : 'dinheiro',
            cartaoId: dados.cartaoId,
            parcelamentoId: id,
          });
        }
      },

      remover: (id) => {
        set((s) => ({ parcelamentos: s.parcelamentos.filter((p) => p.id !== id) }));
        useTransacoesStore.getState().removerPorParcelamento(id);
      },
    }),
    { name: 'liso-parcelamentos' }
  )
);
