import React, { useState, useEffect } from 'react';

type Deviation = {
  id: number;
  title: string;
  description: string;
  date: string;
  status: string;
};

// Placeholder for API call
const fetchDeviations = async (): Promise<Deviation[]> => {
  // TODO: Replace with real API call
  return [];
};

const SDeviations = () => {
  const [deviations, setDeviations] = useState<Deviation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDeviations().then(data => {
      setDeviations(data);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <h1 className="text-[30px] font-medium p-4">Deviations</h1>
      {loading ? (
        <div className="text-center text-gray-500 py-8">Loading deviations...</div>
      ) : deviations.length === 0 ? (
        <div className="text-center text-gray-400 py-8">No deviations found.</div>
      ) : (
        <div className="overflow-x-auto mt-6">
          <table className="min-w-full text-sm border rounded-xl bg-white">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Title</th>
                <th className="px-4 py-3 text-left font-medium">Description</th>
                <th className="px-4 py-3 text-left font-medium">Date</th>
                <th className="px-4 py-3 text-left font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {deviations.map((dev) => (
                <tr key={dev.id} className="even:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-blue-700">{dev.title}</td>
                  <td className="px-4 py-3">{dev.description}</td>
                  <td className="px-4 py-3">{dev.date}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${dev.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : dev.status === 'Resolved' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>{dev.status}</span>
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