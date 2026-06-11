import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

const cards = [
    {
        icon: "notifications_active",
        title: "Alertas Inteligentes",
        description: "Receba notificações antes dos juros incidirem ou ao atingir 30% do seu limite.",
    },
    {
        icon: "trending_up",
        title: "Otimização de Limite",
        description: "Recomendações baseadas em dados sobre os melhores momentos para solicitar aumento de limite e melhorar seu score.",
    },
    {
        icon: "verified_user",
        title: "Detecção de Fraudes",
        description: "Monitoramento com IA para detectar atividades incomuns em frações de segundo.",
    },
];

export function CreditIntelligence() {
    const sectionRef = useRef<HTMLElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".credit-heading", {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                },
                opacity: 0,
                y: 40,
                duration: 0.7,
                ease: "power3.out",
            });

            gsap.from(".credit-card", {
                scrollTrigger: {
                    trigger: ".credit-card",
                    start: "top 82%",
                },
                opacity: 0,
                y: 50,
                stagger: 0.15,
                duration: 0.7,
                ease: "power3.out",
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-24 relative bg-surface" id="credit">
            {/* Subtle background */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />

            <div className="mx-auto max-w-[1200px] px-6 relative">
                <div className="credit-heading flex flex-col gap-4 mb-16 items-center text-center">
                    <span className="text-label-sm text-primary font-bold tracking-widest uppercase">Crédito</span>
                    <h2 className="text-headline-md font-bold text-on-surface tracking-tight">
                        Inteligência de Cartão de Crédito
                    </h2>
                    <p className="text-body-md text-on-surface opacity-90 max-w-2xl">
                        Alertas inteligentes e gestão de limite para proteger seu score e otimizar
                        suas recompensas.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {cards.map((card) => (
                        <div
                            key={card.title}
                            className="credit-card card-hover group relative flex flex-col gap-5 p-7 rounded-[var(--radius-xl)] border-none bg-surface-container-lowest overflow-hidden shadow-none"
                        >
                            {/* Gradient border top on hover */}
                            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary/0 via-primary to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            {/* Icon with glow on hover */}
                            <div className="size-12 rounded-[var(--radius-xl)] bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300">
                                <span className="material-symbols-outlined text-primary text-2xl">{card.icon}</span>
                            </div>

                            <div className="flex flex-col gap-2">
                                <h3 className="text-title-md font-bold text-on-surface">{card.title}</h3>
                                <p className="text-body-md text-on-surface opacity-90 leading-relaxed">
                                    {card.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
