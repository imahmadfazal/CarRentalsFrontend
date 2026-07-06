/**
 * bookingValidation.js
 * ---------------------
 * Pure validation for the renter and guarantor steps of the booking
 * flow. Mirrors SearchCarForm/Validation.js's shape: returns an errors
 * object keyed by field name, empty when the form is valid.
 */

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateRenterForm(values) {
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

    if (!values.idCardImage) {
        errors.idCardImage = "Please upload a photo of your ID card.";
    }

    return errors;
}

export function validateGuarantorForm(values) {
    const errors = {};

    if (!values.fullName || !values.fullName.trim()) {
        errors.fullName = "Please enter the guarantor's full name.";
    }

    if (!values.phone || !values.phone.trim()) {
        errors.phone = "Please enter the guarantor's phone number.";
    }

    if (!values.idCardImage) {
        errors.idCardImage = "Please upload the guarantor's ID card.";
    }

    return errors;
}
