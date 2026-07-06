import "./HowItWorks.css";

export default function StepItem({ number, title, description, stepClass }) {
    return (
        <div className={`how-it-works__item ${stepClass}`}>
            <div className="how-it-works__node-wrap">
                <div className="how-it-works__node">
                    <span className="how-it-works__node-num">{number}</span>
                </div>
            </div>
            <div className="how-it-works__content">
                <h3 className="how-it-works__item-title">{title}</h3>
                <p className="how-it-works__item-desc">{description}</p>
            </div>
        </div>
    );
}
