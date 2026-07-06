import "./BookingPriceSummary.css";

/**
 * BookingPriceSummary
 * ---------------------
 * Sticky price breakdown + the final "Confirm & Reserve" action. Pure
 * presentational — every number is computed upstream by pricing.js so
 * this component only ever displays totals, never calculates them.
 */
export default function BookingPriceSummary({
    days,
    rentalSubtotal,
    addOnsTotal,
    serviceFee,
    total,
    onConfirm,
    isSubmitting,
}) {
    return (
        <aside className="booking-price-summary">
            <h3 className="booking-price-summary__title">Price Summary</h3>

            <div className="booking-price-summary__rows">
                <div className="booking-price-summary__row">
                    <span>Rental ({days} {days === 1 ? "day" : "days"})</span>
                    <span>${rentalSubtotal}</span>
                </div>
                {addOnsTotal > 0 && (
                    <div className="booking-price-summary__row">
                        <span>Optional extras</span>
                        <span>${addOnsTotal}</span>
                    </div>
                )}
                <div className="booking-price-summary__row">
                    <span>Concierge service fee</span>
                    <span>${serviceFee}</span>
                </div>
            </div>

            <div className="booking-price-summary__total">
                <span>Total</span>
                <span>${total}</span>
            </div>

            <button
                type="button"
                className="booking-price-summary__cta"
                onClick={onConfirm}
                disabled={isSubmitting}
            >
                {isSubmitting ? "Confirming..." : "Confirm & Reserve"}
            </button>

            <p className="booking-price-summary__note">
                Free cancellation up to 24h before pickup. No payment is charged yet.
            </p>
        </aside>
    );
}
