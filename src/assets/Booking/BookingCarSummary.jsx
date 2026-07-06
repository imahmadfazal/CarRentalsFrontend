import "./BookingCarSummary.css";

/**
 * BookingCarSummary
 * ------------------
 * Compact "what you're booking" card pinned at the top of the booking
 * page — image, name, category badge, and the three spec icons already
 * used on CollectionCard, so the same vehicle info stays recognizable
 * across the search results, detail, and booking screens.
 */
export default function BookingCarSummary({ car }) {
    return (
        <div className="booking-car-summary">
            <div className="booking-car-summary__image-wrap">
                <img src={car.image} alt={car.name} className="booking-car-summary__image" />
            </div>
            <div className="booking-car-summary__body">
                <span className="booking-car-summary__eyebrow">{car.category} class</span>
                <h2 className="booking-car-summary__name">{car.name}</h2>
                <ul className="booking-car-summary__specs">
                    <li>{car.transmission}</li>
                    <li>{car.seats} Seats</li>
                    <li>{car.fuel}</li>
                </ul>
            </div>
            <div className="booking-car-summary__rate">
                <span className="booking-car-summary__rate-label">Daily Rate</span>
                <span className="booking-car-summary__rate-value">
                    ${car.price}<span className="booking-car-summary__rate-unit">/day</span>
                </span>
            </div>
        </div>
    );
}
