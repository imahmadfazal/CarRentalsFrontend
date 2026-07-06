import "./Searchcheckbox.css";

/**
 * SearchCheckbox
 * --------------
 * Glass-style checkbox for the optional filters row (Unlimited
 * Mileage, Airport Pickup, etc). Visually replaces the native
 * checkbox with a styled box driven by :checked + sibling selectors,
 * while keeping a real <input type="checkbox"> underneath for
 * accessibility and keyboard support.
 */
export default function SearchCheckbox({ id, label, checked, onChange }) {
    return (
        <label htmlFor={id} className="search-checkbox">
            <input
                id={id}
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                className="search-checkbox__input"
            />
            <span className="search-checkbox__box" aria-hidden="true">
                <svg viewBox="0 0 16 16" className="search-checkbox__check">
                    <path
                        d="M3 8.5l3 3 7-7.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </span>
            <span className="search-checkbox__label">{label}</span>
        </label>
    );
}