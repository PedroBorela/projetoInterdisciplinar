import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  format,
  startOfMonth,
  getDaysInMonth,
  getDay,
  subMonths,
  addMonths,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  subWeeks,
  addWeeks
} from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { TopNavBar } from '../components/TopNavBar';
import { BottomNavBar } from '../components/BottomNavBar';
import { EmptyState } from '../components/EmptyState';
import { formatBRL, formatHora, nomeMes } from '../lib/formatters';
import { useCategoriasStore } from '../stores/useCategoriasStore';
import { useTransacoesStore } from '../stores/useTransacoesStore';
import type { Transacao } from '../types';

export function Calendario() {
  const navigate = useNavigate();
  const transacoes = useTransacoesStore((s) => s.transacoes);
  const categorias = useCategoriasStore((s) => s.categorias);

  const [visualizacao, setVisualizacao] = useState<'mensal' | 'semanal'>('mensal');
  const [dataAtual, setDataAtual] = useState(() => startOfMonth(new Date()));
  const [diaSelecionado, setDiaSelecionado] = useState(() => new Date());

  const getISODateStr = (date: Date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const buildMapaDeTransacoes = (list: Transacao[]) => {
    const mapa: Record<string, { receitas: number; despesas: number; transacoes: Transacao[] }> = {};
    list.forEach((t) => {
      const key = t.data;
      if (!mapa[key]) {
        mapa[key] = { receitas: 0, despesas: 0, transacoes: [] };
      }
      mapa[key].transacoes.push(t);
      if (t.tipo === 'receita') {
        mapa[key].receitas += t.valor;
      } else {
        mapa[key].despesas += t.valor;
      }
    });
    return mapa;
  };

  const mapaGeral = buildMapaDeTransacoes(transacoes);

  // Navegação
  const anterior = () => {
    if (visualizacao === 'mensal') {
      const novaData = subMonths(dataAtual, 1);
      setDataAtual(novaData);
      setDiaSelecionado(startOfMonth(novaData));
    } else {
      const novaData = subWeeks(dataAtual, 1);
      setDataAtual(novaData);
      setDiaSelecionado(startOfWeek(novaData, { weekStartsOn: 1 }));
    }
  };

  const proximo = () => {
    if (visualizacao === 'mensal') {
      const novaData = addMonths(dataAtual, 1);
      setDataAtual(novaData);
      setDiaSelecionado(startOfMonth(novaData));
    } else {
      const novaData = addWeeks(dataAtual, 1);
      setDataAtual(novaData);
      setDiaSelecionado(startOfWeek(novaData, { weekStartsOn: 1 }));
    }
  };

  // Mensal calculations
  const ano = dataAtual.getFullYear();
  const mes = dataAtual.getMonth() + 1;
  const totalDias = getDaysInMonth(dataAtual);
  const primeiroDiaSemanaIndex = (getDay(startOfMonth(dataAtual)) + 6) % 7;
  const slotsVazios = Array.from({ length: primeiroDiaSemanaIndex });
  const diasDoMes = Array.from({ length: totalDias }, (_, i) => i + 1);

  // Semanal calculations
  const inicioSemana = startOfWeek(dataAtual, { weekStartsOn: 1 });
  const fimSemana = endOfWeek(dataAtual, { weekStartsOn: 1 });
  const diasDaSemana = eachDayOfInterval({ start: inicioSemana, end: fimSemana });

  const formatarIntervaloSemana = (start: Date, end: Date) => {
    const diaInicio = format(start, 'dd');
    const diaFim = format(end, 'dd');
    const mesInicio = format(start, 'MMMM', { locale: ptBR });
    const mesFim = format(end, 'MMMM', { locale: ptBR });
    const anoInicio = format(start, 'yyyy');
    const anoFim = format(end, 'yyyy');

    if (anoInicio !== anoFim) {
      return `${diaInicio} de ${mesInicio} de ${anoInicio} a ${diaFim} de ${mesFim} de ${anoFim}`;
    }
    if (mesInicio !== mesFim) {
      return `${diaInicio} de ${mesInicio.slice(0, 3)} a ${diaFim} de ${mesFim.slice(0, 3)} de ${anoFim}`;
    }
    return `${diaInicio} a ${diaFim} de ${mesInicio} de ${anoFim}`;
  };

  const isoSelecionado = getISODateStr(diaSelecionado);
  const statsDiaSelecionado = mapaGeral[isoSelecionado] || { receitas: 0, despesas: 0, transacoes: [] };

  const diaSemana = format(diaSelecionado, 'EEEE', { locale: ptBR });
  const dataPorExtenso = format(diaSelecionado, "dd 'de' MMMM", { locale: ptBR });
  const diaSemanaFormatado = diaSemana.charAt(0).toUpperCase() + diaSemana.slice(1);

  const saudePct = statsDiaSelecionado.receitas + statsDiaSelecionado.despesas > 0
    ? (statsDiaSelecionado.receitas / (statsDiaSelecionado.receitas + statsDiaSelecionado.despesas)) * 100
    : 50;

  return (
    <>
      <TopNavBar />

      <main className="pt-28 pb-36 px-5 max-w-4xl mx-auto">

        {/* Title */}
        <div className="mb-8">
          <h1 className="font-headline text-4xl font-bold tracking-tight text-on-surface mb-2">Linha do Tempo</h1>
          <p className="text-on-surface-variant font-medium text-sm">Organizando seus registros financeiros por calendário.</p>
        </div>

        {/* Controles */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-7">
          <div className="flex bg-surface-container-lowest p-1.5 rounded-2xl editorial-shadow">
            <button
              onClick={() => {
                setVisualizacao('mensal');
                setDataAtual(startOfMonth(diaSelecionado));
              }}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                visualizacao === 'mensal'
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              Mensal
            </button>
            <button
              onClick={() => {
                setVisualizacao('semanal');
                setDataAtual(diaSelecionado);
              }}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                visualizacao === 'semanal'
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              Semanal
            </button>
          </div>
          <div className="flex items-center gap-3 bg-surface-container-lowest px-4 py-2.5 rounded-2xl editorial-shadow">
            <button onClick={anterior} className="text-primary hover:opacity-70 transition-all cursor-pointer">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <span className="font-headline text-base font-bold min-w-[200px] text-center text-on-surface capitalize">
              {visualizacao === 'mensal'
                ? nomeMes(mes, ano)
                : formatarIntervaloSemana(inicioSemana, fimSemana)}
            </span>
            <button onClick={proximo} className="text-primary hover:opacity-70 transition-all cursor-pointer">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Calendário */}
          <div className="lg:col-span-8 bg-surface-container-lowest rounded-2xl p-7 editorial-shadow">
            {visualizacao === 'mensal' ? (
              <div className="grid grid-cols-7 gap-y-4 text-center">
                {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'].map(d => (
                  <div key={d} className="text-[10px] font-bold text-outline uppercase tracking-widest pb-3">{d}</div>
                ))}

                {/* Slots vazios do mês anterior */}
                {slotsVazios.map((_, idx) => (
                  <div key={`empty-${idx}`} className="p-2 opacity-0 text-sm"></div>
                ))}

                {/* Dias do mês */}
                {diasDoMes.map(d => {
                  const isoDia = `${ano}-${String(mes).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
                  const stats = mapaGeral[isoDia] || { receitas: 0, despesas: 0, transacoes: [] };
                  const isSelecionado = isoSelecionado === isoDia;
                  const isHoje = getISODateStr(new Date()) === isoDia;

                  return (
                    <div
                      key={d}
                      onClick={() => setDiaSelecionado(new Date(ano, mes - 1, d))}
                      className={`relative flex flex-col items-center justify-center p-2.5 text-sm font-bold rounded-xl transition-all cursor-pointer aspect-square ${
                        isSelecionado
                          ? 'bg-primary text-on-primary ring-4 ring-primary/20 scale-105 shadow-md z-10'
                          : isHoje
                          ? 'bg-primary-fixed/40 text-primary border border-primary/30 hover:bg-primary-fixed/60'
                          : 'text-on-surface hover:bg-surface-container-low'
                      }`}
                    >
                      {d}
                      {(stats.receitas > 0 || stats.despesas > 0) && (
                        <div className="absolute bottom-1.5 flex gap-0.5 justify-center">
                          {stats.receitas > 0 && (
                            <span className={`w-1.5 h-1.5 rounded-full ${isSelecionado ? 'bg-white' : 'bg-income'}`} />
                          )}
                          {stats.despesas > 0 && (
                            <span className={`w-1.5 h-1.5 rounded-full ${isSelecionado ? 'bg-white/80' : 'bg-expense'}`} />
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="grid grid-cols-7 gap-y-4 text-center">
                {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'].map(d => (
                  <div key={d} className="text-[10px] font-bold text-outline uppercase tracking-widest pb-3">{d}</div>
                ))}

                {/* Dias da semana */}
                {diasDaSemana.map(dataDia => {
                  const isoDia = getISODateStr(dataDia);
                  const stats = mapaGeral[isoDia] || { receitas: 0, despesas: 0, transacoes: [] };
                  const isSelecionado = isoSelecionado === isoDia;
                  const isHoje = getISODateStr(new Date()) === isoDia;
                  const d = dataDia.getDate();

                  return (
                    <div
                      key={isoDia}
                      onClick={() => setDiaSelecionado(dataDia)}
                      className={`relative flex flex-col items-center justify-center p-2.5 text-sm font-bold rounded-xl transition-all cursor-pointer aspect-square ${
                        isSelecionado
                          ? 'bg-primary text-on-primary ring-4 ring-primary/20 scale-105 shadow-md z-10'
                          : isHoje
                          ? 'bg-primary-fixed/40 text-primary border border-primary/30 hover:bg-primary-fixed/60'
                          : 'text-on-surface hover:bg-surface-container-low'
                      }`}
                    >
                      {d}
                      {(stats.receitas > 0 || stats.despesas > 0) && (
                        <div className="absolute bottom-1.5 flex gap-0.5 justify-center">
                          {stats.receitas > 0 && (
                            <span className={`w-1.5 h-1.5 rounded-full ${isSelecionado ? 'bg-white' : 'bg-income'}`} />
                          )}
                          {stats.despesas > 0 && (
                            <span className={`w-1.5 h-1.5 rounded-full ${isSelecionado ? 'bg-white/80' : 'bg-expense'}`} />
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-5">

            {/* Resumo do dia */}
            <div className="primary-gradient rounded-2xl p-7 text-on-primary editorial-shadow">
              <p className="text-sm font-semibold opacity-70 mb-0.5">{diaSemanaFormatado}</p>
              <h3 className="font-headline text-2xl font-bold mb-6 tracking-tight">{dataPorExtenso}</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold uppercase tracking-wider opacity-70">Ganhos</span>
                  <span className="font-headline text-lg font-bold">+ {formatBRL(statsDiaSelecionado.receitas)}</span>
                </div>
                <div className="h-px bg-white/15" />
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold uppercase tracking-wider opacity-70">Gastos</span>
                  <span className="font-headline text-lg font-bold">- {formatBRL(statsDiaSelecionado.despesas)}</span>
                </div>
              </div>
            </div>

            {/* Saúde diária */}
            <div className="bg-surface-container-lowest rounded-2xl p-6 editorial-shadow">
              <p className="text-xs font-bold uppercase tracking-widest text-outline mb-4">Saúde Diária</p>
              <div className="w-full h-2.5 bg-surface-container-high rounded-full overflow-hidden flex">
                <div className="bg-income h-full rounded-full transition-all" style={{ width: `${saudePct}%` }} />
                <div className="bg-expense h-full rounded-full transition-all" style={{ width: `${100 - saudePct}%` }} />
              </div>
              <div className="flex justify-between mt-3">
                <span className="text-[10px] font-bold text-income uppercase tracking-wide">Sobra</span>
                <span className="text-[10px] font-bold text-expense uppercase tracking-wide">Gasto</span>
              </div>
            </div>
          </div>
        </div>

        {/* Registros do dia */}
        <section className="mt-10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-headline text-xl font-bold text-on-surface">Registros de {dataPorExtenso}</h2>
            <Link
              to={`/nova-transacao?data=${isoSelecionado}`}
              className="flex items-center gap-1.5 text-primary font-bold text-sm hover:underline underline-offset-2"
            >
              <span className="material-symbols-outlined text-lg">add_circle</span>
              Adicionar Registro
            </Link>
          </div>

          {statsDiaSelecionado.transacoes.length === 0 ? (
            <EmptyState
              icone="event_busy"
              titulo="Sem lançamentos neste dia"
              descricao="Nenhum ganho ou gasto foi registrado para esta data."
              acao={{
                label: 'Adicionar Lançamento',
                onClick: () => navigate(`/nova-transacao?data=${isoSelecionado}`),
              }}
            />
          ) : (
            <div className="space-y-3">
              {statsDiaSelecionado.transacoes.map((t) => {
                const cat = categorias.find((c) => c.id === t.categoriaId);
                return (
                  <div
                    key={t.id}
                    onClick={() => navigate(`/nova-transacao?id=${t.id}`)}
                    className="flex items-center justify-between bg-surface-container-lowest p-5 rounded-2xl hover:bg-surface-container-low transition-all cursor-pointer editorial-shadow group"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl ${cat?.corFundo ?? 'bg-surface-container'} flex items-center justify-center shrink-0`}>
                        <span className={`material-symbols-outlined text-2xl ${cat?.corTexto ?? 'text-on-surface-variant'}`} style={{ fontVariationSettings: "'FILL' 1" }}>
                          {cat?.icone ?? 'receipt'}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-on-surface">{t.descricao}</h4>
                        <p className="text-sm font-medium text-on-surface-variant mt-0.5">{cat?.nome ?? 'Sem categoria'}</p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className={`font-headline font-bold text-base ${t.tipo === 'receita' ? 'text-income' : 'text-expense'}`}>
                        {t.tipo === 'receita' ? '+' : '-'} {formatBRL(t.valor)}
                      </p>
                      <p className="text-[10px] font-bold text-outline uppercase tracking-widest">{formatHora(t.criadoEm)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>

      <BottomNavBar />
    </>
  );
}
