import { FaUser, FaEnvelope, FaPhone } from "react-icons/fa6";
import SearchInput from "../SearchCarForm/Searchinput";
import BookingIdUpload from "./BookingIdUpload";
import "./BookingRenterForm.css";

/**
 * BookingRenterForm
 * ------------------
 * Renter contact details, built from the same SearchInput control used
 * throughout the search form for visual consistency. Pure controlled
 * component — state and validation live in BookingPage.
 */
export default function BookingRenterForm({ values, errors, onChange, onIdChange }) {
    return (
        <section className="booking-renter-form">
            <h3 className="booking-renter-form__title">Your Details</h3>
            <div className="booking-renter-form__row">
                <SearchInput
                    id="renterFullName"
                    label="Full Name"
                    placeholder="Jordan Casey"
                    icon={<FaUser />}
                    value={values.fullName}
                    onChange={(val) => onChange("fullName", val)}
                    error={errors.fullName}
                    required
                />
            </div>
            <div className="booking-renter-form__row booking-renter-form__row--split">
                <SearchInput
                    id="renterEmail"
                    label="Email Address"
                    type="email"
                    placeholder="you@example.com"
                    icon={<FaEnvelope />}
                    value={values.email}
                    onChange={(val) => onChange("email", val)}
                    error={errors.email}
                    required
                />
                <SearchInput
                    id="renterPhone"
                    label="Phone Number"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    icon={<FaPhone />}
                    value={values.phone}
                    onChange={(val) => onChange("phone", val)}
                    error={errors.phone}
                    required
                />
            </div>

            <BookingIdUpload
                id="renterIdCard"
                label="Your ID Card"
                description="Upload a clear photo of your driver's license or government-issued ID."
                value={values.idCardImage}
                onChange={onIdChange}
                error={errors.idCardImage}
            />
        </section>
    );
}
