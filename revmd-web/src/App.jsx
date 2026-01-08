import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Login from "./Login";
import Dashboard from "./Dashboard";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <Routes>
      <Route path="/" element={<Login setToken={setToken} />} />

      <Route
        path="/dashboard/*"
        element={token ? <Dashboard /> : <Navigate to="/" />}
      />
    </Routes>
  );
}
