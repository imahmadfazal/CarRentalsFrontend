import "./HarborClub.css";

export default function ClubBenefit({ title, description, icon }) {
    return (
        <div className="club-benefit-item">
            <div className="club-benefit-item__icon-wrap">
                {icon}
            </div>
            <div className="club-benefit-item__content">
                <h4 className="club-benefit-item__title">{title}</h4>
                <p className="club-benefit-item__desc">{description}</p>
            </div>
        </div>
    );
}
