import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useConfigStore } from '../stores/useConfigStore';

export function TopNavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { nomeUsuario, emailUsuario } = useConfigStore();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="fixed top-0 w-full z-50 bg-surface/90 backdrop-blur-xl flex justify-between items-center px-6 py-4 border-b border-outline-variant/20">
      <div className="flex items-center gap-2">
        <img src="/logo/logoLiso.png" alt="LisoControl" className="h-9 w-9 object-contain" />
        <span className="text-xl font-extrabold tracking-tight text-primary font-headline">LisoControl</span>
      </div>
      <div className="flex gap-3">
        <button className="p-2 text-on-surface-variant hover:bg-surface-container-low transition-colors rounded-full cursor-pointer">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <div className="relative" ref={menuRef}>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="h-10 w-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary font-bold overflow-hidden ring-2 ring-primary-fixed cursor-pointer transition-transform hover:scale-105"
          >
            {nomeUsuario.charAt(0).toUpperCase()}
          </button>
          
          {/* Menu Dropdown */}
          <div 
            className={`absolute right-0 mt-2 w-56 bg-surface-container-lowest rounded-2xl shadow-xl border border-outline-variant/20 overflow-hidden transition-all origin-top-right ${isMenuOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}`}
          >
            <div className="p-4 border-b border-outline-variant/20">
              <p className="font-bold text-on-surface">{nomeUsuario}</p>
              <p className="text-sm text-on-surface-variant">{emailUsuario}</p>
            </div>
            <div className="p-2">
              <button 
                onClick={() => { setIsMenuOpen(false); navigate('/configuracoes'); }}
                className="w-full flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:text-primary hover:bg-primary-fixed/50 rounded-xl transition-colors text-left cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">settings</span>
                <span className="font-medium">Configurações</span>
              </button>
              <button 
                onClick={() => { setIsMenuOpen(false); navigate('/ajuda'); }}
                className="w-full flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:text-primary hover:bg-primary-fixed/50 rounded-xl transition-colors text-left cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">help</span>
                <span className="font-medium">Ajuda e Suporte</span>
              </button>
            </div>
            <div className="p-2 border-t border-outline-variant/20">
              <button 
                onClick={() => { setIsMenuOpen(false); navigate('/'); }}
                className="w-full flex items-center gap-3 px-3 py-2 text-error hover:bg-error-container/50 rounded-xl transition-colors text-left cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">logout</span>
                <span className="font-medium">Sair</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
