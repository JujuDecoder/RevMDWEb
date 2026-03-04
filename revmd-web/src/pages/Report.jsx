
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
    style={styles.profileOverlay}
    onClick={() => setShowUserProfile(false)}
  >
    <div
      style={styles.profileCard}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div style={styles.profileHeader}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={styles.profileTitle}>USER PROFILE</span>
          <span style={styles.infoIcon}>i</span>
        </div>

        <button
          style={styles.profileClose}
          onClick={() => setShowUserProfile(false)}
        >
          ✕
        </button>
      </div>

      {/* Body */}
      <div style={styles.profileBody}>
        <div style={styles.profileTopSection}>
          <div style={styles.profileAvatarCircle}>
            <svg
              width="50"
              height="50"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ffffff"
              strokeWidth="1.8"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>

          <div>
            <h2 style={styles.profileName}>Emily R.</h2>

            <div style={styles.profileLine}>
              📞 +1 987 654 3210
            </div>

            <div style={styles.profileLine}>
              ✉️ emily.r@email.com
            </div>
          </div>
        </div>

        <div style={styles.signupRow}>
          📅 <strong>Sign up Date:</strong> November 14, 2023
        </div>
      </div>

      {/* Footer Button */}
      <div style={styles.profileFooter}>
        <button
          style={styles.profileBackBtn}
          onClick={() => setShowUserProfile(false)}
        >
          OK, GO BACK
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

  search: {
  background: "#ffffff",
  border: "1px solid #e5e7eb",
  padding: "10px 14px",
  borderRadius: 10,
  color: "#111827",
  width: 320,
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
    width: 450, // Matches the image aspect ratio
    background: "#ffffff",
    borderRadius: 12,
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    overflow: "hidden",
  },
  modalHeader: {
    padding: "12px 16px",
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


  /* ================= NEW USER PROFILE ================= */

profileOverlay: {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.35)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 200,
},

profileCard: {
  width: 520,
  background: "#ffffff",
  borderRadius: 18,
  boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
  overflow: "hidden",
},

profileHeader: {
  padding: "18px 22px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderBottom: "1px solid #f1f5f9",
},

profileTitle: {
  fontSize: 18,
  fontWeight: 700,
  letterSpacing: 0.5,
  color: "#111827",
},

infoIcon: {
  width: 20,
  height: 20,
  borderRadius: "50%",
  background: "#e0f2fe",
  color: "#0284c7",
  fontSize: 12,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: 700,
},

profileClose: {
  background: "none",
  border: "none",
  fontSize: 18,
  cursor: "pointer",
  color: "#6b7280",
},

profileBody: {
  padding: "30px 28px",
},

profileTopSection: {
  display: "flex",
  gap: 20,
  alignItems: "center",
  marginBottom: 30,
},

profileAvatarCircle: {
  width: 100,
  height: 100,
  borderRadius: "50%",
  background: "#1e293b",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
},

profileName: {
  margin: 0,
  fontSize: 26,
  fontWeight: 700,
  color: "#111827",
},

profileLine: {
  marginTop: 6,
  fontSize: 15,
  color: "#374151",
},

signupRow: {
  marginTop: 10,
  fontSize: 15,
  color: "#111827",
},

profileFooter: {
  padding: 20,
  borderTop: "1px solid #f1f5f9",
},

profileBackBtn: {
  width: "100%",
  padding: "14px",
  borderRadius: 10,
  border: "none",
  background: "linear-gradient(90deg,#2563eb,#3b82f6)",
  color: "#ffffff",
  fontWeight: 700,
  fontSize: 15,
  cursor: "pointer",
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

  
  modalHeaderRight: {
  display: "flex",
  alignItems: "center",
  gap: 10,
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
