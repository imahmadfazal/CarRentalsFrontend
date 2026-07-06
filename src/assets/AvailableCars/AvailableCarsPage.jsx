import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import gsap from "gsap";
import Navbar from "../homeherosec/Navbar";
import Footer from "../Footer/Footer";
import ResultsSummary from "./ResultsSummary";
import ResultsToolbar from "./ResultsToolbar";
import ResultsGrid from "./ResultsGrid";
import { filterAvailableCars } from "./filterCars";
import { getCarPerformanceSpecs } from "../CarDetail/Cardetailsdata";
import useFavorites from "../../hooks/useFavorites";
import { useCars } from "../../context/CarsContext";
import "./AvailableCarsPage.css";

/**
 * AvailableCarsPage
 * ------------------
 * Lands here after a homepage search submit (SearchForm navigates to
 * `/available-cars` with both router state and a matching query
 * string). Filters the fleet against the submitted criteria, lets the
 * visitor sort and favorite results, and is the entry point into the
 * booking flow via each CollectionCard's existing "view details" click.
 */
export default function AvailableCarsPage() {
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const { favorites, toggleFavorite } = useFavorites();
    const { carsByCategory } = useCars();
    const [sortBy, setSortBy] = useState("featured");
    const pageRef = useRef(null);

    // Router state (set by SearchForm's navigate) carries the full
    // payload; query params are the refresh-safe fallback for a
    // bookmarked or reloaded results URL.
    const criteria = useMemo(() => {
        if (location.state) return location.state;
        return Object.fromEntries(searchParams.entries());
    }, [location.state, searchParams]);

    const results = useMemo(() => {
        const matched = filterAvailableCars(criteria, carsByCategory);

        if (sortBy === "price-asc") {
            return [...matched].sort((a, b) => a.price - b.price);
        }
        if (sortBy === "price-desc") {
            return [...matched].sort((a, b) => b.price - a.price);
        }
        if (sortBy === "power-desc") {
            return [...matched].sort((a, b) => {
                const specA = parseInt(getCarPerformanceSpecs(a.id).horsepower) || 0;
                const specB = parseInt(getCarPerformanceSpecs(b.id).horsepower) || 0;
                return specB - specA;
            });
        }
        return matched;
    }, [criteria, sortBy, carsByCategory]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;
        if (prefersReducedMotion) return;

        const tl = gsap.timeline();

        tl.fromTo(
            ".results-summary > *",
            { opacity: 0, y: 25 },
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power3.out" }
        );
        tl.fromTo(
            ".results-toolbar",
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
            "-=0.3"
        );

        const cards = pageRef.current?.querySelectorAll(".results-grid__item");
        if (cards && cards.length) {
            tl.fromTo(
                cards,
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power3.out" },
                "-=0.3"
            );
        }

        return () => tl.kill();
    }, [results]);

    return (
        <div className="available-cars-page" ref={pageRef}>
            <Navbar />
            <div className="available-cars-page__content">
                <ResultsSummary criteria={criteria} resultCount={results.length} />
                <ResultsToolbar sortBy={sortBy} onSortChange={setSortBy} count={results.length} />
                <ResultsGrid cars={results} favorites={favorites} onFavoriteToggle={toggleFavorite} />
            </div>
            <Footer />
        </div>
    );
}
