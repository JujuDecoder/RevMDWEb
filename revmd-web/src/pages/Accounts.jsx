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
  const [accountType, setAccountType] = useState("Mechanic");

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
    workingHours: "", // 👈 NEW
  });

  const [showPassword, setShowPassword] = useState(false);

  const resetForm = () =>
    setForm({
      lastName: "",
      firstName: "",
      email: "",
      expertise: "",
      password: "",
      workingHours: "", // 👈 NEW
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstname: form.firstName,   // 👈 match backend
          lastname: form.lastName,     // 👈 match backend
          email: form.email,
          password: form.password,
          expertise: form.expertise,
          workingHours: form.workingHours,
          averageRating: 5.0,          // ⭐ auto
          ratingCount: 120,            // ⭐ auto
        }),

      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.message);
        return;
      }
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

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this mechanic?",
    );
    if (!confirmDelete) return;
    try {
      const res = await fetch(
        `http://localhost:5000/api/mechanics/archive/${id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        },
      );
      if (!res.ok) {
        throw new Error("Failed to archive mechanic");
      }
      setMechanics((prev) => prev.filter((mechanic) => mechanic.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete mechanic");
    }
    console.log("Deleting mechanic with ID:", id);
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
                stroke="#9ca3af"
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

                  if (value === "User") {
                    navigate("/dashboard/users");
                  }

                  if (value === "Mechanic") {
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
            {/* CREATE */}
            <button
              style={{
                ...styles.outlineButton,
                ...(hoveredBtn === "create" ? styles.outlineButtonHover : {}),
              }}
              onMouseEnter={() => handleMouseEnter("create")}
              onMouseLeave={handleMouseLeave}
              onClick={openModal}
            >
              Create Account
            </button>

            {/* ARCHIVE */}
            <button
              style={{
                ...styles.outlineButton,
                ...(hoveredBtn === "archive" ? styles.outlineButtonHover : {}),
              }}
              onMouseEnter={() => handleMouseEnter("archive")}
              onMouseLeave={handleMouseLeave}
              onClick={() => navigate("/dashboard/archive-accounts")}
            >
              Archive
            </button>
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
                      {/* Delete Button */}
                      <button
                        type="button"
                        title="Delete mechanic"
                        style={{
                          ...styles.iconButton,
                          ...styles.deleteIconButton,
                        }}
                        onClick={() => handleDelete(m.id)}
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
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {/* BELOW TABLE */}
        {/* This is archive button */}
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
                <label style={styles.label}>Working Hours</label>
                <input
                  style={styles.input}
                  placeholder="e.g. Mon–Fri 9AM–6PM"
                  value={form.workingHours}
                  onChange={(e) =>
                    setForm((s) => ({ ...s, workingHours: e.target.value }))
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
                  {" "}
                  Cancel{" "}
                </button>
                <button type="submit" style={styles.createSubmitButton}>
                  {" "}
                  Create Account{" "}
                </button>
              </div>
            </form>
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
  buttonGroup: {
    display: "flex",
    gap: 12, // space between buttons
    alignItems: "center",
  },

  outlineSelect: {
  background: "#ffffff",
  border: "1px solid #e5e7eb",
  color: "#374151",
  fontWeight: 600,
  padding: "6px 32px 6px 12px",
  borderRadius: 8,
  cursor: "pointer",
  fontSize: 13,
  lineHeight: 1.2,
  appearance: "none",
  WebkitAppearance: "none",
  MozAppearance: "none",
  transition: "all 0.2s ease",
},

  outlineButton: {
  background: "#ffffff",
  border: "1px solid #e5e7eb",
  color: "#374151",
  fontWeight: 600,
  padding: "6px 14px",
  borderRadius: 8,
  cursor: "pointer",
  transition: "all 0.2s ease",
},

  OptionS: {
    background: "#020617",
    color: "#ffffff",
  },

  outlineButtonHover: {
  background: "#f3f4f6",
  color: "#111827",
},

  selectWrapper: {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
  },

  selectIcon: {
  position: "absolute",
  right: 10,
  pointerEvents: "none",
  color: "#6b7280",
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
  color: "#111827",
  padding: "10px 14px",
  borderRadius: 10,
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
    background: "rgba(0,0,0,0.35)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2000,
  },
  modal: {
  width: 520,
  padding: 24,
  background: "#ffffff",
  borderRadius: 16,
  border: "1px solid #e5e7eb",
  boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
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
  color: "#111827",   // dark black
  fontSize: 14,
  fontWeight: 600,    // bold
},
  input: {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 8,
  border: "1px solid #e5e7eb",
  background: "#ffffff",
  color: "#111827",
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
    background: "#f3f4f6",
  border: "1px solid #e5e7eb",
  color: "#374151",
    padding: "8px 14px",
    borderRadius: 8,
    cursor: "pointer",
  },
  createSubmitButton: {
  background: "#2563eb",
  color: "#ffffff",
  border: "none",
  padding: "8px 16px",
  borderRadius: 8,
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
      ? "#dcfce7"
      : status === "Suspended"
        ? "#fef9c3"
        : "#f3f4f6",
  color:
    status === "Active"
      ? "#15803d"
      : status === "Suspended"
        ? "#ca8a04"
        : "#374151",
});
