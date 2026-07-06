/**
 * utils/validation.js
 * --------------------
 * Pure validation logic for the search form. Kept separate from any
 * component so it can be unit-tested on its own and reused later
 * (e.g. validating the same shape again on a backend call).
 *
 * validateSearchForm(values) returns an errors object shaped like:
 *   { pickupLocation: "Please enter a pickup location", ... }
 * An empty object means the form is valid — callers typically check
 * `Object.keys(errors).length === 0`.
 */

export function validateSearchForm(values) {
    const errors = {};

    if (!values.pickupLocation || !values.pickupLocation.trim()) {
        errors.pickupLocation = "Please enter a pickup location.";
    }

    if (!values.pickupDate) {
        errors.pickupDate = "Please select a pickup date.";
    }

    if (!values.returnDate) {
        errors.returnDate = "Please select a return date.";
    }

    // Only compare dates if both are present and parseable, so a single
    // missing field doesn't also trigger a confusing second error.
    if (values.pickupDate && values.returnDate) {
        const pickup = new Date(values.pickupDate);
        const ret = new Date(values.returnDate);
        if (!Number.isNaN(pickup.valueOf()) && !Number.isNaN(ret.valueOf()) && ret < pickup) {
            errors.returnDate = "Return date can't be before the pickup date.";
        }
    }

    if (!values.carCategory) {
        errors.carCategory = "Please select a car category.";
    }

    return errors;
}

/** Convenience boolean check, used by the submit handler. */
export function isSearchFormValid(values) {
    return Object.keys(validateSearchForm(values)).length === 0;
}