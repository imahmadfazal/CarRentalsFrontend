import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CollectionCard from "./Collectioncard";
import CategoryTabs from "./Categorytabs";
import { useCars } from "../../context/CarsContext";
import { getCarPerformanceSpecs } from "../CarDetail/Cardetailsdata";
import "./Collections.css";

gsap.registerPlugin(ScrollTrigger);

// Timing constants for tab transitions
const EXIT_DURATION = 800; // ms
const ENTER_DURATION = 1000; // ms
const STAGGER_STEP = 100; // ms
const PAUSE_DURATION = 200; // ms

/**
 * Collections
 * -----------
 * Overhauled "Our Collections" fleet section.
 * - Adds target id="cars" for navbar scroll navigation.
 * - Adds dynamic Search & Sort Control bar (Price, Horsepower).
 * - Adds dynamic Comparison Drawer (up to 3 cars) with side-by-side spec cards.
 */
export default function Collections({ favorites = [], onFavoriteToggle }) {
  const { carsByCategory: collectionsData } = useCars();
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  const [activeCategory, setActiveCategory] = useState("sports");
  const [displayedCategory, setDisplayedCategory] = useState("sports");
  const [phase, setPhase] = useState("idle"); // "idle" | "leaving" | "entering"
  const timeoutRef = useRef(null);

  // Search, Sort, and Comparison states
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [compareList, setCompareList] = useState([]);

  // Filter & Sort cars dynamically
  const filteredCars = useMemo(() => {
    let result = collectionsData[displayedCategory] ?? [];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(car => car.name.toLowerCase().includes(query));
    }

    if (sortBy === "price-asc") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortBy === "power-desc") {
      result = [...result].sort((a, b) => {
        const specA = parseInt(getCarPerformanceSpecs(a.id).horsepower) || 0;
        const specB = parseInt(getCarPerformanceSpecs(b.id).horsepower) || 0;
        return specB - specA;
      });
    }

    return result;
  }, [collectionsData, displayedCategory, searchQuery, sortBy]);

  // GSAP ScrollTrigger reveal on scroll
  useEffect(() => {
    const header = sectionRef.current?.querySelector(".collections__header");
    const grid = gridRef.current;
    if (!grid) return;
    const cards = grid.querySelectorAll(".collections__grid-item");

    const triggers = [];

    // Reveal headers
    if (header) {
      const t1 = gsap.fromTo(
        header.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: header,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
      if (t1.scrollTrigger) triggers.push(t1.scrollTrigger);
    }

    // Reveal cards grid items
    if (cards.length) {
      const t2 = gsap.fromTo(
        cards,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1.8,
          stagger: 0.15,
          ease: "power4.out",
          scrollTrigger: {
            trigger: grid,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
      if (t2.scrollTrigger) triggers.push(t2.scrollTrigger);
    }

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  // Clear timers on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleCategoryChange = useCallback(
    (nextCategory) => {
      if (nextCategory === activeCategory || phase !== "idle") return;

      setActiveCategory(nextCategory);
      setPhase("leaving");

      const leaveCount = filteredCars.length;
      const totalLeaveTime = (leaveCount - 1) * STAGGER_STEP + EXIT_DURATION;

      timeoutRef.current = setTimeout(() => {
        setDisplayedCategory(nextCategory);
        setPhase("entering");

        const nextCarsList = collectionsData[nextCategory] || [];
        const nextQuery = searchQuery.trim().toLowerCase();
        const nextFilteredCount = nextQuery 
          ? nextCarsList.filter(car => car.name.toLowerCase().includes(nextQuery)).length 
          : nextCarsList.length;

        const totalEnterTime =
          (nextFilteredCount - 1) * STAGGER_STEP + ENTER_DURATION;

        timeoutRef.current = setTimeout(() => {
          setPhase("idle");
        }, totalEnterTime);
      }, totalLeaveTime + PAUSE_DURATION);
    },
    [activeCategory, phase, filteredCars, searchQuery, collectionsData]
  );

  const handleToggleCompare = useCallback((car) => {
    setCompareList(prev => {
      const exists = prev.find(item => item.id === car.id);
      if (exists) {
        return prev.filter(item => item.id !== car.id);
      }
      if (prev.length >= 3) {
        alert("You can compare up to 3 vehicles at a time.");
        return prev;
      }
      return [...prev, car];
    });
  }, []);

  const handleClearCompare = useCallback(() => {
    setCompareList([]);
  }, []);

  return (
    <section
      className="collections"
      id="cars"
      ref={sectionRef}
      aria-labelledby="collections-heading"
    >
      <div className="collections__header">
        <span className="collections__eyebrow">Premium Fleet</span>
        <h2 id="collections-heading" className="collections__heading">
          Our Collections
        </h2>
        <p className="collections__subtext">
          Explore our carefully selected luxury vehicles crafted for every
          journey.
        </p>
      </div>

      <CategoryTabs activeCategory={activeCategory} onChange={handleCategoryChange} />

      {/* Filter and Sort Control Panel */}
      <div className="collections__controls">
        <div className="collections__search-wrapper">
          <svg className="collections__search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            className="collections__search-input"
            placeholder="Search by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="collections__search-clear" onClick={() => setSearchQuery("")}>
              &times;
            </button>
          )}
        </div>

        <div className="collections__sort-wrapper">
          <span className="collections__sort-label">Sort By:</span>
          <select
            className="collections__sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="featured">Featured Fleet</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="power-desc">Horsepower: High to Low</option>
          </select>
        </div>
      </div>

      {/* Cards Grid */}
      <div
        ref={gridRef}
        className={`collections__grid collections__grid--${phase}`}
        style={{
          "--exit-duration": `${EXIT_DURATION}ms`,
          "--enter-duration": `${ENTER_DURATION}ms`,
        }}
      >
        {filteredCars.map((car, index) => (
          <div
            key={car.id}
            className="collections__grid-item"
            style={{
              animationDelay:
                phase === "entering"
                  ? `${index * STAGGER_STEP}ms`
                  : phase === "leaving"
                  ? `${(filteredCars.length - 1 - index) * STAGGER_STEP}ms`
                  : "0ms",
            }}
          >
            <CollectionCard
              car={car}
              isVisible={true}
              delay={0}
              isCompared={!!compareList.find(item => item.id === car.id)}
              onCompareToggle={handleToggleCompare}
              isFavorite={!!favorites.find(item => item.id === car.id)}
              onFavoriteToggle={onFavoriteToggle}
            />
          </div>
        ))}
        {filteredCars.length === 0 && (
          <div className="collections__no-results">
            <p>No vehicles match your search criteria.</p>
          </div>
        )}
      </div>

      {/* Floating Side-by-Side Comparison Drawer */}
      <div className={`collections__compare-drawer ${compareList.length > 0 ? "collections__compare-drawer--open" : ""}`}>
        <div className="compare-drawer__inner">
          <div className="compare-drawer__header">
            <div className="compare-drawer__title-wrap">
              <span className="compare-drawer__title">Compare Vehicles</span>
              <span className="compare-drawer__count">{compareList.length} of 3 selected</span>
            </div>
            <div className="compare-drawer__header-actions">
              <button type="button" className="compare-drawer__clear-btn" onClick={handleClearCompare}>
                Clear All
              </button>
              <button type="button" className="compare-drawer__close-btn" onClick={handleClearCompare} aria-label="Close Comparison">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>

          <div className="compare-drawer__table-container">
            <table className="compare-table">
              <thead>
                <tr>
                  <th className="compare-table__label-col">Specs & Features</th>
                  {compareList.map(car => (
                    <th key={car.id} className="compare-table__car-col">
                      <div className="compare-car-card">
                        <button type="button" className="compare-car-card__remove" onClick={() => handleToggleCompare(car)} aria-label="Remove vehicle">
                          &times;
                        </button>
                        <div className="compare-car-card__img-wrap">
                          <img src={car.image} alt={car.name} />
                        </div>
                        <span className="compare-car-card__name">{car.name}</span>
                        <span className="compare-car-card__price">${car.price}/day</span>
                      </div>
                    </th>
                  ))}
                  {Array.from({ length: Math.max(0, 3 - compareList.length) }).map((_, i) => (
                    <th key={`empty-${i}`} className="compare-table__car-col compare-table__car-col--empty">
                      <div className="compare-car-card--empty">
                        <span className="compare-car-card__plus">+</span>
                        <span className="compare-car-card__add-text">Add Car</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="compare-table__label">Horsepower</td>
                  {compareList.map(car => (
                    <td key={car.id}>{getCarPerformanceSpecs(car.id).horsepower}</td>
                  ))}
                  {Array.from({ length: Math.max(0, 3 - compareList.length) }).map((_, i) => (
                    <td key={`empty-hp-${i}`} className="compare-table__empty-cell">-</td>
                  ))}
                </tr>
                <tr>
                  <td className="compare-table__label">Acceleration (0-60)</td>
                  {compareList.map(car => (
                    <td key={car.id}>{getCarPerformanceSpecs(car.id).zeroToSixty}</td>
                  ))}
                  {Array.from({ length: Math.max(0, 3 - compareList.length) }).map((_, i) => (
                    <td key={`empty-acc-${i}`} className="compare-table__empty-cell">-</td>
                  ))}
                </tr>
                <tr>
                  <td className="compare-table__label">Top Speed</td>
                  {compareList.map(car => (
                    <td key={car.id}>{getCarPerformanceSpecs(car.id).topSpeed}</td>
                  ))}
                  {Array.from({ length: Math.max(0, 3 - compareList.length) }).map((_, i) => (
                    <td key={`empty-ts-${i}`} className="compare-table__empty-cell">-</td>
                  ))}
                </tr>
                <tr>
                  <td className="compare-table__label">Transmission</td>
                  {compareList.map(car => (
                    <td key={car.id}>{car.transmission}</td>
                  ))}
                  {Array.from({ length: Math.max(0, 3 - compareList.length) }).map((_, i) => (
                    <td key={`empty-trans-${i}`} className="compare-table__empty-cell">-</td>
                  ))}
                </tr>
                <tr>
                  <td className="compare-table__label">Fuel Type</td>
                  {compareList.map(car => (
                    <td key={car.id}>{car.fuel}</td>
                  ))}
                  {Array.from({ length: Math.max(0, 3 - compareList.length) }).map((_, i) => (
                    <td key={`empty-fuel-${i}`} className="compare-table__empty-cell">-</td>
                  ))}
                </tr>
                <tr>
                  <td className="compare-table__label">Seats</td>
                  {compareList.map(car => (
                    <td key={car.id}>{car.seats} Seats</td>
                  ))}
                  {Array.from({ length: Math.max(0, 3 - compareList.length) }).map((_, i) => (
                    <td key={`empty-seats-${i}`} className="compare-table__empty-cell">-</td>
                  ))}
                </tr>
                <tr>
                  <td className="compare-table__label">Action</td>
                  {compareList.map(car => (
                    <td key={car.id}>
                      <a href={`/car/${car.id}`} className="compare-table__book-btn">
                        Book Vehicle
                      </a>
                    </td>
                  ))}
                  {Array.from({ length: Math.max(0, 3 - compareList.length) }).map((_, i) => (
                    <td key={`empty-act-${i}`} className="compare-table__empty-cell">-</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}