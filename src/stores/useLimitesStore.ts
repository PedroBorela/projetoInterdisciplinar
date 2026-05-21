import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { LimiteCategoria } from '../types';

interface LimitesState {
  limites: LimiteCategoria[];
  salvar: (categoriaId: string, valorLimite: number, mes: number, ano: number) => void;
  remover: (categoriaId: string, mes: number, ano: number) => void;
  getLimite: (categoriaId: string, mes: number, ano: number) => number;
}

export const useLimitesStore = create<LimitesState>()(
  persist(
    (set, get) => ({
      limites: [],

      salvar: (categoriaId, valorLimite, mes, ano) =>
        set((s) => {
          const existe = s.limites.find(
            (l) => l.categoriaId === categoriaId && l.mes === mes && l.ano === ano
          );
          if (existe) {
            return {
              limites: s.limites.map((l) =>
                l.categoriaId === categoriaId && l.mes === mes && l.ano === ano
                  ? { ...l, valorLimite }
                  : l
              ),
            };
          }
          return {
            limites: [
              ...s.limites,
              { id: crypto.randomUUID(), categoriaId, valorLimite, mes, ano },
            ],
          };
        }),

      remover: (categoriaId, mes, ano) =>
        set((s) => ({
          limites: s.limites.filter(
            (l) => !(l.categoriaId === categoriaId && l.mes === mes && l.ano === ano)
          ),
        })),

      getLimite: (categoriaId, mes, ano) => {
        const l = get().limites.find(
          (l) => l.categoriaId === categoriaId && l.mes === mes && l.ano === ano
        );
        return l?.valorLimite ?? 0;
      },
    }),
    { name: 'liso-limites' }
  )
);
