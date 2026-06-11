import { useState, useEffect } from 'react';
import { TopNavBar } from '../components/TopNavBar';
import { BottomNavBar } from '../components/BottomNavBar';
import { ConfirmModal } from '../components/ConfirmModal';
import { useParcelamentosStore } from '../stores/useParcelamentosStore';
import { useCategoriasStore } from '../stores/useCategoriasStore';
import { useCartoesStore } from '../stores/useCartoesStore';
import { useTransacoesStore } from '../stores/useTransacoesStore';
import { formatBRL, formatData } from '../lib/formatters';

export function Parcelamentos() {
  const parcelamentos = useParcelamentosStore((s) => s.parcelamentos);
  const { adicionar, remover } = useParcelamentosStore();
  const categorias = useCategoriasStore((s) => s.categorias);
  const cartoes = useCartoesStore((s) => s.cartoes);
  const transacoes = useTransacoesStore((s) => s.transacoes);

  // UI state
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [confirmarRemoverId, setConfirmarRemoverId] = useState<string | null>(null);

  // Form state
  const [descricao, setDescricao] = useState('');
  const [valorTotal, setValorTotal] = useState('');
  const [totalParcelas, setTotalParcelas] = useState('12');
  const [categoriaId, setCategoriaId] = useState('');
  const [cartaoId, setCartaoId] = useState('');
  const [dataInicio, setDataInicio] = useState(new Date().toISOString().split('T')[0]);

  // Set default category when list loads
  useEffect(() => {
    if (categorias.length > 0 && !categoriaId) {
      setCategoriaId(categorias[0].id);
    }
  }, [categorias, categoriaId]);

  // Set default selected installment if none selected
  useEffect(() => {
    if (parcelamentos.length > 0 && !selectedId) {
      setSelectedId(parcelamentos[0].id);
    } else if (parcelamentos.length === 0) {
      setSelectedId(null);
    }
  }, [parcelamentos, selectedId]);

  const hojeString = new Date().toISOString().split('T')[0];

  // Helper calculations for a parcelamento
  const getParcelamentoStats = (p: typeof parcelamentos[0]) => {
    const pTransacoes = transacoes.filter((t) => t.parcelamentoId === p.id);
    const pagas = pTransacoes.filter((t) => t.data <= hojeString).length;
    const restanteParcelas = Math.max(p.totalParcelas - pagas, 0);
    const restanteValor = restanteParcelas * p.valorParcela;
    const pct = p.totalParcelas > 0 ? Math.round((pagas / p.totalParcelas) * 100) : 0;
    
    return {
      pagas,
      restanteParcelas,
      restanteValor,
      pct,
      transacoes: pTransacoes.sort((a, b) => a.data.localeCompare(b.data)),
    };
  };

  // Global calculations
  const totalRestanteGlobal = parcelamentos.reduce((sum, p) => {
    const stats = getParcelamentoStats(p);
    return sum + stats.restanteValor;
  }, 0);

  const pagamentoMensalGlobal = parcelamentos.reduce((sum, p) => {
    const stats = getParcelamentoStats(p);
    // If there are still unpaid installments, this installment counts for monthly payment
    return stats.restanteParcelas > 0 ? sum + p.valorParcela : sum;
  }, 0);

  const selectedParcelamento = parcelamentos.find((p) => p.id === selectedId);
  const selectedStats = selectedParcelamento ? getParcelamentoStats(selectedParcelamento) : null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!descricao.trim() || !valorTotal || !totalParcelas || !categoriaId || !dataInicio) return;

    adicionar({
      descricao,
      valorTotal: parseFloat(valorTotal) || 0,
      totalParcelas: parseInt(totalParcelas) || 1,
      categoriaId,
      cartaoId: cartaoId || undefined,
      dataInicio,
    });

    // Reset and close form
    setDescricao('');
    setValorTotal('');
    setTotalParcelas('12');
    setCartaoId('');
    setShowForm(false);
  };

  const handleRemover = (id: string) => {
    setConfirmarRemoverId(id);
  };

  const confirmarRemover = () => {
    if (!confirmarRemoverId) return;
    remover(confirmarRemoverId);
    if (selectedId === confirmarRemoverId) setSelectedId(null);
    setConfirmarRemoverId(null);
  };

  return (
    <>
      <TopNavBar />
      <main className="pt-24 pb-36 px-5 max-w-5xl mx-auto">
        {/* Hero Summary */}
        <section className="mb-10">
          <span className="font-label text-xs uppercase tracking-widest text-primary opacity-70">
            Livro de Contas
          </span>
          <h1 className="font-headline text-4xl font-extrabold tracking-tight text-on-surface mt-2 mb-6">
            Plano de Parcelamentos
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Total Restante */}
            <div className="bg-surface-container-lowest p-7 rounded-2xl editorial-shadow relative overflow-hidden border border-outline-variant/15">
              <div className="relative z-10">
                <p className="font-label text-sm text-on-surface-variant mb-1">Total Restante</p>
                <h2 className="font-headline text-3xl font-bold text-primary tracking-tight">
                  {formatBRL(totalRestanteGlobal)}
                </h2>
              </div>
              <div className="absolute -right-4 -bottom-4 opacity-10">
                <span className="material-symbols-outlined text-8xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  payments
                </span>
              </div>
            </div>

            {/* Pagamento Mensal */}
            <div className="bg-surface-container-low p-7 rounded-2xl relative overflow-hidden editorial-shadow">
              <p className="font-label text-sm text-on-surface-variant mb-1">Total das Parcelas deste Mês</p>
              <h2 className="font-headline text-3xl font-bold text-on-surface tracking-tight">
                {formatBRL(pagamentoMensalGlobal)}
              </h2>
              <div className="mt-4 flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-expense animate-pulse" />
                <span className="text-xs font-semibold text-expense">Cobrado ciclicamente</span>
              </div>
            </div>

            {/* Ação */}
            <button
              onClick={() => setShowForm(!showForm)}
              className="primary-gradient p-7 rounded-2xl editorial-shadow flex flex-col justify-center items-center group transition-all active:scale-95 text-on-primary"
            >
              <div className="bg-white/20 p-3 rounded-full mb-3 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-on-primary">
                  {showForm ? 'close' : 'add'}
                </span>
              </div>
              <span className="font-headline text-lg font-bold text-on-primary">
                {showForm ? 'Fechar Formulário' : 'Adicionar Parcela'}
              </span>
            </button>
          </div>
        </section>

        {/* Collapsible Form */}
        {showForm && (
          <section className="mb-10 bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/15 editorial-shadow animate-fade-in">
            <h3 className="font-headline text-xl font-bold text-on-surface mb-6">
              Adicionar Novo Compra Parcelada
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className="block font-label text-xs uppercase font-bold text-outline mb-2">
                    Descrição do Item
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="ex: MacBook Pro M3"
                    className="w-full bg-surface-container-low border-0 ring-1 ring-outline-variant/30 rounded-xl p-3 focus:ring-2 focus:ring-primary text-sm font-medium text-on-surface"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block font-label text-xs uppercase font-bold text-outline mb-2">
                    Valor Total (R$)
                  </label>
                  <input
                    required
                    type="number"
                    step="0.01"
                    min="0.01"
                    placeholder="0,00"
                    className="w-full bg-surface-container-low border-0 ring-1 ring-outline-variant/30 rounded-xl p-3 focus:ring-2 focus:ring-primary text-sm font-medium text-on-surface"
                    value={valorTotal}
                    onChange={(e) => setValorTotal(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block font-label text-xs uppercase font-bold text-outline mb-2">
                    Total de Parcelas
                  </label>
                  <input
                    required
                    type="number"
                    min="1"
                    max="120"
                    placeholder="12"
                    className="w-full bg-surface-container-low border-0 ring-1 ring-outline-variant/30 rounded-xl p-3 focus:ring-2 focus:ring-primary text-sm font-medium text-on-surface"
                    value={totalParcelas}
                    onChange={(e) => setTotalParcelas(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className="block font-label text-xs uppercase font-bold text-outline mb-2">
                    Categoria
                  </label>
                  <select
                    required
                    className="w-full bg-surface-container-low border-0 ring-1 ring-outline-variant/30 rounded-xl p-3 focus:ring-2 focus:ring-primary text-sm text-on-surface appearance-none"
                    value={categoriaId}
                    onChange={(e) => setCategoriaId(e.target.value)}
                  >
                    {categorias.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.nome}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-label text-xs uppercase font-bold text-outline mb-2">
                    Cartão de Crédito (Opcional)
                  </label>
                  <select
                    className="w-full bg-surface-container-low border-0 ring-1 ring-outline-variant/30 rounded-xl p-3 focus:ring-2 focus:ring-primary text-sm text-on-surface appearance-none"
                    value={cartaoId}
                    onChange={(e) => setCartaoId(e.target.value)}
                  >
                    <option value="">Dinheiro / PIX / Conta</option>
                    {cartoes.map((card) => (
                      <option key={card.id} value={card.id}>
                        {card.apelido} (**** {card.ultimos4})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-label text-xs uppercase font-bold text-outline mb-2">
                    Data da 1ª Parcela
                  </label>
                  <input
                    required
                    type="date"
                    className="w-full bg-surface-container-low border-0 ring-1 ring-outline-variant/30 rounded-xl p-3 focus:ring-2 focus:ring-primary text-sm font-medium text-on-surface"
                    value={dataInicio}
                    onChange={(e) => setDataInicio(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-3 bg-surface-container-high text-on-surface font-semibold rounded-xl hover:bg-outline-variant/35 transition-colors text-sm"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 primary-gradient text-on-primary font-bold rounded-xl editorial-shadow active:scale-95 hover:opacity-95 transition-all text-sm"
                >
                  Confirmar Parcelamento
                </button>
              </div>
            </form>
          </section>
        )}

        {/* Grid Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Lista (coluna esquerda) */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center justify-between px-1">
              <h3 className="font-headline text-xl font-bold text-on-surface">Compras Ativas</h3>
              <span className="text-xs text-on-surface-variant font-medium">
                {parcelamentos.length} parcelamentos registrados
              </span>
            </div>

            {parcelamentos.length === 0 ? (
              <div className="bg-surface-container-lowest p-10 rounded-2xl text-center border border-outline-variant/15 editorial-shadow">
                <span className="material-symbols-outlined text-4xl text-outline mb-3">horizontal_split</span>
                <p className="text-sm font-semibold text-on-surface">Nenhum parcelamento ativo</p>
                <p className="text-xs text-on-surface-variant mt-1">
                  Clique em "Adicionar Parcela" para criar seu primeiro plano.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {parcelamentos.map((p) => {
                  const cat = categorias.find((c) => c.id === p.categoriaId);
                  const stats = getParcelamentoStats(p);
                  const isSelected = p.id === selectedId;

                  return (
                    <div
                      key={p.id}
                      onClick={() => setSelectedId(p.id)}
                      className={`bg-surface-container-lowest p-6 rounded-2xl border transition-all cursor-pointer editorial-shadow hover:bg-surface-container-low ${
                        isSelected ? 'border-primary ring-1 ring-primary' : 'border-outline-variant/15'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-5">
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 ${
                              cat?.corFundo || 'bg-primary-fixed'
                            }`}
                          >
                            <span
                              className={`material-symbols-outlined text-3xl ${
                                cat?.corTexto || 'text-primary'
                              }`}
                            >
                              {cat?.icone || 'shopping_bag'}
                            </span>
                          </div>
                          <div>
                            <h4 className="font-headline text-base font-bold text-on-surface">
                              {p.descricao}
                            </h4>
                            <p className="text-on-surface-variant text-sm font-medium">
                              {cat?.nome || 'Sem Categoria'}
                              {p.cartaoId && ' · Cartão'}
                            </p>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="font-headline font-bold text-base text-on-surface">
                            {formatBRL(p.valorTotal)}
                          </p>
                          <span
                            className={`font-label text-xs font-bold px-2 py-1 rounded-lg ${
                              stats.restanteParcelas === 0
                                ? 'bg-outline/20 text-on-surface-variant'
                                : 'bg-primary-fixed text-primary'
                            }`}
                          >
                            {stats.pagas} / {p.totalParcelas} Meses
                          </span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-bold text-on-surface-variant">
                          <span>Progresso</span>
                          <span>{stats.pct}%</span>
                        </div>
                        <div className="h-3 w-full bg-surface-container rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${
                              stats.restanteParcelas === 0 ? 'bg-outline' : 'primary-gradient'
                            }`}
                            style={{ width: `${stats.pct}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Detalhes (coluna direita) */}
          <aside className="lg:col-span-5">
            {selectedParcelamento && selectedStats ? (
              <div className="bg-surface-container-low rounded-2xl p-7 sticky top-24 editorial-shadow">
                <div className="flex items-center justify-between mb-7">
                  <h3 className="font-headline text-xl font-bold text-on-surface">Detalhes</h3>
                  <button
                    onClick={() => handleRemover(selectedParcelamento.id)}
                    className="w-9 h-9 flex items-center justify-center text-outline hover:text-error hover:bg-error-container rounded-xl transition-colors"
                    title="Excluir parcelamento"
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>

                {/* Progresso Circular */}
                <div className="text-center mb-7">
                  <div className="inline-flex items-center justify-center relative mb-4">
                    <svg className="w-32 h-32 transform -rotate-90">
                      <circle
                        className="text-surface-container-highest"
                        cx="64"
                        cy="64"
                        fill="transparent"
                        r="58"
                        stroke="currentColor"
                        strokeWidth="8"
                      />
                      <circle
                        className="text-primary"
                        cx="64"
                        cy="64"
                        fill="transparent"
                        r="58"
                        stroke="currentColor"
                        strokeDasharray="364.4"
                        strokeDashoffset={364.4 - (364.4 * selectedStats.pagas) / selectedParcelamento.totalParcelas}
                        strokeWidth="8"
                        strokeLinecap="round"
                        style={{ transition: 'stroke-dashoffset 0.5s ease-in-out' }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl font-bold text-primary">
                        {selectedStats.pagas}/{selectedParcelamento.totalParcelas}
                      </span>
                      <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-tighter">
                        Pago
                      </span>
                    </div>
                  </div>
                  <h4 className="font-headline text-xl font-bold text-on-surface">
                    {selectedParcelamento.descricao}
                  </h4>
                  <p className="text-on-surface-variant text-sm">
                    Valor da Parcela: {formatBRL(selectedParcelamento.valorParcela)}
                  </p>
                </div>

                {/* Histórico */}
                <div className="space-y-5">
                  <h5 className="font-label text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                    Cronograma de Parcelas
                  </h5>
                  <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                    {selectedStats.transacoes.map((t, idx) => {
                      const isPaid = t.data <= hojeString;
                      return (
                        <div
                          key={t.id}
                          className={`flex items-center justify-between p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/5 ${
                            !isPaid ? 'opacity-65' : ''
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className={`material-symbols-outlined ${
                                isPaid ? 'text-income' : 'text-outline-variant'
                              }`}
                              style={{ fontVariationSettings: isPaid ? "'FILL' 1" : undefined }}
                            >
                              {isPaid ? 'check_circle' : 'schedule'}
                            </span>
                            <div>
                              <p className="text-sm font-bold text-on-surface">Parcela #{idx + 1}</p>
                              <p className="text-[10px] text-on-surface-variant">
                                {isPaid ? 'Cobrada em' : 'Vencimento:'} {formatData(t.data)}
                              </p>
                            </div>
                          </div>
                          <p className="text-sm font-bold text-on-surface">
                            - {formatBRL(t.valor)}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-surface-container-low rounded-2xl p-7 sticky top-24 text-center editorial-shadow">
                <span className="material-symbols-outlined text-4xl text-outline mb-2">info</span>
                <p className="text-sm font-semibold text-on-surface">Nenhum detalhe selecionado</p>
                <p className="text-xs text-on-surface-variant mt-1">
                  Selecione uma compra da lista para ver o cronograma.
                </p>
              </div>
            )}
          </aside>
        </div>
      </main>
      <BottomNavBar />

      <ConfirmModal
        aberto={!!confirmarRemoverId}
        titulo="Excluir parcelamento"
        mensagem="Todas as transações associadas a este parcelamento serão removidas. Esta ação não pode ser desfeita."
        labelConfirmar="Excluir"
        variante="perigo"
        onConfirmar={confirmarRemover}
        onCancelar={() => setConfirmarRemoverId(null)}
      />
    </>
  );
}

