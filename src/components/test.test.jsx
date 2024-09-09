import { render, screen, userEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../redux/store.js";
import Chat from "../pages/chat";

describe("Chat component", () => {
  it("envia un mensaje correctamente", () => {
    render(
      <Provider store={store}>
        <Chat />
      </Provider>
    );

    const input = screen.getByRole("textbox");
    const sendButton = screen.getByRole("button", { name: "Enviar" });

    userEvent.type(input, "Hola!");
    userEvent.click(sendButton);

    // Verifica que el mensaje se haya agregado a la lista de mensajes
    const messageList = screen.getByRole("list");
    const message = screen.getByText("Hola!");
    expect(messageList).toContainElement(message);
  });
});
