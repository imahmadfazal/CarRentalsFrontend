import "./Searchheader.css";

/**
 * SearchHeader
 * ------------
 * Centered eyebrow + heading + description at the top of the search
 * card. Purely presentational — no props needed since this copy is
 * fixed per the spec, but kept as its own component for easy editing
 * and to match the requested file structure.
 */
export default function SearchHeader() {
    return (
        <div className="search-header">
            <span className="search-header__eyebrow">Find Your Perfect Ride</span>
            <h2 className="search-header__heading">Search Luxury Rental Cars</h2>
            <p className="search-header__description">
                Choose your destination, travel dates, and preferred vehicle
                category to discover the perfect rental for your journey.
            </p>
        </div>
    );
}