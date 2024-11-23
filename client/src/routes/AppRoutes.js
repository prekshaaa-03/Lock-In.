import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Auth from "../components/Auth"; // Adjust path to your Auth file
import Dashboard from "../components/Dashboard"; // Adjust path to your Dashboard file
import Calendar from "../components/Calendar";
import Library from "../components/Library";
import SplitScreen from "../components/SplitScreen";
import BreakPrompt from "../components/BreakPrompt";

function AppRoutes() {
  return (
    <Routes>
      {/* Route for login/signup */}
      <Route path="/" element={<Auth />} />

      {/* Route for the dashboard */}
      <Route path="/dashboard" element={<Dashboard />} />

      {/* Redirect for undefined routes */}
      <Route path="*" element={<Navigate to="/" />} />

      <Route path="/calendar" element={<Calendar />} />

      <Route path="/library" element={<Library />} />
      <Route path="/split-screen" element={<SplitScreen />} />
      <Route path="/breakprompt" element={<BreakPrompt />} />
    </Routes>
  );
}

export default AppRoutes;
