import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getRedis } from '../../lib/redis.js';
import { formatSlug } from '../../lib/formatSlug.js';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const redis = await getRedis();
    const { slug } = req.body || {};
    
    if (slug) {
      const slugFormatted = formatSlug(slug);
      const key = `reactions:${slugFormatted}`;
      await redis.del(key);
      
      return res.json({ 
        message: `Reactions reset for ${slug}`,
        slug: slug,
        deletedCount: 1
      });
    } else {
      const keys = await redis.keys('reactions:*');
      
      if (keys.length > 0) {
        await redis.del(keys);
      }
      
      return res.json({ 
        message: 'All reactions reset',
        deletedCount: keys.length 
      });
    }
  } catch (error) {
    return res.status(500).json({ error: String(error) });
  }
}

