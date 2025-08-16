// API service for reviewer-related operations
const API_BASE_URL = process.env.REACT_APP_API_URL || '/api';

export type ReviewerStats = {
  assignedProposals: number;
  reviewsCompleted: number;
  pendingReviews: number;
};

export type Activity = {
  type: 'assignment' | 'review';
  title: string;
  date: string;
};

export type Deadline = {
  title: string;
  due: string;
};

export type AssignedReview = {
  id: number;
  title: string;
  dateAssigned: string;
  dueDate: string;
  researcher: string;
  status: string;
};

export type ReviewDetail = {
  id: number;
  status: string;
  researchTitle: string;
  researcherName: string;
  researcherEmail: string;
  submissionDate: string;
  reviewType: string;
  documents: { name: string; size: string }[];
};

export const fetchReviewerStats = async (): Promise<ReviewerStats> => {
  try {
    const response = await fetch(`${API_BASE_URL}/reviewer/stats`);
    if (!response.ok) {
      throw new Error('Failed to fetch reviewer stats');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching reviewer stats:', error);
    return { assignedProposals: 0, reviewsCompleted: 0, pendingReviews: 0 };
  }
};

export const fetchRecentActivities = async (): Promise<Activity[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/reviewer/activities`);
    if (!response.ok) {
      throw new Error('Failed to fetch recent activities');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching recent activities:', error);
    return [];
  }
};

export const fetchUpcomingDeadlines = async (): Promise<Deadline[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/reviewer/deadlines`);
    if (!response.ok) {
      throw new Error('Failed to fetch upcoming deadlines');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching upcoming deadlines:', error);
    return [];
  }
};

export const fetchAssignedReviews = async (): Promise<AssignedReview[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/reviewer/assigned-reviews`);
    if (!response.ok) {
      throw new Error('Failed to fetch assigned reviews');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching assigned reviews:', error);
    return [];
  }
};

export const fetchReviewDetails = async (reviewId: number): Promise<ReviewDetail | null> => {
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

export const submitReview = async (reviewId: number, result: string, feedback: string): Promise<boolean> => {
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