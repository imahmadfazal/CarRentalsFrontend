import CollectionCard from "../OurCollection/Collectioncard";
import EmptyResults from "./EmptyResults";
import "./ResultsGrid.css";

/**
 * ResultsGrid
 * -----------
 * Renders the matched cars using the existing CollectionCard (no new
 * card markup needed — favorites/compare behavior stays identical to
 * the homepage). Falls back to EmptyResults when nothing matches.
 */
export default function ResultsGrid({ cars, favorites, onFavoriteToggle }) {
    if (cars.length === 0) {
        return (
            <div className="results-grid">
                <EmptyResults />
            </div>
        );
    }

    return (
        <div className="results-grid">
            {cars.map((car) => (
                <div key={car.id} className="results-grid__item">
                    <CollectionCard
                        car={car}
                        isVisible={true}
                        isFavorite={!!favorites.find((item) => item.id === car.id)}
                        onFavoriteToggle={onFavoriteToggle}
                    />
                </div>
            ))}
        </div>
    );
}
