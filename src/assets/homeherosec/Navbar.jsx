import { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import NavbarAuth from "./NavbarAuth";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";

/**
 * Navbar
 * ------
 * Fixed, floating glassmorphism navbar.
 * - Desktop: logo centered, nav links left, CTA right.
 * - Mobile (<=768px): nav links collapse into a hamburger menu.
 * - Supports route checking: scrolls smoothly on Home, redirects to Home+hash on details page.
 */
export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useAuth();

    // Trigger the fade-down-on-load animation one tick after mount
    useEffect(() => {
        const frame = requestAnimationFrame(() => setIsVisible(true));
        return () => cancelAnimationFrame(frame);
    }, []);

    // Watch location hash/route changes to scroll to elements smoothly
    useEffect(() => {
        if (location.hash) {
            const targetId = location.hash.replace("#", "");
            const element = document.getElementById(targetId);
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: "smooth" });
                }, 150);
            }
        }
    }, [location]);

    const navLinks = [
        { label: "Home", href: "#home" },
        { label: "Cars", href: "#cars" },
        { label: "Services", href: "#services" },
        { label: "About", href: "#about" },
    ];

    const handleNavLinkClick = useCallback((e, href) => {
        e.preventDefault();
        const targetId = href.replace("#", "");
        
        if (targetId === "services") {
            navigate("/services");
        } else if (targetId === "about") {
            navigate("/about");
        } else if (location.pathname === "/") {
            const element = document.getElementById(targetId);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        } else {
            navigate(`/#${targetId}`);
        }
        
        setIsMenuOpen(false);
    }, [location.pathname, navigate]);

    return (
        <header className={`navbar ${isVisible ? "navbar--visible" : ""}`}>
            <nav className="navbar__inner" aria-label="Primary">
                {/* Left: nav links (desktop only) */}
                <ul className="navbar__links navbar__links--desktop">
                    {navLinks.map((link) => (
                        <li key={link.label}>
                            <a
                                href={link.href}
                                className="navbar__link"
                                onClick={(e) => handleNavLinkClick(e, link.href)}
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}
                    {user && (
                        <li>
                            <Link to="/my-bookings" className="navbar__link">
                                My Bookings
                            </Link>
                        </li>
                    )}
                    {user?.role === "admin" && (
                        <li>
                            <Link to="/admin" className="navbar__link">
                                Admin Panel
                            </Link>
                        </li>
                    )}
                </ul>

                {/* Center: logo */}
                <a
                    href="#home"
                    className="navbar__logo"
                    onClick={(e) => handleNavLinkClick(e, "#home")}
                >
                    RideHarbor
                </a>

                {/* Right: auth indicator + CTA (desktop) */}
                <div className="navbar__right-group">
                    <NavbarAuth variant="desktop" />
                    <a
                        href="#book"
                        className="navbar__cta navbar__cta--desktop"
                        onClick={(e) => handleNavLinkClick(e, "#book")}
                    >
                        Book Now
                    </a>
                </div>

                {/* Mobile hamburger toggle */}
                <button
                    className={`navbar__hamburger ${isMenuOpen ? "navbar__hamburger--open" : ""}`}
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={isMenuOpen}
                    onClick={() => setIsMenuOpen((open) => !open)}
                >
                    <span />
                    <span />
                    <span />
                </button>
            </nav>

            {/* Mobile dropdown panel */}
            <div className={`navbar__mobile-panel ${isMenuOpen ? "navbar__mobile-panel--open" : ""}`}>
                <ul className="navbar__links navbar__links--mobile">
                    {navLinks.map((link) => (
                        <li key={link.label}>
                            <a
                                href={link.href}
                                className="navbar__link"
                                onClick={(e) => handleNavLinkClick(e, link.href)}
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}
                    {user && (
                        <li>
                            <Link
                                to="/my-bookings"
                                className="navbar__link"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                My Bookings
                            </Link>
                        </li>
                    )}
                    {user?.role === "admin" && (
                        <li>
                            <Link
                                to="/admin"
                                className="navbar__link"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Admin Panel
                            </Link>
                        </li>
                    )}
                </ul>
                <NavbarAuth variant="mobile" onNavigate={() => setIsMenuOpen(false)} />
                <a
                    href="#book"
                    className="navbar__cta navbar__cta--mobile"
                    onClick={(e) => handleNavLinkClick(e, "#book")}
                >
                    Book Now
                </a>
            </div>
        </header>
    );
}