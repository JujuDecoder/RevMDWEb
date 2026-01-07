import { NavLink, useNavigate } from "react-router-dom";

export default function SidePanelCard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // clear auth
    navigate("/"); // go back to login
  };

  return (
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
