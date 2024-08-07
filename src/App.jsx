import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Chat from "./pages/chat";
import Quiz from "./pages/preguntas";
import "./App.css";
import Nav from "./components/nav";
import Rank from "./pages/ranking";

function App() {
  return (
    <Router>
      <Nav></Nav>

      <Routes>
        {/*  <Route path="/" element={<Chat />} /> */}
        <Route path="/preguntas" element={<Quiz />} />
        <Route path="/" element={<Rank />} />
      </Routes>
    </Router>
  );
}

export default App;
