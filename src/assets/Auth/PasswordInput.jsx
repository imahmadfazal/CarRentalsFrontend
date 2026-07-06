import { useState } from "react";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa6";
import "../SearchCarForm/Searchinput.css";
import "./PasswordInput.css";

/**
 * PasswordInput
 * --------------
 * Password field with a show/hide toggle. Reuses SearchInput's exact
 * CSS classes (search-input__*) so it's visually identical to every
 * other field in the app, rather than duplicating that styling or
 * modifying the shared SearchInput component to grow a toggle slot it
 * doesn't otherwise need.
 */
export default function PasswordInput({
    id,
    label,
    placeholder,
    value,
    onChange,
    error,
    required = false,
    autoComplete,
}) {
    const [visible, setVisible] = useState(false);

    return (
        <div className="search-input">
            <label htmlFor={id} className="search-input__label">
                {label}
                {required && <span className="search-input__required">*</span>}
            </label>

            <div className={`search-input__field ${error ? "search-input__field--error" : ""}`}>
                <span className="search-input__icon">
                    <FaLock />
                </span>
                <input
                    id={id}
                    type={visible ? "text" : "password"}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="search-input__control"
                    autoComplete={autoComplete}
                    aria-invalid={Boolean(error)}
                    aria-describedby={error ? `${id}-error` : undefined}
                />
                <button
                    type="button"
                    className="password-input__toggle"
                    onClick={() => setVisible((v) => !v)}
                    aria-label={visible ? "Hide password" : "Show password"}
                    tabIndex={-1}
                >
                    {visible ? <FaEyeSlash /> : <FaEye />}
                </button>
            </div>

            {error && (
                <p className="search-input__error" id={`${id}-error`}>
                    {error}
                </p>
            )}
        </div>
    );
}
