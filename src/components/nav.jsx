import React, { useEffect } from "react";
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

  useEffect(() => {
    if (isAuthenticated && user) {
      const userData = {
        email: user.email,
        name: user.name,
      };

      dispatch(createUser(userData));
    }
  }, [isAuthenticated, user, dispatch]);
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
              className="nav-link-btn-l"
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
