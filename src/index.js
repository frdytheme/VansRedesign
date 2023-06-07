import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Reset } from "styled-reset";
import { HashRouter } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HashRouter>
      <Reset />
      <GlobalStyles />
      <App />
    </HashRouter>
  </React.StrictMode>
);
