import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchHeader from "./SearchHeader";
import SearchFields from "./SearchFields";
import SearchFilters from "./SearchFilters";
import { validateSearchForm } from "./Validation";
import "./Searchform.css";

/**
 * SearchForm
 * ----------
 * Self-contained search module — drop it anywhere below your Hero
 * section once you're ready:
 *
 *   import SearchForm from "./components/SearchForm/SearchForm";
 *   ...
 *   <Hero />
 *   <SearchForm />
 *
 * Layout: renders a two-column section on tablet/desktop — a
 * promotional card on the left (SearchPromoCard, ~38% width, GSAP
 * entrance + hover animation) and this existing form card on the
 * right (~62% width, unchanged: same fields, validation, state, and
 * navigation as before, still plain-CSS animated only). On mobile
 * (<=768px) the promo card is hidden and the form goes full width —
 * see styles/SearchForm/searchForm.css for the breakpoint.
 *
 * IMPORTANT — requires a React Router context. This component calls
 * useNavigate(), so the app must already be wrapped in a <BrowserRouter>
 * (or other Router) somewhere above it — typically in main.jsx / App.jsx:
 *
 *   import { BrowserRouter } from "react-router-dom";
 *   <BrowserRouter><App /></BrowserRouter>
 *
 * If that wrapper isn't in place yet, add it before integrating this
 * form — it will throw at render time otherwise. This file does not
 * add that wrapper itself, since it would mean touching App.jsx /
 * main.jsx, and the instructions were not to modify existing files.
 *
 * State shape (kept flat and API-ready — this object can be sent
 * directly as a request body or query string later):
 *   {
 *     pickupLocation: string,
 *     pickupDate: string,      // "YYYY-MM-DD" (native <input type="date">)
 *     pickupTime: string,      // "HH:MM"      (native <input type="time">)
 *     returnDate: string,
 *     returnTime: string,
 *     carCategory: "sports" | "luxury" | "suv" | "",
 *     priceRange: string,
 *     transmission: string,
 *     passengers: string,
 *     filters: { unlimitedMileage: bool, airportPickup: bool, ... },
 *   }
 */

const INITIAL_VALUES = {
    pickupLocation: "",
    pickupDate: "",
    pickupTime: "",
    returnDate: "",
    returnTime: "",
    carCategory: "",
    priceRange: "",
    transmission: "",
    passengers: "",
};

const INITIAL_FILTERS = {
    unlimitedMileage: false,
    airportPickup: false,
    freeCancellation: false,
    driverIncluded: false,
    instantBooking: false,
};

export default function SearchForm() {
    const navigate = useNavigate();

    const [values, setValues] = useState(INITIAL_VALUES);
    const [filters, setFilters] = useState(INITIAL_FILTERS);
    const [errors, setErrors] = useState({});

    function handleFieldChange(field, value) {
        setValues((prev) => ({ ...prev, [field]: value }));
        // Clear that field's error the moment the user starts fixing it,
        // rather than making them re-submit to see the message disappear.
        if (errors[field]) {
            setErrors((prev) => {
                const next = { ...prev };
                delete next[field];
                return next;
            });
        }
    }

    function handleFilterChange(filterId, checked) {
        setFilters((prev) => ({ ...prev, [filterId]: checked }));
    }

    function handleSubmit() {
        const validationErrors = validateSearchForm(values);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            return; // inline messages render below the relevant fields
        }

        // Build the full search payload (form values + selected filters).
        const searchData = { ...values, filters };

        // Pass data both ways so the receiving page can use whichever is
        // more convenient: router state for the full object (survives
        // refresh-free navigation), and query params for shareable /
        // bookmarkable URLs and refresh-safe reads.
        const params = new URLSearchParams({
            pickupLocation: searchData.pickupLocation,
            pickupDate: searchData.pickupDate,
            pickupTime: searchData.pickupTime,
            returnDate: searchData.returnDate,
            returnTime: searchData.returnTime,
            carCategory: searchData.carCategory,
            priceRange: searchData.priceRange,
            transmission: searchData.transmission,
            passengers: searchData.passengers,
        });

        navigate(`/available-cars?${params.toString()}`, {
            state: searchData,
        });
    }

    return (
        <section id="book" className="search-form" aria-label="Search luxury rental cars">
            <div className="search-form__intro">
                <SearchHeader />
            </div>

            <div className="search-form__layout">
                <div className="search-form__card">
                    <SearchFields
                        values={values}
                        errors={errors}
                        onChange={handleFieldChange}
                        onSubmit={handleSubmit}
                    />
                    <SearchFilters values={filters} onChange={handleFilterChange} />
                </div>
            </div>
        </section>
    );
}
