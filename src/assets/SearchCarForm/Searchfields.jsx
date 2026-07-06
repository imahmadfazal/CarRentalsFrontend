import {
    FaLocationDot,
    FaCalendarDays,
    FaClock,
    FaCar,
    FaDollarSign,
    FaUsers,
    FaGears,
} from "react-icons/fa6";
import SearchInput from "./Searchinput";
import SearchSelect from "./Searchselect";
import SearchButton from "./Searchbutton";
import "./Searchfields.css";

const CAR_CATEGORY_OPTIONS = [
    { value: "sports", label: "Sports Cars" },
    { value: "luxury", label: "Luxury Cars" },
    { value: "suv", label: "SUVs" },
];

const PRICE_RANGE_OPTIONS = [
    { value: "any", label: "Any Price" },
    { value: "100-200", label: "$100 - $200" },
    { value: "200-400", label: "$200 - $400" },
    { value: "400-700", label: "$400 - $700" },
    { value: "700+", label: "$700+" },
];

const TRANSMISSION_OPTIONS = [
    { value: "automatic", label: "Automatic" },
    { value: "manual", label: "Manual" },
    { value: "any", label: "Any" },
];

const PASSENGER_OPTIONS = ["2", "4", "5", "7", "8+"];

/**
 * SearchFields
 * ------------
 * The form's main two-row grid (per spec):
 *   Row 1: pickup location, pickup date, pickup time, return date, return time
 *   Row 2: car category, price range, transmission, passengers, search button
 *
 * Receives `values`, `errors`, and `onChange` from the parent
 * (SearchForm.jsx), which owns all form state — this component is a
 * pure, controlled view over that state.
 */
export default function SearchFields({ values, errors, onChange, onSubmit }) {
    return (
        <div className="search-fields">
            {/* Row 1 */}
            <div className="search-fields__row">
                <SearchInput
                    id="pickupLocation"
                    label="Pickup Location"
                    placeholder="Enter city or airport"
                    icon={<FaLocationDot />}
                    value={values.pickupLocation}
                    onChange={(val) => onChange("pickupLocation", val)}
                    error={errors.pickupLocation}
                    required
                />
                <SearchInput
                    id="pickupDate"
                    label="Pickup Date"
                    type="date"
                    icon={<FaCalendarDays />}
                    value={values.pickupDate}
                    onChange={(val) => onChange("pickupDate", val)}
                    error={errors.pickupDate}
                    required
                />
                <SearchInput
                    id="pickupTime"
                    label="Pickup Time"
                    type="time"
                    icon={<FaClock />}
                    value={values.pickupTime}
                    onChange={(val) => onChange("pickupTime", val)}
                />
                <SearchInput
                    id="returnDate"
                    label="Return Date"
                    type="date"
                    icon={<FaCalendarDays />}
                    value={values.returnDate}
                    onChange={(val) => onChange("returnDate", val)}
                    error={errors.returnDate}
                    required
                />
                <SearchInput
                    id="returnTime"
                    label="Return Time"
                    type="time"
                    icon={<FaClock />}
                    value={values.returnTime}
                    onChange={(val) => onChange("returnTime", val)}
                />
            </div>

            {/* Row 2 */}
            <div className="search-fields__row">
                <SearchSelect
                    id="carCategory"
                    label="Car Category"
                    icon={<FaCar />}
                    value={values.carCategory}
                    onChange={(val) => onChange("carCategory", val)}
                    options={CAR_CATEGORY_OPTIONS}
                    placeholder="Select category"
                    error={errors.carCategory}
                    required
                />
                <SearchSelect
                    id="priceRange"
                    label="Price Range"
                    icon={<FaDollarSign />}
                    value={values.priceRange}
                    onChange={(val) => onChange("priceRange", val)}
                    options={PRICE_RANGE_OPTIONS}
                    placeholder="Any price"
                />
                <SearchSelect
                    id="transmission"
                    label="Transmission"
                    icon={<FaGears />}
                    value={values.transmission}
                    onChange={(val) => onChange("transmission", val)}
                    options={TRANSMISSION_OPTIONS}
                    placeholder="Any"
                />
                <SearchSelect
                    id="passengers"
                    label="Passengers"
                    icon={<FaUsers />}
                    value={values.passengers}
                    onChange={(val) => onChange("passengers", val)}
                    options={PASSENGER_OPTIONS}
                    placeholder="Select"
                />
                <div className="search-fields__button-cell">
                    <SearchButton onClick={onSubmit} />
                </div>
            </div>
        </div>
    );
}