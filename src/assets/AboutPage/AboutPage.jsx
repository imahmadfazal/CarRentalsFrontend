import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../homeherosec/Navbar";
import AboutHeader from "./AboutHeader";
import AboutStats from "./AboutStats";
import AboutValues from "./AboutValues";
import AboutTeam from "./AboutTeam";
import Footer from "../Footer/Footer";
import "./AboutPage.css";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
    const pageRef = useRef(null);

    useEffect(() => {
        window.scrollTo(0, 0);

        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (prefersReducedMotion) return;

        const triggers = [];

        // Stagger reveal main header
        const t1 = gsap.fromTo(".anim-hdr > *",
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out"
            }
        );

        // ScrollTrigger reveal stats grid
        const t2 = gsap.fromTo(".anim-stats .stat-item",
            { opacity: 0, y: 35 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                stagger: 0.12,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".anim-stats",
                    start: "top 85%",
                    toggleActions: "play none none none"
                }
            }
        );

        // ScrollTrigger reveal values grid
        const t3 = gsap.fromTo(".anim-vals .value-card",
            { opacity: 0, y: 40 },
            {
                opacity: 1,
                y: 0,
                duration: 1.2,
                stagger: 0.15,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".anim-vals",
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            }
        );

        // ScrollTrigger reveal team profiles
        const t4 = gsap.fromTo(".anim-team .team-card",
            { opacity: 0, y: 45 },
            {
                opacity: 1,
                y: 0,
                duration: 1.2,
                stagger: 0.15,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".anim-team",
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            }
        );

        return () => {
            t1.kill();
            t2.scrollTrigger?.kill();
            t3.scrollTrigger?.kill();
            t4.scrollTrigger?.kill();
        };
    }, []);

    return (
        <div className="about-page" ref={pageRef}>
            <Navbar />
            <div className="about-page__content">
                <AboutHeader />
                <AboutStats />
                <AboutValues />
                <AboutTeam />
            </div>
            <Footer />
        </div>
    );
}
