import React, { useState, useEffect } from "react";
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
  const [mechanics, setMechanics] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // optional for loading state

  useEffect(() => {
    const fetchMechanics = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/mechanics");
        const data = await res.json();
        setMechanics(
          data.map((m) => ({
            id: m.id,
            name: `${m.firstName} ${m.lastName}`,
            status: m.status || "Active",
            date: m.date,
            expertise: m.expertise || "",
          })),
        );
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    };

    fetchMechanics();
  }, []);

  // Modal + form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    lastName: "",
    firstName: "",
    email: "",
    expertise: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const resetForm = () =>
    setForm({
      lastName: "",
      firstName: "",
      email: "",
      expertise: "",
      password: "",
    });

  const openModal = () => {
    resetForm();
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  const handleCreate = async (e) => {
    e.preventDefault();

    if (
      !form.lastName.trim() ||
      !form.firstName.trim() ||
      !form.email.trim() ||
      !form.password.trim()
    ) {
      alert("Please fill in required fields.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/mechanics/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          password: form.password,
          expertise: form.expertise,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      // OPTIONAL: update UI immediately
      setMechanics((prev) => [
        {
          id: data.id,
          name: `${form.firstName} ${form.lastName}`,
          status: "Active",
          date: new Date().toLocaleString(),
          expertise: form.expertise,
        },
        ...prev,
      ]);

      closeModal();
    } catch (err) {
      console.error(err);
      alert("Failed to create account");
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

          <button style={styles.createButton} onClick={openModal}>
            Create Account
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
                      <button
                        type="button"
                        title="Edit mechanic"
                        aria-label="Edit mechanic"
                        style={{
                          ...styles.iconButton,
                          ...styles.editIconButton,
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="18"
                          height="18"
                          fill="#ffffff"
                          style={styles.iconSvg}
                        >
                          <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41L18.37 3.29a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                        </svg>
                      </button>

                      <button
                        type="button"
                        title="Archive mechanic"
                        aria-label="Archive mechanic"
                        style={{
                          ...styles.iconButton,
                          ...styles.archiveIconButton,
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
                          <path d="M9 3h6a1 1 0 0 1 1 1v1h3v2H4V5h3V4a1 1 0 0 1 1-1zm-3 7h12l-1 9a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2l-1-9zM10 11v6h2v-6h-2z" />
                        </svg>
                      </button>
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

      {/* CREATE ACCOUNT MODAL */}
      {isModalOpen && (
        <div style={styles.modalOverlay} onMouseDown={closeModal}>
          <div
            style={styles.modal}
            onMouseDown={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Create Mechanic Account"
          >
            <h2 style={styles.modalTitle}>Create Mechanic Account</h2>
            <form onSubmit={handleCreate}>
              <div style={styles.formRow}>
                <label style={styles.label}>Last Name</label>
                <input
                  style={styles.input}
                  placeholder="Enter last name"
                  value={form.lastName}
                  onChange={(e) =>
                    setForm((s) => ({ ...s, lastName: e.target.value }))
                  }
                />
              </div>

              <div style={styles.formRow}>
                <label style={styles.label}>First Name</label>
                <input
                  style={styles.input}
                  placeholder="Enter first name"
                  value={form.firstName}
                  onChange={(e) =>
                    setForm((s) => ({ ...s, firstName: e.target.value }))
                  }
                />
              </div>

              <div style={styles.formRow}>
                <label style={styles.label}>Email</label>
                <input
                  style={styles.input}
                  type="email"
                  placeholder="Enter email address"
                  value={form.email}
                  onChange={(e) =>
                    setForm((s) => ({ ...s, email: e.target.value }))
                  }
                />
              </div>

              <div style={styles.formRow}>
                <label style={styles.label}>Expertise</label>
                <input
                  style={styles.input}
                  placeholder="Type mechanic type (e.g., Engine Tuning)"
                  value={form.expertise}
                  onChange={(e) =>
                    setForm((s) => ({ ...s, expertise: e.target.value }))
                  }
                />
              </div>

              <div style={styles.formRow}>
                <label style={styles.label}>Password</label>
                <div style={{ position: "relative" }}>
                  <input
                    style={styles.input}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={form.password}
                    onChange={(e) =>
                      setForm((s) => ({ ...s, password: e.target.value }))
                    }
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    style={styles.eyeButton}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

              <div style={styles.modalActions}>
                <button
                  type="button"
                  style={styles.cancelButton}
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button type="submit" style={styles.createSubmitButton}>
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
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
