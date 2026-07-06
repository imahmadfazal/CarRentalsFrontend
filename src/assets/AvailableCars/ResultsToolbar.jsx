import "./ResultsToolbar.css";

/**
 * ResultsToolbar
 * --------------
 * Small sort control for the results grid below. Mirrors the sort
 * dropdown already used in Collections.jsx so both vehicle-listing
 * surfaces feel consistent.
 */
export default function ResultsToolbar({ sortBy, onSortChange, count }) {
    return (
        <div className="results-toolbar">
            <span className="results-toolbar__count">{count} results</span>

            <div className="results-toolbar__sort-wrapper">
                <span className="results-toolbar__sort-label">Sort By:</span>
                <select
                    className="results-toolbar__sort-select"
                    value={sortBy}
                    onChange={(e) => onSortChange(e.target.value)}
                >
                    <option value="featured">Featured Fleet</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="power-desc">Horsepower: High to Low</option>
                </select>
            </div>
        </div>
    );
}
