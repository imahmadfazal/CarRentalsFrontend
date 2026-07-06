import { Link } from "react-router-dom";
import "./ConfirmationActions.css";

/**
 * ConfirmationActions
 * ----------------------
 * Closing actions for the booking journey — reuses the same
 * primary/secondary pill button styling as the Hero section's CTAs.
 */
export default function ConfirmationActions() {
    return (
        <div className="confirmation-actions">
            <Link to="/" className="confirmation-actions__btn confirmation-actions__btn--primary">
                Back to Home
            </Link>
            <Link to="/#cars" className="confirmation-actions__btn confirmation-actions__btn--secondary">
                Browse More Cars
            </Link>
        </div>
    );
}
