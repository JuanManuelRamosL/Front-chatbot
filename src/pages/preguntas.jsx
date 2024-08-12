import React, { useEffect, useState } from "react";
import axios from "axios";
import "./preguntas.css";
import questions from "../preguntas/preguntas";
import { useDispatch, useSelector } from "react-redux";
import { sumaE, updateUser } from "../redux/userActions";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Quiz = () => {
  const getRandomQuestion = () => {
    const randomIndex = Math.floor(Math.random() * questions.length);
    return questions[randomIndex];
  };

  const [currentQuestion, setCurrentQuestion] = useState(getRandomQuestion());
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [explanation, setExplanation] = useState("");
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState(""); // Estado para la retroalimentación
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

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
      <div className="card">
        <div className="wrap">
          <div className="terminal">
            <hgroup className="head">
              <p className="title">
                <svg
                  width="16px"
                  height="16px"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                >
                  <path d="M7 15L10 12L7 9M13 15H17M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z"></path>
                </svg>
                Terminal
              </p>

              <button className="copy_toggle" tabIndex="-1" type="button">
                <svg
                  width="16px"
                  height="16px"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                >
                  <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2"></path>
                  <path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z"></path>
                </svg>
              </button>
            </hgroup>

            <div className="body">
              <pre className="pre">
                {" "}
                <code>-&nbsp;</code>
                <code>npx&nbsp;</code>
                <code className="cmd" data-cmd="Probá tus Conocimientos"></code>
              </pre>
            </div>
          </div>
        </div>
      </div>
      {/* <h1 className="titulo">IAGym</h1> */}
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
            <p className="subtitulo">Opciones</p>
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
