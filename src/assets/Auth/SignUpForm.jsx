import { FaUser, FaEnvelope, FaPhone } from "react-icons/fa6";
import SearchInput from "../SearchCarForm/Searchinput";
import SearchCheckbox from "../SearchCarForm/Searchcheckbox";
import SearchButton from "../SearchCarForm/Searchbutton";
import PasswordInput from "./PasswordInput";
import GoogleAuthButton from "./GoogleAuthButton";
import "./AuthForm.css";

/**
 * SignUpForm
 * -----------
 * Pure controlled form — state, validation, and submission live in
 * SignUpPage. Same primitives as SignInForm for visual consistency.
 */
export default function SignUpForm({
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
                id="signUpFullName"
                label="Full Name"
                placeholder="Jordan Casey"
                icon={<FaUser />}
                value={values.fullName}
                onChange={(val) => onChange("fullName", val)}
                error={errors.fullName}
                required
            />

            <SearchInput
                id="signUpEmail"
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                icon={<FaEnvelope />}
                value={values.email}
                onChange={(val) => onChange("email", val)}
                error={errors.email}
                required
            />

            <SearchInput
                id="signUpPhone"
                label="Phone Number"
                type="tel"
                placeholder="+1 (555) 000-0000"
                icon={<FaPhone />}
                value={values.phone}
                onChange={(val) => onChange("phone", val)}
                error={errors.phone}
                required
            />

            <div className="auth-form__row--split">
                <PasswordInput
                    id="signUpPassword"
                    label="Password"
                    placeholder="Create a password"
                    value={values.password}
                    onChange={(val) => onChange("password", val)}
                    error={errors.password}
                    required
                    autoComplete="new-password"
                />
                <PasswordInput
                    id="signUpConfirmPassword"
                    label="Confirm Password"
                    placeholder="Repeat your password"
                    value={values.confirmPassword}
                    onChange={(val) => onChange("confirmPassword", val)}
                    error={errors.confirmPassword}
                    required
                    autoComplete="new-password"
                />
            </div>

            <SearchCheckbox
                id="agreeToTerms"
                label="I agree to the Terms of Service and Privacy Policy"
                checked={values.agreeToTerms}
                onChange={(checked) => onChange("agreeToTerms", checked)}
            />
            {errors.agreeToTerms && <p className="auth-form__error">{errors.agreeToTerms}</p>}

            <SearchButton onClick={handleSubmit} label={isSubmitting ? "Creating Account..." : "Create Account"} />

            <GoogleAuthButton onSuccess={onGoogleSuccess} onError={onGoogleError} />
        </form>
    );
}
