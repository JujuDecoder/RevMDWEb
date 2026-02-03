import React, { useState, useEffect } from "react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "../components/ui/table";
import { useNavigate } from "react-router-dom";



export default function Accounts() {
    const navigate = useNavigate();

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
          status: m.status || "Archived",
          date: m.date || "",
        }))
      );

      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  fetchArchived();
}, []);


    const filteredMechanics = mechanics.filter(
        (m) =>
            m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            m.id.includes(searchQuery)
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
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#94a3b8" strokeWidth="2">
                                <circle cx="11" cy="11" r="8" />
                                <line x1="16" y1="16" x2="20" y2="20" />
                            </svg>
                        </div>
                    </div>
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
                                            {/* Edit Button */}
                                            <button
                                                type="button"
                                                title="Edit mechanic"
                                                aria-label="Edit mechanic"
                                                style={{ ...styles.iconButton, ...styles.editIconButton }}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="#ffffff" style={styles.iconSvg}>
                                                    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41L18.37 3.29a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                                                </svg>
                                            </button>
                                            {/* Delete Button */}
                                            <button
                                                type="button"
                                                title="Delete mechanic"
                                                style={{ ...styles.iconButton, ...styles.deleteIconButton }}      
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="#ef4444" style={styles.iconSvg}>
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
              
            </main>

        </div>
    );
}

const styles = {
    app: {
        minHeight: "100vh",
        background: "#020617",
        color: "#e5e7eb",
        fontFamily: "Inter, sans-serif",
    },
    main: {
        padding: 24,
    },
    title: {
        fontSize: 26,
        marginBottom: 20,
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
        background: "#1e293b",
        border: "none",
        padding: "10px 14px",
        borderRadius: 10,
        color: "#fff",
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
        background: "#020617",
        borderRadius: 14,
        border: "1px solid #1e293b",
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
    editIconButton: {
        // subtle hover
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
    padding: "4px 12px",
    borderRadius: 999,
    fontSize: 12,
    background:
        status === "Active"
            ? "#064e3b"
            : status === "Suspended"
                ? "#713f12"
                : "#3f3f46",
    color:
        status === "Active"
            ? "#6ee7b7"
            : status === "Suspended"
                ? "#fde68a"
                : "#e5e7eb",
});
