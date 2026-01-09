import React from 'react';

const Archive = ({ archivedReports, onClose }) => {
  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modal}>
        <h2 style={styles.modalTitle}>Archived Appeals</h2>
        <button style={styles.closeButton} onClick={onClose}>X</button>
        <div style={styles.modalBody}>
          {archivedReports.length === 0 ? (
            <p>No appeals archived yet.</p>
          ) : (
            <ul>
              {archivedReports.map((r) => (
                <li key={r.id}>
                  {r.id} - {r.mechanic} - {r.status}
                </li>
              ))}
            </ul>
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
    background: '#020617',
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '500px',
    width: '100%',
    color: '#e5e7eb',
  },
  modalTitle: {
    fontSize: '22px',
    marginBottom: '16px',
  },
  modalBody: {
    marginBottom: '20px',
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
};

export default Archive;
