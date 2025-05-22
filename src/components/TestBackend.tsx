
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface ApiResponse {
  [key: string]: any;
}

export function TestBackend() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await api.get('/');
      setData(response.data);
      toast.success('Data fetched successfully!');
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err instanceof Error ? err.message : 'An error occurred while fetching data');
      toast.error('Failed to fetch data');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">API Connection Test</h2>
      
      <div className="mb-4 flex justify-center">
        <Button 
          onClick={fetchData} 
          disabled={isLoading}
          className="flex items-center gap-2"
        >
          {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
          {isLoading ? 'Loading...' : 'Test Connection'}
        </Button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 p-4 rounded-md mb-4">
          <h3 className="text-red-700 font-medium mb-1">Error</h3>
          <p className="text-red-600 text-sm">{error}</p>
          <p className="text-xs mt-2 text-gray-500">
            Make sure your FastAPI server is running at http://localhost:8000 and has CORS enabled.
          </p>
        </div>
      )}
      
      {data && (
        <div className="bg-green-50 border border-green-200 p-4 rounded-md">
          <h3 className="text-green-700 font-medium mb-1">Response Data</h3>
          <div className="bg-white rounded border border-gray-200 p-3 max-h-60 overflow-auto">
            <pre className="text-xs whitespace-pre-wrap">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}

export default TestBackend;
