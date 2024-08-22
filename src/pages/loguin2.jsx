import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import {
  register,
  login,
  loginWithGoogle,
  logout,
  subscribeToAuthChanges,
} from "../auth/servises";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../redux/userActions";
import "./loguin.css";

function Login() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // Nuevo campo para el nombre del usuario
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((user) => {
      setUser(user);
      if (user) {
        dispatch(createUser(user));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  const handleRegister = async () => {
    try {
      const userCredential = await register(email, password);
      const user = userCredential.user;

      const userData = {
        email: user.email,
        name: name || user.displayName || "", // Usa el nombre proporcionado o el displayName si no hay uno
        img: "https://img.freepik.com/vector-premium/icono-circulo-usuario-anonimo-ilustracion-vector-estilo-plano-sombra_520826-1931.jpg", // Imagen predeterminada si no hay photoURL
      };

      // Dispatch para guardar el usuario en el estado global
      dispatch(createUser(userData));
    } catch (error) {
      console.error("Error registering user", error);
    }
  };

  const handleLogin = async () => {
    try {
      const user = await login(email, password);
      console.log("User logged in successfully", user);
    } catch (error) {
      console.error("Error logging in", error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const userCredential = await loginWithGoogle();
      const user = userCredential.user; // Aquí está el objeto `user`

      console.log("User logged in with Google successfully");
      console.log("User Details:", user);

      const userData = {
        email: user.email,
        name: user.displayName,
        img: user.photoURL,
      };

      dispatch(createUser(userData));
    } catch (error) {
      console.error("Error logging in with Google", error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      console.log("User logged out successfully");
    } catch (error) {
      console.error("Error logging out", error);
    }
  };

  useEffect(() => {
    console.log(userState);
  }, [userState]);

  return (
    <div className="login-container">
      {user ? (
        <div className="welcome-container">
          <p className="welcome-text">Welcome, {user.displayName || name}</p>
          <img
            src={
              user.photoURL ||
              userState.user?.img ||
              "https://img.freepik.com/vector-premium/icono-circulo-usuario-anonimo-ilustracion-vector-estilo-plano-sombra_520826-1931.jpg"
            }
            alt="User avatar"
            className="user-avatar"
          />
          <p className="user-email">Email: {user.email}</p>
          <button className="btn btn-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <div className="container-general-form">
          <h1 className="title-registrer">Registrarse</h1>
          <div className="form-container">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
            />
            <button className="btn btn-login" onClick={handleLogin}>
              <span>Iniciar Sesión</span>
            </button>
            <button className="btn btn-register" onClick={handleRegister}>
              <span>Registrarse</span>
            </button>
            <div className="container-buttons-options">
              <button className="btn btn-google" onClick={handleGoogleLogin}>
                <svg
                  xmlns="https://www.w3.org/2000/svg"
                  width="35"
                  height="45"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                  className="svg-google"
                >
                  <path
                    fill="#4285F4"
                    d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"
                  ></path>
                  <path
                    fill="#34A853"
                    d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"
                  ></path>
                  <path
                    fill="#FBBC05"
                    d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z"
                  ></path>
                  <path
                    fill="#EA4335"
                    d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"
                  ></path>
                  <path fill="none" d="M2 2h44v44H2z"></path>
                </svg>
                <p className="text-button-google">Iniciar Sesión con Google</p>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
