import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../components/ui/table";

export default function Accounts() {
  const [searchQuery, setSearchQuery] = useState("");

  const mechanics = [
    {
      id: "10001",
      name: "Juan Dela Cruz",
      status: "Active",
      date: "2025-10-08 01:55:48 AM",
    },
    {
      id: "10002",
      name: "Maria Santos",
      status: "Suspended",
      date: "2025-10-07 04:09:30 PM",
    },
    {
      id: "10003",
      name: "Roberto Reyes",
      status: "Suspended",
      date: "2025-10-06 09:12:11 AM",
    },
  ];

  const filteredMechanics = mechanics.filter(
    (m) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.id.includes(searchQuery)
  );

  return (
    <div style={styles.app}>
      <main style={styles.main}>
        <h1 style={styles.title}>Mechanic Accounts</h1>

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
                stroke="#94a3b8"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="16" y1="16" x2="20" y2="20" />
              </svg>
            </div>
          </div>

          <button style={styles.createButton}>Create Account</button>
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
                      <button style={styles.updateButton}>Update</button>
                      <button style={styles.archiveButton}>Archive</button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* BELOW TABLE */}
        <div style={styles.bottomActions}>
          <button style={styles.archivePageButton}>
            View Archived Accounts
          </button>
        </div>
      </main>
    </div>
  );
}

/* ===== STYLES ===== */

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

