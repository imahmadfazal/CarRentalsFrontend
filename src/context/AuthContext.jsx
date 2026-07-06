import { createContext, useContext, useEffect, useState } from "react";
import api, { TOKEN_KEY } from "../utils/api";

const USER_KEY = "rideharbor_user";
const AuthContext = createContext(null);

/**
 * AuthProvider
 * ------------
 * Owns the signed-in user + JWT. The token/user pair is cached in
 * localStorage so a refresh doesn't log anyone out; on mount it also
 * pings /auth/me in the background to make sure the cached token
 * hasn't expired or been revoked, clearing the session if so.
 */
export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const stored = localStorage.getItem(USER_KEY);
        return stored ? JSON.parse(stored) : null;
    });
    const [isReady, setIsReady] = useState(() => !localStorage.getItem(TOKEN_KEY));

    useEffect(() => {
        const token = localStorage.getItem(TOKEN_KEY);
        if (!token) return;

        api
            .get("/auth/me")
            .then((res) => persistSession(res.data.user, token))
            .catch(() => clearSession())
            .finally(() => setIsReady(true));
    }, []);

    function persistSession(nextUser, token) {
        localStorage.setItem(TOKEN_KEY, token);
        localStorage.setItem(USER_KEY, JSON.stringify(nextUser));
        setUser(nextUser);
    }

    function clearSession() {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        setUser(null);
    }

    async function login({ email, password }) {
        const res = await api.post("/auth/login", { email, password });
        persistSession(res.data.user, res.data.token);
    }

    async function register({ name, email, phone, password }) {
        const res = await api.post("/auth/register", { name, email, phone, password });
        persistSession(res.data.user, res.data.token);
    }

    async function loginWithGoogle(credential) {
        const res = await api.post("/auth/google", { credential });
        persistSession(res.data.user, res.data.token);
    }

    function logout() {
        clearSession();
    }

    return (
        <AuthContext.Provider
            value={{ user, isReady, login, register, loginWithGoogle, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components -- standard React Context + hook pairing
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used inside AuthProvider");
    return context;
}
