import { createContext, useContext, useEffect, useState } from "react";
import staticCollectionsData from "../assets/OurCollection/Collectionsdata";
import api from "../utils/api";

const CarsContext = createContext(null);

function groupByCategory(cars) {
    return cars.reduce((acc, car) => {
        if (!acc[car.category]) acc[car.category] = [];
        acc[car.category].push(car);
        return acc;
    }, {});
}

/**
 * CarsProvider
 * -------------
 * Fleet data now lives in the database (admin can add/edit/remove
 * cars), but the public site used to read a static file synchronously
 * at render time — so this seeds state with that same static data
 * immediately (identical shape, zero loading flicker, zero risk of the
 * site looking broken while the fetch is in flight), then swaps in the
 * live API data once it resolves. If the API call fails for any reason
 * the static fallback just stays in place, so a backend outage can
 * never break the public-facing fleet pages.
 */
export function CarsProvider({ children }) {
    const [carsByCategory, setCarsByCategory] = useState(staticCollectionsData);
    const [allCars, setAllCars] = useState(() => Object.values(staticCollectionsData).flat());
    const [isLive, setIsLive] = useState(false);

    function refetch() {
        return api
            .get("/cars")
            .then(({ data }) => {
                if (Array.isArray(data.cars) && data.cars.length > 0) {
                    setAllCars(data.cars);
                    setCarsByCategory(groupByCategory(data.cars));
                    setIsLive(true);
                }
            })
            .catch(() => {
                // Keep the static fallback already in state.
            });
    }

    useEffect(() => {
        refetch();
    }, []);

    return (
        <CarsContext.Provider value={{ carsByCategory, allCars, isLive, refetch }}>
            {children}
        </CarsContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components -- standard React Context + hook pairing
export function useCars() {
    const context = useContext(CarsContext);
    if (!context) throw new Error("useCars must be used inside CarsProvider");
    return context;
}
