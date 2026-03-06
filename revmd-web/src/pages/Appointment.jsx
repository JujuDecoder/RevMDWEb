import { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../components/ui/table";
import { FiEye, FiX } from "react-icons/fi";

export default function Appointment() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [appointments, setAppointments] = useState([]);
  const filteredAppointments = appointments.filter(
    (a) =>
      (statusFilter === "All" || a.status === statusFilter) &&
      (
        a.mechanic.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.mechanic.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.id.includes(searchQuery)
      )
  );

  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;

  const paginatedAppointments = filteredAppointments.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const fetchAppointments = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/appointments");
      const data = await response.json();

      const formatted = data.map((item) => ({
        id: item.id,
        mechanic: item.mechanicName,
        status: item.status,
        date: item.date + " " + item.timeSlot,
        fee: item.appointmentFee,
        paid: item.isPaid ? "Paid" : "Unpaid",
      }));

      setAppointments(formatted);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };
  useEffect(() => {
  fetchAppointments();
}, []);
  return (
    <div style={styles.app}>
      <main style={styles.main}>
        <h1 style={styles.title}>Appointments</h1>

        <div style={styles.searchRow}>
  <div style={styles.searchWrapper}>
    <input
      placeholder="Search by ID, Customer, or Mechanic"
      style={styles.search}
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  </div>

  <div style={styles.filterGroup}>
    <select
  value={statusFilter}
  onChange={(e) => setStatusFilter(e.target.value)}
  style={styles.statusFilter}
>
  <option value="All">All Status</option>
  <option value="On Going">On Going</option>
  <option value="Scheduled">Scheduled</option>
  <option value="Completed">Completed</option>
  <option value="Cancelled">Cancelled</option>
</select>

    <button style={styles.viewArchiveBtn}>Archive</button>
  </div>
</div>

<div style={styles.tableContainer}>
  <div style={styles.tableWrap}>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Appointment ID</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Mechanic</TableHead>
          <TableHead>Service</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date & Time</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {paginatedAppointments.map((a) => (
          <TableRow key={a.id}>
            <TableCell>{a.id}</TableCell>
            <TableCell>{a.customer}</TableCell>
            <TableCell>{a.mechanic}</TableCell>
            <TableCell>{a.service}</TableCell>
            <TableCell>
              <span style={statusStyle(a.status)}>
                {a.status}
              </span>
            </TableCell>
            <TableCell>{a.date}</TableCell>
            <TableCell>
             <div style={styles.actionRow}>
  <button style={styles.viewBtn}>
    <FiEye size={18} />
  </button>

  <button style={styles.cancelBtn}>
    <FiX size={18} />
  </button>
</div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>

  {/* PAGINATION */}
  <div style={styles.paginationContainer}>
    <div style={styles.paginationButtons}>
      <button
        style={{
          ...styles.paginationBtn,
          opacity: currentPage === 1 ? 0.5 : 1,
          cursor: currentPage === 1 ? "not-allowed" : "pointer",
        }}
        onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
        disabled={currentPage === 1}
      >
        ← Previous
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          style={{
            ...styles.paginationBtn,
            background: currentPage === page ? "#dbeafe" : "#ffffff",
            color: "#111827",
            fontWeight: currentPage === page ? 600 : 500,
            border:
              currentPage === page
                ? "1px solid #93c5fd"
                : "1px solid #e5e7eb",
          }}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </button>
      ))}

      <button
        style={{
          ...styles.paginationBtn,
          opacity: currentPage === totalPages ? 0.5 : 1,
          cursor:
            currentPage === totalPages ? "not-allowed" : "pointer",
        }}
        onClick={() =>
          setCurrentPage((prev) =>
            Math.min(totalPages, prev + 1)
          )
        }
        disabled={currentPage === totalPages}
      >
        Next →
      </button>
    </div>
  </div>
</div>
       
      </main>
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {

  tableContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 0,
  },

  tableWrap: {
    border: "1px solid #e5e7eb",
    borderRadius: "14px 14px 0 0",
    overflow: "hidden",
    background: "#ffffff",
  },

  paginationContainer: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: "16px 20px",
    background: "#ffffff",
    borderRadius: "0 0 14px 14px",
    border: "1px solid #e5e7eb",
    borderTop: "none",
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
  main: { padding: 24 },

  title: {
    fontSize: 28,
    marginBottom: 20,
    fontWeight: 700,
    color: "#111827",
  },

  searchRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  searchWrapper: {
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

  tableWrap: {
    border: "1px solid #e5e7eb",
    borderRadius: 14,
    overflow: "hidden",
    background: "#ffffff",
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

  actionRow: {
    display: "flex",
    gap: 8,
  },

  viewBtn: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    padding: "6px 12px",
    cursor: "pointer",
  },

  cancelBtn: {
    background: "#ef4444",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    padding: "6px 12px",
    cursor: "pointer",
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
viewBtn: {
  background: "transparent",
  border: "none",
  color: "#2563eb",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 4,
},
cancelBtn: {
  background: "transparent",
  border: "none",
  color: "#ef4444",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 4,
},
};

const statusStyle = (status) => ({
  padding: "6px 14px",
  borderRadius: 999,
  fontSize: 12,
  fontWeight: 600,
  display: "inline-block",
  background:
    status === "On Going"
      ? "#dbeafe"      // blue
      : status === "Completed"
        ? "#dcfce7"      // green
        : status === "Scheduled"
          ? "#e0f2fe"      // light blue
          : status === "Cancelled"
            ? "#fee2e2"      // red
            : "#f3f4f6",
  color:
    status === "On Going"
      ? "#1d4ed8"
      : status === "Completed"
        ? "#15803d"
        : status === "Scheduled"
          ? "#0369a1"
          : status === "Cancelled"
            ? "#b91c1c"
            : "#374151",
});