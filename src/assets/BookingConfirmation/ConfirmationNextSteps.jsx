import "./ConfirmationNextSteps.css";

const STEPS = [
    {
        title: "Check Your Email",
        description: "A confirmation with your full itinerary and reference number has been prepared for your records.",
    },
    {
        title: "Prepare Your Documents",
        description: "Bring a valid driver's license and the card used for the security deposit hold at pickup.",
    },
    {
        title: "Arrive at Pickup",
        description: "Meet your RideHarbor concierge at the scheduled location and time — your vehicle will be ready and detailed.",
    },
];

/**
 * ConfirmationNextSteps
 * -----------------------
 * Numbered "what happens next" list, visually echoing the node-style
 * steps used in the homepage's HowItWorks section.
 */
export default function ConfirmationNextSteps() {
    return (
        <section className="confirmation-next-steps">
            <h3 className="confirmation-next-steps__title">What Happens Next</h3>
            <ol className="confirmation-next-steps__list">
                {STEPS.map((step, index) => (
                    <li key={step.title} className="confirmation-next-step">
                        <span className="confirmation-next-step__num">{index + 1}</span>
                        <div className="confirmation-next-step__content">
                            <h4 className="confirmation-next-step__title">{step.title}</h4>
                            <p className="confirmation-next-step__desc">{step.description}</p>
                        </div>
                    </li>
                ))}
            </ol>
        </section>
    );
}
