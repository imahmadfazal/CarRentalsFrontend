import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import SignInForm from "./SignInForm";
import { validateSignIn } from "./authValidation";
import { useAuth } from "../../context/AuthContext";

const INITIAL_VALUES = { email: "", password: "", rememberMe: false };

export default function SignInPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();
    const [values, setValues] = useState(INITIAL_VALUES);
    const [errors, setErrors] = useState({});
    const [formError, setFormError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Set by ProtectedRoute (direct URL visit) or CarDetailsPage's
    // "Reserve This Vehicle" click — where to send the user back to,
    // and any dates they'd already picked, once they're signed in.
    const from = location.state?.from || "/";
    const bookingState = location.state?.bookingState;
    const authMessage = location.state?.authMessage;

    function handleChange(field, value) {
        setValues((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors((prev) => {
                const next = { ...prev };
                delete next[field];
                return next;
            });
        }
        if (formError) setFormError("");
    }

    function goToDestination() {
        navigate(from, bookingState ? { state: bookingState } : undefined);
    }

    async function handleSubmit() {
        const validationErrors = validateSignIn(values);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) return;

        setIsSubmitting(true);
        setFormError("");
        try {
            await login({ email: values.email, password: values.password });
            goToDestination();
        } catch (err) {
            setFormError(err.response?.data?.message || "Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <AuthLayout
            eyebrow="Welcome Back"
            title="Sign In"
            subtext={authMessage || "Access your bookings, favorites, and account details."}
            footer={
                <>
                    Don&rsquo;t have an account?{" "}
                    <Link to="/signup" state={location.state}>Create one</Link>
                </>
            }
        >
            <SignInForm
                values={values}
                errors={errors}
                onChange={handleChange}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                formError={formError}
                onGoogleSuccess={goToDestination}
                onGoogleError={setFormError}
            />
        </AuthLayout>
    );
}
