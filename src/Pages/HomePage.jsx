import React, { useState, useEffect, useRef } from "react";
import Typed from "typed.js";
import Menu from "../components/Menu";
import "../App.css";

//
const HomePage = () => {
  const [typed, setTyped] = useState(null);
  const typedRef = useRef(null);

  useEffect(() => {
    const options = {
      strings: [
        "Etudiant en informatique.",
        "Passionné",
        "Déterminé",
        "Rockstar Games Fan",
        "ReactJS",
        "C#",
        "JavaScript",
        "C++",
        "Self-learning",
        "Bienvenue sur mon site web."
      ],
      typeSpeed: 25,
      backSpeed: 25,
      loop: true,
      showCursor: true,
      cursorChar: "|",
      smartBackspace: true,
    };

    typedRef.current = new Typed(".typed", options);
    setTyped(typedRef.current);
    return () => {
      // Nettoyez la référence de Typed.js lors de la désactivation du composant
      typedRef.current.destroy();
    };
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
          <p>
            <span className="typed"></span>
          </p>
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
