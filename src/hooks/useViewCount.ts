import { useEffect, useState } from 'react';
import { formatSlug } from '@/utils/formatSlug';

function isJsonResponse(res: Response): boolean {
  return (res.headers.get('content-type') ?? '').includes('application/json');
}

export function useViewCount(slug: string, shouldIncrement: boolean = false) {
  const [views, setViews] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchViews = async () => {
      const slugFormatted = formatSlug(slug);
      
      try {
        const response = await fetch(`/api/views/${slugFormatted}`);
        
        if (response.ok && isJsonResponse(response)) {
          const data = await response.json();
          if (isMounted && data.views !== undefined) setViews(data.views);
        }
        
        if (shouldIncrement && isMounted) {
          const viewedKey = `viewed_${slugFormatted}`;
          const hasViewed = sessionStorage.getItem(viewedKey);
          
          if (!hasViewed) {
            const incRes = await fetch(`/api/views/${slugFormatted}`, { method: 'POST' });
            if (incRes.ok && isJsonResponse(incRes)) {
              sessionStorage.setItem(viewedKey, 'true');
            }
          }
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchViews();

    return () => {
      isMounted = false;
    };
  }, [slug, shouldIncrement]);

  return { views, loading };
}