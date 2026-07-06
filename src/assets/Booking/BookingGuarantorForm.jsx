import { FaUser, FaPhone } from "react-icons/fa6";
import SearchInput from "../SearchCarForm/Searchinput";
import BookingIdUpload from "./BookingIdUpload";
import "./BookingGuarantorForm.css";

/**
 * BookingGuarantorForm
 * ----------------------
 * Guarantor contact details + their ID card upload. A guarantor
 * co-signs the rental and is only contacted if the renter can't be
 * reached — kept as its own section/component (rather than folded
 * into BookingRenterForm) since it's conceptually a different person.
 */
export default function BookingGuarantorForm({ values, errors, onChange, onIdChange }) {
    return (
        <section className="booking-guarantor-form">
            <h3 className="booking-guarantor-form__title">Guarantor Details</h3>
            <p className="booking-guarantor-form__subtext">
                A guarantor co-signs for the rental and is contacted only if the renter can&rsquo;t be reached.
            </p>

            <div className="booking-guarantor-form__row">
                <SearchInput
                    id="guarantorFullName"
                    label="Guarantor Full Name"
                    placeholder="Alex Rivera"
                    icon={<FaUser />}
                    value={values.fullName}
                    onChange={(val) => onChange("fullName", val)}
                    error={errors.fullName}
                    required
                />
                <SearchInput
                    id="guarantorPhone"
                    label="Guarantor Phone Number"
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
                id="guarantorIdCard"
                label="Guarantor ID Card"
                description="Upload a clear photo of the guarantor's government-issued ID."
                value={values.idCardImage}
                onChange={onIdChange}
                error={errors.idCardImage}
            />
        </section>
    );
}
