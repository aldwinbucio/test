import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const reviews = [
  {
    title: 'Exploring Genetic Markers for Heart Disease Risk',
    dateAssigned: 'Oct 26,2023',
    dueDate: 'Nov 10,2023',
    researcher: 'Dr. Aldwin Bucio',
    status: 'Pending Review',
  },
  {
    title: "Efficacy of Novel Therapies for Alzheimer's Disease",
    dateAssigned: 'Oct 27,2023',
    dueDate: 'Nov 12,2023',
    researcher: 'Dr. Sophia Walker',
    status: 'Pending Review',
  },
];

const tabs = [
  { label: 'All', value: 'all' },
  { label: 'In Progress', value: 'inprogress' },
  { label: 'Completed', value: 'completed' },
  { label: 'Overdue', value: 'overdue' },
];

export default function AssignedReviews() {
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState('all');
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  // Filter logic placeholder
  const filteredReviews = reviews.filter(r =>
    r.title.toLowerCase().includes(search.toLowerCase()) ||
    r.researcher.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="max-w-6xl mx-auto bg-gray-50 px-10 py-8 min-h-screen">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Assigned Reviews</h1>
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search proposals by title or researcher"
            className="w-full rounded-xl border border-gray-300 px-5 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-pink-200 bg-gray-100"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-3 mb-6">
          {tabs.map(t => (
            <button
              key={t.value}
              className={`px-4 py-2 rounded-full font-medium text-sm border ${tab === t.value ? 'bg-gray-200 border-pink-700 text-pink-700' : 'bg-white border-gray-300 text-gray-500'} transition`}
              onClick={() => setTab(t.value)}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="bg-white rounded-2xl shadow border border-gray-200 overflow-x-auto">
          <table className="min-w-full text-left table-fixed">
            <thead>
              <tr>
                <th className="px-6 py-4 text-gray-500 font-semibold" style={{width: '32%'}}>Proposal Title</th>
                <th className="px-6 py-4 text-gray-500 font-semibold" style={{width: '14%'}}>Date Assigned</th>
                <th className="px-6 py-4 text-gray-500 font-semibold" style={{width: '14%'}}>Due Date</th>
                <th className="px-6 py-4 text-gray-500 font-semibold" style={{width: '16%'}}>Researcher</th>
                <th className="px-6 py-4 text-gray-500 font-semibold" style={{width: '14%'}}>Status</th>
                <th className="px-6 py-4 text-gray-500 font-semibold" style={{width: '10%'}}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReviews.map((r, idx) => (
                <tr key={idx} className="border-b border-gray-200 last:border-b-0">
                  <td className="px-6 py-4 whitespace-nowrap text-blue-700" style={{maxWidth: '0', overflow: 'hidden', textOverflow: 'ellipsis'}}>{r.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium" style={{paddingLeft: '1rem'}}>{r.dateAssigned}</td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">{r.dueDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="bg-blue-100 px-4 py-2 rounded-full font-semibold text-sm">{r.researcher}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="bg-gray-100 px-4 py-2 rounded-full font-semibold text-sm">{r.status}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      className="text-blue-700 font-medium hover:underline"
                      onClick={() => navigate('/reviewer/review-details')}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="flex justify-center items-center gap-4 mt-8">
          <button className="text-gray-400 text-xl" disabled>{'<'}</button>
          <span className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 font-semibold">1</span>
          <button className="text-gray-400 text-xl" disabled>{'>'}</button>
        </div>
    </main>
  );
}
