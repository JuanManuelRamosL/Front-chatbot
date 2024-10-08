import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Chat from "./pages/chat";
import Quiz from "./pages/preguntas";
import "./App.css";
import Nav from "./components/nav";
import Rank from "./pages/ranking";
import User from "./pages/usuario";
import Login from "./pages/loguin2";
import Codeo from "./pages/codeo";

function App() {
  return (
    <Router>
      <Nav></Nav>

      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/preguntas" element={<Quiz />} />
        <Route path="/rank" element={<Rank />} />
        <Route path="/user" element={<User />} />
        <Route path="/login" element={<Login />} />
        <Route path="/codeo" element={<Codeo />} />
      </Routes>
    </Router>
  );
}

export default App;
