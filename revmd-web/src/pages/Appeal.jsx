import { useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../components/ui/table";

export default function Appeals() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAppeal, setSelectedAppeal] = useState(null);
  const [showMessageUser, setShowMessageUser] = useState(false);
  const [showArchiveList, setShowArchiveList] = useState(false);

  const [reports, setReports] = useState([
    {
      id: "4001",
      mechanic: "Mario Santos",
      status: "Investigating",
      date: "2025-10-08 01:55:48 AM",
      report: "Arrived late and left the job unfinished.",
    },
    {
      id: "4002",
      mechanic: "Maria Santos",
      status: "To Review",
      date: "2025-10-07 04:09:30 PM",
      report: "The mechanic arrived late and was not responsive.",
    },
  ]);

  const [archivedReports, setArchivedReports] = useState([]);

  /* 💬 CHAT STATE */
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "admin",
      text: "Hi, we’re reviewing your appeal.",
      time: "11:10 AM",
    },
    {
      id: 2,
      sender: "user",
      text: "Thank you.",
      time: "11:14 AM",
    },
  ]);

  const [messageInput, setMessageInput] = useState("");
  const [newStatus, setNewStatus] = useState("");

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

  const archiveAppeal = (appeal) => {
    setArchivedReports((prev) => [...prev, appeal]);
    setReports((prev) => prev.filter((r) => r.id !== appeal.id));
  };

  return (
    <div style={styles.app}>
      <main style={styles.main}>
        <h1 style={styles.title}>Appeals</h1>
        <div style={styles.searchRow}>
          <input
            placeholder="Search by Case ID or Mechanic"
            style={styles.search}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            style={styles.viewArchiveBtn}
            onClick={() => setShowArchiveList(true)}
          >
            Archived Appeals
          </button>
        </div>
        <div style={styles.tableWrap}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Case ID</TableHead>
                <TableHead>Mechanic</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports
                .filter(
                  (r) =>
                    r.mechanic
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()) ||
                    r.id.includes(searchQuery),
                )
                .map((r) => (
                  <TableRow
                    key={r.id}
                    onClick={() => {
                      setSelectedAppeal(r);
                      setNewStatus(r.status);
                      setShowMessageUser(true);
                    }}
                  >
                    <TableCell>{r.id}</TableCell>
                    <TableCell>{r.mechanic}</TableCell>
                    <TableCell>
                      <span style={statusStyle(r.status)}>{r.status}</span>
                    </TableCell>
                    <TableCell>{r.date}</TableCell>
                    <TableCell>
                      <button
                        type="button"
                        title="Archive appeal"
                        style={{
                          ...styles.iconButton,
                          ...styles.deleteIconButton,
                        }}
                        onClick={(e) => {
                          e.stopPropagation(); // prevent opening chat
                          archiveAppeal(r);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="18"
                          height="18"
                          fill="#ef4444"
                          style={styles.iconSvg}
                        >
                          <path d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12zm3-3h8v-9H9v9zM16 2H8a2 2 0 0 0-2 2v2h12V4a2 2 0 0 0-2-2z" />
                        </svg>
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </main>

      {/* 💬 MESSAGE BOX MODAL */}
      {showMessageUser && selectedAppeal && (
        <div
          style={styles.chatOverlay}
          onClick={() => setShowMessageUser(false)}
        >
          <div style={styles.chatCard} onClick={(e) => e.stopPropagation()}>
            <div style={styles.chatHeader}>
              <span>Case #{selectedAppeal.id}</span>
              <button
                style={styles.closeBtn}
                onClick={() => setShowMessageUser(false)}
              >
                ✕
              </button>
            </div>

            <div style={styles.caseMeta}>
              <strong>{selectedAppeal.mechanic}</strong>
              <select
                style={styles.statusSelect}
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
              >
                <option value="Investigating">Investigating</option>
                <option value="To Review">To Review</option>
                <option value="Resolved">Resolved</option>
              </select>
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
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <button
                style={styles.sendBtn}
                onClick={() => {
                  handleSendMessage();
                  setReports((prev) =>
                    prev.map((r) =>
                      r.id === selectedAppeal.id
                        ? { ...r, status: newStatus }
                        : r,
                    ),
                  );
                }}
              >
                ➤
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 📦 ARCHIVED APPEALS MODAL */}
      {showArchiveList && (
        <div
          style={styles.chatOverlay}
          onClick={() => setShowArchiveList(false)}
        >
          <div style={styles.archiveCard} onClick={(e) => e.stopPropagation()}>
            <div style={styles.chatHeader}>
              <span>Archived Appeals</span>
              <button
                style={styles.closeBtn}
                onClick={() => setShowArchiveList(false)}
              >
                ✕
              </button>
            </div>

            <div style={{ padding: 16 }}>
              {archivedReports.length === 0 && (
                <p style={{ color: "#94a3b8" }}>No archived appeals.</p>
              )}

              {archivedReports.map((r) => (
                <div
                  key={r.id}
                  style={styles.archiveRow}
                  onClick={() => {
                    setSelectedAppeal(r);
                    setNewStatus(r.status);
                    setShowArchiveList(false);
                    setShowMessageUser(true);
                  }}
                >
                  <strong>{r.id}</strong> — {r.mechanic}
                </div>
              ))}
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
  searchRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    gap: 12, // space between input and button
  },

  main: { padding: 24 },
  title: { fontSize: 26, marginBottom: 16 },

  search: {
    background: "#1e293b",
    border: "none",
    padding: "10px 14px",
    borderRadius: 10,
    color: "#fff",
    width: 320,
    marginBottom: 20,
  },

  tableWrap: {
    border: "1px solid #1e293b",
    borderRadius: 14,
    overflow: "hidden",
  },

  archiveBtn: {
    background: "#7f1d1d",
    color: "#fff",
    border: "none",
    borderRadius: 999,
    padding: "6px 16px",
    cursor: "pointer",
  },

  iconButton: {
    background: "transparent",
    borderRadius: 8,
    padding: 6,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background 0.2s ease, transform 0.15s ease",
  },

  deleteIconButton: {
    borderColor: "#7f1d1d",
  },

  iconSvg: {
    display: "block",
  },

  viewArchiveBtn: {
    background: "transparent",
    border: "1px solid #f8f8f872",
    color: "#ffffff",
    fontWeight: "bold",
    padding: "6px 12px",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: 13,
    lineHeight: 1.2,
  },

  chatOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(2,6,23,0.8)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 50,
  },

  chatCard: {
    width: 520,
    height: 640,
    background: "linear-gradient(180deg,#1e293b,#020617)",
    borderRadius: 20,
    display: "flex",
    flexDirection: "column",
  },

  archiveCard: {
    width: 420,
    background: "#020617",
    borderRadius: 20,
  },

  chatHeader: {
    background: "#2b3a67",
    padding: 14,
    display: "flex",
    justifyContent: "space-between",
  },

  caseMeta: {
    padding: 16,
    display: "flex",
    justifyContent: "space-between",
    borderBottom: "1px solid #334155",
  },

  statusSelect: {
    background: "#020617",
    border: "1px solid #334155",
    color: "#fff",
    padding: "6px 12px",
    borderRadius: 999,
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
  },

  chatBubbleRight: {
    alignSelf: "flex-end",
    background: "#2563eb",
    padding: "10px 14px",
    borderRadius: 14,
    maxWidth: "75%",
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

  archiveRow: {
    padding: 12,
    borderBottom: "1px solid #1e293b",
    cursor: "pointer",
  },

  closeBtn: {
    background: "transparent",
    border: "none",
    color: "#fff",
    cursor: "pointer",
  },
};

const statusStyle = (status) => ({
  padding: "6px 14px",
  borderRadius: 999,
  fontSize: 12,
  background:
    status === "Investigating"
      ? "linear-gradient(180deg,#2563eb,#1e3a8a)"
      : status === "Resolved"
        ? "linear-gradient(180deg,#065f46,#064e3b)"
        : "linear-gradient(180deg,#3f3f46,#262626)",
  color: "#fff",
});
