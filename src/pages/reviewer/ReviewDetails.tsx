import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// API service for review details
const API_BASE_URL = process.env.REACT_APP_API_URL || '/api';

type ReviewData = {
  id: number;
  status: string;
  researchTitle: string;
  researcherName: string;
  researcherEmail: string;
  submissionDate: string;
  reviewType: string;
  documents: { name: string; size: string }[];
};

const fetchReviewDetails = async (reviewId: number): Promise<ReviewData | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/reviews/${reviewId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch review details');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching review details:', error);
    return null;
  }
};

const submitReview = async (reviewId: number, result: string, feedback: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/reviews/${reviewId}/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ result, feedback }),
    });
    return response.ok;
  } catch (error) {
    console.error('Error submitting review:', error);
    return false;
  }
};

export default function ReviewDetails() {
  const [reviewData, setReviewData] = useState<ReviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showNotif, setShowNotif] = useState(false);
  const navigate = useNavigate();

  // Load review details on mount
  React.useEffect(() => {
    const loadReviewDetails = async () => {
      // TODO: Get review ID from URL params or props
      const reviewId = 1; // This should come from route params
      const data = await fetchReviewDetails(reviewId);
      setReviewData(data);
      setLoading(false);
    };
    
    loadReviewDetails();
  }, []);

  const handleSubmitReview = async () => {
    if (!reviewData || !result || !feedback.trim()) {
      alert('Please select a result and provide feedback');
      return;
    }
    
    const success = await submitReview(reviewData.id, result, feedback);
    if (success) {
      setShowNotif(true);
    } else {
      alert('Failed to submit review. Please try again.');
    }
  };

  if (loading) {
    return <div className="max-w-3xl mx-auto py-10 px-4">Loading review details...</div>;
  }

  if (!reviewData) {
    return <div className="max-w-3xl mx-auto py-10 px-4">Review not found.</div>;
  }

  return (
    
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Review Process</h1>
      <button className="mb-4 text-blue-600 hover:underline" onClick={() => navigate(-1)}>&larr; Back</button>
      <div className="grid grid-cols-2 gap-8 border-b pb-6 mb-8">
        <div>
          <div className="text-gray-500 text-sm mb-1">Status</div>
          <div className="font-semibold mb-4">{reviewData.status}</div>
          <div className="text-gray-500 text-sm mb-1">Researcher Name</div>
          <div className="mb-4">{reviewData.researcherName}</div>
          <div className="text-gray-500 text-sm mb-1">Submission Date</div>
          <div className="mb-4">{reviewData.submissionDate}</div>
        </div>
        <div>
          <div className="text-gray-500 text-sm mb-1">Research Title</div>
          <div className="font-semibold mb-4">{reviewData.researchTitle}</div>
          <div className="text-gray-500 text-sm mb-1">Researcher Email</div>
          <div className="mb-4">{reviewData.researcherEmail}</div>
          <div className="text-gray-500 text-sm mb-1">Review Type</div>
          <div className="mb-4">{reviewData.reviewType}</div>
        </div>
      </div>
      <div className="mb-8">
        <div className="font-bold text-lg mb-4">Review Documents</div>
        <div className="space-y-4">
          {reviewData.documents.map((doc, idx) => (
            <div key={idx} className="flex items-center gap-4 bg-gray-50 rounded-lg p-4">
              <span className="text-2xl bg-gray-100 rounded-lg p-2">📄</span>
              <div className="flex-1">
                <div className="font-medium">{doc.name}</div>
                <div className="text-xs text-gray-500">{doc.size}</div>
              </div>
              <button className="bg-gray-100 px-4 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-200">Download</button>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-8">
        <div className="font-bold text-lg mb-4">Review Results</div>
        <div className="flex gap-4 mb-4">
          <button
            className={`px-6 py-2 rounded-lg border font-semibold ${result === 'approve' ? 'bg-blue-700 text-white border-blue-700' : 'bg-white text-gray-700 border-gray-300'}`}
            onClick={() => setResult('approve')}
          >
            Approve
          </button>
          <button
            className={`px-6 py-2 rounded-lg border font-semibold ${result === 'revisions' ? 'bg-red-700 text-white border-red-700' : 'bg-white text-gray-700 border-gray-300'}`}
            onClick={() => setResult('revisions')}
          >
            Revisions Required
          </button>
        </div>
      </div>
      <div className="mb-8">
        <div className="font-bold text-lg mb-4">Review Feedback</div>
        <div className="flex items-center gap-2">
          <span className="text-blue-600 text-xl">👤</span>
          <input
            type="text"
            className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="Enter feedback..."
            value={feedback}
            onChange={e => setFeedback(e.target.value)}
          />
        </div>
      </div>
      <div className="flex justify-end gap-4">
        <button className="bg-gray-100 px-6 py-2 rounded-lg font-semibold text-gray-700 hover:bg-gray-200">Cancel</button>
        <button
          className="bg-blue-600 px-6 py-2 rounded-lg font-semibold text-white hover:bg-blue-700"
          onClick={handleSubmitReview}
        >
          Submit Review
        </button>
      </div>

      {showNotif && (
        <div className="fixed left-1/2 top-1/2 z-50" style={{ transform: 'translate(-50%, -50%)' }}>
          <div className="relative bg-white rounded-2xl shadow-xl px-8 py-10 flex flex-col items-center justify-center animate-pop" style={{ minWidth: 400, minHeight: 200 }}>
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-xl"
              onClick={() => setShowNotif(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <span className="text-4xl bg-yellow-100 rounded-xl p-3 mb-4">👍</span>
            <div className="font-bold text-lg text-center">Review result has been<br/>forwarded to the REC Chairperson</div>
          </div>
          <style>{`
            @keyframes pop {
              0% { opacity: 0; transform: scale(0.9); }
              100% { opacity: 1; transform: scale(1); }
            }
            .animate-pop {
              animation: pop 0.3s cubic-bezier(.4,0,.2,1);
            }
          `}</style>
        </div>
      )}
    </div>
  );
}
