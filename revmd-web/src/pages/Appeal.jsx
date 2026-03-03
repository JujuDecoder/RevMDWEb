import { useEffect, useState } from "react";
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
  const fetchAppeals = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/appeals");
      const data = await response.json();

      const formatted = data.map((item) => ({
        id: item.id,
        mechanic: item.appealingMechanicId,
        status: item.status,
        date: item.timestamp
          ? new Date(item.timestamp._seconds * 1000).toLocaleString()
          : "No Date",
        report: item.reason,
      }));

      setReports(formatted);
    } catch (error) {
      console.error("Error fetching appeals:", error);
    }
  };
  useEffect(() => {
    fetchAppeals();
  }, []);
  useEffect(() => {
    if (!selectedAppeal) return;

    const fetchMessages = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/appeals/${selectedAppeal.id}/messages`
        );
        const data = await res.json();
        setMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [selectedAppeal]);
  const [reports, setReports] = useState([]);
  const [archivedReports, setArchivedReports] = useState([]);

  /* 💬 CHAT STATE */
  const [messages, setMessages] = useState([]);

  const [messageInput, setMessageInput] = useState("");
  const [newStatus, setNewStatus] = useState("");

  const handleSendMessage = async () => {
  if (!messageInput.trim() || !selectedAppeal) return;

  try {
    await fetch(
      `http://localhost:5000/api/appeals/${selectedAppeal.id}/messages`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sender: "admin",
          text: messageInput,
        }),
      }
    );
 
    setMessageInput("");

    // Refresh messages
    const res = await fetch(
      `http://localhost:5000/api/appeals/${selectedAppeal.id}/messages`
    );
    const data = await res.json();
    setMessages(data);

  } catch (error) {
    console.error("Error sending message:", error);
  }
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
        <button
          style={styles.viewArchiveBtn}
          onClick={() => setShowArchiveList(true)}
        >
          Archive
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
                <div style={styles.chatTime}>
                  {msg.timestamp
                    ? new Date(msg.timestamp._seconds * 1000).toLocaleTimeString()
                    : ""}
                </div>
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
  onClick={async () => {
    await handleSendMessage();

    await fetch(
      `http://localhost:5000/api/appeals/${selectedAppeal.id}/status`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      }
    );

    fetchAppeals(); // refresh table from backend
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
    background: "#f8fafc",
    color: "#1f2937",
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
  title: {
    fontSize: 28,
    marginBottom: 20,
    fontWeight: 700,
    color: "#111827",
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

  tableWrap: {
    border: "1px solid #e5e7eb",
    borderRadius: 14,
    overflow: "hidden",
    background: "#ffffff",
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
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    color: "#374151",
    fontWeight: 600,
    padding: "6px 14px",
    borderRadius: 8,
    cursor: "pointer",
  },

  chatOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.35)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 50,
  },

  chatCard: {
    background: "#ffffff",
    borderRadius: 20,
    boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
  },

  archiveCard: {
    background: "#ffffff",
    borderRadius: 20,
    boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
  },

  chatHeader: {
    background: "#f9fafb",
    color: "#111827",
    borderBottom: "1px solid #e5e7eb",
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
    background: "#f3f4f6",
    color: "#111827",
    padding: "10px 14px",
    borderRadius: 14,
    maxWidth: "75%",
  },

  chatBubbleRight: {
    background: "#2563eb",
    color: "#ffffff",
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
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    color: "#111827",
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
    borderBottom: "1px solid #e5e7eb",
    cursor: "pointer",
    color: "#374151",
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
