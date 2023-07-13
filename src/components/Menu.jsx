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
      <button className="toggle-button" onClick={handleToggleMenu}>
        Open
      </button>
      <ul className={`menu-items ${isMenuOpen ? "open" : ""}`}>
        <li className="menu-item">
          <NavLink exact to="/" activeClassName="active">
            Accueil
          </NavLink>
        </li>
        <li className="menu-item">
          <NavLink to="/about" activeClassName="active">
            À propos de moi
          </NavLink>
        </li>
        <li className="menu-item">
          <NavLink to="/PrayersTime" activeClassName="active">
            Prayer Times
          </NavLink>
        </li>
      </ul>
      
    </div>
  );
};

export default DropdownMenu;
