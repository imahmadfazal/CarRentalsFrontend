import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(null);

const THEMES = ["dark", "light", "teal"];
const STORAGE_KEY = "rideharbor-theme";

/**
 * ThemeProvider
 * -------------
 * Owns the active theme, mirrors it onto <html data-theme="..."> so
 * every CSS custom property in src/styles/themes.css resolves
 * correctly, and persists the choice to localStorage so it survives a
 * refresh. "dark" (no attribute needed, since :root already is dark)
 * is the default for first-time visitors.
 */
export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return THEMES.includes(saved) ? saved : "dark";
    });

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem(STORAGE_KEY, theme);
    }, [theme]);

    function cycleTheme() {
        setTheme((current) => {
            const index = THEMES.indexOf(current);
            return THEMES[(index + 1) % THEMES.length];
        });
    }

    function setThemeDirect(name) {
        if (THEMES.includes(name)) setTheme(name);
    }

    return (
        <ThemeContext.Provider value={{ theme, cycleTheme, setThemeDirect, THEMES }}>
            {children}
        </ThemeContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components -- standard React Context + hook pairing
export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) throw new Error("useTheme must be used inside ThemeProvider");
    return context;
}
