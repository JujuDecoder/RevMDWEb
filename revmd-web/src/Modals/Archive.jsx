import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../components/ui/table";

const Archive = ({ archivedReports, onClose }) => {
  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modal}>
        {/* Header with title and close button */}
        <div style={styles.headerContainer}>
          <h2 style={styles.modalTitle}>Archived Appeals</h2>
          <button style={styles.closeButton} onClick={onClose}>
            X
          </button>
        </div>

        {/* Modal Body */}
        <div style={styles.modalBody}>
          {archivedReports.length === 0 ? (
            <p>No appeals archived yet.</p>
          ) : (
            <div style={styles.dataGrid}>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Appeal ID</TableHead>
                    <TableHead>Mechanic</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {archivedReports.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell>{r.id}</TableCell>
                      <TableCell>{r.mechanic}</TableCell>
                      <TableCell>{r.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    background: '#374151',
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '600px', // Fixed width
    width: '100%',
    height: '500px', // Fixed height
    color: '#e5e7eb',
    display: 'flex',
    flexDirection: 'column',
  },
  headerContainer: {
    display: 'flex', // Using flexbox to align items
    justifyContent: 'space-between', // Title on the left, close button on the right
    alignItems: 'center', // Vertically center both elements
    marginBottom: '16px', // Space below the header
  },
  modalTitle: {
    fontSize: '22px',
    color: '#ffffff',
    margin: 0, // Remove default margin to keep it tight
  },
  closeButton: {
    background: '#ef4444',
    border: 'none',
    padding: '8px 16px',
    color: '#fff',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  modalBody: {
    overflowY: 'auto', // Enable scrolling for content
    flex: 1,
  },
  dataGrid: {
    overflowY: 'auto', // Ensure the table scrolls if there are too many items
    height: '100%', // Allow table to take full height within modal
  },
};

export default Archive;
