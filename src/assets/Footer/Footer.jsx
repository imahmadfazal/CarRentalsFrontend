import FooterColumn from "./FooterColumn";
import NewsletterForm from "./NewsletterForm";
import "./Footer.css";

const FLEET_LINKS = [
    { label: "Sports Collection", href: "/#cars" },
    { label: "Luxury Class", href: "/#cars" },
    { label: "Super SUVs", href: "/#cars" },
    { label: "VIP Chauffeur", href: "/services" }
];

const SUPPORT_LINKS = [
    { label: "About RideHarbor", href: "/#about" },
    { label: "Elite Services", href: "/services" },
    { label: "Privacy Policies", href: "/#about" },
    { label: "Contact VIP Desk", href: "/#about" }
];

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer__inner">
                {/* Branding and Social Column */}
                <div className="footer__brand-col">
                    <a href="/#home" className="footer__logo">
                        RideHarbor
                    </a>
                    <p className="footer__brand-desc">
                        Redefining exotic car rentals. Meticulous fleet operations, doorstep handover services, and zero hidden rate surprises.
                    </p>
                    <div className="footer__socials">
                        <a href="https://instagram.com" className="footer__social-link" aria-label="Instagram">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                            </svg>
                        </a>
                        <a href="https://facebook.com" className="footer__social-link" aria-label="Facebook">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                            </svg>
                        </a>
                        <a href="https://twitter.com" className="footer__social-link" aria-label="Twitter">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                            </svg>
                        </a>
                    </div>
                </div>

                {/* Directory Link Column 1 */}
                <FooterColumn title="Fleet" links={FLEET_LINKS} />

                {/* Directory Link Column 2 */}
                <FooterColumn title="Support" links={SUPPORT_LINKS} />

                {/* Newsletter Column */}
                <NewsletterForm />
            </div>

            {/* Bottom bar */}
            <div className="footer__bottom">
                <div className="footer__bottom-inner">
                    <p className="footer__copy">
                        &copy; {new Date().getFullYear()} RideHarbor Rental. All rights reserved.
                    </p>
                    <span className="footer__signature">Crafted for Elite Journeys</span>
                </div>
            </div>
        </footer>
    );
}
