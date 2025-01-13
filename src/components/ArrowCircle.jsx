import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const ArrowCircle = ({ className }) => {
  const circleRef = useRef(null);
  const arrowRef = useRef(null);

  // Handle mouse move event
  const handleMouseMove = (e) => {
    const { clientX: mouseX, clientY: mouseY } = e;
    const circle = circleRef.current.getBoundingClientRect();

    // Get the center of the circle
    const circleCenterX = circle.left + circle.width / 2;
    const circleCenterY = circle.top + circle.height / 2;

    // Calculate angle of rotation in degrees
    const deltaX = mouseX - circleCenterX;
    const deltaY = mouseY - circleCenterY;
    let angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

    // Normalize angle to the range [-180, 180]
    const currentRotation = gsap.getProperty(arrowRef.current, "rotation");
    const shortestAngle = ((angle - currentRotation + 540) % 360) - 180;

    // Animate rotation
    gsap.to(arrowRef.current, {
      rotation: currentRotation + shortestAngle + 270,
      duration: 0.2,
      ease: "power2.out",
    });
  };

  // Add mousemove event listener
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={circleRef}
      className={
        className +
        " absolute z-10 w-40 h-40 rounded-full bg-white flex justify-center items-center overflow-hidden p-5"
      }
    >
      <svg
        ref={arrowRef}
        xmlnsXlink="http://www.w3.org/1999/xlink"
        xmlns="http://www.w3.org/2000/svg"
        focusable="false"
        viewBox="0 0 24 24"
        color="rgb(0, 0, 0)"
        style={{
          userSelect: "none",
          width: "100%",
          height: "100%",
          display: "inline-block",
          fill: "rgb(0, 0, 0)",
          flexShrink: "0",
          transformOrigin: "center center",
        }}
        width="138"
        height="143"
      >
        <path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"></path>
      </svg>
    </div>
  );
};

export default ArrowCircle;
