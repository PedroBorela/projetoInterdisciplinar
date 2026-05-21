import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { parseISO, getMonth, getYear, subMonths } from 'date-fns';
import { TopNavBar } from '../components/TopNavBar';
import { BottomNavBar } from '../components/BottomNavBar';
import { EmptyState } from '../components/EmptyState';
import { useTransacoesStore } from '../stores/useTransacoesStore';
import { useCategoriasStore } from '../stores/useCategoriasStore';
import { useConfigStore } from '../stores/useConfigStore';
import { useLimitesStore } from '../stores/useLimitesStore';
import {
  calcularSaldo,
  calcularTotaisMes,
  calcularPorCategoria,
  calcularFluxoSemanal,
  calcularVariacaoMes,
} from '../lib/calculators';
import { formatBRL, formatData, nomeMes } from '../lib/formatters';

export function Relatorios() {
  const navigate = useNavigate();
  const transacoes = useTransacoesStore((s) => s.transacoes);
  const categorias = useCategoriasStore((s) => s.categorias);
  const limites = useLimitesStore((s) => s.limites);
  const { saldoInicial } = useConfigStore();

  // Determinar todos os meses únicos que contêm transações
  const uniqueMonths = useMemo(() => {
    const months = new Set<string>();
    const today = new Date();
    // Garante que o mês atual esteja sempre presente como opção
    const currentKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;
    months.add(currentKey);

    transacoes.forEach((t) => {
      try {
        const d = parseISO(t.data);
        const key = `${getYear(d)}-${String(getMonth(d) + 1).padStart(2, '0')}`;
        months.add(key);
      } catch {
        // ignora datas inválidas
      }
    });

    return Array.from(months).sort((a, b) => b.localeCompare(a));
  }, [transacoes]);

  // Mês selecionado no dropdown (padrão = mês atual / mais recente)
  const [selectedMonthKey, setSelectedMonthKey] = useState<string>(uniqueMonths[0] || '');

  const { ano, mes } = useMemo(() => {
    if (!selectedMonthKey) {
      const today = new Date();
      return { ano: today.getFullYear(), mes: today.getMonth() + 1 };
    }
    const [y, m] = selectedMonthKey.split('-');
    return { ano: parseInt(y), mes: parseInt(m) };
  }, [selectedMonthKey]);

  // Cálculos do mês selecionado
  const totaisMes = useMemo(() => {
    return calcularTotaisMes(transacoes, ano, mes);
  }, [transacoes, ano, mes]);

  // Patrimônio Total (Saldo acumulado geral até o momento)
  const patrimonioTotal = useMemo(() => {
    return calcularSaldo(transacoes, saldoInicial);
  }, [transacoes, saldoInicial]);

  // Variação percentual de despesas versus mês anterior
  const variacaoDespesas = useMemo(() => {
    return calcularVariacaoMes(transacoes, ano, mes, 'despesa');
  }, [transacoes, ano, mes]);

  // Previsão de Economia (Soma das economias possíveis em categorias com limite)
  const previsaoEconomia = useMemo(() => {
    // Para categorias que têm limites definidos, calcula quanto sobrou de orçamento.
    // Isso representa o potencial de economia do mês.
    let potencial = 0;
    const despesasDoMes = transacoes.filter(
      (t) => t.tipo === 'despesa' && getYear(parseISO(t.data)) === ano && getMonth(parseISO(t.data)) + 1 === mes
    );

    categorias.forEach((cat) => {
      const limite = limites.find((l) => l.categoriaId === cat.id && l.mes === mes && l.ano === ano);
      if (limite && limite.valorLimite > 0) {
        const gasto = despesasDoMes.filter((t) => t.categoriaId === cat.id).reduce((s, t) => s + t.valor, 0);
        const sobrou = limite.valorLimite - gasto;
        if (sobrou > 0) {
          potencial += sobrou;
        }
      }
    });

    return potencial > 0 ? potencial : Math.max(totaisMes.receitas * 0.15, 100); // fallback padrão de 15% das receitas
  }, [transacoes, categorias, limites, ano, mes, totaisMes]);

  // Fluxo Semanal
  const fluxoSemanal = useMemo(() => {
    return calcularFluxoSemanal(transacoes, ano, mes);
  }, [transacoes, ano, mes]);

  // Altura máxima para normalizar o gráfico de fluxo semanal
  const maxSemanaValue = useMemo(() => {
    const vals = fluxoSemanal.map((w) => Math.max(w.despesas, w.receitas));
    return Math.max(...vals, 100); // evita divisão por zero
  }, [fluxoSemanal]);

  // Distribuição por categoria
  const categoriasDistribuidas = useMemo(() => {
    return calcularPorCategoria(transacoes, categorias, ano, mes);
  }, [transacoes, categorias, ano, mes]);

  const totalGastoCategorias = useMemo(() => {
    return categoriasDistribuidas.reduce((s, c) => s + c.total, 0);
  }, [categoriasDistribuidas]);

  // Análise Trimestral (últimos 4 meses)
  const analiseTrimestral = useMemo(() => {
    const result = [];
    let current = new Date(ano, mes - 1, 1);

    for (let i = 0; i < 4; i++) {
      const y = current.getFullYear();
      const m = current.getMonth() + 1;
      const t = calcularTotaisMes(transacoes, y, m);
      const mesLabel = current.toLocaleDateString('pt-BR', { month: 'short', year: '2-digit' });

      result.push({
        label: mesLabel,
        receitas: t.receitas,
        despesas: t.despesas,
        liquido: t.receitas - t.despesas,
        ano: y,
        mes: m,
      });

      current = subMonths(current, 1);
    }

    return result.reverse(); // colocar em ordem cronológica
  }, [transacoes, ano, mes]);

  // Altura máxima para normalizar o gráfico trimestral
  const maxTrimestreValue = useMemo(() => {
    const vals = analiseTrimestral.map((q) => Math.max(q.receitas, q.despesas));
    return Math.max(...vals, 100);
  }, [analiseTrimestral]);

  // Formata chave YYYY-MM para exibição
  function formatMonthKey(key: string) {
    if (!key) return '';
    const [y, m] = key.split('-');
    const label = nomeMes(parseInt(m), parseInt(y));
    return label.charAt(0).toUpperCase() + label.slice(1);
  }

  // Trigger impressão PDF
  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <TopNavBar />
      <main className="max-w-7xl mx-auto px-5 pt-24 pb-36 space-y-8 print:pt-6 print:pb-6 print:px-0">
        {/* Header */}
        <section className="flex flex-col md:flex-row md:items-end justify-between gap-6 print:flex-row print:items-center">
          <div className="space-y-1">
            <h1 className="text-4xl font-headline font-extrabold tracking-tight text-on-surface print:text-2xl">
              Inteligência Financeira
            </h1>
            <p className="text-on-surface-variant font-medium text-sm print:hidden">
              Curadoria do seu patrimônio com insights orientados a dados.
            </p>
          </div>
          <div className="relative print:hidden">
            <select
              value={selectedMonthKey}
              onChange={(e) => setSelectedMonthKey(e.target.value)}
              className="appearance-none bg-surface-container-low border-0 ring-1 ring-outline-variant/30 rounded-xl px-6 py-3 pr-12 font-semibold text-primary focus:ring-2 focus:ring-primary cursor-pointer transition-all text-sm"
            >
              {uniqueMonths.map((key) => (
                <option key={key} value={key}>
                  {formatMonthKey(key)}
                </option>
              ))}
            </select>
            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-primary">
              expand_more
            </span>
          </div>
          <div className="hidden print:block font-bold text-sm text-outline">
            Período: {formatMonthKey(selectedMonthKey)}
          </div>
        </section>

        {/* Bento de Stats */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card Patrimônio */}
          <div className="md:col-span-2 primary-gradient p-8 rounded-2xl text-on-primary flex flex-col justify-between overflow-hidden relative editorial-shadow border border-white/5">
            <div className="relative z-10">
              <div className="text-on-primary/80 text-[10px] font-bold uppercase tracking-widest mb-2">Patrimônio Líquido Acumulado</div>
              <div className="text-5xl font-headline font-extrabold tracking-tighter mb-4">
                {formatBRL(patrimonioTotal)}
              </div>
              <div className="flex items-center gap-2 bg-white/15 w-fit px-3 py-1.5 rounded-full backdrop-blur-md">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                  {variacaoDespesas >= 0 ? 'trending_up' : 'trending_down'}
                </span>
                <span className="text-[10px] font-bold">
                  Despesas do mês: {variacaoDespesas >= 0 ? '+' : ''}
                  {variacaoDespesas.toFixed(1)}% vs mês anterior
                </span>
              </div>
            </div>
            <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          </div>

          {/* Previsão de Economia */}
          <div className="bg-income-container p-8 rounded-2xl flex flex-col justify-between editorial-shadow border border-income/10 print:bg-surface-container-low print:border-outline-variant/20">
            <div>
              <span className="material-symbols-outlined text-income text-3xl mb-4 block" style={{ fontVariationSettings: "'FILL' 1" }}>
                auto_awesome
              </span>
              <h3 className="text-income font-bold text-lg leading-tight">Margem de Poupança</h3>
              <p className="text-on-surface-variant text-sm mt-2 leading-relaxed font-medium">
                Você tem o potencial de economizar{' '}
                <span className="font-bold text-income">{formatBRL(previsaoEconomia)}</span> neste ciclo respeitando os limites estabelecidos.
              </p>
            </div>
            <button
              onClick={() => navigate('/limites-gastos')}
              className="mt-6 bg-income text-on-primary py-3 rounded-xl font-bold text-xs transition-all hover:opacity-90 active:scale-95 print:hidden"
            >
              Ajustar Orçamentos
            </button>
          </div>
        </section>

        {/* Gráficos */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Fluxo de Gastos Mensal (Semanal) */}
          <div className="lg:col-span-8 bg-surface-container-lowest p-8 rounded-2xl editorial-shadow border border-outline-variant/15 print:border-outline-variant/30 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-lg font-headline font-bold text-on-surface">Fluxo de Gastos do Mês</h2>
              <div className="flex gap-4">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-income" />
                  <span className="text-[10px] font-bold text-on-surface-variant uppercase">Receitas</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                  <span className="text-[10px] font-bold text-on-surface-variant uppercase">Despesas</span>
                </div>
              </div>
            </div>

            <div className="h-[260px] w-full flex items-end justify-between gap-6 pb-6 pt-4">
              {fluxoSemanal.map((w) => {
                const depPct = (w.despesas / maxSemanaValue) * 100;
                const recPct = (w.receitas / maxSemanaValue) * 100;

                return (
                  <div key={w.label} className="flex-1 h-full flex flex-col justify-end items-center group relative">
                    <div className="flex w-full items-end justify-center gap-2 h-full">
                      {/* Barra Receitas */}
                      <div className="flex-1 flex flex-col justify-end h-full">
                        <div
                          className="w-full bg-income/20 hover:bg-income/30 transition-all rounded-t-md relative flex justify-center group/tooltip"
                          style={{ height: `${recPct}%` }}
                        >
                          <div className="absolute -top-8 bg-on-surface text-white text-[9px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover/tooltip:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                            + {formatBRL(w.receitas)}
                          </div>
                        </div>
                      </div>
                      {/* Barra Despesas */}
                      <div className="flex-1 flex flex-col justify-end h-full">
                        <div
                          className="w-full primary-gradient hover:opacity-90 transition-all rounded-t-md relative flex justify-center group/tooltip"
                          style={{ height: `${depPct}%` }}
                        >
                          <div className="absolute -top-8 bg-on-surface text-white text-[9px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover/tooltip:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                            - {formatBRL(w.despesas)}
                          </div>
                        </div>
                      </div>
                    </div>
                    <span className="absolute -bottom-6 text-[10px] text-outline font-bold">{w.label === 'S4' ? 'Semana 4+' : `Semana ${w.label.slice(1)}`}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Distribuição por Categoria */}
          <div className="lg:col-span-4 bg-surface-container-lowest p-8 rounded-2xl editorial-shadow border border-outline-variant/15 print:border-outline-variant/30 flex flex-col">
            <h2 className="text-lg font-headline font-bold text-on-surface mb-6">Distribuição</h2>

            {categoriasDistribuidas.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
                <span className="material-symbols-outlined text-outline-variant text-4xl mb-2">pie_chart_outlined</span>
                <p className="text-xs text-on-surface-variant font-medium">Nenhuma despesa registrada neste mês.</p>
              </div>
            ) : (
              <>
                <div className="relative flex-1 flex flex-col justify-center items-center py-4">
                  <div className="w-36 h-36 rounded-full border-[14px] border-surface-container border-t-primary relative flex items-center justify-center shadow-inner">
                    <div className="text-center p-2">
                      <div className="text-xl font-headline font-extrabold text-on-surface tracking-tight">
                        {formatBRL(totalGastoCategorias)}
                      </div>
                      <div className="text-[9px] uppercase font-bold text-outline tracking-wider mt-0.5">Total Gasto</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mt-4 overflow-y-auto max-h-[160px] no-scrollbar">
                  {categoriasDistribuidas.map((item) => {
                    const pct = totalGastoCategorias > 0 ? (item.total / totalGastoCategorias) * 100 : 0;
                    return (
                      <div key={item.categoria.id} className="flex items-center justify-between gap-4 text-xs font-semibold">
                        <div className="flex items-center gap-2 truncate">
                          <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${item.categoria.cor}`} />
                          <span className="text-on-surface truncate font-medium">{item.categoria.nome}</span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-on-surface-variant text-[10px]">{formatBRL(item.total)}</span>
                          <span className="text-primary font-bold">{pct.toFixed(0)}%</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>

          {/* Comparativo Trimestral Receitas x Despesas */}
          <div className="lg:col-span-12 bg-surface-container-low p-8 rounded-2xl editorial-shadow border border-outline-variant/10 print:border-outline-variant/20 overflow-hidden">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <div>
                <h2 className="text-lg font-headline font-bold text-on-surface">Desempenho no Período</h2>
                <p className="text-xs text-on-surface-variant font-medium">Comparativo dos últimos 4 meses monitorados</p>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 md:gap-8">
              {analiseTrimestral.map((q) => {
                const recHeight = (q.receitas / maxTrimestreValue) * 100;
                const depHeight = (q.despesas / maxTrimestreValue) * 100;
                const isPositive = q.liquido >= 0;

                return (
                  <div key={q.label} className="space-y-4 flex flex-col justify-end h-full pt-4">
                    <div className="h-32 flex items-end gap-1.5 md:gap-3 justify-center">
                      {/* Receitas */}
                      <div
                        className="w-1/3 bg-income rounded-t-sm hover:opacity-90 transition-all relative flex justify-center group"
                        style={{ height: `${recHeight}%` }}
                      >
                        <div className="absolute -top-8 bg-on-surface text-white text-[9px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                          + {formatBRL(q.receitas)}
                        </div>
                      </div>
                      {/* Despesas */}
                      <div
                        className="w-1/3 bg-expense rounded-t-sm hover:opacity-90 transition-all relative flex justify-center group"
                        style={{ height: `${depHeight}%` }}
                      >
                        <div className="absolute -top-8 bg-on-surface text-white text-[9px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                          - {formatBRL(q.despesas)}
                        </div>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-[10px] font-bold text-outline uppercase">{q.label}</div>
                      <div className={`text-xs font-bold mt-1 ${isPositive ? 'text-income' : 'text-expense'}`}>
                        {isPositive ? '+' : ''} {formatBRL(q.liquido)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex gap-6 mt-6 border-t border-outline-variant/10 pt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-income" />
                <span className="text-[10px] font-bold text-on-surface-variant uppercase">Receitas</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-expense" />
                <span className="text-[10px] font-bold text-on-surface-variant uppercase">Despesas</span>
              </div>
            </div>
          </div>
        </section>

        {/* Transações do Livro-Caixa */}
        <section className="bg-surface-container-lowest rounded-2xl p-8 border border-outline-variant/15 print:border-outline-variant/30 editorial-shadow">
          <h2 className="text-lg font-headline font-bold text-on-surface mb-6">Lançamentos do Período</h2>

          {totaisMes.transacoes.length === 0 ? (
            <EmptyState
              icone="history"
              titulo="Nenhuma transação"
              descricao="Nenhum ganho ou gasto registrado no mês selecionado."
              acao={{
                label: 'Adicionar Transação',
                onClick: () => navigate('/nova-transacao'),
              }}
            />
          ) : (
            <>
              <div className="space-y-2">
                {totaisMes.transacoes.map((t) => {
                  const cat = categorias.find((c) => c.id === t.categoriaId);
                  const isReceita = t.tipo === 'receita';

                  return (
                    <div
                      key={t.id}
                      onClick={() => navigate(`/nova-transacao?id=${t.id}`)}
                      className="flex items-center justify-between p-4 rounded-xl hover:bg-surface-container-low transition-all cursor-pointer border border-outline-variant/5 bg-surface-container-low/20"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-11 h-11 rounded-xl ${cat?.corFundo || 'bg-surface-container-high'} flex items-center justify-center shrink-0`}>
                          <span className={`material-symbols-outlined text-xl ${cat?.corTexto || 'text-on-surface-variant'}`} style={{ fontVariationSettings: "'FILL' 1" }}>
                            {cat?.icone || 'receipt'}
                          </span>
                        </div>
                        <div>
                          <div className="font-bold text-on-surface text-sm">{t.descricao}</div>
                          <div className="text-[10px] text-outline font-semibold uppercase tracking-wider mt-0.5">
                            {formatData(t.data)} • {cat?.nome || 'Geral'}
                          </div>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className={`font-headline font-bold text-sm ${isReceita ? 'text-income' : 'text-expense'}`}>
                          {isReceita ? '+' : '-'} {formatBRL(t.valor)}
                        </div>
                        <div className="text-[9px] font-bold text-outline uppercase tracking-wider mt-0.5">Confirmado</div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <button
                onClick={handlePrint}
                className="w-full mt-6 py-4 border-2 border-dashed border-outline-variant text-on-surface-variant font-bold rounded-xl hover:bg-surface-container-low transition-all text-sm cursor-pointer print:hidden"
              >
                Gerar Relatório Financeiro (PDF / Imprimir)
              </button>
            </>
          )}
        </section>
      </main>
      <BottomNavBar />
    </>
  );
}
