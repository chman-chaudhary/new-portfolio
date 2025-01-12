import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const PortfolioSections = () => {
  const sectionsRef = useRef([]);

  useGSAP(() => {
    sectionsRef.current.forEach((section, i) => {
      const nextSection = sectionsRef.current[i + 1];

      if (!nextSection) return;

      gsap.to(section, {
        scale: 0.6,
        scrollTrigger: {
          trigger: nextSection,
          start: "top bottom", // When the next section hits the bottom of the viewport
          end: "top top", // When the next section reaches the top
          scrub: true,
        },
      });

      gsap.to(nextSection, {
        y: "-100vh", // Move the next section upwards
        scrollTrigger: {
          trigger: nextSection,
          start: "top bottom",
          end: "top top",
          scrub: true,
        },
      });
    });

    return () => {
      // Clean up ScrollTriggers on component unmount
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="relative sections-wrapper h-screen">
      {["Section 1", "Section 2", "Section 3"].map((text, index) => (
        <section
          key={index}
          style={{ top: `${index * 100}vh` }}
          className={`section absolute left-0 h-screen w-full z-[${index}] flex justify-center items-center text-5xl text-white ${
            index % 2 === 0 ? "bg-[#3458db]" : "bg-[#2ecc71]"
          }`}
          ref={(el) => (sectionsRef.current[index] = el)}
        >
          {text}
        </section>
      ))}
    </div>
  );
};

export default PortfolioSections;
