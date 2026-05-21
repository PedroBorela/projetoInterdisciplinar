import { Link, useNavigate } from 'react-router-dom';
import { TopNavBar } from '../components/TopNavBar';
import { BottomNavBar } from '../components/BottomNavBar';
import { EmptyState } from '../components/EmptyState';
import { useTransacoesStore } from '../stores/useTransacoesStore';
import { useCategoriasStore } from '../stores/useCategoriasStore';
import { useConfigStore } from '../stores/useConfigStore';
import { formatBRL, formatDataRelativa, formatHora } from '../lib/formatters';
import {
  calcularSaldo,
  calcularTotaisMes,
  calcularPorCategoria,
  calcularVariacaoMes,
} from '../lib/calculators';

export function Dashboard() {
  const navigate = useNavigate();
  const transacoes = useTransacoesStore((s) => s.transacoes);
  const categorias = useCategoriasStore((s) => s.categorias);
  const { saldoInicial } = useConfigStore();

  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = hoje.getMonth() + 1;

  const saldo = calcularSaldo(transacoes, saldoInicial);
  const { receitas, despesas } = calcularTotaisMes(transacoes, ano, mes);
  const porCategoria = calcularPorCategoria(transacoes, categorias, ano, mes);
  const variacao = calcularVariacaoMes(transacoes, ano, mes, 'receita');

  const totalGasto = porCategoria.reduce((s, r) => s + r.total, 0);
  const limiteTotal = receitas > 0 ? receitas : 3000; // fallback para R$ 3.000 se não houver receitas
  const percentualGasto = Math.min((totalGasto / limiteTotal) * 100, 100);

  const recentes = [...transacoes]
    .sort((a, b) => new Date(b.criadoEm).getTime() - new Date(a.criadoEm).getTime())
    .slice(0, 5);

  const saudePct = receitas + despesas > 0 ? (receitas / (receitas + despesas)) * 100 : 50;

  function getSaude() {
    if (saudePct >= 60) return { label: 'Estável', cor: 'text-income' };
    if (saudePct >= 40) return { label: 'Atenção', cor: 'text-warning' };
    return { label: 'Crítico', cor: 'text-expense' };
  }
  const saude = getSaude();

  return (
    <>
      <TopNavBar />

      <main className="pt-28 pb-36 px-5 max-w-7xl mx-auto space-y-8">

        {/* Hero — Saldo Total */}
        <section className="relative">
          <div className="primary-gradient rounded-2xl p-8 text-on-primary editorial-shadow flex flex-col md:flex-row md:items-end justify-between gap-6 overflow-hidden relative">
            <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <span className="text-xs font-label font-semibold opacity-70 uppercase tracking-widest">Livro-Caixa · Saldo Total</span>
              <h1 className="text-5xl md:text-6xl font-headline font-extrabold tracking-tighter mt-2 mb-2">
                {formatBRL(saldo)}
              </h1>
              {variacao !== 0 && (
                <div className="flex items-center gap-1.5 text-secondary-fixed">
                  <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>
                    {variacao >= 0 ? 'trending_up' : 'trending_down'}
                  </span>
                  <span className="text-xs font-semibold">
                    {variacao > 0 ? '+' : ''}{variacao.toFixed(1)}% nas receitas este mês
                  </span>
                </div>
              )}
            </div>
            <div className="flex gap-3 relative z-10">
              <Link
                to="/nova-transacao"
                className="px-5 py-2.5 bg-white/20 backdrop-blur-md text-white font-semibold rounded-xl hover:bg-white/30 transition-all text-sm"
              >
                + Nova Transação
              </Link>
              <Link
                to="/relatorios"
                className="px-5 py-2.5 bg-white text-primary font-bold rounded-xl editorial-shadow hover:scale-105 transition-all text-sm"
              >
                Relatórios
              </Link>
            </div>
          </div>
        </section>

        {/* Resumo + Categorias */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-6">

          {/* Resumo Mensal */}
          <div className="md:col-span-4 bg-surface-container-lowest rounded-2xl p-6 editorial-shadow flex flex-col justify-between">
            <h3 className="font-headline font-bold text-lg mb-6 text-on-surface">Resumo Mensal</h3>
            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-income-container rounded-xl flex items-center justify-center text-income shrink-0">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>arrow_downward</span>
                </div>
                <div>
                  <p className="text-xs font-label font-semibold text-on-surface-variant uppercase tracking-wider">Entradas</p>
                  <p className="text-xl font-bold font-headline text-income">+ {formatBRL(receitas)}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-expense-container rounded-xl flex items-center justify-center text-expense shrink-0">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>arrow_upward</span>
                </div>
                <div>
                  <p className="text-xs font-label font-semibold text-on-surface-variant uppercase tracking-wider">Saídas</p>
                  <p className="text-xl font-bold font-headline text-expense">- {formatBRL(despesas)}</p>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-5 border-t border-outline-variant/20">
              <div className="w-full bg-surface-container-high h-2.5 rounded-full overflow-hidden flex">
                <div className="bg-income h-full rounded-full transition-all" style={{ width: `${saudePct}%` }} />
                <div className="bg-expense h-full rounded-full transition-all" style={{ width: `${100 - saudePct}%` }} />
              </div>
              <p className="text-xs mt-2.5 font-semibold text-on-surface-variant">
                Saúde Financeira: <span className={saude.cor}>{saude.label}</span>
              </p>
            </div>
          </div>

          {/* Principais Categorias */}
          <div className="md:col-span-8 bg-surface-container-lowest rounded-2xl p-6 editorial-shadow flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <h3 className="font-headline font-bold text-lg mb-5 text-on-surface">Principais Categorias</h3>
              {porCategoria.length === 0 ? (
                <p className="text-sm text-on-surface-variant">Nenhuma despesa registrada este mês.</p>
              ) : (
                <div className="space-y-3">
                  {porCategoria.slice(0, 4).map(({ categoria, total }) => (
                    <div key={categoria.id} className="flex items-center justify-between p-3.5 bg-surface-container-low rounded-xl hover:bg-surface-container transition-colors">
                      <div className="flex items-center gap-3">
                        <span className={`material-symbols-outlined ${categoria.corTexto}`} style={{ fontVariationSettings: "'FILL' 1" }}>{categoria.icone}</span>
                        <span className="font-medium text-sm text-on-surface">{categoria.nome}</span>
                      </div>
                      <span className="font-bold text-sm text-on-surface">{formatBRL(total)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-col items-center justify-center min-w-[160px]">
              <div className="relative w-36 h-36 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90">
                  <circle className="text-surface-container-high" cx="72" cy="72" fill="transparent" r="60" stroke="currentColor" strokeWidth="12" />
                  <circle
                    className="text-primary"
                    cx="72" cy="72" fill="transparent" r="60"
                    stroke="currentColor"
                    strokeDasharray="377"
                    strokeDashoffset={377 - (377 * percentualGasto) / 100}
                    strokeWidth="14"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute text-center">
                  <p className="text-xs font-label font-semibold text-on-surface-variant">Gasto</p>
                  <p className="text-2xl font-bold font-headline text-on-surface">{Math.round(percentualGasto)}%</p>
                </div>
              </div>
              <p className="mt-4 text-xs font-medium text-center text-on-surface-variant max-w-[140px] leading-relaxed">
                das receitas mensais (ou teto padrão) usadas em despesas
              </p>
            </div>
          </div>
        </section>

        {/* Acesso Rápido */}
        <section>
          <h3 className="font-headline font-bold text-lg mb-5 text-on-surface">Acesso Rápido</h3>
          <div className="grid grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { to: '/calendario', icon: 'calendar_month', label: 'Calendário' },
              { to: '/nova-transacao', icon: 'add_card', label: 'Nova Transação' },
              { to: '/limites-gastos', icon: 'speed', label: 'Limites' },
              { to: '/cartoes', icon: 'credit_card', label: 'Cartões' },
              { to: '/parcelamentos', icon: 'horizontal_split', label: 'Parcelas' },
              { to: '/ocorrencias-fixas', icon: 'sync', label: 'Recorrente' },
            ].map(({ to, icon, label }) => (
              <Link
                key={label}
                to={to}
                className="bg-surface-container-lowest p-5 rounded-2xl hover:bg-primary-fixed hover:shadow-md transition-all group text-center flex flex-col items-center gap-2 editorial-shadow"
              >
                <span className="material-symbols-outlined text-primary text-3xl group-hover:scale-110 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>{icon}</span>
                <span className="text-xs font-semibold text-on-surface leading-tight">{label}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Histórico Recente */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-headline font-bold text-lg text-on-surface">Histórico Recente</h3>
            <Link to="/transacoes" className="text-primary font-bold text-sm hover:underline underline-offset-2">Ver Tudo</Link>
          </div>
          {recentes.length === 0 ? (
            <EmptyState
              icone="receipt_long"
              titulo="Sem transações ainda"
              descricao="Comece adicionando sua primeira transação"
              acao={{ label: 'Adicionar', onClick: () => navigate('/nova-transacao') }}
            />
          ) : (
            <div className="bg-surface-container-lowest rounded-2xl overflow-hidden editorial-shadow divide-y divide-outline-variant/10">
              {recentes.map((t) => {
                const cat = categorias.find((c) => c.id === t.categoriaId);
                return (
                  <Link
                    key={t.id}
                    to="/transacoes"
                    className="px-4 py-4 flex items-center gap-4 hover:bg-surface-container-low transition-colors"
                  >
                    <div className={`w-11 h-11 rounded-xl ${cat?.corFundo ?? 'bg-surface-container'} flex items-center justify-center shrink-0`}>
                      <span className={`material-symbols-outlined text-xl ${cat?.corTexto ?? 'text-on-surface-variant'}`} style={{ fontVariationSettings: "'FILL' 1" }}>
                        {cat?.icone ?? 'receipt'}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm text-on-surface truncate">{t.descricao}</h4>
                      <p className="text-xs text-on-surface-variant mt-0.5">{formatDataRelativa(t.data)}, {formatHora(t.criadoEm)}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className={`font-bold text-sm ${t.tipo === 'receita' ? 'text-income' : 'text-expense'}`}>
                        {t.tipo === 'receita' ? '+' : '-'} {formatBRL(t.valor)}
                      </p>
                      <p className="text-[10px] text-outline uppercase tracking-wide">{cat?.nome ?? ''}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>
      </main>

      {/* FAB */}
      <Link
        to="/nova-transacao"
        className="fixed bottom-28 right-5 w-14 h-14 primary-gradient rounded-full shadow-[0_12px_32px_rgba(72,0,178,0.3)] flex items-center justify-center text-white z-50 hover:scale-110 active:scale-95 transition-all"
      >
        <span className="material-symbols-outlined text-2xl">add</span>
      </Link>

      <BottomNavBar />
    </>
  );
}
