import React, { useEffect, useState } from "react";
import axios from "axios";
import "./preguntas.css";
import questionsJS from "../preguntas/preguntas"; // Preguntas de JavaScript
import questionsPY from "../preguntas/preguntasPY"; // Preguntas de Python
import { useDispatch, useSelector } from "react-redux";
import { sumaE, updateUser } from "../redux/userActions";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Quiz = () => {
  const [language, setLanguage] = useState("javascript"); // Estado para el lenguaje
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [explanation, setExplanation] = useState("");
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState(""); // Estado para la retroalimentación
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  // Selección de preguntas según el lenguaje
  const getQuestions = () => {
    return language === "javascript" ? questionsJS : questionsPY;
  };

  // Selección de pregunta aleatoria
  const getRandomQuestion = () => {
    const questions = getQuestions();
    const randomIndex = Math.floor(Math.random() * questions.length);
    return questions[randomIndex];
  };

  useEffect(() => {
    setCurrentQuestion(getRandomQuestion());
  }, [language]); // Cambiar la pregunta al cambiar el lenguaje

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "https://back-chatbot.vercel.app/chat",
        {
          prompt: `quiero que le expliques al usuario la mejor manera de resolver este problema ${currentQuestion.question} el usuario elijio esta opccion y es incorrecta ${selectedAnswer} y las opcciones eran ${currentQuestion.options} la explicacion debe ser breve`,
        }
      );

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

  useEffect(() => {
    if (feedback === "¡Respuesta correcta!" && user) {
      const userData = {
        email: user.email,
        puntaje: 2,
      };
      const email = {
        email: user.email,
      };
      dispatch(updateUser(userData));
      dispatch(sumaE(email));
    }
  }, [feedback, user, dispatch]);

  return (
    <div className="contenedor-preguntas">
      {/* Selector de lenguaje */}
      <div className="language-selector">
        <button
          className={`butonI ${language === "javascript" ? "active" : ""}`}
          onClick={() => setLanguage("javascript")}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/5968/5968292.png"
            alt="JavaScript"
            className="iconJS"
          />
          JavaScript
        </button>
        <button
          className={`butonI ${language === "python" ? "active" : ""}`}
          onClick={() => setLanguage("python")}
        >
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxe6IR3EKgALq0lEUvpW3GmPH8rpAv1cK0_w&s"
            alt="Python"
            className="iconJS"
          />
          Python
        </button>
      </div>

      {/* <h1 className="titulo">IAGym</h1> */}
      <form onSubmit={handleSubmit} className="form-ejercicios">
        <div className="horizontal-containers">
          <div className="container-ejercicio">
            <p
              style={{ whiteSpace: "pre-line", color: "#fff" }}
              className="ejercicio"
            >
              {currentQuestion?.question}
            </p>
          </div>
          <div className="container-options">
            <p className="subtitulo">Opciones</p>
            {currentQuestion?.options.map((option) => (
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
