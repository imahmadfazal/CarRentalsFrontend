import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ClubBenefit from "./ClubBenefit";
import "./HarborClub.css";

gsap.registerPlugin(ScrollTrigger);

const BENEFITS_DATA = [
    {
        title: "Priority Scheduling",
        description: "Secure immediate reservations for highly demanded luxury sports cars and SUVs, even during peak weekends or local holiday seasons.",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
            </svg>
        )
    },
    {
        title: "Complimentary Vehicle Upgrades",
        description: "Whenever your selected model is in servicing, receive automatic luxury tier upgrades (e.g. Sedan to SUV) at zero additional daily fees.",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="17 11 22 16 17 21" />
                <line x1="2" y1="16" x2="22" y2="16" />
                <polyline points="7 13 2 8 7 3" />
                <line x1="2" y1="8" x2="22" y2="8" />
            </svg>
        )
    },
    {
        title: "Dedicated Account Managers",
        description: "Direct connection line to a personal concierge coordinator who manages delivery endpoints, keys handovers, and corporate flex billing.",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
            </svg>
        )
    }
];

export default function HarborClub() {
    const bgRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const bg = bgRef.current;
        if (!bg) return;

        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (prefersReducedMotion) return;

        // Dynamic Parallax Scroll Background Image
        const t1 = gsap.fromTo(bg,
            { yPercent: -15 },
            {
                yPercent: 15,
                ease: "none",
                scrollTrigger: {
                    trigger: ".harbor-club",
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            }
        );

        // Entrance Staggered Cards Reveal
        const t2 = gsap.fromTo(".club-benefit-item",
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".harbor-club__grid",
                    start: "top 85%",
                    toggleActions: "play none none none"
                }
            }
        );

        return () => {
            t1.scrollTrigger?.kill();
            t2.scrollTrigger?.kill();
        };
    }, []);

    return (
        <section className="harbor-club" ref={containerRef} aria-labelledby="harbor-club-title">
            {/* Parallax Background */}
            <div className="harbor-club__parallax-bg" ref={bgRef} />
            <div className="harbor-club__overlay" aria-hidden="true" />

            <div className="harbor-club__content-wrapper">
                <div className="harbor-club__left">
                    <span className="harbor-club__eyebrow">Loyalty Privileges</span>
                    <h2 id="harbor-club-title" className="harbor-club__title">Join The Harbor Club</h2>
                    <p className="harbor-club__subtext">
                        Unlock elite privileges, customized lease terms, and priority reservations tailored for true connoisseurs of performance.
                    </p>
                    <a href="#book" className="harbor-club__cta-btn">
                        Apply For Membership
                    </a>
                </div>

                <div className="harbor-club__right">
                    <div className="harbor-club__grid">
                        {BENEFITS_DATA.map((benefit, index) => (
                            <ClubBenefit
                                key={index}
                                title={benefit.title}
                                description={benefit.description}
                                icon={benefit.icon}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}export { ClubBenefit };
