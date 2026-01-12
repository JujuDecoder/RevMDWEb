import React, { useState, useRef } from 'react';

const AppealChat = ({ appeal, onClose }) => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { sender: 'You', text: 'Hello, I need help with this appeal.' },
    { sender: 'Mechanic', text: 'Sure! How can I assist you?' },
  ]);

  const chatContainerRef = useRef(null); // Reference for chat container to scroll

  // Send message handler
  const handleSendMessage = () => {
    if (message.trim()) {
      setChatHistory([...chatHistory, { sender: 'You', text: message }]);
      setMessage('');
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight; // Auto scroll to bottom
    }
  };

  return (
    <div style={styles.modal}>
      <div style={styles.modalContent}>
        {/* CASE ID HEADER */}
        <div style={styles.modalHeader}>
          <h2 style={styles.caseId}>{appeal.mechanic}</h2>
          <button style={styles.closeButton} onClick={onClose}>&times;</button>
        </div>

        {/* Chat History */}
        <div
          style={styles.chatContainer}
          ref={chatContainerRef}
        >
          {chatHistory.map((chat, index) => (
            <div
              key={index}
              style={{
                ...styles.chatBubble,
                alignSelf: chat.sender === 'You' ? 'flex-end' : 'flex-start',
                backgroundColor: chat.sender === 'You' ? '#3B82F6' : '#374151',
                color: chat.sender === 'You' ? '#fff' : '#d1d5db'
              }}
            >
              <strong>{chat.sender}: </strong>{chat.text}
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div style={styles.inputContainer}>
          <textarea
            style={styles.textArea}
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            autoFocus
            rows="3"
          />
          <button style={styles.sendButton} onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default AppealChat;

const styles = {
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    background: '#1e293b',
    padding: '20px',
    borderRadius: '10px',
    width: '100%',
    maxWidth: '600px',
    height: '500px', // Fixed height for the modal
    display: 'flex',
    flexDirection: 'column',
    color: '#e5e7eb',
    fontSize: '16px',
  },
  modalHeader: {
    background: '#34495e',
    padding: '10px 20px',
    borderRadius: '10px 10px 0 0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '93%',
  },
  caseId: {
    fontSize: '20px',
    color: '#ffffff',
    fontWeight: 'bold',
    margin: 0,
  },
  closeButton: {
    background: 'none',
    border: 'none',
    color: '#ffffff',
    fontSize: '24px',
    cursor: 'pointer',
  },
  chatContainer: {
    backgroundColor: '#2d3748',
    padding: '10px',
    borderRadius: '8px',
    marginTop: '15px',
    flexGrow: 1, // Allow chat container to grow
    overflowY: 'auto',
    marginBottom: '15px',
  },
  chatBubble: {
    maxWidth: '100%',
    padding: '8px 15px',
    borderRadius: '15px',
    marginBottom: '8px',
    fontSize: '14px',
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginTop: '10px',
  },
  textArea: {
    background: '#374151',
    border: 'none',
    padding: '10px 14px',
    borderRadius: '10px',
    color: '#ffffff',
    width: '100%',
    resize: 'none',
  },
  sendButton: {
    background: '#3B82F6',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '10px',
    border: 'none',
    cursor: 'pointer',
    flexShrink: 0,
  }
};
