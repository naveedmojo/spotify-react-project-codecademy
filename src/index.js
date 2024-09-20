import React from "react";
import { createRoot } from "react-dom/client"; // Import createRoot
import "./styles/index.css";
import App from "./components/App/App";

const container = document.getElementById("root");
const root = createRoot(container); // Create a root

root.render(<App />); // Render the App component
