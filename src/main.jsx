import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";
const domain = import.meta.env.VITE_APP_DOMAIN;
import { Provider } from "react-redux";
import store from "./redux/store.js"; // Asegúrate de importar tu store correctamente

const clientid = import.meta.env.VITE_APP_CLIENT_ID;
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <Auth0Provider
        domain={domain}
        clientId={clientid}
        redirectUri={window.location.origin}
      >
        <App />
      </Auth0Provider>
    </Provider>
  </React.StrictMode>
);
