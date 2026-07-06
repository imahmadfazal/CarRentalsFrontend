import { useNavigate } from "react-router-dom";
import "./Collectioncard.css";

/**
 * Tiny inline icon set for the spec row, keyed by name. Kept local to
 * this file (no icon library) since only three glyphs are needed.
 * Each is a simple 18x18 stroke icon using currentColor, so it inherits
 * whatever text color the spec row sets.
 */
const SPEC_ICONS = {
    gauge: (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
                d="M4 14a8 8 0 1 1 16 0"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
            />
            <path
                d="M12 14l3.5-4.5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
            />
            <circle cx="12" cy="14" r="1.3" fill="currentColor" />
        </svg>
    ),
    seat: (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="6.5" r="2.2" stroke="currentColor" strokeWidth="1.6" />
            <path
                d="M7 19c0-3.5 2-6.5 5-6.5s5 3 5 6.5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
            />
        </svg>
    ),
    fuel: (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect
                x="5"
                y="4"
                width="9"
                height="16"
                rx="1.4"
                stroke="currentColor"
                strokeWidth="1.6"
            />
            <path
                d="M14 9.5h1.6c.8 0 1.4.6 1.4 1.4v6.1c0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5V9.8c0-.5-.2-1-.6-1.4L17.5 6"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path d="M7.5 8h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
    ),
};

/** Outline/Filled heart used for the favorite button. */
function HeartIcon({ fill = false }) {
    return (
        <svg viewBox="0 0 24 24" fill={fill ? "currentColor" : "none"} aria-hidden="true">
            <path
                d="M12 20s-7-4.35-9.5-9C.8 7.5 2.3 4 5.8 4c2 0 3.4 1.1 4.2 2.4C10.8 5.1 12.2 4 14.2 4c3.5 0 5 3.5 3.3 7-2.5 4.65-9.5 9-9.5 9z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
            />
        </svg>
    );
}

/** Comparison double arrow icon. */
function CompareIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
                d="M8 7h12m0 0l-4-4m4 4l-4 4M16 17H4m0 0l4 4m-4-4l4-4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

/**
 * CollectionCard
 * ---------------
 * One fleet listing card. Pure presentational component — all content
 * comes from the `car` prop (see data/collectionsData.js), and the
 * fade-up-on-scroll trigger plus stagger delay are controlled by the
 * parent (Collections.jsx) via `isVisible` / `delay`.
 *
 * Image area is an empty placeholder div (no <img>, no import) per
 * spec — swap `.collection-card__image-placeholder` below for a real
 * <img className="collection-card__image" src={car.image} ... /> once
 * you have car photos. Keep the same wrapping element/classes on the
 * wrap so the badge, favorite button, and gradient overlay don't need
 * any changes.
 */
export default function CollectionCard({ car, isVisible, delay = 0, isCompared = false, onCompareToggle, isFavorite = false, onFavoriteToggle }) {
    const navigate = useNavigate();
    const { id, name, badge, description, transmission, seats, fuel, price, image, quantity, availableUnits } = car;

    // availableUnits comes from the API (quantity minus currently
    // confirmed, not-yet-returned bookings) and isn't present on the
    // static fallback data, so fall back to the full quantity — same
    // "assume everything's available" behavior as before this feature
    // existed, rather than showing a false "fully booked" state.
    const unitsLeft = availableUnits ?? quantity ?? 1;

    // Built from the three raw fields rather than stored pre-shaped in
    // collectionsData.js, so the data file matches the field names
    // requested (transmission / seats / fuel) while the spec row's
    // icon + label rendering logic stays entirely in this component.
    const specs = [
        { icon: "gauge", label: transmission },
        { icon: "seat", label: `${seats} Seats` },
        { icon: "fuel", label: fuel },
    ];

    function handleNavigate() {
        navigate(`/car/${id}`);
    }

    function handleKeyDown(event) {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            handleNavigate();
        }
    }

    function handleFavoriteClick(event) {
        event.stopPropagation();
        if (onFavoriteToggle) {
            onFavoriteToggle(car);
        }
    }

    return (
        <article
            className={`collection-card ${isVisible ? "collection-card--visible" : ""}`}
            style={{ transitionDelay: `${delay}ms` }}
            onClick={handleNavigate}
            onKeyDown={handleKeyDown}
            role="link"
            tabIndex={0}
            aria-label={`View details for ${name}`}
        >
            <div className="collection-card__image-wrap">
                {image ? (
                    <img className="collection-card__image" src={image} alt={name} loading="lazy" />
                ) : (
                    <div className="collection-card__image-placeholder" />
                )}

                <span className="collection-card__badge">{badge}</span>

                <div className="collection-card__overlay-actions">
                    <button
                        type="button"
                        className={`collection-card__favorite ${isFavorite ? "collection-card__favorite--active" : ""}`}
                        aria-label={`Save ${name} to favorites`}
                        onClick={handleFavoriteClick}
                    >
                        <HeartIcon fill={isFavorite} />
                    </button>

                    <button
                        type="button"
                        className={`collection-card__compare ${isCompared ? "collection-card__compare--active" : ""}`}
                        aria-label={`Compare ${name}`}
                        onClick={(event) => {
                            event.stopPropagation();
                            if (onCompareToggle) onCompareToggle(car);
                        }}
                    >
                        <CompareIcon />
                    </button>
                </div>
            </div>

            <div className="collection-card__body">
                <h3 className="collection-card__name">{name}</h3>
                <p className="collection-card__description">{description}</p>

                <ul className="collection-card__specs">
                    {specs.map((spec) => (
                        <li className="collection-card__spec" key={spec.icon + spec.label}>
                            <span className="collection-card__spec-icon">
                                {SPEC_ICONS[spec.icon]}
                            </span>
                            {spec.label}
                        </li>
                    ))}
                </ul>

                <div className="collection-card__footer">
                    <div className="collection-card__price">
                        <span className="collection-card__price-label">From</span>
                        <span className="collection-card__price-value">
                            ${price}
                            <span className="collection-card__price-unit">/day</span>
                        </span>
                        {unitsLeft <= 0 ? (
                            <span className="collection-card__quantity collection-card__quantity--booked">All Units Booked</span>
                        ) : quantity > 1 ? (
                            <span className="collection-card__quantity">{unitsLeft} of {quantity} available</span>
                        ) : null}
                    </div>

                    <button type="button" className="collection-card__cta">
                        Reserve Now
                    </button>
                </div>
            </div>
        </article>
    );
}