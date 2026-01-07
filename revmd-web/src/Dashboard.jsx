import { Routes, Route } from "react-router-dom";
import SidePanelCard from "./SidePanelCard";
import Reports from "./Report";
import Appeal from "./Appeal";
import Accounts from "./Accounts";

export default function Dashboard() {
  return (
    <div style={layout}>
      {/* LEFT NAV */}
      <SidePanelCard />

      {/* RIGHT CONTENT */}
      <div style={content}>
        <Routes>
          {/* DASHBOARD / HOME */}
          <Route
            path="/"
            element={
              <div>
                <h1>Dashboard</h1>
                <p>Welcome to the RevMD Admin Dashboard.</p>
              </div>
            }
          />

          <Route path="reports" element={<Reports />} />
          <Route path="appeal" element={<Appeal />} />
          <Route path="accounts" element={<Accounts />} />

        </Routes>
      </div>
    </div>
  );
}

/* ---------- STYLES ---------- */

const layout = {
  display: "flex",
  minHeight: "100vh",
  background: "#020617",
};

const content = {
  flex: 1,
  padding: 32,
  color: "#e5e7eb",
};
