import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

export default function NavBar() {
  return (
    <div>
      <nav>
        <div className="nav-items nav-container">
          <div className="logo">
            <a href="/">
              <h1>My Apps</h1>
            </a>
          </div>
          <ul>
            <li>
              <NavLink to="/">Tic Toc Toe</NavLink>
            </li>
            <li>
              <NavLink to="/todo">Todo</NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};
