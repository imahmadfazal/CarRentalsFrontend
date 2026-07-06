import "./BookingStatusBadge.css";

const STATUS_LABELS = {
    pending: "Pending",
    confirmed: "Confirmed",
    cancelled: "Cancelled",
};

/**
 * BookingStatusBadge
 * ---------------------
 * Small pill showing where a booking stands with the (not-yet-built)
 * admin panel — pending until an admin confirms it, or cancelled.
 */
export default function BookingStatusBadge({ status }) {
    return (
        <span className={`booking-status-badge booking-status-badge--${status}`}>
            {STATUS_LABELS[status] || status}
        </span>
    );
}
