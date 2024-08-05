import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./chat.css";
import { useAuth0 } from "@auth0/auth0-react";

function Chat() {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const { user, isAuthenticated, isLoading } = useAuth0();
  const messagesEndRef = useRef(null);

  // const [width, setWidth] = useState(0);

  console.log(user);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSubmit = async (event) => {
    event.preventDefault();

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

  console.log(user?.given_name?.length);

  return (
    <div className="chat-container">
      <div className="chat-messages-container">
        <h1 className="bienvenida">
          Bienvenido
        </h1>
        <h1
          className="bienvenida-name"
          style={{ width: `${user?.given_name.length + 1}ch` }}
        >
          {user?.given_name}
        </h1>
        <h2 className="subtitulo-bienbenida">¿En qué puedo ayudarte?</h2>
        {messages.map((message, index) => (
          <div key={index} className={`chat-message ${message.sender}`}>
            <p>{message.text}</p>
            {/* <small className="horario-message">18:30hs</small> */}
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
