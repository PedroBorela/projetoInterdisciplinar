import { create } from 'zustand';
import type { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

function traduzirErroAuth(msg: string): string {
  if (msg.includes('only request this after')) {
    const segundos = msg.match(/(\d+) second/)?.[1] ?? '30';
    return `Muitas tentativas. Aguarde ${segundos} segundos e tente novamente.`;
  }
  if (msg.includes('User already registered')) return 'Este e-mail já está cadastrado.';
  if (msg.includes('Invalid login credentials')) return 'E-mail ou senha incorretos.';
  if (msg.includes('Email not confirmed')) return 'Confirme seu e-mail antes de entrar.';
  if (msg.includes('Password should be')) return 'A senha precisa ter ao menos 6 caracteres.';
  if (msg.includes('Unable to validate email')) return 'E-mail inválido.';
  return 'Ocorreu um erro. Tente novamente.';
}

interface AuthState {
  usuario: User | null;
  session: Session | null;
  loading: boolean;
  inicializar: () => Promise<() => void>;
  cadastrar: (nome: string, email: string, senha: string) => Promise<{ success: boolean; error?: string }>;
  login: (email: string, senha: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  atualizarPerfil: (dados: { nome: string; email: string }) => Promise<void>;
}

export const useAuthStore = create<AuthState>()((set) => ({
  usuario: null,
  session: null,
  loading: true,

  inicializar: async () => {
    const { data: { session } } = await supabase.auth.getSession();
    set({ usuario: session?.user ?? null, session, loading: false });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      set({ usuario: session?.user ?? null, session });
    });

    return () => subscription.unsubscribe();
  },

  cadastrar: async (nome, email, senha) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password: senha,
      options: { data: { nome } },
    });

    if (error) return { success: false, error: traduzirErroAuth(error.message) };
    if (!data.user) return { success: false, error: 'Erro ao criar conta.' };

    // Confirmação de e-mail pendente (padrão em projetos novos do Supabase)
    if (!data.session) {
      return {
        success: false,
        error: 'Confirme seu e-mail antes de entrar. Verifique sua caixa de entrada.',
      };
    }

    return { success: true };
  },

  login: async (email, senha) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password: senha });
    if (error) return { success: false, error: traduzirErroAuth(error.message) };
    return { success: true };
  },

  logout: async () => {
    await supabase.auth.signOut();
    set({ usuario: null, session: null });
  },

  atualizarPerfil: async (dados) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    await supabase.from('user_config').upsert({
      user_id: user.id,
      nome: dados.nome,
    });

    if (dados.email !== user.email) {
      await supabase.auth.updateUser({ email: dados.email });
    }
  },
}));
