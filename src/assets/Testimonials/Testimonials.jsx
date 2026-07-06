import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import TestimonialCard from "./TestimonialCard";
import "./Testimonials.css";

const REVIEWS_DATA = [
    {
        quote: "RideHarbor provided absolute first-class service. The Ferrari 812 Superfast was delivered directly to my private tarmac terminal, detailed flawlessly, and drove like a dream. Highly recommended for executive visits.",
        author: "Marcus Vance",
        role: "Managing Partner, Vance Group",
        rating: 5
    },
    {
        quote: "The wedding rental packages are top-tier. We booked the Bentley Continental GT Convertible. The custom decoration ribbon setup and roadside coordinator standby support let us celebrate our milestone with complete confidence.",
        author: "Elena Rostova",
        role: "Creative Director, Rostova Studios",
        rating: 5
    },
    {
        quote: "Self-driving their Porsche 911 GT3 RS on the mountain routes was an adrenaline experience I'll never forget. Zero paperwork delays, absolute rate transparency, and outstanding customer communication from start to finish.",
        author: "Julian Kross",
        role: "Tech Entrepreneur & Collector",
        rating: 5
    }
];

export default function Testimonials() {
    const [activeIndex, setActiveIndex] = useState(0);
    const containerRef = useRef(null);

    // Dynamic GSAP Slide Navigation Animation
    const handleSlideChange = (direction) => {
        let nextIndex = activeIndex;
        if (direction === "next") {
            nextIndex = (activeIndex + 1) % REVIEWS_DATA.length;
        } else {
            nextIndex = (activeIndex - 1 + REVIEWS_DATA.length) % REVIEWS_DATA.length;
        }

        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (prefersReducedMotion) {
            setActiveIndex(nextIndex);
            return;
        }

        const card = containerRef.current?.querySelector(".testimonial-card");
        if (!card) return;

        // Slide animation timeline
        const tl = gsap.timeline();

        // Slide out current
        tl.to(card, {
            opacity: 0,
            x: direction === "next" ? -30 : 30,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => {
                setActiveIndex(nextIndex);
            }
        });

        // Slide in new
        tl.fromTo(card,
            { opacity: 0, x: direction === "next" ? 30 : -30 },
            {
                opacity: 1,
                x: 0,
                duration: 0.5,
                ease: "power3.out"
            }
        );
    };

    return (
        <section className="testimonials" aria-labelledby="testimonials-title">
            <div className="testimonials__header">
                <span className="testimonials__eyebrow">Client Feedback</span>
                <h2 id="testimonials-title" className="testimonials__title">Exotic Testimonials</h2>
                <p className="testimonials__subtext">
                    See what our distinguished clients say about their driving experiences with RideHarbor fleet.
                </p>
            </div>

            <div className="testimonials__slider-wrapper">
                {/* Previous Navigation Arrow */}
                <button
                    type="button"
                    className="testimonials__arrow testimonials__arrow--prev"
                    onClick={() => handleSlideChange("prev")}
                    aria-label="Previous review"
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                </button>

                {/* Testimonial Active Display Area */}
                <div className="testimonials__card-container" ref={containerRef}>
                    <TestimonialCard
                        quote={REVIEWS_DATA[activeIndex].quote}
                        author={REVIEWS_DATA[activeIndex].author}
                        role={REVIEWS_DATA[activeIndex].role}
                        rating={REVIEWS_DATA[activeIndex].rating}
                    />
                </div>

                {/* Next Navigation Arrow */}
                <button
                    type="button"
                    className="testimonials__arrow testimonials__arrow--next"
                    onClick={() => handleSlideChange("next")}
                    aria-label="Next review"
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="9 18 12 12 9 6" />
                    </svg>
                </button>
            </div>

            {/* Indicator Dots */}
            <div className="testimonials__dots">
                {REVIEWS_DATA.map((_, i) => (
                    <button
                        key={i}
                        type="button"
                        className={`testimonials__dot ${i === activeIndex ? "testimonials__dot--active" : ""}`}
                        onClick={() => {
                            if (i === activeIndex) return;
                            const dir = i > activeIndex ? "next" : "prev";
                            // Quick wrapper
                            const card = containerRef.current?.querySelector(".testimonial-card");
                            if (card) {
                                gsap.timeline()
                                    .to(card, {
                                        opacity: 0,
                                        x: dir === "next" ? -25 : 25,
                                        duration: 0.3,
                                        onComplete: () => setActiveIndex(i)
                                    })
                                    .fromTo(card,
                                        { opacity: 0, x: dir === "next" ? 25 : -25 },
                                        { opacity: 1, x: 0, duration: 0.5 }
                                    );
                            } else {
                                setActiveIndex(i);
                            }
                        }}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>
        </section>
    );
}
