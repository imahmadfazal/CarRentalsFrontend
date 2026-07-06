import "./Testimonials.css";

export default function TestimonialCard({ quote, author, role, rating }) {
    return (
        <div className="testimonial-card">
            {/* Stars row */}
            <div className="testimonial-card__rating">
                {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                        key={i}
                        className={`testimonial-card__star ${i < rating ? "testimonial-card__star--active" : ""}`}
                        viewBox="0 0 24 24"
                        fill={i < rating ? "currentColor" : "none"}
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                ))}
            </div>

            {/* Testimonial Quote */}
            <p className="testimonial-card__quote">&ldquo;{quote}&rdquo;</p>

            {/* Client Profile details */}
            <div className="testimonial-card__author-info">
                <span className="testimonial-card__name">{author}</span>
                <span className="testimonial-card__role">{role}</span>
            </div>

            {/* Subtle card decorations */}
            <div className="testimonial-card__quote-mark" aria-hidden="true">&rdquo;</div>
        </div>
    );
}
