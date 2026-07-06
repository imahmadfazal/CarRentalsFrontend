import BookingStatusBadge from "./BookingStatusBadge";
import "./MyBookingCard.css";

function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

/**
 * MyBookingCard
 * ---------------
 * One reserved car — snapshot image, dates, total, and its current
 * status with the (not-yet-built) admin panel. Pure presentational,
 * used by MyBookingsPage's list.
 */
export default function MyBookingCard({ booking }) {
    const { car } = booking;

    return (
        <div className="my-booking-card">
            <div className="my-booking-card__image-wrap">
                <img src={car.image} alt={car.name} className="my-booking-card__image" />
            </div>

            <div className="my-booking-card__body">
                <div className="my-booking-card__top">
                    <div>
                        <span className="my-booking-card__eyebrow">{car.category} class &middot; {booking.bookingId}</span>
                        <h3 className="my-booking-card__name">{car.name}</h3>
                    </div>
                    <BookingStatusBadge status={booking.status} />
                </div>

                <ul className="my-booking-card__specs">
                    <li>{formatDate(booking.pickupDate)} &rarr; {formatDate(booking.returnDate)}</li>
                    <li>{booking.days} {booking.days === 1 ? "day" : "days"}</li>
                    <li>{car.transmission}</li>
                    <li>{car.seats} Seats</li>
                </ul>

                <div className="my-booking-card__footer">
                    <span className="my-booking-card__total">
                        ${booking.total}<span className="my-booking-card__total-label">total</span>
                    </span>
                </div>
            </div>
        </div>
    );
}
