import { useNavigate } from "react-router-dom";
import "./ResultsSummary.css";

const CATEGORY_LABELS = {
    sports: "Sports Cars",
    luxury: "Luxury Cars",
    suv: "SUVs",
};

/**
 * ResultsSummary
 * --------------
 * Header for the Available Cars page: recaps what the visitor searched
 * for as a row of pill chips, plus an "Edit Search" action that sends
 * them back to the homepage search form (same #book anchor pattern the
 * Navbar already uses for cross-page navigation).
 */
export default function ResultsSummary({ criteria, resultCount }) {
    const navigate = useNavigate();

    const chips = [
        criteria.pickupLocation && { label: "Location", value: criteria.pickupLocation },
        criteria.pickupDate && { label: "Pickup", value: criteria.pickupDate },
        criteria.returnDate && { label: "Return", value: criteria.returnDate },
        criteria.carCategory && { label: "Category", value: CATEGORY_LABELS[criteria.carCategory] ?? criteria.carCategory },
        criteria.priceRange && criteria.priceRange !== "any" && { label: "Price", value: criteria.priceRange === "700+" ? "$700+" : `$${criteria.priceRange}` },
        criteria.transmission && criteria.transmission !== "any" && { label: "Transmission", value: criteria.transmission },
        criteria.passengers && { label: "Passengers", value: criteria.passengers },
    ].filter(Boolean);

    return (
        <div className="results-summary">
            <span className="results-summary__eyebrow">Search Results</span>
            <h1 className="results-summary__heading">
                {resultCount} {resultCount === 1 ? "Vehicle" : "Vehicles"} Available
            </h1>

            {chips.length > 0 && (
                <ul className="results-summary__chips">
                    {chips.map((chip) => (
                        <li key={chip.label} className="results-summary__chip">
                            <span className="results-summary__chip-label">{chip.label}</span>
                            <span className="results-summary__chip-value">{chip.value}</span>
                        </li>
                    ))}
                </ul>
            )}

            <button
                type="button"
                className="results-summary__edit-btn"
                onClick={() => navigate("/#book")}
            >
                Edit Search
            </button>
        </div>
    );
}
