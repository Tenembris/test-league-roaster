import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/champions">Champions</Link>
        </li>
        <li>
          <Link to="/items">Items</Link>
        </li>

        <li>
          <Link to="/runes">Runes</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
