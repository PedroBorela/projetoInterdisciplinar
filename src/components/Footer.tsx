import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

export function Footer() {
    const footerRef = useRef<HTMLElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".footer-col", {
                scrollTrigger: {
                    trigger: footerRef.current,
                    start: "top 90%",
                },
                opacity: 0,
                y: 30,
                stagger: 0.1,
                duration: 0.6,
                ease: "power2.out",
            });
        }, footerRef);

        return () => ctx.revert();
    }, []);

    return (
        <footer
            ref={footerRef}
            className="bg-surface-container-high border-none py-16"
        >
            <div className="mx-auto max-w-[1200px] px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="footer-col flex flex-col gap-4">
                        <div className="flex items-center gap-2 text-primary">
                            <span className="material-symbols-outlined">account_balance_wallet</span>
                            <span className="text-on-surface font-bold text-title-md">LisoControl</span>
                        </div>
                        <p className="text-body-md text-on-surface opacity-90 leading-relaxed">
                            Transformando a forma como você se relaciona com o seu dinheiro através
                            de dados e inteligência.
                        </p>
                    </div>
                    <div className="footer-col">
                        <h4 className="font-bold mb-6 text-title-md text-on-surface">Produto</h4>
                        <ul className="flex flex-col gap-3 text-body-md text-on-surface opacity-90">
                            <li><a className="hover:text-primary transition-colors" href="#">Recursos</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Metodologia</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Segurança</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Integrações</a></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4 className="font-bold mb-6 text-title-md text-on-surface">Suporte</h4>
                        <ul className="flex flex-col gap-3 text-body-md text-on-surface opacity-90">
                            <li><a className="hover:text-primary transition-colors" href="#">Central de Ajuda</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Comunidade</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">API</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Status</a></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4 className="font-bold mb-6 text-title-md text-on-surface">Legal</h4>
                        <ul className="flex flex-col gap-3 text-body-md text-on-surface opacity-90">
                            <li><a className="hover:text-primary transition-colors" href="#">Privacidade</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Termos de Uso</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Cookies</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Modo Privacidade</a></li>
                        </ul>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-12 border-none">
                    <p className="text-label-sm text-on-surface opacity-90">
                        © 2026 LisoControl. Todos os direitos reservados. Exportação de dados disponível em conformidade com a LGPD.
                    </p>
                    <div className="flex gap-6">
                        <a className="text-on-surface opacity-90 hover:text-primary transition-colors" href="#">
                            <span className="material-symbols-outlined">social_leaderboard</span>
                        </a>
                        <a className="text-on-surface opacity-90 hover:text-primary transition-colors" href="#">
                            <span className="material-symbols-outlined">alternate_email</span>
                        </a>
                        <a className="text-on-surface opacity-90 hover:text-primary transition-colors" href="#">
                            <span className="material-symbols-outlined">podcasts</span>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
