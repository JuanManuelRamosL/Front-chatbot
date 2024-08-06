import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import "./Nav.css";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../redux/userActions";

function Nav() {
  const { loginWithRedirect, logout } = useAuth0();
  const { user, isAuthenticated, isLoading } = useAuth0();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user) {
      const userData = {
        email: user.email,
        name: user.name,
      };

      dispatch(createUser(userData));
    }
  }, [isAuthenticated, user, dispatch]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="container-logo">
        <h1 className="titulo">CodeForge</h1>
      </div>
      <div className="container-button-toggle-menu">
        <input
          type="checkbox"
          id="checkbox"
          checked={isMenuOpen}
          onClick={toggleMenu}
        />
        <label htmlFor="checkbox" className="toggle">
          <div className="bars" id="bar1"></div>
          <div className="bars" id="bar2"></div>
          <div className="bars" id="bar3"></div>
        </label>
      </div>
      <ul className={`nav-list ${isMenuOpen ? "open" : ""}`}>
        <li className="nav-item">
          <Link to="/" className="nav-link" onClick={toggleMenu}>
            Chat
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/preguntas" className="nav-link" onClick={toggleMenu}>
            Ejercicios
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/rank" className="nav-link" onClick={toggleMenu}>
            Rank
          </Link>
        </li>
        {user ? (
          <>
            <li className="nav-item">
              <button
                className="nav-link-btn"
                onClick={() =>
                  logout({ logoutParams: { returnTo: window.location.origin } })
                }
              >
                Log Out
              </button>
            </li>
            <li className="nav-item">
              <div className="user-info">
                <img src={user.picture} alt={user.name} className="user-img" />
              </div>
            </li>
          </>
        ) : (
          <li className="nav-item">
            <button
              className="nav-link-btn"
              onClick={() => loginWithRedirect()}
            >
              Login
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Nav;
