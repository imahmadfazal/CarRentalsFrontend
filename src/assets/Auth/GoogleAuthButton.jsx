import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import "./GoogleAuthButton.css";

/**
 * GoogleAuthButton
 * -----------------
 * Wraps @react-oauth/google's official button. That button renders
 * inside a cross-origin iframe (Google's requirement, not ours), so it
 * can't be restyled with our CSS custom properties — the closest we
 * can get to matching the active theme is picking the built-in
 * "filled_black" vs "outline" variant.
 */
export default function GoogleAuthButton({ onSuccess, onError }) {
    const { loginWithGoogle } = useAuth();
    const { theme } = useTheme();

    async function handleGoogleSuccess(credentialResponse) {
        try {
            await loginWithGoogle(credentialResponse.credential);
            onSuccess?.();
        } catch (err) {
            onError?.(err.response?.data?.message || "Google sign-in failed. Please try again.");
        }
    }

    return (
        <div className="google-auth">
            <div className="google-auth__divider">
                <span>or continue with</span>
            </div>
            <div className="google-auth__btn-wrap">
                <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={() => onError?.("Google sign-in failed. Please try again.")}
                    theme={theme === "light" ? "outline" : "filled_black"}
                    shape="pill"
                    size="large"
                    width="300"
                />
            </div>
        </div>
    );
}
