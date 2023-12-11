import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import "../App.css";
import Menu from "../components/Menu.jsx";

function HomePage() {
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [isEnd, setIsEnd] = useState(false);

  const words = useMemo(
    () => [
      "Bienvenue sur mon portfolio.",
      "Etudiant en informatique.",
      "Passionné",
      "Déterminé",
      "Rockstar Games Fan",
      "ReactJS",
      "C#",
      "JavaScript",
      "C++",
      "Self-learning",
      "Bienvenue sur mon site web.",
    ],
    []
  );
  const typingSpeed = 150;
  const deletingSpeed = 50;
  const nextWordDelay = 150;
  const textRef = useRef(null);

  useEffect(() => {
    if (isEnd) {
      textRef.current.classList.add("cursor");
    } else {
      textRef.current.classList.remove("cursor");
    }
  }, [isEnd, wordIndex, words, textRef]);

  useEffect(() => {
    const handleType = () => {
      const current = wordIndex % words.length;
      const fullText = words[current];
      if (isDeleting) {
        setText(fullText.substring(0, text.length - 1));
      } else {
        setText(fullText.substring(0, text.length + 1));
      }

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), nextWordDelay);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setWordIndex(wordIndex + 1);
      }
    };

    const typeTimer = setTimeout(
      handleType,
      isDeleting ? deletingSpeed : typingSpeed
    );
    return () => clearTimeout(typeTimer);
  }, [text, isDeleting, wordIndex, words]);

  useEffect(() => {
    if (text === "") {
      setIsEnd(true);
    } else {
      setIsEnd(false);
    }
  }, [text]);

  useEffect(() => {
    textRef.current.focus();
  }, []);

  return (
    <>
      <div className="menu">
        <MenuSection />
      </div>
      <div className="min-h-screen flex flex-col">
        <HeroSection textRef={textRef} text={text} isEnd={isEnd} />
        <AboutSection />
        <ProjectsSection />
        <ContactSection />
      </div>
    </>
  );
}

function HeroSection({ textRef, text, isEnd }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="h-screen flex items-center justify-center bg-gray-800 text-white"
    >
      <h1 className="text-4xl font-bold" ref={textRef}>
        {text}
        {isEnd ? "" : "|"}
      </h1>
    </motion.div>
  );
}

function MenuSection() {
  return <Menu />;
}

function AboutSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="py-16 px-4 bg-gray-200"
    >
      <h2 className="text-2xl font-bold mb-4">About Me</h2>
      <p>
        This is a short description about myself and my skills. I am a passionate
        web developer with experience in React, JavaScript, and Tailwind CSS.
      </p>
    </motion.div>
  );
}

function ProjectsSection() {
  const projects = [
    {
      title: "Project 1",
      description: "This is a description of Project 1.",
    },
    {
      title: "Project 2",
      description: "This is a description of Project 2.",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="py-16 px-4"
    >
      <h2 className="text-2xl font-bold mb-4">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </motion.div>
  );
}

function ProjectCard({ title, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="rounded-lg shadow-md p-4 bg-gray-200"
    >
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p>{description}</p>
    </motion.div>
  );
}

function ContactSection() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="py-16 px-4 bg-gray-800 text-white"
    >
      <h2 className="text-2xl font-bold mb-4">Contact Me</h2>
      <p>
        If you have any questions or would like to get in touch, please feel free
        to contact me.
      </p>
    </motion.div>
  );
}

export default HomePage;