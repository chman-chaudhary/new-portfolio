import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";

const Contact = () => {
  const ContactParent = useRef(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(".mask", {
      y: 130,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ContactParent.current,
        start: "top 10%",
      },
    });
  }, []);

  return (
    <div
      className="h-screen overflow-hidden text-[rgb(255,0,0)] flex flex-col justify-center items-center font-extrabold text-[10rem] uppercase relative mt-40"
      ref={ContactParent}
    >
      <div className="contactText translate-y-40">Thanks</div>
      <div className="mask bg-black h-32 w-screen absolute top-16 left-0"></div>
      <div className="contactText translate-y-12 z-[1]">For Your</div>
      <div className="mask bg-black h-32 w-screen absolute top-48 left-0 z-[1]"></div>
      <div className="contactText -translate-y-16 z-[2]">Attention</div>
      <div className="mask bg-black h-32 w-screen absolute top-80 left-0 z-[2]"></div>
      <div className="contactText -translate-y-44 z-[3]">Let's Talk</div>
      <div className="mask bg-black h-32 w-screen absolute top-[28rem] left-0 z-[3]"></div>
    </div>
  );
};

export default Contact;
