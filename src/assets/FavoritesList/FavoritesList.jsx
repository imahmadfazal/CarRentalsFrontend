import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CollectionCard from "../OurCollection/Collectioncard";
import "./FavoritesList.css";

gsap.registerPlugin(ScrollTrigger);

export default function FavoritesList({ favorites = [], onFavoriteToggle }) {
    const sectionRef = useRef(null);
    const gridRef = useRef(null);

    useEffect(() => {
        const header = sectionRef.current?.querySelector(".favorites-list__header");
        const grid = gridRef.current;
        if (!grid) return;

        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (prefersReducedMotion) return;

        const triggers = [];

        // Scroll reveal headers
        if (header) {
            const t1 = gsap.fromTo(
                header.children,
                { opacity: 0, y: 25 },
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

        // Scroll reveal cards
        const cards = grid.querySelectorAll(".collection-card");
        if (cards.length) {
            const t2 = gsap.fromTo(
                cards,
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    stagger: 0.12,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: grid,
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
    }, [favorites.length]); // Re-register triggers if count changes

    return (
        <section className="favorites-list" ref={sectionRef} aria-labelledby="favorites-title">
            <div className="favorites-list__header">
                <span className="favorites-list__eyebrow">Personal Showroom</span>
                <h2 id="favorites-title" className="favorites-list__title">Favorite Fleet</h2>
                <p className="favorites-list__subtext">
                    Your personally curated wishlist. Tap the heart on any vehicle to add or remove it from this showroom.
                </p>
            </div>

            {favorites.length > 0 ? (
                <div className="favorites-list__grid" ref={gridRef}>
                    {favorites.map((car) => (
                        <CollectionCard
                            key={car.id}
                            car={car}
                            isVisible={true}
                            delay={0}
                            isFavorite={true}
                            onFavoriteToggle={onFavoriteToggle}
                        />
                    ))}
                </div>
            ) : (
                <div className="favorites-list__empty">
                    <div className="favorites-list__empty-card">
                        <div className="favorites-list__empty-icon-wrap">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="favorites-list__empty-icon">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                <line x1="3" y1="3" x2="21" y2="21" />
                            </svg>
                        </div>
                        <h3 className="favorites-list__empty-title">Showroom is Empty</h3>
                        <p className="favorites-list__empty-desc">
                            Explore our premium supercar collections and tap the heart icon on any card to curate your drive selections here.
                        </p>
                    </div>
                </div>
            )}
        </section>
    );
}
