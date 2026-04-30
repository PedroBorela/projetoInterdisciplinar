
export function TopNavBar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl flex justify-between items-center px-6 py-4 border-b border-outline-variant/20">
      <div className="text-xl font-extrabold tracking-tight text-primary font-headline">LisoControl</div>
      <div className="flex gap-4">
        <button className="p-2 text-slate-500 hover:bg-slate-100 transition-colors rounded-full cursor-pointer">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <button className="p-2 text-primary font-bold transition-all opacity-80 scale-95 cursor-pointer">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>account_circle</span>
        </button>
      </div>
    </nav>
  );
}
