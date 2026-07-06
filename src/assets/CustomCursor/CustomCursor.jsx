import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./CustomCursor.css";

export default function CustomCursor() {
    const dotRef = useRef(null);
    const ringRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Detect touch devices (coarse pointer like fingers)
        const touchQuery = window.matchMedia("(pointer: coarse)");
        const checkTouch = (e) => setIsMobile(e.matches);
        
        setIsMobile(touchQuery.matches);
        if (touchQuery.addEventListener) {
            touchQuery.addEventListener("change", checkTouch);
        } else {
            touchQuery.addListener(checkTouch);
        }

        return () => {
            if (touchQuery.removeEventListener) {
                touchQuery.removeEventListener("change", checkTouch);
            } else {
                touchQuery.removeListener(checkTouch);
            }
        };
    }, []);

    useEffect(() => {
        if (isMobile) return;

        const dot = dotRef.current;
        const ring = ringRef.current;
        if (!dot || !ring) return;

        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (prefersReducedMotion) return;

        // Hide default browser cursor
        document.body.classList.add("hide-default-cursor");

        // GSAP high-performance quickTo setters (updates coordinates in rendering loop)
        const setDotX = gsap.quickTo(dot, "x", { duration: 0.02, ease: "power3.out" });
        const setDotY = gsap.quickTo(dot, "y", { duration: 0.02, ease: "power3.out" });
        
        const setRingX = gsap.quickTo(ring, "x", { duration: 0.15, ease: "power3.out" });
        const setRingY = gsap.quickTo(ring, "y", { duration: 0.15, ease: "power3.out" });

        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            // Subtract half of dimensions to center target on cursor hotspot
            setDotX(clientX - 3);
            setDotY(clientY - 3);
            
            setRingX(clientX - 16);
            setRingY(clientY - 16);
        };

        // Detect hover state on interactive items
        const handleMouseOver = (e) => {
            const target = e.target;
            const isClickable =
                target.tagName === "A" ||
                target.tagName === "BUTTON" ||
                target.tagName === "SELECT" ||
                target.tagName === "INPUT" ||
                target.closest("a") ||
                target.closest("button") ||
                target.closest(".collection-card") ||
                target.closest(".service-tab-card") ||
                target.closest(".compare-car-card__remove") ||
                target.closest(".compare-drawer__close-btn") ||
                target.closest(".footer__social-link") ||
                target.getAttribute("role") === "button" ||
                target.classList.contains("clickable");

            if (isClickable) {
                dot.classList.add("custom-cursor__dot--hover");
                ring.classList.add("custom-cursor__ring--hover");
            } else {
                dot.classList.remove("custom-cursor__dot--hover");
                ring.classList.remove("custom-cursor__ring--hover");
            }
        };

        // Hide custom pointer on screen exit
        const handleMouseLeave = () => {
            gsap.to([dot, ring], { opacity: 0, duration: 0.2 });
        };

        const handleMouseEnter = () => {
            gsap.to([dot, ring], { opacity: 1, duration: 0.2 });
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseover", handleMouseOver);
        document.addEventListener("mouseleave", handleMouseLeave);
        document.addEventListener("mouseenter", handleMouseEnter);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseover", handleMouseOver);
            document.removeEventListener("mouseleave", handleMouseLeave);
            document.removeEventListener("mouseenter", handleMouseEnter);
            document.body.classList.remove("hide-default-cursor");
        };
    }, [isMobile]);

    if (isMobile) return null;

    return (
        <>
            <div className="custom-cursor__dot" ref={dotRef} />
            <div className="custom-cursor__ring" ref={ringRef} />
        </>
    );
}
