import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./chat.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../credenciales"; // Asegúrate de que este import coincida con la ubicación real del archivo

function Chat() {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const { user: auth0User, isAuthenticated: isAuth0Authenticated, isLoading } = useAuth0();
  const [firebaseUser, setFirebaseUser] = useState(null);
  const messagesEndRef = useRef(null);
  const usersListState = useSelector((state) => state.user.users_list);

  useEffect(() => {
    // Escuchar cambios en el estado de autenticación de Firebase
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
    });

    return () => unsubscribe(); // Limpia el observador cuando el componente se desmonta
  }, []);

  // Priorizar mostrar datos de Firebase si el usuario está autenticado con Firebase, de lo contrario, usar Auth0
  const currentUser = firebaseUser || auth0User;
  const isAuthenticated = !!currentUser;

  const authenticatedUserData = usersListState?.find(
    (userItem) => userItem.email === currentUser?.email
  );

  // Aquí puedes hacer un console.log de los datos obtenidos
  useEffect(() => {
    if (authenticatedUserData) {
      console.log(authenticatedUserData);
    }
  }, [authenticatedUserData]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!inputValue.trim()) {
      alert("Realiza una pregunta");
      return; // No enviar peticiones vacías
    }
    // Agrega la pregunta del usuario al historial de mensajes
    setMessages([...messages, { text: inputValue, sender: "user" }]);

    try {
      const response = await axios.post(
        "https://back-chatbot.vercel.app/chat",
        {
          prompt: inputValue,
        }
      );
      // Agrega la respuesta de la API al historial de mensajes
      setMessages([
        ...messages,
        { text: inputValue, sender: "user" },
        { text: response.data, sender: "bot" },
      ]);
    } catch (error) {
      console.error(error);
      setMessages([
        ...messages,
        { text: inputValue, sender: "user" },
        { text: "Error al realizar la petición", sender: "bot" },
      ]);
    }
    setInputValue(""); // Limpia el campo de entrada después de enviar
  };

  return (
    <div className="chat-container">
      <div className="chat-messages-container">
        <div className="container-bienvenida">
          <h2 className="bienvenida">Bienvenido</h2>
          <h2
            className="bienvenida-name"
            style={{ width: `${currentUser?.given_name?.length + 1}ch` }}
          >
            {currentUser?.given_name || currentUser?.nickname|| authenticatedUserData.name}
          </h2>
          <h2 className="subtitulo-bienbenida">¿En qué puedo ayudarte?</h2>
        </div>
        {messages.map((message, index) => (
          <div key={index} className={`chat-message ${message.sender}`}>
            <p>{message.text}</p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form className="chat-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="chat-input"
          placeholder="Escribe tu mensaje..."
        />
        <button type="submit" className="chat-submit">
          <span>Enviar</span>
        </button>
      </form>
    </div>
  );
}

export default Chat;
