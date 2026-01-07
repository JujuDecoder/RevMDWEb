import { useState } from "react";
import "./index.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Login failed");

      localStorage.setItem("token", data.token);
      alert("Login successful!");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={pageStyle}>
      {/* MODAL */}
      <div style={modalStyle}>
        
        {/* LEFT SIDE */}
        <div style={leftSide}>
          <h1 style={{ marginBottom: 12 }}>RevMD</h1>
          <p style={{ opacity: 0.8 }}>
            Welcome back.  
            <br />
            Please login to continue.
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div style={rightSide}>
          <h2 style={{ marginBottom: 20 }}>Login</h2>

          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={inputStyle}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={inputStyle}
            />

            <button type="submit" style={buttonStyle}>
              Login
            </button>
          </form>

          {error && <p style={errorStyle}>{error}</p>}
        </div>

      </div>
    </div>
  );
}

/* ---------- STYLES ---------- */

const pageStyle = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "linear-gradient(135deg, #020617, #1e293b)",
};

const modalStyle = {
  width: 800,
  height: 420,
  display: "flex",
  borderRadius: 16,
  overflow: "hidden",
  background: "#f8fafc",
  boxShadow: "0 30px 80px rgba(0,0,0,0.85)"
};

const leftSide = {
  flex: 1,
  padding: 40,
    background: "linear-gradient(135deg, #020617, #0f172a)",

  color: "#fff",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center"
};

const rightSide = {
  flex: 1,
  padding: 40,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center"
};

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  marginBottom: 14,
  borderRadius: 8,
  border: "1px solid #cbd5f5",
  fontSize: 14
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: 8,
  border: "none",
  background: "#0f172a",
  color: "#fff",
  fontWeight: "bold",
  cursor: "pointer"
};

const errorStyle = {
  marginTop: 12,
  color: "#dc2626",
  fontSize: 14
};
