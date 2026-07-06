import { FaCalendarDays } from "react-icons/fa6";
import SearchInput from "../SearchCarForm/Searchinput";
import "./BookingDatesPanel.css";

/**
 * BookingDatesPanel
 * ------------------
 * Pickup/return date editing, reusing the same SearchInput control the
 * homepage search form uses so the field styling matches exactly. Also
 * surfaces the computed rental length, since the price summary below
 * depends on it.
 */
export default function BookingDatesPanel({ pickupDate, returnDate, onPickupChange, onReturnChange, days }) {
    return (
        <section className="booking-dates-panel">
            <h3 className="booking-dates-panel__title">Rental Dates</h3>
            <div className="booking-dates-panel__row">
                <SearchInput
                    id="bookingPickupDate"
                    label="Pickup Date"
                    type="date"
                    icon={<FaCalendarDays />}
                    value={pickupDate}
                    onChange={onPickupChange}
                />
                <SearchInput
                    id="bookingReturnDate"
                    label="Return Date"
                    type="date"
                    icon={<FaCalendarDays />}
                    value={returnDate}
                    onChange={onReturnChange}
                />
            </div>
            <span className="booking-dates-panel__duration">
                {days} {days === 1 ? "day" : "days"} rental
            </span>
        </section>
    );
}
