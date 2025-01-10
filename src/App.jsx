import { useRef } from "react";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import gsap from "gsap";
import About from "./components/About";
import { useCursorFollower } from "./context/CursorFollower";
import Skills from "./components/Skills";
import Certificate from "./components/Certificates";
import Contact from "./components/Contact";

const App = () => {
  const main = useRef(null);
  const cursorFollower = useCursorFollower();

  const handleMouseMove = (e) => {
    gsap.to(cursorFollower.current, {
      x: e.clientX,
      y: e.clientY,
      opacity: 1,
    });
  };

  return (
    <div
      ref={main}
      onMouseMove={(e) => handleMouseMove(e)}
      className="min-h-screen w-screen"
    >
      <div
        className="h-3 w-3 rounded-full bg-white fixed top-0 left-0 opacity-0 flex justify-center items-center text-black font-medium z-[50] pointer-events-none"
        ref={cursorFollower}
      ></div>
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Certificate />
      <Contact />
    </div>
  );
};

export default App;
