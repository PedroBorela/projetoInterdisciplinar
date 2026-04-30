import { Link } from 'react-router-dom';

export function Calendario() {
  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-surface/90 backdrop-blur-xl flex justify-between items-center px-6 py-4 border-b border-outline-variant/20">
        <div className="text-xl font-extrabold tracking-tight text-primary font-headline">LisoControl</div>
        <div className="flex items-center gap-3">
          <button className="p-2 text-on-surface-variant hover:bg-surface-container-low transition-colors rounded-full">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button className="p-2 text-on-surface-variant hover:bg-surface-container-low transition-colors rounded-full">
            <span className="material-symbols-outlined">account_circle</span>
          </button>
        </div>
      </header>

      <main className="pt-28 pb-36 px-5 max-w-4xl mx-auto">

        {/* Title */}
        <div className="mb-8">
          <h1 className="font-headline text-4xl font-bold tracking-tight text-on-surface mb-2">Insights</h1>
          <p className="text-on-surface-variant font-medium text-sm">Organizando sua linha do tempo financeira, um registro por vez.</p>
        </div>

        {/* Controles */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-7">
          <div className="flex bg-surface-container-lowest p-1.5 rounded-2xl editorial-shadow">
            <button className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all bg-primary text-on-primary shadow-sm">Mensal</button>
            <button className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all text-on-surface-variant hover:text-primary">Semanal</button>
          </div>
          <div className="flex items-center gap-3 bg-surface-container-lowest px-4 py-2.5 rounded-2xl editorial-shadow">
            <button className="text-primary hover:opacity-70 transition-all">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <span className="font-headline text-base font-bold min-w-[136px] text-center text-on-surface">Outubro 2023</span>
            <button className="text-primary hover:opacity-70 transition-all">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Calendário */}
          <div className="lg:col-span-8 bg-surface-container-lowest rounded-2xl p-7 editorial-shadow">
            <div className="grid grid-cols-7 gap-y-6 text-center">
              {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'].map(d => (
                <div key={d} className="text-[10px] font-bold text-outline uppercase tracking-widest pb-3">{d}</div>
              ))}

              {/* Dias do mês anterior */}
              {[25, 26, 27, 28, 29, 30].map(d => (
                <div key={d} className="flex flex-col items-center justify-center p-2 opacity-25 text-sm font-medium text-on-surface-variant">{d}</div>
              ))}

              {/* Dia 1 */}
              <div className="relative flex flex-col items-center justify-center p-2 text-sm font-bold text-on-surface">
                1
                <div className="absolute -bottom-1 flex gap-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-income" />
                </div>
              </div>

              {/* Dias 2–11 */}
              {[
                { d: 2, dots: ['expense'] as string[] },
                { d: 3, dots: ['expense'] as string[] },
                { d: 4, dots: ['income', 'expense'] as string[] },
                { d: 5, dots: ['expense'] as string[] },
                { d: 6, dots: ['income'] as string[] },
                { d: 7, dots: [] as string[] },
                { d: 8, dots: [] as string[] },
                { d: 9, dots: [] as string[] },
                { d: 10, dots: [] as string[] },
                { d: 11, dots: [] as string[] },
              ].map(({ d, dots }) => (
                <div key={d} className="relative flex flex-col items-center justify-center p-2 text-sm font-bold text-on-surface hover:bg-surface-container-low rounded-xl transition-colors cursor-pointer">
                  {d}
                  {dots.length > 0 && (
                    <div className="absolute -bottom-1 flex gap-0.5">
                      {dots.map((c, i) => (
                        <span key={i} className={`w-1.5 h-1.5 rounded-full ${c === 'income' ? 'bg-income' : 'bg-expense'}`} />
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Hoje — dia 12 destacado */}
              <div className="relative flex flex-col items-center justify-center p-2 bg-primary text-on-primary rounded-xl ring-4 ring-primary/20 text-sm font-bold cursor-pointer">
                12
                <div className="absolute -bottom-1 flex gap-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
                  <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
                </div>
              </div>

              {/* Dias 13–22 */}
              {[13, 14, 15, 16, 17, 18, 19, 20, 21, 22].map(d => (
                <div key={d} className="relative flex flex-col items-center justify-center p-2 text-sm font-bold text-on-surface hover:bg-surface-container-low rounded-xl transition-colors cursor-pointer">
                  {d}
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-5">

            {/* Resumo do dia */}
            <div className="primary-gradient rounded-2xl p-7 text-on-primary editorial-shadow">
              <p className="text-sm font-semibold opacity-70 mb-0.5">Quinta-feira</p>
              <h3 className="font-headline text-2xl font-bold mb-6 tracking-tight">12 de Outubro</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold uppercase tracking-wider opacity-70">Ganhos</span>
                  <span className="font-headline text-lg font-bold">+ R$ 1.240,00</span>
                </div>
                <div className="h-px bg-white/15" />
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold uppercase tracking-wider opacity-70">Gastos</span>
                  <span className="font-headline text-lg font-bold">- R$ 342,12</span>
                </div>
              </div>
            </div>

            {/* Saúde diária */}
            <div className="bg-surface-container-lowest rounded-2xl p-6 editorial-shadow">
              <p className="text-xs font-bold uppercase tracking-widest text-outline mb-4">Saúde Diária</p>
              <div className="w-full h-2.5 bg-surface-container-high rounded-full overflow-hidden flex">
                <div className="h-full bg-income rounded-full" style={{ width: '75%' }} />
                <div className="h-full bg-expense rounded-full" style={{ width: '25%' }} />
              </div>
              <div className="flex justify-between mt-3">
                <span className="text-[10px] font-bold text-income uppercase tracking-wide">Sobra</span>
                <span className="text-[10px] font-bold text-expense uppercase tracking-wide">Gasto</span>
              </div>
            </div>
          </div>
        </div>

        {/* Registros do dia */}
        <section className="mt-10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-headline text-xl font-bold text-on-surface">Registros de 12 de Outubro</h2>
            <Link to="/nova-transacao" className="flex items-center gap-1.5 text-primary font-bold text-sm hover:underline underline-offset-2">
              <span className="material-symbols-outlined text-lg">add_circle</span>
              Adicionar Registro
            </Link>
          </div>
          <div className="space-y-3">

            <div className="flex items-center justify-between bg-surface-container-lowest p-5 rounded-2xl hover:bg-surface-container-low transition-all cursor-pointer editorial-shadow">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-income-container flex items-center justify-center text-income shrink-0">
                  <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>payments</span>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-on-surface">Pagamento Freelance</h4>
                  <p className="text-sm font-medium text-on-surface-variant mt-0.5">Cliente: Studio Fluid</p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="font-headline font-bold text-base text-income">+ R$ 1.240,00</p>
                <p className="text-[10px] font-bold text-outline uppercase tracking-widest">09:12 AM</p>
              </div>
            </div>

            <div className="flex items-center justify-between bg-surface-container-lowest p-5 rounded-2xl hover:bg-surface-container-low transition-all cursor-pointer editorial-shadow">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-expense-container flex items-center justify-center text-expense shrink-0">
                  <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>restaurant</span>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-on-surface">Almoço Cozinha Orgânica</h4>
                  <p className="text-sm font-medium text-on-surface-variant mt-0.5">Alimentação &amp; Jantar</p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="font-headline font-bold text-base text-expense">- R$ 42,12</p>
                <p className="text-[10px] font-bold text-outline uppercase tracking-widest">01:45 PM</p>
              </div>
            </div>

            <div className="flex items-center justify-between bg-surface-container-lowest p-5 rounded-2xl hover:bg-surface-container-low transition-all cursor-pointer editorial-shadow">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-expense-container flex items-center justify-center text-expense shrink-0">
                  <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>shopping_cart</span>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-on-surface">Papelaria Premium</h4>
                  <p className="text-sm font-medium text-on-surface-variant mt-0.5">Materiais Acadêmicos</p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="font-headline font-bold text-base text-expense">- R$ 300,00</p>
                <p className="text-[10px] font-bold text-outline uppercase tracking-widest">04:30 PM</p>
              </div>
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
        <Link className="bottom-nav-item active" to="/calendario">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>calendar_today</span>
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
