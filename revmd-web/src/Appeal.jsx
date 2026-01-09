import React, { useState } from 'react';
import './Appeal.css'; // Ensure this is linked correctly

const Appeal = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortCriteria, setSortCriteria] = useState('Appeal No.');

  // Example data
  const appeals = [
    { id: '4001', mechanicName: 'Mario Santos', mechanicID: '10002', status: 'Investigating', date: '2025-10-08 01:55:48 AM' },
    { id: '4002', mechanicName: 'Maria Santos', mechanicID: '10003', status: 'To Review', date: '2025-10-07 04:09:30 PM' },
    { id: '4003', mechanicName: 'Roberto Reyes', mechanicID: '10004', status: 'Declined', date: '2025-10-06 09:12:11 AM' },
    { id: '4004', mechanicName: 'Mark Dela Cruz', mechanicID: '10005', status: 'Resolved', date: '2025-10-05 08:56:24 PM' },
  ];

  // Filtered and sorted appeals
  const filteredAppeals = appeals.filter(appeal =>
    appeal.mechanicName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    appeal.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedAppeals = filteredAppeals.sort((a, b) => {
    if (sortCriteria === 'Appeal No.') {
      return a.id - b.id;
    } else if (sortCriteria === 'Date requested') {
      return new Date(a.date) - new Date(b.date);
    }
    return 0;
  });

  return (
    <div className="appeals-container">
      <div className="appeals-title">Appeals</div>

      {/* Search and Sort Bar */}
      <div className="search-sort-bar">
        <input
          type="text"
          className="search-input"
          placeholder="Search by mechanic name or status"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          className="sort-select"
          value={sortCriteria}
          onChange={(e) => setSortCriteria(e.target.value)}
        >
          <option value="Appeal No.">Sort by Appeal No.</option>
          <option value="Date requested">Sort by Date</option>
        </select>
      </div>

      {/* Table for User Reports */}
      <div className="appeals-table">
        <table>
          <thead>
            <tr>
              <th>Appeal No.</th>
              <th>Mechanic Name</th>
              <th>Mechanic ID</th>
              <th>Status</th>
              <th>Date requested</th>
            </tr>
          </thead>
          <tbody>
            {sortedAppeals.map((appeal) => (
              <tr key={appeal.id}>
                <td>{appeal.id}</td>
                <td>{appeal.mechanicName}</td>
                <td>{appeal.mechanicID}</td>
                <td><span className={`status-${appeal.status.toLowerCase().replace(' ', '-')}`}>{appeal.status}</span></td>
                <td>{appeal.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Appeal;