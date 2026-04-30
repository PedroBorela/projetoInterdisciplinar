import { Link } from 'react-router-dom';

export function Categorias() {
  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-surface/90 backdrop-blur-xl flex justify-between items-center px-6 py-4 border-b border-outline-variant/20">
        <div className="text-xl font-extrabold tracking-tight text-primary font-headline">LisoControl</div>
        <div className="flex items-center gap-3">
          <button className="p-2 text-on-surface-variant hover:bg-surface-container-low transition-colors rounded-full">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button className="p-2 text-on-surface-variant hover:bg-surface-container-low transition-colors rounded-full">
            <span className="material-symbols-outlined">account_circle</span>
          </button>
        </div>
      </nav>

      <main className="container mx-auto px-5 pt-28 pb-36 max-w-2xl">

        {/* Header */}
        <header className="mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
          <div>
            <h1 className="font-headline text-3xl font-bold tracking-tight text-on-surface mb-1.5">Gerenciar Categorias</h1>
            <p className="text-on-surface-variant text-sm font-medium">Personalize suas categorias e acompanhe os limites de gastos.</p>
          </div>
          <button className="primary-gradient text-on-primary px-5 py-3 rounded-xl font-semibold editorial-shadow flex items-center gap-2 hover:opacity-90 transition-all active:scale-95 shrink-0 self-start sm:self-auto">
            <span className="material-symbols-outlined text-lg">add</span>
            Nova Categoria
          </button>
        </header>

        {/* Stats */}
        <section className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-primary-fixed p-6 rounded-2xl relative overflow-hidden h-32 flex flex-col justify-end editorial-shadow">
            <span className="material-symbols-outlined absolute top-4 right-4 text-primary opacity-15 text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>account_balance_wallet</span>
            <p className="text-primary font-bold text-xs uppercase tracking-widest mb-1">Total Alocado</p>
            <p className="font-headline text-2xl font-extrabold text-on-primary-fixed tracking-tight">R$ 3.450,00</p>
          </div>
          <div className="bg-income-container p-6 rounded-2xl relative overflow-hidden h-32 flex flex-col justify-end editorial-shadow">
            <span className="material-symbols-outlined absolute top-4 right-4 text-income opacity-20 text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>trending_up</span>
            <p className="text-income font-bold text-xs uppercase tracking-widest mb-1">Mais Utilizado</p>
            <p className="font-headline text-2xl font-extrabold text-income tracking-tight">Lazer</p>
          </div>
        </section>

        {/* Lista de Categorias */}
        <section className="space-y-3">
          {[
            { bg: 'bg-orange-100', text: 'text-orange-700', icon: 'restaurant', name: 'Alimentação', count: 12, amount: 'R$ 842,20' },
            { bg: 'bg-blue-100', text: 'text-blue-700', icon: 'directions_bus', name: 'Transporte', count: 45, amount: 'R$ 215,50' },
            { bg: 'bg-emerald-100', text: 'text-emerald-700', icon: 'sports_esports', name: 'Lazer', count: 8, amount: 'R$ 1.200,00' },
            { bg: 'bg-violet-100', text: 'text-violet-700', icon: 'school', name: 'Educação', count: 3, amount: 'R$ 1.192,30' },
            { bg: 'bg-pink-100', text: 'text-pink-700', icon: 'shopping_bag', name: 'Compras', count: 21, amount: 'R$ 342,15' },
          ].map(({ bg, text, icon, name, count, amount }) => (
            <div
              key={name}
              className="group bg-surface-container-lowest hover:bg-surface-container-low transition-all duration-200 rounded-2xl p-5 flex items-center justify-between editorial-shadow"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center ${text} shrink-0`}>
                  <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>{icon}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-base text-on-surface">{name}</h3>
                  <p className="text-on-surface-variant text-xs font-semibold tracking-wide uppercase mt-0.5">{count} Transações</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-xs font-semibold text-on-surface-variant mb-0.5">Gasto</p>
                  <p className="font-headline font-bold text-lg text-on-surface">{amount}</p>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 text-on-surface-variant hover:text-primary hover:bg-surface-container rounded-lg transition-colors">
                    <span className="material-symbols-outlined text-xl">edit</span>
                  </button>
                  <button className="p-2 text-on-surface-variant hover:text-expense hover:bg-expense-container rounded-lg transition-colors">
                    <span className="material-symbols-outlined text-xl">delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Banner IA */}
        <section className="mt-10">
          <div className="bg-surface-container-low rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8 overflow-hidden editorial-shadow">
            <div className="z-10 text-center md:text-left">
              <h2 className="font-headline text-xl font-bold text-on-surface mb-2">Mente Limpa, Bolso Cheio</h2>
              <p className="text-on-surface-variant text-sm max-w-sm mb-5 leading-relaxed">Categorizar seus gastos ajuda nosso motor de IA a fornecer melhores recomendações de economia personalizadas para seu estilo de vida.</p>
              <button className="text-primary font-bold flex items-center gap-1.5 hover:gap-2.5 transition-all text-sm">
                Saiba mais sobre Orçamentos
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </button>
            </div>
            <div className="relative w-full h-40 md:h-auto md:w-1/2 min-h-[160px] rounded-xl overflow-hidden shrink-0">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-income/10 rounded-xl" />
              <img
                alt="Visualização abstrata"
                className="w-full h-full object-cover rounded-xl mix-blend-multiply opacity-60"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCURcsTCbPRK3NaXxCbVHoUiHe1ohWtg9giV4tgvmxgfa6zAVAgxlart7R24FrPs52IPzhr3Hmg5AHLmDrZBhLAjIuaMwt3ZATcpweMJXq2R8tZTSk05GoO_g4CyvrcESb6cqYh6CyqHWKXe2IxT_2uPFq3J2_tQrAdY10GGijmbR1DTfLgG_zDIWQafs_6bTny9DSg7OfnG3b7I75ynYZs3ncuFRzWuj9YqXo7xOUr0JjAkS7Rebu3cMShinHhrEoIHWeJ3Yf6vfw"
              />
            </div>
          </div>
        </section>
      </main>

      {/* Bottom Nav */}
      <nav className="bottom-nav">
        <Link className="bottom-nav-item" to="/dashboard">
          <span className="material-symbols-outlined">home</span>
          <span>Início</span>
        </Link>
        <Link className="bottom-nav-item" to="/transacoes">
          <span className="material-symbols-outlined">receipt_long</span>
          <span>Atividade</span>
        </Link>
        <Link className="bottom-nav-item" to="/calendario">
          <span className="material-symbols-outlined">calendar_today</span>
          <span>Calendário</span>
        </Link>
        <Link className="bottom-nav-item active" to="/categorias">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>analytics</span>
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
