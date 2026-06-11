import { useLayoutEffect, useRef, useState } from "react";

import { useNavigate } from "react-router-dom";

export function Header() {
    const headerRef = useRef<HTMLElement>(null);
    const [scrolled, setScrolled] = useState(false);
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
            className={`sticky top-0 z-50 flex items-center justify-between whitespace-nowrap px-6 py-4 lg:px-20 transition-all duration-500 ${
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
            <div className="md:hidden">
                <span className="material-symbols-outlined text-on-surface">menu</span>
            </div>
        </header>
    );
}
