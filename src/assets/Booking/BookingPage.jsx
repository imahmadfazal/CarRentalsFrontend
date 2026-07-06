import { useEffect, useMemo, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import gsap from "gsap";
import Navbar from "../homeherosec/Navbar";
import BackButton from "../CarDetail/Backbutton";
import { useCars } from "../../context/CarsContext";
import BookingCarSummary from "./BookingCarSummary";
import BookingDatesPanel from "./BookingDatesPanel";
import BookingAddOns from "./BookingAddOns";
import BookingRenterForm from "./BookingRenterForm";
import BookingGuarantorForm from "./BookingGuarantorForm";
import BookingPriceSummary from "./BookingPriceSummary";
import BookingSideImage from "./BookingSideImage";
import { calculatePriceBreakdown, ADD_ONS } from "./pricing";
import { validateRenterForm, validateGuarantorForm } from "./bookingValidation";
import generateBookingId from "./generateBookingId";
import api from "../../utils/api";
import "./BookingPage.css";

const INITIAL_RENTER = { fullName: "", email: "", phone: "", idCardImage: null };
const INITIAL_GUARANTOR = { fullName: "", phone: "", idCardImage: null };

function toDateInputValue(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

/**
 * BookingPage
 * -----------
 * Step between picking a car and the confirmation screen. Reads the
 * dates carried over from CarDetailsPage's "Reserve This Vehicle"
 * button (router state), lets the renter adjust dates/extras/contact
 * info, then hands a complete booking object to the confirmation page.
 */
export default function BookingPage() {
    const { carId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const { allCars } = useCars();

    const car = useMemo(() => {
        return allCars.find((c) => c.id === carId) ?? null;
    }, [carId, allCars]);

    const [pickupDate, setPickupDate] = useState(
        () => location.state?.pickupDate || toDateInputValue(new Date())
    );
    const [returnDate, setReturnDate] = useState(
        () => location.state?.returnDate || toDateInputValue(addDays(new Date(), 4))
    );
    const [selectedAddOns, setSelectedAddOns] = useState({});
    const [renterValues, setRenterValues] = useState(INITIAL_RENTER);
    const [renterErrors, setRenterErrors] = useState({});
    const [guarantorValues, setGuarantorValues] = useState(INITIAL_GUARANTOR);
    const [guarantorErrors, setGuarantorErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState("");

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;
        if (prefersReducedMotion || !car) return;

        const tl = gsap.timeline();
        tl.fromTo(
            ".booking-page__toolbar",
            { opacity: 0, y: -20 },
            { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }
        );
        tl.fromTo(
            ".booking-car-summary",
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
            "-=0.4"
        );
        tl.fromTo(
            ".booking-page__form > *",
            { opacity: 0, y: 25 },
            { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: "power3.out" },
            "-=0.3"
        );
        tl.fromTo(
            ".booking-price-summary",
            { opacity: 0, y: 25 },
            { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
            "-=0.5"
        );
        tl.fromTo(
            ".booking-side-image",
            { opacity: 0, y: 25 },
            { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
            "-=0.45"
        );

        return () => tl.kill();
    }, [car]);

    const breakdown = useMemo(
        () =>
            car
                ? calculatePriceBreakdown({
                    dailyRate: car.price,
                    pickupDate,
                    returnDate,
                    selectedAddOns,
                })
                : null,
        [car, pickupDate, returnDate, selectedAddOns]
    );

    function handleAddOnToggle(addOnId, checked) {
        setSelectedAddOns((prev) => ({ ...prev, [addOnId]: checked }));
    }

    function handleRenterChange(field, value) {
        setRenterValues((prev) => ({ ...prev, [field]: value }));
        if (renterErrors[field]) {
            setRenterErrors((prev) => {
                const next = { ...prev };
                delete next[field];
                return next;
            });
        }
    }

    function handleRenterIdChange(dataUrl) {
        setRenterValues((prev) => ({ ...prev, idCardImage: dataUrl }));
        if (renterErrors.idCardImage) {
            setRenterErrors((prev) => {
                const next = { ...prev };
                delete next.idCardImage;
                return next;
            });
        }
    }

    function handleGuarantorChange(field, value) {
        setGuarantorValues((prev) => ({ ...prev, [field]: value }));
        if (guarantorErrors[field]) {
            setGuarantorErrors((prev) => {
                const next = { ...prev };
                delete next[field];
                return next;
            });
        }
    }

    function handleGuarantorIdChange(dataUrl) {
        setGuarantorValues((prev) => ({ ...prev, idCardImage: dataUrl }));
        if (guarantorErrors.idCardImage) {
            setGuarantorErrors((prev) => {
                const next = { ...prev };
                delete next.idCardImage;
                return next;
            });
        }
    }

    async function handleConfirm() {
        const renterValidationErrors = validateRenterForm(renterValues);
        const guarantorValidationErrors = validateGuarantorForm(guarantorValues);
        setRenterErrors(renterValidationErrors);
        setGuarantorErrors(guarantorValidationErrors);

        if (
            Object.keys(renterValidationErrors).length > 0 ||
            Object.keys(guarantorValidationErrors).length > 0
        ) {
            return;
        }

        setIsSubmitting(true);
        setSubmitError("");

        const booking = {
            bookingId: generateBookingId(),
            car,
            pickupDate,
            returnDate,
            renter: renterValues,
            guarantor: guarantorValues,
            addOns: ADD_ONS.filter((addOn) => selectedAddOns[addOn.id]),
            ...breakdown,
        };

        try {
            await api.post("/bookings", booking);
            navigate("/booking-confirmation", { state: { booking } });
        } catch (err) {
            setSubmitError(
                err.response?.data?.message || "We couldn't save your booking. Please try again."
            );
            setIsSubmitting(false);
        }
    }

    if (!car) {
        return (
            <div className="booking-page">
                <Navbar />
                <div className="booking-page__not-found">
                    <BackButton />
                    <p>We couldn&rsquo;t find that vehicle. It may have been removed.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="booking-page">
            <Navbar />

            <div className="booking-page__toolbar">
                <BackButton />
            </div>

            <div className="booking-page__content">
                <span className="booking-page__eyebrow">Complete Your Reservation</span>
                <h1 className="booking-page__heading">Confirm Your Booking</h1>

                <BookingCarSummary car={car} />

                <div className="booking-page__layout">
                    <div className="booking-page__form">
                        <BookingDatesPanel
                            pickupDate={pickupDate}
                            returnDate={returnDate}
                            onPickupChange={setPickupDate}
                            onReturnChange={setReturnDate}
                            days={breakdown.days}
                        />
                        <BookingAddOns selectedAddOns={selectedAddOns} onToggle={handleAddOnToggle} />
                        <BookingRenterForm
                            values={renterValues}
                            errors={renterErrors}
                            onChange={handleRenterChange}
                            onIdChange={handleRenterIdChange}
                        />
                        <BookingGuarantorForm
                            values={guarantorValues}
                            errors={guarantorErrors}
                            onChange={handleGuarantorChange}
                            onIdChange={handleGuarantorIdChange}
                        />
                    </div>

                    <div className="booking-page__summary">
                        {submitError && <p className="booking-page__submit-error">{submitError}</p>}
                        <BookingPriceSummary
                            days={breakdown.days}
                            rentalSubtotal={breakdown.rentalSubtotal}
                            addOnsTotal={breakdown.addOnsTotal}
                            serviceFee={breakdown.serviceFee}
                            total={breakdown.total}
                            onConfirm={handleConfirm}
                            isSubmitting={isSubmitting}
                        />
                        <BookingSideImage />
                    </div>
                </div>
            </div>
        </div>
    );
}
