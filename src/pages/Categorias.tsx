import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TopNavBar } from '../components/TopNavBar';
import { BottomNavBar } from '../components/BottomNavBar';
import { EmptyState } from '../components/EmptyState';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { useCategoriasStore } from '../stores/useCategoriasStore';
import { useTransacoesStore } from '../stores/useTransacoesStore';
import { categoriaSchema, type CategoriaForm } from '../lib/schemas';
import { formatBRL } from '../lib/formatters';
import { calcularPorCategoria } from '../lib/calculators';

const ICONES = [
  'lunch_dining', 'directions_car', 'school', 'movie', 'home', 'favorite',
  'account_balance_wallet', 'shopping_bag', 'flight', 'fitness_center',
  'local_hospital', 'pets', 'music_note', 'restaurant', 'coffee',
  'sports_esports', 'work', 'child_care', 'local_gas_station', 'phone_iphone',
];

const PALETA = [
  { cor: 'bg-orange-500', corTexto: 'text-orange-700', corFundo: 'bg-orange-100', label: 'Laranja' },
  { cor: 'bg-blue-500', corTexto: 'text-blue-700', corFundo: 'bg-blue-100', label: 'Azul' },
  { cor: 'bg-purple-500', corTexto: 'text-purple-700', corFundo: 'bg-purple-100', label: 'Roxo' },
  { cor: 'bg-pink-500', corTexto: 'text-pink-700', corFundo: 'bg-pink-100', label: 'Rosa' },
  { cor: 'bg-yellow-500', corTexto: 'text-yellow-700', corFundo: 'bg-yellow-100', label: 'Amarelo' },
  { cor: 'bg-red-500', corTexto: 'text-red-700', corFundo: 'bg-red-100', label: 'Vermelho' },
  { cor: 'bg-green-500', corTexto: 'text-green-700', corFundo: 'bg-green-100', label: 'Verde' },
  { cor: 'bg-indigo-500', corTexto: 'text-indigo-700', corFundo: 'bg-indigo-100', label: 'Índigo' },
  { cor: 'bg-teal-500', corTexto: 'text-teal-700', corFundo: 'bg-teal-100', label: 'Teal' },
  { cor: 'bg-cyan-500', corTexto: 'text-cyan-700', corFundo: 'bg-cyan-100', label: 'Ciano' },
];

