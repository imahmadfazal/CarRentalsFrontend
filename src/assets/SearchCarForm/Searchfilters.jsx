import SearchCheckbox from "./Searchcheckbox";
import "./Searchfields.css";

const FILTER_OPTIONS = [
    { id: "unlimitedMileage", label: "Unlimited Mileage" },
    { id: "airportPickup", label: "Airport Pickup" },
    { id: "freeCancellation", label: "Free Cancellation" },
    { id: "driverIncluded", label: "Driver Included" },
    { id: "instantBooking", label: "Instant Booking" },
];

/**
 * SearchFilters
 * -------------
 * Horizontal row of optional glass checkboxes below the main fields.
 * `values` is an object keyed by filter id (e.g. { unlimitedMileage:
 * true, airportPickup: false, ... }), controlled by the parent.
 */
export default function SearchFilters({ values, onChange }) {
    return (
        <div className="search-fields__filters">
            {FILTER_OPTIONS.map((filter) => (
                <SearchCheckbox
                    key={filter.id}
                    id={filter.id}
                    label={filter.label}
                    checked={Boolean(values[filter.id])}
                    onChange={(checked) => onChange(filter.id, checked)}
                />
            ))}
        </div>
    );
}