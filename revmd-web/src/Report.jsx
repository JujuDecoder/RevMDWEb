import { useState } from "react";

export default function AdminReports() {
  const [searchQuery, setSearchQuery] = useState(""); // To store the search input
  const [selectedStatus, setSelectedStatus] = useState(""); // To store the selected status filter
  const [selectedCase, setSelectedCase] = useState(null); // To store the selected case for the modal
  const [reports] = useState([
    {
      id: "4001",
      mechanic: "Mario Santos",
      status: "Investigating",
      date: "2025-10-08 01:55:48 AM",
      report: "Hi, I’d like to report a mechanic I recently talked through the app...\nThe mechanic, Mark Dela Cruz, arrived late by almost 2 hours and seemed unprepared for the repair. He didn’t bring the proper tools and ended up leaving the job unfinished. I also noticed that the service charge was different from what we agreed upon in the chat.\nPlease look into this issue. I just want to make sure that other users won’t experience the same problem. I’ve attached a few screenshots of our conversation and a photo of the unfinished work.",
      files: [
        { name: "Chat Screenshot.png", size: "465 KB" },
        { name: "screenshot3.png", size: "938 KB" },
        { name: "unfinished.photo.jpg", size: "1.02 MB" }
      ]
    },
    {
      id: "4002",
      mechanic: "Maria Santos",
      status: "To Review",
      date: "2025-10-07 04:09:30 PM",
      report: "Another issue with a mechanic arriving late and leaving the job unfinished..."
    },
    {
      id: "4003",
      mechanic: "Roberto Reyes",
      status: "To Review",
      date: "2025-10-06 09:12:11 AM",
      report: "The mechanic did not bring proper tools and was not very professional."
    },
    {
      id: "4004",
      mechanic: "Mark Dela Cruz",
      status: "Resolved",
      date: "2025-10-05 08:56:24 PM",
      report: "The mechanic completed the work but was delayed by a few hours."
    }
  ]);

  // Filtering reports based on search input and selected status
  const filteredReports = reports.filter((r) => {
    const matchesSearch = r.mechanic.toLowerCase().includes(searchQuery.toLowerCase()) || r.id.includes(searchQuery);
    const matchesStatus = selectedStatus ? r.status === selectedStatus : true; // Apply status filter if selected
    return matchesSearch && matchesStatus;
  });

  const openModal = (caseId) => {
    const caseData = reports.find((report) => report.id === caseId);
    setSelectedCase(caseData);
  };

  const closeModal = () => {
    setSelectedCase(null);
  };

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
                <tr key={r.id} style={styles.tr} onClick={() => openModal(r.id)}>
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

      {/* MODAL */}
      {selectedCase && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            {/* CASE ID HEADER */}
            <div style={styles.modalHeader}>
              <h2 style={styles.caseId}>CASE ID {selectedCase.id}</h2>
            </div>
            <p style={styles.reportText}>{selectedCase.report}</p>

            {/* FILES */}
            <div style={styles.files}>
              {selectedCase.files && selectedCase.files.map((file, index) => (
                <div key={index} style={styles.fileItem}>
                  <span style={styles.fileName}>{file.name}</span>
                  <span style={styles.fileSize}>{file.size}</span>
                </div>
              ))}
            </div>

            <div style={styles.modalButtons}>
              <button style={styles.modalButton} onClick={closeModal}>Close</button>
              <button style={styles.modalButton}>Message User</button>
              <button style={styles.modalButton}>View User</button>
              <button style={styles.modalButton}>Update Status</button>
            </div>
          </div>
        </div>
      )}
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
    borderTop: "1px solid #1e293b",
    cursor: "pointer"
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

  /* MODAL */
  modal: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    background: "#1e293b",
    padding: "20px",
    borderRadius: "10px",
    width: "1000px",
    color: "#e5e7eb",
    fontSize: "30px"
  },
  modalHeader: {
    background: "#34495e",  // Dark background for the header
    padding: "15px",
    borderRadius: "10x 10px 0 0",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%"
  },
  caseId: {
    fontSize: "20px",
    color: "#ffffff",
    fontWeight: "bold",
    margin: 0
  },
  reportText: {
    fontSize: "14px",
    color: "#e5e7eb",
    lineHeight: "1.5",
    marginTop: "15px"
  },
  files: {
    marginTop: "20px",
  },
  fileItem: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
    color: "#e5e7eb"
  },
  fileName: {
    fontSize: "14px",
    color: "#ffffff"
  },
  fileSize: {
    fontSize: "12px",
    color: "#94a3b8"
  },
  modalButtons: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },
  modalButton: {
    background: "#4CAF50",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    width: "23%",
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
