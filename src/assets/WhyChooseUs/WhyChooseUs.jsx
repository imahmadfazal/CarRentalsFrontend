import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FeatureCard from "./FeatureCard";
import "./WhyChooseUs.css";

gsap.registerPlugin(ScrollTrigger);

const FEATURES_DATA = [
    {
        title: "Doorstep Key Handover",
        description: "Your luxury vehicle is meticulously detailed and delivered directly to your doorstep, airport terminal, or luxury hotel lounge.",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
        )
    },
    {
        title: "Zero Hidden Charges",
        description: "Experience fully transparent rates. The quote you receive is all-inclusive, covering comprehensive protection insurance and mileage plans.",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="1" x2="12" y2="23" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
        )
    },
    {
        title: "24/7 Concierge Support",
        description: "A dedicated VIP support desk is available around the clock to assist with route updates, vehicle switches, or immediate emergency towing.",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
        )
    },
    {
        title: "Elite Fleet Selections",
        description: "Choose from a meticulously maintained fleet of low-mileage supercars, premium VIP sedans, and high-performance SUVs.",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="18.5" cy="17.5" r="2.5" />
                <circle cx="5.5" cy="17.5" r="2.5" />
                <path d="M3 9h18v6H3z" />
                <path d="M14 9h7l-3-6H6l-3 6h4" />
            </svg>
        )
    }
];

export default function WhyChooseUs() {
    const sectionRef = useRef(null);
    const gridRef = useRef(null);

    useEffect(() => {
        const header = sectionRef.current?.querySelector(".why-choose-us__header");
        const cards = gridRef.current?.querySelectorAll(".why-choose-us__card");

        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (prefersReducedMotion) return;

        const triggers = [];

        if (header) {
            const t1 = gsap.fromTo(
                header.children,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: header,
                        start: "top 88%",
                        toggleActions: "play none none none"
                    }
                }
            );
            if (t1.scrollTrigger) triggers.push(t1.scrollTrigger);
        }

        if (cards?.length) {
            const t2 = gsap.fromTo(
                cards,
                { opacity: 0, y: 50, scale: 0.95 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 1.2,
                    stagger: 0.12,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: gridRef.current,
                        start: "top 85%",
                        toggleActions: "play none none none"
                    }
                }
            );
            if (t2.scrollTrigger) triggers.push(t2.scrollTrigger);
        }

        return () => {
            triggers.forEach(t => t.kill());
        };
    }, []);

    return (
        <section className="why-choose-us" id="about" ref={sectionRef} aria-labelledby="why-choose-us-title">
            <div className="why-choose-us__header">
                <span className="why-choose-us__eyebrow">The Harbor Advantage</span>
                <h2 id="why-choose-us-title" className="why-choose-us__title">Why Choose RideHarbor</h2>
                <p className="why-choose-us__subtext">
                    We deliver the ultimate rental experience combining high-end luxury assets with unparalleled customer service protocols.
                </p>
            </div>

            <div className="why-choose-us__grid" ref={gridRef}>
                {FEATURES_DATA.map((feat, index) => (
                    <FeatureCard
                        key={index}
                        title={feat.title}
                        description={feat.description}
                        icon={feat.icon}
                    />
                ))}
            </div>
        </section>
    );
}
