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

export default function Users() {
  const [accountType, setAccountType] = useState("User");

  const navigate = useNavigate();
  const hoverTimerRef = React.useRef(null);
  const [hoveredBtn, setHoveredBtn] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [mechanics, setMechanics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const handleMouseEnter = (btn) => {
    hoverTimerRef.current = setTimeout(() => {
      setHoveredBtn(btn);
    }, 300); // 👈 delay in ms (change to 200–500 if you want)
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = null;
    setHoveredBtn(null);
  };

  const [users, setUsers] = useState([]);

  useEffect(() => {
      const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/users");
        const data = await res.json();

        setUsers(
          data.map((u) => ({
            id: u.id,
            name: `${u.firstName} ${u.lastName}`,
            email: u.email,
            address: u.address || "—",
            date: u.date,
          }))
        );

        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);


  const filteredMechanics = mechanics.filter(
    (m) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.id.includes(searchQuery),
  );

  return (
    <div style={styles.app}>
      <main style={styles.main}>
        <h1 style={styles.title}>User Accounts</h1>
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
          <div style={styles.buttonGroup}>
            <div style={styles.selectWrapper}>
              <select
                value={accountType}
                onChange={(e) => {
                  const value = e.target.value;
                  setAccountType(value);

                  if (
                    value === "User" &&
                    window.location.pathname !== "/dashboard/users"
                  ) {
                    navigate("/dashboard/users");
                  }

                  if (
                    value === "Mechanic" &&
                    window.location.pathname !== "/dashboard/accounts"
                  ) {
                    navigate("/dashboard/accounts");
                  }
                }}
                style={styles.outlineSelect}
              >
                <option style={styles.OptionS} value="Mechanic">
                  Mechanic
                </option>
                <option style={styles.OptionS} value="User">
                  User
                </option>
              </select>

              {/* Dropdown Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="16"
                height="16"
                style={styles.selectIcon}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </div>
        </div>
        {/* TABLE */}
        <div style={styles.tableWrap}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User ID</TableHead>
                <TableHead>Full Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Address</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {users.map((u) => (
                <TableRow key={u.id}>
                  <TableCell>{u.id}</TableCell>
                  <TableCell>{u.name}</TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>{u.address}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {/* BELOW TABLE */}
        {/* This is archive button */}
      </main>

    </div>
  );
}

const styles = {
  app: {
    minHeight: "80vh",
    background: "#020617",
    color: "#e5e7eb",
    fontFamily: "Inter, sans-serif",
  },
  buttonGroup: {
    display: "flex",
    gap: 12, // space between buttons
    alignItems: "center",
  },

  outlineSelect: {
    background: "transparent",
    border: "1px solid #f8f8f872",
    color: "#ffffff",
    fontWeight: "bold",
    padding: "6px 32px 6px 12px",

    borderRadius: 6,
    cursor: "pointer",
    fontSize: 13,
    lineHeight: 1.2,
    appearance: "none", // remove default arrow (Chrome)
    WebkitAppearance: "none", // Safari
    MozAppearance: "none",
    transition: "background 0.3s ease, color 0.3s ease, transform 0.3s ease",
  },

  outlineButton: {
    background: "transparent",
    border: "1px solid #f8f8f872",
    color: "#ffffff",
    fontWeight: "bold",
    padding: "6px 12px",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: 13,
    lineHeight: 1.2,

    // 👇 THIS makes it smooth
    transition:
      "background 0.50s ease, color 0.50s ease, opacity 0.50s ease, transform 0.50s ease",
  },

  OptionS: {
    background: "#020617",
    color: "#ffffff",
  },

  outlineButtonHover: {
    background: "rgba(255, 255, 255, 0.93)",
    color: "#000000cf",
    fontWeight: "bold",
  },

  selectWrapper: {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
  },

  selectIcon: {
    position: "absolute",
    right: 10,
    pointerEvents: "none", // 👈 IMPORTANT: lets clicks go to select
    color: "#ffffff",
    opacity: 0.7,
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
