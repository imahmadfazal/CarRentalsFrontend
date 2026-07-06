import "./Categorytabs.css";

/**
 * CategoryTabs
 * ------------
 * Three pill-shaped category buttons (Sports Cars / Luxury Cars /
 * SUVs). Purely controlled — `activeCategory` and `onChange` are owned
 * by the parent (Collections.jsx), which also drives the slide
 * animation when the selection changes.
 */
const CATEGORIES = [
    { key: "sports", label: "Sports Cars" },
    { key: "luxury", label: "Luxury Cars" },
    { key: "suv", label: "SUVs" },
];

export default function CategoryTabs({ activeCategory, onChange }) {
    return (
        <div className="category-tabs" role="tablist" aria-label="Vehicle category">
            {CATEGORIES.map((cat) => {
                const isActive = cat.key === activeCategory;
                return (
                    <button
                        key={cat.key}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        className={`category-tabs__btn ${isActive ? "category-tabs__btn--active" : ""}`}
                        onClick={() => onChange(cat.key)}
                    >
                        {cat.label}
                    </button>
                );
            })}
        </div>
    );
}