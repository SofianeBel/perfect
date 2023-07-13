import React from "react";
import Menu from "../components/Menu";
import "../App.css";

const HomePage = () => {
  return (
    <>
      <Menu />
      <div className="homepage">
        <header>
          <h1>Sofiane's World</h1>
        </header>
        <main>
          <section>
            <h2>Mes Projets</h2>
            <ul>
              <li>Muslin Prayer Natural Time</li>
              <p>
                Le projet consiste à utiliser une montre Natural Time et à
                l'utiliser pour indiquer le moment de la prière, car en Islam,
                les prières sont définies par la direction du soleil et de la
                lune.
              </p>
              <li>The HYDE BOT</li>
              <p>
                Son objectif est de vous aider dans vos voyages sur Discord.
              </p>
              <li>Projet 3</li>
            </ul>
          </section>
          <section>
            <h2>Mes Qualités</h2>
            <ul>
              <li>Qualité 1</li>
              <li>Qualité 2</li>
              <li>Qualité 3</li>
            </ul>
          </section>
          <section>
            <h2>Me Contacter</h2>
            <p>Adresse e-mail : Sifly789@gmail.com</p>
            <p>Numéro de téléphone : 0782620111</p>
          </section>
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
