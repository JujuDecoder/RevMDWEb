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
    <div className="fixed inset-0 bg-[#1e293b] bg-opacity-80 flex justify-center items-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg w-96 max-h-[500px] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-lg">{appeal.mechanic}</h2>
          <button
            className="text-white text-xl"
            onClick={onClose} // Close the modal
          >
            &times;
          </button>
        </div>

        {/* Chat History */}
        <div
          className="bg-gray-700 p-4 mb-4 rounded-lg flex-grow overflow-y-auto"
          ref={chatContainerRef}
        >
          {chatHistory.map((chat, index) => (
            <div
              key={index}
              className={`mb-2 text-sm ${chat.sender === 'You' ? 'text-blue-300 self-end' : 'text-gray-300 self-start'}`}
            >
              <div className={`inline-block p-3 rounded-lg ${chat.sender === 'You' ? 'bg-blue-500' : 'bg-gray-600'}`}>
                <strong>{chat.sender}: </strong>{chat.text}
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="flex items-center space-x-4 mt-2">
          <textarea
            className="px-4 py-2 bg-gray-600 text-white rounded-lg w-full"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            autoFocus // Keeps focus on the input
            rows="3"
          />
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppealChat;
