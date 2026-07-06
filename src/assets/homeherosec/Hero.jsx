import { useEffect, useState } from "react";
import "./Hero.css";

/**
 * Hero
 * ----
 * Large rounded hero container with a looping background video,
 * dark gradient overlay, and content positioned above it.
 *
 * Video source: swap `/videos/car.mp4` for your own clip — everything
 * else (overlay, zoom animation, sizing) stays the same. A public
 * placeholder clip is used below so the section is fully visible
 * out of the box.
 */
export default function Hero() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const frame = requestAnimationFrame(() => setIsVisible(true));
        return () => cancelAnimationFrame(frame);
    }, []);

    return (
        <section
            id="home"
            className={`hero ${isVisible ? "hero--visible" : ""}`}
            aria-label="Hero"
        >
            <div className="hero__container">
                {/* Background video — replace the src below with your own file,
            e.g. "/videos/car.mp4". Keep the same attributes: autoPlay,
            loop, muted, and playsInline are all required for reliable
            autoplay across browsers (especially iOS Safari). */}
                <video
                    className="hero__video"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    poster="/videos/car-poster.jpg"
                >
                    <source src="/videos/my-car-video.mp4" type="video/mp4" />
                </video>

                {/* Dark gradient overlay for text readability */}
                <div className="hero__overlay" aria-hidden="true" />

                {/* Foreground content */}
                <div className="hero__content">
                    <div className="hero__left">
                        <span className="hero__badge">Premium Car Rentals</span>

                        <h1 className="hero__heading">
                            Drive Beyond
                            <br />
                            The Ordinary
                        </h1>

                        <p className="hero__subtext">
                            Luxury cars for every journey. Experience comfort,
                            performance, and style with our premium rental fleet.
                        </p>

                        <div className="hero__actions">
                            <a href="#book" className="hero__btn hero__btn--primary">
                                Start Your Ride
                            </a>
                            <a href="#fleet" className="hero__btn hero__btn--secondary">
                                Explore Fleet
                            </a>
                        </div>
                    </div>

                    {/* Right side intentionally left empty — reserved for a future
              floating statistics card. */}
                    <div className="hero__right" />
                </div>

                {/* Scroll indicator */}
                <div className="hero__scroll" aria-hidden="true">
                    <span className="hero__scroll-line" />
                </div>
            </div>
        </section>
    );
}