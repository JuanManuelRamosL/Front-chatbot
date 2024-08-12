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

      console.log("User registered successfully", user);

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
          <p className="user-provider">Provider: {userState.providerId}</p>
          <button className="btn btn-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
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
            Login
          </button>
          <button className="btn btn-register" onClick={handleRegister}>
            Register
          </button>
          <button className="btn btn-google" onClick={handleGoogleLogin}>
            <img
              src="https://cdn2.hubspot.net/hubfs/53/image8-2.jpg"
              alt="Google logo"
              className="google-logo"
            />
          </button>
        </div>
      )}
    </div>
  );
}

export default Login;
