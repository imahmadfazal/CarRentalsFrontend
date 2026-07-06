import { FaEnvelope } from "react-icons/fa6";
import SearchInput from "../SearchCarForm/Searchinput";
import SearchCheckbox from "../SearchCarForm/Searchcheckbox";
import SearchButton from "../SearchCarForm/Searchbutton";
import PasswordInput from "./PasswordInput";
import GoogleAuthButton from "./GoogleAuthButton";
import "./AuthForm.css";

/**
 * SignInForm
 * -----------
 * Pure controlled form — state, validation, and submission live in
 * SignInPage. Built entirely from existing form primitives
 * (SearchInput/SearchCheckbox/SearchButton) so it matches the rest of
 * the site's inputs pixel-for-pixel.
 */
export default function SignInForm({
    values,
    errors,
    onChange,
    onSubmit,
    isSubmitting,
    formError,
    onGoogleSuccess,
    onGoogleError,
}) {
    function handleSubmit(e) {
        e.preventDefault();
        onSubmit();
    }

    return (
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
            {formError && <p className="auth-form__error">{formError}</p>}

            <SearchInput
                id="signInEmail"
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                icon={<FaEnvelope />}
                value={values.email}
                onChange={(val) => onChange("email", val)}
                error={errors.email}
                required
            />

            <PasswordInput
                id="signInPassword"
                label="Password"
                placeholder="Enter your password"
                value={values.password}
                onChange={(val) => onChange("password", val)}
                error={errors.password}
                required
                autoComplete="current-password"
            />

            <div className="auth-form__options">
                <SearchCheckbox
                    id="rememberMe"
                    label="Remember me"
                    checked={values.rememberMe}
                    onChange={(checked) => onChange("rememberMe", checked)}
                />
                <button type="button" className="auth-form__link-btn">
                    Forgot password?
                </button>
            </div>

            <SearchButton onClick={handleSubmit} label={isSubmitting ? "Signing In..." : "Sign In"} />

            <GoogleAuthButton onSuccess={onGoogleSuccess} onError={onGoogleError} />
        </form>
    );
}
