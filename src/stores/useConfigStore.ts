import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ConfigApp } from '../types';

interface ConfigState extends ConfigApp {
  atualizar: (dados: Partial<ConfigApp>) => void;
}

export const useConfigStore = create<ConfigState>()(
  persist(
    (set) => ({
      saldoInicial: 0,
      moeda: 'BRL',
      darkMode: false,
      nomeUsuario: 'Usuário',
      emailUsuario: 'usuario@lisocontrol.com',

      atualizar: (dados) => set((s) => ({ ...s, ...dados })),
    }),
    { name: 'liso-config' }
  )
);
