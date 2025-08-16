import { DataTablePagination } from "../pagination"
import { columns, type Payment } from "./columns"
import { DataTable } from "./data-table"

// API service for proposals
const API_BASE_URL = process.env.REACT_APP_API_URL || '/api';

async function getData(): Promise<Payment[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/proposals`);
    if (!response.ok) {
      throw new Error('Failed to fetch proposals');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching proposals:', error);
    return [];
  }
}

export default function ProposalsTable() {
  const [data, setData] = React.useState<Payment[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const loadData = async () => {
      const proposals = await getData();
      setData(proposals);
      setLoading(false);
    };
    
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto py-10">
        <div className="text-center">Loading proposals...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}