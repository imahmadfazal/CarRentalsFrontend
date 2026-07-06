import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";
import "./AdminDashboardPage.css";

function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

/**
 * AdminDashboardPage
 * ---------------------
 * At-a-glance stats for the admin panel — pulled from the single
 * GET /api/admin/stats aggregate endpoint rather than making three
 * separate list calls just to count things.
 */
export default function AdminDashboardPage() {
    const [stats, setStats] = useState(null);
    const [loadError, setLoadError] = useState("");

    useEffect(() => {
        let cancelled = false;
        api
            .get("/admin/stats")
            .then(({ data }) => { if (!cancelled) setStats(data); })
            .catch(() => { if (!cancelled) setLoadError("Couldn't load dashboard stats."); });
        return () => { cancelled = true; };
    }, []);

    return (
        <div className="admin-dashboard">
            <span className="admin-page__eyebrow">Overview</span>
            <h1 className="admin-page__heading">Dashboard</h1>

            {loadError && <p className="admin-page__status admin-page__status--error">{loadError}</p>}

            {!stats && !loadError && <p className="admin-page__status">Loading&hellip;</p>}

            {stats && (
                <>
                    <div className="admin-dashboard__grid">
                        <div className="admin-stat-card">
                            <span className="admin-stat-card__label">Total Bookings</span>
                            <span className="admin-stat-card__value">{stats.totalBookings}</span>
                        </div>
                        <div className="admin-stat-card admin-stat-card--pending">
                            <span className="admin-stat-card__label">Pending Approval</span>
                            <span className="admin-stat-card__value">{stats.bookingsByStatus.pending}</span>
                        </div>
                        <div className="admin-stat-card admin-stat-card--success">
                            <span className="admin-stat-card__label">Confirmed</span>
                            <span className="admin-stat-card__value">{stats.bookingsByStatus.confirmed}</span>
                        </div>
                        <div className="admin-stat-card">
                            <span className="admin-stat-card__label">Cancelled</span>
                            <span className="admin-stat-card__value">{stats.bookingsByStatus.cancelled}</span>
                        </div>
                        <div className="admin-stat-card">
                            <span className="admin-stat-card__label">Total Users</span>
                            <span className="admin-stat-card__value">{stats.totalUsers}</span>
                        </div>
                        <div className="admin-stat-card">
                            <span className="admin-stat-card__label">Fleet Size</span>
                            <span className="admin-stat-card__value">{stats.activeCars}<span className="admin-stat-card__value-sub">/{stats.totalCars}</span></span>
                        </div>
                        <div className="admin-stat-card">
                            <span className="admin-stat-card__label">Confirmed Revenue</span>
                            <span className="admin-stat-card__value">${stats.confirmedRevenue}</span>
                        </div>
                    </div>

                    <section className="admin-dashboard__recent">
                        <div className="admin-dashboard__recent-header">
                            <h2 className="admin-dashboard__recent-title">Recent Bookings</h2>
                            <Link to="/admin/bookings" className="admin-dashboard__recent-link">View all &rarr;</Link>
                        </div>

                        {stats.recentBookings.length === 0 ? (
                            <p className="admin-page__status">No bookings yet.</p>
                        ) : (
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
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {stats.recentBookings.map((b) => (
                                            <tr key={b._id}>
                                                <td>{b.bookingId}</td>
                                                <td>{b.car.name}</td>
                                                <td>{b.renter.fullName}</td>
                                                <td>{formatDate(b.pickupDate)} &rarr; {formatDate(b.returnDate)}</td>
                                                <td>${b.total}</td>
                                                <td><span className={`admin-status-pill admin-status-pill--${b.status}`}>{b.status}</span></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </section>
                </>
            )}
        </div>
    );
}
