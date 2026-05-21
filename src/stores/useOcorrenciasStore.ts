import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { OcorrenciaFixa } from '../types';

interface OcorrenciasState {
  ocorrencias: OcorrenciaFixa[];
  adicionar: (dados: Omit<OcorrenciaFixa, 'id' | 'criadoEm'>) => void;
  editar: (id: string, dados: Partial<Omit<OcorrenciaFixa, 'id' | 'criadoEm'>>) => void;
  remover: (id: string) => void;
  toggleAtiva: (id: string) => void;
}

export const useOcorrenciasStore = create<OcorrenciasState>()(
  persist(
    (set) => ({
      ocorrencias: [],

      adicionar: (dados) =>
        set((s) => ({
          ocorrencias: [
            ...s.ocorrencias,
            { ...dados, id: crypto.randomUUID(), criadoEm: new Date().toISOString() },
          ],
        })),

      editar: (id, dados) =>
        set((s) => ({
          ocorrencias: s.ocorrencias.map((o) => (o.id === id ? { ...o, ...dados } : o)),
        })),

      remover: (id) =>
        set((s) => ({ ocorrencias: s.ocorrencias.filter((o) => o.id !== id) })),

      toggleAtiva: (id) =>
        set((s) => ({
          ocorrencias: s.ocorrencias.map((o) => (o.id === id ? { ...o, ativa: !o.ativa } : o)),
        })),
    }),
    { name: 'liso-ocorrencias' }
  )
);
