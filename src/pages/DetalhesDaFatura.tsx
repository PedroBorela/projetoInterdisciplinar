import { useState, useMemo } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { parseISO, getMonth, getYear, getDate } from 'date-fns';
import { TopNavBar } from '../components/TopNavBar';
import { BottomNavBar } from '../components/BottomNavBar';
import { EmptyState } from '../components/EmptyState';
import { useCartoesStore } from '../stores/useCartoesStore';
import { useTransacoesStore } from '../stores/useTransacoesStore';
import { useCategoriasStore } from '../stores/useCategoriasStore';
import { formatBRL, formatData, nomeMes, nomeMesCurto } from '../lib/formatters';

export function DetalhesDaFatura() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const cartaoId = searchParams.get('cartaoId');

  const cartoes = useCartoesStore((s) => s.cartoes);
  const { editar } = useCartoesStore();
  const transacoes = useTransacoesStore((s) => s.transacoes);
  const categorias = useCategoriasStore((s) => s.categorias);

  // Selecionar cartão ativo
  const activeCard = useMemo(() => {
    if (cartoes.length === 0) return null;
    return cartoes.find((c) => c.id === cartaoId) || cartoes.find((c) => c.principal) || cartoes[0];
  }, [cartoes, cartaoId]);

  // Função para descobrir qual ciclo/fatura (YYYY-MM) a transação pertence
  const getInvoiceCycle = (dateStr: string, diaFechamento: number) => {
    try {
      const d = parseISO(dateStr);
      const day = getDate(d);
      let month = getMonth(d) + 1;
      let year = getYear(d);

      if (day > diaFechamento) {
        month += 1;
        if (month > 12) {
          month = 1;
          year += 1;
        }
      }
      return `${year}-${String(month).padStart(2, '0')}`;
    } catch {
      const today = new Date();
      return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;
    }
  };

  // Calcular ciclos de faturas possíveis e transações do cartão ativo
  const { cycleTransactionsMap, uniqueCycles, currentCycleKey } = useMemo(() => {
    if (!activeCard) {
      return { cycleTransactionsMap: {}, uniqueCycles: [], currentCycleKey: '' };
    }

    const cardTransactions = transacoes.filter(
      (t) => t.tipo === 'despesa' && t.meioPagamento === 'cartao' && t.cartaoId === activeCard.id
    );

    const map: Record<string, typeof transacoes> = {};

    // Adiciona o ciclo atual baseado no dia de hoje para sempre exibir algo
    const today = new Date();
    const currentKey = getInvoiceCycle(today.toISOString().split('T')[0], activeCard.diaFechamento);
    map[currentKey] = [];

    cardTransactions.forEach((t) => {
      const cycleKey = getInvoiceCycle(t.data, activeCard.diaFechamento);
      if (!map[cycleKey]) {
        map[cycleKey] = [];
      }
      map[cycleKey].push(t);
    });

    // Ordenar as chaves de ciclo em ordem decrescente (mais recente primeiro)
    const sortedCycles = Object.keys(map).sort((a, b) => b.localeCompare(a));

    return {
      cycleTransactionsMap: map,
      uniqueCycles: sortedCycles,
      currentCycleKey: currentKey,
    };
  }, [activeCard, transacoes]);

  // Ciclo visualizado no momento (padrão = ciclo atual ou o mais recente disponível)
  const [selectedCycleKey, setSelectedCycleKey] = useState<string>('');

  const activeCycleKey = selectedCycleKey || currentCycleKey || uniqueCycles[0] || '';

  // Transações da fatura selecionada
  const cycleTransactions = useMemo(() => {
    if (!activeCycleKey) return [];
    return cycleTransactionsMap[activeCycleKey] || [];
  }, [cycleTransactionsMap, activeCycleKey]);

  // Cálculos da fatura exibida
  const totalFatura = useMemo(() => {
    return cycleTransactions.reduce((sum, t) => sum + t.valor, 0);
  }, [cycleTransactions]);

  const isPago = useMemo(() => {
    if (!activeCard) return false;
    return (activeCard.faturasPagas || []).includes(activeCycleKey);
  }, [activeCard, activeCycleKey]);

  // Datas de fechamento e vencimento para a fatura ativa
  const invoiceDates = useMemo(() => {
    if (!activeCard || !activeCycleKey) return null;
    const [yearStr, monthStr] = activeCycleKey.split('-');
    const year = parseInt(yearStr);
    const month = parseInt(monthStr);

    // Fechamento no mês da fatura
    const dataFechamento = new Date(year, month - 1, activeCard.diaFechamento);

    // Vencimento no mês da fatura (ou mês seguinte se vencimento < fechamento)
    let vencimentoMonth = month;
    let vencimentoYear = year;
    if (activeCard.diaVencimento < activeCard.diaFechamento) {
      vencimentoMonth += 1;
      if (vencimentoMonth > 12) {
        vencimentoMonth = 1;
        vencimentoYear += 1;
      }
    }
    const dataVencimento = new Date(vencimentoYear, vencimentoMonth - 1, activeCard.diaVencimento);

    return {
      fechamento: dataFechamento.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }),
      vencimento: dataVencimento.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }),
    };
  }, [activeCard, activeCycleKey]);

  // Média de gastos nos ciclos deste cartão para insights
  const insightText = useMemo(() => {
    if (!activeCard) return '';
    const totals = Object.keys(cycleTransactionsMap)
      .filter((k) => k !== activeCycleKey) // desconsidera o ciclo ativo para a média histórica
      .map((k) => (cycleTransactionsMap[k] || []).reduce((s, t) => s + t.valor, 0));

    const mediaHistorica = totals.length > 0 ? totals.reduce((s, v) => s + v, 0) / totals.length : 0;

    if (mediaHistorica === 0) {
      return `Esta fatura representa R$ ${totalFatura.toFixed(2)} em gastos acumulados. Mantenha o foco em não estourar o limite!`;
    }

    const diferenca = mediaHistorica - totalFatura;
    if (diferenca > 0) {
      return `Você gastou R$ ${formatBRL(diferenca)} a menos do que a média dos seus ciclos anteriores. Ótimo trabalho de economia!`;
    } else {
      return `Você gastou R$ ${formatBRL(Math.abs(diferenca))} a mais do que a média dos seus ciclos anteriores. Atenção ao orçamento.`;
    }
  }, [activeCard, cycleTransactionsMap, activeCycleKey, totalFatura]);

  // Ação de pagar fatura
  const handlePagarFatura = () => {
    if (!activeCard || !activeCycleKey || isPago) return;
    if (confirm(`Deseja marcar a fatura de ${formatCycleKey(activeCycleKey)} no valor de ${formatBRL(totalFatura)} como PAGA?`)) {
      const faturasPagas = activeCard.faturasPagas || [];
      editar(activeCard.id, {
        faturasPagas: [...faturasPagas, activeCycleKey],
      });
    }
  };

  // Exportar transações da fatura selecionada para CSV
  const handleExportarCSV = () => {
    if (!activeCard || cycleTransactions.length === 0) return;
    const headers = ['Data', 'Descrição', 'Categoria', 'Valor (R$)'];
    const rows = cycleTransactions.map((t) => {
      const catName = categorias.find((c) => c.id === t.categoriaId)?.nome || 'Sem categoria';
      return [t.data, t.descricao, catName, t.valor.toFixed(2)];
    });

    const csvContent = '\uFEFF' + [headers.join(';'), ...rows.map((r) => r.join(';'))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `fatura_${activeCard.apelido.replace(/\s+/g, '_')}_${activeCycleKey}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Formata chave YYYY-MM para "Mês AAAA"
  function formatCycleKey(key: string) {
    if (!key) return '';
    const [yearStr, monthStr] = key.split('-');
    const year = parseInt(yearStr);
    const month = parseInt(monthStr);
    const label = nomeMes(month, year);
    return label.charAt(0).toUpperCase() + label.slice(1);
  }

  // Se não houver cartões cadastrados
  if (!activeCard) {
    return (
      <>
        <TopNavBar />
        <main className="pt-28 pb-36 px-5 max-w-4xl mx-auto flex flex-col justify-center items-center min-h-[50vh]">
          <EmptyState
            icone="credit_card_off"
            titulo="Nenhum cartão cadastrado"
            descricao="Você precisa cadastrar pelo menos um cartão de crédito para acessar os detalhes da fatura."
            acao={{
              label: 'Cadastrar Cartão',
              onClick: () => navigate('/cartoes'),
            }}
          />
        </main>
        <BottomNavBar />
      </>
    );
  }

  const percentualLimite = activeCard.limite > 0 ? (totalFatura / activeCard.limite) * 100 : 0;

  return (
    <>
      <TopNavBar />
      <main className="pt-24 pb-36 px-5 max-w-5xl mx-auto">
        {/* Card Selector / Switcher */}
        <section className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-xl">credit_card</span>
            <label className="text-sm font-bold text-outline uppercase tracking-wider">Visualizando Fatura de:</label>
            <select
              value={activeCard.id}
              onChange={(e) => setSearchParams({ cartaoId: e.target.value })}
              className="bg-surface-container-low border-0 ring-1 ring-outline-variant/30 text-on-surface text-sm font-bold rounded-xl px-4 py-2 focus:ring-2 focus:ring-primary cursor-pointer"
            >
              {cartoes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.apelido} (•••• {c.ultimos4})
                </option>
              ))}
            </select>
          </div>
          {uniqueCycles.length > 1 && (
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-outline text-lg">calendar_month</span>
              <select
                value={activeCycleKey}
                onChange={(e) => setSelectedCycleKey(e.target.value)}
                className="bg-surface-container-low border-0 ring-1 ring-outline-variant/30 text-on-surface text-sm font-bold rounded-xl px-4 py-2 focus:ring-2 focus:ring-primary cursor-pointer"
              >
                {uniqueCycles.map((key) => (
                  <option key={key} value={key}>
                    {formatCycleKey(key)}
                  </option>
                ))}
              </select>
            </div>
          )}
        </section>

        {/* Hero — Fatura Atual */}
        <section className="mb-10 bg-surface-container-lowest rounded-2xl p-8 border border-outline-variant/10 editorial-shadow">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <p className="text-xs font-semibold text-primary uppercase tracking-widest">
                  Ciclo de {formatCycleKey(activeCycleKey)}
                </p>
                {isPago ? (
                  <span className="bg-income/10 text-income text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 border border-income/20">
                    <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    PAGA
                  </span>
                ) : (
                  <span className="bg-expense/10 text-expense text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 border border-expense/20">
                    <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>error</span>
                    EM ABERTO
                  </span>
                )}
              </div>
              <h1 className="font-headline text-[3.2rem] leading-none font-extrabold text-on-surface tracking-tight">
                {formatBRL(totalFatura)}
              </h1>
            </div>
            {invoiceDates && (
              <div className="flex gap-4">
                <div className="bg-surface-container-low px-6 py-4 rounded-xl flex flex-col editorial-shadow border border-outline-variant/10">
                  <span className="text-[10px] uppercase font-bold text-outline tracking-wider mb-1">Fechamento</span>
                  <span className="font-headline font-bold text-on-surface text-sm">{invoiceDates.fechamento}</span>
                </div>
                <div className="bg-surface-container-low px-6 py-4 rounded-xl flex flex-col editorial-shadow border border-outline-variant/10">
                  <span className="text-[10px] uppercase font-bold text-outline tracking-wider mb-1">Vencimento</span>
                  <span className="font-headline font-bold text-on-surface text-sm">{invoiceDates.vencimento}</span>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Bento de Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Saúde dos Gastos */}
          <div className="md:col-span-2 bg-surface-container-lowest p-8 rounded-2xl relative overflow-hidden group editorial-shadow border border-outline-variant/10">
            <div className="relative z-10">
              <h3 className="font-headline text-lg font-bold mb-5 text-on-surface">Limite Utilizado do Cartão</h3>
              <div className="flex items-center gap-4 mb-3">
                <div className="h-5 flex-1 bg-surface-container-high rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${percentualLimite > 90 ? 'bg-expense' : percentualLimite > 60 ? 'bg-warning' : 'bg-income'}`}
                    style={{ width: `${Math.min(percentualLimite, 100)}%` }}
                  />
                </div>
                <span className={`font-headline font-bold whitespace-nowrap text-sm ${percentualLimite > 90 ? 'text-expense' : percentualLimite > 60 ? 'text-warning' : 'text-income'}`}>
                  {percentualLimite.toFixed(1)}% do limite
                </span>
              </div>
              <p className="text-sm text-on-surface-variant max-w-lg leading-relaxed mt-4 font-medium">
                {insightText}
              </p>
            </div>
            <div className="absolute -right-12 -bottom-12 opacity-[0.03] group-hover:scale-110 transition-transform duration-700 pointer-events-none">
              <span className="material-symbols-outlined text-[12rem]">analytics</span>
            </div>
          </div>

          {/* Quitar Saldo */}
          <div className={`p-8 rounded-2xl flex flex-col justify-between text-white editorial-shadow transition-colors ${isPago ? 'bg-gradient-to-br from-emerald-600 to-teal-500' : 'primary-gradient'}`}>
            <div>
              <span className="material-symbols-outlined mb-4 block" style={{ fontVariationSettings: "'FILL' 1" }}>
                {isPago ? 'verified_user' : 'payments'}
              </span>
              <p className="font-headline text-lg font-bold">{isPago ? 'Fatura Quitada' : 'Quitar Saldo'}</p>
              <p className="text-sm opacity-90 mt-1 leading-relaxed">
                {isPago
                  ? 'Esta fatura já foi devidamente quitada e registrada no sistema.'
                  : 'Marque como paga agora para atualizar os registros de faturas.'}
              </p>
            </div>
            {!isPago && totalFatura > 0 ? (
              <button
                onClick={handlePagarFatura}
                className="bg-white text-primary font-bold py-3 px-6 rounded-xl mt-6 hover:scale-[1.02] transition-transform active:scale-95 text-sm"
              >
                Pagar Agora
              </button>
            ) : isPago ? (
              <div className="mt-6 flex items-center gap-2 font-bold text-sm bg-white/10 p-3 rounded-xl border border-white/20 justify-center">
                <span className="material-symbols-outlined text-base">check_circle</span>
                Fatura Paga
              </div>
            ) : (
              <div className="mt-6 text-center text-xs opacity-75 font-semibold">
                Nenhum valor pendente neste ciclo
              </div>
            )}
          </div>
        </div>

        {/* Transações Recentes */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-headline text-xl font-bold text-on-surface">Transações nesta Fatura</h2>
            {cycleTransactions.length > 0 && (
              <button
                onClick={handleExportarCSV}
                className="flex items-center gap-1.5 text-primary font-bold text-sm hover:underline underline-offset-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">download</span>
                Baixar CSV
              </button>
            )}
          </div>

          {cycleTransactions.length === 0 ? (
            <EmptyState
              icone="shopping_cart_checkout"
              titulo="Nenhum lançamento no ciclo"
              descricao={`Não há transações no cartão ${activeCard.apelido} para a fatura de ${formatCycleKey(activeCycleKey)}.`}
              acao={{
                label: 'Adicionar Compra',
                onClick: () => navigate('/nova-transacao'),
              }}
            />
          ) : (
            <div className="bg-surface-container-low rounded-2xl overflow-hidden p-2 editorial-shadow border border-outline-variant/10">
              <div className="space-y-1.5">
                {cycleTransactions.map((t) => {
                  const cat = categorias.find((c) => c.id === t.categoriaId);
                  return (
                    <div
                      key={t.id}
                      onClick={() => navigate(`/nova-transacao?id=${t.id}`)}
                      className="bg-surface-container-lowest p-5 rounded-xl flex items-center justify-between group hover:bg-surface-container-low/70 transition-all cursor-pointer border border-outline-variant/5"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl ${cat?.corFundo || 'bg-surface-container-high'} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}>
                          <span className={`material-symbols-outlined text-2xl ${cat?.corTexto || 'text-on-surface-variant'}`} style={{ fontVariationSettings: "'FILL' 1" }}>
                            {cat?.icone || 'shopping_cart'}
                          </span>
                        </div>
                        <div>
                          <p className="font-bold text-on-surface text-sm">{t.descricao}</p>
                          <p className="text-xs text-outline font-semibold uppercase tracking-wider mt-0.5">
                            {cat?.nome || 'Geral'} • {formatData(t.data)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="font-headline font-extrabold text-expense text-base">
                          - {formatBRL(t.valor)}
                        </p>
                        <p className="text-[10px] text-income font-bold uppercase tracking-wider mt-0.5">Confirmado</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </section>

        {/* Histórico de Faturas */}
        {uniqueCycles.length > 0 && (
          <section>
            <h2 className="font-headline text-xl font-bold mb-6 text-on-surface">Histórico de Faturas</h2>
            <div className="flex overflow-x-auto gap-4 pb-4 no-scrollbar">
              {uniqueCycles.map((key) => {
                const trs = cycleTransactionsMap[key] || [];
                const val = trs.reduce((sum, t) => sum + t.valor, 0);
                const faturaPaga = (activeCard.faturasPagas || []).includes(key);
                const isSelected = activeCycleKey === key;

                return (
                  <div
                    key={key}
                    onClick={() => setSelectedCycleKey(key)}
                    className={`flex-shrink-0 w-60 p-6 rounded-2xl border transition-all cursor-pointer editorial-shadow ${
                      isSelected
                        ? 'bg-surface-container-high border-primary ring-2 ring-primary/20 scale-102'
                        : 'bg-surface-container-lowest border-outline-variant/15 hover:bg-surface-container-low'
                    }`}
                  >
                    <p className="text-[10px] font-bold text-outline uppercase tracking-widest mb-1">
                      {formatCycleKey(key)}
                    </p>
                    <p className="font-headline text-2xl font-bold text-on-surface mb-4">{formatBRL(val)}</p>
                    {faturaPaga ? (
                      <div className="flex items-center text-income gap-1.5 text-xs font-bold">
                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                          check_circle
                        </span>
                        PAGO
                      </div>
                    ) : val > 0 ? (
                      <div className="flex items-center text-expense gap-1.5 text-xs font-bold">
                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                          error
                        </span>
                        ABERTO
                      </div>
                    ) : (
                      <div className="flex items-center text-outline-variant gap-1.5 text-xs font-bold">
                        <span className="material-symbols-outlined text-sm">
                          info
                        </span>
                        SEM GASTOS
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Voltar aos Cartões */}
        <div className="mt-10">
          <Link to="/cartoes" className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:underline underline-offset-2">
            <span className="material-symbols-outlined text-lg">arrow_back</span>
            Voltar aos Cartões
          </Link>
        </div>
      </main>
      <BottomNavBar />
    </>
  );
}
