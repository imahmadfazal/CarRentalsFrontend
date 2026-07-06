import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./Mediadisplay.css";

/**
 * MediaDisplay
 * ------------
 * The large left-side display area. Renders either a <video> or an
 * <img> depending on `activeMedia.type`, and runs a GSAP scale+fade
 * transition every time `activeMedia` changes (switching between the
 * default video and any clicked thumbnail).
 *
 * The actual swap logic (which media is "active") lives in the
 * parent (CarDetailsPage.jsx) — this component just renders whatever
 * it's given and animates the transition.
 */
export default function MediaDisplay({ activeMedia }) {
    const containerRef = useRef(null);
    const videoRef = useRef(null);

    // Re-run the entrance animation every time the active media changes
    // (tracked via activeMedia.src so switching back to the same item
    // twice in a row still re-triggers cleanly).
    useEffect(() => {
        const node = containerRef.current;
        if (!node) return;

        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (prefersReducedMotion) {
            gsap.set(node, { clearProps: "all" });
            return;
        }

        // Scale + fade in, per spec ("zoom-ish premium feel"): starts
        // slightly zoomed out and transparent, settles to full size/opacity.
        gsap.fromTo(
            node,
            { opacity: 0, scale: 1.04 },
            { opacity: 1, scale: 1, duration: 0.6, ease: "power3.out" }
        );

        // If this media is a video, start it from the beginning each time
        // it becomes active (rather than resuming wherever a previous
        // play session left off).
        if (activeMedia?.type === "video" && videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.play().catch(() => {
                // Autoplay can be blocked by the browser in some contexts
                // (e.g. if the user hasn't interacted with the page yet on
                // first load) — fail silently rather than throwing; the
                // video's own controls still let the user press play.
            });
        }
    }, [activeMedia?.src]);

    if (!activeMedia) {
        return (
            <div className="media-display media-display--empty">
                <p className="media-display__empty-text">No media available.</p>
            </div>
        );
    }

    return (
        <div className="media-display" ref={containerRef}>
            {activeMedia.type === "video" ? (
                <video
                    ref={videoRef}
                    className="media-display__video"
                    src={activeMedia.src}
                    poster={activeMedia.poster}
                    autoPlay
                    loop
                    muted
                    playsInline
                    controls
                />
            ) : (
                <img
                    className="media-display__image"
                    src={activeMedia.src}
                    alt="Selected car view"
                />
            )}
        </div>
    );
}