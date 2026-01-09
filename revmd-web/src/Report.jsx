import { useState } from "react";

export default function AdminReports() {
  const [searchQuery, setSearchQuery] = useState(""); // To store the search input
  const [selectedStatus, setSelectedStatus] = useState(""); // To store the selected status filter
  const [reports] = useState([
    {
      id: "4001",
      mechanic: "Mario Santos",
      status: "Investigating",
      date: "2025-10-08 01:55:48 AM"
    },
    {
      id: "4002",
      mechanic: "Maria Santos",
      status: "To Review",
      date: "2025-10-07 04:09:30 PM"
    },
    {
      id: "4003",
      mechanic: "Roberto Reyes",
      status: "To Review",
      date: "2025-10-06 09:12:11 AM"
    },
    {
      id: "4004",
      mechanic: "Mark Dela Cruz",
      status: "Resolved",
      date: "2025-10-05 08:56:24 PM"
    }
  ]);

  // Filtering reports based on search input and selected status
  const filteredReports = reports.filter((r) => {
    const matchesSearch = r.mechanic.toLowerCase().includes(searchQuery.toLowerCase()) || r.id.includes(searchQuery);
    const matchesStatus = selectedStatus ? r.status === selectedStatus : true; // Apply status filter if selected
    return matchesSearch && matchesStatus;
  });

  return (
    <div style={styles.app}>
      {/* MAIN */}
      <main style={styles.main}>
        {/* TOP BAR */}
        <div style={styles.topBar}>
          <div style={styles.searchWrapper}>
            <input
              placeholder="Search"
              style={styles.search}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // Update search query on input change
            />
            <div style={styles.searchIcon}>
              {/* SVG Search Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="none"
                stroke="#94a3b8"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="16" y1="16" x2="20" y2="20" />
              </svg>
            </div>
          </div>
          <div style={styles.icons}>🔔 👤</div>
        </div>

        {/* PAGE */}
        <h1 style={styles.title}>User Reports</h1>

        {/* FILTERS */}
        <div style={styles.filters}>
          <select
            style={styles.select}
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)} // Update selected status
          >
            <option value="">All Status</option>
            <option value="Investigating">Investigating</option>
            <option value="To Review">To Review</option>
            <option value="Resolved">Resolved</option>
          </select>
          <input type="date" style={styles.select} />
          <input type="date" style={styles.select} />
        </div>

        {/* TABLE */}
        <div style={styles.tableWrap}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Case ID</th>
                <th style={styles.th}>Reported Mechanic</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Sent</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.map((r) => (
                <tr key={r.id} style={styles.tr}>
                  <td style={styles.td}>{r.id}</td>
                  <td style={styles.td}>{r.mechanic}</td>
                  <td style={styles.td}>
                    <span style={statusStyle(r.status)}>{r.status}</span>
                  </td>
                  <td style={styles.td}>{r.date}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={styles.footer}>
            Showing {filteredReports.length} of {reports.length} results
          </div>
        </div>
      </main>
    </div>
  );
}

const styles = {
  app: {
    display: "flex",
    minHeight: "100vh",
    background: "#020617",
    color: "#e5e7eb",
    fontFamily: "Inter, sans-serif"
  },

  /* MAIN */
  main: {
    flex: 1,
    padding: 24
  },

  topBar: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 24
  },

  searchWrapper: {
    display: "flex",
    alignItems: "center",
    position: "relative",
    width: "260px"
  },

  search: {
    background: "#1e293b",
    border: "none",
    padding: "10px 14px",
    borderRadius: 10,
    color: "#fff",
    width: "100%" // Ensure the input takes up the full width
  },

  searchIcon: {
    position: "absolute",
    right: 12,
    top: "50%",
    transform: "translateY(-50%)",
    color: "#94a3b8",
    fontSize: 18
  },

  icons: {
    fontSize: 18
  },

  title: {
    fontSize: 26,
    marginBottom: 20
  },

  filters: {
    display: "flex",
    gap: 12,
    marginBottom: 20
  },
  select: {
    background: "#1e293b",
    border: "none",
    padding: "10px 14px",
    borderRadius: 10,
    color: "#e5e7eb"
  },

  /* TABLE */
  tableWrap: {
    background: "#020617",
    borderRadius: 14,
    border: "1px solid #1e293b",
    overflow: "hidden"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse"
  },
  th: {
    background: "#020617",
    padding: 14,
    textAlign: "left",
    color: "#94a3b8",
    fontSize: 13
  },
  tr: {
    borderTop: "1px solid #1e293b"
  },
  td: {
    padding: 14,
    fontSize: 14
  },

  footer: {
    padding: 14,
    color: "#94a3b8",
    fontSize: 13
  }
};

const statusStyle = (status) => ({
  padding: "4px 12px",
  borderRadius: 999,
  fontSize: 12,
  background:
    status === "Investigating"
      ? "#1e3a8a"
      : status === "Resolved"
      ? "#064e3b"
      : "#3f3f46",
  color:
    status === "Investigating"
      ? "#93c5fd"
      : status === "Resolved"
      ? "#6ee7b7"
      : "#fde68a"
});
