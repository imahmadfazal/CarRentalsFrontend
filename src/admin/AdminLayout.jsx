import { NavLink, Outlet, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./AdminShared.css";
import "./AdminLayout.css";

const NAV_ITEMS = [
    { to: "/admin", label: "Dashboard", end: true },
    { to: "/admin/bookings", label: "Bookings" },
    { to: "/admin/users", label: "Users" },
    { to: "/admin/cars", label: "Fleet", end: true },
    { to: "/admin/cars/images", label: "Card Images", indent: true },
    { to: "/admin/cars/media", label: "Media Gallery", indent: true },
];

/**
 * AdminLayout
 * -------------
 * Shell for every /admin page — fixed sidebar nav + scrollable content
 * area. Reuses the public site's design tokens (themes.css) directly
 * so the panel feels like part of RideHarbor rather than a bolted-on
 * third-party tool, while using its own layout (sidebar, not the
 * floating navbar) since an admin panel's information density and
 * navigation needs are different from the public site's.
 */
export default function AdminLayout() {
    const { user, logout } = useAuth();

    return (
        <div className="admin-layout">
            <aside className="admin-layout__sidebar">
                <Link to="/admin" className="admin-layout__brand">
                    RideHarbor<span className="admin-layout__brand-tag">Admin</span>
                </Link>

                <nav className="admin-layout__nav" aria-label="Admin">
                    {NAV_ITEMS.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            end={item.end}
                            className={({ isActive }) =>
                                `admin-layout__nav-link ${item.indent ? "admin-layout__nav-link--indent" : ""} ${isActive ? "admin-layout__nav-link--active" : ""}`
                            }
                        >
                            {item.label}
                        </NavLink>
                    ))}
                </nav>

                <div className="admin-layout__footer">
                    <Link to="/" className="admin-layout__site-link">
                        &larr; Back to site
                    </Link>
                    <div className="admin-layout__account">
                        <span className="admin-layout__account-name">{user?.name}</span>
                        <button type="button" className="admin-layout__logout" onClick={logout}>
                            Logout
                        </button>
                    </div>
                </div>
            </aside>

            <main className="admin-layout__content">
                <Outlet />
            </main>
        </div>
    );
}
