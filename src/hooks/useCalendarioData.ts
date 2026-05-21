import { useTransacoesStore } from '../stores/useTransacoesStore';
import { calcularMapaCalendario } from '../lib/calculators';

export function useCalendarioData(ano: number, mes: number) {
  const transacoes = useTransacoesStore((s) => s.transacoes);
  return calcularMapaCalendario(transacoes, ano, mes);
}
