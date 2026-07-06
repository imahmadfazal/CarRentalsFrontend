import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * AdminProtectedRoute
 * ----------------------
 * Same shape as ProtectedRoute, but authorization on top of
 * authentication: signed-in non-admins are bounced to the public home
 * page rather than back to /signin (going to /signin would just log
 * them back into the same non-admin account in a loop).
 */
export default function AdminProtectedRoute({ children }) {
    const { user, isReady } = useAuth();
    const location = useLocation();

    if (!isReady) return null;

    if (!user) {
        return (
            <Navigate
                to="/signin"
                state={{
                    from: location.pathname + location.search,
                    authMessage: "Sign in with an admin account to continue.",
                }}
                replace
            />
        );
    }

    if (user.role !== "admin") {
        return <Navigate to="/" replace />;
    }

    return children;
}
