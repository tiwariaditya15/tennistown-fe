import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { StateProvider } from "./context/StateProvider";
import { AuthenticationProvider } from "./context/AuthenticationProvider";
import { InteractionProvider } from "./context/InteractionProvider";
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthenticationProvider>
        <StateProvider>
          <InteractionProvider>
            <App />
          </InteractionProvider>
        </StateProvider>
      </AuthenticationProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
