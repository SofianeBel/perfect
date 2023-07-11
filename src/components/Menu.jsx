import React, { useState } from 'react';

const Menu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`menu ${isMenuOpen ? 'menu-open' : ''}`}>
      <button className="menu-toggle" onClick={handleMenuToggle}>
        Toggle Menu
      </button>
      {<ul>
              <li><a href="/">Accueil</a></li>
              <li><a href="../Pages/About.jsx">À propos</a></li>
              <li><a href="/services">Projects</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul> }
    </nav>
  );
};

export default Menu;

