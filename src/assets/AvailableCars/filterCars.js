/**
 * filterCars.js
 * -------------
 * Pure filtering logic for the Available Cars results page. Kept
 * separate from the component (same pattern as SearchCarForm's
 * Validation.js) so the matching rules can be reasoned about and
 * reused without touching JSX. `collectionsData` is passed in (from
 * useCars()) rather than imported statically, since the fleet now
 * lives in the database.
 */

function parsePriceRange(priceRange) {
    if (!priceRange || priceRange === "any") return null;
    if (priceRange.endsWith("+")) {
        return { min: Number(priceRange.replace("+", "")), max: Infinity };
    }
    const [min, max] = priceRange.split("-").map(Number);
    return { min, max };
}

function matchesPassengers(carSeats, passengers) {
    if (!passengers) return true;
    if (passengers === "8+") return carSeats >= 8;
    return carSeats === Number(passengers);
}

/**
 * Returns the cars matching the given search criteria. Any criterion
 * left empty/"any" is treated as "no preference" rather than excluding
 * everything, so a partially-filled search still returns useful results.
 */
export function filterAvailableCars(criteria = {}, collectionsData = {}) {
    const { carCategory, priceRange, transmission, passengers } = criteria;

    const pool = carCategory
        ? collectionsData[carCategory] ?? []
        : Object.values(collectionsData).flat();

    const priceBounds = parsePriceRange(priceRange);

    return pool.filter((car) => {
        if (priceBounds && (car.price < priceBounds.min || car.price > priceBounds.max)) {
            return false;
        }
        if (transmission && transmission !== "any" && car.transmission.toLowerCase() !== transmission) {
            return false;
        }
        if (!matchesPassengers(car.seats, passengers)) {
            return false;
        }
        return true;
    });
}
