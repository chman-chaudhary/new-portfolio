import React, { useRef, useState } from "react";
import ProjectCard from "./ProjectCard";

const Projects = () => {
  const projects = [
    {
      title: "ABC abc 1",
      date: "May 2024",
      x: 350,
      y: 250,
      rotate: -15,
      image: "/image.webp",
      fromX: 200,
      fromY: 500,
    },
    {
      title: "ABC abc 2",
      date: "May 2024",
      x: 750,
      y: 150,
      rotate: 10,
      image: "/image.webp",
      fromX: 500,
      fromY: 100,
    },
    {
      title: "ABC abc 3",
      date: "May 2024",
      x: 450,
      y: 70,
      rotate: 5,
      image: "/image.webp",
      fromX: 100,
      fromY: -500,
    },
    {
      title: "ABC abc 4",
      date: "May 2024",
      x: 140,
      y: 240,
      rotate: 4,
      image: "/image.webp",
      fromX: -500,
      fromY: -100,
    },
    {
      title: "ABC abc 5",
      date: "May 2024",
      x: 540,
      y: 340,
      rotate: 12,
      image: "/image.webp",
      fromX: -100,
      fromY: 400,
    },
    {
      title: "ABC abc 6",
      date: "May 2024",
      x: 840,
      y: 280,
      rotate: -4,
      image: "/image.webp",
      fromX: 500,
      fromY: -100,
    },
    {
      title: "ABC abc 6",
      date: "May 2024",
      x: 150,
      y: 100,
      rotate: -14,
      image: "/image.webp",
      fromX: -150,
      fromY: -400,
    },
    {
      title: "ABC abc 7",
      date: "May 2024",
      x: 250,
      y: 350,
      rotate: 14,
      image: "/image.webp",
      fromX: -150,
      fromY: 400,
    },
    {
      title: "ABC abc 8",
      date: "May 2024",
      x: 800,
      y: 100,
      rotate: -10,
      image: "/image.webp",
      fromX: 500,
      fromY: -200,
    },
    {
      title: "ABC abc 9",
      date: "May 2024",
      x: 600,
      y: 350,
      rotate: -3,
      image: "/image.webp",
      fromX: 100,
      fromY: 300,
    },
    {
      title: "ABC abc 10",
      date: "May 2024",
      x: 450,
      y: 200,
      rotate: -3,
      image: "/image.webp",
      fromX: 50,
      fromY: 450,
    },
  ];

  const [top, setTop] = useState(10);
  const projectsRef = useRef(null);

  return (
    <div
      name="projects"
      className="bg-[rgb(10,10,10)] h-[100vh] w-full overflow-visible"
      ref={projectsRef}
    >
      <div className="relative h-auto">
        {projects.map((project, idx) => (
          <ProjectCard
            project={project}
            key={idx}
            top={top}
            setTop={setTop}
            zIndex={idx}
            animationDelay={idx * 0.2}
            projectsRef={projectsRef}
          />
        ))}
      </div>
    </div>
  );
};

export default Projects;
