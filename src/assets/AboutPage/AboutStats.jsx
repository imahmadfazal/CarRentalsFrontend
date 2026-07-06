import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./AboutPage.css";

gsap.registerPlugin(ScrollTrigger);

const STATS_DATA = [
    { label: "Elite Fleet Vehicles", value: 150, suffix: "+", id: "fleet-stat" },
    { label: "Happy Journeys Completed", value: 12000, suffix: "+", id: "client-stat" },
    { label: "VIP Dedicated Concierge", value: 24, suffix: "/7", id: "support-stat" },
    { label: "Pre-mapped Scenic Routes", value: 50, suffix: "+", id: "route-stat" }
];

export default function AboutStats() {
    const statsContainerRef = useRef(null);

    useEffect(() => {
        const statsNode = statsContainerRef.current;
        if (!statsNode) return;

        const targets = statsNode.querySelectorAll(".stat-item__number");
        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (prefersReducedMotion) return;

        const triggers = [];

        targets.forEach((target) => {
            const endValue = parseInt(target.getAttribute("data-target")) || 0;
            const suffix = target.getAttribute("data-suffix") || "";
            
            // Animate local object value
            const counterObj = { value: 0 };
            
            const t = gsap.to(counterObj, {
                value: endValue,
                duration: 2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: target,
                    start: "top 88%",
                    toggleActions: "play none none none"
                },
                onUpdate: () => {
                    target.textContent = Math.floor(counterObj.value).toLocaleString() + suffix;
                }
            });
            if (t.scrollTrigger) triggers.push(t.scrollTrigger);
        });

        return () => {
            triggers.forEach((trigger) => trigger.kill());
        };
    }, []);

    return (
        <div className="about-stats anim-stats" ref={statsContainerRef}>
            <div className="about-stats__grid">
                {STATS_DATA.map((stat) => (
                    <div key={stat.id} className="stat-item">
                        <span
                            className="stat-item__number"
                            data-target={stat.value}
                            data-suffix={stat.suffix}
                        >
                            0
                        </span>
                        <span className="stat-item__label">{stat.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
