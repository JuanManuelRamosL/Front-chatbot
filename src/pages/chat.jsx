import React, { useState } from "react";
import axios from "axios";
import "./chat.css";

function Chat() {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Agrega la pregunta del usuario al historial de mensajes
    setMessages([...messages, { text: inputValue, sender: "user" }]);

    try {
      const response = await axios.post("http://localhost:3000/chat", {
        prompt: inputValue,
      });
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
        {messages.map((message, index) => (
          <div key={index} className={`chat-message ${message.sender}`}>
            <p>{message.text}</p>
          </div>
        ))}
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
          Enviar
        </button>
      </form>
    </div>
  );
}

export default Chat;
