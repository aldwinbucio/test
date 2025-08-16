import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type Deviation = {
  id: number;
  title: string;
  researcher: string;
  dateReported: string;
  type: string;
  severity: string;
  status: string;
};

const dummyDeviations: Deviation[] = [
  {
    id: 1,
    title: 'Study of Aging and Memory',
    researcher: 'Jane Smith',
    dateReported: '02/01/2023',
    type: 'Informed Consent',
    severity: 'Minor',
    status: 'Resolved',
  },
  {
    id: 2,
    title: 'COVID-19 Vaccine Efficacy',
    researcher: 'John Doe',
    dateReported: '02/01/2023',
    type: 'Informed Consent',
    severity: 'Minor',
    status: 'Resolved',
  },
  {
    id: 3,
    title: 'Nutritional Habits in Adolescents',
    researcher: 'Sarah Johnson',
    dateReported: '02/01/2023',
    type: 'Informed Consent',
    severity: 'Not Assigned',
    status: 'Pending/View',
  },
  {
    id: 4,
    title: 'Mental Health Treatment Outcomes',
    researcher: 'Michael Brown',
    dateReported: '02/01/2023',
    type: 'Adverse Events',
    severity: 'Major',
    status: 'In Review',
  },
  {
    id: 5,
    title: 'Environmental Factors and Allergies',
    researcher: 'David Lee',
    dateReported: '02/01/2023',
    type: 'Sample Collection',
    severity: 'Not Assigned',
    status: 'Pending/View',
  },
  {
    id: 6,
    title: 'Employment Practices in Tech Industry',
    researcher: 'Emily Davis',
    dateReported: '02/01/2023',
    type: 'Confidentiality Breach',
    severity: 'Major',
    status: 'Resolved',
  },
  {
    id: 7,
    title: 'Agricultural Innovations and Crop Yield',
    researcher: 'Daniel Kim',
    dateReported: '02/01/2023',
    type: 'Regulatory Compliance',
    severity: 'Not Assigned',
    status: 'Pending/View',
  },
];

const fetchDeviations = async (): Promise<Deviation[]> => {
  return dummyDeviations;
};

const SDeviations = () => {
  const [deviations, setDeviations] = useState<Deviation[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [severityFilter, setSeverityFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const navigate = useNavigate();

  useEffect(() => {
    fetchDeviations().then(data => {
      setDeviations(data);
      setLoading(false);
    });
  }, []);

  // filiter options
  const severityOptions = ['All', ...Array.from(new Set(dummyDeviations.map(d => d.severity)))];
  const typeOptions = ['All', ...Array.from(new Set(dummyDeviations.map(d => d.type)))];
  const statusOptions = ['All', ...Array.from(new Set(dummyDeviations.map(d => d.status)))];

  // Filter para sa deviations
  const filtered = deviations.filter(dev => {
    const matchesSearch = dev.title.toLowerCase().includes(search.toLowerCase());
    const matchesSeverity = severityFilter === 'All' || dev.severity === severityFilter;
    const matchesType = typeFilter === 'All' || dev.type === typeFilter;
    const matchesStatus = statusFilter === 'All' || dev.status === statusFilter;
    return matchesSearch && matchesSeverity && matchesType && matchesStatus;
  });

  return (
    <div>
      <h1 className="text-[30px] font-medium p-4">Deviation</h1>
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row md:items-center gap-3 px-4 mb-4">
        <input
          type="text"
          className="w-full md:w-1/3 rounded-xl border border-gray-200 px-4 py-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-200"
          placeholder="Search Deviation by Title"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div className="flex gap-2 flex-wrap">
          <select
            className="rounded-full px-4 py-1 border border-gray-200 bg-white text-sm"
            value={severityFilter}
            onChange={e => setSeverityFilter(e.target.value)}
          >
            {severityOptions.map(opt => (
              <option key={opt} value={opt}>{opt === 'Not Assigned' ? 'Not Assigned' : opt}</option>
            ))}
          </select>
          <select
            className="rounded-full px-4 py-1 border border-gray-200 bg-white text-sm"
            value={typeFilter}
            onChange={e => setTypeFilter(e.target.value)}
          >
            {typeOptions.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          <select
            className="rounded-full px-4 py-1 border border-gray-200 bg-white text-sm"
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
          >
            {statusOptions.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      </div>
      {loading ? (
        <div className="text-center text-gray-500 py-8">Loading deviations...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center text-gray-400 py-8">No deviations found.</div>
      ) : (
        <div className="overflow-x-auto mt-6">
          <table className="min-w-full text-sm border rounded-xl bg-white">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Study/Proposal Title</th>
                <th className="px-4 py-3 text-left font-medium">Researcher</th>
                <th className="px-4 py-3 text-left font-medium">Date Reported</th>
                <th className="px-4 py-3 text-left font-medium">Type</th>
                <th className="px-4 py-3 text-left font-medium">Severity</th>
                <th className="px-4 py-3 text-left font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((dev) => (
                <tr key={dev.id} className="even:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-blue-700 cursor-pointer hover:underline">{dev.title}</td>
                  <td className="px-4 py-3">{dev.researcher}</td>
                  <td className="px-4 py-3 text-blue-700/80 font-medium">{dev.dateReported}</td>
                  <td className="px-4 py-3 font-semibold"><span className="bg-gray-100 px-2 py-1 rounded-md">{dev.type}</span></td>
                  <td className="px-4 py-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 ${dev.severity === 'Major' ? 'text-red-700' : dev.severity === 'Minor' ? 'text-blue-700' : 'text-gray-500'}`}>{dev.severity}</span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      className={`px-5 py-2 rounded-lg font-semibold border transition text-sm focus:outline-none
                        ${dev.status === 'Resolved' ? 'bg-blue-500 text-white border-blue-500 hover:bg-blue-600' :
                          dev.status === 'In Review' ? 'bg-yellow-400 text-white border-yellow-400 hover:bg-yellow-500' :
                          'bg-white text-blue-700 border-blue-400 hover:bg-blue-50'}
                      `}
                      onClick={() => navigate(`/staff/deviations/${dev.id}`)}
                    >
                      {dev.status}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SDeviations;