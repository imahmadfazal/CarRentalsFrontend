import { useEffect, useState } from "react";

const STORAGE_KEY = "rideharbor_favorites";

/**
 * useFavorites
 * ------------
 * Shared favorites state, persisted to localStorage under the same key
 * Home.jsx originally used. Any page that needs favorite-toggling
 * (Home, Available Cars results, etc.) can call this instead of each
 * re-implementing its own read/write/toggle logic.
 */
export default function useFavorites() {
    const [favorites, setFavorites] = useState(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    }, [favorites]);

    function toggleFavorite(car) {
        setFavorites((prev) => {
            const exists = prev.find((item) => item.id === car.id);
            if (exists) {
                return prev.filter((item) => item.id !== car.id);
            }
            return [...prev, car];
        });
    }

    return { favorites, toggleFavorite };
}
