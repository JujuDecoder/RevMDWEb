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
  const [statusFilter, setStatusFilter] = useState("All");
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
          <div style={styles.filterGroup}>
  <select
    value={statusFilter}
    onChange={(e) => setStatusFilter(e.target.value)}
    style={styles.statusFilter}
  >
    <option value="All">All Status</option>
    <option value="Investigating">Investigating</option>
    <option value="To Review">To Review</option>
    <option value="Resolved">Resolved</option>
  </select>

  <button
    style={styles.viewArchiveBtn}
    onClick={() => setShowArchiveList(true)}
  >
    Archive
  </button>
</div>
        </div>
        {/* TABLE */}
<div style={styles.tableContainer}>
  <div style={styles.tableWrap}>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Case ID</TableHead>
          <TableHead>Mechanic</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {reports
          .filter(
            (r) =>
              (statusFilter === "All" || r.status === statusFilter) &&
              (
                r.mechanic.toLowerCase().includes(searchQuery.toLowerCase()) ||
                r.id.toLowerCase().includes(searchQuery.toLowerCase())
              )
          )
          .map((r) => (
            <TableRow
              key={r.id}
              style={styles.tableRow}
              onClick={() => {
                setSelectedAppeal(r);
                setNewStatus(r.status);
                setShowMessageUser(true);
              }}
            >
              <TableCell>{r.id}</TableCell>
              <TableCell>{r.mechanic}</TableCell>

              <TableCell>
                <span style={statusStyle(r.status)}>
                  {r.status}
                </span>
              </TableCell>

              <TableCell>{r.date}</TableCell>

              <TableCell>
                <div style={styles.actionGroup}>
                  <button
                    type="button"
                    title="Archive appeal"
                    style={styles.iconButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      archiveAppeal(r);
                    }}
                  >
                    {/* SVG unchanged */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="18"
                      height="18"
                      fill="#ef4444"
                    >
                      <path d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12zm3-3h8v-9H9v9zM16 2H8a2 2 0 0 0-2 2v2h12V4a2 2 0 0 0-2-2z" />
                    </svg>
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  </div>
    <div style={styles.paginationContainer}>
    <div style={styles.paginationButtons}>
      <button style={styles.paginationBtn}>← Previous</button>
      <button style={styles.activePageBtn}>1</button>
      <button style={styles.paginationBtn}>Next →</button>
    </div>
  </div>
</div>
      </main>


      {/* 💬 MESSENGER-STYLE CHAT MODAL */}
{showMessageUser && selectedAppeal && (
  <div style={styles.chatOverlay} onClick={() => setShowMessageUser(false)}>
    <div style={styles.chatCard} onClick={(e) => e.stopPropagation()}>
      
      {/* Header */}
      <div style={styles.chatHeader}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={styles.avatarPlaceholder}>
            {selectedAppeal.mechanic.charAt(0).toUpperCase()}
          </div>
          <div>
            <div style={styles.headerTitle}>{selectedAppeal.mechanic}</div>
            <div style={styles.headerSubtitle}>Case #{selectedAppeal.id}</div>
          </div>
        </div>
        <button style={styles.closeBtn} onClick={() => setShowMessageUser(false)}>✕</button>
      </div>

      {/* Status Bar */}
      <div style={styles.caseMeta}>
        <span style={{ fontSize: '13px', color: '#64748b', fontWeight: '500' }}>Internal Status:</span>
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

      {/* Chat Messages */}
      <div style={styles.chatBody}>
        {messages.map((msg) => {
          const isAdmin = msg.sender === "admin";
          return (
            <div key={msg.id} style={isAdmin ? styles.messageRowRight : styles.messageRowLeft}>
              <div style={isAdmin ? styles.chatBubbleRight : styles.chatBubbleLeft}>
                {msg.text}
              </div>
              <div style={styles.chatTime}>
                {msg.timestamp ? new Date(msg.timestamp._seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ""}
              </div>
            </div>
          );
        })}
      </div>

      {/* Input Area */}
      <div style={styles.chatInputRow}>
        <input
          placeholder="Aa"
          style={styles.chatInput}
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <button
          style={styles.sendBtn}
          onClick={async () => {
            await handleSendMessage();
            await fetch(`http://localhost:5000/api/appeals/${selectedAppeal.id}/status`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ status: newStatus }),
            });
            fetchAppeals(); 
          }}
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M3.4 20.4l17.45-7.48a1 1 0 000-1.84L3.4 3.6a.993.993 0 00-1.39.91L2 9.12c0 .5.37.93.87.99L17 12 2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z" />
          </svg>
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
  tableContainer: {
  display: "flex",
  flexDirection: "column",
  height: 500, // 🔥 fixed height (adjust if needed)
},

tableContainer: {
  display: "flex",
  flexDirection: "column",
  height: 500, // fixed height
},

tableWrap: {
  flex: 1,
  border: "1px solid #e5e7eb",
  borderRadius: "14px 14px 0 0",
  overflow: "hidden",
  background: "#ffffff",
},

tableRow: {
  cursor: "pointer",
  transition: "background 0.2s ease",
},

paginationContainer: {
  padding: "16px 20px",
  background: "#ffffff",
  borderRadius: "0 0 14px 14px",
  border: "1px solid #e5e7eb",
  borderTop: "none",
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
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

activePageBtn: {
  background: "#dbeafe",
  border: "1px solid #93c5fd",
  color: "#1e3a8a",
  padding: "8px 12px",
  borderRadius: 8,
  fontWeight: 600,
  cursor: "pointer",
},

actionGroup: {
  display: "flex",
  gap: 8,
},

iconButton: {
  background: "transparent",
  border: "none",
  padding: 8,
  borderRadius: 8,
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 36,
  height: 36,
  transition: "background 0.2s ease",
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
    background: "rgba(0, 0, 0, 0.4)",
    backdropFilter: "blur(4px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
  },
  chatCard: {
    background: "#ffffff",
    borderRadius: "16px",
    boxShadow: "0 12px 28px rgba(0, 0, 0, 0.12), 0 8px 10px rgba(0, 0, 0, 0.08)",
    width: "440px",
    height: "600px",
    maxHeight: "85vh",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },

  archiveCard: {
    background: "#ffffff",
    borderRadius: 20,
    boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
  },

  chatHeader: {
    padding: "12px 16px",
    borderBottom: "1px solid rgba(0,0,0,0.1)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  avatarPlaceholder: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #6e8efb, #a777e3)",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: "18px",
  },  
caseMeta: {
    padding: "8px 16px",
    background: "#f9fafb",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #f0f2f5",
  },

  statusSelect: {
    background: "#fff",
    border: "1px solid #dddfe2",
    color: "#1c1e21",
    padding: "4px 10px",
    borderRadius: "6px",
    fontSize: "13px",
    outline: "none",
  },
  headerTitle: {
    fontWeight: "600",
    fontSize: "16px",
    color: "#050505",
  },
  headerSubtitle: {
    fontSize: "12px",
    color: "#65676b",
  },

  chatBody: {
    flex: 1,
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    overflowY: "auto",
    background: "#fff",
  },

  messageRowLeft: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginBottom: "8px",
  },
  messageRowRight: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    marginBottom: "8px",
  },

 chatBubbleLeft: {
    background: "#e4e6eb",
    color: "#050505",
    padding: "8px 12px",
    borderRadius: "18px",
    maxWidth: "80%",
    fontSize: "15px",
    lineHeight: "1.4",
  },
  chatBubbleRight: {
    background: "#0084ff",
    color: "#ffffff",
    padding: "8px 12px",
    borderRadius: "18px",
    maxWidth: "80%",
    fontSize: "15px",
    lineHeight: "1.4",
  },
  chatTime: {
    fontSize: "11px",
    color: "#65676b",
    marginTop: "2px",
    padding: "0 4px",
  },
  chatInputRow: {
    padding: "12px 16px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    borderTop: "1px solid #f0f2f5",
  },
  chatInput: {
    flex: 1,
    background: "#f0f2f5",
    border: "none",
    padding: "10px 16px",
    borderRadius: "20px",
    fontSize: "15px",
    outline: "none",
  },
  sendBtn: {
    background: "transparent",
    color: "#0084ff",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "transform 0.1s ease",
  },

  archiveRow: {
    padding: 12,
    borderBottom: "1px solid #e5e7eb",
    cursor: "pointer",
    color: "#374151",
  },

  closeBtn: {
    background: "#f0f2f5",
    border: "none",
    borderRadius: "50%",
    width: "30px",
    height: "30px",
    cursor: "pointer",
    color: "#606770",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
  },
  filterGroup: {
  display: "flex",
  gap: 10,
  alignItems: "center",
},

statusFilter: {
  background: "#ffffff",
  border: "1px solid #e5e7eb",
  padding: "8px 12px",
  borderRadius: 8,
  color: "#374151",
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