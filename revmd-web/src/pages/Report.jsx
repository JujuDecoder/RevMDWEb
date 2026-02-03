import { useState } from "react";
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

  // Added chat / status state
  const [showUpdateStatus, setShowUpdateStatus] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [showMessageUser, setShowMessageUser] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "admin",
      text:
        "Hi, Mario. I've reviewed your report and appreciate you bringing this issue to our attention.",
      time: "11:10 AM",
    },
    {
      id: 2,
      sender: "user",
      text:
        "Thank you for looking into this. I appreciate the quick response.",
      time: "11:14 AM",
    },
    {
      id: 3,
      sender: "admin",
      text:
        "You’re welcome. If you have any further questions, feel free to reach out anytime.",
      time: "11:17 AM",
    },
  ]);

  const [messageInput, setMessageInput] = useState("");
  const handleSendMessage = () => {
    if (!messageInput.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: "admin",
        text: messageInput,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);

    setMessageInput("");
  };

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
              {filteredReports.map((r) => (
                <TableRow key={r.id} onClick={() => setSelectedCase(r)}>
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
                  color: "#ffffff",
                }}
                onClick={() => setShowMessageUser(true)}
              >
                Message User
              </button>

              <button
                style={{
                  ...styles.grayBtn,
                  background: "linear-gradient(180deg, #3b82f6, #2563eb)",
                  color: "#ffffff",
                }}
                onClick={() => setShowUserProfile(true)}
              >
                View User
              </button>

              <button
                style={{
                  ...styles.grayBtn,
                  background: "linear-gradient(180deg, #3b82f6, #2563eb)",
                  color: "#ffffff",
                }}
                onClick={() => setShowUpdateStatus(true)}
              >
                Update Status
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MESSAGE USER CHAT MODAL */}
      {showMessageUser && (
        <div
          style={styles.chatOverlay}
          onClick={() => setShowMessageUser(false)}
        >
          <div
            style={styles.chatCard}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={styles.chatHeader}>
              <span>Chat with Mario Santos</span>
              <button
                style={styles.closeBtn}
                onClick={() => setShowMessageUser(false)}
              >
                ✕
              </button>
            </div>

            <div style={styles.chatUserRow}>
              <img
                src="https://i.pravatar.cc/80?img=12"
                alt="User"
                style={styles.chatAvatar}
              />
              <div>
                <strong>Mario Santos</strong>
                <div style={styles.onlineStatus}>
                  <span style={styles.onlineDot} /> Online
                </div>
              </div>
            </div>

            <div style={styles.chatBody}>
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  style={
                    msg.sender === "admin"
                      ? styles.chatBubbleRight
                      : styles.chatBubbleLeft
                  }
                >
                  {msg.text}
                  <div style={styles.chatTime}>{msg.time}</div>
                </div>
              ))}
            </div>

            <div style={styles.chatInputRow}>
              <input
                placeholder="Type a message..."
                style={styles.chatInput}
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && handleSendMessage()
                }
              />
              <button
                style={styles.sendBtn}
                onClick={handleSendMessage}
              >
                ➤
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
              <button
                style={styles.messageBtn}
                onClick={() => setShowMessageUser(true)}
              >
                Message User
              </button>
            </div>
          </div>
        </div>
      )}

      {/* UPDATE STATUS MODAL */}
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
    fontFamily: "Inter, sans-serif",
  },
  main: { padding: 24 },
  title: { fontSize: 28, marginBottom: 12 },

  filterColumn: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    marginBottom: 20,
  },

  search: {
    background: "#1e293b",
    border: "none",
    padding: "10px 14px",
    borderRadius: 10,
    color: "#fff",
    width: 320,
  },

  statusSelect: {
    background: "#1e293b",
    border: "none",
    padding: "10px 14px",
    borderRadius: 10,
    color: "#fff",
    width: 200,
  },

  tableWrap: {
    border: "1px solid #1e293b",
    borderRadius: 14,
    overflow: "hidden",
  },

  tableFooter: {
    display: "flex",
    justifyContent: "space-between",
    padding: "14px 16px",
    borderTop: "1px solid #1e293b",
  },

  resultsText: { fontSize: 13, color: "#94a3b8" },

  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(2,6,23,0.85)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  modalCard: {
    width: 720,
    background: "#1e293b",
    borderRadius: 24,
  },

  modalHeader: {
    background: "#2b3a67",
    padding: 14,
    display: "flex",
    justifyContent: "space-between",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },

  modalBody: { padding: 24 },
  modalText: { marginBottom: 20 },

  fileList: { display: "flex", flexDirection: "column", gap: 10 },

  fileRow: {
    background: "#020617",
    padding: "10px 14px",
    borderRadius: 8,
    display: "flex",
    justifyContent: "space-between",
  },

  fileSize: { color: "#94a3b8" },

  modalFooter: {
    padding: 24,
    display: "flex",
    justifyContent: "space-between",
  },

  grayBtn: {
    background: "#9ca3af",
    border: "none",
    borderRadius: 999,
    padding: "10px 26px",
    cursor: "pointer",
  },

  closeBtn: {
    background: "transparent",
    border: "none",
    color: "#fff",
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
    background: "linear-gradient(180deg,#1e293b,#020617)",
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
    background: "#1e293b",
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

  chatOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(2,6,23,0.75)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 50,
  },
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
  color: status === "To Review" ? "#facc15" : "#ffffff",
});

