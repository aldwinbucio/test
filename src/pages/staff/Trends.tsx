import { ChartLineMultiple } from "@/components/parts/chart-line-multi";
import React, { useState, useEffect } from 'react';
import { type Submissions } from "@/Data";

// API service for trends data
const API_BASE_URL = process.env.REACT_APP_API_URL || '/api';

const fetchTrendsData = async (): Promise<{
  proposals: Submissions[];
  pending: Submissions[];
  approved: Submissions[];
}> => {
  try {
    const response = await fetch(`${API_BASE_URL}/trends/stats`);
    if (!response.ok) {
      throw new Error('Failed to fetch trends data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching trends data:', error);
    return {
      proposals: [],
      pending: [],
      approved: []
    };
  }
};

const STrends = () => {
    const [trendsData, setTrendsData] = useState<{
        proposals: Submissions[];
        pending: Submissions[];
        approved: Submissions[];
    }>({
        proposals: [],
        pending: [],
        approved: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadTrendsData = async () => {
            const data = await fetchTrendsData();
            setTrendsData(data);
            setLoading(false);
        };
        
        loadTrendsData();
    }, []);

    if (loading) {
        return (
            <div className="flex-1 p-4">
                <h1 className="text-[30px] font-medium">Trends</h1>
                <div className="text-center py-8">Loading trends data...</div>
            </div>
        );
    }

    return (
        <>
            <div className="flex-1 [&>*]:my-3">
                <h1 className="text-[30px] font-medium">Trends</h1>
                <ChartLineMultiple
                    title="Proposals" desc="Proposal trends over time" data={trendsData.proposals} />
                <ChartLineMultiple
                    title="Pending" desc="Pending proposal trends" data={trendsData.pending} />
                <ChartLineMultiple
                    title="Approved" desc="Approved proposal trends" data={trendsData.approved} />
            </div>
        </>
    );
};

export default STrends;