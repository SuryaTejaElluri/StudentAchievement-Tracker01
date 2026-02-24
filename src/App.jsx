// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import StudentDashboard from "./components/StudentDashboard";
import AdminDashboard from "./components/AdminDashboard"; // <-- added

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/studentdashboard" element={<StudentDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />   {/* <-- added route */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
