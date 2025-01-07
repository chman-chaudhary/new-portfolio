import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { CursorFollowerProvider } from "./context/CursorFollower.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CursorFollowerProvider>
      <App />
    </CursorFollowerProvider>
  </StrictMode>
);
