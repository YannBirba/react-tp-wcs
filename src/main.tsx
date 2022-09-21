import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./assets/style.css";

const root = document.getElementById("root");
if (root) {
    ReactDOM.createRoot(root).render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
} else {
    console.error("root element not found");
    throw new Error("No root element found");
}
