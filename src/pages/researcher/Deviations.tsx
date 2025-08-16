
import React, { useState, useEffect } from 'react';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// API service for researcher deviations
const API_BASE_URL = process.env.REACT_APP_API_URL || '/api';

type Deviation = {
  id: number;
  title: string;
  description: string;
  date: string;
  status: string;
};

const fetchDeviations = async (): Promise<Deviation[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/researcher/deviations`);
    if (!response.ok) {
      throw new Error('Failed to fetch deviations');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching deviations:', error);
    return [];
  }
};

const createDeviation = async (deviation: Omit<Deviation, 'id'>): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/researcher/deviations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(deviation),
    });
    return response.ok;
  } catch (error) {
    console.error('Error creating deviation:', error);
    return false;
  }
};

const RDeviations = () => {
  const [deviations, setDeviations] = useState<Deviation[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: '', description: '' });

  useEffect(() => {
    const loadDeviations = async () => {
      const data = await fetchDeviations();
      setDeviations(data);
      setLoading(false);
    };
    
    loadDeviations();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.description) return;
    
    const newDeviation = {
      title: form.title,
      description: form.description,
      date: new Date().toISOString().slice(0, 10),
      status: 'Pending',
    };
    
    const success = await createDeviation(newDeviation);
    if (success) {
      setDeviations([
        ...deviations,
        {
          id: deviations.length + 1,
          ...newDeviation,
        },
      ]);
      setForm({ title: '', description: '' });
    }
  };

  return (
    <div>
      <h1 className="text-[30px] font-medium p-4">Deviations</h1>
      
      {loading ? (
        <div className="text-center py-8">Loading deviations...</div>
      ) : (
        <div className="p-4">
          <Card>
            <CardHeader>
              <CardTitle>Report New Deviation</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <textarea
                    id="description"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    className="w-full border rounded-md p-2"
                    rows={4}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Submit Deviation
                </button>
              </form>
            </CardContent>
          </Card>
          
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">My Deviations</h2>
            {deviations.length === 0 ? (
              <div className="text-center text-gray-400 py-8">No deviations reported</div>
            ) : (
              <Table>
                <TableHeader>
                  <tr>
                    <th>Title</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </TableHeader>
                <TableBody>
                  {deviations.map((deviation) => (
                    <tr key={deviation.id}>
                      <td>{deviation.title}</td>
                      <td>{deviation.date}</td>
                      <td>{deviation.status}</td>
                    </tr>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RDeviations;