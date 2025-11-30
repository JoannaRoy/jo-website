import { useQuery } from '@tanstack/react-query';

export function useBatchViewCounts(slugs: string[]) {
  return useQuery({
    queryKey: ['viewCounts', slugs],
    queryFn: async () => {
      const response = await fetch('/api/views/batch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slugs })
      });
      const data = await response.json();
      return data.views as Record<string, number>;
    },
    enabled: slugs.length > 0,
  });
}