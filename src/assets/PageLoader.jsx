import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./PageLoader.css";

/**
 * PageLoader
 * ----------
 * Full-screen intro loader:
 *   1. Solid black overlay holds for `holdDuration` seconds.
 *   2. Overlay splits into two halves down the vertical center.
 *   3. Left half slides off-screen left, right half slides off-screen
 *      right, simultaneously.
 *   4. Page content fades in once both halves have cleared the viewport.
 *
 * Scroll is locked on <html>/<body> for the entire sequence and restored
 * the moment the timeline completes (including on unmount, so a fast
 * route change can't leave scroll disabled).
 *
 * Usage:
 *   <PageLoader>
 *     <HomePage />
 *   </PageLoader>
 */
export default function PageLoader({
  children,
  loaderText = "CAR RENTAL",
  holdDuration = 2,        // seconds the black screen holds before splitting
  splitDuration = 1.1,     // seconds for the halves to travel off-screen
  contentFadeDuration = 0.8,
  onComplete,
}) {
  const containerRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const textRef = useRef(null);
  const contentRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    // Lock scroll for the duration of the intro.
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    // Start content invisible so there's no flash before the fade-in tween.
    gsap.set(contentRef.current, { autoAlpha: 0 });
    gsap.set([leftRef.current, rightRef.current], { xPercent: 0 });
    gsap.set(textRef.current, { autoAlpha: 0, y: 24, scale: 0.96 });

    const tl = gsap.timeline({
      defaults: { ease: "power4.inOut" },
      onComplete: () => {
        html.style.overflow = prevHtmlOverflow;
        body.style.overflow = prevBodyOverflow;
        setIsLoading(false);
        onComplete?.();
      },
    });

    tl.to(textRef.current, {
      autoAlpha: 1,
      y: 0,
      scale: 1,
      duration: 0.9,
      ease: "power3.out",
    }) // text reveals as soon as the black screen is up
      .to({}, { duration: Math.max(holdDuration - 0.9, 0) }) // hold on solid black (text reveal itself takes 0.9s, counted toward holdDuration; if holdDuration < 0.9 the reveal still completes in full before splitting)
      .to(
        textRef.current,
        { autoAlpha: 0, y: -16, duration: 0.5, ease: "power2.in" },
        "split" // text exits at the same moment the split begins
      )
      .to(
        leftRef.current,
        { xPercent: -100, duration: splitDuration },
        "split"
      )
      .to(
        rightRef.current,
        { xPercent: 100, duration: splitDuration },
        "split" // same label as the left tween -> they run together
      )
      .to(
        contentRef.current,
        { autoAlpha: 1, duration: contentFadeDuration, ease: "power2.out" },
        "split+=" + (splitDuration * 0.6) // start fading in slightly before halves fully clear
      );

    return () => {
      tl.kill();
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={containerRef} className="loader-root">
      {isLoading && (
        <div className="loader-overlay" aria-hidden="true">
          <div ref={leftRef} className="loader-half loader-half--left" />
          <div ref={rightRef} className="loader-half loader-half--right" />
          <h1 ref={textRef} className="loader-text">
            {loaderText}
          </h1>
        </div>
      )}

      <div ref={contentRef} className="loader-content">
        {children}
      </div>
    </div>
  );
}