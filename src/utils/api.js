import axios from "axios";

const TOKEN_KEY = "rideharbor_token";

/**
 * api
 * ---
 * Single axios instance for the whole app. A request interceptor
 * attaches the stored JWT (if any) so callers never have to think
 * about auth headers — AuthContext is the only thing that reads/writes
 * the token itself.
 */
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export { TOKEN_KEY };
export default api;
