import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import SignUpForm from "./SignUpForm";
import { validateSignUp } from "./authValidation";
import { useAuth } from "../../context/AuthContext";

const INITIAL_VALUES = {
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
};

export default function SignUpPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { register } = useAuth();
    const [values, setValues] = useState(INITIAL_VALUES);
    const [errors, setErrors] = useState({});
    const [formError, setFormError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Same redirect-back contract as SignInPage — preserved across the
    // "Already have an account?" link so switching forms doesn't lose
    // the pending reservation.
    const from = location.state?.from || "/";
    const bookingState = location.state?.bookingState;

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
        const validationErrors = validateSignUp(values);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) return;

        setIsSubmitting(true);
        setFormError("");
        try {
            await register({
                name: values.fullName,
                email: values.email,
                phone: values.phone,
                password: values.password,
            });
            goToDestination();
        } catch (err) {
            setFormError(err.response?.data?.message || "Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <AuthLayout
            eyebrow="Join RideHarbor"
            title="Create Account"
            subtext="Save favorites, track bookings, and check out faster next time."
            footer={
                <>
                    Already have an account?{" "}
                    <Link to="/signin" state={location.state}>Sign in</Link>
                </>
            }
        >
            <SignUpForm
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
