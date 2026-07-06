import { ADD_ONS } from "./pricing";
import "./BookingAddOns.css";

/**
 * BookingAddOns
 * --------------
 * Optional extras list (insurance, GPS, etc). Each row is its own
 * styled checkbox card showing the per-day price, so the price summary
 * total never surprises the renter.
 */
export default function BookingAddOns({ selectedAddOns, onToggle }) {
    return (
        <section className="booking-add-ons">
            <h3 className="booking-add-ons__title">Optional Extras</h3>
            <div className="booking-add-ons__list">
                {ADD_ONS.map((addOn) => {
                    const checked = Boolean(selectedAddOns[addOn.id]);
                    return (
                        <label
                            key={addOn.id}
                            htmlFor={`addon-${addOn.id}`}
                            className={`booking-add-on ${checked ? "booking-add-on--active" : ""}`}
                        >
                            <input
                                id={`addon-${addOn.id}`}
                                type="checkbox"
                                className="booking-add-on__input"
                                checked={checked}
                                onChange={(e) => onToggle(addOn.id, e.target.checked)}
                            />
                            <span className="booking-add-on__box" aria-hidden="true">
                                <svg viewBox="0 0 16 16" className="booking-add-on__check">
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
                            <span className="booking-add-on__text">
                                <span className="booking-add-on__label">{addOn.label}</span>
                                <span className="booking-add-on__desc">{addOn.desc}</span>
                            </span>
                            <span className="booking-add-on__price">+${addOn.price}/day</span>
                        </label>
                    );
                })}
            </div>
        </section>
    );
}
