import { useNavigate } from "react-router-dom";
import "./Backbutton.css";

/**
 * BackButton
 * ----------
 * "Back to Home" pill button. Uses react-router's navigate(-1) by
 * default (returns to whatever page the user actually came from),
 * but falls back to "/" if there's no history entry to go back to
 * (e.g. someone opened the details page directly via a shared link).
 */
export default function BackButton() {
    const navigate = useNavigate();

    function handleClick() {
        if (window.history.length > 1) {
            navigate(-1);
        } else {
            navigate("/");
        }
    }

    return (
        <button
            type="button"
            className="back-button"
            onClick={handleClick}
            aria-label="Back to home"
        >
            <svg viewBox="0 0 24 24" className="back-button__icon" aria-hidden="true">
                <path
                    d="M15 5l-7 7 7 7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </button>
    );
}