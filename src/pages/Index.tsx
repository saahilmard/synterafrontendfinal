
import { useState } from 'react';
import { useApiData } from '@/hooks/use-api-data';
import { Button } from '@/components/ui/CustomButton';
import { Loader2 } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';

const Index = () => {
  const { data, isLoading, isError, error } = useApiData('/');

  return (
    <MainLayout>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
        <div className="bg-white rounded-lg shadow-md max-w-md w-full p-6">
          <h1 className="text-3xl font-bold mb-6 text-center text-syntera-blue">Syntera API Connection</h1>
          
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-syntera-purple mb-2" />
              <p className="text-gray-500">Connecting to FastAPI backend...</p>
            </div>
          )}
          
          {isError && (
            <div className="bg-red-50 border border-red-200 p-4 rounded-md mb-6">
              <h3 className="text-red-700 font-medium mb-2">Connection Error</h3>
              <p className="text-red-600 text-sm">
                {error instanceof Error 
                  ? error.message 
                  : "Failed to connect to the backend API. Please make sure the FastAPI server is running."}
              </p>
            </div>
          )}
          
          {data && (
            <div className="bg-green-50 border border-green-200 p-4 rounded-md mb-6">
              <h3 className="text-green-700 font-medium mb-2">Connection Successful!</h3>
              <div className="bg-white rounded border border-gray-200 p-3 max-h-60 overflow-auto">
                <pre className="text-xs whitespace-pre-wrap">
                  {JSON.stringify(data, null, 2)}
                </pre>
              </div>
            </div>
          )}
          
          <p className="text-gray-600 text-sm mt-4">
            The frontend is configured to connect to your FastAPI backend at:
            <code className="block bg-gray-100 p-2 rounded mt-1 text-xs">
              http://localhost:8000/api/v1
            </code>
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
