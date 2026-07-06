import { useEffect } from "react";
import gsap from "gsap";
import Navbar from "../homeherosec/Navbar";
import AuthHeader from "./AuthHeader";
import "./AuthLayout.css";

/**
 * AuthLayout
 * ----------
 * Shared page shell for SignIn/SignUp: navbar + a single centered
 * glass card. No Footer, matching the other single-purpose flow pages
 * (BookingPage, CarDetailsPage, ServicePage) rather than the
 * marketing/browse pages that include one.
 */
export default function AuthLayout({ eyebrow, title, subtext, children, footer }) {
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
            ".auth-card",
            { opacity: 0, y: 28 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
        );
        tl.fromTo(
            ".auth-header > *",
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" },
            "-=0.5"
        );
        tl.fromTo(
            ".auth-form > *",
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: "power2.out" },
            "-=0.35"
        );

        return () => tl.kill();
    }, []);

    return (
        <div className="auth-page">
            <Navbar />
            <div className="auth-page__center">
                <div className="auth-card">
                    <AuthHeader eyebrow={eyebrow} title={title} subtext={subtext} />
                    {children}
                    {footer && <div className="auth-card__footer">{footer}</div>}
                </div>
            </div>
        </div>
    );
}
