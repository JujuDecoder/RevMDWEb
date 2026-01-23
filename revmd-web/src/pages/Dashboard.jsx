import React from "react";

function Dashboard() {
  return (
    <div style={container}>
      <h1 style={title}>Admin Dashboard</h1>
      <p style={subtitle}>
        This is the main dashboard page. Use the sidebar to navigate to reports,
        appeals, and accounts.
      </p>
    </div>
  );
}

const container = {
  color: "#e5e7eb",
};

const title = {
  fontSize: 28,
  fontWeight: 700,
  marginBottom: 8,
};

const subtitle = {
  fontSize: 14,
  color: "#9ca3af",
};

export default Dashboard;
