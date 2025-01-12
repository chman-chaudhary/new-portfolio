import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef, useState } from "react";

const Loading = ({ setReady }) => {
  const ball = useRef(null);
  const readyText = useRef(null);
  const textRef = useRef(null);
  const loadingMain = useRef(null);

  const [loading, setLoading] = useState(true);
  const [percentage, setPercentage] = useState(0); // For dynamic percentage

  useGSAP(
    () => {
      // Build HTML for the text with span elements for each character
      const textHTML = textRef.current.textContent
        .split("")
        .map((char) =>
          char === " "
            ? "<span class='char'>&nbsp;</span>"
            : `<span class="char">${char}</span>`
        )
        .join("");

      textRef.current.innerHTML = textHTML;

      // Typing effect
      gsap.from(".char", {
        display: "none",
        opacity: 0,
        stagger: 0.1, // Delay for characters before the current one
        duration: 0.05,
        ease: "none",
        delay: 1,
      });

      // Ball movement with percentage update
      gsap.to(ball.current, {
        x: 410,
        duration: 2.6,
        delay: 1,
        ease: "none",
        onUpdate: function () {
          // Calculate percentage based on animation progress
          const progress = this.progress();
          setPercentage(Math.floor(progress * 100)); // Update percentage state
        },
        onComplete: () => {
          setLoading(false); // Set loading to false when animation is complete
        },
      });
    },
    { dependencies: [], scope: loadingMain }
  );

  return (
    <div
      className="h-screen w-full flex flex-col justify-center items-center gap-y-20"
      ref={loadingMain}
      onClick={() => {
        if (loading) return;
        setReady(true);
      }}
    >
      {/* Typing Effect */}
      <div
        ref={textRef}
        className="flex justify-center items-center text-4xl font-semibold uppercase"
      >
        Welcome to the portfolio
      </div>

      {/* Loading Animation */}
      <div className="flex justify-center items-center">
        {/* Pac-Man Ball */}
        <div className="absolute left-0 flex" ref={ball}>
          <div className="relative w-96 bg-black"></div>
          <div className="relative h-16 w-16 flex flex-col rounded-full overflow-hidden">
            <div className="absolute z-[1] h-2 w-2 bg-black rounded-full top-4 right-5"></div>
            <div className="h-full bg-gradient-to-r from-white from-50% to-transparent to-50%">
              <div className="h-full bg-white animate-eat-up"></div>
            </div>
            <div className="h-full bg-gradient-to-r from-white from-50% to-transparent to-50% overflow-hidden">
              <div className="h-full bg-white rotate-[45deg] animate-eat-down"></div>
            </div>
          </div>
        </div>
        {/* Food */}
        <div className="space-x-7 px-5">
          {new Array(10).fill(0).map((_, idx) => (
            <span key={idx} className="h-2 w-2 bg-white inline-block"></span>
          ))}
        </div>
      </div>

      <div className="text-xl font-semibold uppercase" ref={readyText}>
        {loading ? (
          <p>Please wait {percentage}%</p> // Dynamically display percentage
        ) : (
          <p>
            [&nbsp;&nbsp;Click to{" "}
            <span
              className="text-transparent"
              style={{ WebkitTextStroke: "0.5px white" }}
            >
              Enter
            </span>
            &nbsp;&nbsp;]
          </p>
        )}
      </div>
    </div>
  );
};

export default Loading;
