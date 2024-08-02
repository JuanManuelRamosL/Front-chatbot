import React, { useState } from "react";
import axios from "axios";
import "./preguntas.css";
import questions from "../preguntas/preguntas";

const Quiz = () => {
  const getRandomQuestion = () => {
    const randomIndex = Math.floor(Math.random() * questions.length);
    return questions[randomIndex];
  };

  const [currentQuestion, setCurrentQuestion] = useState(getRandomQuestion());
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [explanation, setExplanation] = useState("");
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState(""); // Nuevo estado para la retroalimentación

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/chat", {
        prompt: `quiero que le expliques al usuario la mejor manera de resolver este problema ${currentQuestion.question} el usuario elijio esta opccion y es incorrecta ${selectedAnswer} y las opcciones eran ${currentQuestion.options} la explicacion debe ser breve`,
      });

      setExplanation(response.data);
      setError("");

      // Verifica si la respuesta es correcta
      if (selectedAnswer === currentQuestion.correctAnswer) {
        setFeedback("¡Respuesta correcta!");
      } else {
        setFeedback("Respuesta incorrecta. Inténtalo de nuevo.");
      }
    } catch (err) {
      console.error(err);
      setError("Error generating explanation");
    }
  };

  const handleNewQuestion = () => {
    setCurrentQuestion(getRandomQuestion());
    setSelectedAnswer("");
    setExplanation("");
    setError("");
    setFeedback(""); // Resetea el feedback
  };

  return (
    <div className="contenedor-preguntas">
      <h1 className="titulo">IAGym</h1>
      <form onSubmit={handleSubmit} className="form-ejercicios">
        <div className="horizontal-containers">
          <div className="container-ejercicio">
            <p
              style={{ whiteSpace: "pre-line", color: "#fff" }}
              className="ejercicio"
            >
              {currentQuestion.question}
            </p>
          </div>
          <div className="container-options">
            <p className="subtitulo">Select an answer:</p>
            {currentQuestion.options.map((option) => (
              <div key={option.id} className="option-respuesta">
                <input
                  type="radio"
                  id={option.id}
                  name="answer"
                  value={option.text}
                  checked={selectedAnswer === option.text}
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                  required
                  className="option-circle"
                />
                <label className="opccion" htmlFor={option.id}>
                  {option.text}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="container-buttons">
          <button type="submit" className="button">
            <span className="text">Enviar</span>
          </button>
          <button onClick={handleNewQuestion} className="button">
            {" "}
            <span className="text">Nueva Pregunta</span>
          </button>
        </div>
      </form>
      {feedback && (
        <div
          className={`fedback ${
            feedback.startsWith("¡Respuesta correcta!")
              ? "correcta"
              : "incorrecta"
          }`}
        >
          <h2 className="titulo-explicacion">{feedback}</h2>
        </div>
      )}

      {explanation && (
        <div className="container-explicacion">
          <h2 className="titulo-explicacion">Explicacion:</h2>
          <p className="respuesta">{explanation}</p>
        </div>
      )}
      {error && (
        <div>
          <h2>Error:</h2>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default Quiz;
