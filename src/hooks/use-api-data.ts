
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';

export function useApiData(endpoint: string) {
  return useQuery({
    queryKey: [endpoint],
    queryFn: async () => {
      const response = await api.get(endpoint);
      return response.data;
    },
  });
}
