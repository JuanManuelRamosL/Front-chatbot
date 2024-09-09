import { useEffect, useState } from "react";
import axios from "axios";
import "./code.css";
import problemasDeProgramacion from "../preguntas/preguntasCodigo"; // Importa el array de preguntas
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { sumaE, updateUser } from "../redux/userActions";

function Codeo() {
  const [user, setUser] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(
    problemasDeProgramacion[
      Math.floor(Math.random() * problemasDeProgramacion.length)
    ]
  );
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [explanation, setExplanation] = useState("");
  const [error, setError] = useState("");
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
  // Función para cambiar la pregunta actual por una aleatoria
  const changeQuestion = () => {
    const randomQuestion =
      problemasDeProgramacion[
        Math.floor(Math.random() * problemasDeProgramacion.length)
      ];
    setCurrentQuestion(randomQuestion);
    setExplanation(""); // Limpiar la explicación anterior al cambiar de pregunta
    setError("");
    setSelectedAnswer(""); // Limpiar la respuesta anterior
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Usar la función de test del problema actual
    const isCorrect = currentQuestion.test(selectedAnswer);

    if (isCorrect) {
      setExplanation("¡Bien hecho! Tu respuesta es correcta.");
      setError("");
      if (user) {
        const userData = {
          email: user.email,
          puntaje: 5,
        };
        const email = {
          email: user.email,
        };
        dispatch(updateUser(userData));
        dispatch(sumaE(email));
      }
    } else {
      // Si la respuesta es incorrecta, llamar a la función de IA en el servidor
      try {
        const response = await axios.post(
          "https://back-chatbot.vercel.app/chat",
          {
            prompt: `Quiero que des un feedback para un ejercicio de programación. Este es el problema: "${currentQuestion.problema}". El usuario dio esta respuesta: "${selectedAnswer}". Responde si lo resolvió bien o mal. Si lo resolvió bien, solo responde un "bien" o una felicitación corta, y proporciona sugerencias si lo resolvió mal.`,
          }
        );

        setExplanation(response.data);
        setError("");
      } catch (err) {
        console.error(err);
        setError("Error generating explanation");
      }
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
