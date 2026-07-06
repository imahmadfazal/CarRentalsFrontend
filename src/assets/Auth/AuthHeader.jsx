import "./AuthLayout.css";

/**
 * AuthHeader
 * ----------
 * Centered eyebrow + heading + description at the top of the auth
 * card. Content is prop-driven since SignIn and SignUp share the same
 * layout but different copy.
 */
export default function AuthHeader({ eyebrow, title, subtext }) {
    return (
        <div className="auth-header">
            <span className="auth-header__eyebrow">{eyebrow}</span>
            <h1 className="auth-header__title">{title}</h1>
            <p className="auth-header__subtext">{subtext}</p>
        </div>
    );
}
