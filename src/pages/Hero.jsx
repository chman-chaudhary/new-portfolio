import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef, useState } from "react";

const Hero = () => {
  const audioRefs = useRef([
    new Audio("/audio/track1.mp3"),
    new Audio("/audio/track2.mp3"),
    new Audio("/audio/track3.mp3"),
    new Audio("/audio/track4.mp3"),
    new Audio("/audio/track5.mp3"),
  ]);
  const [image, setImage] = useState("/images/default.jpg");
  const heroImage = useRef(null);
  const heroContainer = useRef(null);

  const handleMouseMove = (e) => {
    if (
      e.clientX < 100 ||
      e.clientX > window.innerWidth - 290 ||
      e.clientY < 100 ||
      e.clientY > window.innerHeight - 50
    ) {
      gsap.to(heroImage.current, {
        x: e.clientX - 100,
        y: e.clientY - 100,
        duration: 0,
        opacity: 0,
      });
    } else {
      gsap.to(heroImage.current, {
        x: e.clientX - 100,
        y: e.clientY - 100,
        duration: 1,
        opacity: 1,
      });
    }
  };

  const playAudio = (index) => {
    audioRefs.current[index].play();
  };

  const stopAudio = (index) => {
    const audio = audioRefs.current[index];
    audio.pause();
    audio.currentTime = 0;
  };

  const handleMouseEnter = (i) => {
    setImage(`/images/image${i}.jpg`);
    playAudio(i);
  };

  const handleMouseLeave = (i) => {
    setImage("/images/default.jpg");
    stopAudio(i);
  };

  return (
    <div
      className="h-screen w-full flex justify-between items-end mb-40"
      ref={heroContainer}
      onMouseMove={(e) => handleMouseMove(e)}
    >
      <div className="h-screen flex flex-col justify-around px-20 z-[1]">
        <div className="text-5xl">
          coder,
          <br />
          developer,
          <br />
          tech enthusiast:
        </div>
        <div className="text-3xl">
          CHAMAN
          <br />
          CHAUDHARY
        </div>
      </div>
      <div className="origin-bottom-left -rotate-90 text-8xl font-semibold translate-x-96 z-[1]">
        <div
          style={{ WebkitTextStroke: "2px rgb(235,235,235)" }}
          className="rotate-180 text-end py-5 text-transparent hover:text-[rgb(235,235,235)] uppercase"
          onMouseEnter={() => handleMouseEnter(0)}
          onMouseLeave={() => handleMouseLeave(0)}
        >
          About
        </div>
        <div
          style={{ WebkitTextStroke: "2px rgb(235,235,235)" }}
          className="rotate-180 text-end py-5 uppercase text-transparent hover:text-[rgb(235,235,235)]"
          onMouseEnter={() => handleMouseEnter(1)}
          onMouseLeave={() => handleMouseLeave(1)}
        >
          Projects
        </div>
        <div
          style={{ WebkitTextStroke: "2px rgb(235,235,235)" }}
          className="rotate-180 text-end py-5 uppercase text-transparent hover:text-[rgb(235,235,235)]"
          onMouseEnter={() => handleMouseEnter(2)}
          onMouseLeave={() => handleMouseLeave(2)}
        >
          Skills
        </div>
        <div
          style={{ WebkitTextStroke: "2px rgb(235,235,235)" }}
          className="rotate-180 text-end py-5 uppercase text-transparent hover:text-[rgb(235,235,235)]"
          onMouseEnter={() => handleMouseEnter(3)}
          onMouseLeave={() => handleMouseLeave(3)}
        >
          Contact
        </div>
        <div
          style={{ WebkitTextStroke: "2px rgb(235,235,235)" }}
          className="rotate-180 text-end py-5 uppercase text-transparent hover:text-[rgb(235,235,235)]"
          onMouseEnter={() => handleMouseEnter(4)}
          onMouseLeave={() => handleMouseLeave(4)}
        >
          Hire Me
        </div>
      </div>
      <img
        ref={heroImage}
        src={image}
        className="absolute w-[26rem] top-0 left-0 z-0 opacity-0"
      ></img>
    </div>
  );
};

export default Hero;
