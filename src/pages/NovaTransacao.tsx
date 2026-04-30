import { Link } from 'react-router-dom';

export function NovaTransacao() {
  return (
    <>
      <nav className="bg-surface/90 backdrop-blur-xl fixed top-0 w-full z-50 flex justify-between items-center px-6 py-4 border-b border-outline-variant/20">
        <div className="text-xl font-extrabold tracking-tight text-primary font-headline">LisoControl</div>
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-full text-on-surface-variant hover:bg-surface-container-low transition-colors">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button className="p-2 rounded-full text-on-surface-variant hover:bg-surface-container-low transition-colors">
            <span className="material-symbols-outlined">account_circle</span>
          </button>
        </div>
      </nav>

      <main className="pt-24 pb-36 px-5 flex flex-col items-center">
        <div className="w-full max-w-xl">

          <header className="mb-8 text-center">
            <h1 className="font-headline text-3xl font-bold tracking-tight text-on-surface mb-2">Novo Registro</h1>
            <p className="text-on-surface-variant font-medium text-sm">Adicione um novo registro ao seu livro-caixa</p>
          </header>

          <div className="space-y-7">

            {/* Toggle Despesa / Receita */}
            <div className="bg-surface-container-low p-1.5 rounded-2xl flex items-center gap-1">
              <button className="flex-1 py-3 text-sm font-bold rounded-xl bg-surface-container-lowest text-expense shadow-sm transition-all">
                Despesa
              </button>
              <button className="flex-1 py-3 text-sm font-bold rounded-xl text-on-surface-variant hover:text-on-surface transition-all">
                Receita
              </button>
            </div>

            {/* Valor */}
            <div className="text-center py-4">
              <label className="block text-xs font-semibold text-primary uppercase tracking-widest mb-3">Valor</label>
              <div className="relative inline-flex items-center gap-2">
                <span className="font-headline text-3xl font-bold text-on-surface-variant">R$</span>
                <input
                  className="bg-transparent border-none text-center font-headline text-6xl font-extrabold focus:ring-0 placeholder:text-surface-container-high tracking-tighter w-48 text-on-surface"
                  placeholder="0,00"
                  type="number"
                />
              </div>
              <div className="mt-3 h-0.5 w-32 mx-auto bg-primary rounded-full" />
            </div>

            {/* Detalhes */}
            <div className="bg-surface-container-lowest rounded-2xl p-7 space-y-6 editorial-shadow">

              <div className="space-y-2">
                <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Para que é isso?</label>
                <input
                  className="w-full px-4 py-3.5 rounded-xl bg-surface-container-low border-none focus:ring-2 focus:ring-primary text-on-surface font-medium placeholder:text-outline/50 transition-all text-sm"
                  placeholder="ex: Mensalidade, Livros..."
                  type="text"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Categoria</label>
                  <div className="relative">
                    <select className="w-full appearance-none px-4 py-3.5 rounded-xl bg-surface-container-low border-none focus:ring-2 focus:ring-primary text-on-surface font-medium cursor-pointer transition-all pr-10 text-sm">
                      <option>Educação</option>
                      <option>Lazer</option>
                      <option>Refeição</option>
                      <option>Transporte</option>
                      <option>Moradia</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant">
                      <span className="material-symbols-outlined text-lg">expand_more</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Data</label>
                  <input
                    className="w-full px-4 py-3.5 rounded-xl bg-surface-container-low border-none focus:ring-2 focus:ring-primary text-on-surface font-medium transition-all text-sm"
                    type="date"
                    defaultValue="2023-10-27"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Meio de Pagamento</label>
                <div className="flex gap-2">
                  {([
                    { icon: 'credit_card', label: 'Cartão' },
                    { icon: 'payments', label: 'Dinheiro' },
                    { icon: 'account_balance_wallet', label: 'Digital' },
                  ] as const).map(({ icon, label }) => (
                    <button
                      key={label}
                      className="flex-1 py-3 px-2 rounded-xl bg-surface-container-low text-xs font-bold text-on-surface hover:bg-primary-fixed hover:text-primary transition-colors flex items-center justify-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-base">{icon}</span>
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between py-2 border-t border-outline-variant/20 pt-5">
                <div>
                  <span className="text-sm font-bold text-on-surface">É parcelado?</span>
                  <p className="text-xs text-on-surface-variant mt-0.5">Divida este custo em vários meses</p>
                </div>
                <button className="w-12 h-6 bg-surface-container-high rounded-full relative transition-colors hover:bg-primary-fixed">
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 pt-2">
              <button className="w-full py-4 rounded-xl primary-gradient text-on-primary font-bold text-base shadow-lg shadow-primary/20 active:scale-95 transition-all hover:opacity-95">
                Salvar Transação
              </button>
              <button className="w-full py-4 rounded-xl bg-surface-container-high text-on-surface font-semibold text-base hover:bg-surface-container-highest transition-colors active:scale-95">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Nav */}
      <nav className="bottom-nav md:hidden">
        <Link className="bottom-nav-item" to="/dashboard">
          <span className="material-symbols-outlined">home</span>
          <span>Início</span>
        </Link>
        <Link className="bottom-nav-item" to="/transacoes">
          <span className="material-symbols-outlined">receipt_long</span>
          <span>Atividade</span>
        </Link>
        <Link className="bottom-nav-item active" to="/nova-transacao">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>add_circle</span>
          <span>Adicionar</span>
        </Link>
        <Link className="bottom-nav-item" to="/categorias">
          <span className="material-symbols-outlined">analytics</span>
          <span>Análise</span>
        </Link>
        <a className="bottom-nav-item" href="#">
          <span className="material-symbols-outlined">menu</span>
          <span>Mais</span>
        </a>
      </nav>
    </>
  );
}
