import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SidePanelCard() {
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleLogout = () => {
    setShowConfirm(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <div style={sidePanel}>
        {/* TOP */}
        <div>
          <h2
            style={{
              marginBottom: 30,
              fontWeight: 700,
              color: "#1d4ed8", // blue brand color
            }}
          >
            RevMD
          </h2>

          <nav>
            <NavItem to="/dashboard">Dashboard</NavItem>
            <NavItem to="/dashboard/reports">Reports</NavItem>
            <NavItem to="/dashboard/appeal">Appeal</NavItem>
            <NavItem to="/dashboard/accounts">Accounts</NavItem>
            <NavItem to="/dashboard/appointments">Appointments</NavItem>
          </nav>
        </div>

        {/* BOTTOM */}
        <button onClick={handleLogout} style={logoutButton}>
          Logout
        </button>
      </div>

      {/* CONFIRM MODAL */}
      {showConfirm && (
        <div style={overlay}>
          <div style={modal}>
            <h3>Confirm Logout</h3>
            <p>Are you sure you want to log out?</p>

            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              <button onClick={() => setShowConfirm(false)} style={cancelBtn}>
                Cancel
              </button>
              <button onClick={confirmLogout} style={confirmBtn}>
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ---------- NAV ITEM ---------- */

function NavItem({ to, children }) {
  return (
    <NavLink
      to={to}
      end
      style={({ isActive }) => ({
        display: "block",
        padding: "12px 16px",
        marginBottom: 8,
        borderRadius: 10,
        textDecoration: "none",
        fontWeight: 500,
        transition: "all 0.2s ease",

        background: isActive ? "#eff6ff" : "transparent",
        color: isActive ? "#1d4ed8" : "#6b7280",
        border: isActive ? "1px solid #dbeafe" : "1px solid transparent",
      })}
    >
      {children}
    </NavLink>
  );
}

/* ---------- STYLES ---------- */

const sidePanel = {
  width: 240,
  padding: 24,
  background: "#ffffff", // white sidebar
  borderRight: "1px solid #e5eaf2", // soft border
  color: "#1f2937",

  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  height: "100vh",
};

const logoutButton = {
  padding: "12px 16px",
  borderRadius: 10,
  border: "1px solid #e5eaf2",
  background: "#f9fafb",
  color: "#ef4444",
  fontWeight: 600,
  cursor: "pointer",
  marginBottom: 40,
};

const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.3)", // lighter overlay
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
};

const modal = {
  background: "#ffffff",
  padding: 28,
  borderRadius: 16,
  width: 340,
  color: "#1f2937",
  border: "1px solid #e5eaf2",
  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
};

const cancelBtn = {
  flex: 1,
  padding: "10px",
  borderRadius: 8,
  border: "1px solid #e5eaf2",
  background: "#f3f4f6",
  color: "#6b7280",
  cursor: "pointer",
};

const confirmBtn = {
  flex: 1,
  padding: "10px",
  borderRadius: 8,
  border: "none",
  background: "#ef4444",
  color: "#fff",
  fontWeight: 600,
  cursor: "pointer",
};
