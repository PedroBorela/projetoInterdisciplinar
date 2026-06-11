import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TopNavBar } from '../components/TopNavBar';
import { BottomNavBar } from '../components/BottomNavBar';
import { ConfirmModal } from '../components/ConfirmModal';
import { useCartoesStore } from '../stores/useCartoesStore';
import { useTransacoesStore } from '../stores/useTransacoesStore';
import { formatBRL } from '../lib/formatters';

const BACKGROUND_GRADIENTS = [
  { value: 'bg-gradient-to-br from-slate-900 to-slate-700', label: 'Midnight Obsidian' },
  { value: 'bg-gradient-to-br from-indigo-700 to-purple-600', label: 'Indigo Sunset' },
  { value: 'bg-gradient-to-br from-emerald-600 to-teal-500', label: 'Emerald Dream' },
  { value: 'bg-gradient-to-br from-rose-600 to-red-500', label: 'Crimson Flame' },
  { value: 'bg-gradient-to-br from-amber-600 to-orange-500', label: 'Solar Amber' },
];

export function CartoesDeCredito() {
  const navigate = useNavigate();
  const formRef = useRef<HTMLDivElement>(null);

  const cartoes = useCartoesStore((s) => s.cartoes);
  const { adicionar, editar, remover } = useCartoesStore();
  const transacoes = useTransacoesStore((s) => s.transacoes);

  // UI state
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [confirmarRemoverId, setConfirmarRemoverId] = useState<string | null>(null);

  // Form states
  const [apelido, setApelido] = useState('');
  const [bandeira, setBandeira] = useState('Visa');
  const [ultimos4, setUltimos4] = useState('');
  const [limite, setLimite] = useState('');
  const [diaFechamento, setDiaFechamento] = useState('10');
  const [diaVencimento, setDiaVencimento] = useState('20');
  const [gradiente, setGradiente] = useState(BACKGROUND_GRADIENTS[0].value);

  // Calculations
  const getCardUtilizado = (cardId: string) => {
    return transacoes
      .filter((t) => t.tipo === 'despesa' && t.meioPagamento === 'cartao' && t.cartaoId === cardId)
      .reduce((acc, t) => acc + t.valor, 0);
  };

  const totalLimiteGlobal = cartoes.reduce((sum, c) => sum + c.limite, 0);
  const totalUtilizadoGlobal = cartoes.reduce((sum, c) => sum + getCardUtilizado(c.id), 0);
  const totalDisponivelGlobal = Math.max(totalLimiteGlobal - totalUtilizadoGlobal, 0);
  const percentualGlobal = totalLimiteGlobal > 0 ? (totalUtilizadoGlobal / totalLimiteGlobal) * 100 : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!apelido.trim() || !ultimos4 || !limite || !diaFechamento || !diaVencimento) return;

    const parsedLimite = parseFloat(limite) || 0;
    const parsedFechamento = parseInt(diaFechamento) || 10;
    const parsedVencimento = parseInt(diaVencimento) || 20;

    const data = {
      apelido,
      bandeira,
      ultimos4: ultimos4.slice(-4),
      limite: parsedLimite,
      diaFechamento: parsedFechamento,
      diaVencimento: parsedVencimento,
      gradiente,
      principal: cartoes.length === 0, // make primary if first card
    };

    if (editingId) {
      editar(editingId, data);
      setEditingId(null);
    } else {
      adicionar(data);
    }

    // Reset and close
    resetForm();
    setShowForm(false);
  };

  const handleEditClick = (c: typeof cartoes[0], e: React.MouseEvent) => {
    e.stopPropagation(); // prevent card click mapping to fatura details
    setEditingId(c.id);
    setApelido(c.apelido);
    setBandeira(c.bandeira);
    setUltimos4(c.ultimos4);
    setLimite(c.limite.toString());
    setDiaFechamento(c.diaFechamento.toString());
    setDiaVencimento(c.diaVencimento.toString());
    setGradiente(c.gradiente);

    setShowForm(true);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleRemover = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setConfirmarRemoverId(id);
  };

  const confirmarRemover = () => {
    if (!confirmarRemoverId) return;
    remover(confirmarRemoverId);
    if (editingId === confirmarRemoverId) resetForm();
    setConfirmarRemoverId(null);
  };

  const resetForm = () => {
    setEditingId(null);
    setApelido('');
    setBandeira('Visa');
    setUltimos4('');
    setLimite('');
    setDiaFechamento('10');
    setDiaVencimento('20');
    setGradiente(BACKGROUND_GRADIENTS[0].value);
  };

  const handleToggleForm = () => {
    if (showForm) {
      resetForm();
    }
    setShowForm(!showForm);
  };

  const getBandeiraIcon = (brand: string) => {
    switch (brand.toLowerCase()) {
      case 'visa':
        return 'credit_card';
      case 'mastercard':
        return 'payments';
      case 'elo':
        return 'token';
      case 'amex':
        return 'contactless';
      default:
        return 'credit_card';
    }
  };

  return (
    <>
      <TopNavBar />
      <main className="pt-24 pb-36 px-5 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="text-primary font-bold uppercase tracking-widest text-[10px] mb-2 block">
              LisoControl
            </span>
            <h1 className="text-4xl font-extrabold font-headline tracking-tight text-on-surface">
              Seus Cartões
            </h1>
            <p className="text-on-surface-variant mt-2 max-w-md text-sm font-medium">
              Gerencie seus cartões de crédito, limites de gastos e faturas.
            </p>
          </div>
          <button
            onClick={handleToggleForm}
            className="flex items-center gap-2 px-6 py-3 primary-gradient text-on-primary rounded-xl font-bold editorial-shadow active:scale-95 hover:opacity-95 transition-all shrink-0 self-start md:self-auto text-sm"
          >
            <span className="material-symbols-outlined text-lg">
              {showForm ? 'close' : 'add_card'}
            </span>
            <span>{showForm ? 'Fechar Form' : 'Adicionar Cartão'}</span>
          </button>
        </div>

        {/* Form Editor */}
        {showForm && (
          <section
            ref={formRef}
            className="mb-10 bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/15 editorial-shadow animate-fade-in"
          >
            <h3 className="font-headline text-xl font-bold text-on-surface mb-6">
              {editingId ? 'Editar Cartão' : 'Cadastrar Novo Cartão'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className="block font-label text-xs uppercase font-bold text-outline mb-2">
                    Apelido do Cartão
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="ex: Nubank Roxo"
                    className="w-full bg-surface-container-low border-0 ring-1 ring-outline-variant/30 rounded-xl p-3 focus:ring-2 focus:ring-primary text-sm font-medium text-on-surface"
                    value={apelido}
                    onChange={(e) => setApelido(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block font-label text-xs uppercase font-bold text-outline mb-2">
                    Bandeira
                  </label>
                  <select
                    className="w-full bg-surface-container-low border-0 ring-1 ring-outline-variant/30 rounded-xl p-3 focus:ring-2 focus:ring-primary text-sm text-on-surface appearance-none"
                    value={bandeira}
                    onChange={(e) => setBandeira(e.target.value)}
                  >
                    <option value="Visa">Visa</option>
                    <option value="Mastercard">Mastercard</option>
                    <option value="Elo">Elo</option>
                    <option value="Amex">American Express</option>
                  </select>
                </div>
                <div>
                  <label className="block font-label text-xs uppercase font-bold text-outline mb-2">
                    Últimos 4 Dígitos
                  </label>
                  <input
                    required
                    type="text"
                    maxLength={4}
                    pattern="\d{4}"
                    placeholder="1234"
                    className="w-full bg-surface-container-low border-0 ring-1 ring-outline-variant/30 rounded-xl p-3 focus:ring-2 focus:ring-primary text-sm font-mono text-on-surface"
                    value={ultimos4}
                    onChange={(e) => setUltimos4(e.target.value.replace(/\D/g, ''))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                <div className="md:col-span-2">
                  <label className="block font-label text-xs uppercase font-bold text-outline mb-2">
                    Limite do Cartão (R$)
                  </label>
                  <input
                    required
                    type="number"
                    step="0.01"
                    min="1"
                    placeholder="5.000,00"
                    className="w-full bg-surface-container-low border-0 ring-1 ring-outline-variant/30 rounded-xl p-3 focus:ring-2 focus:ring-primary text-sm font-medium text-on-surface"
                    value={limite}
                    onChange={(e) => setLimite(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block font-label text-xs uppercase font-bold text-outline mb-2">
                    Dia Fechamento
                  </label>
                  <input
                    required
                    type="number"
                    min={1}
                    max={31}
                    className="w-full bg-surface-container-low border-0 ring-1 ring-outline-variant/30 rounded-xl p-3 focus:ring-2 focus:ring-primary text-sm font-medium text-on-surface"
                    value={diaFechamento}
                    onChange={(e) => setDiaFechamento(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block font-label text-xs uppercase font-bold text-outline mb-2">
                    Dia Vencimento
                  </label>
                  <input
                    required
                    type="number"
                    min={1}
                    max={31}
                    className="w-full bg-surface-container-low border-0 ring-1 ring-outline-variant/30 rounded-xl p-3 focus:ring-2 focus:ring-primary text-sm font-medium text-on-surface"
                    value={diaVencimento}
                    onChange={(e) => setDiaVencimento(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block font-label text-xs uppercase font-bold text-outline mb-3">
                  Estilo Visual (Cor do Cartão)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {BACKGROUND_GRADIENTS.map((bg) => (
                    <button
                      key={bg.value}
                      type="button"
                      onClick={() => setGradiente(bg.value)}
                      className={`h-12 rounded-xl text-xs font-bold text-white p-2 border-2 transition-all text-center flex items-center justify-center ${
                        bg.value
                      } ${gradiente === bg.value ? 'border-primary ring-2 ring-primary/40' : 'border-transparent'}`}
                    >
                      {bg.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 bg-surface-container-high text-on-surface font-semibold rounded-xl hover:bg-outline-variant/35 transition-colors text-sm"
                >
                  Limpar
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 primary-gradient text-on-primary font-bold rounded-xl editorial-shadow active:scale-95 hover:opacity-95 transition-all text-sm"
                >
                  {editingId ? 'Salvar Alterações' : 'Cadastrar Cartão'}
                </button>
              </div>
            </form>
          </section>
        )}

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cartoes.map((c) => {
            return (
              <div
                key={c.id}
                onClick={() => navigate(`/fatura?cartaoId=${c.id}`)}
                className={`relative flex flex-col justify-between aspect-[1.58/1] p-7 rounded-2xl text-white overflow-hidden editorial-shadow hover:scale-[1.02] active:scale-[0.99] transition-all cursor-pointer ${
                  c.gradiente || 'bg-gradient-to-br from-slate-900 to-slate-700'
                }`}
              >
                <div className="flex justify-between items-start relative z-10">
                  <div>
                    <h2 className="text-lg font-headline font-bold tracking-tight">{c.apelido}</h2>
                    <p className="text-xs uppercase tracking-widest opacity-60 mt-1">
                      {c.bandeira} Virtual
                    </p>
                  </div>
                  <span className="material-symbols-outlined text-4xl opacity-80">
                    {getBandeiraIcon(c.bandeira)}
                  </span>
                </div>

                <div className="mt-auto relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-9 w-12 rounded-lg bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                      <div className="w-6 h-4 bg-white/30 rounded-sm" />
                    </div>
                    <p className="text-base font-mono tracking-[0.18em] opacity-90">
                      •••• •••• •••• {c.ultimos4}
                    </p>
                  </div>

                  <div className="flex justify-between items-end">
                    <div className="flex gap-8">
                      <div>
                        <span className="text-[9px] uppercase tracking-tighter opacity-60 block">
                          Fechamento
                        </span>
                        <span className="font-bold text-sm">Dia {c.diaFechamento}</span>
                      </div>
                      <div>
                        <span className="text-[9px] uppercase tracking-tighter opacity-60 block">
                          Vencimento
                        </span>
                        <span className="font-bold text-sm">Dia {c.diaVencimento}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => handleEditClick(c, e)}
                        className="card-glass hover:bg-white/30 transition-all w-9 h-9 flex items-center justify-center"
                        title="Editar"
                      >
                        <span className="material-symbols-outlined text-sm">edit</span>
                      </button>
                      <button
                        onClick={(e) => handleRemover(c.id, e)}
                        className="card-glass hover:bg-red-500/40 transition-all w-9 h-9 flex items-center justify-center"
                        title="Deletar"
                      >
                        <span className="material-symbols-outlined text-sm">delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Dash Placeholder */}
          <div
            onClick={() => {
              resetForm();
              setShowForm(true);
              setTimeout(() => {
                formRef.current?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="flex flex-col items-center justify-center aspect-[1.58/1] p-8 rounded-2xl border-2 border-dashed border-outline-variant bg-surface-container-low/50 hover:bg-surface-container-low transition-all cursor-pointer group"
          >
            <div className="w-16 h-16 rounded-full bg-surface-container-lowest flex items-center justify-center editorial-shadow group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-3xl text-primary font-bold">add</span>
            </div>
            <p className="mt-4 font-headline font-bold text-on-surface-variant text-sm">
              Adicionar outro cartão
            </p>
          </div>
        </div>

        {/* Info Bento */}
        {cartoes.length > 0 && (
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="md:col-span-2 p-7 rounded-2xl bg-surface-container-lowest editorial-shadow">
              <h3 className="font-headline font-bold text-xl mb-4 text-on-surface">
                Limite Total Consolidado
              </h3>
              <div className="flex items-end gap-2 mb-5">
                <span className="text-4xl font-headline font-extrabold text-primary tracking-tighter">
                  {formatBRL(totalLimiteGlobal)}
                </span>
                <span className="text-on-surface-variant pb-1 font-medium text-sm">/ limite total</span>
              </div>
              <div className="w-full h-3 bg-surface-container rounded-full overflow-hidden">
                <div
                  className="h-full primary-gradient rounded-full transition-all duration-500"
                  style={{ width: `${percentualGlobal}%` }}
                />
              </div>
              <div className="flex justify-between mt-3">
                <span className="text-xs font-semibold text-on-surface-variant">
                  {formatBRL(totalUtilizadoGlobal)} utilizados
                </span>
                <span className="text-xs font-bold text-primary">
                  {Math.round(percentualGlobal)}% de ocupação (Disponível: {formatBRL(totalDisponivelGlobal)})
                </span>
              </div>
            </div>

            <div className="p-7 rounded-2xl bg-income-container/40 border border-income/10 editorial-shadow flex flex-col justify-between">
              <span
                className="material-symbols-outlined text-income text-3xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                verified_user
              </span>
              <div className="mt-4">
                <h4 className="font-headline font-bold text-income text-base">Controle de Crítico</h4>
                <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">
                  Gerencie o fluxo de faturas e evite juros. Veja os detalhes consolidados das faturas.
                </p>
                <Link
                  to="/fatura"
                  className="inline-flex items-center gap-1 mt-4 text-income font-bold text-xs hover:underline underline-offset-2"
                >
                  Ver fatura geral
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
      <BottomNavBar />

      <ConfirmModal
        aberto={!!confirmarRemoverId}
        titulo="Remover cartão"
        mensagem="Deseja realmente remover este cartão? As transações vinculadas continuarão no histórico."
        labelConfirmar="Remover"
        variante="perigo"
        onConfirmar={confirmarRemover}
        onCancelar={() => setConfirmarRemoverId(null)}
      />
    </>
  );
}
