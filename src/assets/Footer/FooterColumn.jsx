import "./Footer.css";

export default function FooterColumn({ title, links }) {
    return (
        <div className="footer__column">
            <h4 className="footer__column-title">{title}</h4>
            <ul className="footer__column-links">
                {links.map((link, index) => (
                    <li key={index}>
                        <a href={link.href} className="footer__link">
                            {link.label}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}
