import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";

export function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ delay: 0.4 });

            tl.from(".hero-badge", {
                opacity: 0,
                y: 24,
                duration: 0.6,
                ease: "power3.out",
            })
                .from(".hero-title", {
                    opacity: 0,
                    y: 50,
                    duration: 0.85,
                    ease: "power3.out",
                }, "-=0.3")
                .from(".hero-description", {
                    opacity: 0,
                    y: 30,
                    duration: 0.6,
                    ease: "power2.out",
                }, "-=0.45")
                .from(".hero-btn", {
                    opacity: 0,
                    y: 20,
                    stagger: 0.12,
                    duration: 0.5,
                    ease: "back.out(1.4)",
                }, "-=0.35")
                .from(".hero-stat", {
                    opacity: 0,
                    y: 16,
                    stagger: 0.1,
                    duration: 0.45,
                    ease: "power2.out",
                }, "-=0.2")
                .from(".hero-image", {
                    opacity: 0,
                    x: 70,
                    scale: 0.95,
                    duration: 1,
                    ease: "power3.out",
                }, "-=1");
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative w-full overflow-hidden bg-surface py-20 lg:py-32">
            {/* Background Video */}
            <div className="absolute inset-0 z-0">
                <video 
                    autoPlay 
                    muted 
                    loop 
                    playsInline 
                    className="w-full h-full object-cover opacity-40 mix-blend-multiply"
                >
                    <source src="/Fluid_animation_wavy.mp4" type="video/mp4" />
                </video>
                {/* Overlay for better readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/10" />
            </div>

            <div className="mx-auto max-w-[1240px] px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Left: text content */}
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-5">
                        <div className="hero-badge inline-flex w-fit items-center gap-2.5 px-4 py-2 rounded-full bg-primary/10 text-primary">
                            <span className="w-2 h-2 rounded-full bg-primary inline-block animate-pulse" />
                            <span className="font-bold tracking-widest text-xs uppercase">Gestão de Elite</span>
                        </div>
                        <h1 className="hero-title text-display-lg font-bold text-on-surface leading-[1.1] tracking-tight">
                            Assuma o comando da sua{" "}
                            <span className="gradient-text">riqueza</span>.
                        </h1>
                        <p className="hero-description text-body-md text-on-surface opacity-90 leading-relaxed max-w-md">
                            O LisoControl é a ferramenta de finanças pessoais de nível profissional projetada 
                            para gestão precisa de fluxo de caixa e inteligência de crédito.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <button 
                            onClick={() => navigate('/cadastro')}
                            className="hero-btn btn-primary flex min-w-[188px] cursor-pointer items-center justify-center h-14 px-8 text-title-md shadow-ambient hover:scale-[1.03] active:scale-[0.97] transition-all duration-200">
                            Teste Grátis 30 Dias
                        </button>
                        <button 
                            onClick={() => navigate('/login')}
                            className="hero-btn btn-secondary flex min-w-[188px] cursor-pointer items-center justify-center h-14 px-8 text-title-md hover:scale-[1.03] active:scale-[0.97] transition-all duration-200">
                            Entrar
                        </button>
                        <button className="hero-btn btn-secondary flex min-w-[188px] cursor-pointer items-center justify-center gap-2 h-14 px-8 text-title-md hover:scale-[1.03] active:scale-[0.97] transition-all duration-200">
                            <span className="material-symbols-outlined text-xl text-primary">play_circle</span>
                            Ver Demonstração
                        </button>
                    </div>

                    {/* Stats row */}
                    <div className="flex flex-wrap items-center gap-8 pt-1 text-on-surface">
                        <div className="hero-stat flex flex-col gap-1">
                            <span className="text-headline-md font-bold">+50k</span>
                            <span className="text-label-sm opacity-70">usuários ativos</span>
                        </div>
                        <div className="hero-stat flex flex-col gap-1">
                            <span className="text-headline-md font-bold">R$2B+</span>
                            <span className="text-label-sm opacity-70">gerenciados</span>
                        </div>
                        <div className="hero-stat flex flex-col gap-1">
                            <span className="text-headline-md font-bold">4.9…</span>
                            <span className="text-label-sm opacity-70">avaliação média</span>
                        </div>
                    </div>
                </div>

                {/* Right: image */}
                <div className="hero-image relative">
                    <img
                        src="/dashboard_print.png"
                        alt="Dashboard LisoControl"
                        className="w-full rounded-[1.5rem] shadow-2xl border border-outline-variant/15"
                    />
                </div>
            </div>
        </div>
        </section>
    );
}
