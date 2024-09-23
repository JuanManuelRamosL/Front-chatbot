import { render, screen } from "@testing-library/react";
import { expect, test, describe } from "vitest";
import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "../redux/rootReducer";
import { MemoryRouter } from "react-router-dom"; // Importar MemoryRouter para el test
import Logo from "./logo";
import Nav from "./nav";
import questionsPY from "../preguntas/preguntasPY";

// Configuración del store de Redux
const store = createStore(rootReducer);

// Pruebas del componente Chat
describe("Chat component", () => {
  test("prueba básica", () => {
    expect(1 + 1).toBe(2);
  });

  test("renderiza el componente Logo", () => {
    render(<Logo />);
    // Puedes añadir más expectativas aquí si quieres verificar el contenido de Logo
  });
});

// Test para renderizar el componente Nav
test("renders nav component", () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        {" "}
        {/* Proveer un Router para los componentes que dependen de react-router-dom */}
        <Nav />
      </MemoryRouter>
    </Provider>
  );
  expect(screen.getByText(/CodeForge/i)).toBeInTheDocument();
});

test("verifica si una pregunta específica está presente en el array", () => {
  // El texto de la pregunta que deseas buscar
  const preguntaBuscada = `¿Qué imprime el siguiente código Python?\n\ndef invertir_cadena(cadena):\n    return cadena[::-1]\n\nresultado = invertir_cadena("hola mundo")\n\nprint(resultado)`;
  // Usar el método 'some' para comprobar si la pregunta está en el array
  const existePregunta = questionsPY.some(
    (q) => q.question === preguntaBuscada
  );
  const pregunta = questionsPY.find((q) => q.question === preguntaBuscada);
  // Expectativa: Verificar que la pregunta esté presente
  expect(existePregunta).toBe(true);
  expect(pregunta.correctAnswer).toBe("odnum aloh");
});
