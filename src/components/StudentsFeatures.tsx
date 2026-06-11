import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

export function StudentsFeatures() {
    const sectionRef = useRef<HTMLElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".students-text", {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                },
                opacity: 0,
                x: -50,
                duration: 0.8,
                ease: "power3.out",
            });

            gsap.from(".students-feature-item", {
                scrollTrigger: {
                    trigger: ".students-feature-item",
                    start: "top 82%",
                },
                opacity: 0,
                x: -30,
                stagger: 0.18,
                duration: 0.6,
                ease: "power2.out",
            });

            gsap.from(".students-img-1", {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                },
                opacity: 0,
                x: 60,
                duration: 0.8,
                ease: "power3.out",
            });

            gsap.from(".students-img-2", {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                },
                opacity: 0,
                x: 60,
                y: 20,
                duration: 0.85,
                delay: 0.15,
                ease: "power3.out",
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="bg-surface-container-low py-24" id="students">
            <div className="mx-auto max-w-[1200px] px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left: text */}
                    <div className="order-2 lg:order-1 flex flex-col gap-8">
                        <div className="students-text flex flex-col gap-4">
                            <span className="text-label-sm text-primary font-bold tracking-widest uppercase">Estudantes</span>
                            <h2 className="text-headline-md font-bold text-on-surface leading-tight">
                                Feito para a Nova Geração
                            </h2>
                            <p className="text-body-md text-on-surface opacity-90">
                                Funcionalidades pensadas para estudantes gerenciarem despesas compartilhadas
                                na república e alcançarem metas de poupança ambiciosas.
                            </p>
                        </div>

                        <div className="flex flex-col gap-5">
                            <div className="students-feature-item flex gap-4 p-5 rounded-[var(--radius-xl)] bg-surface-container-lowest border-none shadow-none">
                                <div className="size-11 rounded-full bg-primary flex items-center justify-center flex-shrink-0 shadow-ambient">
                                    <span className="material-symbols-outlined text-on-primary text-xl">groups</span>
                                </div>
                                <div>
                                    <h4 className="text-title-md font-bold mb-1 text-on-surface">Despesas Compartilhadas</h4>
                                    <p className="text-body-md text-on-surface opacity-90 leading-relaxed">
                                        Divida contas com colegas de quarto sem estresse e acompanhe quem já pagou.
                                    </p>
                                </div>
                            </div>

                            <div className="students-feature-item flex gap-4 p-5 rounded-[var(--radius-xl)] bg-surface-container-lowest border-none shadow-none">
                                <div className="size-11 rounded-full bg-primary flex items-center justify-center flex-shrink-0 shadow-ambient">
                                    <span className="material-symbols-outlined text-on-primary text-xl">savings</span>
                                </div>
                                <div>
                                    <h4 className="text-title-md font-bold mb-1 text-on-surface">Metas Gamificadas</h4>
                                    <p className="text-body-md text-on-surface opacity-90 leading-relaxed">
                                        Alcance marcos de poupança para mensalidade, viagens ou seu primeiro carro
                                        com recompensas digitais.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: images */}
                    <div className="order-1 lg:order-2 grid grid-cols-2 gap-4">
                        <div
                            className="students-img-1 h-64 rounded-[var(--radius-xl)] overflow-hidden shadow-ambient"
                            style={{
                                backgroundImage: "url('/cartoes_print.png')",
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        />
                        <div
                            className="students-img-2 h-64 rounded-[var(--radius-xl)] overflow-hidden shadow-ambient mt-8"
                            style={{
                                backgroundImage: "url('/transacoes_print.png')",
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
