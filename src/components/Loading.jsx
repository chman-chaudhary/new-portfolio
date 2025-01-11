import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef, useState } from "react";

const Loading = ({ ready, setReady }) => {
  const ball = useRef(null);
  const readyText = useRef(null);
  const textRef = useRef(null);

  const [loading, setLoading] = useState(true);

  useGSAP(() => {
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

    gsap.from(".char", {
      opacity: 0,
      stagger: 0.1, // Delay for characters before the current one
      duration: 0.05,
      ease: "none",
      delay: 1,
    });

    gsap.to(ball.current, {
      x: 410,
      duration: 3,
      delay: 1,
      ease: "none",
    });
  }, []);

  return (
    <div
      className="h-screen w-full flex flex-col justify-center items-center gap-y-20"
      //   onClick={() => setReady(true)}
    >
      {/* Typing Effect */}
      <div
        ref={textRef}
        className="flex justify-center items-center text-4xl font-semibold uppercase"
      >
        Welcome to the portfolio of
      </div>
      {/* Loading Animation */}
      <div className="flex justify-center items-center">
        {/* Pac-Man Ball */}
        <div className="absolute left-0 flex" ref={ball}>
          <div className="relative w-96 bg-black"></div>
          <div className="relative h-20 w-20 flex flex-col rounded-full overflow-hidden">
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
          <p>Please wait 100%</p>
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
