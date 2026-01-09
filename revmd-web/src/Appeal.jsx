import React, { useState } from 'react';
import Archive from './Modals/Archive.jsx'; // Import the Archive Modal
import AppealChat from './Modals/AppealChat'; // Import the AppealChat modal

export default function Appeals() {
  const [searchQuery, setSearchQuery] = useState(""); // To store the search input
  const [selectedStatus, setSelectedStatus] = useState(""); // To store the selected status filter
  const [reports, setReports] = useState([
    {
      id: "4001",
      mechanic: "Mario Santos",
      status: "Investigating",
      date: "2025-10-08 01:55:48 AM"
    },
    {
      id: "4002",
      mechanic: "Maria Santos",
      status: "Declined",
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
  const [archivedReports, setArchivedReports] = useState([]); // To store archived reports
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [showChatModal, setShowChatModal] = useState(false); // State to control chat modal visibility
  const [currentAppeal, setCurrentAppeal] = useState(null); // To store the current appeal for chat

  // Filtering reports based on search input and selected status
  const filteredReports = reports.filter((r) => {
    const matchesSearch = r.mechanic.toLowerCase().includes(searchQuery.toLowerCase()) || r.id.includes(searchQuery);
    const matchesStatus = selectedStatus ? r.status === selectedStatus : true; // Apply status filter if selected
    return matchesSearch && matchesStatus;
  });

  // Archive function to store reports
  const archiveReport = (reportId) => {
    const reportToArchive = reports.find((r) => r.id === reportId);
    setArchivedReports((prevArchived) => [...prevArchived, reportToArchive]);
    setReports(reports.filter((r) => r.id !== reportId)); // Remove archived report from active list
  };

  // Open the chat modal
  const openChatModal = (appeal) => {
    setCurrentAppeal(appeal);
    setShowChatModal(true);
  };

  // Close the chat modal
  const closeChatModal = () => {
    setShowChatModal(false);
  };

  // Toggle Modal visibility
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div style={styles.app}>
      {/* MAIN */}
      <main style={styles.main}>
        <h1 style={styles.title}>Appeals</h1>

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
            <option value="Declined">Declined</option>
          </select>
          <input type="date" style={styles.select} />
        </div>

        {/* TABLE */}
        <div style={styles.tableWrap}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Appeal ID</th>
                <th style={styles.th}>Mechanic ID and Name</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.map((r) => (
                <tr key={r.id} style={styles.tr} onClick={() => openChatModal(r)}>
                  <td style={styles.td}>{r.id}</td>
                  <td style={styles.td}>{r.mechanic}</td>
                  <td style={styles.td}>
                    <span style={statusStyle(r.status)}>{r.status}</span>
                  </td>
                  <td style={styles.td}>{r.date}</td>
                  <td style={styles.td}>
                    <button style={styles.archiveButton} onClick={(e) => {
                      e.stopPropagation(); // Prevent row click event from firing
                      archiveReport(r.id);
                    }}>
                      Archive
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={styles.footer}>
            Showing {filteredReports.length} of {reports.length} results
          </div>
        </div>

        <button style={styles.archivePageButton} onClick={toggleModal}>
          View Archived Appeals
        </button>

        {/* Modal for Archived Appeals */}
        {showModal && <Archive archivedReports={archivedReports} onClose={toggleModal} />}

        {/* Chat Modal for Appeal */}
        {showChatModal && currentAppeal && <AppealChat appeal={currentAppeal} onClose={closeChatModal} />}
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
    borderTop: "1px solid #1e293b",
    cursor: "pointer" // Add pointer cursor to make rows clickable
  },

  td: {
    padding: 14,
    fontSize: 14
  },

  footer: {
    padding: 14,
    color: "#94a3b8",
    fontSize: 13
  },

  archiveButton: {
    background: "#f87171",
    border: "none",
    padding: "6px 12px",
    color: "#fff",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px"
  },

  archivePageButton: {
    background: "#6ee7b7",
    padding: "10px 14px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    marginTop: "20px"
  }
};

// Updated status style for "Declined"
const statusStyle = (status) => ({
  padding: "4px 12px",
  borderRadius: 999,
  fontSize: 12,
  background:
    status === "Investigating"
      ? "#1e3a8a"
      : status === "Resolved"
      ? "#064e3b"
      : status === "Declined"
      ? "#ef4444"  // Red for Declined
      : "#3f3f46", // Default color for other statuses
  color:
    status === "Investigating"
      ? "#93c5fd"
      : status === "Resolved"
      ? "#6ee7b7"
      : status === "Declined"
      ? "#fef2f2" // Light red for text in Declined status
      : "#fde68a" // Default color for other statuses
});
