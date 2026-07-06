import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./Mediathumbnailrail.css";

/**
 * MediaThumbnailRail
 * -------------------
 * Vertical rail of clickable thumbnails: the video entry first
 * (always media[0], per carDetailsData.js's getCarMedia helper),
 * then each image. Clicking an item calls onSelect with that item's
 * index, which the parent (CarDetailsPage.jsx) uses to update the
 * MediaDisplay.
 *
 * Visual style: glass tiles (matches the rest of the site's
 * glassmorphism language), with the active item getting a brighter
 * border + soft white glow so it's obvious which media is currently
 * showing in the big display area.
 */
export default function MediaThumbnailRail({ media, activeIndex, onSelect }) {
    const railRef = useRef(null);

    // One-time stagger entrance when the rail first mounts.
    useEffect(() => {
        const node = railRef.current;
        if (!node) return;

        const items = node.querySelectorAll(".media-thumb");

        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (prefersReducedMotion) {
            gsap.set(items, { clearProps: "all" });
            return;
        }

        gsap.fromTo(
            items,
            { opacity: 0, y: 16 },
            {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: "power2.out",
                stagger: 0.08,
            }
        );
    }, []);

    return (
        <div className="media-thumbnail-rail" ref={railRef}>
            {media.map((item, index) => {
                const isActive = index === activeIndex;
                return (
                    <button
                        key={item.src + "-" + index}
                        type="button"
                        className={`media-thumb ${isActive ? "media-thumb--active" : ""}`}
                        onClick={() => onSelect(index)}
                        aria-pressed={isActive}
                        aria-label={
                            item.type === "video" ? "Play car video" : `View image ${index}`
                        }
                    >
                        {item.type === "video" ? (
                            <>
                                {item.poster ? (
                                    <img
                                        className="media-thumb__media"
                                        src={item.poster}
                                        alt=""
                                    />
                                ) : (
                                    <div className="media-thumb__media media-thumb__media--placeholder" />
                                )}
                                <span className="media-thumb__play-icon" aria-hidden="true">
                                    <svg viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z" fill="currentColor" />
                                    </svg>
                                </span>
                            </>
                        ) : (
                            <img
                                className="media-thumb__media"
                                src={item.src}
                                alt=""
                                loading="lazy"
                            />
                        )}
                    </button>
                );
            })}
        </div>
    );
}