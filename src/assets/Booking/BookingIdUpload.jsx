import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./BookingIdUpload.css";

function fileToDataUrl(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

/**
 * BookingIdUpload
 * -----------------
 * Reusable ID-card image upload control — click or drag-and-drop a
 * photo, see it previewed in place, replace or remove it. Used for
 * both the renter's and the guarantor's ID card so the two sections
 * never duplicate this markup.
 *
 * No backend yet, so the file is read client-side into a data URL via
 * FileReader and that string is what's lifted up through `onChange`.
 */
export default function BookingIdUpload({ id, label, description, value, onChange, error }) {
    const inputRef = useRef(null);
    const previewRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);

    // Give the preview a soft scale-in the moment an image lands,
    // rather than having it just snap into place.
    useEffect(() => {
        if (!value || !previewRef.current) return;
        gsap.fromTo(
            previewRef.current,
            { opacity: 0, scale: 0.92 },
            { opacity: 1, scale: 1, duration: 0.45, ease: "power2.out" }
        );
    }, [value]);

    async function handleFiles(fileList) {
        const file = fileList?.[0];
        if (!file || !file.type.startsWith("image/")) return;
        const dataUrl = await fileToDataUrl(file);
        onChange(dataUrl);
    }

    function handleDrop(event) {
        event.preventDefault();
        setIsDragging(false);
        handleFiles(event.dataTransfer.files);
    }

    function handleKeyDown(event) {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            inputRef.current?.click();
        }
    }

    return (
        <div className="booking-id-upload">
            <span className="booking-id-upload__label">{label}</span>
            {description && <p className="booking-id-upload__desc">{description}</p>}

            <div
                className={`booking-id-upload__dropzone ${isDragging ? "booking-id-upload__dropzone--dragging" : ""} ${error ? "booking-id-upload__dropzone--error" : ""}`}
                onClick={() => inputRef.current?.click()}
                onKeyDown={handleKeyDown}
                onDragOver={(event) => { event.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                role="button"
                tabIndex={0}
                aria-label={value ? `Replace ${label}` : `Upload ${label}`}
            >
                <input
                    ref={inputRef}
                    id={id}
                    type="file"
                    accept="image/*"
                    className="booking-id-upload__input"
                    onChange={(event) => handleFiles(event.target.files)}
                />

                {value ? (
                    <div className="booking-id-upload__preview" ref={previewRef}>
                        <img src={value} alt={`${label} preview`} className="booking-id-upload__preview-img" />
                        <button
                            type="button"
                            className="booking-id-upload__remove"
                            onClick={(event) => { event.stopPropagation(); onChange(null); }}
                            aria-label={`Remove ${label}`}
                        >
                            &times;
                        </button>
                        <span className="booking-id-upload__replace-hint">Click to replace</span>
                    </div>
                ) : (
                    <div className="booking-id-upload__placeholder">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="booking-id-upload__icon" aria-hidden="true">
                            <rect x="3" y="5" width="18" height="14" rx="2" />
                            <circle cx="9" cy="11" r="2" />
                            <path d="M21 16l-4.5-4.5a2 2 0 0 0-2.8 0L7 18" />
                        </svg>
                        <span className="booking-id-upload__placeholder-text">Click or drag image to upload</span>
                    </div>
                )}
            </div>

            {error && <p className="booking-id-upload__error">{error}</p>}
        </div>
    );
}
