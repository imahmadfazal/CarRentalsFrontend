import { useState } from "react";
import "./Footer.css";

export default function NewsletterForm() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("idle"); // "idle" | "submitting" | "success" | "error"
    const [message, setMessage] = useState("");

    const handleSubscribe = (e) => {
        e.preventDefault();
        
        // Simple regex validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setStatus("error");
            setMessage("Please enter a valid email address.");
            return;
        }

        setStatus("submitting");
        
        // Simulate network API submission request
        setTimeout(() => {
            setStatus("success");
            setMessage("Thank you! You have successfully subscribed.");
            setEmail("");
        }, 1200);
    };

    return (
        <div className="footer__newsletter">
            <h4 className="footer__column-title">Newsletter</h4>
            <p className="footer__newsletter-desc">
                Subscribe to receive special offers, fleet additions, and scenic route recommendations.
            </p>
            <form className="footer__newsletter-form" onSubmit={handleSubscribe}>
                <div className="footer__input-wrapper">
                    <input
                        type="email"
                        className="footer__newsletter-input"
                        placeholder="Your email address"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            if (status === "error") setStatus("idle");
                        }}
                        disabled={status === "submitting" || status === "success"}
                        aria-label="Email Address"
                    />
                    <button
                        type="submit"
                        className="footer__newsletter-btn"
                        disabled={status === "submitting" || status === "success"}
                    >
                        {status === "submitting" ? (
                            <span className="footer__spinner" />
                        ) : (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="footer__arrow-icon">
                                <line x1="5" y1="12" x2="19" y2="12" />
                                <polyline points="12 5 19 12 12 19" />
                            </svg>
                        )}
                    </button>
                </div>
            </form>

            {message && (
                <span className={`footer__newsletter-msg footer__newsletter-msg--${status}`}>
                    {message}
                </span>
            )}
        </div>
    );
}
