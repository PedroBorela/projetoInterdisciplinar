import { useState, useEffect } from 'react';
import writeXlsxFile, { type Cell } from 'write-excel-file/browser';
import { Link, useNavigate } from 'react-router-dom';
import { TopNavBar } from '../components/TopNavBar';
import { BottomNavBar } from '../components/BottomNavBar';
import { ConfirmModal } from '../components/ConfirmModal';
import { Toast } from '../components/Toast';
import { useConfigStore } from '../stores/useConfigStore';
import { useAuthStore } from '../stores/useAuthStore';
import { useTransacoesStore } from '../stores/useTransacoesStore';
import { useCategoriasStore } from '../stores/useCategoriasStore';
import { useCartoesStore } from '../stores/useCartoesStore';
import { useOcorrenciasStore } from '../stores/useOcorrenciasStore';
import { useParcelamentosStore } from '../stores/useParcelamentosStore';

export function Configuracoes() {
  const navigate = useNavigate();
  const logoutFn = useAuthStore((s) => s.logout);
  const { nomeUsuario, emailUsuario, saldoInicial, moeda, atualizar } = useConfigStore();
  const transacoes = useTransacoesStore((s) => s.transacoes);
  const categorias = useCategoriasStore((s) => s.categorias);
  const cartoes = useCartoesStore((s) => s.cartoes);
  const ocorrencias = useOcorrenciasStore((s) => s.ocorrencias);
  const parcelamentos = useParcelamentosStore((s) => s.parcelamentos);

  // States para edição do perfil
  const [isEditing, setIsEditing] = useState(false);
  const [nome, setNome] = useState(nomeUsuario);
  const [email, setEmail] = useState(emailUsuario);

  // State para o saldo inicial
  const [saldo, setSaldo] = useState(saldoInicial.toString());

  // Modal de confirmação de logout
  const [confirmarLogout, setConfirmarLogout] = useState(false);

  // Toast de feedback
  const [toast, setToast] = useState<{ tipo: 'sucesso' | 'erro'; mensagem: string } | null>(null);

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
    setToast({ tipo: 'sucesso', mensagem: 'Saldo inicial atualizado com sucesso!' });
  };

  const handleExportarCSV = async () => {
    if (transacoes.length === 0) {
      setToast({ tipo: 'erro', mensagem: 'Nenhuma transação encontrada para exportar.' });
      return;
    }

    const HEADER_BG = '#4800B2';
    const HEADER_FG = '#FFFFFF';
    const ROW_ALT = '#F5F0FF';
    const ROW_BASE = '#FFFFFF';

    const headerStyle = {
      fontWeight: 'bold' as const,
      backgroundColor: HEADER_BG,
      color: HEADER_FG,
      align: 'center' as const,
      borderColor: '#CCCCCC',
    };

    const headerRow: Cell[] = [
      'Data de Registro',
      'Data de Competência',
      'Tipo',
      'Descrição',
      'Valor (R$)',
      'Categoria',
      'Meio de Pagamento',
      'Cartão Vinculado',
      'Origem do Lançamento',
    ].map((value) => ({ value, type: String, ...headerStyle } as Cell));

    const dataRows: Cell[][] = [...transacoes].sort((a, b) => a.data.localeCompare(b.data)).map((t, i) => {
      const cat = categorias.find((c) => c.id === t.categoriaId)?.nome || 'Sem categoria';
      const card = t.cartaoId ? cartoes.find((c) => c.id === t.cartaoId)?.apelido || 'Cartão' : 'N/A';

      let meioPg = 'Outro';
      if (t.meioPagamento === 'cartao') meioPg = 'Cartão de Crédito';
      else if (t.meioPagamento === 'dinheiro') meioPg = 'Dinheiro';
      else if (t.meioPagamento === 'digital') meioPg = 'Digital (Pix/Débito)';

      let origem = 'Normal';
      if (t.parcelamentoId) {
        const parc = parcelamentos.find((p) => p.id === t.parcelamentoId);
        origem = parc ? `Parcelado (${parc.descricao})` : 'Parcelado';
      } else if (t.ocorrenciaId) {
        const oco = ocorrencias.find((o) => o.id === t.ocorrenciaId);
        origem = oco ? `Fixo/Recorrente (${oco.descricao})` : 'Fixo/Recorrente';
      }

      const dataCompetencia = new Date(t.data + 'T12:00:00');
      const dataCriacao = t.criadoEm ? new Date(t.criadoEm) : dataCompetencia;
      const bg = i % 2 === 0 ? ROW_BASE : ROW_ALT;
      const s = { backgroundColor: bg, borderColor: '#CCCCCC' };

      return [
        { value: dataCriacao, type: Date, format: 'dd/mm/yyyy', ...s } as Cell,
        { value: dataCompetencia, type: Date, format: 'dd/mm/yyyy', ...s } as Cell,
        { value: t.tipo === 'receita' ? 'Receita' : 'Despesa', type: String, ...s } as Cell,
        { value: t.descricao, type: String, ...s } as Cell,
        { value: t.valor, type: Number, format: '#,##0.00', ...s } as Cell,
        { value: cat, type: String, ...s } as Cell,
        { value: meioPg, type: String, ...s } as Cell,
        { value: card, type: String, ...s } as Cell,
        { value: origem, type: String, ...s } as Cell,
      ] as Cell[];
    });

    const columns = [
      { width: 18 }, { width: 18 }, { width: 10 }, { width: 36 },
      { width: 14 }, { width: 20 }, { width: 24 }, { width: 18 }, { width: 32 },
    ];

    const result = writeXlsxFile([headerRow, ...dataRows], {
      columns,
      sheet: 'Livro-Caixa',
    });
    const blob = await result.toBlob();

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `lisocontrol_livro_caixa_${new Date().toISOString().slice(0, 10)}.xlsx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleLogout = () => {
    setConfirmarLogout(true);
  };

  const confirmarLogoutFn = async () => {
    setConfirmarLogout(false);
    await logoutFn();
    navigate('/');
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

          {/* Dados */}
          <div className="bg-surface-container-low rounded-2xl p-6 flex flex-col justify-center editorial-shadow border border-outline-variant/5">
            <h4 className="font-bold text-on-surface text-sm mb-1">Exportar Dados</h4>
            <p className="text-[11px] text-on-surface-variant font-medium mb-5">Exporte seu livro-caixa completo para planilha.</p>
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
                  XLSX
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

      <ConfirmModal
        aberto={confirmarLogout}
        titulo="Sair da conta"
        mensagem="Deseja realmente sair da conta?"
        labelConfirmar="Sair"
        variante="perigo"
        onConfirmar={confirmarLogoutFn}
        onCancelar={() => setConfirmarLogout(false)}
      />

      <Toast
        visivel={!!toast}
        tipo={toast?.tipo ?? 'sucesso'}
        mensagem={toast?.mensagem ?? ''}
        onFechar={() => setToast(null)}
      />
    </>
  );
}
