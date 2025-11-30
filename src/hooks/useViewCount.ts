import { useState, useEffect } from 'react';

export function useViewCount(slug: string, shouldIncrement: boolean = false) {
  const [views, setViews] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchViews = async () => {
      const slugFormatted = slug.replace(/\//g, '-');
      
      try {
        const response = await fetch(`/api/views/${slugFormatted}`);
        const data = await response.json();
        
        if (isMounted) {
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