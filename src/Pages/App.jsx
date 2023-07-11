import React from 'react';
import Menu from '../components/Menu';

const HomePage = () => {
  const localDate = new Date().getTime()

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
            <li>Projet 1</li>
            <li>Projet 2</li>
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
        <p>&copy; {new Date().getFullYear()} Sofiane's World. Tous droits réservés.</p>
      </footer>
    </div>
    </>
  );
};

export default HomePage;
