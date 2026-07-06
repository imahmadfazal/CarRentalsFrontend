import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import Navbar from "../homeherosec/Navbar";
import "./Servicepage.css";

const SERVICES_DATA = [
    {
        id: "chauffeur",
        eyebrow: "Elite Travel",
        title: "VIP Chauffeur Drive",
        tag: "Bilingual Drivers",
        desc: "Travel with ultimate peace of mind. Our team of professionally trained, bilingual, and background-checked chauffeurs ensures seamless transit for corporate meetings, red carpets, or private leisure itineraries.",
        image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1200&q=80",
        price: "From $120 / trip",
        perks: [
            { name: "Refreshments & Wi-Fi", detail: "Chilled mineral water & premium internet console" },
            { name: "Bilingual Escorts", detail: "Certified professional drivers fluent in English/Local languages" },
            { name: "Flight & Delay Syncing", detail: "Automatic itinerary adjustments for incoming private/comms flights" },
            { name: "White Glove Assistance", detail: "Door-to-door luggage handling and VIP protocol escort" }
        ],
        faqs: [
            { q: "How are the drivers vetted?", a: "All chauffeurs undergo extensive background checks, defensive driving certifications, and professional corporate etiquette training." },
            { q: "Can we request a driver for multiple days?", a: "Yes, we offer daily and weekly flat-rate chauffeur booking options for absolute flexibility." }
        ]
    },
    {
        id: "airport",
        eyebrow: "Global Transit",
        title: "Airport Meet & Greet",
        tag: "Concierge Escort",
        desc: "Skip the queues and travel stress-free. Our airport meet & greet transfers offer direct gate-to-terminal pickups, runway luggage clearance assistance, and private chauffeur connections immediately upon landing.",
        image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80",
        price: "From $85 / transfer",
        perks: [
            { name: "Terminal Gate Greeting", detail: "Personal concierge holding your dynamic digital nameplate" },
            { name: "60-Min Wait Window", detail: "Complimentary landing waiting window matching customs delays" },
            { name: "Fast Track Escort", detail: "VIP terminal bypass assistance through luggage and customs queues" },
            { name: "Pre-chilled Sedans", detail: "Vehicle pre-started with customizable HVAC setup waiting at pickup" }
        ],
        faqs: [
            { q: "What happens if my flight is delayed?", a: "We sync directly with flight status radars. Your chauffeur will automatically arrive according to your actual landing time." },
            { q: "Is runway transfer available?", a: "Runway tarmac pickups require private terminal permissions, which can be coordinated upon early inquiry." }
        ]
    },
    {
        id: "wedding",
        eyebrow: "Milestone Occasions",
        title: "Exotic Event Fleet",
        tag: "Custom Decor",
        desc: "Make a grand entrance on your special day. Choose from a selection of the world's most premium classic roadsters, vintage convertibles, and elite supercars decorated precisely for weddings, high-fashion shoots, and galas.",
        image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
        price: "Custom Leasing Rates",
        perks: [
            { name: "Themed Floral Decor", detail: "Coordination ribbon and premium floral decoration packages" },
            { name: "Media Shooting Permit", detail: "Full photographic and cinematic use permissions on set" },
            { name: "Backup Standby Support", detail: "Dedicated support vehicle standby nearby for peace of mind" },
            { name: "Multi-Car Discount", detail: "Package pricing for groom, bride, and guests coordination" }
        ],
        faqs: [
            { q: "Do wedding rentals include a chauffeur?", a: "Yes, we can provide professional event chauffeurs, or coordinate self-drive permissions for the couple." },
            { q: "How far in advance should we book?", a: "Exotic event bookings are recommended 2–3 months in advance to secure specific models." }
        ]
    },
    {
        id: "track",
        eyebrow: "Track & Open Road",
        title: "Self-Drive Supercar Lease",
        tag: "Adrenaline Experience",
        desc: "Unleash the ultimate adrenaline rush. Take the driver's seat of our top-tier supercars including Lamborghini, Ferrari, and Porsche for professional track days, weekend road tours, or short-term performance leases.",
        image: "https://images.unsplash.com/photo-1503376712351-1f2ddf64ea37?auto=format&fit=crop&w=1200&q=80",
        price: "From $299 / day",
        perks: [
            { name: "Track Instructors", detail: "Briefing session on chassis control, power management, and braking" },
            { name: "Full Liability Cover", detail: "Comprehensive track-specific insurance options with low excess limit" },
            { name: "Pre-mapped Itineraries", detail: "Curated scenic routes with turn-by-turn navigation guides" },
            { name: "GoPro Recording Rig", detail: "Dual camera interior and track-view footage capture rigs" }
        ],
        faqs: [
            { q: "What are the age requirements?", a: "For self-drive supercars, drivers must be at least 25 years old and hold a clean driving license for 3+ years." },
            { q: "Is a security deposit required?", a: "Yes, a security deposit pre-authorization is placed on your credit card at key handover." }
        ]
    },
    {
        id: "tours",
        eyebrow: "Grand Touring",
        title: "Scenic Cross-Border Tours",
        tag: "Convoy Support",
        desc: "Embark on an unforgettable grand touring journey. Travel across scenic borders and states in premium luxury convoy setups with custom itineraries, gourmet dinner arrangements, and professional support escorts.",
        image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80",
        price: "From $450 / day",
        perks: [
            { name: "VIP Hotel Reservations", detail: "Five-star hotel bookings and parking spaces pre-secured" },
            { name: "24/7 Convoy Support", detail: "Support vehicles equipped with tools, medical aids, and spare cars" },
            { name: "Clearance & Toll Passes", detail: "All border crossing approvals and electronic toll passes pre-loaded" },
            { name: "Gourmet Route Dinners", detail: "Pre-arranged lunch and dinner reservations at elite local diners" }
        ],
        faqs: [
            { q: "Are custom itineraries possible?", a: "Yes! For private groups, our team can design bespoke routes to match your group's preferences." },
            { q: "Do you supply the cars for the tour?", a: "You can rent from our specialized touring fleet, or participate with your own approved vehicle." }
        ]
    }
];

