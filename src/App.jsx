import { useRef } from "react";
import Hero from "./pages/Hero";
import Projects from "./pages/Projects";
import gsap from "gsap";

const App = () => {
  const main = useRef(null);
  const followCursor = useRef(null);

  const handleMouseMove = (e) => {
    console.log(e);
    gsap.to(followCursor.current, {
      x: e.clientX,
      y: e.clientY,
      opacity: 1,
    });
  };

  return (
    <div ref={main} onMouseMove={(e) => handleMouseMove(e)}>
      <div
        className="h-2 w-2 rounded-full bg-white absolute z-10 top-0 left-0 opacity-0"
        ref={followCursor}
      ></div>
      <Hero />
      <Projects />
    </div>
  );
};

export default App;
