import { format, isToday, isYesterday, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

/** Arredonda para 2 casas decimais antes de persistir no banco */
export const d2 = (n: number) => Math.round(n * 100) / 100;

export function formatBRL(valor: number): string {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function formatBRLSemSimbolo(valor: number): string {
  return valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function parseBRL(str: string): number {
  const cleaned = str.replace(/[^\d,]/g, '').replace(',', '.');
  return parseFloat(cleaned) || 0;
}

export function formatData(iso: string): string {
  return format(parseISO(iso), "dd 'de' MMM", { locale: ptBR });
}

export function formatDataCompleta(iso: string): string {
  return format(parseISO(iso), "EEEE, dd 'de' MMMM", { locale: ptBR });
}

export function formatDataRelativa(iso: string): string {
  const date = parseISO(iso);
  if (isToday(date)) return 'Hoje';
  if (isYesterday(date)) return 'Ontem';
  return format(date, "dd 'de' MMM", { locale: ptBR });
}

export function formatHora(iso: string): string {
  return format(parseISO(iso), 'HH:mm');
}

export function nomeMes(mes: number, ano: number): string {
  return format(new Date(ano, mes - 1, 1), 'MMMM yyyy', { locale: ptBR });
}

export function nomeMesCurto(mes: number): string {
  return format(new Date(2024, mes - 1, 1), 'MMM', { locale: ptBR });
}
