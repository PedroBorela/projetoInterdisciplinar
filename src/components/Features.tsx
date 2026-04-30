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
                    <span className="text-label-sm text-primary font-bold tracking-widest uppercase">Tools</span>
                    <h2 className="text-headline-md font-bold text-on-surface tracking-tight">
                        Master Your Cash Flow
                    </h2>
                    <p className="text-body-md text-on-surface opacity-90 max-w-2xl">
                        Visualize your spending patterns with our exclusive Heatmap Calendar, ensuring that
                        you never miss a beat in your liquidity management.
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
                            <h3 className="text-title-md font-bold mb-2 text-on-surface">Heatmap Calendar</h3>
                            <p className="text-body-md text-on-surface opacity-90 leading-relaxed">
                                Visual intensity maps to identify days of highest spending and plan your
                                weekly liquidity with surgical precision.
                            </p>
                        </div>
                        <div
                            className="w-full aspect-video rounded-[var(--radius-xl)] overflow-hidden border-none"
                            style={{
                                backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBUWQoqeEDF4d2yADjLMpZZjZG9fVKkA_Rw-uChUV9pZW8ZLxrMataYgSRBwtfLEpOqoG6YUqOUOxqH3WGMKUT6F6uirjdKK6c2WKI1O6HLMRSd9Pl7jiTVL7Jv2_TQBhhVVNCEePczDM3dCpYDCgeX_0AQ1pGk3IscQUvfuaAEt039lVt364On5aHxc2l-xvz5yIms4Ac5Bpdz7vKXcjcWPshwgZQk8ExaLlhToFz_pug0SeDaj8iG_Chw_AwLDytVTyGW9dCzlIk')",
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
                            <h3 className="text-title-md font-bold mb-2 text-on-surface">Real-Time Tracking</h3>
                            <p className="text-body-md text-on-surface opacity-90 leading-relaxed">
                                Instant updates for each transaction across all your accounts,
                                automatically categorized by AI.
                            </p>
                        </div>
                        <div
                            className="w-full aspect-video rounded-[var(--radius-xl)] overflow-hidden border-none"
                            style={{
                                backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAeEubKWAGNWmgxgw08Vba4RLOFYQLfyfcmxcErW46R7SfJu9u-LneBmK1v3Sjxh5C3Z3hlRT3DWJ0p8k6d8rv0kAqEfiNdDtCWr1EBwSqzj9M_FTQnNlyRedVr6cWPfAjgr4kAwBMIMi5saPM-lT45RFUbKiFiXfytfLARdalzfsMxIv29cPN-QqdbQYJF6j6qo8cnPJ7LUaWxVR4JiPnabFUfVRGG2FgoNLNxHghVU0lG5diE-1bpMdK0bQRDA2ctVeijnmH2Yu4')",
                                backgroundSize: "cover",
                            }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
