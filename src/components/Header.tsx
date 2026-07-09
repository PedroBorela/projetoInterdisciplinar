import { useLayoutEffect, useRef, useState } from "react";

import { useNavigate } from "react-router-dom";

export function Header() {
    const headerRef = useRef<HTMLElement>(null);
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    useLayoutEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <header
            ref={headerRef}
            className={`relative sticky top-0 z-50 flex items-center justify-between whitespace-nowrap px-6 py-4 lg:px-20 transition-all duration-500 ${
                scrolled
                    ? "backdrop-blur-xl bg-surface-container-lowest/90 shadow-ambient"
                    : "bg-surface-container-lowest shadow-sm shadow-primary/5"
            }`}
        >
            <div className="flex items-center gap-3 text-primary">
                <img src="/logo/logoLiso.png" alt="LisoControl" className="h-16 w-16 object-contain" />
                <h2 className="text-on-surface text-title-md font-bold leading-tight tracking-tight">
                    LisoControl
                </h2>
            </div>
            <div className="hidden md:flex flex-1 justify-end gap-10 items-center">
                <nav className="flex items-center gap-8">
                    <a className="nav-item text-on-surface hover:text-primary transition-colors text-body-md"
                        href="#features">Recursos</a>
                    <a className="nav-item text-on-surface hover:text-primary transition-colors text-body-md"
                        href="#credit">Inteligência</a>
                    <a className="nav-item text-on-surface hover:text-primary transition-colors text-body-md"
                        href="#students">Estudantes</a>
                    <button className="nav-item text-on-surface hover:text-primary transition-colors text-body-md bg-transparent border-none cursor-pointer p-0">Preços</button>
                </nav>
                <button 
                    onClick={() => navigate('/login')}
                    className="header-cta cursor-pointer flex items-center justify-center h-11 px-6 bg-[#4800b2] text-white rounded-[1.5rem] font-bold text-[0.875rem] shadow-lg transition-all hover:scale-105 active:scale-95 border-none"
                    style={{ backgroundColor: '#4800b2', color: '#ffffff' }}
                >
                    Começar Agora
                </button>
            </div>
            <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden flex items-center justify-center p-2 rounded-lg hover:bg-surface-variant/20 transition-colors border-none bg-transparent cursor-pointer text-on-surface"
                aria-label="Menu"
            >
                <span className="material-symbols-outlined text-[28px]">
                    {menuOpen ? "close" : "menu"}
                </span>
            </button>
            
            {/* Mobile Menu Dropdown */}
            {menuOpen && (
                <div className="absolute top-full left-0 right-0 bg-surface-container-lowest/95 backdrop-blur-xl border-b border-outline-variant/15 shadow-lg md:hidden flex flex-col p-6 gap-6 z-50 transition-all duration-300">
                    <nav className="flex flex-col gap-4">
                        <a 
                            className="text-on-surface hover:text-primary transition-colors text-body-lg font-medium py-2 border-b border-outline-variant/5 text-left" 
                            href="#features"
                            onClick={() => setMenuOpen(false)}
                        >
                            Recursos
                        </a>
                        <a 
                            className="text-on-surface hover:text-primary transition-colors text-body-lg font-medium py-2 border-b border-outline-variant/5 text-left" 
                            href="#credit"
                            onClick={() => setMenuOpen(false)}
                        >
                            Inteligência
                        </a>
                        <a 
                            className="text-on-surface hover:text-primary transition-colors text-body-lg font-medium py-2 border-b border-outline-variant/5 text-left" 
                            href="#students"
                            onClick={() => setMenuOpen(false)}
                        >
                            Estudantes
                        </a>
                        <button 
                            className="text-left text-on-surface hover:text-primary transition-colors text-body-lg font-medium py-2 border-b border-outline-variant/5 bg-transparent border-none cursor-pointer p-0 w-full"
                            onClick={() => setMenuOpen(false)}
                        >
                            Preços
                        </button>
                    </nav>
                    <div className="flex flex-col gap-3 pt-2">
                        <button 
                            onClick={() => {
                                setMenuOpen(false);
                                navigate('/login');
                            }}
                            className="w-full flex items-center justify-center h-12 px-6 border border-primary/20 text-primary rounded-[1.5rem] font-bold text-body-md hover:bg-primary/5 transition-all active:scale-95 bg-transparent cursor-pointer"
                        >
                            Entrar
                        </button>
                        <button 
                            onClick={() => {
                                setMenuOpen(false);
                                navigate('/cadastro');
                            }}
                            className="w-full flex items-center justify-center h-12 px-6 bg-[#4800b2] text-white rounded-[1.5rem] font-bold text-body-md shadow-lg transition-all hover:scale-[1.02] active:scale-95 border-none cursor-pointer"
                            style={{ backgroundColor: '#4800b2', color: '#ffffff' }}
                        >
                            Começar Agora
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
}
