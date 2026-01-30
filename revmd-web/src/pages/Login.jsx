import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.js";

// 👁️ ICONS
import showIcon from "../show.png";
import hideIcon from "../hide.png";
import revLogo from "../rev-logo.png";

export default function Login({ setToken }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // 👁️ SHOW / HIDE PASSWORD
  const [showPassword, setShowPassword] = useState(false);

 const handleLogin = async (e) => {
  e.preventDefault();
  setError("");

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const token = await userCredential.user.getIdToken();

    localStorage.setItem("token", token);
    setToken(token);

    navigate("/dashboard");
  } catch (err) {
    setError("Invalid email or password");
  }
};

  return (
    <div style={pageStyle}>
      <div style={modalStyle}>
        <div style={leftSide}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6, // logo ↔ text spacing (unchanged)
              marginBottom: 1, // reduced gap BELOW logo
            }}
          >
            <img
              src={revLogo}
              alt="RevMD logo"
              style={{
                width: 100,
                height: 100,
                borderRadius: "50%",
              }}
            />
            <h1 style={{ margin: 0 }}>RevMD</h1>
          </div>

          <p style={{ opacity: 0.8, marginTop: 4 }}>
            Welcome back.
            <br />
            Please login to continue.
          </p>
        </div>

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
{/* PASSWORD WITH EYE ICON */}
<div
  style={{
    position: "relative",
    width: "100%",
    marginBottom: 14,
  }}
>
  <input
    type={showPassword ? "text" : "password"}
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    required
    style={{
      ...inputStyle,
      marginBottom: 0,
      paddingRight: 44, // space for icon
      boxSizing: "border-box",
    }}
  />

  <img
    src={showPassword ? hideIcon : showIcon}
    alt="Toggle password visibility"
    onClick={() => setShowPassword(!showPassword)}
    style={{
      position: "absolute",
      right: 12,
      top: "50%",
      transform: "translateY(-50%)",
      width: 18,
      height: 18,
      cursor: "pointer",
      opacity: 0.8,
    }}
  />
</div>

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
  background: `
    radial-gradient(circle at top, rgba(255,255,255,0.08), transparent 55%),
    linear-gradient(135deg, #020617 0%, #1E293B 60%, #475569 100%)
  `,
  filter: "contrast(1.05) saturate(1.05)",
};

const modalStyle = {
  width: 800,
  height: 420,
  display: "flex",
  borderRadius: 16,
  overflow: "hidden",
  background: "#f8fafc",
  boxShadow: "0 30px 80px rgba(0,0,0,0.85)",
};

const leftSide = {
  flex: 1,
  padding: 40,
  background: "linear-gradient(135deg, #020617 0%, #0F172A 100%)",
  color: "#fff",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
};

const rightSide = {
  flex: 1,
  padding: 40,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
};

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  marginBottom: 14,
  borderRadius: 8,
  border: "1px solid #cbd5f5",
  fontSize: 14,
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: 8,
  border: "none",
  background: "#0f172a",
  color: "#fff",
  fontWeight: "bold",
  cursor: "pointer",
};

const errorStyle = {
  marginTop: 12,
  color: "#dc2626",
  fontSize: 14,
};

