import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./Nav.css";
import Logo from "./logo";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../redux/userActions";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  register,
  login,
  loginWithGoogle,
  logout,
  subscribeToAuthChanges,
} from "../auth/servises";
function Nav() {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user2, setUser2] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser2(user);
        const userData = {
          email: user.email,
          name: user.displayName,
          img:
            user.photoURL ||
            "https://img.freepik.com/vector-premium/icono-circulo-usuario-anonimo-ilustracion-vector-estilo-plano-sombra_520826-1931.jpg",
        };
        dispatch(createUser(userData));
      } else {
        setUser2(null);
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  /*  const handleLogout = async () => {
    const auth = getAuth();
    await auth.signOut();
    setUser2(null);
    console.log("User logged out successfully");
  }; */
  const handleLogout = async () => {
    try {
      await logout();
      console.log("User logged out successfully");
    } catch (error) {
      console.error("Error logging out", error);
    }
  };

  return (
    <nav className="navbar">
      <div className="container-logo">
        <h1 className="titulo">CodeForge</h1>
        <Logo></Logo>
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
          <Link to="/codeo" className="nav-link" onClick={toggleMenu}>
            Codear
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/rank" className="nav-link" onClick={toggleMenu}>
            Rank
          </Link>
        </li>
        {user2 ? (
          <>
            <li className="nav-item">
              {/*     <button className="nav-link-btn" onClick={handleLogout}>
                Log Out
              </button> */}
              <button className="nav-link-btn" onClick={handleLogout}>
                logout
              </button>
            </li>
            <li className="nav-item">
              <div className="user-info">
                <Link to="/user">
                  <img
                    src={
                      user2.photoURL ||
                      userState.user?.img ||
                      "https://img.freepik.com/vector-premium/icono-circulo-usuario-anonimo-ilustracion-vector-estilo-plano-sombra_520826-1931.jpg"
                    }
                    alt={user2.displayName || "user"}
                    className="user-img"
                  />
                </Link>
              </div>
            </li>
          </>
        ) : (
          <li className="nav-item">
            {/*    <button className="nav-link-btn" onClick={toggleMenu}>
              Login
            </button> */}
            <Link to="/login" className="nav-link">
              <button className="nav-link-btn">Login</button>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Nav;
