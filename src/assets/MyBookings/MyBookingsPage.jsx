import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import Navbar from "../homeherosec/Navbar";
import MyBookingCard from "./MyBookingCard";
import api from "../../utils/api";
import "./MyBookingsPage.css";

/**
 * MyBookingsPage
 * ----------------
 * Every car a signed-in user has reserved, newest first, with each
 * one's status (pending/confirmed/cancelled). Fetches from the backend
 * on mount — there's no admin panel yet, so every booking starts and
 * stays "pending" until that's built.
 */
export default function MyBookingsPage() {
    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState("");

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        let cancelled = false;

        async function loadBookings() {
            try {
                const { data } = await api.get("/bookings/mine");
                if (!cancelled) setBookings(data.bookings || []);
            } catch {
                if (!cancelled) setLoadError("We couldn't load your bookings. Please try again.");
            } finally {
                if (!cancelled) setIsLoading(false);
            }
        }

        loadBookings();
        return () => { cancelled = true; };
    }, []);

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReducedMotion || isLoading) return;

        const tl = gsap.timeline();
        tl.fromTo(
            ".my-bookings-page__header",
            { opacity: 0, y: -20 },
            { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }
        );
        tl.fromTo(
            ".my-bookings-page__list .my-booking-card, .my-bookings-page__empty",
            { opacity: 0, y: 25 },
            { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power3.out" },
            "-=0.4"
        );

        return () => tl.kill();
    }, [isLoading, bookings.length]);

    return (
        <div className="my-bookings-page">
            <Navbar />

            <div className="my-bookings-page__content">
                <div className="my-bookings-page__header">
                    <span className="my-bookings-page__eyebrow">Your Reservations</span>
                    <h1 className="my-bookings-page__heading">My Bookings</h1>
                </div>

                {isLoading && <p className="my-bookings-page__status">Loading your bookings&hellip;</p>}

                {!isLoading && loadError && (
                    <p className="my-bookings-page__status my-bookings-page__status--error">{loadError}</p>
                )}

                {!isLoading && !loadError && bookings.length === 0 && (
                    <div className="my-bookings-page__empty">
                        <h3 className="my-bookings-page__empty-title">You Haven&rsquo;t Booked Any Cars Yet</h3>
                        <p className="my-bookings-page__empty-desc">
                            Browse the fleet and reserve a car to see it show up here with its booking status.
                        </p>
                        <Link to="/available-cars" className="my-bookings-page__empty-cta">
                            Browse Cars
                        </Link>
                    </div>
                )}

                {!isLoading && !loadError && bookings.length > 0 && (
                    <div className="my-bookings-page__list">
                        {bookings.map((booking) => (
                            <MyBookingCard key={booking._id} booking={booking} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
