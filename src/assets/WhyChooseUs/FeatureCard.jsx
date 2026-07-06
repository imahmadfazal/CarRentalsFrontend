import "./WhyChooseUs.css";

export default function FeatureCard({ icon, title, description }) {
    return (
        <div className="why-choose-us__card">
            <div className="why-choose-us__icon-wrap">
                {icon}
            </div>
            <h3 className="why-choose-us__card-title">{title}</h3>
            <p className="why-choose-us__card-desc">{description}</p>
            <div className="why-choose-us__card-glow" />
        </div>
    );
}
