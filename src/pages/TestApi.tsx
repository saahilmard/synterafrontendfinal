
import TestBackend from '@/components/TestBackend';
import MainLayout from '@/components/layout/MainLayout';

export default function TestApi() {
  return (
    <MainLayout>
      <div className="container mx-auto py-12">
        <h1 className="text-3xl font-bold mb-8 text-center">Backend API Test</h1>
        <p className="text-center mb-8 text-gray-600">
          This page tests the connection to your FastAPI backend running at http://localhost:8000/api/v1
        </p>
        <TestBackend />
      </div>
    </MainLayout>
  );
}
