import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

export function Features() {
    const sectionRef = useRef<HTMLElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".features-heading", {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                },
                opacity: 0,
                y: 40,
                duration: 0.7,
                ease: "power3.out",
            });

            gsap.from(".feature-card", {
                scrollTrigger: {
                    trigger: ".feature-card",
                    start: "top 80%",
                },
                opacity: 0,
                y: 60,
                stagger: 0.2,
                duration: 0.75,
                ease: "power3.out",
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="bg-surface-container-low py-24" id="features">
            <div className="mx-auto max-w-[1200px] px-6">
                <div className="features-heading flex flex-col gap-4 mb-16">
                    <span className="text-label-sm text-primary font-bold tracking-widest uppercase">Ferramentas</span>
                    <h2 className="text-headline-md font-bold text-on-surface tracking-tight">
                        Domine Seu Fluxo de Caixa
                    </h2>
                    <p className="text-body-md text-on-surface opacity-90 max-w-2xl">
                        Visualize seus padrões de gastos com nosso exclusivo Calendário Heatmap, garantindo
                        que você nunca perca o controle da sua liquidez.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Card 1 */}
                    <div className="feature-card card-hover group flex flex-col gap-6 p-8 rounded-[var(--radius-xl)] bg-surface-container-lowest border-none relative overflow-hidden">
                        {/* Top accent line on hover */}
                        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                        <div className="size-14 rounded-[var(--radius-xl)] bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors duration-300">
                            <span className="material-symbols-outlined text-3xl">calendar_view_month</span>
                        </div>
                        <div>
                            <h3 className="text-title-md font-bold mb-2 text-on-surface">Calendário Heatmap</h3>
                            <p className="text-body-md text-on-surface opacity-90 leading-relaxed">
                                Mapas de intensidade visual para identificar os dias de maiores gastos e planejar
                                sua liquidez semanal com precisão cirúrgica.
                            </p>
                        </div>
                        <div
                            className="w-full aspect-video rounded-[var(--radius-xl)] overflow-hidden border-none"
                            style={{
                                backgroundImage: "url('/calendario_print.png')",
                                backgroundSize: "cover",
                            }}
                        />
                    </div>

                    {/* Card 2 */}
                    <div className="feature-card card-hover group flex flex-col gap-6 p-8 rounded-[var(--radius-xl)] bg-surface-container-lowest border-none relative overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                        <div className="size-14 rounded-[var(--radius-xl)] bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors duration-300">
                            <span className="material-symbols-outlined text-3xl">bolt</span>
                        </div>
                        <div>
                            <h3 className="text-title-md font-bold mb-2 text-on-surface">Rastreamento em Tempo Real</h3>
                            <p className="text-body-md text-on-surface opacity-90 leading-relaxed">
                                Atualizações instantâneas para cada transação em todas as suas contas,
                                categorizadas automaticamente por IA.
                            </p>
                        </div>
                        <div
                            className="w-full aspect-video rounded-[var(--radius-xl)] overflow-hidden border-none"
                            style={{
                                backgroundImage: "url('/transacoes_print.png')",
                                backgroundSize: "cover",
                            }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
