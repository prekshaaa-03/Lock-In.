import React from "react";
import ReactDOM from "react-dom/client";  // Updated import for React 18
import "./index.css";
import AppRoutes from "./routes/AppRoutes";  // Import AppRoutes
import { BrowserRouter } from "react-router-dom";  // Import BrowserRouter

// Use createRoot for React 18
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AppRoutes />  {/* Use AppRoutes to handle all routes */}
  </BrowserRouter>
);
