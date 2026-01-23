import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Report";
import Appeal from "./pages/Appeal";
import Accounts from "./pages/Accounts";
import AdminLayout from "./components/AdminLayout";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <Routes>
      <Route path="/" element={<Login setToken={setToken} />} />

      <Route
        path="/dashboard"
        element={token ? <AdminLayout /> : <Navigate to="/" />}
      >
        <Route index element={<Dashboard />} />
        <Route path="reports" element={<Reports />} />
        <Route path="appeal" element={<Appeal />} />
        <Route path="accounts" element={<Accounts />} />
      </Route>
    </Routes>
  );
}
