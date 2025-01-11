import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef, useState } from "react";
import { Link } from "react-scroll";

const NavLinkStyle =
  "rotate-180 w-full text-end py-5 text-transparent hover:text-[rgb(235,235,235)] uppercase";

const NavLinks = ["about", "projects", "skills", "certificate", "contact"];

const Hero = () => {
  const audioRefs = useRef([
    new Audio("/audio/track1.mp3"),
    new Audio("/audio/track2.mp3"),
    new Audio("/audio/track3.mp3"),
    new Audio("/audio/track4.mp3"),
    new Audio("/audio/track5.mp3"),
  ]);
  const [image, setImage] = useState(null);
  const heroImage = useRef(null);
  const heroParentContainer = useRef(null);
  const heroContainer = useRef(null);
  const LoadingText = useRef(null);

  const handleMouseMove = (e) => {
    if (heroImage.current) {
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

  useGSAP(
    () => {
      const textHTML = LoadingText.current.textContent
        .split("")
        .map((char) =>
          char === " "
            ? "<span class='char'>&nbsp;</span>"
            : `<span class="char">${char}</span>`
        )
        .join("");

      LoadingText.current.innerHTML = textHTML;

      const loadingTl = gsap.timeline();

      loadingTl.from(".char", {
        display: "none",
        opacity: 0,
        stagger: 0.1, // Delay for characters before the current one
        duration: 0.05,
        ease: "none",
        delay: 1,
      });

      loadingTl.from(heroContainer.current, {
        y: "100vh",
        duration: 1,
        delay: 0.5,
        ease: "expo.out",
      });
    },
    { scope: heroParentContainer, dependencies: [] }
  );

  return (
    <div ref={heroParentContainer} className="max-h-screen overflow-hidden">
      <div
        ref={LoadingText}
        className="absolute h-screen w-full flex justify-center items-center text-4xl font-semibold uppercase bg-white text-black text-center border-2 border-black"
      >
        Welcome to the portfolio of
      </div>
      <div
        name="hero"
        className="h-screen w-full flex justify-between items-end mb-40 bg-black"
        ref={heroContainer}
        onMouseMove={(e) => handleMouseMove(e)}
        onMouseLeave={() => setImage(null)}
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
        <nav className="flex flex-col items-start text-8xl origin-bottom-left -rotate-90 font-semibold translate-x-[33rem] z-[1]">
          {NavLinks.map((link, idx) => (
            <Link
              key={idx}
              smooth={true}
              to={link}
              duration={400}
              style={{ WebkitTextStroke: "2px rgb(235,235,235)" }}
              className={NavLinkStyle}
              onMouseEnter={() => handleMouseEnter(idx)}
              onMouseLeave={() => stopAudio(idx)}
            >
              {link}
            </Link>
          ))}
        </nav>
        {image && (
          <img
            ref={heroImage}
            src={image}
            className="absolute w-[26rem] top-0 left-0 z-0 opacity-0"
          ></img>
        )}
      </div>
    </div>
  );
};

export default Hero;
