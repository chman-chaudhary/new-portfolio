import React, { useRef, useState } from "react";
import { Certificates } from "../assets/data";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

const Certificate = () => {
  const [currentCertificate, setCurrentCertificate] = useState(null);
  const imageRef = useRef(null);
  const certificateContainer = useRef(null);

  const handleMouseEnter = (certificate) => {
    setCurrentCertificate(certificate);
  };

  const handleMouseLeave = () => {
    setCurrentCertificate(null);
  };

  useGSAP(() => {
    if (!currentCertificate) return;
    console.log(currentCertificate);
    gsap.to(imageRef.current, {
      x: currentCertificate.x,
      y: currentCertificate.y,
      rotate: currentCertificate.rotate,
      duration: 1,
      opacity: 1,
      ease: "sine.out",
    });
  }, [currentCertificate]);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(".heading", {
      opacity: 0,
      y: -50,
      duration: 0.5,
      scrollTrigger: {
        trigger: ".parentContainer",
        start: "top 30%",
      },
    });

    gsap.from(".certificates", {
      opacity: 0,
      y: 40,
      stagger: 0.3,
      scrollTrigger: {
        trigger: ".parentContainer",
        start: "top 20%",
      },
    });
  }, []);

  return (
    <div
      className="h-screen w-full flex flex-col parentContainer mt-40 overflow-hidden"
      ref={certificateContainer}
    >
      {currentCertificate && (
        <img
          ref={imageRef}
          src={currentCertificate.image}
          width="180px"
          className="absolute z-[1] pointer-events-none opacity-0"
          alt={currentCertificate.name}
        />
      )}
      <div className="text-center font-semibold text-6xl heading opacity-100 mt-5">
        Certificates
      </div>
      <div className="h-full flex flex-col justify-center items-center px-60">
        {Certificates.map((certificate, idx) => (
          <div
            key={idx}
            onMouseEnter={() => handleMouseEnter(certificate)}
            onMouseLeave={handleMouseLeave}
            className={`certificates w-full text-center py-7 space-x-10 ${
              idx > 0 && "border-t border-white"
            }`}
          >
            <span className="text-5xl">{certificate.name}</span>
            <span className="text-xl font-light">{certificate.by}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Certificate;