export function Categorias() {
  const { categorias, adicionar, editar, remover } = useCategoriasStore();
  const transacoes = useTransacoesStore((s) => s.transacoes);

  const hoje = new Date();
  const porCategoria = calcularPorCategoria(transacoes, categorias, hoje.getFullYear(), hoje.getMonth() + 1);

  const [modalAberto, setModalAberto] = useState(false);
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [excluindoId, setExcluindoId] = useState<string | null>(null);
  const [paletaSelecionada, setPaletaSelecionada] = useState(PALETA[0]);
  const [iconeSelecionado, setIconeSelecionado] = useState(ICONES[0]);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<CategoriaForm>({
    resolver: zodResolver(categoriaSchema),
  });

  function abrirNova() {
    setEditandoId(null);
    setPaletaSelecionada(PALETA[0]);
    setIconeSelecionado(ICONES[0]);
    reset({ icone: ICONES[0], cor: PALETA[0].cor, corTexto: PALETA[0].corTexto, corFundo: PALETA[0].corFundo });
    setModalAberto(true);
  }

  function abrirEditar(id: string) {
    const cat = categorias.find((c) => c.id === id);
    if (!cat) return;
    setEditandoId(id);
    const paleta = PALETA.find((p) => p.cor === cat.cor) ?? PALETA[0];
    setPaletaSelecionada(paleta);
    setIconeSelecionado(cat.icone);
    reset({ nome: cat.nome, icone: cat.icone, cor: cat.cor, corTexto: cat.corTexto, corFundo: cat.corFundo });
    setModalAberto(true);
  }

  function onSubmit(dados: CategoriaForm) {
    const payload = {
      ...dados,
      icone: iconeSelecionado,
      cor: paletaSelecionada.cor,
      corTexto: paletaSelecionada.corTexto,
      corFundo: paletaSelecionada.corFundo,
    };
    if (editandoId) {
      editar(editandoId, payload);
    } else {
      adicionar(payload);
    }
    setModalAberto(false);
    reset();
  }

  const totalGasto = porCategoria.reduce((s, r) => s + r.total, 0);
  const maiUsada = porCategoria[0]?.categoria.nome ?? '—';

  return (
    <>
      <TopNavBar />

      <main className="pt-28 pb-36 px-5 max-w-3xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-headline text-3xl font-bold tracking-tight text-on-surface">Categorias</h1>
            <p className="text-on-surface-variant text-sm mt-1">Organize e controle seus gastos por categoria</p>
          </div>
          <button
            onClick={abrirNova}
            className="flex items-center gap-2 px-4 py-2.5 primary-gradient text-on-primary font-bold rounded-xl text-sm"
          >
            <span className="material-symbols-outlined text-base">add</span>
            Nova
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-surface-container-lowest rounded-2xl p-5 editorial-shadow">
            <p className="text-xs font-label font-semibold text-on-surface-variant uppercase tracking-wider mb-1">Gasto este mês</p>
            <p className="text-2xl font-bold font-headline text-on-surface">{formatBRL(totalGasto)}</p>
          </div>
          <div className="bg-surface-container-lowest rounded-2xl p-5 editorial-shadow">
            <p className="text-xs font-label font-semibold text-on-surface-variant uppercase tracking-wider mb-1">Mais usada</p>
            <p className="text-2xl font-bold font-headline text-on-surface truncate">{maiUsada}</p>
          </div>
        </div>

        {/* Lista */}
        {categorias.length === 0 ? (
          <EmptyState
            icone="category"
            titulo="Nenhuma categoria"
            descricao="Crie categorias para organizar seus gastos e receitas"
            acao={{ label: 'Criar categoria', onClick: abrirNova }}
          />
        ) : (
          <div className="space-y-3">
            {categorias.map((cat) => {
              const stats = porCategoria.find((r) => r.categoria.id === cat.id);
              return (
                <div
                  key={cat.id}
                  className="bg-surface-container-lowest rounded-2xl p-4 editorial-shadow flex items-center gap-4 group"
                >
                  <div className={`w-12 h-12 ${cat.corFundo} rounded-xl flex items-center justify-center shrink-0`}>
                    <span className={`material-symbols-outlined ${cat.corTexto}`} style={{ fontVariationSettings: "'FILL' 1" }}>
                      {cat.icone}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-on-surface">{cat.nome}</p>
                    <p className="text-xs text-on-surface-variant mt-0.5">
                      {stats ? `${stats.count} transaç${stats.count === 1 ? 'ão' : 'ões'}` : 'Sem transações este mês'}
                    </p>
                  </div>

                  <div className="text-right mr-2">
                    <p className="font-bold text-on-surface">{formatBRL(stats?.total ?? 0)}</p>
                    <p className="text-xs text-on-surface-variant">este mês</p>
                  </div>

                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => abrirEditar(cat.id)}
                      className="w-9 h-9 rounded-xl bg-surface-container-low hover:bg-primary-fixed hover:text-primary flex items-center justify-center transition-colors"
                    >
                      <span className="material-symbols-outlined text-base">edit</span>
                    </button>
                    <button
                      onClick={() => setExcluindoId(cat.id)}
                      className="w-9 h-9 rounded-xl bg-surface-container-low hover:bg-error-container hover:text-error flex items-center justify-center transition-colors"
                    >
                      <span className="material-symbols-outlined text-base">delete</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <BottomNavBar />

      {/* Modal Criar/Editar */}
      {modalAberto && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-backdrop-in" onClick={() => setModalAberto(false)} />
          <div className="relative bg-surface-container-lowest rounded-2xl w-full max-w-md p-6 editorial-shadow max-h-[90vh] overflow-y-auto animate-modal-in">
            <h2 className="font-headline font-bold text-xl text-on-surface mb-6">
              {editandoId ? 'Editar Categoria' : 'Nova Categoria'}
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Nome</label>
                <input
                  {...register('nome')}
                  className="w-full px-4 py-3 rounded-xl bg-surface-container-low border-none focus:ring-2 focus:ring-primary text-on-surface font-medium placeholder:text-outline/50 text-sm"
                  placeholder="ex: Alimentação"
                />
                {errors.nome && <p className="text-xs text-error">{errors.nome.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Ícone</label>
                <div className="grid grid-cols-10 gap-1.5">
                  {ICONES.map((ic) => (
                    <button
                      key={ic}
                      type="button"
                      onClick={() => setIconeSelecionado(ic)}
                      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${iconeSelecionado === ic ? 'bg-primary text-on-primary' : 'bg-surface-container-low hover:bg-primary-fixed'}`}
                    >
                      <span className="material-symbols-outlined text-base">{ic}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Cor</label>
                <div className="flex flex-wrap gap-2">
                  {PALETA.map((p) => (
                    <button
                      key={p.cor}
                      type="button"
                      onClick={() => setPaletaSelecionada(p)}
                      className={`w-8 h-8 rounded-full ${p.cor} transition-transform ${paletaSelecionada.cor === p.cor ? 'scale-125 ring-2 ring-offset-2 ring-primary' : 'hover:scale-110'}`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-surface-container-low rounded-xl">
                <div className={`w-10 h-10 ${paletaSelecionada.corFundo} rounded-lg flex items-center justify-center`}>
                  <span className={`material-symbols-outlined ${paletaSelecionada.corTexto}`} style={{ fontVariationSettings: "'FILL' 1" }}>
                    {iconeSelecionado}
                  </span>
                </div>
                <span className="font-semibold text-on-surface text-sm">Prévia</span>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setModalAberto(false)} className="flex-1 py-3 rounded-xl bg-surface-container-high text-on-surface font-semibold text-sm">
                  Cancelar
                </button>
                <button type="submit" className="flex-1 py-3 rounded-xl primary-gradient text-on-primary font-bold text-sm">
                  {editandoId ? 'Salvar' : 'Criar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {excluindoId && (
        <ConfirmDialog
          mensagem={`Excluir a categoria "${categorias.find((c) => c.id === excluindoId)?.nome}"? As transações relacionadas não serão excluídas.`}
          onConfirmar={() => { remover(excluindoId); setExcluindoId(null); }}
          onCancelar={() => setExcluindoId(null)}
        />
      )}
    </>
  );
}
