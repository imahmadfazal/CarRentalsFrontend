import { useTheme } from "../context/ThemeContext";
import "../styles/themeSwitcher.css";

/**
 * Inline monoline icons, matching the stroke-based icon style already
 * used across the site (CollectionCard's heart/compare icons, etc.)
 * rather than emoji.
 */
const ICONS = {
    dark: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
    ),
    light: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
    ),
    teal: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 2.69s6 6.45 6 10.31a6 6 0 0 1-12 0c0-3.86 6-10.31 6-10.31z" />
        </svg>
    ),
};

const THEME_META = [
    { id: "dark", label: "Dark" },
    { id: "light", label: "Light" },
    { id: "teal", label: "Ocean" },
];

/**
 * ThemeSwitcher
 * -------------
 * Floating glass pill, fixed to the bottom-right corner on every page.
 * Click cycles dark → light → teal → dark; hovering (or focusing, for
 * keyboard users) reveals all three as a small popup menu above it.
 */
export default function ThemeSwitcher() {
    const { theme, cycleTheme, setThemeDirect } = useTheme();
    const current = THEME_META.find((t) => t.id === theme) ?? THEME_META[0];

    return (
        <div className="theme-switcher">
            <div className="theme-switcher__menu" role="menu" aria-label="Choose theme">
                {THEME_META.map((t) => (
                    <button
                        key={t.id}
                        type="button"
                        role="menuitemradio"
                        aria-checked={t.id === theme}
                        className={`theme-switcher__option ${t.id === theme ? "theme-switcher__option--active" : ""}`}
                        onClick={() => setThemeDirect(t.id)}
                    >
                        <span className="theme-switcher__option-icon">{ICONS[t.id]}</span>
                        {t.label}
                    </button>
                ))}
            </div>

            <button
                type="button"
                className="theme-switcher__trigger"
                onClick={cycleTheme}
                aria-label={`Theme: ${current.label}. Click to switch.`}
            >
                <span className="theme-switcher__trigger-icon">{ICONS[current.id]}</span>
                <span className="theme-switcher__trigger-label">{current.label}</span>
            </button>
        </div>
    );
}
