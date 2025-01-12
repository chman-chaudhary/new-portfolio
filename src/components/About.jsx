import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useRef } from "react";

const About = () => {
  const textRef = useRef(null);

  useGSAP(() => {
    const text = textRef.current.textContent
      .split("")
      .map((char) => `<span class="char">${char}</span>`)
      .join("");
    textRef.current.innerHTML = text;

    gsap.registerPlugin(ScrollTrigger);
    gsap.to(".char", {
      color: "white",
      stagger: 0.1, // Delay for characters before the current one
      duration: 0.05,
      ease: "none", // Ensure smooth character-by-character animation
      scrollTrigger: {
        trigger: ".aboutContainer",
        scroller: "body",
        pin: true,
        start: "top 0%",
        end: "top -100%",
        scrub: 4,
      },
    });
  }, []);

  return (
    <div
      name="about"
      className="h-screen w-full flex justify-center items-center px-40 aboutContainer"
    >
      <p className="text-5xl leading-[3.4rem] text-zinc-800" ref={textRef}>
        I'm a BCA student specializing in website creation. I strive to
        understand brands and deliver customized, unique digital experiences.
        going beyond simple communication of information, I aim to highlight
        brands and provide users with moving experiences.
      </p>
    </div>
  );
};

export default About;
