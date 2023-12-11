import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../Menu.css";

const DropdownMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="menu">
      <button
        className={`menu-button ${isMenuOpen ? "open" : ""}`}
        onClick={handleToggleMenu}
      >
        <span>Menu</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-chevron-down"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M1.646.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L2.354 8.208a.5.5 0 0 1-.708-.708L1.646.646zM8 1a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-.5.5l-6 6a.5.5 0 0 1-.708-.708L7.293 8a.5.5 0 0 1 .708-.708L8 1a.5.5 0 0 1 .5-.5z"
          />
        </svg>
      </button>
      <ul className={`menu-items ${isMenuOpen ? "open" : ""}`}>
        <li className="menu-item">
          <NavLink to="/" exact activeClassName="active">
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
            Horaire de prière
          </NavLink>
        </li>
        <li className="menu-item">
          <NavLink to="/To_Do_List" activeClassName="active">
            Ma liste de tâches
          </NavLink>
        </li>
        <li className="menu-item">
          <NavLink to="/WheaterApp" activeClassName="active">
            Météo
          </NavLink>
        </li>
        <li className="menu-item">
          <NavLink to="/TwoBro" activeClassName="active">
            Les deux frères
          </NavLink>
        </li>
        <li className="menu-item">
          <NavLink to="/FuelPrice" activeClassName="active">
            Prix de l'essence
          </NavLink>
        </li>
        <li className="menu-item">
          <NavLink to="/Projects" activeClassName="active">
            Projets
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default DropdownMenu;
