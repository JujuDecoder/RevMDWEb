import { useState } from 'react';

export default function Accounts() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [accounts] = useState([
    { id: '10001', fullName: 'Juan Dela Cruz', status: 'Active', lastUpdated: '2025-10-08 01:55:48 AM' },
    { id: '10002', fullName: 'Maria Santos', status: 'Suspended', lastUpdated: '2025-10-07 04:09:30 PM' },
    { id: '10003', fullName: 'Roberto Reyes', status: 'Suspended', lastUpdated: '2025-10-06 09:12:11 AM' },
  ]);

  const filteredAccounts = accounts.filter((r) => {
    const matchesSearch = r.fullName.toLowerCase().includes(searchQuery.toLowerCase()) || r.id.includes(searchQuery);
    const matchesStatus = selectedStatus ? r.status === selectedStatus : true;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex min-h-screen bg-[#020617] text-white font-inter">
      <main className="flex-1 p-6">
        {/* Top Bar */}
        <div className="flex justify-between mb-6">
          <div className="relative flex items-center w-[260px]">
            <input
              placeholder="Search"
              className="bg-[#1e293b] text-white p-2 rounded-xl w-full focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#94a3b8]">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#94a3b8" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="16" y1="16" x2="20" y2="20" />
              </svg>
            </div>
          </div>
          <div className="text-xl">🔔 👤</div>
        </div>

        {/* Title */}
        <h1 className="text-3xl mb-5">Mechanic Accounts</h1>

        {/* Filters */}
        <div className="flex gap-3 mb-5">
          <select
            className="bg-[#1e293b] text-[#e5e7eb] p-3 rounded-xl"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Suspended">Suspended</option>
          </select>
          <input type="date" className="bg-[#1e293b] text-[#e5e7eb] p-3 rounded-xl" />
          <input type="date" className="bg-[#1e293b] text-[#e5e7eb] p-3 rounded-xl" />
        </div>

        {/* Table */}
        <div className="overflow-auto bg-[#020617] rounded-xl border border-[#1e293b]">
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="py-4 px-6 text-left text-sm font-semibold text-[#94a3b8] bg-[#020617] border-b border-[#1e293b]">Mechanic ID</th>
                <th className="py-4 px-6 text-left text-sm font-semibold text-[#94a3b8] bg-[#020617] border-b border-[#1e293b]">Full Name</th>
                <th className="py-4 px-6 text-left text-sm font-semibold text-[#94a3b8] bg-[#020617] border-b border-[#1e293b]">Status</th>
                <th className="py-4 px-6 text-left text-sm font-semibold text-[#94a3b8] bg-[#020617] border-b border-[#1e293b]">Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {filteredAccounts.map((account) => (
                <tr key={account.id} className="border-t border-[#1e293b]">
                  <td className="py-4 px-6 text-sm">{account.id}</td>
                  <td className="py-4 px-6 text-sm">{account.fullName}</td>
                  <td className="py-4 px-6 text-sm">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs ${statusClass(account.status)}`}>{account.status}</span>
                  </td>
                  <td className="py-4 px-6 text-sm">{account.lastUpdated}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="p-4 text-sm text-[#94a3b8]">
            Showing {filteredAccounts.length} of {accounts.length} results
          </div>
        </div>
      </main>
    </div>
  );
}

const statusClass = (status) => {
  switch (status) {
    case 'Active':
      return 'bg-green-700 text-green-200';
    case 'Suspended':
      return 'bg-yellow-500 text-yellow-900';
    default:
      return 'bg-gray-500 text-gray-200';
  }
};
