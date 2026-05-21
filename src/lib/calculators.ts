import { getDaysInMonth } from 'date-fns';
import type { Transacao, Categoria, LimiteCategoria, Parcelamento } from '../types';

export function calcularSaldo(transacoes: Transacao[], saldoInicial: number): number {
  return transacoes.reduce((acc, t) => {
    return t.tipo === 'receita' ? acc + t.valor : acc - t.valor;
  }, saldoInicial);
}

export function calcularTotaisMes(transacoes: Transacao[], ano: number, mes: number) {
  const doMes = transacoes.filter((t) => {
    const parts = t.data.split('-');
    if (parts.length < 3) return false;
    const y = parseInt(parts[0], 10);
    const m = parseInt(parts[1], 10);
    return y === ano && m === mes;
  });
  const receitas = doMes.filter((t) => t.tipo === 'receita').reduce((s, t) => s + t.valor, 0);
  const despesas = doMes.filter((t) => t.tipo === 'despesa').reduce((s, t) => s + t.valor, 0);
  return { receitas, despesas, saldo: receitas - despesas, transacoes: doMes };
}

export function calcularPorCategoria(
  transacoes: Transacao[],
  categorias: Categoria[],
  ano: number,
  mes: number
) {
  const { transacoes: doMes } = calcularTotaisMes(transacoes, ano, mes);
  const despesas = doMes.filter((t) => t.tipo === 'despesa');

  return categorias.map((cat) => {
    const total = despesas
      .filter((t) => t.categoriaId === cat.id)
      .reduce((s, t) => s + t.valor, 0);
    const count = despesas.filter((t) => t.categoriaId === cat.id).length;
    return { categoria: cat, total, count };
  }).filter((r) => r.total > 0)
    .sort((a, b) => b.total - a.total);
}

export function calcularLimiteCategoria(
  transacoes: Transacao[],
  limites: LimiteCategoria[],
  categorias: Categoria[],
  ano: number,
  mes: number
) {
  const { transacoes: doMes } = calcularTotaisMes(transacoes, ano, mes);
  const despesas = doMes.filter((t) => t.tipo === 'despesa');

  return categorias.map((cat) => {
    const limite = limites.find((l) => l.categoriaId === cat.id && l.mes === mes && l.ano === ano);
    const gasto = despesas.filter((t) => t.categoriaId === cat.id).reduce((s, t) => s + t.valor, 0);
    const percentual = limite && limite.valorLimite > 0 ? (gasto / limite.valorLimite) * 100 : 0;
    return { categoria: cat, limite: limite?.valorLimite ?? 0, gasto, percentual };
  });
}

export interface DiaCalendario {
  receitas: number;
  despesas: number;
  transacoes: Transacao[];
}

export function calcularMapaCalendario(
  transacoes: Transacao[],
  ano: number,
  mes: number
): Record<number, DiaCalendario> {
  const doMes = transacoes.filter((t) => {
    const parts = t.data.split('-');
    if (parts.length < 3) return false;
    const y = parseInt(parts[0], 10);
    const m = parseInt(parts[1], 10);
    return y === ano && m === mes;
  });

  const mapa: Record<number, DiaCalendario> = {};
  const dias = getDaysInMonth(new Date(ano, mes - 1, 1));
  for (let d = 1; d <= dias; d++) {
    mapa[d] = { receitas: 0, despesas: 0, transacoes: [] };
  }

  doMes.forEach((t) => {
    const parts = t.data.split('-');
    const dia = parseInt(parts[2], 10);
    if (mapa[dia]) {
      mapa[dia].transacoes.push(t);
      if (t.tipo === 'receita') mapa[dia].receitas += t.valor;
      else mapa[dia].despesas += t.valor;
    }
  });

  return mapa;
}

export function calcularVariacaoMes(
  transacoes: Transacao[],
  ano: number,
  mes: number,
  tipo: 'despesa' | 'receita'
): number {
  const atual = calcularTotaisMes(transacoes, ano, mes);
  const mesAnterior = mes === 1
    ? calcularTotaisMes(transacoes, ano - 1, 12)
    : calcularTotaisMes(transacoes, ano, mes - 1);

  const valorAtual = tipo === 'despesa' ? atual.despesas : atual.receitas;
  const valorAnterior = tipo === 'despesa' ? mesAnterior.despesas : mesAnterior.receitas;

  if (valorAnterior === 0) return 0;
  return ((valorAtual - valorAnterior) / valorAnterior) * 100;
}

export function calcularParcelasPagas(parcelamento: Parcelamento, transacoes: Transacao[]): number {
  return transacoes.filter((t) => t.parcelamentoId === parcelamento.id).length;
}

export function calcularFluxoSemanal(transacoes: Transacao[], ano: number, mes: number) {
  const semanas = [
    { label: 'S1', inicio: 1, fim: 7 },
    { label: 'S2', inicio: 8, fim: 14 },
    { label: 'S3', inicio: 15, fim: 21 },
    { label: 'S4', inicio: 22, fim: 31 },
  ];

  return semanas.map(({ label, inicio, fim }) => {
    const doIntervalo = transacoes.filter((t) => {
      const parts = t.data.split('-');
      if (parts.length < 3) return false;
      const y = parseInt(parts[0], 10);
      const m = parseInt(parts[1], 10);
      const d = parseInt(parts[2], 10);
      return y === ano && m === mes && d >= inicio && d <= fim;
    });
    const despesas = doIntervalo.filter((t) => t.tipo === 'despesa').reduce((s, t) => s + t.valor, 0);
    const receitas = doIntervalo.filter((t) => t.tipo === 'receita').reduce((s, t) => s + t.valor, 0);
    return { label, despesas, receitas };
  });
}
