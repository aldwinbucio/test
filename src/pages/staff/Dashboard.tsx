import { RippleButton } from "@/components/animate-ui/buttons/ripple";
import { ScrollProgress } from "@/components/animate-ui/components/scroll-progress";
import { ChartLineMultiple } from "@/components/parts/chart-line-multi";
import React, { useState, useEffect } from 'react';
import { type Submissions } from "@/Data";

// API service for dashboard data
const API_BASE_URL = process.env.REACT_APP_API_URL || '/api';

const fetchDashboardData = async (): Promise<{
  applications: Submissions[];
  pending: Submissions[];
  approved: Submissions[];
}> => {
  try {
    const response = await fetch(`${API_BASE_URL}/dashboard/stats`);
    if (!response.ok) {
      throw new Error('Failed to fetch dashboard data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return {
      applications: [],
      pending: [],
      approved: []
    };
  }
};

const SDashboard = () => {
    const [dashboardData, setDashboardData] = useState<{
        applications: Submissions[];
        pending: Submissions[];
        approved: Submissions[];
    }>({
        applications: [],
        pending: [],
        approved: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadDashboardData = async () => {
            const data = await fetchDashboardData();
            setDashboardData(data);
            setLoading(false);
        };
        
        loadDashboardData();
    }, []);

    if (loading) {
        return (
            <div className="flex-1 p-4">
                <h1 className="text-[30px] font-medium">Dashboard</h1>
                <div className="text-center py-8">Loading dashboard data...</div>
            </div>
        );
    }

    return (
        <>
            <div className="flex-1 [&>*]:my-3">
                <h1 className="text-[30px] font-medium">Dashboard</h1>
                <ChartLineMultiple
                    title="Applications" desc="Total applications over time" data={dashboardData.applications} />
                <ChartLineMultiple
                    title="Pending" desc="Pending applications over time" data={dashboardData.pending} />
                <ChartLineMultiple
                    title="Approved" desc="Approved applications over time" data={dashboardData.approved} />
            </div>
        </>
    );
};

export default SDashboard;