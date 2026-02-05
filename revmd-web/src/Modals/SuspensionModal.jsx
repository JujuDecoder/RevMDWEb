import React, { useState } from "react";

const SuspensionModal = ({ mechanic, closeModal, suspend }) => {
  const [suspensionDuration, setSuspensionDuration] = useState("1 week");

  const handleSuspendClick = () => {
    suspend(mechanic.id, suspensionDuration);
  };

  return (
    <div style={styles.overlay} onMouseDown={closeModal}>
      <div style={styles.modal} onMouseDown={(e) => e.stopPropagation()}>
        <h2 style={styles.title}>Do you want to suspend {mechanic.name}?</h2>
        <div style={styles.formRow}>
          <label style={styles.label}>Select Suspension Duration</label>
          <select
            value={suspensionDuration}
            onChange={(e) => setSuspensionDuration(e.target.value)}
            style={styles.select}
          >
            <option value="1 week">1 Week</option>
            <option value="1 month">1 Month</option>
            <option value="permanent">Permanent</option>
          </select>
        </div>
        <div style={styles.actions}>
          <button style={styles.cancelButton} onClick={closeModal}>
            Cancel
          </button>
          <button style={styles.suspendButton} onClick={handleSuspendClick}>
            Suspend
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    background: "#fff",
    padding: "20px",
    borderRadius: "8px",
    width: "400px",
    textAlign: "center",
  },
  title: {
    fontSize: "18px",
    marginBottom: "20px",
  },
  formRow: {
    marginBottom: "15px",
  },
  label: {
    fontSize: "14px",
    marginBottom: "6px",
  },
  select: {
    padding: "8px",
    borderRadius: "5px",
    width: "100%",
    fontSize: "14px",
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
  },
  cancelButton: {
    backgroundColor: "#ccc",
    border: "none",
    padding: "10px 20px",
    cursor: "pointer",
    borderRadius: "5px",
  },
  suspendButton: {
    backgroundColor: "#f97316",
    border: "none",
    padding: "10px 20px",
    cursor: "pointer",
    borderRadius: "5px",
  },
};

export default SuspensionModal;
