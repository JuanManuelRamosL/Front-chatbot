import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Chat from "./pages/chat";
import Quiz from "./pages/preguntas";
import "./App.css";
import Nav from "./components/nav";

function App() {
  return (
    <Router>
      <div>
        <Nav></Nav>

        <Routes>
          <Route path="/" element={<Chat />} />
          <Route path="/preguntas" element={<Quiz />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
