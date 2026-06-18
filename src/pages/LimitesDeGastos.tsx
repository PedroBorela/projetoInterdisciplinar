import { useState, useEffect } from 'react';
import { TopNavBar } from '../components/TopNavBar';
import { BottomNavBar } from '../components/BottomNavBar';
import { useTransacoesStore } from '../stores/useTransacoesStore';
import { useCategoriasStore } from '../stores/useCategoriasStore';
import { useLimitesStore } from '../stores/useLimitesStore';
import { calcularTotaisMes } from '../lib/calculators';
import { formatBRL, nomeMes } from '../lib/formatters';

export function LimitesDeGastos() {
  const [dataReferencia, setDataReferencia] = useState(new Date());
  const mes = dataReferencia.getMonth() + 1;
  const ano = dataReferencia.getFullYear();

  const transacoes = useTransacoesStore((s) => s.transacoes);
  const categorias = useCategoriasStore((s) => s.categorias);
  const { limites, salvar } = useLimitesStore();

  const [valoresLocais, setValoresLocais] = useState<Record<string, number>>({});
  const [mensagemSucesso, setMensagemSucesso] = useState('');

  // Sync store values to local state when month/year changes
  useEffect(() => {
    const novosValores: Record<string, number> = {};
    categorias.forEach((cat) => {
      const limiteExistente = limites.find(
        (l) => l.categoriaId === cat.id && l.mes === mes && l.ano === ano
      );
      novosValores[cat.id] = limiteExistente?.valorLimite ?? 0;
    });
    setValoresLocais(novosValores);
    setMensagemSucesso('');
  }, [categorias, limites, mes, ano]);

  const navegarMes = (offset: number) => {
    setDataReferencia((prev) => {
      const d = new Date(prev);
      d.setMonth(d.getMonth() + offset);
      return d;
    });
  };

  // Calculations based on local values (so they update in real-time as user types)
  const tetoMensal = Object.values(valoresLocais).reduce((acc, val) => acc + val, 0);
  
  const { transacoes: transacoesMes } = calcularTotaisMes(transacoes, ano, mes);
  const despesasMes = transacoesMes.filter((t) => t.tipo === 'despesa');
  const gastoAteAgora = despesasMes.reduce((acc, t) => acc + t.valor, 0);

  const percentualGasto = tetoMensal > 0 ? Math.min((gastoAteAgora / tetoMensal) * 100, 100) : 0;
  const restantes = tetoMensal - gastoAteAgora;

  const handleInputChange = (categoriaId: string, val: string) => {
    const num = parseFloat(val) || 0;
    setValoresLocais((prev) => ({
      ...prev,
      [categoriaId]: num >= 0 ? num : 0,
    }));
  };

  const handleSalvar = () => {
    Object.entries(valoresLocais).forEach(([catId, valor]) => {
      salvar(catId, valor, mes, ano);
    });
    setMensagemSucesso('Limites atualizados com sucesso!');
    setTimeout(() => setMensagemSucesso(''), 4000);
  };

  return (
    <>
      <TopNavBar />
      <main className="pt-24 pb-36 px-5 max-w-2xl mx-auto">
        <header className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold font-headline tracking-tight text-on-surface mb-1.5">
              Limites de Gastos
            </h1>
            <p className="text-sm font-medium text-on-surface-variant leading-relaxed">
              Organize seu orçamento mensal definindo limites por categoria.
            </p>
          </div>

          {/* Seletor de Mês */}
          <div className="flex items-center gap-2 self-start sm:self-center bg-surface-container-low p-1.5 rounded-xl border border-outline-variant/20 editorial-shadow">
            <button
              onClick={() => navegarMes(-1)}
              className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-surface-container-high text-on-surface transition-colors"
            >
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <span className="text-sm font-bold font-headline text-on-surface capitalize px-2 min-w-[100px] text-center">
              {nomeMes(mes, ano)}
            </span>
            <button
              onClick={() => navegarMes(1)}
              className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-surface-container-high text-on-surface transition-colors"
            >
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </header>

        {mensagemSucesso && (
          <div className="mb-6 bg-income-container text-income text-sm font-semibold p-4 rounded-xl editorial-shadow flex items-center gap-2 animate-fade-in">
            <span className="material-symbols-outlined text-xl animate-icon-pop">check_circle</span>
            {mensagemSucesso}
          </div>
        )}

        {/* Resumo Geral */}
        <section className="mb-8">
          <div className="bg-surface-container-lowest p-7 rounded-2xl editorial-shadow">
            <div className="flex justify-between items-end mb-5">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-primary/60 block mb-1">
                  Teto Mensal Configurado
                </span>
                <span className="text-3xl font-extrabold font-headline tracking-tighter text-primary">
                  {formatBRL(tetoMensal)}
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant block mb-1">
                  Gasto Até Agora
                </span>
                <span className="text-xl font-bold font-headline text-on-surface">
                  {formatBRL(gastoAteAgora)}
                </span>
              </div>
            </div>
            <div className="h-4 w-full bg-surface-container rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  percentualGasto >= 100
                    ? 'bg-error'
                    : percentualGasto >= 80
                    ? 'bg-warning'
                    : 'primary-gradient'
                }`}
                style={{ width: `${percentualGasto}%` }}
              />
            </div>
            <div className="flex justify-between mt-2.5">
              <span className="text-xs font-semibold text-on-surface-variant">
                {Math.round(percentualGasto)}% utilizado
              </span>
              <span
                className={`text-xs font-bold ${
                  restantes < 0 ? 'text-error' : restantes === 0 ? 'text-on-surface-variant' : 'text-primary'
                }`}
              >
                {restantes < 0
                  ? `${formatBRL(Math.abs(restantes))} excedidos`
                  : `${formatBRL(restantes)} restantes`}
              </span>
            </div>
          </div>
        </section>

        {/* Categorias */}
        <section className="space-y-4">
          <h2 className="text-base font-bold font-headline flex items-center gap-2 text-on-surface mb-2">
            <span className="material-symbols-outlined text-primary text-xl">category</span>
            Detalhamento por Categoria
          </h2>

          {categorias.map((cat) => {
            const gasto = despesasMes
              .filter((t) => t.categoriaId === cat.id)
              .reduce((s, t) => s + t.valor, 0);
            const limite = valoresLocais[cat.id] ?? 0;
            const pct = limite > 0 ? (gasto / limite) * 100 : 0;
            const rest = limite - gasto;

            let borderClass = 'border-transparent';
            let bgIconContainer = cat.corFundo || 'bg-surface-container';
            let textIcon = cat.corTexto || 'text-primary';
            let labelStatus = '';
            let textStatusClass = 'text-on-surface-variant';
            let barColor = 'primary-gradient';

            if (limite > 0) {
              if (pct >= 100) {
                borderClass = 'border-l-4 border-error';
                bgIconContainer = 'bg-error-container';
                textIcon = 'text-error';
                labelStatus = 'Limite excedido';
                textStatusClass = 'text-error font-semibold uppercase tracking-tight';
                barColor = 'bg-error';
              } else if (pct >= 80) {
                borderClass = 'border-l-4 border-warning';
                bgIconContainer = 'bg-warning-container';
                textIcon = 'text-warning';
                labelStatus = 'Atenção: saldo baixo';
                textStatusClass = 'text-warning font-semibold';
                barColor = 'bg-warning';
              }
            }

            return (
              <div
                key={cat.id}
                className={`bg-surface-container-lowest p-6 rounded-2xl editorial-shadow transition-all ${borderClass}`}
              >
                <div className="flex justify-between items-start mb-5">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${bgIconContainer}`}
                    >
                      <span
                        className={`material-symbols-outlined text-xl ${textIcon}`}
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        {cat.icone}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-on-surface">{cat.nome}</h3>
                      {limite > 0 ? (
                        <p className={`text-xs ${textStatusClass}`}>
                          {labelStatus || `${Math.round(pct)}% do limite atingido`}
                        </p>
                      ) : (
                        <p className="text-xs text-on-surface-variant italic">Sem limite definido</p>
                      )}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-on-surface-variant mb-1">
                      Limite (R$)
                    </label>
                    <input
                      className={`w-24 bg-surface-container-low border-none rounded-lg text-sm font-bold text-right py-1.5 px-2 focus:ring-2 ${
                        pct >= 100
                          ? 'text-error bg-error-container/40 focus:ring-error'
                          : 'text-primary focus:ring-primary'
                      }`}
                      type="number"
                      min="0"
                      value={limite || ''}
                      placeholder="0,00"
                      onChange={(e) => handleInputChange(cat.id, e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex justify-between text-xs font-semibold mb-2">
                  <span className="text-on-surface">{formatBRL(gasto)} gastos</span>
                  {limite > 0 && (
                    <span className={pct >= 100 ? 'text-error' : pct >= 80 ? 'text-warning' : 'text-income'}>
                      {rest < 0
                        ? `+ ${formatBRL(Math.abs(rest))} acima`
                        : `${formatBRL(rest)} restantes`}
                    </span>
                  )}
                </div>

                {limite > 0 && (
                  <div className="h-3 w-full bg-surface-container rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${barColor}`}
                      style={{ width: `${Math.min(pct, 100)}%` }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </section>

        {/* CTA */}
        <div className="mt-10 text-center">
          <button
            onClick={handleSalvar}
            className="primary-gradient text-on-primary px-8 py-4 rounded-xl font-bold font-headline editorial-shadow transition-all active:scale-95 hover:opacity-95"
          >
            Salvar Alterações
          </button>
        </div>
      </main>
      <BottomNavBar />
    </>
  );
}

