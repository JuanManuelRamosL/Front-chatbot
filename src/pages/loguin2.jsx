import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import {
  register,
  login,
  loginWithGoogle,
  logout,
  subscribeToAuthChanges,
} from "../auth/servises";
import { useDispatch } from "react-redux";
import { createUser } from "../redux/userActions";

function Login() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

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
      const user = await register(email, password);
      console.log("User registered successfully", user);
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
      const user = await loginWithGoogle();
      console.log("User logged in with Google successfully", user);
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

  return (
    <div>
      {user ? (
        <div>
          <p>Welcome, {user.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
          <button onClick={handleRegister}>Register</button>
          <button onClick={handleGoogleLogin}>Login with Google</button>
        </div>
      )}
    </div>
  );
}

export default Login;
