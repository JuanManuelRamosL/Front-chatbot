import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import "./Nav.css";

function Nav() {
  return (
    <nav className="navbar">
      <div className="container-logo">
        <h1 className="titulo">IAGym</h1>
      </div>
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Chat
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/preguntas" className="nav-link">
            Ejercicios
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
