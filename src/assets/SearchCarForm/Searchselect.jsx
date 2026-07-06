import "./Searchselect.css";

/**
 * SearchSelect
 * ------------
 * Generic labeled dropdown used for car category, price range,
 * transmission, and passenger count. Mirrors SearchInput's structure
 * (icon + control + inline error) so the two feel like one family.
 *
 * `options` is an array of either plain strings (used as both value
 * and label) or { value, label } objects, so callers can pass
 * machine-friendly values (e.g. "sports") with human-friendly labels
 * (e.g. "Sports Cars") when needed.
 */
export default function SearchSelect({
    id,
    label,
    icon,
    value,
    onChange,
    options,
    placeholder = "Select an option",
    error,
    required = false,
}) {
    return (
        <div className="search-select">
            <label htmlFor={id} className="search-select__label">
                {label}
                {required && <span className="search-select__required">*</span>}
            </label>

            <div className={`search-select__field ${error ? "search-select__field--error" : ""}`}>
                {icon && <span className="search-select__icon">{icon}</span>}
                <select
                    id={id}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="search-select__control"
                    aria-invalid={Boolean(error)}
                    aria-describedby={error ? `${id}-error` : undefined}
                >
                    <option value="" disabled>
                        {placeholder}
                    </option>
                    {options.map((option) => {
                        const optValue = typeof option === "string" ? option : option.value;
                        const optLabel = typeof option === "string" ? option : option.label;
                        return (
                            <option key={optValue} value={optValue}>
                                {optLabel}
                            </option>
                        );
                    })}
                </select>
            </div>

            {error && (
                <p className="search-select__error" id={`${id}-error`}>
                    {error}
                </p>
            )}
        </div>
    );
}