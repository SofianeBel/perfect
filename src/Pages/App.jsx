import React from "react";
import Menu from "../components/Menu";
import "../App.css";

//Variables

const HomePage = () => {
  const localDate = new Date().getTime();

  return (
    <>
      <Menu />
      <div className="homepage">
        <header>
          <h1>Sofiane's World</h1>
        </header>
        <main>
          <p>Heure local: </p>
          <section>
            <h2>Mes Projets</h2>
            <ul>
              <li>Muslin Prayer Natural Time</li>
              <p>
                The project is to use an Natural Time watch and you use it to
                give the moment for praying cause in Islam, the prayers are
                defined by the diretion of the sun and the moon.{" "}
              </p>
              <li>The HYDE BOT</li>
              <p>His got one goal, help you in your journeys on Discord.</p>
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
            &copy; {new Date().getFullYear()} Sofiane's World. Tous droits
            réservés.
          </p>
        </footer>
      </div>
    </>
  );
};

export default HomePage;
