import { useEffect, useState } from 'react';
import { formatSlug } from '@/utils/formatSlug';

export function useViewCount(slug: string, shouldIncrement: boolean = false) {
  const [views, setViews] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchViews = async () => {
      const slugFormatted = formatSlug(slug);
      
      try {
        const response = await fetch(`/api/views/${slugFormatted}`);
        
        if (!response.ok) {
          console.error('Failed to fetch views:', response.status);
          return;
        }
        
        const data = await response.json();
        
        if (isMounted && data.views !== undefined) {
          setViews(data.views);
        }
        
        if (shouldIncrement && isMounted) {
          const viewedKey = `viewed_${slugFormatted}`;
          const hasViewed = sessionStorage.getItem(viewedKey);
          
          if (!hasViewed) {
            await fetch(`/api/views/${slugFormatted}`, { method: 'POST' });
            sessionStorage.setItem(viewedKey, 'true');
          }
        }
      } catch (error) {
        console.error('Error fetching views:', error);
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