import { Link } from 'react-router-dom';

export function Dashboard() {
  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-surface/90 backdrop-blur-xl flex justify-between items-center px-6 py-4 border-b border-outline-variant/20">
        <div className="text-xl font-extrabold tracking-tight text-primary font-headline">LisoControl</div>
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-full hover:bg-surface-container-low transition-colors text-on-surface-variant">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <div className="h-10 w-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary font-bold overflow-hidden ring-2 ring-primary-fixed">
            <img alt="Perfil" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAcKvjz0OmbKH82nVBxyv7jSwJmY4bMoksIeWNvwiGuMXlWzf0VGcmwdBJMAHE9Qj9MGP0TFjL3gT5f64_kCHEMAad_kY9rBZhEZw11lMAUarZXWXIq4I78Smik8JPe3sdilJwUyCqd198RK505Fak2So9rBYvYAMlJ9gEeqG4xjojpTTUJaoAfQbiuKM9J46n8JrwwgeNPp77b16h4bJhTZcgvwC-gesPvHdI3LVq_5sJAMKX3YH_LrCaqP3J67Qr-AvjMz1nHAHo"/>
          </div>
        </div>
      </nav>

      <main className="pt-28 pb-36 px-5 max-w-7xl mx-auto space-y-8">

        {/* Hero — Saldo Total */}
        <section className="relative">
          <div className="primary-gradient rounded-2xl p-8 text-on-primary editorial-shadow flex flex-col md:flex-row md:items-end justify-between gap-6 overflow-hidden relative">
            <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <span className="text-xs font-label font-semibold opacity-70 uppercase tracking-widest">Livro-Caixa • Saldo Total</span>
              <h1 className="text-5xl md:text-6xl font-headline font-extrabold tracking-tighter mt-2 mb-2">R$ 4.280,50</h1>
              <div className="flex items-center gap-1.5 text-secondary-fixed">
                <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>trending_up</span>
                <span className="text-xs font-semibold">+12,4% desde o mês passado</span>
              </div>
            </div>
            <div className="flex gap-3 relative z-10">
              <button className="px-5 py-2.5 bg-white/20 backdrop-blur-md text-white font-semibold rounded-xl hover:bg-white/30 transition-all text-sm">
                Transferir
              </button>
              <button className="px-5 py-2.5 bg-white text-primary font-bold rounded-xl editorial-shadow hover:scale-105 transition-all text-sm">
                Detalhes
              </button>
            </div>
          </div>
        </section>

        {/* Resumo + Categorias */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-6">

          {/* Resumo Mensal */}
          <div className="md:col-span-4 bg-surface-container-lowest rounded-2xl p-6 editorial-shadow flex flex-col justify-between">
            <h3 className="font-headline font-bold text-lg mb-6 text-on-surface">Resumo Mensal</h3>
            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-income-container rounded-xl flex items-center justify-center text-income shrink-0">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>arrow_downward</span>
                </div>
                <div>
                  <p className="text-xs font-label font-semibold text-on-surface-variant uppercase tracking-wider">Entradas</p>
                  <p className="text-xl font-bold font-headline text-income">+ R$ 3.200,00</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-expense-container rounded-xl flex items-center justify-center text-expense shrink-0">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>arrow_upward</span>
                </div>
                <div>
                  <p className="text-xs font-label font-semibold text-on-surface-variant uppercase tracking-wider">Saídas</p>
                  <p className="text-xl font-bold font-headline text-expense">- R$ 1.840,25</p>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-5 border-t border-outline-variant/20">
              <div className="w-full bg-surface-container-high h-2.5 rounded-full overflow-hidden flex">
                <div className="bg-income h-full rounded-full" style={{ width: '65%' }} />
                <div className="bg-expense h-full rounded-full" style={{ width: '35%' }} />
              </div>
              <p className="text-xs mt-2.5 font-semibold text-on-surface-variant">
                Saúde Financeira: <span className="text-income">Estável</span>
              </p>
            </div>
          </div>

          {/* Principais Categorias */}
          <div className="md:col-span-8 bg-surface-container-lowest rounded-2xl p-6 editorial-shadow flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <h3 className="font-headline font-bold text-lg mb-5 text-on-surface">Principais Categorias</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3.5 bg-surface-container-low rounded-xl hover:bg-surface-container transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>lunch_dining</span>
                    <span className="font-medium text-sm text-on-surface">Alimentação &amp; Diversão</span>
                  </div>
                  <span className="font-bold text-sm text-on-surface">R$ 420,00</span>
                </div>
                <div className="flex items-center justify-between p-3.5 bg-surface-container-low rounded-xl hover:bg-surface-container transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>school</span>
                    <span className="font-medium text-sm text-on-surface">Educação &amp; Livros</span>
                  </div>
                  <span className="font-bold text-sm text-on-surface">R$ 800,00</span>
                </div>
                <div className="flex items-center justify-between p-3.5 bg-surface-container-low rounded-xl hover:bg-surface-container transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>movie</span>
                    <span className="font-medium text-sm text-on-surface">Entretenimento</span>
                  </div>
                  <span className="font-bold text-sm text-on-surface">R$ 125,50</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center min-w-[160px]">
              <div className="relative w-36 h-36 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90">
                  <circle className="text-surface-container-high" cx="72" cy="72" fill="transparent" r="60" stroke="currentColor" strokeWidth="12" />
                  <circle className="text-primary" cx="72" cy="72" fill="transparent" r="60" stroke="currentColor" strokeDasharray="377" strokeDashoffset="160" strokeWidth="14" strokeLinecap="round" />
                  <circle className="text-income" cx="72" cy="72" fill="transparent" r="60" stroke="currentColor" strokeDasharray="377" strokeDashoffset="340" strokeWidth="14" strokeLinecap="round" />
                </svg>
                <div className="absolute text-center">
                  <p className="text-xs font-label font-semibold text-on-surface-variant">Gasto</p>
                  <p className="text-2xl font-bold font-headline text-on-surface">58%</p>
                </div>
              </div>
              <p className="mt-4 text-xs font-medium text-center text-on-surface-variant max-w-[140px] leading-relaxed">do limite mensal de R$ 3.000 usado</p>
            </div>
          </div>
        </section>

        {/* Acesso Rápido */}
        <section>
          <h3 className="font-headline font-bold text-lg mb-5 text-on-surface">Acesso Rápido</h3>
          <div className="grid grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { to: '/calendario', icon: 'calendar_month', label: 'Calendário' },
              { to: '/nova-transacao', icon: 'add_card', label: 'Nova Transação' },
              { to: '#', icon: 'speed', label: 'Limites' },
              { to: '#', icon: 'credit_card', label: 'Cartões' },
              { to: '#', icon: 'horizontal_split', label: 'Parcelas' },
              { to: '#', icon: 'sync', label: 'Recorrente' },
            ].map(({ to, icon, label }) => (
              <Link
                key={label}
                to={to}
                className="bg-surface-container-lowest p-5 rounded-2xl hover:bg-primary-fixed hover:shadow-md transition-all group text-center flex flex-col items-center gap-2 editorial-shadow"
              >
                <span className="material-symbols-outlined text-primary text-3xl group-hover:scale-110 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>{icon}</span>
                <span className="text-xs font-semibold text-on-surface leading-tight">{label}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Histórico Recente */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-headline font-bold text-lg text-on-surface">Histórico Recente</h3>
            <Link to="/transacoes" className="text-primary font-bold text-sm hover:underline underline-offset-2">Ver Tudo</Link>
          </div>
          <div className="bg-surface-container-lowest rounded-2xl overflow-hidden editorial-shadow divide-y divide-outline-variant/10">
            <div className="px-4 py-4 flex items-center gap-4 hover:bg-surface-container-low transition-colors cursor-pointer">
              <div className="w-11 h-11 rounded-xl bg-orange-100 flex items-center justify-center text-orange-700 shrink-0">
                <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>coffee</span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-sm text-on-surface truncate">Cafeteria do Campus</h4>
                <p className="text-xs text-on-surface-variant mt-0.5">Hoje, 10:24 AM</p>
              </div>
              <div className="text-right shrink-0">
                <p className="font-bold text-sm text-expense">- R$ 4,50</p>
                <p className="text-[10px] text-outline uppercase tracking-wide">Refeição</p>
              </div>
            </div>
            <div className="px-4 py-4 flex items-center gap-4 hover:bg-surface-container-low transition-colors cursor-pointer">
              <div className="w-11 h-11 rounded-xl bg-income-container flex items-center justify-center text-income shrink-0">
                <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>account_balance_wallet</span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-sm text-on-surface truncate">Depósito de Bolsa</h4>
                <p className="text-xs text-on-surface-variant mt-0.5">Ontem, 04:15 PM</p>
              </div>
              <div className="text-right shrink-0">
                <p className="font-bold text-sm text-income">+ R$ 1.500,00</p>
                <p className="text-[10px] text-outline uppercase tracking-wide">Renda</p>
              </div>
            </div>
            <div className="px-4 py-4 flex items-center gap-4 hover:bg-surface-container-low transition-colors cursor-pointer">
              <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700 shrink-0">
                <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>shopping_cart</span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-sm text-on-surface truncate">Livraria Universitária</h4>
                <p className="text-xs text-on-surface-variant mt-0.5">24 Ago, 11:30 AM</p>
              </div>
              <div className="text-right shrink-0">
                <p className="font-bold text-sm text-expense">- R$ 142,10</p>
                <p className="text-[10px] text-outline uppercase tracking-wide">Educação</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FAB */}
      <Link
        to="/nova-transacao"
        className="fixed bottom-28 right-5 w-14 h-14 primary-gradient rounded-full shadow-[0_12px_32px_rgba(72,0,178,0.3)] flex items-center justify-center text-white z-50 hover:scale-110 active:scale-95 transition-all"
      >
        <span className="material-symbols-outlined text-2xl">add</span>
      </Link>

      {/* Bottom Nav */}
      <nav className="bottom-nav">
        <Link className="bottom-nav-item active" to="/dashboard">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
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
