import { Link } from 'react-router-dom';

export function BottomNavBar() {
  return (
    <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-6 pt-3 bg-white/90 backdrop-blur-2xl shadow-[0_-12px_32px_rgba(72,0,178,0.06)] rounded-t-[24px] z-50">
      <Link to="/dashboard" className="flex flex-col items-center justify-center text-slate-400 px-5 py-2.5 hover:text-violet-500 transition-all cursor-pointer">
        <span className="material-symbols-outlined mb-1">home</span>
        <span className="font-inter text-[10px] font-semibold tracking-wide uppercase">Início</span>
      </Link>
      <Link to="/transacoes" className="flex flex-col items-center justify-center text-slate-400 px-5 py-2.5 hover:text-violet-500 transition-all cursor-pointer">
        <span className="material-symbols-outlined mb-1">receipt_long</span>
        <span className="font-inter text-[10px] font-semibold tracking-wide uppercase">Atividade</span>
      </Link>
      <Link to="/calendario" className="flex flex-col items-center justify-center text-slate-400 px-5 py-2.5 hover:text-violet-500 transition-all cursor-pointer">
        <span className="material-symbols-outlined mb-1">calendar_today</span>
        <span className="font-inter text-[10px] font-semibold tracking-wide uppercase">Calendário</span>
      </Link>
      <Link to="/categorias" className="flex flex-col items-center justify-center text-slate-400 px-5 py-2.5 hover:text-violet-500 transition-all cursor-pointer">
        <span className="material-symbols-outlined mb-1">analytics</span>
        <span className="font-inter text-[10px] font-semibold tracking-wide uppercase">Análise</span>
      </Link>
      <Link to="/configuracoes" className="flex flex-col items-center justify-center bg-violet-100 text-violet-800 rounded-2xl px-5 py-2.5 scale-90 duration-150 cursor-pointer">
        <span className="material-symbols-outlined mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>menu</span>
        <span className="font-inter text-[10px] font-semibold tracking-wide uppercase">Mais</span>
      </Link>
    </nav>
  );
}
