import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef, useState } from "react";
import { GoArrowUpRight } from "react-icons/go";

const ProjectCards = ({ project, top, setTop, zIndex, animationDelay }) => {
  const [position, setPosition] = useState({ x: project.x, y: project.y });
  const [isDragging, setIsDragging] = useState(false);
  const [z, setZ] = useState(zIndex);
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });

  const cardRef = useRef(null);

  useGSAP(
    () => {
      gsap.from(cardRef.current, {
        x: project.fromX,
        y: project.fromY,
        duration: 1,
        delay: animationDelay,
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
    setIsDragging(false);
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
      onMouseMove={isDragging ? handleMouseMove : undefined}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp} // Stop dragging if the mouse leaves the div
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
