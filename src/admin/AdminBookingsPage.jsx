import { Fragment, useEffect, useState } from "react";
import api from "../utils/api";
import "./AdminBookingsPage.css";

const STATUS_FILTERS = ["all", "pending", "confirmed", "cancelled"];

function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

/**
 * AdminBookingsPage
 * --------------------
 * Every booking in the system, with the approve/deny/cancel actions
 * that make the "pending until admin approves" status shown on the
 * public My Bookings page actually mean something. Click a row to
 * expand renter + guarantor details, including their uploaded ID
 * photos, before deciding.
 */
export default function AdminBookingsPage() {
    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [expandedId, setExpandedId] = useState(null);
    const [updatingId, setUpdatingId] = useState(null);
    const [actionError, setActionError] = useState("");

    function loadBookings() {
        setIsLoading(true);
        api
            .get("/bookings")
            .then(({ data }) => setBookings(data.bookings || []))
            .catch(() => setLoadError("Couldn't load bookings."))
            .finally(() => setIsLoading(false));
    }

    useEffect(() => {
        loadBookings();
    }, []);

    async function handleStatusChange(bookingId, status) {
        setUpdatingId(bookingId);
        setActionError("");
        try {
            const { data } = await api.patch(`/bookings/${bookingId}/status`, { status });
            setBookings((prev) => prev.map((b) => (b._id === bookingId ? data.booking : b)));
        } catch (err) {
            setActionError(err.response?.data?.message || "Couldn't update that booking.");
        } finally {
            setUpdatingId(null);
        }
    }

    const visibleBookings = statusFilter === "all"
        ? bookings
        : bookings.filter((b) => b.status === statusFilter);

    return (
        <div className="admin-bookings">
            <div className="admin-page__header-row">
                <div>
                    <span className="admin-page__eyebrow">Reservations</span>
                    <h1 className="admin-page__heading">Bookings</h1>
                </div>

                <div className="admin-bookings__filters">
                    {STATUS_FILTERS.map((status) => (
                        <button
                            key={status}
                            type="button"
                            className={`admin-bookings__filter ${statusFilter === status ? "admin-bookings__filter--active" : ""}`}
                            onClick={() => setStatusFilter(status)}
                        >
                            {status === "all" ? "All" : status[0].toUpperCase() + status.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {actionError && <p className="admin-page__status admin-page__status--error">{actionError}</p>}
            {isLoading && <p className="admin-page__status">Loading&hellip;</p>}
            {!isLoading && loadError && <p className="admin-page__status admin-page__status--error">{loadError}</p>}
            {!isLoading && !loadError && visibleBookings.length === 0 && (
                <p className="admin-page__status">No bookings match this filter.</p>
            )}

            {!isLoading && !loadError && visibleBookings.length > 0 && (
                <div className="admin-table-wrap">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Booking</th>
                                <th>Car</th>
                                <th>Renter</th>
                                <th>Dates</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {visibleBookings.map((b) => {
                                const isExpanded = expandedId === b._id;
                                const isUpdating = updatingId === b._id;
                                return (
                                    <Fragment key={b._id}>
                                        <tr
                                            className="admin-bookings__row"
                                            onClick={() => setExpandedId(isExpanded ? null : b._id)}
                                        >
                                            <td>{b.bookingId}</td>
                                            <td>{b.car.name}</td>
                                            <td>{b.renter.fullName}</td>
                                            <td>{formatDate(b.pickupDate)} &rarr; {formatDate(b.returnDate)}</td>
                                            <td>${b.total}</td>
                                            <td><span className={`admin-status-pill admin-status-pill--${b.status}`}>{b.status}</span></td>
                                            <td>
                                                <div className="admin-table__actions" onClick={(e) => e.stopPropagation()}>
                                                    <button
                                                        type="button"
                                                        className="admin-btn admin-btn--success admin-btn--small"
                                                        disabled={isUpdating || b.status === "confirmed"}
                                                        onClick={() => handleStatusChange(b._id, "confirmed")}
                                                    >
                                                        Approve
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="admin-btn admin-btn--danger admin-btn--small"
                                                        disabled={isUpdating || b.status === "cancelled"}
                                                        onClick={() => handleStatusChange(b._id, "cancelled")}
                                                    >
                                                        Deny
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                        {isExpanded && (
                                            <tr className="admin-bookings__detail-row">
                                                <td colSpan={7}>
                                                    <div className="admin-booking-detail">
                                                        <div className="admin-booking-detail__col">
                                                            <h4>Renter</h4>
                                                            <p>{b.renter.fullName}</p>
                                                            <p>{b.renter.email}</p>
                                                            <p>{b.renter.phone}</p>
                                                            <img src={b.renter.idCardImage} alt="Renter ID" className="admin-booking-detail__id-img" />
                                                        </div>
                                                        <div className="admin-booking-detail__col">
                                                            <h4>Guarantor</h4>
                                                            <p>{b.guarantor.fullName}</p>
                                                            <p>{b.guarantor.phone}</p>
                                                            <img src={b.guarantor.idCardImage} alt="Guarantor ID" className="admin-booking-detail__id-img" />
                                                        </div>
                                                        <div className="admin-booking-detail__col">
                                                            <h4>Trip</h4>
                                                            <p>{b.days} day{b.days === 1 ? "" : "s"}</p>
                                                            <p>Subtotal: ${b.rentalSubtotal}</p>
                                                            <p>Add-ons: ${b.addOnsTotal}</p>
                                                            <p>Service fee: ${b.serviceFee}</p>
                                                            <p className="admin-booking-detail__total">Total: ${b.total}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </Fragment>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
