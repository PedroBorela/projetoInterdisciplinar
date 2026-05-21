import { useState, useEffect, useRef } from 'react';
import { format, getDaysInMonth, setDate } from 'date-fns';
import { TopNavBar } from '../components/TopNavBar';
import { BottomNavBar } from '../components/BottomNavBar';
import { useOcorrenciasStore } from '../stores/useOcorrenciasStore';
import { useCategoriasStore } from '../stores/useCategoriasStore';
import { useTransacoesStore } from '../stores/useTransacoesStore';
import { useConfigStore } from '../stores/useConfigStore';
import { calcularSaldo } from '../lib/calculators';
import { formatBRL } from '../lib/formatters';

export function OcorrenciasFixas() {
  const formRef = useRef<HTMLDivElement>(null);
  
  const ocorrencias = useOcorrenciasStore((s) => s.ocorrencias);
  const { adicionar, editar, remover, toggleAtiva } = useOcorrenciasStore();
  const categorias = useCategoriasStore((s) => s.categorias);
  const transacoes = useTransacoesStore((s) => s.transacoes);
  const { saldoInicial } = useConfigStore();

  // Form states
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [categoriaId, setCategoriaId] = useState('');
  const [diaCobranca, setDiaCobranca] = useState('5');
  const [debitoAutomatico, setDebitoAutomatico] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Set default category when categories list loads
  useEffect(() => {
    if (categorias.length > 0 && !categoriaId) {
      setCategoriaId(categorias[0].id);
    }
  }, [categorias, categoriaId]);

  // Calculations
  const saldo = calcularSaldo(transacoes, saldoInicial);
  const activeOcorrencias = ocorrencias.filter((o) => o.ativa);
  const totalFixoMensal = activeOcorrencias.reduce((acc, o) => acc + o.valor, 0);
  const saldoDisponivel = saldo - totalFixoMensal;

  // Verifica se uma ocorrência foi lançada no mês atual (ano/mês)
  const isLancadaEsteMes = (ocorrenciaId: string) => {
    const currentMonthStr = format(new Date(), 'yyyy-MM');
    return transacoes.some(
      (t) => t.ocorrenciaId === ocorrenciaId && t.data.startsWith(currentMonthStr)
    );
  };

  // Lança a despesa recorrente no mês atual
  const lancarDespesa = (o: typeof ocorrencias[0]) => {
    const hoje = new Date();
    const maxDias = getDaysInMonth(hoje);
    const diaValido = Math.min(o.diaCobranca, maxDias);
    const dataLancamento = setDate(hoje, diaValido);
    const dataStr = format(dataLancamento, 'yyyy-MM-dd');

    useTransacoesStore.getState().adicionar({
      tipo: 'despesa',
      valor: o.valor,
      descricao: o.descricao,
      categoriaId: o.categoriaId,
      data: dataStr,
      meioPagamento: o.debitoAutomatico ? 'digital' : 'dinheiro',
      ocorrenciaId: o.id,
    });
  };

  // Group active occurrences by category for progress bar segmenting
  const categoriaTotais = activeOcorrencias.reduce((acc, o) => {
    acc[o.categoriaId] = (acc[o.categoriaId] || 0) + o.valor;
    return acc;
  }, {} as Record<string, number>);

  const categoriasComOcorrencias = Object.entries(categoriaTotais)
    .map(([catId, total]) => {
      const cat = categorias.find((c) => c.id === catId);
      const pct = totalFixoMensal > 0 ? (total / totalFixoMensal) * 100 : 0;
      return { cat, total, pct };
    })
    .filter((item) => item.cat !== undefined);

  // Handle CRUD operations
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!descricao.trim() || !valor || !categoriaId || !diaCobranca) return;

    const parsedValor = parseFloat(valor) || 0;
    const parsedDia = parseInt(diaCobranca) || 5;

    const data = {
      descricao,
      valor: parsedValor,
      categoriaId,
      diaCobranca: parsedDia,
      debitoAutomatico,
      ativa: true,
    };

    if (editingId) {
      editar(editingId, data);
      setEditingId(null);
    } else {
      adicionar(data);
    }

    // Reset Form
    setDescricao('');
    setValor('');
    setDiaCobranca('5');
    setDebitoAutomatico(false);
  };

  const handleEditClick = (o: typeof ocorrencias[0]) => {
    setEditingId(o.id);
    setDescricao(o.descricao);
    setValor(o.valor.toString());
    setCategoriaId(o.categoriaId);
    setDiaCobranca(o.diaCobranca.toString());
    setDebitoAutomatico(o.debitoAutomatico);

    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setDescricao('');
    setValor('');
    setDiaCobranca('5');
    setDebitoAutomatico(false);
  };

  const handleScrollToForm = () => {
    handleCancelEdit();
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <TopNavBar />
      <main className="pt-24 pb-36 px-5 max-w-4xl mx-auto">
        {/* Header */}
        <section className="mb-10">
          <h1 className="font-headline text-4xl font-extrabold tracking-tight text-on-surface mb-2">
            Despesas Recorrentes
          </h1>
          <p className="text-on-surface-variant text-base max-w-lg font-medium leading-relaxed">
            Gerencie seus compromissos mensais fixos e planeje seus próximos passos.
          </p>
        </section>

        {/* Indicador de Saúde Financeira */}
        <div className="bg-surface-container-lowest rounded-2xl p-7 mb-8 editorial-shadow">
          <div className="flex justify-between items-end mb-5">
            <div>
              <span className="font-label text-xs uppercase tracking-widest text-outline block mb-1">
                Total Fixo Mensal
              </span>
              <div className="font-headline text-3xl font-bold text-on-surface">
                {formatBRL(totalFixoMensal)}
              </div>
            </div>
            <div className="text-right">
              <span className="font-label text-xs uppercase tracking-widest text-outline block mb-1">
                Saldo Livre Previsto
              </span>
              <div
                className={`font-headline text-xl font-bold ${
                  saldoDisponivel < 0 ? 'text-expense' : 'text-income'
                }`}
              >
                {formatBRL(saldoDisponivel)}
              </div>
            </div>
          </div>
          <div className="w-full h-5 bg-surface-container rounded-full overflow-hidden flex">
            {categoriasComOcorrencias.length === 0 ? (
              <div className="h-full bg-outline/20 w-full" />
            ) : (
              categoriasComOcorrencias.map(({ cat, pct }) => (
                <div
                  key={cat!.id}
                  className={`h-full ${cat!.cor}`}
                  style={{ width: `${pct}%` }}
                  title={`${cat!.nome}: ${formatBRL(categoriaTotais[cat!.id])} (${Math.round(pct)}%)`}
                />
              ))
            )}
          </div>
          <div className="flex flex-wrap gap-4 mt-4">
            {categoriasComOcorrencias.map(({ cat, total }) => (
              <div key={cat!.id} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${cat!.cor}`} />
                <span className="font-label text-[10px] uppercase font-bold text-on-surface-variant">
                  {cat!.nome} ({formatBRL(total)})
                </span>
              </div>
            ))}
            {categoriasComOcorrencias.length === 0 && (
              <span className="text-xs text-on-surface-variant italic">
                Nenhum compromisso recorrente ativo registrado.
              </span>
            )}
          </div>
        </div>

        {/* Header da Lista */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-headline text-xl font-bold text-on-surface">Compromissos Cadastrados</h2>
          <button
            onClick={handleScrollToForm}
            className="primary-gradient text-on-primary px-5 py-2.5 rounded-xl font-bold text-sm editorial-shadow flex items-center gap-2 active:scale-95 hover:opacity-95 transition-all"
          >
            <span className="material-symbols-outlined text-lg">add</span>
            Adicionar
          </button>
        </div>

        {/* Lista de Despesas Fixas */}
        <div className="space-y-3">
          {ocorrencias.length === 0 ? (
            <div className="bg-surface-container-lowest p-8 rounded-2xl text-center editorial-shadow">
              <span className="material-symbols-outlined text-4xl text-outline mb-2">sync_disabled</span>
              <p className="text-sm font-semibold text-on-surface">Nenhuma despesa recorrente cadastrada</p>
              <p className="text-xs text-on-surface-variant mt-1">Use o formulário abaixo para adicionar uma.</p>
            </div>
          ) : (
            ocorrencias.map((o) => {
              const cat = categorias.find((c) => c.id === o.categoriaId);
              return (
                <div
                  key={o.id}
                  className={`group bg-surface-container-lowest p-5 rounded-2xl flex items-center justify-between hover:bg-surface-container-low transition-all editorial-shadow ${
                    !o.ativa ? 'opacity-60' : ''
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => toggleAtiva(o.id)}
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        !o.ativa
                          ? 'bg-outline/20 text-outline'
                          : cat?.corFundo || 'bg-primary-fixed'
                      }`}
                      title={o.ativa ? 'Desativar ocorrência' : 'Ativar ocorrência'}
                    >
                      <span
                        className={`material-symbols-outlined text-xl ${
                          o.ativa ? cat?.corTexto || 'text-primary' : ''
                        }`}
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        {cat?.icone || 'sync'}
                      </span>
                    </button>
                    <div>
                      <div className="font-headline font-bold text-base text-on-surface flex items-center gap-2">
                        {o.descricao}
                        {!o.ativa && (
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-outline/25 text-on-surface-variant px-1.5 py-0.5 rounded">
                            Inativa
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2 items-center mt-1">
                        <span className="font-label text-[10px] px-2 py-0.5 bg-surface-container-high rounded text-on-surface-variant font-bold uppercase tracking-tighter">
                          {cat?.nome || 'Sem Categoria'}
                        </span>
                        <span className="font-label text-[10px] text-outline flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">calendar_month</span>
                          Dia {o.diaCobranca}
                        </span>
                        {o.debitoAutomatico && (
                          <span className="font-label text-[10px] text-income flex items-center gap-1 font-bold">
                            <span className="material-symbols-outlined text-[14px]">bolt</span>
                            Débito Automático
                          </span>
                        )}
                        {o.ativa && (
                          isLancadaEsteMes(o.id) ? (
                            <span className="font-label text-[10px] text-income flex items-center gap-1 font-bold bg-emerald-100 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md">
                              <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                              Lançada este mês
                            </span>
                          ) : (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                lancarDespesa(o);
                              }}
                              className="font-label text-[10px] bg-primary/10 hover:bg-primary/20 text-primary flex items-center gap-1 font-bold px-2 py-0.5 rounded-md transition-all active:scale-95 cursor-pointer border border-primary/20"
                            >
                              <span className="material-symbols-outlined text-[14px]">send</span>
                              Lançar este Mês
                            </button>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <div className="font-headline font-bold text-base text-on-surface">
                        {formatBRL(o.valor)}
                      </div>
                      <div className="font-label text-[10px] text-outline uppercase tracking-widest">
                        Mensal
                      </div>
                    </div>
                    <div className="flex gap-1 md:opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleEditClick(o)}
                        className="p-2 text-outline hover:text-primary hover:bg-primary-fixed transition-colors rounded-lg"
                        title="Editar"
                      >
                        <span className="material-symbols-outlined text-xl">edit</span>
                      </button>
                      <button
                        onClick={() => remover(o.id)}
                        className="p-2 text-outline hover:text-error hover:bg-error-container transition-colors rounded-lg"
                        title="Deletar"
                      >
                        <span className="material-symbols-outlined text-xl">delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Formulário — Editor */}
        <section ref={formRef} className="mt-14 scroll-mt-24">
          <h2 className="font-headline text-xl font-bold mb-6 text-on-surface">
            {editingId ? 'Editar Ocorrência' : 'Adicionar Nova Ocorrência'}
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Detalhes Principais */}
            <div className="md:col-span-2 bg-surface-container-lowest rounded-2xl p-7 editorial-shadow">
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block font-label text-xs uppercase font-bold text-outline mb-2">
                    Descrição da Despesa
                  </label>
                  <input
                    required
                    className="w-full bg-surface-container-low border-0 ring-1 ring-outline-variant/30 rounded-xl p-4 focus:ring-2 focus:ring-primary transition-all text-sm text-on-surface font-medium"
                    placeholder="ex: Assinatura Netflix"
                    type="text"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="block font-label text-xs uppercase font-bold text-outline mb-2">
                      Valor (R$)
                    </label>
                    <input
                      required
                      className="w-full bg-surface-container-low border-0 ring-1 ring-outline-variant/30 rounded-xl p-4 focus:ring-2 focus:ring-primary transition-all text-sm text-on-surface"
                      placeholder="0,00"
                      type="number"
                      step="0.01"
                      min="0.01"
                      value={valor}
                      onChange={(e) => setValor(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block font-label text-xs uppercase font-bold text-outline mb-2">
                      Categoria
                    </label>
                    <select
                      required
                      className="w-full bg-surface-container-low border-0 ring-1 ring-outline-variant/30 rounded-xl p-4 focus:ring-2 focus:ring-primary transition-all text-sm text-on-surface appearance-none"
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
                </div>
              </div>
            </div>

            {/* Agendamento */}
            <div className="bg-surface-container-low rounded-2xl p-7 editorial-shadow flex flex-col justify-between">
              <div>
                <label className="block font-label text-xs uppercase font-bold text-primary mb-4">
                  Agendamento
                </label>
                <div className="space-y-4">
                  <div>
                    <label className="block font-label text-[10px] text-outline uppercase font-bold mb-1.5">
                      Dia de Cobrança (1 a 31)
                    </label>
                    <input
                      required
                      className="w-full bg-surface-container-lowest border-0 ring-1 ring-outline-variant/30 rounded-xl p-3 focus:ring-2 focus:ring-primary transition-all text-sm text-on-surface"
                      max="31"
                      min="1"
                      placeholder="15"
                      type="number"
                      value={diaCobranca}
                      onChange={(e) => setDiaCobranca(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span className="text-sm font-medium text-on-surface">Pagamento Automático</span>
                    <button
                      type="button"
                      onClick={() => setDebitoAutomatico((prev) => !prev)}
                      className={`w-12 h-6 rounded-full relative p-1 flex items-center transition-colors ${
                        debitoAutomatico
                          ? 'primary-gradient justify-end'
                          : 'bg-outline/30 justify-start'
                      }`}
                    >
                      <div className="w-4 h-4 bg-white rounded-full shadow" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mt-6">
                {editingId && (
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="flex-1 py-3.5 bg-surface-container-high text-on-surface font-bold rounded-xl hover:bg-outline-variant/35 transition-colors text-sm"
                  >
                    Cancelar
                  </button>
                )}
                <button
                  type="submit"
                  className="flex-[2] py-3.5 primary-gradient text-on-primary font-bold rounded-xl editorial-shadow active:scale-95 hover:opacity-95 transition-all text-sm"
                >
                  {editingId ? 'Salvar' : 'Adicionar'}
                </button>
              </div>
            </div>
          </form>
        </section>
      </main>
      <BottomNavBar />
    </>
  );
}

