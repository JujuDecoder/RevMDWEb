import { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../components/ui/table";

export default function AdminReports() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedCase, setSelectedCase] = useState(null);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [tempStatus, setTempStatus] = useState("");

  const itemsPerPage = 15;


  const [reports, setReports] = useState([
    {
      id: "4001",
      mechanic: "Mario Santos",
      status: "Investigating",
      date: "2025-10-08 01:55:48 AM",
      report: `Hi, I'd like to report a mechanic I recently talked through the app.

The mechanic arrived late by almost 2 hours and seemed unprepared for the repair.
He didn't bring the proper tools and ended up leaving the job unfinished.`,
      files: [
        { name: "Chat Screenshot.png", size: "465 KB" },
        { name: "unfinished.photo.jpg", size: "1.02 MB" },
      ],
    },
    {
      id: "4002",
      mechanic: "Maria Santos",
      status: "To Review",
      date: "2025-10-07 04:09:30 PM",
      report: "The mechanic arrived late and was not responsive.",
    },
    {
      id: "4003",
      mechanic: "Roberto Reyes",
      status: "To Review",
      date: "2025-10-06 09:12:11 AM",
      report: "The mechanic did not bring proper tools.",
    },
    {
      id: "4004",
      mechanic: "Mark Dela Cruz",
      status: "Resolved",
      date: "2025-10-05 08:56:24 PM",
      report: "The mechanic completed the work but was delayed.",
    },
  ]);

  const filteredReports = reports.filter((r) => {
    const matchesSearch =
      r.mechanic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.id.includes(searchQuery);
    const matchesStatus = selectedStatus ? r.status === selectedStatus : true;
    return matchesSearch && matchesStatus;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedReports = filteredReports.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Reset to page 1 when search/filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedStatus]);

  return (
    <div style={styles.app}>
      <main style={styles.main}>
        <h1 style={styles.title}>User Reports </h1>

        <div style={styles.filterColumn}>
          <div style={styles.searchWrapper}>
            <input
              placeholder="Search"
              style={styles.search}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div style={styles.searchIcon}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="none"
                stroke="#9ca3af"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="16" y1="16" x2="20" y2="20" />
              </svg>
            </div>
          </div>

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

        <div style={styles.tableContainer}>
          <div style={styles.tableWrap}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Case ID</TableHead>
                  <TableHead>Reported Mechanic</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Verdict</TableHead>
                  <TableHead>Sent</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedReports.map((r) => (
                  <TableRow key={r.id} onClick={() => {
  setSelectedCase(r);
  setTempStatus(r.status);
}}>
                    <TableCell>{r.id}</TableCell>
                    <TableCell>{r.mechanic}</TableCell>
                    <TableCell>
                      <span style={statusStyle(r.status)}>{r.status}</span>
                    </TableCell>
                    <TableCell></TableCell>
                    <TableCell>{r.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* PAGINATION CONTROLS */}
          <div style={styles.paginationContainer}>
            <div style={styles.paginationInfo}>
              Showing {startIndex + 1}–{Math.min(startIndex + itemsPerPage, filteredReports.length)} of {filteredReports.length} results
            </div>

            <div style={styles.paginationButtons}>
              <button
                style={{
                  ...styles.paginationBtn,
                  opacity: currentPage === 1 ? 0.5 : 1,
                  cursor: currentPage === 1 ? "not-allowed" : "pointer",
                }}
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                ← Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  style={{
                    ...styles.paginationBtn,
                    background: currentPage === page ? "#2563eb" : "#1e293b",
                    fontWeight: currentPage === page ? 600 : 400,
                    border: currentPage === page ? "1px solid #3b82f6" : "1px solid #334155",
                  }}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}

              <button
                style={{
                  ...styles.paginationBtn,
                  opacity: currentPage === totalPages ? 0.5 : 1,
                  cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                }}
                onClick={() =>
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                }
                disabled={currentPage === totalPages}
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* REPORT MODAL */}
{selectedCase && (
  <div style={styles.modalOverlay} onClick={() => setSelectedCase(null)}>
    <div style={styles.modalCard} onClick={(e) => e.stopPropagation()}>
      <div style={styles.modalHeader}>
  <span style={styles.modalHeaderTitle}>
    REPORT DETAILS - Case ID: {selectedCase.id}
  </span>

  <div style={styles.modalHeaderRight}>
    <select
      
  style={styles.modalStatusSelect}
  value={tempStatus}
  onChange={(e) => setTempStatus(e.target.value)}
>
  <option value="Investigating">Investigating</option>
  <option value="To Review">To Review</option>
  <option value="Resolved">Resolved</option>
</select>

    <button
      style={styles.closeBtnIcon}
      onClick={() => setSelectedCase(null)}
    >
      ✕
    </button>
  </div>
</div>

      <div style={styles.modalBody}>
        <div style={styles.sectionHeader}>User Information</div>
        
        <div style={styles.userInfoRow}>
          <div style={styles.userAvatarCircle}>
            {/* Simple User Icon SVG */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <span style={styles.userNameLabel}>
            <strong>USER:</strong> Emily R.
          </span>
        </div>

        <div style={styles.reportContentBox}>
          <p style={styles.reportText}>
            The mechanic, <strong>{selectedCase.mechanic}</strong> (Reported Mechanic: {selectedCase.mechanic}), {selectedCase.report}
          </p>
        </div>

        <div style={styles.adminActionsSection}>
          
          <button style={styles.outlineActionBtn} onClick={() => setShowUserProfile(true)}>
             <span style={{marginRight: 8}}>👤+</span> VIEW USER PROFILE
          </button>
          
        </div>
      </div>

      <div style={styles.modalFooterBlue}>
       <button
  style={styles.primaryActionBtn}
  onClick={() => {
    if (!tempStatus) return;

    setReports((prev) =>
      prev.map((r) =>
        r.id === selectedCase.id
          ? { ...r, status: tempStatus }
          : r
      )
    );

    setSelectedCase(null);
  }}
>
  UPDATE AND CLOSE
</button>
        <button style={styles.cancelBtn} onClick={() => setSelectedCase(null)}>
          CANCEL
        </button>
      </div>
    </div>
  </div>
)}
      
      {/* USER PROFILE MODAL */}
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
    background: "#f8fafc",
    color: "#1f2937",
    fontFamily: "Inter, sans-serif",
  },
  main: { padding: 24 },
  title: {
    fontSize: 28,
    marginBottom: 20,
    fontWeight: 700,
    color: "#111827",
  },

  filterColumn: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
    marginBottom: 20,
  },

  searchWrapper: {
    display: "flex",
    alignItems: "center",
    position: "relative",
    width: 260,
  },
  search: {
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    padding: "10px 14px",
    borderRadius: 20,
    color: "#111827",
    width: "100%",
  },
  searchIcon: {
    position: "absolute",
    right: 12,
    top: "50%",
    transform: "translateY(-50%)",
  },

  statusSelect: {
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    padding: "10px 14px",
    borderRadius: 10,
    color: "#111827",
    width: 200,
  },

  tableContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 0,
  },

  tableWrap: {
    border: "1px solid #e5e7eb",
    borderRadius: "14px 14px 0 0",
    overflow: "hidden",
    background: "#ffffff",
  },

  paginationContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 20px",
    background: "#ffffff",
    borderRadius: "0 0 14px 14px",
    border: "1px solid #e5e7eb",
    borderTop: "none",
  },

  paginationInfo: {
    color: "#6b7280",
    fontSize: 14,
    fontWeight: 500,
  },

  paginationButtons: {
    display: "flex",
    gap: 8,
    alignItems: "center",
  },

  paginationBtn: {
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    color: "#374151",
    padding: "8px 12px",
    borderRadius: 8,
    cursor: "pointer",
    fontSize: 14,
    transition: "all 0.2s ease",
  },

 modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
  },
  modalCard: {
    width: 720,
    background: "#1e293b",
    borderRadius: 24,
  },

  modalHeader: {
    background: "#f3f4f6",
    color: "#111827",
    padding: 14,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #f3f4f6",
  },
  modalHeaderTitle: {
    fontWeight: "700",
    fontSize: "15px",
    color: "#111827",
  },
  closeBtnIcon: {
    background: "none",
    border: "none",
    fontSize: "18px",
    color: "#9ca3af",
    cursor: "pointer",
  },
  modalBody: {
    padding: 20,
  },
  sectionHeader: {
    fontWeight: "700",
    fontSize: "16px",
    marginBottom: 16,
    color: "#111827",
  },
  userInfoRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 15,
  },
  userAvatarCircle: {
    width: 36,
    height: 36,
    borderRadius: "50%",
    border: "2px solid #111827",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  userNameLabel: {
    fontSize: "14px",
  },
 reportContentBox: {
  background: "#f0f7ff",
  border: "2px solid #3b82f6",   // thicker and stronger
  borderRadius: 12,
  padding: 16,
  marginBottom: 20,
},
  reportText: {
    fontSize: "13px",
    lineHeight: "1.5",
    color: "#374151",
    margin: 0,
  },
  adminActionsSection: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  adminActionsLabel: {
    fontSize: "11px",
    fontWeight: "700",
    color: "#111827",
    letterSpacing: "0.5px",
  },
  outlineActionBtn: {
    width: "fit-content",
    background: "#fff",
    border: "1px solid #2563eb",
    color: "#2563eb",
    padding: "6px 14px",
    borderRadius: 6,
    fontSize: "12px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
  },
  modalFooterBlue: {
    padding: "16px 20px",
    display: "flex",
    justifyContent: "flex-end",
    gap: 12,
  },
  primaryActionBtn: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "10px 18px",
    borderRadius: 6,
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
  },
  cancelBtn: {
    background: "#9ca3af",
    color: "#fff",
    border: "none",
    padding: "10px 18px",
    borderRadius: 6,
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
  },


  // USER PROFILE
  userProfileCard: {
    width: 560,
    background: "linear-gradient(180deg,#1e293b,#020617)",
    borderRadius: 20,
  },

  userProfileHeader: {
    background: "#2b3a67",
    padding: 14,
    display: "flex",
    justifyContent: "space-between",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  userProfileBody: { padding: 24 },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 12,
    objectFit: "cover",
  },

  mechanicAvatar: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },

  muted: { color: "#94a3b8", fontSize: 14 },

  activeBadge: {
    background: "#064e3b",
    color: "#6ee7b7",
    padding: "4px 12px",
    borderRadius: 999,
    fontSize: 12,
  },

  profileMeta: {
    marginTop: 16,
    borderTop: "1px solid #334155",
    paddingTop: 12,
  },

  reportedMechanic: {
    marginTop: 20,
    borderTop: "1px solid #334155",
    paddingTop: 16,
  },

  userProfileFooter: {
    padding: 24,
    display: "flex",
    justifyContent: "space-between",
  },

  suspendBtn: {
    background: "#7f1d1d",
    color: "#fff",
    border: "none",
    borderRadius: 999,
    padding: "10px 22px",
  },

  messageBtn: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: 999,
    padding: "10px 22px",
  },

  // UPDATE STATUS
  updateStatusCard: {
    width: 520,
    background: "linear-gradient(180deg,#1e293b,#020617)",
    borderRadius: 20,
  },

  updateStatusHeader: {
    background: "#2b3a67",
    padding: 14,
    display: "flex",
    justifyContent: "space-between",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },

  updateStatusBody: {
    padding: 24,
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },

  updateStatusFooter: {
    padding: 24,
    display: "flex",
    justifyContent: "space-between",
  },

  updateStatusSelect: {
    background: "#020617",
    border: "1px solid #334155",
    color: "#fff",
    padding: "10px 14px",
    borderRadius: 10,
  },

  mechanicRow: {
    display: "flex",
    gap: 12,
    alignItems: "center",
  },

  // CHAT UI
  chatCard: {
    width: 520,
    height: 620,
    background: "#ffffff",
    boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
    borderRadius: 20,
    display: "flex",
    flexDirection: "column",
  },

  chatHeader: {
    background: "#2b3a67",
    padding: 14,
    display: "flex",
    justifyContent: "space-between",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  chatUserRow: {
    display: "flex",
    gap: 12,
    padding: 16,
    alignItems: "center",
    borderBottom: "1px solid #334155",
  },

  chatAvatar: {
    width: 44,
    height: 44,
    borderRadius: 10,
  },

  onlineStatus: {
    fontSize: 12,
    color: "#94a3b8",
    display: "flex",
    alignItems: "center",
    gap: 6,
  },

  onlineDot: {
    width: 8,
    height: 8,
    background: "#22c55e",
    borderRadius: "50%",
  },

  chatBody: {
    flex: 1,
    padding: 16,
    display: "flex",
    flexDirection: "column",
    gap: 12,
    overflowY: "auto",
  },

  chatBubbleLeft: {
    alignSelf: "flex-start",
    background: "#f3f4f6",
    color: "#111827",
    padding: "10px 14px",
    borderRadius: 14,
    maxWidth: "75%",
    fontSize: 14,
  },

  chatBubbleRight: {
    alignSelf: "flex-end",
    background: "#2563eb",
    padding: "10px 14px",
    borderRadius: 14,
    maxWidth: "75%",
    fontSize: 14,
  },

  chatTime: {
    fontSize: 11,
    color: "#94a3b8",
    marginTop: 6,
    textAlign: "right",
  },

  chatInputRow: {
    padding: 14,
    display: "flex",
    gap: 10,
    borderTop: "1px solid #334155",
  },

  chatInput: {
    flex: 1,
    background: "#020617",
    border: "1px solid #334155",
    color: "#fff",
    padding: "10px 14px",
    borderRadius: 999,
  },

  sendBtn: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "50%",
    width: 42,
    height: 42,
    cursor: "pointer",
  },

modalStatusSelect: {
  padding: "6px 10px",
  borderRadius: 6,
  border: "1px solid #e5e7eb",
  fontSize: 12,
  fontWeight: 600,
  cursor: "pointer",
},
};

const statusStyle = (status) => ({
  padding: "6px 14px",
  borderRadius: 999,
  fontSize: 12,
  fontWeight: 600,
  display: "inline-block",
  background:
    status === "Investigating"
      ? "#dbeafe"
      : status === "Resolved"
        ? "#dcfce7"
        : "#fef9c3",
  color:
    status === "Investigating"
      ? "#1d4ed8"
      : status === "Resolved"
        ? "#15803d"
        : "#ca8a04",
});


