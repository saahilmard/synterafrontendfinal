
import axios from 'axios';
import { toast } from 'sonner';

// Create an axios instance with base configuration
const api = axios.create({
  baseURL: 'http://localhost:8000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token, etc.
api.interceptors.request.use(
  (config) => {
    // You can add auth tokens here if needed in the future
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling common errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors (401, 403, 500, etc.)
    console.error('API Error:', error.response?.data || error.message);
    
    // You can add specific error handling based on status codes
    if (error.response) {
      switch (error.response.status) {
        case 401:
          toast.error('Unauthorized: Please log in');
          break;
        case 403:
          toast.error('Forbidden: You don\'t have permission');
          break;
        case 404:
          toast.error('Resource not found');
          break;
        case 500:
          toast.error('Server error: Please try again later');
          break;
        default:
          // Do nothing, let component handle it
          break;
      }
    } else if (error.request) {
      // Network error or server not responding
      toast.error('Network error: Cannot connect to server');
    }
    
    return Promise.reject(error);
  }
);

export default api;
