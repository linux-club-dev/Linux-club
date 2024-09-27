"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const IntroAnimation = ({ onComplete }) => {
  const welcomeRef = useRef(null);

  useEffect(() => {
    const letters = welcomeRef.current.querySelectorAll(".letter");

    // Set initial state of letters
    gsap.set(letters, { opacity: 0, y: 50 });

    // Animate letters in
    gsap.to(letters, {
      opacity: 1,
      y: 0,
      stagger: 0.1,
      duration: 0.5,
      ease: "power2.out",
    });

    // Create a timeline for the exit animation
    const tl = gsap.timeline({
      delay: 1.5,
      onComplete: () => {
        // Notify parent component that animation is complete
        if (onComplete) onComplete();
      },
    });

    // Animate letters out with a spreading effect
    tl.to(letters, {
      duration: 1,
      x: (i) => (i - letters.length / 2) * 100, // Spread letters horizontally
      opacity: 0,
      ease: "power2.inOut",
    });
  }, [onComplete]);

  return (
    <div ref={welcomeRef} className="intro-container">
      <h1 className="welcome-text">
        {"WELCOME".split("").map((char, index) => (
          <span key={index} className="letter">
            {char}
          </span>
        ))}
      </h1>
      <style jsx>{`
        .intro-container {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
          overflow: hidden;
          background-color: black;
          color: white;
          position: fixed;
          width: 100%;
          top: 0;
          left: 0;
          z-index: 9999;
        }
        .welcome-text {
          font-size: 4rem;
          letter-spacing: 0.5rem;
        }
        .letter {
          display: inline-block;
        }
      `}</style>
    </div>
  );
};

export default IntroAnimation;
