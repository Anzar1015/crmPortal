import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { SearchProvider } from "./SearchContext.jsx";
import { ModalProvider } from "./ModalContext.jsx";
import { ThemeProvider } from "./ThemeContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  <ModalProvider>
    <SearchProvider>
      <SnackbarProvider>
      <ThemeProvider>
        <App />
        </ThemeProvider>
      </SnackbarProvider>
    </SearchProvider>
    </ModalProvider>
  </BrowserRouter>
);
