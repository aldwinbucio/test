import React, { useState } from 'react';

// API service for reviewers
const API_BASE_URL = process.env.REACT_APP_API_URL || '/api';

type Reviewer = {
  id: number;
  name: string;
  avatar: string;
  status: string;
  assigned: boolean;
  specialty: string;
};

const fetchReviewers = async (): Promise<Reviewer[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/reviewers`);
    if (!response.ok) {
      throw new Error('Failed to fetch reviewers');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching reviewers:', error);
    return [];
  }
};

const assignReviewer = async (reviewerId: number, proposalId: number): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/reviewers/${reviewerId}/assign`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ proposalId }),
    });
    return response.ok;
  } catch (error) {
    console.error('Error assigning reviewer:', error);
    return false;
  }
};

const AssignReviewer = () => {
  const [reviewers, setReviewers] = useState<Reviewer[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNotif, setShowNotif] = useState(false);
  const [notifAnim, setNotifAnim] = useState(false);

  // Load reviewers on mount
  React.useEffect(() => {
    const loadReviewers = async () => {
      const data = await fetchReviewers();
      setReviewers(data);
      setLoading(false);
    };
    
    loadReviewers();
  }, []);

  const handleAssign = async (reviewerId: number) => {
    // TODO: Get actual proposal ID from context or props
    const proposalId = 1; // This should come from the current proposal being assigned
    
    const success = await assignReviewer(reviewerId, proposalId);
    if (success) {
      setReviewers(prev => prev.map(r => 
        r.id === reviewerId 
          ? { ...r, assigned: true, status: 'Not Available' }
          : r
      ));
      setShowNotif(true);
      setTimeout(() => setNotifAnim(true), 10);
    }
  };

  const closeNotif = () => {
    setNotifAnim(false);
    setTimeout(() => setShowNotif(false), 200); 
  };

  return (
    <div className="p-6 relative min-h-[400px]">
      <h1 className="text-3xl font-semibold mb-6">Assign Reviewer</h1>
      
      {loading ? (
        <div className="text-center py-8">Loading reviewers...</div>
      ) : (
      <div className="overflow-x-auto">
        <table className="min-w-[600px] w-full bg-white rounded-lg">
          <thead>
            <tr>
              <th className="text-left px-6 py-3 text-lg font-bold">Reviewer</th>
              <th className="text-left px-6 py-3 text-lg font-bold">Specialty</th>
              <th className="text-left px-6 py-3 text-lg font-bold">Status</th>
              <th className="text-left px-6 py-3 text-lg font-bold">Action</th>
            </tr>
          </thead>
          <tbody>
            {reviewers.map((rev) => (
              <tr key={rev.id} className="border-b last:border-b-0">
                <td className="flex items-center gap-4 px-6 py-4">
                  <img src={rev.avatar} alt={rev.name} className="w-14 h-14 rounded-full object-cover" />
                  <span className="font-medium text-base">{rev.name}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-gray-700 font-medium">{rev.specialty}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={
                    rev.status === 'Available'
                      ? 'text-blue-700 font-semibold'
                      : 'text-gray-500 font-semibold'
                  }>
                    {rev.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {rev.assigned ? (
                    <button className="bg-red-700 text-white px-6 py-2 rounded-lg font-semibold cursor-not-allowed" disabled>
                      Assigned
                    </button>
                  ) : (
                    <button
                      className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
                      onClick={() => handleAssign(rev.id)}
                    >
                      Assign Reviewer
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )}
      
      {/* Animated Notification Modal */}
      {showNotif && (
        <div className={`fixed inset-0 flex items-center justify-center z-50 bg-black/10 transition-opacity duration-200 ${notifAnim ? 'opacity-100' : 'opacity-0'}`}>
          <div className={`bg-white rounded-2xl shadow-2xl p-10 min-w-[400px] min-h-[180px] flex items-center relative transition-all duration-200 ${notifAnim ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`} style={{ boxShadow: '0 8px 32px 0 rgba(60,60,60,0.12)' }}>
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl font-bold"
              onClick={closeNotif}
              aria-label="Close"
            >
              &times;
            </button>
            <div className="flex items-center gap-4 mx-auto">
              <span className="text-4xl bg-yellow-100 rounded-lg p-3">👍</span>
              <span className="font-semibold text-lg">Designated Reviewer Has<br />Been Assigned</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignReviewer;
