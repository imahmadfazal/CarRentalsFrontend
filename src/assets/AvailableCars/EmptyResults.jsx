import { useNavigate } from "react-router-dom";
import "./EmptyResults.css";

/**
 * EmptyResults
 * ------------
 * Shown inside the results grid when no cars match the active search
 * criteria. Mirrors the dashed-card empty state already used by
 * FavoritesList so the "nothing here yet" feeling stays consistent
 * across the site.
 */
export default function EmptyResults() {
    const navigate = useNavigate();

    return (
        <div className="empty-results">
            <div className="empty-results__card">
                <div className="empty-results__icon-wrap">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="empty-results__icon">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                </div>
                <h3 className="empty-results__title">No Vehicles Match Your Search</h3>
                <p className="empty-results__desc">
                    Try widening your price range or switching categories — or start a fresh search to see the full fleet.
                </p>
                <button
                    type="button"
                    className="empty-results__cta"
                    onClick={() => navigate("/#book")}
                >
                    Edit Search
                </button>
            </div>
        </div>
    );
}
