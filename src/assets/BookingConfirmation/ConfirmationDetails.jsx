import "./ConfirmationDetails.css";

/**
 * ConfirmationDetails
 * ---------------------
 * Trip + payment recap: vehicle, dates, renter contact, selected
 * extras, and the final price breakdown — everything the renter needs
 * as a record of what they just booked.
 */
export default function ConfirmationDetails({ booking }) {
    const { car, pickupDate, returnDate, renter, addOns, days, rentalSubtotal, addOnsTotal, serviceFee, total } = booking;

    return (
        <div className="confirmation-details">
            <div className="confirmation-details__vehicle">
                <img src={car.image} alt={car.name} className="confirmation-details__image" />
                <div>
                    <span className="confirmation-details__vehicle-eyebrow">{car.category} class</span>
                    <h2 className="confirmation-details__vehicle-name">{car.name}</h2>
                </div>
            </div>

            <div className="confirmation-details__grid">
                <div className="confirmation-detail-card">
                    <span className="confirmation-detail-card__label">Pickup Date</span>
                    <span className="confirmation-detail-card__value">{pickupDate}</span>
                </div>
                <div className="confirmation-detail-card">
                    <span className="confirmation-detail-card__label">Return Date</span>
                    <span className="confirmation-detail-card__value">{returnDate}</span>
                </div>
                <div className="confirmation-detail-card">
                    <span className="confirmation-detail-card__label">Renter</span>
                    <span className="confirmation-detail-card__value">{renter.fullName}</span>
                </div>
                <div className="confirmation-detail-card">
                    <span className="confirmation-detail-card__label">Contact</span>
                    <span className="confirmation-detail-card__value">{renter.email}</span>
                </div>
            </div>

            {addOns.length > 0 && (
                <div className="confirmation-details__addons">
                    <span className="confirmation-details__section-label">Selected Extras</span>
                    <ul className="confirmation-details__addons-list">
                        {addOns.map((addOn) => (
                            <li key={addOn.id}>{addOn.label}</li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="confirmation-details__price">
                <span className="confirmation-details__section-label">Payment Summary</span>
                <div className="confirmation-details__price-row">
                    <span>Rental ({days} {days === 1 ? "day" : "days"})</span>
                    <span>${rentalSubtotal}</span>
                </div>
                {addOnsTotal > 0 && (
                    <div className="confirmation-details__price-row">
                        <span>Optional extras</span>
                        <span>${addOnsTotal}</span>
                    </div>
                )}
                <div className="confirmation-details__price-row">
                    <span>Concierge service fee</span>
                    <span>${serviceFee}</span>
                </div>
                <div className="confirmation-details__price-total">
                    <span>Total</span>
                    <span>${total}</span>
                </div>
            </div>
        </div>
    );
}
