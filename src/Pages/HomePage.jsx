import React, { useState, useEffect, useRef, useMemo } from "react";
import Menu from "../components/Menu";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import "../App.css";

const HomePage = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [isEnd, setIsEnd] = useState(false);

  const words = useMemo(
    () => [
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
    const current = wordIndex % words.length;

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
      <Menu />

      <div className="container">
        <header className="header">
          <h1>Sofiane's World</h1>
          <p ref={textRef} className="cursor">
            {text}
            {isEnd ? "" : "|"}
          </p>
        </header>
        <main className="main">
          <div className="Presentation">
            <img src="https://img.icons8.com/ios/50/000000/marker.png" />
            <p>Paris, France</p>
            <div className="moi">
              <p>
                Je suis Sofiane et je suis passionné par l'informatique. J'ai 20
                ans et j'ai acquis une expérience dans la programmation notamment
                avec plusieurs stages. Je suis fier d'une fonctionnalité que
                j'ai développée pour le Crédit Agricole Assurance durant mon
                stage de 1ère année de BTS SNIR. Je suis constamment à la
                recherche de nouvelles opportunités pour gagner en expérience et
                pouvoir travailler dans ce que j'aime. N'hésitez pas à me
                contacter pour toutes questions que vous voudriez me poser.
                Merci de visiter mon site.
              </p>
            </div>
            <div className="social">
              <GitHubIcon
                onClick={() => window.open("https://github.com/SofianeBel")}
                style={{ fontSize: 40 }}
                sx={{ color: "purple" }}
              />
              <TwitterIcon
                onClick={() => window.open("https://twitter.com/siflaieshin")}
                style={{ fontSize: 40 }}
                sx={{ color: "purple" }}
              />
            </div>

            <div className="projects">
              <h2>Mes Projets</h2>
                <div className="project" onMouseOver={() => console.log("Hovered!")}></div>
              <ul>
                <li className="project">Prayer Times</li>
                <p>
                  Le projet consiste à utiliser une montre Natural Time et à
                  l'utiliser pour indiquer le moment de la prière, car dans
                  l'Islam, les prières sont définies par la direction du soleil
                  et de la lune.
                </p>
                <li className="project">The HYDE BOT</li>
                <p>
                  Son objectif est de vous aider dans votre routine sur Discord.
                </p>
                <li className="project">Projet 3</li>
              </ul>
            </div>
          </div>

          <h2>Mes Qualités</h2>
          <div className="skills">
            <ul>
              <li className="quality">Qualité 1</li>
              <li className="quality">Qualité 2</li>
              <li className="quality">Qualité 3</li>
            </ul>
          </div>

          <h2>Me Contacter</h2>
          <div className="contact">
            <p>
              Adresse e-mail : Sifly789@gmail.com
              <br />
              Numéro de téléphone : 0782620111
            </p>
          </div>
        </main>
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