export default function ServicePage() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [activeFaq, setActiveFaq] = useState(null);

    const activeService = SERVICES_DATA[activeIndex];

    const cardsContainerRef = useRef(null);
    const detailPanelRef = useRef(null);
    const headerRef = useRef(null);

    // 1. Entrance Stagger Reveal
    useEffect(() => {
        window.scrollTo(0, 0);

        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (prefersReducedMotion) return;

        const tl = gsap.timeline();

        // Reveal header title
        tl.fromTo(
            headerRef.current.children,
            { opacity: 0, y: -20 },
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" }
        );

        // Stagger left service cards
        tl.fromTo(
            ".service-tab-card",
            { opacity: 0, x: -30 },
            { opacity: 1, x: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" },
            "-=0.4"
        );

        // Slide-up right details panel
        tl.fromTo(
            detailPanelRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
            "-=0.6"
        );
    }, []);

    // 2. Active Tab Switch GSAP Animation
    const handleTabChange = (index) => {
        if (index === activeIndex) return;

        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (prefersReducedMotion) {
            setActiveIndex(index);
            setActiveFaq(null);
            return;
        }

        const panel = detailPanelRef.current;
        const children = panel.querySelectorAll(".anim-target");

        // Timeline to fade/slide out active, swap index, then fade/slide back in
        const tl = gsap.timeline();

        tl.to(children, {
            opacity: 0,
            y: -15,
            duration: 0.35,
            stagger: 0.05,
            ease: "power2.in",
            onComplete: () => {
                setActiveIndex(index);
                setActiveFaq(null);
            }
        });

        tl.fromTo(children,
            { opacity: 0, y: 15 },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.06,
                ease: "power3.out"
            }
        );
    };

    return (
        <div className="services-page">
            <Navbar />

            {/* Header intro */}
            <div className="services-page__header" ref={headerRef}>
                <span className="services-page__eyebrow">Exclusive Concierge</span>
                <h1 className="services-page__title">Elite Services</h1>
                <p className="services-page__subtext">
                    Immersive luxury experiences tailored to exceed the expectations of our VIP clients.
                </p>
            </div>

            {/* Dashboard Layout */}
            <div className="services-page__layout">
                {/* Left Side: Services Tab Cards */}
                <div className="services-page__left" ref={cardsContainerRef}>
                    {SERVICES_DATA.map((service, index) => {
                        const isActive = index === activeIndex;
                        return (
                            <button
                                key={service.id}
                                type="button"
                                className={`service-tab-card ${isActive ? "service-tab-card--active" : ""}`}
                                onClick={() => handleTabChange(index)}
                            >
                                <div className="service-tab-card__visual" style={{ backgroundImage: `url(${service.image})` }}>
                                    <div className="service-tab-card__overlay" />
                                </div>
                                <div className="service-tab-card__content">
                                    <span className="service-tab-card__eyebrow">{service.eyebrow}</span>
                                    <h3 className="service-tab-card__title">{service.title}</h3>
                                    <span className="service-tab-card__tag">{service.tag}</span>
                                </div>
                                <div className="service-tab-card__border-glow" />
                            </button>
                        );
                    })}
                </div>

                {/* Right Side: Active Service Detail Panel */}
                <div className="services-page__right-panel" ref={detailPanelRef}>
                    <div className="service-detail-card">
                        {/* Service Hero Image */}
                        <div className="service-detail-card__hero anim-target">
                            <img src={activeService.image} alt={activeService.title} />
                            <div className="service-detail-card__gradient" />
                            <span className="service-detail-card__price-badge">{activeService.price}</span>
                        </div>

                        {/* Title and descriptions */}
                        <div className="service-detail-card__body">
                            <span className="service-detail-card__eyebrow anim-target">{activeService.eyebrow}</span>
                            <h2 className="service-detail-card__title anim-target">{activeService.title}</h2>
                            <p className="service-detail-card__desc anim-target">{activeService.desc}</p>

                            {/* What's Included Perks grid */}
                            <div className="service-detail-card__section anim-target">
                                <h4 className="service-detail-card__sec-title">What&rsquo;s Included</h4>
                                <div className="perks-grid">
                                    {activeService.perks.map((perk, i) => (
                                        <div key={i} className="perk-item">
                                            <div className="perk-item__icon-wrap">
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="perk-item__icon">
                                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                                    <polyline points="22 4 12 14.01 9 11.01" />
                                                </svg>
                                            </div>
                                            <div className="perk-item__content">
                                                <span className="perk-item__name">{perk.name}</span>
                                                <span className="perk-item__detail">{perk.detail}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Service FAQs Accordion */}
                            <div className="service-detail-card__section anim-target">
                                <h4 className="service-detail-card__sec-title">Service FAQ</h4>
                                <div className="service-faqs">
                                    {activeService.faqs.map((faq, i) => {
                                        const isFaqOpen = activeFaq === i;
                                        return (
                                            <div key={i} className={`service-faq-item ${isFaqOpen ? "service-faq-item--open" : ""}`}>
                                                <button
                                                    type="button"
                                                    className="service-faq-item__header"
                                                    onClick={() => setActiveFaq(isFaqOpen ? null : i)}
                                                >
                                                    <span>{faq.q}</span>
                                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="service-faq-item__chevron">
                                                        <polyline points="6 9 12 15 18 9" />
                                                    </svg>
                                                </button>
                                                <div className="service-faq-item__content-wrap">
                                                    <div className="service-faq-item__content">
                                                        <p>{faq.a}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Action CTA Book */}
                            <div className="service-detail-card__actions anim-target">
                                <a href="/#book" className="service-detail-card__cta">
                                    Inquire & Book Service
                                </a>
                                <p className="service-detail-card__notice">
                                    *Inquiries are processed within 15 minutes by our 24/7 VIP desk coordinators.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
