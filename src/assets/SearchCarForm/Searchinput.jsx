import "./Searchinput.css";

/**
 * SearchInput
 * -----------
 * Generic labeled input used for pickup location, dates, and times.
 * Renders an icon, a native <input>, and an inline error message
 * (no browser alerts, per spec).
 *
 * `type` is passed straight to the native input (e.g. "text", "date",
 * "time"), so the browser's own date/time pickers are used — no
 * extra date-picker library needed.
 */
export default function SearchInput({
    id,
    label,
    type = "text",
    placeholder,
    icon,
    value,
    onChange,
    error,
    required = false,
}) {
    return (
        <div className="search-input">
            <label htmlFor={id} className="search-input__label">
                {label}
                {required && <span className="search-input__required">*</span>}
            </label>

            <div className={`search-input__field ${error ? "search-input__field--error" : ""}`}>
                {icon && <span className="search-input__icon">{icon}</span>}
                <input
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="search-input__control"
                    aria-invalid={Boolean(error)}
                    aria-describedby={error ? `${id}-error` : undefined}
                />
            </div>

            {error && (
                <p className="search-input__error" id={`${id}-error`}>
                    {error}
                </p>
            )}
        </div>
    );
}