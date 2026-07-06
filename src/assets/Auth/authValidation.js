/**
 * authValidation.js
 * -------------------
 * Pure validation for the sign-in and sign-up forms. Mirrors the shape
 * used by SearchCarForm/Validation.js and Booking/bookingValidation.js:
 * returns an errors object keyed by field name, empty when valid.
 */

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 6;

export function validateSignIn(values) {
    const errors = {};

    if (!values.email || !values.email.trim()) {
        errors.email = "Please enter your email address.";
    } else if (!EMAIL_PATTERN.test(values.email.trim())) {
        errors.email = "Please enter a valid email address.";
    }

    if (!values.password) {
        errors.password = "Please enter your password.";
    }

    return errors;
}

export function validateSignUp(values) {
    const errors = {};

    if (!values.fullName || !values.fullName.trim()) {
        errors.fullName = "Please enter your full name.";
    }

    if (!values.email || !values.email.trim()) {
        errors.email = "Please enter your email address.";
    } else if (!EMAIL_PATTERN.test(values.email.trim())) {
        errors.email = "Please enter a valid email address.";
    }

    if (!values.phone || !values.phone.trim()) {
        errors.phone = "Please enter a phone number.";
    }

    if (!values.password) {
        errors.password = "Please create a password.";
    } else if (values.password.length < MIN_PASSWORD_LENGTH) {
        errors.password = `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`;
    }

    if (!values.confirmPassword) {
        errors.confirmPassword = "Please confirm your password.";
    } else if (values.confirmPassword !== values.password) {
        errors.confirmPassword = "Passwords don't match.";
    }

    if (!values.agreeToTerms) {
        errors.agreeToTerms = "You must agree to the Terms of Service.";
    }

    return errors;
}
