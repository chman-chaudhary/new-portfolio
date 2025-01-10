import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef } from "react";
import { SkillIcons } from "../assets/data";

const Skills = () => {
  const skillContainer = useRef(null);
  const size = 200;

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = skillContainer.current;

    const updateScaling = () => {
      const containerRect = container.getBoundingClientRect();
      const viewportCenter = window.innerWidth / 2;

      // Iterate through each child (icon)
      container.childNodes.forEach((child) => {
        const childRect = child.getBoundingClientRect();
        const childCenter = childRect.left + childRect.width / 2;

        // Calculate distance from viewport center
        const distance = Math.abs(viewportCenter - childCenter);
        const scale = Math.max(0.5, 2.5 - (distance / viewportCenter) * 2); // Scale between 1 and 2

        // Apply scaling
        gsap.to(child, {
          scale: scale,
          duration: 0.2, // Smooth transition
          overwrite: true, // Prevent overlapping tweens
        });
      });
    };

    gsap.to(container, {
      transform: "translateX(-650%)",
      scrollTrigger: {
        trigger: ".skills",
        scroller: "body",
        start: "top 0%",
        end: "top -100%",
        pin: true,
        scrub: 1,
        onUpdate: updateScaling,
      },
    });

    gsap.to(container, {
      opacity: 1,
      scrollTrigger: {
        trigger: ".skills",
        scroller: "body",
        start: "top 20%",
      },
    });
  }, []);

  return (
    <div className="mt-40">
      <div className="h-screen skills">
        <div
          className="h-full flex justify-start items-center px-[30rem] gap-x-80 opacity-0"
          ref={skillContainer}
        >
          {SkillIcons.map((icon, idx) => {
            const updatedSvg = icon.svg.replace(
              "<svg",
              `<svg width="${size}" height="${size}"`
            );
            return (
              <div
                key={idx}
                className="flex flex-col justify-center items-center"
              >
                <span dangerouslySetInnerHTML={{ __html: updatedSvg }} />
                <span>{icon.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Skills;
