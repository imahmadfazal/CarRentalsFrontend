import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import Navbar from "../homeherosec/Navbar";
import Footer from "../Footer/Footer";
import ConfirmationHero from "./ConfirmationHero";
import ConfirmationDetails from "./ConfirmationDetails";
import ConfirmationNextSteps from "./ConfirmationNextSteps";
import ConfirmationActions from "./ConfirmationActions";
import "./BookingConfirmationPage.css";

/**
 * BookingConfirmationPage
 * -------------------------
 * Final stop in the booking journey. The booking object is passed via
 * router state from BookingPage's "Confirm & Reserve" action — there's
 * no backend yet, so a direct visit or page refresh without that state
 * shows a friendly fallback instead of an empty page.
 */
export default function BookingConfirmationPage() {
    const location = useLocation();
    const booking = location.state?.booking ?? null;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (!booking) return;

        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;
        if (prefersReducedMotion) return;

        const tl = gsap.timeline();
        tl.fromTo(
            ".confirmation-hero > *",
            { opacity: 0, y: 25 },
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power3.out" }
        );
        tl.fromTo(
            ".confirmation-details",
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
            "-=0.4"
        );
        tl.fromTo(
            ".confirmation-next-step",
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out" },
            "-=0.4"
        );
        tl.fromTo(
            ".confirmation-actions",
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
            "-=0.3"
        );

        return () => tl.kill();
    }, [booking]);

    if (!booking) {
        return (
            <div className="booking-confirmation-page">
                <Navbar />
                <div className="booking-confirmation-page__empty">
                    <h1>No Booking Found</h1>
                    <p>It looks like you navigated here directly. Start a reservation from one of our vehicles to see a confirmation.</p>
                    <ConfirmationActions />
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="booking-confirmation-page">
            <Navbar />
            <div className="booking-confirmation-page__content">
                <ConfirmationHero bookingId={booking.bookingId} />
                <div className="booking-confirmation-page__layout">
                    <ConfirmationDetails booking={booking} />
                    <ConfirmationNextSteps />
                </div>
                <ConfirmationActions />
            </div>
            <Footer />
        </div>
    );
}
