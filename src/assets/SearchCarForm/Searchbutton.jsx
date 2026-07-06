import "./Searchbutton.css";

/**
 * SearchButton
 * ------------
 * Large premium CTA for the form. Stretches to fill its grid cell
 * (see searchFields.css) so it lines up with the adjacent inputs on
 * desktop, and goes full-width on mobile per spec.
 */
export default function SearchButton({ onClick, label = "Search Cars" }) {
    return (
        <button type="button" className="search-button" onClick={onClick}>
            {label}
        </button>
    );
}