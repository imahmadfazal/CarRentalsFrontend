import "./AboutPage.css";

const TEAM_DATA = [
    {
        name: "Arthur Pendelton",
        role: "CEO & Founder",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80",
        bio: "Veteran automotive curator with 15+ years of exotic fleet operations experience across Europe and North America."
    },
    {
        name: "Sarah Jenkins",
        role: "Director of Operations",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
        bio: "Master of premium logistics. Syncs concierge terminals with private jet FBO terminals for zero-wait delivery handovers."
    },
    {
        name: "David Chen",
        role: "Head of Concierge Relations",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80",
        bio: "Coordinates private client accounts and bespoke touring requests, maintaining absolute white-glove communication."
    }
];

export default function AboutTeam() {
    return (
        <div className="about-team anim-team">
            <div className="about-team__header">
                <span className="about-team__eyebrow">Leadership Elite</span>
                <h2 className="about-team__sec-title">Our Directors</h2>
            </div>
            <div className="about-team__grid">
                {TEAM_DATA.map((member, index) => (
                    <div key={index} className="team-card">
                        <div className="team-card__img-wrap">
                            <img src={member.image} alt={member.name} />
                            <div className="team-card__img-overlay" />
                        </div>
                        <div className="team-card__content">
                            <h3 className="team-card__name">{member.name}</h3>
                            <span className="team-card__role">{member.role}</span>
                            <p className="team-card__bio">{member.bio}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
