import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./NavbarAuth.css";

/**
 * NavbarAuth
 * ----------
 * Small auth-aware slot in the navbar: a "Sign In" link when signed
 * out, or the user's first name + a logout button when signed in.
 * Rendered twice by Navbar (desktop inline, mobile inside the dropdown
 * panel) via the `variant` prop, since the two need different layout.
 */
export default function NavbarAuth({ variant = "desktop", onNavigate }) {
    const { user, logout } = useAuth();

    if (!user) {
        return (
            <Link
                to="/signin"
                className={`navbar-auth__signin navbar-auth__signin--${variant}`}
                onClick={onNavigate}
            >
                Sign In
            </Link>
        );
    }

    function handleLogout() {
        logout();
        onNavigate?.();
    }

    return (
        <div className={`navbar-auth navbar-auth--${variant}`}>
            <span className="navbar-auth__name">{user.name.split(" ")[0]}</span>
            <button type="button" className="navbar-auth__logout" onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
}
