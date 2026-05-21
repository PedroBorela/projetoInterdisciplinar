import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TopNavBar } from '../components/TopNavBar';
import { BottomNavBar } from '../components/BottomNavBar';
import { useConfigStore } from '../stores/useConfigStore';
import { useTransacoesStore } from '../stores/useTransacoesStore';
import { useCategoriasStore } from '../stores/useCategoriasStore';
import { useCartoesStore } from '../stores/useCartoesStore';

export function Configuracoes() {
  const navigate = useNavigate();
  const { nomeUsuario, emailUsuario, saldoInicial, moeda, darkMode, atualizar } = useConfigStore();
  const transacoes = useTransacoesStore((s) => s.transacoes);
  const categorias = useCategoriasStore((s) => s.categorias);
  const cartoes = useCartoesStore((s) => s.cartoes);

  // States para edição do perfil
  const [isEditing, setIsEditing] = useState(false);
  const [nome, setNome] = useState(nomeUsuario);
  const [email, setEmail] = useState(emailUsuario);

  // State para o saldo inicial
  const [saldo, setSaldo] = useState(saldoInicial.toString());

  // Sempre sincronizar se mudar no store
  useEffect(() => {
    setNome(nomeUsuario);
    setEmail(emailUsuario);
  }, [nomeUsuario, emailUsuario]);

  useEffect(() => {
    setSaldo(saldoInicial.toString());
  }, [saldoInicial]);

  const handleStartEdit = () => {
    setNome(nomeUsuario);
    setEmail(emailUsuario);
    setIsEditing(true);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome.trim() || !email.trim()) return;
    atualizar({ nomeUsuario: nome, emailUsuario: email });
    setIsEditing(false);
  };

  const handleSaveSaldo = () => {
    const parsed = parseFloat(saldo) || 0;
    atualizar({ saldoInicial: parsed });
    alert('Saldo inicial atualizado com sucesso!');
  };

  const handleToggleDarkMode = () => {
    atualizar({ darkMode: !darkMode });
  };

  const handleExportarCSV = () => {
    if (transacoes.length === 0) {
      alert('Nenhuma transação encontrada para exportar.');
      return;
    }

    const headers = [
      'ID',
      'Tipo',
      'Descrição',
      'Valor (R$)',
      'Categoria',
      'Data',
      'Meio de Pagamento',
      'Cartão Vinc.',
      'Criado Em',
    ];

    const rows = transacoes.map((t) => {
      const cat = categorias.find((c) => c.id === t.categoriaId)?.nome || 'Sem categoria';
      const card = t.cartaoId ? cartoes.find((c) => c.id === t.cartaoId)?.apelido || 'Cartão' : 'N/A';
      return [
        t.id,
        t.tipo === 'receita' ? 'Receita' : 'Despesa',
        t.descricao,
        t.valor.toFixed(2),
        cat,
        t.data,
        t.meioPagamento,
        card,
        t.criadoEm,
      ];
    });

    const csvContent =
      '\uFEFF' +
      [headers.join(';'), ...rows.map((r) => r.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(';'))].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `lisocontrol_dados_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleLogout = () => {
    if (confirm('Deseja realmente sair da conta? (Sessão simulada)')) {
      navigate('/');
    }
  };

  return (
    <>
      <TopNavBar />
      <main className="pt-24 pb-36 px-5 max-w-2xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-extrabold font-headline tracking-tight text-on-surface mb-1.5">
            Configurações
          </h1>
          <p className="text-on-surface-variant font-medium text-sm">Personalize seu espaço financeiro.</p>
        </header>

        {/* Hub de Ferramentas */}
        <section className="mb-8">
          <p className="text-xs font-bold uppercase tracking-widest text-outline mb-4">Ferramentas</p>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
            {(
              [
                { to: '/cartoes', icon: 'credit_card', label: 'Cartões' },
                { to: '/limites-gastos', icon: 'speed', label: 'Limites' },
                { to: '/parcelamentos', icon: 'horizontal_split', label: 'Parcelas' },
                { to: '/ocorrencias-fixas', icon: 'sync', label: 'Recorrentes' },
                { to: '/relatorios', icon: 'bar_chart', label: 'Relatórios' },
              ] as const
            ).map(({ to, icon, label }) => (
              <Link
                key={to}
                to={to}
                className="bg-surface-container-lowest rounded-2xl p-4 flex flex-col items-center gap-2 hover:bg-primary-fixed transition-all group editorial-shadow text-center border border-outline-variant/5"
              >
                <span
                  className="material-symbols-outlined text-primary text-2xl group-hover:scale-110 transition-transform"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  {icon}
                </span>
                <span className="text-[10px] font-bold text-on-surface uppercase tracking-wide leading-tight">
                  {label}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Perfil */}
        <section className="mb-8">
          <div className="bg-surface-container-lowest rounded-2xl p-6 editorial-shadow border border-outline-variant/5">
            {isEditing ? (
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <h3 className="font-headline text-lg font-bold text-on-surface">Editar Dados do Perfil</h3>
                <div>
                  <label className="block text-xs font-bold uppercase text-outline mb-2">Nome Completo</label>
                  <input
                    required
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="w-full bg-surface-container-low border-0 ring-1 ring-outline-variant/30 rounded-xl p-3 focus:ring-2 focus:ring-primary text-sm font-semibold text-on-surface"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-outline mb-2">E-mail</label>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-surface-container-low border-0 ring-1 ring-outline-variant/30 rounded-xl p-3 focus:ring-2 focus:ring-primary text-sm font-semibold text-on-surface"
                  />
                </div>
                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 bg-surface-container-high text-on-surface text-xs font-bold rounded-lg hover:bg-outline-variant/30 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 primary-gradient text-on-primary text-xs font-bold rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Salvar Dados
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex items-center gap-5">
                <div className="relative shrink-0">
                  <div className="w-20 h-20 rounded-full bg-primary-fixed text-primary font-headline text-3xl font-bold flex items-center justify-center ring-4 ring-primary-fixed/40">
                    {nomeUsuario.charAt(0).toUpperCase()}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold font-headline text-on-surface">{nomeUsuario}</h3>
                  <p className="text-sm text-on-surface-variant mb-3">{emailUsuario}</p>
                  <button
                    onClick={handleStartEdit}
                    className="text-xs font-bold text-primary py-2 px-5 bg-primary-fixed rounded-full hover:opacity-85 transition-opacity cursor-pointer"
                  >
                    Editar Perfil
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Preferências */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          {/* Moeda & Saldo */}
          <div className="bg-surface-container-low rounded-2xl p-6 space-y-6 editorial-shadow border border-outline-variant/5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-3">
                Moeda do App
              </label>
              <div className="flex items-center justify-between bg-surface-container-lowest p-3 rounded-xl border border-outline-variant/5">
                <div className="flex items-center gap-3">
                  <span className="p-2 bg-primary-fixed text-primary rounded-lg font-bold text-sm">R$</span>
                  <span className="font-bold text-on-surface text-sm">Real Brasileiro ({moeda})</span>
                </div>
                <span className="material-symbols-outlined text-outline text-lg">lock</span>
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-3">
                Saldo Inicial
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    className="w-full bg-surface-container-lowest border-0 ring-1 ring-outline-variant/30 rounded-xl py-3 px-4 font-headline text-lg font-bold focus:ring-2 focus:ring-primary text-on-surface"
                    type="number"
                    step="0.01"
                    value={saldo}
                    onChange={(e) => setSaldo(e.target.value)}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-outline font-bold text-sm">R$</span>
                </div>
                <button
                  onClick={handleSaveSaldo}
                  className="px-4 py-3 primary-gradient text-on-primary font-bold rounded-xl text-sm shrink-0 active:scale-95 transition-transform"
                >
                  Salvar
                </button>
              </div>
              <p className="text-[10px] text-on-surface-variant mt-2 px-1 font-semibold">
                Este saldo será seu ponto de partida para o fluxo do Dashboard.
              </p>
            </div>
          </div>

          {/* Aparência & Dados */}
          <div className="bg-surface-container-low rounded-2xl p-6 flex flex-col justify-between editorial-shadow border border-outline-variant/5">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h4 className="font-bold text-on-surface text-sm">Modo Escuro</h4>
                <p className="text-[11px] text-on-surface-variant font-medium mt-0.5">Mudar para o visual escuro</p>
              </div>
              <div
                onClick={handleToggleDarkMode}
                className={`w-12 h-6 rounded-full p-1 flex items-center cursor-pointer transition-colors duration-300 ${
                  darkMode ? 'bg-primary justify-end' : 'bg-outline-variant justify-start'
                }`}
              >
                <div className="w-4 h-4 bg-white rounded-full shadow-sm" />
              </div>
            </div>
            <div className="space-y-2">
              <button
                onClick={handleExportarCSV}
                className="w-full flex items-center justify-between p-4 bg-surface-container-lowest rounded-xl hover:bg-primary-fixed/40 transition-colors border border-outline-variant/5 text-left cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-xl">download</span>
                  <span className="font-bold text-xs text-on-surface">Exportar Livro-Caixa</span>
                </div>
                <span className="text-[9px] font-extrabold text-primary bg-primary-fixed px-2 py-0.5 rounded uppercase">
                  CSV
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Zona de Perigo */}
        <section className="pt-6 border-t border-outline-variant/20">
          <h3 className="text-xs font-bold uppercase tracking-widest text-error mb-4">Zona de Perigo</h3>
          <div className="bg-error-container/10 rounded-2xl p-1 border border-error/10">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-between p-5 text-error font-bold rounded-xl hover:bg-error-container/20 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 bg-error-container text-on-error-container rounded-xl">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                    logout
                  </span>
                </div>
                <span className="text-sm">Sair da Conta</span>
              </div>
              <span className="material-symbols-outlined text-lg">chevron_right</span>
            </button>
          </div>
        </section>

        <div className="text-center mt-10">
          <p className="text-[10px] font-bold text-outline-variant uppercase tracking-[0.2em]">
            LisoControl v1.0.0
          </p>
        </div>
      </main>
      <BottomNavBar />
    </>
  );
}
