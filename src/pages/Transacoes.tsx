import { Link } from 'react-router-dom';

export function Transacoes() {
  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-surface/90 backdrop-blur-xl flex justify-between items-center px-6 py-4 border-b border-outline-variant/20">
        <div className="text-xl font-extrabold tracking-tight text-primary font-headline">LisoControl</div>
        <div className="flex items-center gap-3">
          <button className="p-2 hover:bg-surface-container-low transition-colors rounded-full text-on-surface-variant">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button className="p-2 hover:bg-surface-container-low transition-colors rounded-full text-on-surface-variant">
            <span className="material-symbols-outlined">account_circle</span>
          </button>
        </div>
      </header>

      <main className="mt-24 pb-36 px-5 max-w-4xl mx-auto">

        {/* Busca */}
        <section className="mb-7 pt-4">
          <h1 className="font-headline text-2xl font-bold text-on-surface mb-5 tracking-tight">Livro-Caixa</h1>
          <div className="relative">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-on-surface-variant">
              <span className="material-symbols-outlined">search</span>
            </div>
            <input
              className="w-full bg-surface-container-lowest rounded-xl py-3.5 pl-12 pr-4 text-on-surface placeholder-outline/60 focus:ring-2 focus:ring-primary transition-all editorial-shadow text-sm"
              placeholder="Buscar transações, lojas ou categorias..."
              type="text"
            />
          </div>
        </section>

        {/* Filtros */}
        <section className="mb-8 flex flex-nowrap overflow-x-auto gap-2.5 pb-1">
          <button className="flex items-center gap-2 bg-primary-fixed text-primary px-4 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap shrink-0">
            <span className="material-symbols-outlined text-sm">calendar_month</span>
            Este Mês
          </button>
          {(['Categorias', 'Tipo', 'Mais Filtros'] as const).map((label, i) => (
            <button
              key={label}
              className="flex items-center gap-2 bg-surface-container-lowest text-on-surface-variant px-4 py-2.5 rounded-full text-sm font-semibold hover:bg-surface-container-low transition-colors whitespace-nowrap shrink-0 editorial-shadow"
            >
              <span className="material-symbols-outlined text-sm">
                {i === 0 ? 'category' : i === 1 ? 'swap_vert' : 'filter_list'}
              </span>
              {label}
            </button>
          ))}
        </section>

        {/* Lista de Transações */}
        <div className="space-y-10">

          {/* Hoje */}
          <div>
            <h3 className="text-xs font-bold text-outline uppercase tracking-widest mb-4 px-1">Hoje, 24 Out</h3>
            <div className="space-y-2.5">

              <div className="group flex items-center justify-between p-4 bg-surface-container-lowest hover:bg-surface-container-low transition-all rounded-2xl editorial-shadow">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-expense-container flex items-center justify-center text-expense shrink-0">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>restaurant</span>
                  </div>
                  <div>
                    <p className="text-on-surface font-semibold text-sm">Cafeteria Daily Grind</p>
                    <p className="text-on-surface-variant text-xs font-medium mt-0.5">Alimentação • 09:15 AM</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-expense font-bold text-base">- R$ 12,50</p>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 text-on-surface-variant hover:text-primary transition-colors rounded-lg hover:bg-surface-container">
                      <span className="material-symbols-outlined text-xl">edit</span>
                    </button>
                    <button className="p-2 text-on-surface-variant hover:text-expense transition-colors rounded-lg hover:bg-expense-container">
                      <span className="material-symbols-outlined text-xl">delete</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="group flex items-center justify-between p-4 bg-surface-container-lowest hover:bg-surface-container-low transition-all rounded-2xl editorial-shadow">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-income-container flex items-center justify-center text-income shrink-0">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>account_balance_wallet</span>
                  </div>
                  <div>
                    <p className="text-on-surface font-semibold text-sm">Depósito de Bolsa</p>
                    <p className="text-on-surface-variant text-xs font-medium mt-0.5">Educação • 12:40 PM</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-income font-bold text-base">+ R$ 1.200,00</p>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 text-on-surface-variant hover:text-primary transition-colors rounded-lg hover:bg-surface-container">
                      <span className="material-symbols-outlined text-xl">edit</span>
                    </button>
                    <button className="p-2 text-on-surface-variant hover:text-expense transition-colors rounded-lg hover:bg-expense-container">
                      <span className="material-symbols-outlined text-xl">delete</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Ontem */}
          <div>
            <h3 className="text-xs font-bold text-outline uppercase tracking-widest mb-4 px-1">Ontem, 23 Out</h3>
            <div className="space-y-2.5">

              <div className="group flex items-center justify-between p-4 bg-surface-container-lowest hover:bg-surface-container-low transition-all rounded-2xl editorial-shadow">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-primary shrink-0">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>shopping_bag</span>
                  </div>
                  <div>
                    <p className="text-on-surface font-semibold text-sm">Livraria do Campus</p>
                    <p className="text-on-surface-variant text-xs font-medium mt-0.5">Livros • 03:22 PM</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-expense font-bold text-base">- R$ 84,20</p>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 text-on-surface-variant hover:text-primary transition-colors rounded-lg hover:bg-surface-container">
                      <span className="material-symbols-outlined text-xl">edit</span>
                    </button>
                    <button className="p-2 text-on-surface-variant hover:text-expense transition-colors rounded-lg hover:bg-expense-container">
                      <span className="material-symbols-outlined text-xl">delete</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="group flex items-center justify-between p-4 bg-surface-container-lowest hover:bg-surface-container-low transition-all rounded-2xl editorial-shadow">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-primary shrink-0">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>directions_bus</span>
                  </div>
                  <div>
                    <p className="text-on-surface font-semibold text-sm">Metrô - Recarga Automática</p>
                    <p className="text-on-surface-variant text-xs font-medium mt-0.5">Transporte • 08:00 AM</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-expense font-bold text-base">- R$ 40,00</p>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 text-on-surface-variant hover:text-primary transition-colors rounded-lg hover:bg-surface-container">
                      <span className="material-symbols-outlined text-xl">edit</span>
                    </button>
                    <button className="p-2 text-on-surface-variant hover:text-expense transition-colors rounded-lg hover:bg-expense-container">
                      <span className="material-symbols-outlined text-xl">delete</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card de Insights */}
          <div className="relative overflow-hidden rounded-2xl p-6 primary-gradient text-on-primary editorial-shadow">
            <div className="relative z-10">
              <p className="text-[10px] uppercase font-bold tracking-widest opacity-70 mb-1">Insights</p>
              <h4 className="font-headline text-lg font-bold mb-2">Gastos em 'Alimentação' caíram 12%</h4>
              <p className="text-sm opacity-90 max-w-[80%] leading-relaxed">Bom trabalho! Você economizou R$ 45,20 comparado ao mês passado. Considere mover isso para sua meta.</p>
            </div>
            <div className="absolute right-[-20px] bottom-[-20px] opacity-10 pointer-events-none">
              <span className="material-symbols-outlined text-[160px]">trending_down</span>
            </div>
          </div>

        </div>
      </main>

      {/* FAB */}
      <Link
        to="/nova-transacao"
        className="fixed right-5 bottom-28 w-14 h-14 primary-gradient text-on-primary rounded-full shadow-[0_12px_32px_rgba(72,0,178,0.25)] flex items-center justify-center z-50 hover:scale-105 active:scale-95 transition-all"
      >
        <span className="material-symbols-outlined text-2xl">add</span>
      </Link>

      {/* Bottom Nav */}
      <nav className="bottom-nav">
        <Link className="bottom-nav-item" to="/dashboard">
          <span className="material-symbols-outlined">home</span>
          <span>Início</span>
        </Link>
        <Link className="bottom-nav-item active" to="/transacoes">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>receipt_long</span>
          <span>Atividade</span>
        </Link>
        <Link className="bottom-nav-item" to="/calendario">
          <span className="material-symbols-outlined">calendar_today</span>
          <span>Calendário</span>
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
