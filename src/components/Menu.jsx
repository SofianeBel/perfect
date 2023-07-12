import React, { useState } from "react";
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
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
      )}
    </div>
  );
};

export default DropdownMenu;
