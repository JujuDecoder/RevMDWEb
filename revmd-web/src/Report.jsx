import { useState } from "react";

export default function AdminReports() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedCase, setSelectedCase] = useState(null);
  const [showUserProfile, setShowUserProfile] = useState(false);

  // ✅ ADDED (ONLY)
  const [showUpdateStatus, setShowUpdateStatus] = useState(false);
  const [newStatus, setNewStatus] = useState("");

  const [reports, setReports] = useState([

    {
      id: "4001",
      mechanic: "Mario Santos",
      status: "Investigating",
      date: "2025-10-08 01:55:48 AM",
      report: `Hi, I'd like to report a mechanic I recently talked through the app.

The mechanic arrived late by almost 2 hours and seemed unprepared for the repair.
He didn’t bring the proper tools and ended up leaving the job unfinished.`,
      files: [
        { name: "Chat Screenshot.png", size: "465 KB" },
        { name: "unfinished.photo.jpg", size: "1.02 MB" }
      ]
    },
    {
      id: "4002",
      mechanic: "Maria Santos",
      status: "To Review",
      date: "2025-10-07 04:09:30 PM",
      report: "The mechanic arrived late and was not responsive."
    },
    {
      id: "4003",
      mechanic: "Roberto Reyes",
      status: "To Review",
      date: "2025-10-06 09:12:11 AM",
      report: "The mechanic did not bring proper tools."
    },
    {
      id: "4004",
      mechanic: "Mark Dela Cruz",
      status: "Resolved",
      date: "2025-10-05 08:56:24 PM",
      report: "The mechanic completed the work but was delayed."
    }
 ]);


  const filteredReports = reports.filter((r) => {
    const matchesSearch =
      r.mechanic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.id.includes(searchQuery);
    const matchesStatus = selectedStatus ? r.status === selectedStatus : true;
    return matchesSearch && matchesStatus;
  });

  return (
    <div style={styles.app}>
      <main style={styles.main}>
        <h1 style={styles.title}>User Reports</h1>

        <div style={styles.filterColumn}>
          <input
            placeholder="Search by Case ID or Mechanic"
            style={styles.search}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          
          <select
            style={styles.statusSelect}
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="Investigating">Investigating</option>
            <option value="To Review">To Review</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>

        <div style={styles.tableWrap}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.headerRow}>
                <th style={styles.th}>Case ID</th>
                <th style={styles.th}>Reported Mechanic</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Sent</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.map((r) => (
                <tr
                  key={r.id}
                  style={styles.tr}
                  onClick={() => setSelectedCase(r)}
                >
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

          <div style={styles.tableFooter}>
            <span style={styles.resultsText}>
              Showing 1–{filteredReports.length} of {reports.length} results
            </span>
          </div>
        </div>
      </main>

      {/* REPORT MODAL */}
      {selectedCase && (
        <div
          style={styles.modalOverlay}
          onClick={() => setSelectedCase(null)}
        >
          <div
            style={styles.modalCard}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={styles.modalHeader}>
              <span>CASE ID {selectedCase.id}</span>
              <button
                style={styles.closeBtn}
                onClick={() => setSelectedCase(null)}
              >
                ✕
              </button>
            </div>

            <div style={styles.modalBody}>
              <p style={styles.modalText}>{selectedCase.report}</p>

              {selectedCase.files && (
                <div style={styles.fileList}>
                  {selectedCase.files.map((f, i) => (
                    <div key={i} style={styles.fileRow}>
                      <span>{f.name}</span>
                      <span style={styles.fileSize}>{f.size}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div style={styles.modalFooter}>
  <button
    style={{
      ...styles.grayBtn,
      background: "linear-gradient(180deg, #3b82f6, #2563eb)",
      color: "#ffffff"
    }}
  >
    Message User
  </button>

  <button
    style={{
      ...styles.grayBtn,
      background: "linear-gradient(180deg, #3b82f6, #2563eb)",
      color: "#ffffff"
    }}
    onClick={() => setShowUserProfile(true)}
  >
    View User
  </button>

  <button
    style={{
      ...styles.grayBtn,
      background: "linear-gradient(180deg, #3b82f6, #2563eb)",
      color: "#ffffff"
    }}
    onClick={() => setShowUpdateStatus(true)}
  >
    Update Status
  </button>
</div>


          </div>
        </div>
      )}

      {/* ✅ USER PROFILE MODAL — UNCHANGED */}
      {showUserProfile && (
        <div
          style={styles.modalOverlay}
          onClick={() => setShowUserProfile(false)}
        >
          <div
            style={styles.userProfileCard}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={styles.userProfileHeader}>
              <span>User Profile</span>
              <button
                style={styles.closeBtn}
                onClick={() => setShowUserProfile(false)}
              >
                ✕
              </button>
            </div>

            <div style={styles.userProfileBody}>
              <div style={{ display: "flex", gap: 16 }}>
                <img
                  src="https://i.pravatar.cc/150?img=12"
                  alt="User"
                  style={styles.avatar}
                />

                <div>
                  <h2 style={{ margin: 0 }}>Mario Santos</h2>
                  <p style={styles.muted}>📞 +1 987 654 3210</p>
                  <p style={styles.muted}>✉️ mario.santos@email.com</p>

                  <span style={styles.activeBadge}>Active</span>
                </div>
              </div>

              <div style={styles.profileMeta}>
                ⭐ <strong>Account Status:</strong> Active <br />
                📅 <strong>Signup Date:</strong> 2024-02-15
              </div>

              <div style={styles.reportedMechanic}>
                <p>Reported Mechanic</p>

                <div style={{ display: "flex", gap: 12 }}>
                  <img
                    src="https://i.pravatar.cc/100?img=32"
                    alt="Mechanic"
                    style={styles.mechanicAvatar}
                  />
                  <div>
                    <strong>Mark Dela Cruz</strong>
                    <div style={styles.muted}>
                      ⭐ 4.2 • 129 Services
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div style={styles.userProfileFooter}>
              <button style={styles.suspendBtn}>Suspend Account</button>
              <button style={styles.messageBtn}>Message User</button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ UPDATE STATUS MODAL (NEW ONLY) */}
      {showUpdateStatus && selectedCase && (
        <div
          style={styles.modalOverlay}
          onClick={() => setShowUpdateStatus(false)}
        >
          <div
            style={styles.updateStatusCard}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={styles.updateStatusHeader}>
              <span>Update Status</span>
              <button
                style={styles.closeBtn}
                onClick={() => setShowUpdateStatus(false)}
              >
                ✕
              </button>
            </div>

            <div style={styles.updateStatusBody}>
              <p style={styles.muted}>Case ID: {selectedCase.id}</p>

              <div style={styles.mechanicRow}>
                <img
                  src="https://i.pravatar.cc/100?img=32"
                  alt="Mechanic"
                  style={styles.mechanicAvatar}
                />
                <div>
                  <div style={styles.muted}>Reported Mechanic:</div>
                  <strong>{selectedCase.mechanic}</strong>
                </div>
              </div>

              <select
                style={styles.updateStatusSelect}
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
              >
                <option value="">Select New Status</option>
                <option value="Investigating">Investigating</option>
                <option value="To Review">To Review</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>

            <div style={styles.updateStatusFooter}>
              <button
  style={styles.messageBtn}
  onClick={() => {
    if (!newStatus) return;

    setReports((prev) =>
      prev.map((r) =>
        r.id === selectedCase.id
          ? { ...r, status: newStatus }
          : r
      )
    );

    setSelectedCase((prev) =>
      prev ? { ...prev, status: newStatus } : prev
    );

    setNewStatus("");
    setShowUpdateStatus(false);
  }}
>
  Update Status
</button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  app: {
    minHeight: "100vh",
    background: "#020617",
    color: "#e5e7eb",
    fontFamily: "Inter, sans-serif"
  },
  main: { padding: 24 },
  title: { fontSize: 28, marginBottom: 12 },

  filterColumn: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    marginBottom: 20
  },

  search: {
    background: "#1e293b",
    border: "none",
    padding: "10px 14px",
    borderRadius: 10,
    color: "#fff",
    width: 320
  },

  statusSelect: {
    background: "#1e293b",
    border: "none",
    padding: "10px 14px",
    borderRadius: 10,
    color: "#fff",
    width: 200
  },

  tableWrap: {
    border: "1px solid #1e293b",
    borderRadius: 14,
    overflow: "hidden"
  },

  table: { width: "100%", borderCollapse: "collapse" },
  headerRow: { background: "#2A3656" },
  th: { padding: 14, fontSize: 13, textAlign: "left" },
  tr: { borderTop: "1px solid #1e293b", cursor: "pointer" },
  td: { padding: 14, fontSize: 14 },

  tableFooter: {
    display: "flex",
    justifyContent: "space-between",
    padding: "14px 16px",
    borderTop: "1px solid #1e293b"
  },

  resultsText: { fontSize: 13, color: "#94a3b8" },

  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(2,6,23,0.85)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },

  modalCard: {
    width: 720,
    background: "#1e293b",
    borderRadius: 24
  },

  modalHeader: {
    background: "#2b3a67",
    padding: 14,
    display: "flex",
    justifyContent: "space-between",
    borderTopLeftRadius: 24,
  borderTopRightRadius: 24
  },

  modalBody: { padding: 24 },
  modalText: { marginBottom: 20 },

  fileList: { display: "flex", flexDirection: "column", gap: 10 },

  fileRow: {
    background: "#020617",
    padding: "10px 14px",
    borderRadius: 8,
    display: "flex",
    justifyContent: "space-between"
  },

  fileSize: { color: "#94a3b8" },

  modalFooter: {
    padding: 24,
    display: "flex",
    justifyContent: "space-between"
  },

  grayBtn: {
    background: "#9ca3af",
    border: "none",
    borderRadius: 999,
    padding: "10px 26px",
    cursor: "pointer"
  },

  closeBtn: {
    background: "transparent",
    border: "none",
    color: "#fff",
    cursor: "pointer"
  },

  /* USER PROFILE */
  userProfileCard: {
    width: 560,
    background: "linear-gradient(180deg,#1e293b,#020617)",
    borderRadius: 20
  },

  userProfileHeader: {
    background: "#2b3a67",
    padding: 14,
    display: "flex",
    justifyContent: "space-between",
     borderTopLeftRadius: 20,
  borderTopRightRadius: 20
  },

  userProfileBody: { padding: 24 },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 12,
    objectFit: "cover"
  },

  mechanicAvatar: {
    width: 50,
    height: 50,
    borderRadius: 10
  },

  muted: { color: "#94a3b8", fontSize: 14 },

  activeBadge: {
    background: "#064e3b",
    color: "#6ee7b7",
    padding: "4px 12px",
    borderRadius: 999,
    fontSize: 12
  },

  profileMeta: {
    marginTop: 16,
    borderTop: "1px solid #334155",
    paddingTop: 12
  },

  reportedMechanic: {
    marginTop: 20,
    borderTop: "1px solid #334155",
    paddingTop: 16
  },

  userProfileFooter: {
    padding: 24,
    display: "flex",
    justifyContent: "space-between"
  },

  suspendBtn: {
    background: "#7f1d1d",
    color: "#fff",
    border: "none",
    borderRadius: 999,
    padding: "10px 22px"
  },

  messageBtn: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: 999,
    padding: "10px 22px"
  },

  /* UPDATE STATUS (OLD) */
  updateStatusCard: {
    width: 520,
    background: "linear-gradient(180deg,#1e293b,#020617)",
    borderRadius: 20
  },

  updateStatusHeader: {
    background: "#2b3a67",
    padding: 14,
    display: "flex",
    justifyContent: "space-between",
      borderTopLeftRadius: 24,
  borderTopRightRadius: 24
  },

  updateStatusBody: {
    padding: 24,
    display: "flex",
    flexDirection: "column",
    gap: 16
  },

  updateStatusFooter: {
    padding: 24,
    display: "flex",
    justifyContent: "space-between"
  },

  updateStatusSelect: {
    background: "#020617",
    border: "1px solid #334155",
    color: "#fff",
    padding: "10px 14px",
    borderRadius: 10
  },

  mechanicRow: {
    display: "flex",
    gap: 12,
    alignItems: "center"
  }
};

const statusStyle = (status) => ({
  padding: "6px 14px",
  borderRadius: 999,
  fontSize: 12,
  fontWeight: 500,
  display: "inline-block",
  background:
    status === "Investigating"
      ? "linear-gradient(180deg, #2563eb, #1e3a8a)" 
      : status === "Resolved"
      ? "linear-gradient(180deg, #065f46, #064e3b)" 
      : "linear-gradient(180deg, #3f3f46, #262626)", 
  color:
    status === "To Review" ? "#facc15" : "#ffffff" 
});

