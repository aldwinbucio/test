import React, { useState } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay, parseISO } from 'date-fns';

// API service for reviewer dashboard data
const API_BASE_URL = process.env.REACT_APP_API_URL || '/api';

type ReviewerStats = {
  assignedProposals: number;
  reviewsCompleted: number;
  pendingReviews: number;
};

type Activity = {
  type: 'assignment' | 'review';
  title: string;
  date: string;
};

type Deadline = {
  title: string;
  due: string;
};

const fetchReviewerStats = async (): Promise<ReviewerStats> => {
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

const fetchRecentActivities = async (): Promise<Activity[]> => {
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

const fetchUpcomingDeadlines = async (): Promise<Deadline[]> => {
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

export default function ReviewerDashboard() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [stats, setStats] = useState<ReviewerStats>({ assignedProposals: 0, reviewsCompleted: 0, pendingReviews: 0 });
  const [activities, setActivities] = useState<Activity[]>([]);
  const [upcomingDeadlines, setUpcomingDeadlines] = useState<Deadline[]>([]);
  const [loading, setLoading] = useState(true);

  // Load dashboard data on mount
  React.useEffect(() => {
    const loadDashboardData = async () => {
      const [statsData, activitiesData, deadlinesData] = await Promise.all([
        fetchReviewerStats(),
        fetchRecentActivities(),
        fetchUpcomingDeadlines()
      ]);
      
      setStats(statsData);
      setActivities(activitiesData);
      setUpcomingDeadlines(deadlinesData);
      setLoading(false);
    };
    
    loadDashboardData();
  }, []);

  // Convert upcomingDeadlines to date objects for highlighting
  const deadlineDates = upcomingDeadlines.map(d => {
    // Try to parse the due date string
    const parsed = Date.parse(d.due);
    if (!isNaN(parsed)) return new Date(parsed);
    // Fallback for custom format (e.g., Nov 10, 2023)
    const [month, day, year] = d.due.replace(/,/g, '').split(' ');
    return new Date(`${month} ${day}, ${year}`);
  });

  const renderHeader = () => (
    <div className="flex justify-between items-center mb-2">
      <button
        type="button"
        className="px-2 py-1 rounded hover:bg-blue-100"
        onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
      >
        &lt;
      </button>
      <div className="text-center text-gray-700 font-medium">
        {format(currentMonth, 'MMMM yyyy')}
      </div>
      <button
        type="button"
        className="px-2 py-1 rounded hover:bg-blue-100"
        onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
      >
        &gt;
      </button>
    </div>
  );

  const renderDays = () => {
    const days = [];
    const startDate = startOfWeek(startOfMonth(currentMonth));
    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={i} className="text-center text-gray-500 text-sm font-medium">
          {format(addDays(startDate, i), 'EEE')}
        </div>
      );
    }
    return <div className="grid grid-cols-7 gap-1">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const rows = [];
    let days = [];
    let day = startDate;
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const isDeadline = deadlineDates.some(d => isSameDay(d, day) && isSameMonth(d, currentMonth));
        days.push(
          <div
            key={day.toString()}
            className={`py-1 rounded-lg cursor-pointer text-center text-sm ${isSameMonth(day, monthStart) ? '' : 'text-gray-300'} ${isSameDay(day, selectedDate) ? 'bg-blue-600 text-white font-bold' : isDeadline ? 'bg-blue-100 text-blue-700 font-semibold' : 'hover:bg-blue-50'}`}
            onClick={() => setSelectedDate(day)}
          >
            {format(day, 'd')}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(<div key={day.toString()} className="grid grid-cols-7 gap-1">{days}</div>);
      days = [];
    }
    return <div>{rows}</div>;
  };

  if (loading) {
    return <div className="max-w-4xl mx-auto py-10 px-4">Loading dashboard...</div>;
  }

  const reviewerStatsArray = [
    { label: 'Assigned Proposals', value: stats.assignedProposals },
    { label: 'Reviews Completed', value: stats.reviewsCompleted },
    { label: 'Pending Reviews', value: stats.pendingReviews },
  ];

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Reviewer Dashboard</h1>
      <div className="mb-8">
        <div className="text-lg font-semibold text-gray-700 mb-2">Overview</div>
        <div className="flex gap-8 mb-6">
          {reviewerStatsArray.map(stat => (
            <div key={stat.label} className="bg-gray-50 border border-gray-200 rounded-xl px-8 py-6 flex flex-col items-center min-w-[160px] shadow-sm">
              <div className="text-lg font-medium text-gray-600 mb-2">{stat.label}</div>
              <div className="text-3xl font-bold text-blue-700">{stat.value}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-8">
        <div className="text-lg font-semibold text-gray-700 mb-2">Recent Activities</div>
        <div className="space-y-3">
          {activities.length === 0 ? (
            <div className="text-center text-gray-400 py-4">No recent activities</div>
          ) : (
            activities.map((activity, idx) => (
            <div key={idx} className="flex items-center gap-3 bg-gray-100 rounded-lg px-4 py-3 shadow-sm">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center ${activity.type === 'assignment' ? 'bg-blue-200 text-blue-700' : 'bg-green-200 text-green-700'}`}>
                {activity.type === 'assignment' ? '📄' : '✔️'}
              </span>
              <div>
                <div className="font-medium text-gray-800 text-sm">{activity.title}</div>
                <div className="text-xs text-gray-500">{activity.type === 'assignment' ? `Received: ${activity.date}` : `Completed: ${activity.date}`}</div>
              </div>
            </div>
          ))
          )}
        </div>
      </div>
      <div className="mb-8">
        <div className="text-lg font-semibold text-gray-700 mb-2">Upcoming Deadlines</div>
        <div className="flex flex-col gap-3">
          <div className="flex justify-center mb-6">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 min-w-[320px]">
              {renderHeader()}
              {renderDays()}
              {renderCells()}
            </div>
          </div>
          {upcomingDeadlines.length === 0 ? (
            <div className="text-center text-gray-400 py-4">No upcoming deadlines</div>
          ) : (
            upcomingDeadlines.map((deadline, idx) => (
            <div key={idx} className="flex items-center gap-3 bg-gray-100 rounded-lg px-4 py-3 shadow-sm">
              <span className="w-6 h-6 rounded bg-blue-200 text-blue-700 flex items-center justify-center">📅</span>
              <div>
                <div className="font-medium text-gray-800 text-sm">{deadline.title}</div>
                <div className="text-xs text-gray-500">Due: {deadline.due}</div>
              </div>
            </div>
          ))
          )}
        </div>
      </div>
    </div>
  );
}