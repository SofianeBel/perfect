import React, { useState, useEffect, useRef } from "react";
import Menu from "../components/Menu";
import "../App.css";

//
const HomePage = () => {
  // Déclare une nouvelle variable d'état, qu’on va appeler « count »
  const [count, setCount] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [isEnd, setIsEnd] = useState(false);
  const words = [
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
  ];
  const typingSpeed = 150;
  const deletingSpeed = 50;
  const nextWordDelay = 150;
  const textRef = useRef(null);

  useEffect(() => {
    // rajoute un curseur clignotant | à la fin du texte
    const current = wordIndex % words.length;
    const fullText = words[current];
    if (isEnd) {
      textRef.current.classList.add("cursor");
    } else {
      textRef.current.classList.remove("cursor");
    }
  }, [isEnd, wordIndex, words]);

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
      {/* Affiche le composant Menu. */}
      <Menu />

      {/* Affiche un conteneur. */}
      <div className="container">
        {/* // Affiche un en-tête. */}
        <header className="header">
          <h1>Sofiane's World</h1>
          <p ref={textRef} className="cursor">{text}{isEnd ? "" : "|"}</p>
        </header>
        {/* // Affiche un contenu principal. */}
        <main className="main">
          {/* // Affiche un span avec le texte et le curseur. */}

          {/* // Affiche une section. */}
          <section className="section">
            {/* // Affiche un en-tête. */}
            <h2>Mes Projets</h2>
            {/* // Affiche une liste non ordonnée avec des éléments. */}
            <ul>
              <li className="project">Muslin Prayer Natural Time</li>
              <p>
                Le projet consiste à utiliser une montre Natural Time et à
                l'utiliser pour indiquer le moment de la prière, car dans
                l'Islam, les prières sont définies par la direction du soleil et
                de la lune.
              </p>
              <li className="project">The HYDE BOT</li>
              <p>
                Son objectif est de vous aider dans vôtre routine sur Discord.
              </p>
              <li className="project">Projet 3</li>
            </ul>
          </section>
          {/* // Affiche une section. */}
          <section className="section">
            {/* // Affiche un en-tête. */}
            <h2>Mes Qualités</h2>
            {/* // Affiche une liste non ordonnée avec des éléments. */}
            <ul>
              <li className="quality">Qualité 1</li>
              <li className="quality">Qualité 2</li>
              <li className="quality">Qualité 3</li>
            </ul>
          </section>
          {/* // Affiche une section. */}
          <section className="section">
            {/* // Affiche un en-tête. */}
            <h2>Me Contacter</h2>
            {/* // Affiche un paragraphe avec une adresse e-mail et un numéro de
            téléphone. */}
            <p>
              Adresse e-mail : Sifly789@gmail.com
              <br />
              Numéro de téléphone : 0782620111
            </p>
          </section>
        </main>
        {/* // Affiche un pied de page. */}
        <footer>
          <p>
            © {new Date().getFullYear()} Sofiane's World. Tous droits réservés.
          </p>
        </footer>
      </div>
    </>
  );
};

export default HomePage;
