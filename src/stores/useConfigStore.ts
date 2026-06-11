import { create } from 'zustand';
import { supabase } from '../lib/supabase';

interface ConfigState {
  saldoInicial: number;
  moeda: string;
  darkMode: boolean;
  nomeUsuario: string;
  emailUsuario: string;
  loading: boolean;
  carregar: () => Promise<void>;
  atualizar: (dados: Partial<{ saldoInicial: number; moeda: string; darkMode: boolean; nomeUsuario: string; emailUsuario: string }>) => Promise<void>;
}

export const useConfigStore = create<ConfigState>()((set, get) => ({
  saldoInicial: 0,
  moeda: 'BRL',
  darkMode: false,
  nomeUsuario: 'Usuário',
  emailUsuario: '',
  loading: false,

  carregar: async () => {
    set({ loading: true });
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { set({ loading: false }); return; }

    const { data } = await supabase
      .from('user_config')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (data) {
      set({
        saldoInicial: Number(data.saldo_inicial),
        moeda: data.moeda,
        darkMode: data.dark_mode,
        nomeUsuario: data.nome ?? user.user_metadata?.nome ?? 'Usuário',
        emailUsuario: user.email ?? '',
        loading: false,
      });
    } else {
      // Primeira entrada: cria o registro de config para o usuário
      const nome = user.user_metadata?.nome ?? 'Usuário';
      await supabase.from('user_config').upsert({
        user_id: user.id,
        nome,
        saldo_inicial: 0,
        moeda: 'BRL',
        dark_mode: false,
      });
      set({
        nomeUsuario: nome,
        emailUsuario: user.email ?? '',
        loading: false,
      });
    }

    // Aplicar dark mode
    const { darkMode } = get();
    document.documentElement.classList.toggle('dark', darkMode);
  },

  atualizar: async (dados) => {
    set((s) => ({ ...s, ...dados }));

    if (dados.darkMode !== undefined) {
      document.documentElement.classList.toggle('dark', dados.darkMode);
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const update: Record<string, unknown> = {};
    if (dados.saldoInicial !== undefined) update.saldo_inicial = dados.saldoInicial;
    if (dados.moeda !== undefined) update.moeda = dados.moeda;
    if (dados.darkMode !== undefined) update.dark_mode = dados.darkMode;
    if (dados.nomeUsuario !== undefined) update.nome = dados.nomeUsuario;

    if (Object.keys(update).length > 0) {
      await supabase
        .from('user_config')
        .upsert({ user_id: user.id, ...update });
    }
  },
}));
