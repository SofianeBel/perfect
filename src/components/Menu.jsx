import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../Menu.css";

const DropdownMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="dropdown-menu">
      <button onClick={handleToggleMenu}>Toggle Menu</button>
      {isMenuOpen && (
        <ul className="menu-items">
          <li>
            <NavLink to="/">Acceuil</NavLink>
          </li>
          <li>
            <NavLink to="/about">À propos de moi</NavLink>
          </li>
          {/* Ajoutez d'autres liens si nécessaire */}
          <li>
            <NavLink to="/PrayersTime">Prayer Times</NavLink>
          </li>
        </ul>
      )}
    </div>
  );
};

export default DropdownMenu;
