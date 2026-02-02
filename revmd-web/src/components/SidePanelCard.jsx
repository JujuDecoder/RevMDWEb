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
          <h2 style={{ marginBottom: 30 }}>RevMD</h2>

          <nav>
            <NavItem to="/dashboard">Dashboard</NavItem>
            <NavItem to="/dashboard/reports">Reports</NavItem>
            <NavItem to="/dashboard/appeal">Appeal</NavItem>
            <NavItem to="/dashboard/accounts">Accounts</NavItem>
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
              <button
                onClick={() => setShowConfirm(false)}
                style={cancelBtn}
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                style={confirmBtn}
              >
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
        marginBottom: 6,
        borderRadius: 8,
        textDecoration: "none",
        fontWeight: 500,
        background: isActive ? "#1e293b" : "transparent",
        color: isActive ? "#fff" : "#94a3b8",
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
  background: "#020617",
  borderRight: "1px solid #1e293b",
  color: "#fff",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};

const logoutButton = {
  padding: "12px 16px",
  borderRadius: 8,
  border: "none",
  background: "#1e293b",
  color: "#f87171",
  fontWeight: 600,
  cursor: "pointer",
};

const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.6)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
};

const modal = {
  background: "#020617",
  padding: 24,
  borderRadius: 12,
  width: 320,
  color: "#fff",
  border: "1px solid #1e293b",
};

const cancelBtn = {
  flex: 1,
  padding: "10px",
  borderRadius: 8,
  border: "none",
  background: "#1e293b",
  color: "#94a3b8",
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
