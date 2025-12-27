import { useQuery } from '@tanstack/react-query';

function isJsonResponse(res: Response): boolean {
  return (res.headers.get('content-type') ?? '').includes('application/json');
}

export function useBatchViewCounts(slugs: string[]) {
  return useQuery({
    queryKey: ['viewCounts', slugs],
    queryFn: async () => {
      const response = await fetch('/api/views/batch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slugs })
      });
      if (!response.ok || !isJsonResponse(response)) return {};
      const data = await response.json();
      return (data?.views ?? {}) as Record<string, number>;
    },
    enabled: slugs.length > 0,
  });
}