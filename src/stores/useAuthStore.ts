import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Usuario } from '../types';

interface AuthState {
  usuarios: Usuario[];
  usuarioLogado: Usuario | null;
  cadastrar: (nome: string, email: string, senha: string) => { success: boolean; error?: string };
  login: (email: string, senha: string) => { success: boolean; error?: string };
  logout: () => void;
  atualizarPerfil: (dados: { nome: string; email: string }) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      usuarios: [],
      usuarioLogado: null,

      cadastrar: (nome, email, senha) => {
        const { usuarios } = get();
        const existe = usuarios.some((u) => u.email.toLowerCase() === email.toLowerCase());

        if (existe) {
          return { success: false, error: 'E-mail já cadastrado' };
        }

        const novoUsuario: Usuario = {
          id: crypto.randomUUID(),
          nome,
          email,
          senha, // Simulado
          criadoEm: new Date().toISOString(),
        };

        set((s) => ({
          usuarios: [...s.usuarios, novoUsuario],
          usuarioLogado: novoUsuario,
        }));

        return { success: true };
      },

      login: (email, senha) => {
        const { usuarios } = get();
        const usuario = usuarios.find(
          (u) => u.email.toLowerCase() === email.toLowerCase() && u.senha === senha
        );

        if (!usuario) {
          return { success: false, error: 'E-mail ou senha incorretos' };
        }

        set({ usuarioLogado: usuario });
        return { success: true };
      },

      logout: () => {
        set({ usuarioLogado: null });
      },

      atualizarPerfil: (dados) => {
        set((s) => {
          if (!s.usuarioLogado) return s;
          const atualizado = { ...s.usuarioLogado, ...dados };
          return {
            usuarioLogado: atualizado,
            usuarios: s.usuarios.map((u) => (u.id === s.usuarioLogado?.id ? atualizado : u)),
          };
        });
      },
    }),
    { name: 'liso-auth' }
  )
);
