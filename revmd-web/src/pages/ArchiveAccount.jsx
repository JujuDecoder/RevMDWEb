import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../components/ui/table";
import { useNavigate } from "react-router-dom";

export default function Accounts() {
  const navigate = useNavigate();
  const [retrieveId, setRetrieveId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [mechanics, setMechanics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArchived = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/mechanics/archive");
        const data = await res.json();

        setMechanics(
          data.map((m) => ({
            id: m.id,
            name: `${m.firstName} ${m.lastName}`,
            status: m.status || "Inactive",
            date: m.date || "",
          })),
        );

        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    };

    fetchArchived();
  }, []);

  const openRetrieveModal = (id) => {
    setRetrieveId(id);
  };

  const closeRetrieveModal = () => {
    setRetrieveId(null);
  };

  const confirmRetrieve = async () => {
    if (!retrieveId) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/mechanics/retrieve/${retrieveId}`,
        { method: "POST" }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to retrieve mechanic");
      }

      setMechanics((prev) =>
        prev.filter((m) => m.id !== retrieveId)
      );

      closeRetrieveModal();
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const filteredMechanics = mechanics.filter(
    (m) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.id.includes(searchQuery),
  );

  return (
    <div style={styles.app}>
      <main style={styles.main}>
        <h1 style={styles.title}>Archive Accounts</h1>
        {/* TOP BAR */}
        <div style={styles.topBar}>
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
            style={styles.outlineButton}
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        </div>

        {/* TABLE */}
        <div style={styles.tableWrap}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mechanic ID</TableHead>
                <TableHead>Full Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMechanics.map((m) => (
                <TableRow key={m.id}>
                  <TableCell>{m.id}</TableCell>
                  <TableCell>{m.name}</TableCell>
                  <TableCell>
                    <span style={statusStyle(m.status)}>{m.status}</span>
                  </TableCell>
                  <TableCell>{m.date}</TableCell>
                  <TableCell>
                    <div style={styles.actionGroup}>
                      {/* retrive */}
                      <button
                        type="button"
                        title="retrieve mechanic"
                        style={{
                          ...styles.iconButton,
                          ...styles.deleteIconButton,
                        }}
                        onClick={() => openRetrieveModal(m.id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="18"
                          height="18"
                          fill="none"
                          stroke="#16a34a"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
      {/* RETRIEVE CONFIRMATION MODAL */}
      {retrieveId && (
        <div style={styles.modalOverlay} onMouseDown={closeRetrieveModal}>
          <div
            style={styles.retrieveModal}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <h3 style={styles.retrieveTitle}>Restore Mechanic?</h3>

            <p style={styles.retrieveText}>
              Are you sure you want to restore this mechanic account?
            </p>

            <div style={styles.modalActions}>
              <button
                style={styles.cancelButton}
                onClick={closeRetrieveModal}
              >
                Cancel
              </button>

              <button
                style={styles.retrieveConfirmButton}
                onClick={confirmRetrieve}
              >
                Restore
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  app: {
    minHeight: "100vh",
    background: "#f8fafc",
    color: "#1f2937",
    fontFamily: "Inter, sans-serif",
  },
  main: {
    padding: 24,
  },
  title: {
    fontSize: 28,
    marginBottom: 24,
    fontWeight: 700,
    color: "#111827",
  },

  outlineButton: {
    background: "#f9fafb",

    border: "2px solid #e5eaf2",
    color: "#ef4444",
    fontWeight: 600,
    padding: "6px 14px",
    borderRadius: 8,
    cursor: "pointer",
    transition: "all 0.2s ease",
  },

  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
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
  createButton: {
    background: "#f97316",
    border: "none",
    padding: "10px 16px",
    color: "#fff",
    borderRadius: 10,
    cursor: "pointer",
    fontSize: 14,
  },
  tableWrap: {
    background: "#ffffff",
    borderRadius: 14,
    border: "1px solid #e5e7eb",
    overflow: "hidden",
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
  },
  archiveIconButton: {
    // subtle hover
  },
  iconSvg: {
    display: "block",
  },
  updateButton: {
    background: "#f97316",
    border: "none",
    padding: "6px 12px",
    color: "#fff",
    borderRadius: 8,
    cursor: "pointer",
    fontSize: 13,
  },
  archiveButton: {
    background: "#ef4444",
    border: "none",
    padding: "6px 12px",
    color: "#fff",
    borderRadius: 8,
    cursor: "pointer",
    fontSize: 13,
  },
  bottomActions: {
    marginTop: 20,
    display: "flex",
    justifyContent: "flex-end",
  },
  archivePageButton: {
    background: "#6ee7b7",
    border: "none",
    padding: "10px 16px",
    borderRadius: 10,
    cursor: "pointer",
    fontSize: 14,
    color: "#022c22",
  },
  /* Modal styles */
  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(2,6,23,0.7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2000,
  },
  retrieveModal: {
  width: 400,
  padding: 24,
  background: "#ffffff",
  borderRadius: 16,
  border: "1px solid #e5e7eb",
  boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
  textAlign: "center",
},

retrieveTitle: {
  marginBottom: 10,
  fontSize: 18,
  fontWeight: 700,
  color: "#111827",
},

retrieveText: {
  marginBottom: 20,
  fontSize: 14,
  color: "#6b7280",
},

retrieveConfirmButton: {
  background: "#16a34a", // green
  color: "#ffffff",
  border: "none",
  padding: "8px 16px",
  borderRadius: 8,
  cursor: "pointer",
},
  modal: {
    width: 520,
    padding: 24,
    background: "#0f172a",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.04)",
    boxShadow: "0 10px 30px rgba(2,6,23,0.9)",
  },
  modalTitle: {
    textAlign: "center",
    margin: "0 0 18px 0",
    fontSize: 20,
  },
  formRow: {
    marginBottom: 12,
  },
  label: {
    display: "block",
    marginBottom: 6,
    color: "#e6e9ed",
    fontSize: 13,
  },
  input: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 8,
    border: "1px solid rgba(255,255,255,0.03)",
    background: "#1e293b",
    color: "#e5e7eb",
    outline: "none",
  },
  select: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 8,
    border: "1px solid rgba(255,255,255,0.03)",
    background: "#0b1220",
    color: "#e6eef8",
    minHeight: 44,
  },
  smallHint: {
    marginTop: 6,
    fontSize: 12,
    color: "#9ca3af",
  },
  eyeButton: {
    position: "absolute",
    right: 8,
    top: "50%",
    transform: "translateY(-50%)",
    background: "transparent",
    border: "none",
    color: "#cbd5e1",
    cursor: "pointer",
    fontSize: 16,
  },
  modalActions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: 12,
    marginTop: 18,
  },
  cancelButton: {
    background: "#0f1724",
    border: "1px solid rgba(255,255,255,0.04)",
    padding: "8px 14px",
    borderRadius: 8,
    color: "#cbd5e1",
    cursor: "pointer",
  },
  createSubmitButton: {
    background: "#f97316",
    border: "none",
    padding: "8px 14px",
    borderRadius: 8,
    color: "#fff",
    cursor: "pointer",
  },
};

/* ===== STATUS BADGES ===== */
const statusStyle = (status) => ({
  padding: "6px 14px",
  borderRadius: 999,
  fontSize: 12,
  fontWeight: 600,
  display: "inline-block",
  background:
    status === "Active"
      ? "#dcfce7"      // light green
      : "#fee2e2",     // light red
  color:
    status === "Active"
      ? "#15803d"      // dark green
      : "#b91c1c",     // dark red
});
