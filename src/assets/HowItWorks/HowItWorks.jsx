import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import StepItem from "./StepItem";
import "./HowItWorks.css";

gsap.registerPlugin(ScrollTrigger);

const STEPS_DATA = [
    {
        number: "01",
        title: "Select Your Vehicle",
        description: "Browse our dynamic luxury collections, filters, and side-by-side comparison matrix to select your dream supercar or premium executive cruiser."
    },
    {
        number: "02",
        title: "Confirm Schedule & Location",
        description: "Configure dates, flexible hour schedules, and coordinate direct airport tarmac or residential delivery endpoints."
    },
    {
        number: "03",
        title: "Doorstep Key Handover",
        description: "Meet your dedicated vehicle coordinator at your destination for key handover, vehicle briefing, and quick digital verification checkouts."
    }
];

export default function HowItWorks() {
    const sectionRef = useRef(null);
    const lineRef = useRef(null);

    useEffect(() => {
        const line = lineRef.current;
        const items = sectionRef.current?.querySelectorAll(".how-it-works__item");
        if (!line || !items?.length) return;

        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (prefersReducedMotion) return;

        // Scrubbing timeline for the vertical fill line
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 65%",
                end: "bottom 70%",
                scrub: 1 // smooth scrubbing links line fill directly to scrollbar
            }
        });

        tl.fromTo(line,
            { scaleY: 0 },
            { scaleY: 1, ease: "none" }
        );

        // Highlight nodes and toggle active states as they scroll in
        const triggers = [];
        items.forEach((item) => {
            const t = gsap.fromTo(item,
                { opacity: 0.35 },
                {
                    opacity: 1,
                    scrollTrigger: {
                        trigger: item,
                        start: "top 70%",
                        end: "top 40%",
                        toggleActions: "play reverse play reverse",
                        onEnter: () => item.classList.add("how-it-works__item--active"),
                        onLeaveBack: () => item.classList.remove("how-it-works__item--active")
                    }
                }
            );
            if (t.scrollTrigger) triggers.push(t.scrollTrigger);
        });

        return () => {
            tl.kill();
            triggers.forEach((trigger) => trigger.kill());
        };
    }, []);

    return (
        <section className="how-it-works" id="how-it-works" ref={sectionRef} aria-labelledby="how-it-works-title">
            <div className="how-it-works__header">
                <span className="how-it-works__eyebrow">Direct Seamless Process</span>
                <h2 id="how-it-works-title" className="how-it-works__title">How It Works</h2>
                <p className="how-it-works__subtext">
                    Experience an absolute premium, paperwork-free checkout flow designed to get you behind the wheel in under ten minutes.
                </p>
            </div>

            <div className="how-it-works__timeline-container">
                {/* Vertical Progress Timeline */}
                <div className="how-it-works__track-line">
                    <div className="how-it-works__fill-line" ref={lineRef} />
                </div>

                <div className="how-it-works__items">
                    {STEPS_DATA.map((step, index) => (
                        <StepItem
                            key={index}
                            number={step.number}
                            title={step.title}
                            description={step.description}
                            stepClass={index % 2 === 0 ? "how-it-works__item--left" : "how-it-works__item--right"}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
