import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

const trustItems = [
    { icon: "lock", label: "AES-256 Encryption" },
    { icon: "visibility_off", label: "Privacy Mode" },
    { icon: "download", label: "Data Export" },
    { icon: "verified", label: "Weekly Audit" },
];

export function TrustSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".trust-heading", {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                },
                opacity: 0,
                y: 30,
                duration: 0.6,
                ease: "power3.out",
            });

            gsap.from(".trust-item", {
                scrollTrigger: {
                    trigger: ".trust-item",
                    start: "top 85%",
                },
                opacity: 0,
                y: 40,
                scale: 0.9,
                stagger: 0.12,
                duration: 0.6,
                ease: "back.out(1.4)",
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-24 border-none bg-surface">
            <div className="mx-auto max-w-[1200px] px-6 text-center">
                <h3 className="trust-heading text-label-sm text-on-surface opacity-90 uppercase tracking-[0.2em] font-bold mb-12">
                    Security and Transparency
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {trustItems.map((item) => (
                        <div
                            key={item.label}
                            className="trust-item card-hover group flex flex-col items-center gap-4 p-6 rounded-[var(--radius-xl)] bg-surface-container-low border-none shadow-none"
                        >
                            <div className="size-14 rounded-[var(--radius-xl)] bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                                <span className="material-symbols-outlined text-primary text-3xl">{item.icon}</span>
                            </div>
                            <span className="font-bold text-body-md text-on-surface">{item.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
