import "./ConfirmationHero.css";

/**
 * ConfirmationHero
 * -----------------
 * Top banner of the confirmation screen: success icon, headline, and
 * the booking reference the renter would quote at pickup or support.
 */
export default function ConfirmationHero({ bookingId }) {
    return (
        <div className="confirmation-hero">
            <div className="confirmation-hero__icon-wrap">
                <svg viewBox="0 0 24 24" fill="none" className="confirmation-hero__icon">
                    <path
                        d="M20 6L9 17l-5-5"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>
            <span className="confirmation-hero__eyebrow">Reservation Complete</span>
            <h1 className="confirmation-hero__heading">Booking Confirmed</h1>
            <p className="confirmation-hero__subtext">
                A confirmation has been prepared for your trip. Keep your reference number handy for pickup.
            </p>
            <div className="confirmation-hero__ref">
                <span className="confirmation-hero__ref-label">Booking Reference</span>
                <span className="confirmation-hero__ref-value">{bookingId}</span>
            </div>
        </div>
    );
}
