import "./AboutPage.css";

const VALUES_DATA = [
    {
        title: "Absolute Authenticity",
        desc: "We own 100% of our fleet. Unlike peer-to-peer aggregators, what you book is exactly the car delivered—fully inspected, detailed, and certified.",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
        )
    },
    {
        title: "Precision Logistics",
        desc: "Coordination mapped down to the minute. Our concierge staff syncs with private tarmac entries and flight radars to secure zero wait delays.",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
        )
    },
    {
        title: "Rate Transparency",
        desc: "No cleaning surcharges, zero security pre-auth surprise fees, and all-inclusive full damage waivers clearly detailed before booking.",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
        )
    },
    {
        title: "Showroom Detailing",
        desc: "Vehicles undergo a meticulous 32-point cosmetic and mechanical inspection checklist in our state-of-the-art service bays before key handovers.",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
        )
    }
];

export default function AboutValues() {
    return (
        <div className="about-values anim-vals">
            <div className="about-values__header">
                <span className="about-values__eyebrow">Our Philosophy</span>
                <h2 className="about-values__sec-title">Core Pillars</h2>
            </div>
            <div className="about-values__grid">
                {VALUES_DATA.map((val, index) => (
                    <div key={index} className="value-card">
                        <div className="value-card__icon-wrap">
                            {val.icon}
                        </div>
                        <h3 className="value-card__title">{val.title}</h3>
                        <p className="value-card__desc">{val.desc}</p>
                        <div className="value-card__border-glow" />
                    </div>
                ))}
            </div>
        </div>
    );
}
