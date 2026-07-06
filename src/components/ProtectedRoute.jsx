import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * ProtectedRoute
 * ---------------
 * Route-level guard for the booking flow. Everything else on the site
 * stays fully public (browsing cars, watching media, search) — only
 * pages *after* "Reserve This Vehicle" require an account.
 *
 * Redirects to /signin carrying enough router state to send the user
 * right back to where they were headed once they've signed in,
 * whether they got here by clicking "Reserve" or by typing the URL
 * directly.
 */
export default function ProtectedRoute({ children }) {
    const { user, isReady } = useAuth();
    const location = useLocation();

    // Auth state hasn't resolved yet (background /auth/me check on a
    // cached token) — render nothing for a beat rather than redirect
    // prematurely and bounce a signed-in user back to /signin.
    if (!isReady) return null;

    if (!user) {
        return (
            <Navigate
                to="/signin"
                state={{
                    from: location.pathname + location.search,
                    authMessage: "Sign in to continue your reservation.",
                }}
                replace
            />
        );
    }

    return children;
}
