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
                                Feito para a Próxima Geração
                            </h2>
                            <p className="text-body-md text-on-surface opacity-90">
                                Recursos sob medida para estudantes gerenciarem despesas compartilhadas em
                                repúblicas e atingirem metas de economia agressivas.
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
                                        Alcance marcos de economia para mensalidades, viagens ou seu primeiro carro com
                                        recompensas digitais.
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
                                backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBdGN-IeaZAgfGgaNcjfm5sA93n0hcDjB8nSx52UJDzvtacecMjIoqgaixkJAQgSToRSBtD7dgFgZD6BtEp8lS810USs65d91NIsyCPaTZW58sneRw9D4cjf0QtcZvKxhVFJ9ZEBdiZmgMHrBz5gfqQtXVW66DqaaCqZOUoAXDM9GxaVojfWerj2Y_dQ8j-fPNmB3sFS7U6l8HDWmAL-OECT7s6dQSC2Bnkb-K8v32cj9KjJSfpi9KgB_m9-jOHaR8razAM8TDUxpw')",
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        />
                        <div
                            className="students-img-2 h-64 rounded-[var(--radius-xl)] overflow-hidden shadow-ambient mt-8"
                            style={{
                                backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA9QvBTflueDYwvKVhsmboH39eKCJW99hpu5WOxj77AHvUGUgUwodm9uCnf58PzPQK327JoUOygNLSLALZXe8jNlfQB1E1q98V70OrZp87lHXjICVqnqLTdMj9ok5AXVBoUADK-89XIYgRYYjdO2EdCxerTwifEZ75H-pJV0gxixCBz8A7mZPLlmqLviCmzhUGBbEsEVIY4iiRXjtgvplNu-5Hum0VAsfSM3qjgkN6m1qRDh0See2GBRefcq5ZoLa0D4dm4yP_j2fg')",
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
