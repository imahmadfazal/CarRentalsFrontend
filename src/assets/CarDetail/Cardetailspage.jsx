import { useState, useMemo, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../homeherosec/Navbar";
import BackButton from "./Backbutton";
import MediaDisplay from "./Mediadisplay";
import MediaThumbnailRail from "./Mediathumbnailrail";
import CollectionCard from "../OurCollection/Collectioncard";
import { useCars } from "../../context/CarsContext";
import { getCarMedia, getCarPerformanceSpecs } from "./Cardetailsdata";
import { useAuth } from "../../context/AuthContext";
import "./Cardetailspage.css";

gsap.registerPlugin(ScrollTrigger);

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
 * CarDetailsPage
 * ---------------
 * Redesigned as a modern, interactive dashboard.
 * - Left side: Media section with main display & vertical thumbnail rail.
 * - Right side: Glassmorphic panel displaying name, tags, description, 
 *   performance spec grid, dynamic amenities, accordion FAQ policies, and premium booking options.
 * - Bottom: Similar fleet recommendations grid with hover visual effects.
 * - Entrance Animation: Powered by GSAP staggered reveals + ScrollTrigger.
 */
export default function CarDetailsPage() {
    const { carId } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { carsByCategory: collectionsData } = useCars();
    const [activeIndex, setActiveIndex] = useState(0);
    const [activeAccordion, setActiveAccordion] = useState(null);
    const [pickupDate, setPickupDate] = useState(() => toDateInputValue(new Date()));
    const [returnDate, setReturnDate] = useState(() => toDateInputValue(addDays(new Date(), 4)));

    const containerRef = useRef(null);
    const detailsRef = useRef(null);

    const car = useMemo(() => {
        const allCars = Object.values(collectionsData).flat();
        return allCars.find((c) => c.id === carId) ?? null;
    }, [carId, collectionsData]);

    const media = useMemo(() => getCarMedia(car), [car]);
    const activeMedia = media[activeIndex] ?? media[0] ?? null;
    const perfSpecs = useMemo(() => getCarPerformanceSpecs(carId), [carId]);

    const similarCars = useMemo(() => {
        if (!car) return [];
        const categoryList = collectionsData[car.category] || [];
        return categoryList.filter((c) => c.id !== carId).slice(0, 3);
    }, [car, carId, collectionsData]);

    // availableUnits comes from the API (quantity minus currently
    // confirmed, not-yet-returned bookings) and isn't present on the
    // static fallback data, so fall back to the full quantity.
    const unitsLeft = car ? (car.availableUnits ?? car.quantity ?? 1) : 1;

    const amenities = useMemo(() => {
        if (!car) return [];
        if (car.category === "sports") {
            return [
                { name: "Active Exhaust", desc: "Adjustable rumble" },
                { name: "Carbon Fiber Trim", desc: "Ultralight console" },
                { name: "Launch Control", desc: "Perfect drag starts" },
                { name: "Bose Surround", desc: "High-fidelity audio" }
            ];
        } else if (car.category === "luxury") {
            return [
                { name: "Soft-Close Doors", desc: "Silent lock tech" },
                { name: "Nappa Leather", desc: "Premium heated seats" },
                { name: "Acoustic Glass", desc: "Whisper-quiet cabin" },
                { name: "Ambient Lighting", desc: "Custom color scheme" }
            ];
        } else {
            return [
                { name: "Terrain Select", desc: "All-road adaptability" },
                { name: "Panoramic Roof", desc: "Scenic wide views" },
                { name: "3D Camera System", desc: "360-degree assist" },
                { name: "Heated Steering", desc: "All-weather comfort" }
            ];
        }
    }, [car]);

    function handleSelectMedia(index) {
        setActiveIndex(index);
    }

    const toggleAccordion = (index) => {
        setActiveAccordion(activeAccordion === index ? null : index);
    };

    function handleReserve() {
        if (!user) {
            navigate("/signin", {
                state: {
                    from: `/booking/${carId}`,
                    bookingState: { pickupDate, returnDate },
                    authMessage: "Sign in to reserve this vehicle.",
                },
            });
            return;
        }
        navigate(`/booking/${carId}`, { state: { pickupDate, returnDate } });
    }

    const faqItems = [
        {
            title: "Rental Requirements",
            content: "A valid driver's license and a minimum age of 25 is required for all vehicles. Select high-performance sports cars may require a security deposit pre-authorization holding of $2,500 at pickup."
        },
        {
            title: "Insurance Protection & Deductibles",
            content: "Comprehensive collision damage protection is standard. A $1,500 deductible security authorize hold is placed on your card at pickup and fully released upon safe return."
        },
        {
            title: "Fuel & Mileage Policy",
            content: "We supply vehicles with a full tank of premium fuel. Please return the vehicle with a full tank. Local rentals enjoy unlimited mileage, while interstate travel is capped at 250 miles/day."
        }
    ];

    // Reset media active thumbnail, accordion state, and scroll position when vehicle changes
    useEffect(() => {
        window.scrollTo(0, 0);
        setActiveIndex(0);
        setActiveAccordion(null);
    }, [carId]);

    // GSAP Entrance & ScrollTrigger Animations
    useEffect(() => {
        if (!car) return;

        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (prefersReducedMotion) return;

        const tl = gsap.timeline();

        // 1. Toolbar and media section slide/fade up
        tl.fromTo(
            ".car-details-page__toolbar",
            { opacity: 0, y: -20 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
        );

        tl.fromTo(
            ".car-details-page__media",
            { opacity: 0, x: -30 },
            { opacity: 1, x: 0, duration: 1, ease: "power3.out" },
            "-=0.5"
        );

        // 2. Header details section slides in
        tl.fromTo(
            ".car-details-page__header",
            { opacity: 0, x: 30 },
            { opacity: 1, x: 0, duration: 1, ease: "power3.out" },
            "-=0.8"
        );

        // 3. Staggered reveal of header elements
        tl.fromTo(
            [
                ".car-details-panel__eyebrow",
                ".car-details-panel__name",
                ".car-details-panel__badge",
                ".car-details-panel__desc"
            ],
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" },
            "-=0.5"
        );

        // 4. Staggered reveal of specs grid cards
        tl.fromTo(
            ".spec-card",
            { opacity: 0, scale: 0.9, y: 15 },
            { opacity: 1, scale: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "back.out(1.2)" },
            "-=0.3"
        );

        // 5. Staggered reveal of amenities
        tl.fromTo(
            ".amenity-pill",
            { opacity: 0, scale: 0.8, y: 10 },
            { opacity: 1, scale: 1, y: 0, duration: 0.4, stagger: 0.06, ease: "power2.out" },
            "-=0.3"
        );

        // 6. Booking card & Accordion reveal
        tl.fromTo(
            [
                ".booking-card",
                ".faq-accordion"
            ],
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: "power3.out" },
            "-=0.3"
        );

        // 7. ScrollTrigger for Similar Vehicles row
        const similarSection = document.querySelector(".car-details-page__similar");
        let similarST = null;
        if (similarSection) {
            similarST = ScrollTrigger.create({
                trigger: similarSection,
                start: "top 82%",
                onEnter: () => {
                    gsap.fromTo(
                        similarSection.querySelector(".similar-title"),
                        { opacity: 0, y: 25 },
                        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
                    );
                    gsap.fromTo(
                        similarSection.querySelectorAll(".similar-grid__item"),
                        { opacity: 0, y: 40 },
                        { opacity: 1, y: 0, duration: 1.1, stagger: 0.15, ease: "power4.out" }
                    );
                },
                once: true
            });
        }

        return () => {
            tl.kill();
            if (similarST) similarST.kill();
        };
    }, [car, carId]);

    if (!car) {
        return (
            <div className="car-details-page">
            <Navbar />
            <div className="car-details-page__not-found">
                <BackButton />
                <p>We couldn&rsquo;t find that car. It may have been removed.</p>
            </div>
            </div>
        );
    }

    return (
        <div className="car-details-page" ref={containerRef}>
            <Navbar />

            <div className="car-details-page__toolbar">
                <BackButton />
            </div>

            <div className="car-details-page__layout">
                {/* 1. Media Section */}
                <div className="car-details-page__media">
                    <MediaDisplay activeMedia={activeMedia} />
                    <MediaThumbnailRail
                        media={media}
                        activeIndex={activeIndex}
                        onSelect={handleSelectMedia}
                    />
                </div>

                {/* 2. Header Section */}
                <div className="car-details-page__header" ref={detailsRef}>
                    <div className="car-details-panel">
                        <span className="car-details-panel__eyebrow">{car.category} class</span>
                        <h1 className="car-details-panel__name">{car.name}</h1>
                        <span className="car-details-panel__badge">{car.badge}</span>
                        <p className="car-details-panel__desc">{car.description}</p>
                    </div>
                </div>

                {/* 3. Specs Section */}
                <div className="car-details-page__specs">
                    <div className="car-details-panel__specs-grid">
                        <div className="spec-card">
                            <span className="spec-card__label">Power</span>
                            <span className="spec-card__value">{perfSpecs.horsepower}</span>
                        </div>
                        <div className="spec-card">
                            <span className="spec-card__label">0-60 mph</span>
                            <span className="spec-card__value">{perfSpecs.zeroToSixty}</span>
                        </div>
                        <div className="spec-card">
                            <span className="spec-card__label">Top Speed</span>
                            <span className="spec-card__value">{perfSpecs.topSpeed}</span>
                        </div>
                        <div className="spec-card">
                            <span className="spec-card__label">Highlight</span>
                            <span className="spec-card__value">{perfSpecs.highlight}</span>
                        </div>
                    </div>
                </div>

                {/* 4. Amenities Section */}
                <div className="car-details-page__amenities">
                    <div className="car-details-panel__amenities">
                        <h3 className="amenities-title">Premium Features</h3>
                        <div className="amenities-list">
                            {amenities.map((amenity, index) => (
                                <div key={index} className="amenity-pill">
                                    <svg className="amenity-pill__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                        <polyline points="22 4 12 14.01 9 11.01" />
                                    </svg>
                                    <div className="amenity-pill__text">
                                        <span className="amenity-pill__name">{amenity.name}</span>
                                        <span className="amenity-pill__desc">{amenity.desc}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 5. Booking Section */}
                <div className="car-details-page__booking">
                    <div className="booking-card">
                        <div className="booking-card__price">
                            <span className="booking-card__price-label">Rental Rate</span>
                            <span className="booking-card__price-val">
                                ${car.price}<span className="booking-card__price-unit">/day</span>
                            </span>
                        </div>
                        {unitsLeft <= 0 ? (
                            <p className="booking-card__quantity booking-card__quantity--booked">All Units Booked</p>
                        ) : car.quantity > 1 ? (
                            <p className="booking-card__quantity">{unitsLeft} of {car.quantity} available</p>
                        ) : null}

                        <div className="booking-card__inputs">
                            <div className="booking-input-group">
                                <label className="booking-input-group__label">Pickup Date</label>
                                <input
                                    type="date"
                                    className="booking-input-group__field"
                                    value={pickupDate}
                                    min={toDateInputValue(new Date())}
                                    onChange={(e) => setPickupDate(e.target.value)}
                                />
                            </div>
                            <div className="booking-input-group">
                                <label className="booking-input-group__label">Return Date</label>
                                <input
                                    type="date"
                                    className="booking-input-group__field"
                                    value={returnDate}
                                    min={pickupDate}
                                    onChange={(e) => setReturnDate(e.target.value)}
                                />
                            </div>
                        </div>

                        <button className="booking-card__cta" type="button" onClick={handleReserve}>
                            Reserve This Vehicle
                        </button>

                        <ul className="booking-card__benefits">
                            <li>
                                <svg viewBox="0 0 16 16" fill="currentColor">
                                    <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                                </svg>
                                Premium roadside assistance included
                            </li>
                            <li>
                                <svg viewBox="0 0 16 16" fill="currentColor">
                                    <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                                </svg>
                                Free cancellation up to 24h prior
                            </li>
                        </ul>
                    </div>
                </div>

                {/* 6. FAQ Section */}
                <div className="car-details-page__faq">
                    <div className="faq-accordion">
                        <h3 className="faq-accordion__title">Rental Policies & FAQ</h3>
                        {faqItems.map((faq, index) => {
                            const isOpen = activeAccordion === index;
                            return (
                                <div key={index} className={`faq-item ${isOpen ? "faq-item--open" : ""}`}>
                                    <button 
                                        type="button" 
                                        className="faq-item__header"
                                        onClick={() => toggleAccordion(index)}
                                        aria-expanded={isOpen}
                                    >
                                        <span>{faq.title}</span>
                                        <svg className="faq-item__chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <polyline points="6 9 12 15 18 9" />
                                        </svg>
                                    </button>
                                    <div className="faq-item__content-wrap">
                                        <div className="faq-item__content">
                                            <p>{faq.content}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Similar fleet grid */}
            {similarCars.length > 0 && (
                <section className="car-details-page__similar">
                    <h2 className="similar-title">Similar Vehicles</h2>
                    <div className="similar-grid">
                        {similarCars.map((similarCar) => (
                            <div key={similarCar.id} className="similar-grid__item">
                                <CollectionCard car={similarCar} isVisible={true} />
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}