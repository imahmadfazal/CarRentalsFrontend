/**
 * pricing.js
 * ----------
 * Pure pricing logic for the booking flow. Kept separate from any
 * component (same pattern as filterCars.js / Validation.js elsewhere
 * in the project) so the math can be read and reasoned about on its
 * own, and reused by both BookingPage (live estimate) and the
 * confirmation page (final receipt) without recomputation drift.
 */

export const ADD_ONS = [
    {
        id: "insurance",
        label: "Premium Insurance",
        desc: "Full collision & theft coverage, zero deductible",
        price: 25,
    },
    {
        id: "additionalDriver",
        label: "Additional Driver",
        desc: "Add a second authorized driver to the rental",
        price: 15,
    },
    {
        id: "gps",
        label: "GPS Navigation",
        desc: "Premium in-car navigation system",
        price: 8,
    },
    {
        id: "childSeat",
        label: "Child Seat",
        desc: "Certified safety seat, installed at pickup",
        price: 10,
    },
];

const SERVICE_FEE_RATE = 0.05;

/** Whole rental days between two "YYYY-MM-DD" date strings, minimum 1. */
export function calculateRentalDays(pickupDate, returnDate) {
    if (!pickupDate || !returnDate) return 1;
    const pickup = new Date(pickupDate);
    const ret = new Date(returnDate);
    const diff = Math.round((ret - pickup) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
}

/** Total cost of every selected add-on across the full rental duration. */
export function calculateAddOnsTotal(selectedAddOns, days) {
    return ADD_ONS.filter((addOn) => selectedAddOns[addOn.id]).reduce(
        (sum, addOn) => sum + addOn.price * days,
        0
    );
}

/** RideHarbor concierge service fee — a flat percentage of the subtotal. */
export function calculateServiceFee(subtotal) {
    return Math.round(subtotal * SERVICE_FEE_RATE);
}

/**
 * Full breakdown for a given car/date/add-on combination. Returns every
 * line item so the UI never has to re-derive a number it displays.
 */
export function calculatePriceBreakdown({ dailyRate, pickupDate, returnDate, selectedAddOns }) {
    const days = calculateRentalDays(pickupDate, returnDate);
    const rentalSubtotal = dailyRate * days;
    const addOnsTotal = calculateAddOnsTotal(selectedAddOns, days);
    const serviceFee = calculateServiceFee(rentalSubtotal + addOnsTotal);
    const total = rentalSubtotal + addOnsTotal + serviceFee;

    return { days, rentalSubtotal, addOnsTotal, serviceFee, total };
}
