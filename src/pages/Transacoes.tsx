import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { parseISO, getMonth, getYear } from 'date-fns';
import { TopNavBar } from '../components/TopNavBar';
import { BottomNavBar } from '../components/BottomNavBar';
import { EmptyState } from '../components/EmptyState';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { useTransacoesStore } from '../stores/useTransacoesStore';
import { useCategoriasStore } from '../stores/useCategoriasStore';
import { formatBRL, formatDataRelativa, formatHora } from '../lib/formatters';
import { calcularTotaisMes, calcularVariacaoMes } from '../lib/calculators';
import type { Transacao } from '../types';

type FiltroTipo = 'todos' | 'despesa' | 'receita';

export function Transacoes() {
  const navigate = useNavigate();
  const { transacoes, remover } = useTransacoesStore();
  const categorias = useCategoriasStore((s) => s.categorias);

  const [busca, setBusca] = useState('');
  const [filtroTipo, setFiltroTipo] = useState<FiltroTipo>('todos');
  const [filtroCategoriaId, setFiltroCategoriaId] = useState('');
  const [filtroMes, setFiltroMes] = useState(true);
  const [excluindoId, setExcluindoId] = useState<string | null>(null);

  const hoje = new Date();
  const anoAtual = hoje.getFullYear();
  const mesAtual = hoje.getMonth() + 1;

  const filtradas = useMemo(() => {
    let lista = [...transacoes].sort(
      (a, b) => new Date(b.data).getTime() - new Date(a.data).getTime()
    );

    if (filtroMes) {
      lista = lista.filter((t) => {
        const d = parseISO(t.data);
        return getYear(d) === anoAtual && getMonth(d) + 1 === mesAtual;
      });
    }

    if (busca) {
      lista = lista.filter((t) =>
        t.descricao.toLowerCase().includes(busca.toLowerCase())
      );
    }

    if (filtroTipo !== 'todos') {
      lista = lista.filter((t) => t.tipo === filtroTipo);
    }

    if (filtroCategoriaId) {
      lista = lista.filter((t) => t.categoriaId === filtroCategoriaId);
    }

    return lista;
  }, [transacoes, busca, filtroTipo, filtroCategoriaId, filtroMes, anoAtual, mesAtual]);

  // Agrupar por data
  const agrupadas = useMemo(() => {
    const grupos: Record<string, Transacao[]> = {};
    filtradas.forEach((t) => {
      const label = formatDataRelativa(t.data);
      if (!grupos[label]) grupos[label] = [];
      grupos[label].push(t);
    });
    return Object.entries(grupos);
  }, [filtradas]);

  const { receitas, despesas } = calcularTotaisMes(transacoes, anoAtual, mesAtual);
  const variacaoDespesa = calcularVariacaoMes(transacoes, anoAtual, mesAtual, 'despesa');

  function getCat(id: string) {
    return categorias.find((c) => c.id === id);
  }

  return (
    <>
      <TopNavBar />

      <main className="pt-28 pb-36 px-5 max-w-3xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-headline text-3xl font-bold tracking-tight text-on-surface">Atividade</h1>
            <p className="text-on-surface-variant text-sm mt-1">Histórico de transações</p>
          </div>
          <Link
            to="/nova-transacao"
            className="flex items-center gap-2 px-4 py-2.5 primary-gradient text-on-primary font-bold rounded-xl text-sm"
          >
            <span className="material-symbols-outlined text-base">add</span>
            Nova
          </Link>
        </div>

        {/* Insights */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-surface-container-lowest rounded-2xl p-5 editorial-shadow">
            <p className="text-xs font-label font-semibold text-on-surface-variant uppercase tracking-wider mb-1">Receitas</p>
            <p className="text-xl font-bold font-headline text-income">{formatBRL(receitas)}</p>
          </div>
          <div className="bg-surface-container-lowest rounded-2xl p-5 editorial-shadow">
            <p className="text-xs font-label font-semibold text-on-surface-variant uppercase tracking-wider mb-1">Despesas</p>
            <p className="text-xl font-bold font-headline text-expense">{formatBRL(despesas)}</p>
            {variacaoDespesa !== 0 && (
              <p className={`text-xs mt-1 font-semibold ${variacaoDespesa > 0 ? 'text-expense' : 'text-income'}`}>
                {variacaoDespesa > 0 ? '+' : ''}{variacaoDespesa.toFixed(1)}% vs mês anterior
              </p>
            )}
          </div>
        </div>

        {/* Busca */}
        <div className="relative">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-xl">search</span>
          <input
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar transações..."
            className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-surface-container-lowest border-none focus:ring-2 focus:ring-primary text-on-surface placeholder:text-on-surface-variant/50 text-sm editorial-shadow"
          />
        </div>

        {/* Filtros */}
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setFiltroMes((v) => !v)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${filtroMes ? 'bg-primary text-on-primary' : 'bg-surface-container-low text-on-surface-variant'}`}
          >
            Este Mês
          </button>
          <button
            onClick={() => setFiltroTipo(filtroTipo === 'despesa' ? 'todos' : 'despesa')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${filtroTipo === 'despesa' ? 'bg-expense text-white' : 'bg-surface-container-low text-on-surface-variant'}`}
          >
            Despesas
          </button>
          <button
            onClick={() => setFiltroTipo(filtroTipo === 'receita' ? 'todos' : 'receita')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${filtroTipo === 'receita' ? 'bg-income text-white' : 'bg-surface-container-low text-on-surface-variant'}`}
          >
            Receitas
          </button>
          <select
            value={filtroCategoriaId}
            onChange={(e) => setFiltroCategoriaId(e.target.value)}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-surface-container-low text-on-surface-variant border-none focus:ring-2 focus:ring-primary cursor-pointer"
          >
            <option value="">Todas Categorias</option>
            {categorias.map((c) => (
              <option key={c.id} value={c.id}>{c.nome}</option>
            ))}
          </select>
        </div>

        {/* Lista */}
        {filtradas.length === 0 ? (
          <EmptyState
            icone="receipt_long"
            titulo="Nenhuma transação encontrada"
            descricao="Adicione sua primeira transação para começar a acompanhar seus gastos"
            acao={{ label: 'Adicionar Transação', onClick: () => navigate('/nova-transacao') }}
          />
        ) : (
          <div className="space-y-6">
            {agrupadas.map(([data, items]) => (
              <div key={data}>
                <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-3">{data}</p>
                <div className="bg-surface-container-lowest rounded-2xl overflow-hidden editorial-shadow divide-y divide-outline-variant/10">
                  {items.map((t) => {
                    const cat = getCat(t.categoriaId);
                    return (
                      <div key={t.id} className="px-4 py-4 flex items-center gap-4 hover:bg-surface-container-low transition-colors group">
                        <div className={`w-11 h-11 rounded-xl ${cat?.corFundo ?? 'bg-surface-container'} flex items-center justify-center shrink-0`}>
                          <span
                            className={`material-symbols-outlined text-xl ${cat?.corTexto ?? 'text-on-surface-variant'}`}
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            {cat?.icone ?? 'receipt'}
                          </span>
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm text-on-surface truncate">{t.descricao}</h4>
                          <p className="text-xs text-on-surface-variant mt-0.5">{cat?.nome ?? 'Sem categoria'} · {formatHora(t.criadoEm)}</p>
                        </div>

                        <div className="text-right shrink-0 mr-2">
                          <p className={`font-bold text-sm ${t.tipo === 'receita' ? 'text-income' : 'text-expense'}`}>
                            {t.tipo === 'receita' ? '+' : '-'} {formatBRL(t.valor)}
                          </p>
                          <p className="text-[10px] text-outline uppercase tracking-wide">{t.meioPagamento}</p>
                        </div>

                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => navigate(`/nova-transacao?id=${t.id}`)}
                            className="w-8 h-8 rounded-lg bg-surface-container hover:bg-primary-fixed hover:text-primary flex items-center justify-center transition-colors"
                          >
                            <span className="material-symbols-outlined text-sm">edit</span>
                          </button>
                          <button
                            onClick={() => setExcluindoId(t.id)}
                            className="w-8 h-8 rounded-lg bg-surface-container hover:bg-error-container hover:text-error flex items-center justify-center transition-colors"
                          >
                            <span className="material-symbols-outlined text-sm">delete</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <BottomNavBar />

      {excluindoId && (
        <ConfirmDialog
          mensagem={`Excluir a transação "${transacoes.find((t) => t.id === excluindoId)?.descricao}"?`}
          onConfirmar={() => { remover(excluindoId); setExcluindoId(null); }}
          onCancelar={() => setExcluindoId(null)}
        />
      )}
    </>
  );
}
