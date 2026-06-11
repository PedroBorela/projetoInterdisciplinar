import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { TopNavBar } from '../components/TopNavBar';
import { BottomNavBar } from '../components/BottomNavBar';
import { CurrencyInput } from '../components/CurrencyInput';
import { Toast } from '../components/Toast';
import { useTransacoesStore } from '../stores/useTransacoesStore';
import { useCategoriasStore } from '../stores/useCategoriasStore';
import { useCartoesStore } from '../stores/useCartoesStore';
import { useParcelamentosStore } from '../stores/useParcelamentosStore';
import { transacaoSchema, type TransacaoForm } from '../lib/schemas';

const MEIOS = [
  { id: 'cartao' as const, icone: 'credit_card', label: 'Cartão' },
  { id: 'dinheiro' as const, icone: 'payments', label: 'Dinheiro' },
  { id: 'digital' as const, icone: 'account_balance_wallet', label: 'Digital' },
] as const;

export function NovaTransacao() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editandoId = searchParams.get('id');

  const { transacoes, adicionar, editar } = useTransacoesStore();
  const categorias = useCategoriasStore((s) => s.categorias);
  const cartoes = useCartoesStore((s) => s.cartoes);

  const [tipo, setTipo] = useState<'despesa' | 'receita'>('despesa');
  const [meioPagamento, setMeioPagamento] = useState<'cartao' | 'dinheiro' | 'digital'>('dinheiro');
  const [parcelado, setParcelado] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [toast, setToast] = useState<{ tipo: 'sucesso' | 'erro'; mensagem: string } | null>(null);

  const { register, handleSubmit, control, setValue, reset, formState: { errors } } = useForm<TransacaoForm>({
    resolver: zodResolver(transacaoSchema),
    defaultValues: {
      tipo: 'despesa',
      meioPagamento: 'dinheiro',
      data: searchParams.get('data') || format(new Date(), 'yyyy-MM-dd'),
    },
  });



  // Carregar dados se editando
  useEffect(() => {
    if (!editandoId) return;
    const t = transacoes.find((t) => t.id === editandoId);
    if (!t) return;
    setTipo(t.tipo);
    setMeioPagamento(t.meioPagamento);
    reset({
      tipo: t.tipo,
      valor: t.valor,
      descricao: t.descricao,
      categoriaId: t.categoriaId,
      data: t.data,
      meioPagamento: t.meioPagamento,
      cartaoId: t.cartaoId,
    });
  }, [editandoId]);

  async function onSubmit(dados: TransacaoForm) {
    setSalvando(true);

    try {
      if (dados.tipo === 'despesa' && parcelado && dados.numeroParcelas) {
        await useParcelamentosStore.getState().adicionar({
          descricao: dados.descricao,
          valorTotal: dados.valor,
          totalParcelas: dados.numeroParcelas,
          categoriaId: dados.categoriaId,
          cartaoId: dados.meioPagamento === 'cartao' ? dados.cartaoId : undefined,
          dataInicio: dados.data,
        });
        setToast({ tipo: 'sucesso', mensagem: 'Parcelamento criado com sucesso!' });
        setTimeout(() => navigate('/parcelamentos'), 1200);
        return;
      }

      const payload = {
        tipo: dados.tipo,
        valor: dados.valor,
        descricao: dados.descricao,
        categoriaId: dados.categoriaId,
        data: dados.data,
        meioPagamento: dados.meioPagamento,
        cartaoId: dados.meioPagamento === 'cartao' ? dados.cartaoId : undefined,
      };

      if (editandoId) {
        const ok = await editar(editandoId, payload);
        if (ok) {
          setToast({ tipo: 'sucesso', mensagem: 'Registro atualizado com sucesso!' });
          setTimeout(() => navigate('/transacoes'), 1200);
        } else {
          setToast({ tipo: 'erro', mensagem: 'Erro ao atualizar. Tente novamente.' });
        }
      } else {
        const nova = await adicionar(payload);
        if (nova) {
          setToast({ tipo: 'sucesso', mensagem: 'Transação salva com sucesso!' });
          setTimeout(() => navigate('/transacoes'), 1200);
        } else {
          setToast({ tipo: 'erro', mensagem: 'Erro ao salvar. Verifique sua conexão.' });
        }
      }
    } catch {
      setToast({ tipo: 'erro', mensagem: 'Erro inesperado. Tente novamente.' });
    } finally {
      setSalvando(false);
    }
  }

  return (
    <>
      <TopNavBar />

      <main className="pt-24 pb-36 px-5 flex flex-col items-center">
        <div className="w-full max-w-xl">

          <header className="mb-8 text-center">
            <h1 className="font-headline text-3xl font-bold tracking-tight text-on-surface mb-2">
              {editandoId ? 'Editar Registro' : 'Novo Registro'}
            </h1>
            <p className="text-on-surface-variant font-medium text-sm">
              {editandoId ? 'Atualize os dados do registro' : 'Adicione um novo registro ao seu livro-caixa'}
            </p>
          </header>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">

            {/* Toggle Despesa / Receita */}
            <div className="bg-surface-container-low p-1.5 rounded-2xl flex items-center gap-1">
              {(['despesa', 'receita'] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => { setTipo(t); setValue('tipo', t); }}
                  className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${tipo === t
                    ? t === 'despesa'
                      ? 'bg-surface-container-lowest text-expense shadow-sm'
                      : 'bg-surface-container-lowest text-income shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                >
                  {t === 'despesa' ? 'Despesa' : 'Receita'}
                </button>
              ))}
            </div>

            {/* Valor */}
            <div className="text-center py-4">
              <label className="block text-xs font-semibold text-primary uppercase tracking-widest mb-3">Valor</label>
              <div className="flex justify-center items-center gap-2">
                <span className="font-headline text-3xl font-bold text-on-surface-variant shrink-0">R$</span>
                <Controller
                  name="valor"
                  control={control}
                  render={({ field }) => (
                    <CurrencyInput
                      value={field.value}
                      onChange={field.onChange}
                      autoFocus
                      className="bg-transparent border-none text-center font-headline text-6xl font-extrabold focus:ring-0 placeholder:text-surface-container-high tracking-tighter flex-1 min-w-0 max-w-[260px] text-on-surface"
                    />
                  )}
                />
              </div>
              <div className="mt-3 h-0.5 w-32 mx-auto bg-primary rounded-full" />
              {errors.valor && <p className="text-xs text-error mt-2">{errors.valor.message}</p>}
            </div>

            {/* Detalhes */}
            <div className="bg-surface-container-lowest rounded-2xl p-7 space-y-6 editorial-shadow">

              {/* Descrição */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Para que é isso?</label>
                <input
                  {...register('descricao')}
                  className="w-full px-4 py-3.5 rounded-xl bg-surface-container-low border-none focus:ring-2 focus:ring-primary text-on-surface font-medium placeholder:text-outline/50 transition-all text-sm"
                  placeholder="ex: Mensalidade, Livros..."
                />
                {errors.descricao && <p className="text-xs text-error">{errors.descricao.message}</p>}
              </div>

              {/* Categoria + Data */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Categoria</label>
                  <div className="relative">
                    <select
                      {...register('categoriaId')}
                      className="w-full appearance-none px-4 py-3.5 rounded-xl bg-surface-container-low border-none focus:ring-2 focus:ring-primary text-on-surface font-medium cursor-pointer transition-all pr-10 text-sm"
                    >
                      <option value="">Selecione</option>
                      {categorias.map((c) => (
                        <option key={c.id} value={c.id}>{c.nome}</option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant">
                      <span className="material-symbols-outlined text-lg">expand_more</span>
                    </div>
                  </div>
                  {errors.categoriaId && <p className="text-xs text-error">{errors.categoriaId.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Data</label>
                  <input
                    {...register('data')}
                    type="date"
                    className="w-full px-4 py-3.5 rounded-xl bg-surface-container-low border-none focus:ring-2 focus:ring-primary text-on-surface font-medium transition-all text-sm"
                  />
                </div>
              </div>

              {/* Meio de Pagamento */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Meio de Pagamento</label>
                <div className="flex gap-2">
                  {MEIOS.map(({ id, icone, label }) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => { setMeioPagamento(id); setValue('meioPagamento', id); }}
                      className={`flex-1 py-3 px-2 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 ${meioPagamento === id ? 'bg-primary-fixed text-primary' : 'bg-surface-container-low text-on-surface hover:bg-primary-fixed hover:text-primary'}`}
                    >
                      <span className="material-symbols-outlined text-base">{icone}</span>
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Cartão (se meio = cartao) */}
              {meioPagamento === 'cartao' && cartoes.length > 0 && (
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Cartão</label>
                  <div className="relative">
                    <select
                      {...register('cartaoId')}
                      className="w-full appearance-none px-4 py-3.5 rounded-xl bg-surface-container-low border-none focus:ring-2 focus:ring-primary text-on-surface font-medium cursor-pointer pr-10 text-sm"
                    >
                      <option value="">Selecione o cartão</option>
                      {cartoes.map((c) => (
                        <option key={c.id} value={c.id}>{c.apelido} •••• {c.ultimos4}</option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant">
                      <span className="material-symbols-outlined text-lg">expand_more</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Parcelado (só despesa) */}
              {tipo === 'despesa' && !editandoId && (
                <div className="flex items-center justify-between py-2 border-t border-outline-variant/20 pt-5">
                  <div>
                    <span className="text-sm font-bold text-on-surface">É parcelado?</span>
                    <p className="text-xs text-on-surface-variant mt-0.5">Divida este custo em vários meses</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const next = !parcelado;
                      setParcelado(next);
                      setValue('parcelado', next);
                    }}
                    className={`w-12 h-6 rounded-full relative transition-colors ${parcelado ? 'bg-primary' : 'bg-surface-container-high'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${parcelado ? 'translate-x-7' : 'translate-x-1'}`} />
                  </button>
                </div>
              )}

              {parcelado && (
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Número de Parcelas</label>
                  <input
                    {...register('numeroParcelas', { valueAsNumber: true })}
                    type="number"
                    min={2}
                    max={60}
                    className="w-full px-4 py-3 rounded-xl bg-surface-container-low border-none focus:ring-2 focus:ring-primary text-on-surface font-medium text-sm"
                    placeholder="ex: 12"
                  />
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 pt-2">
              <button
                type="submit"
                disabled={salvando}
                className="w-full py-4 rounded-xl primary-gradient text-on-primary font-bold text-base shadow-lg shadow-primary/20 active:scale-95 transition-all hover:opacity-95 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {salvando ? (
                  <>
                    <span className="material-symbols-outlined text-lg animate-spin">progress_activity</span>
                    Salvando...
                  </>
                ) : (
                  editandoId ? 'Salvar Alterações' : 'Salvar Transação'
                )}
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                disabled={salvando}
                className="w-full py-4 rounded-xl bg-surface-container-high text-on-surface font-semibold text-base hover:bg-surface-container-highest transition-colors active:scale-95 disabled:opacity-50"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </main>

      <BottomNavBar />

      <Toast
        visivel={!!toast}
        tipo={toast?.tipo ?? 'sucesso'}
        mensagem={toast?.mensagem ?? ''}
        onFechar={() => setToast(null)}
      />
    </>
  );
}
