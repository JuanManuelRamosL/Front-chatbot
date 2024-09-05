import { useState } from "react";
import axios from "axios";
import "./code.css";
import problemasDeProgramacion from "../preguntas/preguntasCodigo"; // Importa el array de preguntas

function Codeo() {
  // Estado para almacenar la pregunta actual
  const [currentQuestion, setCurrentQuestion] = useState(
    problemasDeProgramacion[
      Math.floor(Math.random() * problemasDeProgramacion.length)
    ]
  );
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [explanation, setExplanation] = useState("");
  const [error, setError] = useState("");

  // Función para cambiar la pregunta actual por una aleatoria
  const changeQuestion = () => {
    console.log("funcion cambiar preg");
    const randomQuestion =
      problemasDeProgramacion[
        Math.floor(Math.random() * problemasDeProgramacion.length)
      ];
    setCurrentQuestion(randomQuestion);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "https://back-chatbot.vercel.app/chat",
        {
          prompt: `Quiero que des un feedback para un ejercicio de programación. Este es el problema: "${currentQuestion}". El usuario dio esta respuesta: "${selectedAnswer}". Responde si lo resolvió bien o mal. Si lo resolvió bien, solo responde un "bien" o una felicitación corta, y proporciona sugerencias si lo resolvió mal.`,
        }
      );

      setExplanation(response.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Error generating explanation");
    }
  };

  return (
    <div className="code-container">
      <div className="code-header">
        <h1 className="code-title">Resuelve el siguiente problema:</h1>
        <h1 className="code-problem">{currentQuestion.problema}</h1>
        <h2 className="code-difficulty">{currentQuestion.dificultad}</h2>
        <h3 className="code-example">{currentQuestion.ej}</h3>
        <button className="code-button" onClick={changeQuestion}>
          Cambiar pregunta
        </button>
      </div>
      <form className="code-form" onSubmit={handleSubmit}>
        <textarea
          className="code-textarea"
          value={selectedAnswer}
          onChange={(e) => setSelectedAnswer(e.target.value)}
          placeholder="Escribe tu solución aquí..."
        ></textarea>
        <button className="code-submit" type="submit">
          Probar
        </button>
      </form>
      {error && <p className="code-error">{error}</p>}
      {explanation && <p className="code-explanation">{explanation}</p>}
    </div>
  );
}

export default Codeo;
