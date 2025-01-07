import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef, useState } from "react";
import { GoArrowUpRight } from "react-icons/go";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCursorFollower } from "../context/CursorFollower";
import { TextPlugin } from "gsap/all";

const ProjectCards = ({
  project,
  top,
  setTop,
  zIndex,
  animationDelay,
  projectsRef,
}) => {
  const [position, setPosition] = useState({ x: project.x, y: project.y });
  const [isDragging, setIsDragging] = useState(false);
  const [z, setZ] = useState(zIndex);
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });

  const cardRef = useRef(null);
  const cursorFollower = useCursorFollower();

  gsap.registerPlugin(TextPlugin);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      gsap.from(cardRef.current, {
        x: project.fromX,
        y: project.fromY,
        opacity: 0,
        duration: 1,
        delay: animationDelay,
        scrollTrigger: {
          trigger: projectsRef.current,
          scroller: "body",
          start: "top 30%",
          end: "top 5%",
          scrub: 3,
        },
      });
    },
    { dependencies: [] }
  );

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setZ(top);
    setTop((prev) => prev + 1);

    // Store the initial mouse position relative to the element
    setStartPoint({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    // Update position based on the mouse movement
    setPosition({
      x: e.clientX - startPoint.x,
      y: e.clientY - startPoint.y,
    });
  };

  const handleMouseUp = () => {
    handleMouseLeave();
    setIsDragging(false);
  };

  const handleMouseEnter = () => {
    gsap.to(cursorFollower.current, {
      text: "Drag",
      scale: 5,
      fontSize: "3px",
      duration: 0.3, // Duration of the animation
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cursorFollower.current, {
      text: "",
      scale: 1,
      duration: 0.3, // Duration of the animation
    });
  };

  return (
    <div
      ref={cardRef}
      style={{
        top: `${position.y}px`,
        left: `${position.x}px`,
        zIndex: `${z}`,
        rotate: `${project.rotate}deg`,
      }}
      className="absolute rounded-lg overflow-hidden backdrop-blur-sm bg-[rgba(255,255,255,0.1)] p-1 opacity-100"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp} // Stop dragging if the mouse leaves the div
      onMouseEnter={handleMouseEnter}
    >
      <div className="flex justify-between items-center px-4 font-semibold">
        <span className="text-[10px] flex items-center gap-x-1 text-gray-100">
          {project.title}
          <GoArrowUpRight />
        </span>
        <span className="text-[10px] text-gray-300">{project.date}</span>
      </div>
      <img src={project.image} className="w-80" />
    </div>
  );
};

export default ProjectCards;
